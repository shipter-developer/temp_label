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
exports.default = UZ_POST;
const react_1 = __importStar(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const moment_1 = __importDefault(require("moment"));
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const canvas_1 = require("canvas");
renderer_1.Font.register({ family: 'SpoqaHanSansNeo', fonts: [{ src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf' }, { src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold' }] });
function UZ_POST(props) {
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas = (0, canvas_1.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas, receiptData['packageInfo']['in_track_no'], { height: 60, format: 'CODE128', displayValue: false });
        return canvas.toDataURL('image/png');
    });
    const renderTable = (_data, border = null) => {
        return (react_1.default.createElement(renderer_1.View, { style: {
                width: '100%',
                borderBottom: border ? '1px solid black' : 0,
                display: 'flex', flexDirection: 'row', padding: border ? '1px 2px' : '2px 2px'
            } },
            react_1.default.createElement(renderer_1.View, { style: {
                    width: '50%', display: 'flex'
                } },
                react_1.default.createElement(renderer_1.Text, null, _data[0])),
            react_1.default.createElement(renderer_1.View, { style: { width: '25%', textAlign: 'center', display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement(renderer_1.Text, null, _data[1])),
            react_1.default.createElement(renderer_1.View, { style: { width: '25%', textAlign: 'center', display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement(renderer_1.Text, null, _data[2]))));
    };
    return (react_1.default.createElement(renderer_1.Page, { size: { width: 432, height: 288 }, orientation: "portrait", style: {
            fontSize: 5,
            padding: 2,
            fontFamily: "SpoqaHanSansNeo",
            lineHeight: 1.1,
            fontWeight: 'bold'
        } },
        react_1.default.createElement(renderer_1.View, { style: {
                border: '2px solid black', width: '100%', height: '100%'
            } },
            react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', width: '100%' } },
                react_1.default.createElement(renderer_1.View, { style: {
                        height: '100%',
                        borderRight: '1px solid black',
                        width: '37%'
                    } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            padding: 3,
                            borderBottom: '1px solid black',
                            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                        } },
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, null, "CUSTOMS"),
                            react_1.default.createElement(renderer_1.Text, null, "DECLARATION"),
                            react_1.default.createElement(renderer_1.Text, null, "May be opened officially"),
                            react_1.default.createElement(renderer_1.View, { style: { diaplay: "flex", flexDirection: "row", justifyContent: "space-between", } },
                                react_1.default.createElement(renderer_1.Text, null, "Designated operator Uzbekist on Pochtasi"))),
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 15 } },
                                "CN22",
                                ' '))),
                    react_1.default.createElement(renderer_1.View, { style: {
                            width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            padding: '0px 3px',
                            borderBottom: '2px solid black'
                        } }, ['GIFT', 'Comm.sample', 'Others', 'Docs', 'Returned goods', 'Sale of goods'].map((item, i) => {
                        return (react_1.default.createElement(renderer_1.View, { style: { minWidth: i % 3 == 1 ? '35%' : '25%', display: 'flex', flexDirection: 'row', margin: '1px 0px' } },
                            react_1.default.createElement(renderer_1.Image, { src: i == 5 ? 'src/img/check.png' : 'src/img/uncheck.png', style: { height: 5, marginRight: 2 } }),
                            react_1.default.createElement(renderer_1.Text, null, item)));
                    })),
                    renderTable([
                        "Quantity and detailed\ndescription of contents",
                        "Weight\n(in kg)",
                        "Value\n(in USD)"
                    ], true),
                    react_1.default.createElement(renderer_1.View, { style: { height: '22%', borderBottom: '1px solid black' } }, receiptData.productsInfo
                        .map((product, i) => renderTable([product.name.length > 25
                            ? product.name.slice(0, 25).concat("...")
                            : product.name,
                        parseFloat((receiptData.packageInfo.r_weight / receiptData.productsInfo.length).toFixed(2)).toPrecision() + 'kg',
                        parseFloat((parseFloat(product.price) * parseInt(product.qty)).toFixed(2)).toPrecision() + '$'
                    ]))),
                    renderTable(["For commercial items only\nIf known HS tariff number\nand country of origin of\ngoods",
                        "Total\nWeight",
                        "Total\nValue"], true),
                    react_1.default.createElement(renderer_1.View, { style: { height: '15%', borderBottom: '1px solid black' } }, renderTable([receiptData.productsInfo[0]['hscode'],
                        parseFloat(receiptData.packageInfo.r_weight) + 'kg',
                        parseFloat(receiptData.productsInfo.reduce((pre, cur) => pre + parseFloat(cur.price) * parseInt(cur.qty), 0).toFixed(2)).toPrecision()
                            + '$'])),
                    react_1.default.createElement(renderer_1.View, { style: { padding: 3 } },
                        react_1.default.createElement(renderer_1.Text, { style: { lineHeight: 1.3 } }, "I, the undersigned whose name and address are given on the item, certify that the particulars given in this declaration are correct and that this item does not contain any dangerous article or articles prohibited by legislation or by custom regulations"),
                        react_1.default.createElement(renderer_1.View, { style: { marginTop: 20 } },
                            react_1.default.createElement(renderer_1.Text, null, "Date and Sender's signature")),
                        react_1.default.createElement(renderer_1.View, { style: { marginTop: 3 } },
                            react_1.default.createElement(renderer_1.Text, null, receiptData.senderInfo.name),
                            react_1.default.createElement(renderer_1.Text, null, (0, moment_1.default)(receiptData.packageInfo.reg_date).format("YYYY-MM-DD"))))),
                react_1.default.createElement(renderer_1.View, { style: { width: '63%' } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%' } },
                        react_1.default.createElement(renderer_1.View, { style: {
                                borderBottom: '1px solid black',
                                height: '18%',
                                display: 'flex', flexDirection: 'row'
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { paddingTop: 8, width: '55%', display: 'flex', flexDirection: 'row', borderRight: '1px solid black' } },
                                react_1.default.createElement(renderer_1.View, { style: { paddingTop: 6 } },
                                    react_1.default.createElement(renderer_1.Text, { style: { transform: "rotate(-90deg)", fontSize: 7, fontWeight: "bold" } }, "FROM")),
                                react_1.default.createElement(renderer_1.View, { style: { fontSize: 6 } },
                                    react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' } },
                                        react_1.default.createElement(renderer_1.Text, null, "Sender"),
                                        receiptData['packageInfo']['delivery_name'] == 'TEST_UZ' &&
                                            react_1.default.createElement(renderer_1.View, null,
                                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 8 } }, "HT2"))),
                                    react_1.default.createElement(renderer_1.Text, null, "Optimal Mile Ltd."),
                                    react_1.default.createElement(renderer_1.Text, null, "P.O. Box 0371"),
                                    react_1.default.createElement(renderer_1.Text, null, "100000, TASHKENT"),
                                    react_1.default.createElement(renderer_1.Text, null, "Republic of Uzbekistan"))),
                            react_1.default.createElement(renderer_1.View, { style: { width: '45%', fontSize: 6 } },
                                react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' } },
                                    react_1.default.createElement(renderer_1.View, { style: { width: '70%', textAlign: 'center', display: 'flex', justifyContent: 'flex-end', } },
                                        react_1.default.createElement(renderer_1.View, { style: {
                                                height: '60%',
                                                border: '1px solid black', display: 'flex', flexDirection: 'row',
                                            } },
                                            react_1.default.createElement(renderer_1.View, { style: {
                                                    width: '100%', justifyContent: 'center', alignItems: 'center'
                                                } },
                                                react_1.default.createElement(renderer_1.Image, { style: { width: 25 }, src: 'src/img/UZ_POST/uzpost_2_2.png' }))),
                                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 7 } }, "POSTAGE PAID")),
                                    react_1.default.createElement(renderer_1.View, { style: { backgroundColor: 'black', width: '100%', textAlign: 'center' } },
                                        react_1.default.createElement(renderer_1.Text, { style: { color: 'white', padding: '2px 0px', fontSize: 8 } }, "PRIORITY"))))),
                        react_1.default.createElement(renderer_1.View, { style: {
                                borderBottom: '1px solid black',
                                height: '18%',
                                display: 'flex', flexDirection: 'row',
                                fontSize: 8, position: 'relative'
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', height: '100%', width: '100%' } },
                                react_1.default.createElement(renderer_1.View, { style: {
                                        width: '55%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
                                    } },
                                    react_1.default.createElement(renderer_1.View, null,
                                        react_1.default.createElement(renderer_1.Text, { style: { fontWeight: "bold", fontSize: 8, padding: '0px 3px' } }, "TO")),
                                    react_1.default.createElement(renderer_1.View, { style: { padding: 3, fontSize: 7,
                                            borderLeft: '1px solid black', height: '100%',
                                            display: 'flex', justifyContent: 'space-between'
                                        } },
                                        react_1.default.createElement(renderer_1.View, null,
                                            react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.name),
                                            react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.address1),
                                            react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.address2)),
                                        react_1.default.createElement(renderer_1.View, { style: {} },
                                            react_1.default.createElement(renderer_1.Text, null,
                                                receiptData.receiverInfo.city,
                                                ", ",
                                                receiptData.receiverInfo.state),
                                            react_1.default.createElement(renderer_1.Text, null,
                                                "ZIPCODE: ",
                                                receiptData.receiverInfo.zip),
                                            react_1.default.createElement(renderer_1.Text, null, receiptData.packageInfo.country_name_en)))),
                                react_1.default.createElement(renderer_1.View, { style: { width: '45%', display: 'flex', justifyContent: 'space-between' } },
                                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', paddingTop: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                                        react_1.default.createElement(renderer_1.Image, { style: { width: 9, height: 9, marginRight: 10, marginTop: 2 }, src: 'src/img/LT_POST/phone.png' }),
                                        react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.phone)),
                                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', alignItems: 'flex-end' } },
                                        react_1.default.createElement(renderer_1.View, { style: { border: '1px solid black', margin: -1, padding: 2 } },
                                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, receiptData.packageInfo.country_code.toUpperCase())))))),
                        react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: "column", justifyContent: "space-between",
                                borderBottom: '1px solid black',
                                height: '30%', fontSize: 5 } },
                            react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', lineHeight: 1 } },
                                react_1.default.createElement(renderer_1.View, { style: { width: '100%', padding: 3 } },
                                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
                                        react_1.default.createElement(renderer_1.View, { style: { fontSize: 7, lineHeight: 1 } },
                                            react_1.default.createElement(renderer_1.Text, null,
                                                "No: ",
                                                receiptData.packageInfo.in_track_no,
                                                " / ",
                                                receiptData.packageInfo.reference_no))),
                                    receiptData.productsInfo
                                        .slice(0, 4)
                                        .map((product) => {
                                        var description = [product.name, product.sku, product.qty + 'ea'].join(' / ');
                                        return (react_1.default.createElement(renderer_1.View, { style: { marginTop: 2, width: '100%', display: "flex", flexDirection: "row" } },
                                            react_1.default.createElement(renderer_1.Text, { style: { lineHeight: 1, fontSize: 7, textOverflow: "ellipsis", overflow: "hidden" } }, description)));
                                    }))),
                            react_1.default.createElement(renderer_1.View, { style: {
                                    display: 'flex', flexDirection: 'row',
                                    alignItems: 'center', justifyContent: 'center'
                                } },
                                react_1.default.createElement(renderer_1.Image, { style: { height: 20, width: 25, marginRight: 2, marginLeft: 2 }, src: 'src/img/LT_POST/scan.png' }),
                                react_1.default.createElement(renderer_1.Image, { style: { height: 20, width: 30 }, src: 'src/img/LT_POST/no_signature.png' }))),
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', alignItems: 'center',
                                justifyContent: 'space-between', flexGrow: 1,
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { fontSize: 8, padding: '5px 0px 0px 5px', width: '100%' } },
                                react_1.default.createElement(renderer_1.Text, null,
                                    receiptData.senderInfo.name,
                                    ", ",
                                    (0, moment_1.default)(receiptData.packageInfo.reg_date).format("YYYY-MM-DD"))),
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' } },
                                react_1.default.createElement(renderer_1.Image, { style: { width: '100%' }, source: { uri: barcodeUrl } })),
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 5 } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, receiptData.packageInfo.in_track_no)))))))));
}
;
