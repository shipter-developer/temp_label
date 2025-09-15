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
exports.default = JM_SHIPTER;
const react_1 = __importStar(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const moment_1 = __importDefault(require("moment"));
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const canvas_1 = require("canvas");
renderer_1.Font.register({ family: 'SpoqaHanSansNeo', fonts: [{ src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf' }, { src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold' }] });
renderer_1.Font.register({
    family: 'NotoSansHebrew',
    fonts: [
        { src: 'src/fonts/Noto_Sans_Hebrew/static/NotoSansHebrew-Regular.ttf' },
        { src: 'src/fonts/Noto_Sans_Hebrew/static/NotoSansHebrew-Bold.ttf', fontWeight: 'bold' }
    ]
});
const imgList = {
    logo: "src/img/SK_POST/sk_post_logo.png",
    scan: "src/img/LT_POST/scan.png",
    phone: "src/img/LT_POST/phone.png",
    no_signature: "src/img/LT_POST/no_signature.png",
    shipter_logo: "src/img/COMMON/shipter_logo.png",
    joom_logo: "src/img/JOOM/joom_logo.png"
};
function JM_SHIPTER(props) {
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas, receiptData['packageInfo']['in_track_no'], { height: 70, format: 'CODE128', displayValue: false });
        return canvas.toDataURL('image/png');
    });
    function containsHebrew(text) {
        // 히브리어 유니코드 범위: U+0590–U+05FF
        return /[\u0590-\u05FF]/.test(text);
    }
    const truncateByPx = (text, maxPx, fontSizePx = 10, charWidthRatio = 0.6) => {
        const fontSizePt = fontSizePx * 0.9;
        const maxPt = maxPx * 0.9;
        const maxChars = Math.floor(maxPt / (fontSizePt * charWidthRatio));
        return text.length > maxChars ? text.slice(0, maxChars - 3) + '...' : text;
    };
    return (react_1.default.createElement(renderer_1.Page, { key: receiptData['packageInfo']['in_track_no'], size: { width: 432, height: 288 }, orientation: "portrait", style: {
            fontSize: 10,
            padding: 2,
            fontWeight: 'bold',
            lineHeight: 1,
            height: '100%',
            fontFamily: "SpoqaHanSansNeo"
        } },
        react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%', border: '2px solid black', } },
            react_1.default.createElement(renderer_1.View, { style: {
                    width: '100%',
                    height: '16%',
                    borderBottom: '1px solid black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                } },
                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row' } },
                    react_1.default.createElement(renderer_1.View, { style: { fontSize: 10, paddingLeft: 20, lineHeight: 1.5 } },
                        react_1.default.createElement(renderer_1.Text, null, receiptData.senderInfo.name),
                        react_1.default.createElement(renderer_1.Text, null, (0, moment_1.default)(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")))),
                react_1.default.createElement(renderer_1.View, { style: {
                        justifyContent: 'flex-end', alignItems: 'center',
                        width: '55%', fontSize: 9, display: 'flex', flexDirection: 'row'
                    } },
                    react_1.default.createElement(renderer_1.View, { style: { paddingRight: 10, lineHeight: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } },
                        react_1.default.createElement(renderer_1.Text, null, "\uC785\uACE0\uC9C0: \uC778\uCC9C\uAD11\uC5ED\uC2DC \uC11C\uAD6C \uAC11\uBB381\uB85C 20"),
                        react_1.default.createElement(renderer_1.Text, null, "3\uCE35 5\uBC88 \uB3C4\uD06C SHIPTER")),
                    react_1.default.createElement(renderer_1.View, { style: { paddingRight: 10 } },
                        react_1.default.createElement(renderer_1.View, { style: { padding: '5px 0px' } },
                            react_1.default.createElement(renderer_1.Image, { style: { width: 80 }, src: imgList['joom_logo'] }))))),
            react_1.default.createElement(renderer_1.View, { style: {
                    borderBottom: '1px solid black',
                    height: '22%',
                    display: 'flex', flexDirection: 'row',
                    fontSize: 10, position: 'relative',
                } },
                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', width: '100%' } },
                    react_1.default.createElement(renderer_1.View, { style: { height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' } },
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 14, padding: '0px 5px' } }, "TO")),
                        react_1.default.createElement(renderer_1.View, { style: {
                                height: '100%',
                                width: '100%',
                                padding: '5px 5px 5px 5px',
                                // paddingLeft:5,
                                borderLeft: '1px solid black',
                                display: 'flex', justifyContent: 'space-around', lineHeight: 1.2,
                                flexGrow: 1,
                                fontFamily: containsHebrew(JSON.stringify(receiptData.receiverInfo)) ? "NotoSansHebrew" : "SpoqaHanSansNeo",
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } },
                                react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.name),
                                react_1.default.createElement(renderer_1.View, { style: {} },
                                    react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.phone))),
                            react_1.default.createElement(renderer_1.View, null,
                                react_1.default.createElement(renderer_1.Text, null, [
                                    receiptData.receiverInfo.address2,
                                    receiptData.receiverInfo.address1
                                ]
                                    .filter(val => val && String(val).trim() !== '')
                                    .join(' ')),
                                react_1.default.createElement(renderer_1.Text, null, [
                                    receiptData.receiverInfo.city,
                                    receiptData.receiverInfo.state,
                                    receiptData.receiverInfo.zip
                                ]
                                    .filter(val => val && String(val).trim() !== '')
                                    .join(', '))))),
                    react_1.default.createElement(renderer_1.View, { style: { height: '100%', minWidth: '20%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' } },
                        react_1.default.createElement(renderer_1.View, { style: { margin: -1, border: '1px solid black', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
                            react_1.default.createElement(renderer_1.View, { style: { padding: '0px 5px', paddingBottom: 5 } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 40, fontWeight: 'bold' } }, receiptData.packageInfo.country_code)))))),
            react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row',
                    borderBottom: '1px solid black',
                    height: '30%', fontSize: 8 } },
                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', paddingLeft: 3 } },
                        react_1.default.createElement(renderer_1.View, { style: {
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center', // ← key 변경!
                                lineHeight: 1,
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { flexGrow: 0 } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 10 } },
                                    "Order No: ",
                                    receiptData.packageInfo.start_track_no ? `${receiptData.packageInfo.start_track_no}` : '')),
                            react_1.default.createElement(renderer_1.View, { style: { marginLeft: 'auto' } },
                                react_1.default.createElement(renderer_1.View, { style: {
                                        borderLeft: '1px solid black',
                                        borderBottom: '1px solid black',
                                        // border: '1px solid black',
                                        padding: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    } },
                                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 14, fontWeight: 'bold' } }, receiptData.packageInfo.method_name)))),
                        receiptData.productsInfo
                            .slice(0, 5)
                            .map((product, i) => {
                            var description = [product.name, product.brand, product.qty + 'ea'].join(' / ');
                            return (react_1.default.createElement(renderer_1.View, { key: i, style: { lineHeight: 1, width: '100%', display: "flex", flexDirection: "row" } },
                                react_1.default.createElement(renderer_1.Text, null, description)));
                        }),
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', textAlign: 'center' } },
                            react_1.default.createElement(renderer_1.Text, null, receiptData.productsInfo.length > 5 && '...Showing first 5 items only.'))))),
            react_1.default.createElement(renderer_1.View, { style: { height: '32%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                    react_1.default.createElement(renderer_1.Image, { style: { width: '70%' }, src: barcodeUrl })),
                react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 10 } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, receiptData.packageInfo.in_track_no))))));
}
;
