import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import axios from "axios";
import { Readable } from 'stream';



import createLabel from "./create-label";
import createBag from "./create-bag";
import fs from "fs";
import fsp from "fs/promises"; // 비동기용
import path from "path";
import { promisify } from "util";
import { PDFDocument } from "pdf-lib";
import zplImageConvert from '@replytechnologies/zpl-image-convert';


// import pool from "./config/pool";
// const { imageToACS, rgbaToACS } = require("zpl-image");
// import {fromPath, fromBuffer, fromBase64} from "pdf2pic";
// import { RowDataPacket } from 'mysql2/promise';
import sharp from "sharp";

const os = require("os");
const app = express();
import tmp from "tmp-promise";

import { exec } from "child_process";
import util from "util";
import Shipter from "./class/shipter";

const execAsync = util.promisify(exec);


app.use(express.json({ limit : "50mb" }));
app.use(express.urlencoded({ limit:"50mb", extended: false }));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: err.toString() })
});


const port = 3030;

if(os.hostname() == 'hyundaeui-MacBookPro.local'){
    app.listen(port, () => {
  console.log(`The sample PDF app is running on port ${port}.`);
});
}else{
    const options = {
        ca: [
            fs.readFileSync(path.join(__dirname, '..','..', '/ssl/','www_h3pays.com_chain_cert.crt' )),
            fs.readFileSync(path.join(__dirname, '..','..', '/ssl/','www_h3pays.com_root_cert.crt' ))
        ],
        key: fs.readFileSync(path.join(__dirname, '..','..', '/ssl/','www_h3pays.com.key' )),
        cert: fs.readFileSync(path.join(__dirname, '..','..', '/ssl/','www_h3pays.com_cert.crt' )),
    };

    https.createServer(options, app).listen(port,function(){
        console.log("Express http server has started on port " + port)
    });
}


app.get("/", async (req, res) => {
    res.end('label')
});

app.get('/parcelLabel/:trackNumsStr', async function (req, res) {
    try {
        const { trackNumsStr } = req.params;
        const trackNums = trackNumsStr.split('|').filter(Boolean);

        if (trackNums.length === 0 || trackNums.length > 100) {
            return res.status(400).json({ error: 'Request must include 1–100 tracking numbers.' });
        }

        const docs = [];
        const urls = [];


        let pdfIndex = 0; // 실제 PDF 순서

        for (let i = 0; i < trackNums.length; i++) {
            const trackNum = trackNums[i];
            const doc = await Shipter.getDoc(trackNum);

            if (!doc) {
                console.error(`Label generation error: no parcel for ${trackNum}`);
                return res.status(404).json({ error: `No parcel found for ${trackNum}` });
            }

            if (
                doc.packageInfo.method_name === "JP_YAMATO" ||
                doc.packageInfo.method_name.startsWith("SF") ||
                (doc.packageInfo.method_name.startsWith("SF") && doc.packageInfo.country_code === 'CN')
            ) {
                urls.push({
                    index: pdfIndex, // 현재 PDF 위치
                    url: `https://shipter.co.kr:3963/proc/getLabelFile/${doc.packageInfo.in_track_no}`
                });
                pdfIndex++; // 외부 PDF도 페이지 차지한다고 가정
            } else {
                docs.push(doc);    // 순수 doc만
                pdfIndex++; // 내부 PDF도 페이지 차지
            }
        }

        let pdfDoc;
        if (docs.length > 0) {
            pdfDoc = await createLabel(docs);
        }

        if (urls.length > 0) {
            pdfDoc = await mergeExternalPdfs(pdfDoc, urls);
        }

        await handlePdfOutput(res, 'pdf', pdfDoc);
    } catch (e) {
        console.error('Label generation error:', e);
        return res.status(500).json({ error: e.toString() });
    }

});

app.post('/label/:type', async function (req, res) {
    const { type } = req.params;
    let { format, docs, urls } = req.body;
    console.log(urls)

    let pdfDoc;

    try {
        if (type === 'bag') {
            docs = Array.isArray(docs) && docs.length > 0 ? docs : getDefaultBagData();
            pdfDoc = await createBag(docs);
        } else {
            const hasDocs = Array.isArray(docs) && docs.length > 0;
            const hasUrls = Array.isArray(urls) && urls.length > 0;

            if (!hasDocs && !hasUrls) {
                docs = getDefaultParcelData();
            }

            if (Array.isArray(docs) && docs.length > 0) {
                pdfDoc = await createLabel(docs);
            }

            if (Array.isArray(urls) && urls.length > 0) {
                pdfDoc = await mergeExternalPdfs(pdfDoc, urls);
            }
        }

        await handlePdfOutput(res, format, pdfDoc);

    } catch (e) {
        console.error('Label generation error:', e);
        res.status(500).json({ error: e.toString() });
    }
});

