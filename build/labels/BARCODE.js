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
exports.default = BARCODE;
const react_1 = __importStar(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const canvas_1 = require("canvas");
renderer_1.Font.register({ family: 'SpoqaHanSansNeo', fonts: [{ src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf' }, { src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold' }] });
function BARCODE(props) {
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas, receiptData['packageInfo']['in_track_no'], { height: 80, format: 'CODE128', displayValue: false });
        return canvas.toDataURL('image/png');
    });
    return (react_1.default.createElement(renderer_1.Page, { key: receiptData['packageInfo']['in_track_no'], size: { width: 432, height: 288 }, orientation: "portrait", style: {
            fontSize: 10,
            padding: 2,
            fontWeight: 'bold',
            lineHeight: 1,
            height: '100%',
            fontFamily: "SpoqaHanSansNeo",
        } },
        react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%', border: '2px solid black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
            react_1.default.createElement(renderer_1.View, { style: { width: '100%' } },
                react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                    react_1.default.createElement(renderer_1.Image, { style: { width: '80%' }, src: barcodeUrl })),
                react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 10 } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, receiptData.packageInfo.in_track_no))))));
}
;
