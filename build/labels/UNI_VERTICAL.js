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
exports.default = UNI_VERTICAL;
const react_1 = __importStar(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const qrcode_1 = __importDefault(require("qrcode"));
const canvas_1 = require("canvas");
renderer_1.Font.register({ family: 'SpoqaHanSansNeo', fonts: [{ src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf' }, { src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold' }] });
function UNI_VERTICAL(props) {
    var _a, _b, _c;
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas, receiptData['packageInfo']['in_track_no'], { height: 80, format: 'CODE128', displayValue: false });
        return canvas.toDataURL('image/png');
    });
    const [qrcodeUrl, setQrcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        qrcode_1.default.toCanvas(canvas, receiptData['packageInfo']['in_track_no'], { errorCorrectionLevel: 'H' });
        return canvas.toDataURL('image/png');
    });
    return (react_1.default.createElement(renderer_1.Page, { key: receiptData['packageInfo']['in_track_no'], size: { width: 432, height: 288 }, orientation: "landscape", style: {
            fontSize: 12,
            padding: 2,
            fontWeight: 'bold',
            lineHeight: 1,
            height: '100%',
            fontFamily: "SpoqaHanSansNeo",
        } },
        react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%', border: '2px solid black', } },
            react_1.default.createElement(renderer_1.View, { style: {
                    width: '100%',
                    height: '16%',
                    borderBottom: '1px solid black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                } },
                react_1.default.createElement(renderer_1.View, { style: { marginLeft: 10, alignItems: 'center', fontSize: 9, display: 'flex', flexDirection: 'row' } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '30%', paddingRight: 10 } },
                        react_1.default.createElement(renderer_1.Image, { src: 'src/img/COMMON/shipter_logo.png' })),
                    react_1.default.createElement(renderer_1.View, { style: { paddingRight: 5 } },
                        react_1.default.createElement(renderer_1.Text, null, "shipter.kr"),
                        react_1.default.createElement(renderer_1.Text, null, "shiptertracking.com"))),
                react_1.default.createElement(renderer_1.View, { style: { marginRight: 10, display: 'flex', flexDirection: 'row' } },
                    react_1.default.createElement(renderer_1.View, { style: { fontSize: 10, paddingRight: 5, lineHeight: 1.2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } },
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 17 } },
                            receiptData.packageInfo.country_code,
                            ((_a = receiptData === null || receiptData === void 0 ? void 0 : receiptData.etcInfo) === null || _a === void 0 ? void 0 : _a.userdata1) && ('-' + ((_b = receiptData === null || receiptData === void 0 ? void 0 : receiptData.etcInfo) === null || _b === void 0 ? void 0 : _b.userdata1)))))),
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
                                padding: '5px 0px 0px 5px',
                                // paddingLeft:5,
                                fontSize: 10,
                                borderLeft: '1px solid black',
                                display: 'flex', justifyContent: 'space-around', lineHeight: 1.2,
                                flexGrow: 1,
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } },
                                react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.name),
                                react_1.default.createElement(renderer_1.View, { style: {} },
                                    react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.phone))),
                            react_1.default.createElement(renderer_1.View, null,
                                react_1.default.createElement(renderer_1.Text, null, [receiptData.receiverInfo.address2, receiptData.receiverInfo.address1].filter(x => x && (x + "").trim() != '').join(' ')),
                                react_1.default.createElement(renderer_1.Text, null, [receiptData.receiverInfo.city, receiptData.receiverInfo.state, receiptData.receiverInfo.zip].filter(x => x && (x + "").trim() != '').join(', '))))),
                    react_1.default.createElement(renderer_1.View, { style: { height: '100%', minWidth: '27%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' } },
                        react_1.default.createElement(renderer_1.View, { style: { margin: -1, border: '1px solid black', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
                            react_1.default.createElement(renderer_1.View, { style: { padding: '0px 5px', paddingBottom: 5 } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 30, fontWeight: 'bold' } }, ((_c = receiptData === null || receiptData === void 0 ? void 0 : receiptData.etcInfo) === null || _c === void 0 ? void 0 : _c.userdata1) && receiptData.etcInfo.userdata1)))))),
            react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row',
                    borderBottom: '1px solid black',
                    height: '30%', fontSize: 10 } },
                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', padding: 3 } },
                        react_1.default.createElement(renderer_1.View, { style: {
                                width: '100%',
                                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                            } },
                            react_1.default.createElement(renderer_1.View, null,
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 10, lineHeight: 1.2, } },
                                    "Order No: ",
                                    receiptData.packageInfo.reference_no))),
                        receiptData.productsInfo
                            .slice(0, 4)
                            .map((product, i) => {
                            var description = [product.name, product.qty + 'ea'].join(' / ');
                            return (react_1.default.createElement(renderer_1.View, { key: i, style: { lineHeight: 1.2, width: '100%', display: "flex", flexDirection: "row" } },
                                react_1.default.createElement(renderer_1.Text, { style: { textOverflow: "ellipsis" } }, description)));
                        })))),
            react_1.default.createElement(renderer_1.View, { style: { height: '18%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' } },
                react_1.default.createElement(renderer_1.Image, { style: { width: '90%' }, src: barcodeUrl })),
            react_1.default.createElement(renderer_1.View, { style: {
                    borderTop: '1px solid black',
                    height: '16%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                } },
                react_1.default.createElement(renderer_1.View, { style: { flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 16 } }, receiptData.packageInfo.in_track_no)),
                react_1.default.createElement(renderer_1.Image, { style: { aspectRatio: 1 }, src: qrcodeUrl })))));
}
;
