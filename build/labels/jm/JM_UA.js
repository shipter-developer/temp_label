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
exports.default = JM_UA;
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
    shipter_logo: "src/img/shipterLogoHi.jpg",
    joom_logo: "src/img/JOOM/joom_logo.png"
};
function JM_UA(props) {
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas, receiptData['packageInfo']['in_track_no'], { height: 70, format: 'CODE128', displayValue: false });
        return canvas.toDataURL('image/png');
    });
    return (react_1.default.createElement(renderer_1.Page, { size: { width: 432, height: 288 }, orientation: "portrait", style: {
            fontSize: 8,
            padding: 2,
            fontFamily: "SpoqaHanSansNeo",
            lineHeight: 1.1,
            fontWeight: 'bold'
        } },
        react_1.default.createElement(renderer_1.View, { style: { border: '2px solid black', width: '100%', height: '100%' } },
            react_1.default.createElement(renderer_1.View, { style: { height: '10%', fontSize: 8, width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black', alignItems: 'center' } },
                react_1.default.createElement(renderer_1.View, { style: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '15%', borderRight: '0.5px solid black' } },
                    react_1.default.createElement(renderer_1.Text, null,
                        receiptData.productsInfo.reduce((previousValue, currentValue) => previousValue + parseInt(currentValue.qty), 0),
                        "/",
                        receiptData.productsInfo.length),
                    react_1.default.createElement(renderer_1.Text, null, "psc")),
                react_1.default.createElement(renderer_1.View, { style: {
                        flex: 1,
                        paddingRight: '3%',
                        paddingLeft: '3%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    } },
                    react_1.default.createElement(renderer_1.View, null,
                        react_1.default.createElement(renderer_1.Text, null,
                            "Order No: ",
                            receiptData.packageInfo.start_track_no ? `${receiptData.packageInfo.start_track_no}` : ''),
                        react_1.default.createElement(renderer_1.Text, null,
                            "OrderDate: ",
                            (0, moment_1.default)(receiptData.packageInfo.reg_date).format("DD.MM.YYYY"))),
                    react_1.default.createElement(renderer_1.View, { style: { padding: '5px 0px' } },
                        react_1.default.createElement(renderer_1.Image, { style: { width: 80 }, src: imgList['joom_logo'] })))),
            react_1.default.createElement(renderer_1.View, { style: {
                    width: '100%', height: '20%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black'
                } },
                react_1.default.createElement(renderer_1.View, { style: { width: '50%', borderRight: '0.5px solid black' } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            height: '100%',
                            lineHeight: 1.2,
                            padding: 5, display: 'flex', justifyContent: 'space-between', fontWeight: 'normal',
                        } },
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold' } }, "Sender:"),
                            react_1.default.createElement(renderer_1.Text, null, receiptData.senderInfo.name),
                            react_1.default.createElement(renderer_1.Text, null, receiptData.senderInfo.address)),
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, null,
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold' } }, "Contact: "),
                                receiptData.senderInfo.name),
                            react_1.default.createElement(renderer_1.Text, null,
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold' } }, "Phone: "),
                                receiptData.senderInfo.phone)))),
                react_1.default.createElement(renderer_1.View, { style: { width: '50%' } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            height: '100%', lineHeight: 1.2,
                            padding: 5, display: 'flex', justifyContent: 'space-between', fontWeight: 'normal',
                        } },
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold' } }, "Receiver:"),
                            react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.address2),
                            react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.address1)),
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, null,
                                receiptData.receiverInfo.city,
                                ", ",
                                receiptData.receiverInfo.state),
                            react_1.default.createElement(renderer_1.Text, null,
                                receiptData.packageInfo.country_code == "MD" && "MD-",
                                receiptData.receiverInfo.zip),
                            react_1.default.createElement(renderer_1.Text, null, receiptData.packageInfo.country_name_en))))),
            react_1.default.createElement(renderer_1.View, { style: {
                    width: '100%', height: '25%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black'
                } },
                react_1.default.createElement(renderer_1.View, { style: { width: '50%', borderRight: '0.5px solid black' } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            height: '100%',
                            padding: '2px 5px', display: 'flex', fontWeight: 'normal',
                        } },
                        receiptData.productsInfo
                            .slice(0, 4)
                            .map((product, i) => {
                            var description = [product.name, product.brand, product.qty + 'ea'].join(' / ');
                            return (react_1.default.createElement(renderer_1.View, { key: i, style: { lineHeight: 1, width: '100%', display: "flex", flexDirection: "row" } },
                                react_1.default.createElement(renderer_1.Text, null, description)));
                        }),
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', textAlign: 'center' } },
                            react_1.default.createElement(renderer_1.Text, null, receiptData.productsInfo.length > 4 && '...Showing first 4 items only.')))),
                react_1.default.createElement(renderer_1.View, { style: { width: '50%' } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            height: '100%', lineHeight: 1.3,
                            display: 'flex', justifyContent: 'space-between', fontWeight: 'normal',
                        } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
                            react_1.default.createElement(renderer_1.View, { style: { padding: '2px 5px', } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold' } }, "Ship to:"),
                                react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.address2)),
                            react_1.default.createElement(renderer_1.View, { style: { border: '1px solid black', margin: -1, padding: 2 } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, receiptData.packageInfo.country_code))),
                        react_1.default.createElement(renderer_1.View, { style: { padding: '2px 5px' } },
                            react_1.default.createElement(renderer_1.Text, null,
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold' } }, "Contact: "),
                                receiptData.receiverInfo.name),
                            react_1.default.createElement(renderer_1.Text, null,
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold' } }, "Phone: "),
                                receiptData.receiverInfo.phone))))),
            react_1.default.createElement(renderer_1.View, { style: {
                    width: '100%', height: '8%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black'
                } },
                react_1.default.createElement(renderer_1.View, { style: { width: '50%', borderRight: '0.5px solid black',
                        display: 'flex', flexDirection: 'row', alignItems: 'center'
                    } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            width: '100%', justifyContent: 'space-between',
                            padding: '0px 10px', display: 'flex', flexDirection: 'row', alignItems: 'center'
                        } },
                        react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "origin:"),
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8 } }, "KR"))),
                react_1.default.createElement(renderer_1.View, { style: { width: '23%', borderRight: '0.5px solid black',
                        display: 'flex', flexDirection: 'row', alignItems: 'center' } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            width: '100%', justifyContent: 'space-between',
                            padding: '0px 10px', display: 'flex', flexDirection: 'row', alignItems: 'center'
                        } },
                        react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'normal' } }, "destination:"),
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8 } }, receiptData.packageInfo.country_code))),
                react_1.default.createElement(renderer_1.View, { style: { width: '27%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8 } },
                        receiptData.packageInfo.r_weight,
                        " KG"))),
            react_1.default.createElement(renderer_1.View, { style: {
                    flex: 1,
                    width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black'
                } },
                react_1.default.createElement(renderer_1.View, { style: { width: '73%', borderRight: '0.5px solid black', display: 'flex', justifyContent: 'center' } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                            react_1.default.createElement(renderer_1.Image, { style: { width: '85%' }, source: { uri: barcodeUrl } })),
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 3 } },
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 18 } }, receiptData['packageInfo']['in_track_no']),
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%', textAlign: 'center' } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 10 } }, receiptData['packageInfo']['receipt_number']))))),
                react_1.default.createElement(renderer_1.View, { style: { width: '27%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        fontSize: 8, lineHeight: 1.5,
                    } },
                    react_1.default.createElement(renderer_1.Text, null, "Customs value:"),
                    react_1.default.createElement(renderer_1.View, { style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        react_1.default.createElement(renderer_1.Text, null,
                            parseFloat(receiptData.productsInfo.reduce((pre, cur) => pre + parseFloat(cur.price) * parseInt(cur.qty), 0).toFixed(2)).toPrecision(),
                            " ",
                            receiptData.productsInfo[0]['currency']),
                        react_1.default.createElement(renderer_1.Text, null, "E-Commerce")))))));
}
;
