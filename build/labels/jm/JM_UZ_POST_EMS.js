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
exports.default = JM_UZ_POST_EMS;
const react_1 = __importStar(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const moment_1 = __importDefault(require("moment"));
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const canvas_1 = require("canvas");
renderer_1.Font.register({ family: 'SpoqaHanSansNeo', fonts: [{ src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf' }, { src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold' }] });
const imgList = {
    logo: "src/img/SK_POST/sk_post_logo.png",
    scan: "src/img/LT_POST/scan.png",
    phone: "src/img/LT_POST/phone.png",
    no_signature: "src/img/LT_POST/no_signature.png",
    shipter_logo: "src/img/COMMON/shipter_logo.png",
    uz_post_logo: 'src/img/UZ_POST/uzpost_2_2.png',
    uz_return: 'src/img/UZ_POST/return_mark.png',
    uz_ems_logo: 'src/img/UZ_POST/UZ-EMS-logo.jpg'
};
function JM_UZ_POST_EMS(props) {
    var _a, _b;
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas, receiptData['packageInfo']['in_track_no'], { height: 70, format: 'CODE128', displayValue: false });
        return canvas.toDataURL('image/png');
    });
    const renderPadding = (data, head = null) => {
        return (react_1.default.createElement(renderer_1.View, { style: { height: 15, padding: '0px 1px', alignItems: 'center', borderBottom: '0.5px solid black', display: 'flex', flexDirection: 'row', /* flexWrap:'wrap' */ } },
            react_1.default.createElement(renderer_1.Text, null,
                head &&
                    react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } },
                        head,
                        " : "),
                react_1.default.createElement(renderer_1.Text, null, data))));
    };
    return (react_1.default.createElement(renderer_1.Page, { size: { width: 432, height: 288 }, orientation: "portrait", style: {
            fontSize: 5,
            padding: 2,
            fontFamily: "SpoqaHanSansNeo",
            lineHeight: 1.1,
            fontWeight: 'bold'
        } },
        react_1.default.createElement(renderer_1.View, { style: { border: '2px solid black', width: '100%', height: '100%' } },
            react_1.default.createElement(renderer_1.View, { style: {
                    borderBottom: '0.5px solid black',
                    height: 60,
                    width: '100%', display: 'flex', flexDirection: 'row'
                } },
                react_1.default.createElement(renderer_1.View, { style: { width: '20%', display: 'flex', justifyContent: 'center' } },
                    react_1.default.createElement(renderer_1.Image, { style: { height: 40 }, src: imgList['uz_ems_logo'] })),
                react_1.default.createElement(renderer_1.View, { style: {
                        marginRight: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                    } },
                    react_1.default.createElement(renderer_1.Image, { style: { height: 10, marginRight: 5 }, src: imgList['uz_return'] }),
                    react_1.default.createElement(renderer_1.View, null,
                        react_1.default.createElement(renderer_1.Text, null, "Return if undeliverable :"),
                        react_1.default.createElement(renderer_1.Text, null, "PO Box 0371 TASHKENT-UZBEKISTAN"),
                        react_1.default.createElement(renderer_1.Text, null, "The Item / Parcel maybe opened officially"))),
                react_1.default.createElement(renderer_1.View, { style: { width: '38%' } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                        react_1.default.createElement(renderer_1.Image, { style: { width: '100%' }, source: { uri: barcodeUrl } })),
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 5 } },
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 10 } }, receiptData.packageInfo.in_track_no))),
                react_1.default.createElement(renderer_1.View, { style: {
                        width: '13%', display: 'flex', justifyContent: 'center', alignItems: 'center'
                    } },
                    react_1.default.createElement(renderer_1.View, { style: { border: '1px solid black', width: '90%', fontSize: 7, textAlign: 'center', padding: 2 } },
                        react_1.default.createElement(renderer_1.Text, null, "POSTAGE PAID"),
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 9 } }, "UZA")))),
            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row',
                    height: '100%'
                } },
                react_1.default.createElement(renderer_1.View, { style: {
                        width: '40%',
                        display: 'flex', flexDirection: "column",
                        borderRight: '0.5px solid black'
                        // borderBottom:'0.5px solid black'
                    } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black' } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '10%', padding: 2 } },
                            react_1.default.createElement(renderer_1.Text, null, "From")),
                        react_1.default.createElement(renderer_1.View, { style: { width: '90%', borderLeft: '0.5px solid black' } },
                            react_1.default.createElement(renderer_1.View, { style: {} },
                                renderPadding(receiptData.senderInfo.name),
                                renderPadding(receiptData.senderInfo.address1, 'Address'),
                                renderPadding(receiptData.senderInfo.phone, 'Tel'),
                                react_1.default.createElement(renderer_1.View, { style: { height: 15, width: '100%', display: 'flex', flexDirection: 'row', padding: '0px 1px' } },
                                    react_1.default.createElement(renderer_1.View, { style: { width: '50%', display: 'flex', justifyContent: 'center' } },
                                        react_1.default.createElement(renderer_1.Text, null,
                                            react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "Postcode:"),
                                            " ", (_a = receiptData.senderInfo) === null || _a === void 0 ? void 0 :
                                            _a.zip)),
                                    react_1.default.createElement(renderer_1.View, { style: { width: '50%', display: 'flex', justifyContent: 'center' } },
                                        react_1.default.createElement(renderer_1.Text, null,
                                            react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "City:"),
                                            " ", (_b = receiptData.senderInfo) === null || _b === void 0 ? void 0 :
                                            _b.city)))))),
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black' } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '10%', padding: 2 } },
                            react_1.default.createElement(renderer_1.Text, null, "To")),
                        react_1.default.createElement(renderer_1.View, { style: { width: '90%', borderLeft: '0.5px solid black', position: 'relative' } },
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%' } },
                                renderPadding(receiptData.receiverInfo.name, 'Addressee'),
                                renderPadding([receiptData.receiverInfo.address1, receiptData.receiverInfo.address2].filter(x => x.trim() != '').join(', '), 'Address'),
                                renderPadding(receiptData.receiverInfo.phone, 'Tel'),
                                react_1.default.createElement(renderer_1.View, { style: { height: 15, width: '100%', display: 'flex', padding: '0px 1px', justifyContent: 'space-around', paddingRight: 40 } },
                                    react_1.default.createElement(renderer_1.View, { style: { display: 'flex', justifyContent: 'center' } },
                                        react_1.default.createElement(renderer_1.Text, null,
                                            react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "Postcode:"),
                                            " ",
                                            receiptData.receiverInfo.zip)),
                                    react_1.default.createElement(renderer_1.View, { style: { display: 'flex', justifyContent: 'center' } },
                                        react_1.default.createElement(renderer_1.Text, null,
                                            react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "City:"),
                                            " ",
                                            receiptData.receiverInfo.city)))),
                            react_1.default.createElement(renderer_1.View, { style: {
                                    margin: -0.5,
                                    width: 35,
                                    height: 31, display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    position: 'absolute', right: 0, bottom: 0, backgroundColor: 'white', border: '0.5px solid black'
                                } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, receiptData.packageInfo.country_code)))),
                    react_1.default.createElement(renderer_1.View, { style: { flex: 1,
                            display: 'flex', flexDirection: 'row',
                            justifyContent: 'space-around', alignItems: 'center'
                        } },
                        react_1.default.createElement(renderer_1.View, { style: {
                                padding: 3,
                                width: '45%', height: '90%', border: '0.5px solid black'
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { height: '20%' } }),
                            react_1.default.createElement(renderer_1.View, { style: { height: '80%', display: 'flex', justifyContent: 'space-around' } },
                                react_1.default.createElement(renderer_1.Text, null,
                                    "Weight(Gr.)",
                                    receiptData.packageInfo.r_weight),
                                react_1.default.createElement(renderer_1.Text, null,
                                    "Date: ",
                                    (0, moment_1.default)(receiptData.packageInfo.reg_date).format("DD/MM/YYYY")),
                                react_1.default.createElement(renderer_1.Text, null, "Time:"),
                                react_1.default.createElement(renderer_1.Text, null, "Postage:"))),
                        react_1.default.createElement(renderer_1.View, { style: {
                                padding: 3,
                                width: '45%', height: '90%', border: '0.5px solid black'
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { height: '20%', textAlign: 'center' } },
                                react_1.default.createElement(renderer_1.Text, null, "DELIVERY PARITICULARS"),
                                react_1.default.createElement(renderer_1.Text, null, "Item was received")),
                            react_1.default.createElement(renderer_1.View, { style: { height: '80%', display: 'flex', justifyContent: 'space-around' } },
                                react_1.default.createElement(renderer_1.Text, null, "Name:"),
                                react_1.default.createElement(renderer_1.Text, null, "Date:"),
                                react_1.default.createElement(renderer_1.Text, null, "Time:"),
                                react_1.default.createElement(renderer_1.Text, null, "Signature:"))))),
                react_1.default.createElement(renderer_1.View, { style: { width: '60%' } },
                    react_1.default.createElement(renderer_1.View, { style: { height: 15, width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black' } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '55%', borderRight: '0.5px solid black', display: 'flex', justifyContent: 'center', paddingLeft: 2 } },
                            react_1.default.createElement(renderer_1.Text, null, "CUSTOMS DECLARATION"),
                            react_1.default.createElement(renderer_1.Text, null, "Importers telephone/fax/email (if known )")),
                        react_1.default.createElement(renderer_1.View, { style: { paddingLeft: 2, display: 'flex', justifyContent: 'center' } },
                            react_1.default.createElement(renderer_1.Text, null,
                                "Importer's reference (if any)",
                                '\n',
                                "( tax code / VAT )"))),
                    react_1.default.createElement(renderer_1.View, { style: { height: 30, width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black' } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '33%', borderRight: '0.5px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                            react_1.default.createElement(renderer_1.Text, null, "Detail description of contents")),
                        react_1.default.createElement(renderer_1.View, { style: { width: '11%', borderRight: '0.5px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                            react_1.default.createElement(renderer_1.Text, null, "Quantity")),
                        react_1.default.createElement(renderer_1.View, { style: { width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRight: '0.5px solid black' } },
                            react_1.default.createElement(renderer_1.Text, null,
                                "Net",
                                '\n',
                                "Weight",
                                '\n',
                                "(kg)")),
                        react_1.default.createElement(renderer_1.View, { style: { width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRight: '0.5px solid black' } },
                            react_1.default.createElement(renderer_1.Text, null,
                                "Unit",
                                '\n',
                                "value",
                                '\n',
                                "(USD)")),
                        react_1.default.createElement(renderer_1.View, { style: { width: '34%' } },
                            react_1.default.createElement(renderer_1.View, { style: {
                                    width: '100%', height: 7,
                                    textAlign: 'center',
                                    borderBottom: '0.5px solid black'
                                } },
                                react_1.default.createElement(renderer_1.Text, null, "For Commercial items only")),
                            react_1.default.createElement(renderer_1.View, { style: {
                                    height: 23, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                                } },
                                react_1.default.createElement(renderer_1.View, { style: {
                                        height: '100%',
                                        width: '60%', borderRight: '0.5px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    } },
                                    react_1.default.createElement(renderer_1.Text, null, "HS traiff no")),
                                react_1.default.createElement(renderer_1.View, { style: {
                                        height: '100%',
                                        width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                                    } },
                                    react_1.default.createElement(renderer_1.Text, null,
                                        "Country of",
                                        '\n',
                                        "origin of",
                                        '\n',
                                        "good"))))),
                    receiptData.productsInfo.slice(0, 3)
                        .map((pro, index) => {
                        return (react_1.default.createElement(renderer_1.View, { style: { height: index == 0 ? 15.5 : 15, width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black' } },
                            react_1.default.createElement(renderer_1.View, { style: { padding: '0px 2px', width: '33%', borderRight: '0.5px solid black', display: 'flex', justifyContent: 'center' } },
                                react_1.default.createElement(renderer_1.Text, { style: { textOverflow: "ellipsis", overflow: "hidden" } }, pro.name)),
                            react_1.default.createElement(renderer_1.View, { style: { width: '11%', borderRight: '0.5px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                                react_1.default.createElement(renderer_1.Text, null, pro.qty)),
                            react_1.default.createElement(renderer_1.View, { style: { width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRight: '0.5px solid black' } },
                                react_1.default.createElement(renderer_1.Text, null, parseFloat((receiptData.packageInfo.r_weight / receiptData.productsInfo.length).toFixed(2)).toPrecision())),
                            react_1.default.createElement(renderer_1.View, { style: { width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRight: '0.5px solid black' } },
                                react_1.default.createElement(renderer_1.Text, null,
                                    (receiptData.packageInfo.currency).toLowerCase() === "usd" ? "$" : "€",
                                    " ",
                                    parseFloat((parseFloat(pro.price) * parseInt(pro.qty)).toFixed(2)).toPrecision())),
                            react_1.default.createElement(renderer_1.View, { style: {
                                    width: '20.4%', borderRight: '0.5px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                } },
                                react_1.default.createElement(renderer_1.Text, null, pro.hsCode)),
                            react_1.default.createElement(renderer_1.View, { style: {
                                    width: '13.6%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                                } },
                                react_1.default.createElement(renderer_1.Text, null, "KR"))));
                    }),
                    receiptData.productsInfo.length > 3 &&
                        react_1.default.createElement(renderer_1.View, { style: { height: 15, width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black' } },
                            react_1.default.createElement(renderer_1.View, { style: { padding: '0px 2px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                                react_1.default.createElement(renderer_1.Text, { style: { textOverflow: "ellipsis", overflow: "hidden" } },
                                    "...",
                                    (receiptData.productsInfo.length - 3),
                                    " items omitted"))),
                    react_1.default.createElement(renderer_1.View, { style: { height: 15.5, width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black' } },
                        react_1.default.createElement(renderer_1.View, { style: { padding: '0px 2px', width: '44%', borderRight: '0.5px solid black', display: 'flex', justifyContent: 'center', textAlign: 'center' } },
                            react_1.default.createElement(renderer_1.Text, { style: { textOverflow: "ellipsis", overflow: "hidden" } }, "TOTAL")),
                        react_1.default.createElement(renderer_1.View, { style: { width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRight: '0.5px solid black' } },
                            react_1.default.createElement(renderer_1.Text, null, parseFloat(parseFloat(receiptData.packageInfo.r_weight).toFixed(2)).toPrecision())),
                        react_1.default.createElement(renderer_1.View, { style: { width: '11%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRight: '0.5px solid black' } },
                            react_1.default.createElement(renderer_1.Text, null,
                                (receiptData.packageInfo.currency).toLowerCase() === "usd" ? "$" : "€",
                                " ",
                                parseFloat(receiptData.productsInfo.reduce((pre, cur) => pre + parseFloat(cur.price) * parseInt(cur.qty), 0).toFixed(2)).toPrecision()))),
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black' } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '48%', padding: '0x 2px' } },
                            react_1.default.createElement(renderer_1.View, { style: { padding: '2px 0px 5px 0px' } },
                                react_1.default.createElement(renderer_1.Text, null, "Category of item")),
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' } }, ['GIFT', 'Commercial', 'Others', 'Documents', 'Returned goods', 'Sale of goods'].map((item, i) => {
                                return (react_1.default.createElement(renderer_1.View, { style: { minWidth: '50%', display: 'flex', flexDirection: 'row', margin: '1px 0px' } },
                                    react_1.default.createElement(renderer_1.Image, { src: i == 5 ? 'src/img/check.png' : 'src/img/uncheck.png', style: { height: 5, marginRight: 2 } }),
                                    react_1.default.createElement(renderer_1.Text, null, item)));
                            }))),
                        react_1.default.createElement(renderer_1.View, { style: { paddingTop: 2, width: '18%', borderRight: '0.5px solid black', display: 'flex' } },
                            react_1.default.createElement(renderer_1.Text, null, "Explanation:")),
                        react_1.default.createElement(renderer_1.View, { style: {
                                height: 50,
                                width: '34%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
                            } },
                            react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } },
                                "Office of origin",
                                '\n',
                                "Date of posting"),
                            react_1.default.createElement(renderer_1.View, { style: { padding: '5px 0px',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    textAlign: 'center', fontSize: 6 } },
                                react_1.default.createElement(renderer_1.Text, null, "SHIPTER Co."),
                                react_1.default.createElement(renderer_1.Text, null, (0, moment_1.default)(receiptData.packageInfo.reg_date).format("DD/MM/YY"))))),
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', flex: 1, display: 'flex', flexDirection: 'row' } },
                        react_1.default.createElement(renderer_1.View, { style: { flex: 1, width: '66%', borderRight: '0.5px solid black' } },
                            react_1.default.createElement(renderer_1.View, { style: {
                                    height: 30,
                                    display: 'flex',
                                    padding: 5,
                                    borderBottom: '0.5px solid black'
                                } },
                                react_1.default.createElement(renderer_1.Text, null,
                                    "Comments: (e.g.: good subject to quarantine sanitary /",
                                    '\n',
                                    "phytosanitary inspection or other restrictions).")),
                            react_1.default.createElement(renderer_1.View, { style: { flex: 1, paddingTop: 5 } },
                                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } }, ['Licence', 'Cerificate', 'Invoice'].map((item, i) => {
                                    return (react_1.default.createElement(renderer_1.View, { style: {} },
                                        react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', margin: '1px 0px', alignItems: 'center' } },
                                            react_1.default.createElement(renderer_1.View, { style: { width: 15, height: 15, border: '0.5px solid black' } }),
                                            react_1.default.createElement(renderer_1.View, { style: { paddingLeft: 2 } },
                                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 7, fontWeight: 'normal' } }, item))),
                                        react_1.default.createElement(renderer_1.Text, null,
                                            "No. of ",
                                            item.toLowerCase(),
                                            "(s)")));
                                })))),
                        react_1.default.createElement(renderer_1.View, { style: { width: '34%', padding: 5 } },
                            react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "I certify that the particulars given in this customs decleration are correct and that this term does not contain any dangerous article or articles prohibited by regislation"),
                            react_1.default.createElement(renderer_1.View, { style: { paddingTop: 10 } },
                                react_1.default.createElement(renderer_1.Text, null, "Date and sender's signature")),
                            react_1.default.createElement(renderer_1.View, { style: { marginTop: 3 } },
                                react_1.default.createElement(renderer_1.Text, null, receiptData.senderInfo.name),
                                react_1.default.createElement(renderer_1.Text, null, (0, moment_1.default)(receiptData.packageInfo.reg_date).format("YYYY-MM-DD"))))))))));
}
;