app.all("/getLabelFile", async (req, res) => {

    var {format, datas, type} = req['body'];
    try {
        let pdfDoc;
        if(format == 'bag'){
            if(!datas){
                datas = getDefaultBagData();
                // datas = [{"label_name" : "SHIPTER_BAG", "master_id" : "", "bag_number" : "H3AU202503231", "country_code" : "AU", "parcels" : [{"weight" : 1.2, "in_track_no" : "PARCEL0101"}, {"weight" : 1.2, "in_track_no" : "PARCEL0101"}]}]
                // datas[0]['etcInfo'] = {"userdata1" : "B", "userdata2" : "UN-DFW-C-006"}
            }
            pdfDoc = await createBag(datas);
        }else{
            if(!datas) {
                datas = [{"packageInfo":{"label_name": "UNI_SHIPENTEGRA", "reg_date":"2024-12-13","country_name_en":"UNITED STATES","country_code":"US","method_name":"US_USPS","reference_no":"114-3874471-4471401","box_num":1,"r_weight":0.716,"in_track_no":"H3US038942KR","start_track_no":""},"senderInfo":{"name":"SAM JOO","phone":"010-4213-7658","address1":"Samsong Techno Valley A-130 Ho, Tongil Road 153, Deokyang gu, Goyang Shi, Gyeonggi do, Korea, South","state":null,"city":null,"email":null,"zip":null},"receiverInfo":{"name":"Patrick Wolfgang","phone":"1763225946337413","email":"","zip":"76112-5122","state":"TX","city":"FORT WORTH","address1":"6401 MEADOWBROOK DR, ,","address2":""},"productsInfo":[{"sku":"","name":"[Exclusive Pob] TWICE Strategy Album+Pre-Order Gift (JYP Shop : Random ver.)","qty":"1","price":"34.50","brand":"","currency":"USD","hscode":"4901999000"}]}]
                datas[0]['etcInfo'] = {"userdata1" : "LAX", "userdata2" : "DFW-C-006"}
            }
            pdfDoc = await createLabel(datas);
        }
        console.log('pdf', datas.length);

        let pdfBuf;

        switch (type){
            case 'base64':
                pdfBuf = await stream2buffer(pdfDoc);
                res.json(Buffer.from(<any>pdfBuf).toString('base64'))
                break;
            case 'zpl':
                pdfBuf = await stream2buffer(pdfDoc); // ReactPDF PDF 생성
                const pngBuf = await convertPdfBufferToPngBuffer(pdfBuf);


                const sharpImage = sharp(pngBuf.buffer)
                    // .resize({
                    //     width: 1218,   // 4 inches × 203 dpi
                    //     height: 812, // 6 inches × 203 dpi
                    //     fit: 'fill'   // 강제로 정확한 사이즈 맞춤
                    // })
                    .grayscale()
                    .threshold(180);

                const { width, height } = await sharpImage.metadata();

                const rotatedBuffer = width > height
                    ? await sharpImage.rotate(270).toBuffer()
                    : await sharpImage.toBuffer();

                const zpl = await zplImageConvert.encode(rotatedBuffer, {
                    method: 'Z64',
                    mimeType: 'image/png',
                });
                res.json(`^XA${zpl}^XZ`);
                break;
            case 'pdf':
            default:
                // res.set("Content-Type", "application/pdf");
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'inline; filename="label.pdf"');
                pdfDoc.pipe(res);
                break;
        }

        res.on("finish", () => {
            pdfDoc = null;
        })
        // console.log(result)
    }catch (e) {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    }finally {
        // conn.release();
    }

});


function stream2buffer(stream) {
    return new Promise((resolve, reject) => {
        const _buf = [];
        stream.on("data", (chunk) => _buf.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(_buf)));
        stream.on("error", (err) => reject(err));
    });
}

