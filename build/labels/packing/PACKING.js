"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PACKING;
const react_1 = __importStar(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const canvas_1 = require("canvas");
const jsbarcode_1 = __importDefault(require("jsbarcode"));
renderer_1.Font.register({ family: 'SpoqaHanSansNeo', fonts: [{ src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf' }, { src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold' }] });
const imgList = {
    logo: "src/img/COMMON/shipter_logo.png",
};
function PACKING(props) {
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas, receiptData['packageInfo']['in_track_no'], { height: 70, format: 'CODE128', displayValue: false });
        return canvas.toDataURL('image/png');
    });
    const joinIfPresent = (arr) => arr.filter(x => typeof x === 'string' && x.trim() !== '').join(', ');
    const renderProducts = (pros) => {
        const totalDescription = [];
        let remainingRows = 18;
        const maxCharsPerLine = 85;
        const estimateLineCount = (text) => {
            return Math.ceil(text.length / maxCharsPerLine);
        };
        for (let product of pros) {
            const desc = [product.name, product.brand, product.qty + 'ea'].join(' / ');
            const lineCount = estimateLineCount(desc);
            if (remainingRows < lineCount)
                break;
            totalDescription.push(desc);
            remainingRows -= lineCount;
        }
        return totalDescription.map((desc, index) => (react_1.default.createElement(renderer_1.View, { key: index, style: { marginBottom: 1, width: '100%', display: "flex", flexDirection: "row", alignItems: 'flex-start', lineHeight: 1 } },
            react_1.default.createElement(renderer_1.View, { style: { width: 15, display: 'flex', alignItems: 'center' } },
                react_1.default.createElement(renderer_1.Text, null,
                    index + 1,
                    ". ")),
            react_1.default.createElement(renderer_1.View, { style: { display: "flex", width: '98%' } },
                react_1.default.createElement(renderer_1.Text, { style: { fontWeight: '400' } }, desc)))));
    };
    return (react_1.default.createElement(renderer_1.Page, { key: receiptData['packageInfo']['in_track_no'], size: { width: 432, height: 288 }, orientation: "portrait", style: {
            fontSize: 10,
            padding: 2,
            fontWeight: 'bold',
            lineHeight: 1,
            height: '100%',
            fontFamily: "SpoqaHanSansNeo",
        } },
        react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%', border: '2px solid black', } },
            react_1.default.createElement(renderer_1.View, { style: {
                    width: '100%',
                    height: '15%', position: 'relative',
                    borderBottom: '1px solid black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                } },
                react_1.default.createElement(renderer_1.View, { style: { paddingLeft: 10 } },
                    react_1.default.createElement(renderer_1.Image, { style: { height: '90%' }, src: barcodeUrl })),
                react_1.default.createElement(renderer_1.View, { style: { paddingRight: 5 } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 16 } },
                        "PACKING LIST",
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 10 } },
                            "[",
                            receiptData.packageInfo.method_name,
                            "]")))),
            react_1.default.createElement(renderer_1.View, { style: {
                    borderBottom: '1px solid black',
                    height: '16%',
                    display: 'flex', flexDirection: 'row',
                    fontSize: 10, position: 'relative',
                    paddingLeft: 10,
                } },
                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", width: '100%' } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            lineHeight: 1.3
                        } },
                        react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.name),
                        react_1.default.createElement(renderer_1.Text, null, joinIfPresent([receiptData.receiverInfo.address2, receiptData.receiverInfo.address1])),
                        react_1.default.createElement(renderer_1.Text, null, joinIfPresent([receiptData.receiverInfo.zip, receiptData.receiverInfo.city, receiptData.receiverInfo.state]))),
                    react_1.default.createElement(renderer_1.View, { style: {
                            height: '100%', width: '15%',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black'
                        } },
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 25 } }, receiptData.packageInfo.country_code)))),
            react_1.default.createElement(renderer_1.View, { style: {
                    borderBottom: '1px solid black',
                    display: 'flex', flexDirection: 'row',
                    fontSize: 10, justifyContent: 'space-between', alignItems: 'center'
                } }, ['OrderNum', receiptData.packageInfo.reference_no, 'TrackNum', receiptData.packageInfo.in_track_no].map((item, i) => {
                return (react_1.default.createElement(renderer_1.View, { style: {
                        padding: '4px 0px 5px 0px', height: '100%',
                        width: i % 2 == 0 ? '13%' : '37%', borderLeft: i == 0 ? 0 : '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center'
                    } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontWeight: i % 2 == 0 ? '400' : '900', fontSize: i % 2 == 0 ? 8 : 11 } }, item)));
            })),
            react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row',
                    flexGrow: 1,
                    fontSize: 8, paddingTop: 2,
                } },
                react_1.default.createElement(renderer_1.View, { style: { width: '100%', lineHeight: 1 } }, renderProducts(receiptData.productsInfo
                // .concat(receiptData.productsInfo).concat(receiptData.productsInfo).concat(receiptData.productsInfo)
                ))))));
}
;
