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
exports.default = PP_IOSS;
const react_1 = __importStar(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const moment_1 = __importDefault(require("moment"));
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const canvas_1 = require("canvas");
renderer_1.Font.register({ family: 'SpoqaHanSansNeo', fonts: [{ src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf' }, { src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold' }] });
function PP_IOSS(props) {
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas, receiptData['packageInfo']['in_track_no'], { height: 60, format: 'CODE128', displayValue: false });
        return canvas.toDataURL('image/png');
    });
    return (react_1.default.createElement(renderer_1.Page, { size: { width: 432, height: 288 }, orientation: "landscape", 
        // orientation="landscape"
        style: {
            fontSize: 9,
            padding: 3,
            fontFamily: "SpoqaHanSansNeo",
            lineHeight: 1.3,
            fontWeight: 'bold'
        } },
        react_1.default.createElement(renderer_1.View, { style: { border: '2px solid black', width: '100%', height: '100%' } },
            react_1.default.createElement(renderer_1.View, { style: {
                    borderBottom: '1px solid black',
                    height: '15%',
                    display: 'flex', flexDirection: 'row'
                } },
                react_1.default.createElement(renderer_1.View, { style: { paddingTop: 8, width: '55%', display: 'flex', flexDirection: 'row', borderRight: '1px solid black', alignItems: 'center' } },
                    react_1.default.createElement(renderer_1.View, { style: {} },
                        react_1.default.createElement(renderer_1.Text, { style: { transform: "rotate(-90deg)", fontSize: 10, fontWeight: "bold" } }, "FROM")),
                    react_1.default.createElement(renderer_1.View, { style: { fontSize: 6 } },
                        react_1.default.createElement(renderer_1.Text, null, "PostPlus - meno odosielatela,"),
                        react_1.default.createElement(renderer_1.Text, null, "P.O.Box 0200, Bratislava 090"),
                        react_1.default.createElement(renderer_1.Text, null, "80090 Bratislava"),
                        react_1.default.createElement(renderer_1.Text, null, "Slovakia"))),
                react_1.default.createElement(renderer_1.View, { style: { width: '45%', fontSize: 7 } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '90%', textAlign: 'center', display: 'flex', justifyContent: 'flex-end', } },
                            react_1.default.createElement(renderer_1.View, { style: {
                                    height: '60%',
                                    border: '1px solid black', display: 'flex', flexDirection: 'row',
                                } },
                                react_1.default.createElement(renderer_1.View, { style: {
                                        width: '30%', borderRight: '1px solid black', justifyContent: 'center', alignItems: 'center'
                                    } },
                                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8 } }, "P.P.")),
                                react_1.default.createElement(renderer_1.View, { style: { width: '70%' } },
                                    react_1.default.createElement(renderer_1.View, { style: {
                                            borderBottom: '1px solid black', width: '100%',
                                            height: '50%',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                                        } },
                                        react_1.default.createElement(renderer_1.Text, null, "800 90 Bratislava 090")),
                                    react_1.default.createElement(renderer_1.View, { style: {
                                            height: '50%',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                                        } },
                                        react_1.default.createElement(renderer_1.Text, null, "530/2023")))),
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8 } }, "POSTAGE PAID")),
                        react_1.default.createElement(renderer_1.View, { style: { backgroundColor: 'black', width: '100%', textAlign: 'center' } },
                            react_1.default.createElement(renderer_1.Text, { style: { color: 'white', padding: '2px 0px', fontSize: 8 } }, "PRIORITY"))))),
            react_1.default.createElement(renderer_1.View, { style: {
                    borderBottom: '1px solid black',
                    height: '20%',
                    display: 'flex', flexDirection: 'row',
                    fontSize: 10, position: 'relative'
                } },
                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', height: '100%', width: '100%' } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            width: '55%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
                        } },
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, { style: { fontWeight: "bold", fontSize: 14, padding: '0px 3px' } }, "TO")),
                        react_1.default.createElement(renderer_1.View, { style: { padding: '5px 5px', fontSize: 9, lineHeight: 1.2,
                                borderLeft: '1px solid black', height: '100%',
                                display: 'flex', justifyContent: 'space-between'
                            } },
                            react_1.default.createElement(renderer_1.View, null,
                                react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.name),
                                react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.address1),
                                react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.address2)),
                            react_1.default.createElement(renderer_1.View, null,
                                react_1.default.createElement(renderer_1.Text, null,
                                    receiptData.receiverInfo.city,
                                    ", ",
                                    receiptData.receiverInfo.state),
                                react_1.default.createElement(renderer_1.Text, null,
                                    "ZIPCODE: ",
                                    receiptData.receiverInfo.zip),
                                react_1.default.createElement(renderer_1.Text, null, receiptData.packageInfo.country_name_en)))),
                    react_1.default.createElement(renderer_1.View, { style: { width: '45%', display: 'flex', justifyContent: 'space-between' } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', paddingTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                            react_1.default.createElement(renderer_1.Image, { style: { width: 9, height: 9, marginRight: 10, marginTop: 2 }, src: 'src/img/LT_POST/phone.png' }),
                            react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.phone)),
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', alignItems: 'flex-end' } },
                            react_1.default.createElement(renderer_1.View, { style: { border: '1px solid black', margin: -1, padding: 2 } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 30 } }, receiptData.packageInfo.country_code)))))),
            react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: "column", justifyContent: "space-between",
                    borderBottom: '1px solid black',
                    height: '40%', fontSize: 8 } },
                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', lineHeight: 1 } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', padding: 3 } },
                        react_1.default.createElement(renderer_1.View, { style: { marginBottom: 2, fontSize: 10, lineHeight: 1.2 } },
                            react_1.default.createElement(renderer_1.Text, null,
                                "No: ",
                                receiptData.packageInfo.in_track_no,
                                " "),
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 10 } },
                                "Order No: ",
                                receiptData.packageInfo.reference_no,
                                receiptData.packageInfo.start_track_no && " / " + receiptData.packageInfo.start_track_no)),
                        receiptData.productsInfo
                            .slice(0, 4)
                            .map((product) => {
                            var description = [product.name, product.qty + 'ea'].join(' / ');
                            return (react_1.default.createElement(renderer_1.View, { style: { marginTop: 3, width: '100%', display: "flex", flexDirection: "row" } },
                                react_1.default.createElement(renderer_1.Text, { style: { textOverflow: "ellipsis", overflow: "hidden" } }, description)));
                        }))),
                react_1.default.createElement(renderer_1.View, { style: {
                        paddingBottom: 5,
                        display: 'flex', flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center',
                        borderTop: '1px solid black'
                    } },
                    react_1.default.createElement(renderer_1.Image, { style: { height: 30, width: 50, marginRight: 5 }, src: 'src/img/LT_POST/scan.png' }),
                    react_1.default.createElement(renderer_1.Image, { style: { height: 30, width: 70 }, src: 'src/img/LT_POST/no_signature.png' }))),
            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-between' } },
                react_1.default.createElement(renderer_1.View, { style: { fontSize: 8, padding: '5px 0px 0px 5px', width: '100%' } },
                    react_1.default.createElement(renderer_1.Text, null,
                        receiptData.senderInfo.name,
                        ", ",
                        (0, moment_1.default)(receiptData.packageInfo.reg_date).format("YYYY-MM-DD"))),
                react_1.default.createElement(renderer_1.View, { style: { width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                    react_1.default.createElement(renderer_1.Image, { style: { width: '100%' }, source: { uri: barcodeUrl } })),
                react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 5 } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 15 } }, receiptData.packageInfo.in_track_no))))));
}
;