async function convertPdfBufferToPngBuffer(pdfBuf: Buffer): Promise<Buffer> {
    const pdfTmp = await tmp.file({postfix: ".pdf"});
    const pngTmp = await tmp.file({postfix: ".png"});

    try {
        // PDF 저장
        await fsp.writeFile(pdfTmp.path, pdfBuf);

        // PDF 크기 추출 (pt 단위)
        const pdfDoc = await PDFDocument.load(pdfBuf);
        const page = pdfDoc.getPage(0);
        const {width, height} = page.getSize();

        // pt → px 변환
        const dpi = 203;

        const gsCmd = `gs -dNOPAUSE -dBATCH -dFirstPage=1 -dLastPage=1 \
        -sDEVICE=pngalpha -r${dpi} \
        -dTextAlphaBits=4 -dGraphicsAlphaBits=4 \
        -sOutputFile=${pngTmp.path} ${pdfTmp.path}`;

        await execAsync(gsCmd);

        const pngBuf = await fsp.readFile(pngTmp.path);
        return pngBuf;
    } finally {
        await pdfTmp.cleanup();
        await pngTmp.cleanup();
    }
}

function getDefaultBagData() {
    const bagData = [{
        label_name: "SHIPTER_BAG",
        master_id: "",
        bag_number: "H3AU202503231",
        country_code: "AU",
        parcels: [
            { weight: 1.2, in_track_no: "PARCEL0101" },
            { weight: 1.2, in_track_no: "PARCEL0101" }
        ],
        etcInfo: {
            userdata1: "B",
            userdata2: "UN-DFW-C-006"
        }
    }];
    return bagData;
}

function getDefaultParcelData() {
    const parcelData = [{
        packageInfo: {
            label_name: "SHIPTER",
            reg_date: "2024-12-13",
            country_name_en: "UNITED STATES",
            country_code: "US",
            method_name: "US_USPS",
            reference_no: "114-3874471-4471401",
            box_num: 1,
            r_weight: 0.716,
            in_track_no: "H3US038942KR",
            start_track_no: ""
        },
        senderInfo: {
            name: "SAM JOO",
            phone: "010-4213-7658",
            address1: "Samsong Techno Valley A-130 Ho, Tongil Road 153, Deokyang gu, Goyang Shi, Gyeonggi do, Korea, South"
        },
        receiverInfo: {
            name: "Patrick Wolfgang",
            phone: "1763225946337413",
            zip: "76112-5122",
            state: "TX",
            city: "FORT WORTH",
            address1: "6401 MEADOWBROOK DR, ,",
            address2: ""
        },
        productsInfo: [{
            name: "[Exclusive Pob] TWICE Strategy Album+Pre-Order Gift (JYP Shop : Random ver.)[Exclusive Pob] TWICE Strategy Album+Pre-Order Gift (JYP Shop : Random ver.)[Exclusive Pob] TWICE Strategy Album+Pre-Order Gift (JYP Shop : Random ver.)",
            qty: "1",
            price: "34.50",
            currency: "USD",
            hscode: "4901999000"
        },{
            name: "[Exclusive Pob] TWICE Strategy Album+Pre-Order Gift (JYP Shop : Random ver.)[Exclusive Pob] TWICE Strategy Album+Pre-Order Gift (JYP Shop : Random ver.)[Exclusive Pob] TWICE Strategy Album+Pre-Order Gift (JYP Shop : Random ver.)",
            qty: "1",
            price: "34.50",
            currency: "USD",
            hscode: "4901999000"
        }],
        etcInfo: {
            userdata1: "LAX",
            userdata2: "DFW-C-006"
        }
    }];
    return parcelData;
}

async function mergeExternalPdfs(pdfDoc: Readable | null, urls: { index: number; url: string }[]) {
    // 1. React PDF 준비
    let reactPdf: PDFDocument;
    if (pdfDoc) {
        const reactPdfBuffer = await stream2buffer(pdfDoc);
        reactPdf = await PDFDocument.load(<any>reactPdfBuffer);
    } else {
        reactPdf = await PDFDocument.create(); // 빈 경우
    }
    const reactPageCount = reactPdf.getPageCount();

    // 1) 외부 PDF 로드 + 페이지수 파악
    const externals = [];
    for (const { index, url } of urls) {
        const resp = await axios.get<ArrayBuffer>(url, { responseType: 'arraybuffer' });
        const extDoc = await PDFDocument.load(new Uint8Array(resp.data));
        externals.push({ index, doc: extDoc, pageCount: extDoc.getPageCount() });
    }
    // 인덱스 오름차순
    externals.sort((a, b) => a.index - b.index);

    // 2) 총 타겟 페이지 수 = 내부 + 외부 전체 페이지 수
    const totalExternal = externals.reduce((s, x) => s + x.pageCount, 0);
    const totalTarget = reactPageCount + totalExternal;

    // 3) 외부 시작 인덱스 매핑
    const startMap = new Map<number, number>(); // startIndex -> externals의 인덱스
    externals.forEach((e, i) => startMap.set(e.index, i));

    // 4) 최종 PDF: 앞에서부터 addPage만 사용 (insertPage 금지)
    const finalPdf = await PDFDocument.create();

    let reactCursor = 0;
    let pos = 0;
    while (pos < totalTarget) {
        if (startMap.has(pos)) {
            const ext = externals[startMap.get(pos)!];
            const pages = await finalPdf.copyPages(ext.doc, ext.doc.getPageIndices());
            for (const p of pages) finalPdf.addPage(p);
            pos += ext.pageCount;
            continue;
        }
        // 내부 페이지 추가
        const [copied] = await finalPdf.copyPages(reactPdf, [reactCursor]);
        finalPdf.addPage(copied);
        reactCursor++;
        pos++;
    }

    const finalBytes = await finalPdf.save();
    return Readable.from(Buffer.from(finalBytes));
}


