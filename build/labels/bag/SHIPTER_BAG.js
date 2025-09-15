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
exports.default = SHIPTER_BAG;
const react_1 = __importStar(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const moment_1 = __importDefault(require("moment"));
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const canvas_1 = require("canvas");
renderer_1.Font.register({ family: 'SpoqaHanSansNeo', fonts: [{ src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf' }, { src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold' }] });
function SHIPTER_BAG(props) {
    const { bagData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas, bagData['bag_number'], { height: 70, format: 'CODE128', displayValue: false });
        return canvas.toDataURL('image/png');
    });
    return (react_1.default.createElement(renderer_1.Page, { key: bagData['bag_number'], size: { width: 432, height: 288 }, orientation: "landscape", style: {
            fontSize: 12,
            padding: 2,
            fontWeight: 'bold',
            lineHeight: 1,
            height: '100%',
            fontFamily: "SpoqaHanSansNeo",
        } },
        react_1.default.createElement(renderer_1.View, { style: {
                height: 20,
                fontSize: 18,
                fontWeight: 'bold',
                width: '100%', display: 'flex', flexDirection: 'row',
                textAlign: 'center', backgroundColor: 'black', color: 'white', alignItems: 'center', padding: '0px 0px'
            } },
            react_1.default.createElement("div", { style: { width: '70%' } },
                react_1.default.createElement(renderer_1.Text, null, "MAWB")),
            react_1.default.createElement("div", { style: { width: '30%' } },
                react_1.default.createElement(renderer_1.Text, null, "Dest."))),
        react_1.default.createElement(renderer_1.View, { style: {
                height: 20,
                fontSize: 20,
                fontWeight: 'bold',
                width: '100%', display: 'flex', flexDirection: 'row',
                textAlign: 'center', alignItems: 'center', margin: '0px 0px',
            } }),
        react_1.default.createElement(renderer_1.View, { style: { width: '100%', borderTop: '2px double black', paddingTop: 2 } },
            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                react_1.default.createElement(renderer_1.Image, { style: { width: '90%' }, src: barcodeUrl })),
            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 5 } },
                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, bagData.bag_number))),
        react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', fontSize: 14, marginTop: 5, alignItems: 'center' } },
            react_1.default.createElement(renderer_1.View, { style: { width: '50%', paddingLeft: 20, fontSize: 10 } },
                react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "Dispatch date: ")),
            react_1.default.createElement(renderer_1.Text, null, (0, moment_1.default)().format('DD-MMMM-YYYY'))),
        react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', fontSize: 14, marginTop: 5, alignItems: 'center' } },
            react_1.default.createElement(renderer_1.View, { style: { width: '50%', paddingLeft: 20, fontSize: 10 } },
                react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "Country: ")),
            react_1.default.createElement(renderer_1.Text, null, bagData['country_code'])),
        react_1.default.createElement(renderer_1.View, { style: {
                lineHeight: 1.4,
                width: '100%', display: 'flex', flexDirection: 'row', fontSize: 14, marginTop: 5, alignItems: 'center',
                borderBottom: '2px double black', paddingBottom: 5
            } },
            react_1.default.createElement(renderer_1.View, { style: { width: '50%', display: 'flex', flexDirection: 'row', fontSize: 14, alignItems: 'center' } },
                react_1.default.createElement(renderer_1.View, { style: { width: '50%', paddingLeft: 20, fontSize: 10 } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "Pices: ")),
                react_1.default.createElement(renderer_1.Text, null, bagData['parcels'].length)),
            react_1.default.createElement(renderer_1.View, { style: { width: '50%', display: 'flex', flexDirection: 'row', fontSize: 14, alignItems: 'center' } },
                react_1.default.createElement(renderer_1.View, { style: { width: '50%', fontSize: 10 } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "Weight: ")),
                react_1.default.createElement(renderer_1.Text, null,
                    bagData['parcels'].reduce((a, b) => a + parseFloat(b.weight), 0).toFixed(2),
                    " kg"))),
        react_1.default.createElement(renderer_1.View, { style: {
                display: 'flex',
                flexDirection: 'column', flexGrow: 1,
                justifyContent: 'center',
                width: '100%', textAlign: 'center'
            } },
            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, bagData['bag_number']))));
}
;