// async function mergeExternalPdfs(pdfDoc, urls) {
//     let reactPdf;
//     if(pdfDoc){
//         const reactPdfBuffer = await stream2buffer(pdfDoc);
//         reactPdf = await PDFDocument.load(<any>reactPdfBuffer);
//     }else{
//         reactPdf = await PDFDocument.create()
//     }
//
//     const finalPdf = await PDFDocument.create();
//
//     const insertions = urls;
//
//     const extPdfPageMap: Record<number, any[]> = {};
//     for (const insertion of insertions) {
//         const response = await axios.get(insertion.url, { responseType: 'arraybuffer' });
//         const extPdf = await PDFDocument.load(response.data);
//         const pages = await finalPdf.copyPages(extPdf, extPdf.getPageIndices());
//         extPdfPageMap[insertion.index] = pages;
//     }
//
//     // 원본에서 빠진 인덱스를 추정 (삽입 위치로 추정)
//     const excludedIndexes = insertions.map(x => x.index);
//     const basePages = await reactPdf.getPages();
//     let basePageCursor = 0;
//
//     // 최종 index 기준으로 돌면서 페이지 구성
//     const totalPageCount = basePages.length + insertions.length;
//
//     for (let i = 0; i < totalPageCount; i++) {
//         // 삽입할 외부 PDF가 있으면 먼저 추가
//         if (extPdfPageMap[i]) {
//             extPdfPageMap[i].forEach(p => finalPdf.addPage(p));
//         }
//
//         // reactPdf에서 base page는 제외 인덱스를 건너뛰며 추가
//         if (!excludedIndexes.includes(i) && basePageCursor < basePages.length) {
//             const [copied] = await finalPdf.copyPages(reactPdf, [basePageCursor]);
//             finalPdf.addPage(copied);
//             basePageCursor++;
//         }
//     }
//
//     const finalBuffer = await finalPdf.save();
//     // pdfDoc = Readable.from(Buffer.from(finalBuffer));
//     return Readable.from(Buffer.from(finalBuffer));
// }

const handlePdfOutput = async (res, format, pdfDoc) => {
    try {
        switch (format) {
            case 'base64': {
                const pdfBuf = await stream2buffer(pdfDoc);
                res.json(Buffer.from(<any>pdfBuf).toString('base64'));
                break;
            }
            case 'zpl': {
                const pdfBuf = await stream2buffer(pdfDoc);
                const pngBuf = await convertPdfBufferToPngBuffer(<any>pdfBuf);

                const sharpImage = sharp(pngBuf.buffer)
                    // .resize({
                    //     width: 812,  // 4 inches * 203 dpi
                    //     height: 1218, // 6 inches * 203 dpi
                    //     fit: 'fill'
                    // })
                    .grayscale()
                    .threshold(180);

                const { width, height } = await sharpImage.metadata();
                const rotatedBuffer = width > height
                    ? await sharpImage.rotate(270).toBuffer()
                    : await sharpImage.toBuffer();

                const zpl = await zplImageConvert.encode(rotatedBuffer, {
                    method: 'Z64',
                    mimeType: 'image/png',
                });

                res.json(`^XA${zpl}^XZ`);
                break;
            }
            case 'pdf':
            default: {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'inline; filename="label.pdf"');
                pdfDoc.pipe(res);
                break;
            }
        }


    } catch (err) {
        console.error("handlePdfOutput error:", err);
        res.status(500).json({ error: err });
    }
};