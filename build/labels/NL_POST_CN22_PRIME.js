"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NL_POST_CN22_PRIME;
const react_1 = __importDefault(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const moment_1 = __importDefault(require("moment"));
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const canvas_1 = require("canvas");
renderer_1.Font.register({ family: 'SpoqaHanSansNeo', fonts: [{ src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf' }, { src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold' }] });
function NL_POST_CN22_PRIME(props) {
    const { receiptData } = props;
    const canvas = (0, canvas_1.createCanvas)(10, 10);
    (0, jsbarcode_1.default)(canvas, receiptData.packageInfo.in_track_no, { height: 60, format: "CODE128", displayValue: false });
    const barcodeUrl = canvas.toDataURL("image/png");
    const renderTable = ([col1, col2, col3], border = false) => (react_1.default.createElement(renderer_1.View, { style: {
            width: '100%',
            borderBottom: border ? '1px solid black' : 0,
            flexDirection: 'row',
            padding: border ? '1px 2px' : '2px 2px'
        } },
        react_1.default.createElement(renderer_1.View, { style: { width: '50%' } },
            react_1.default.createElement(renderer_1.Text, null, col1)),
        react_1.default.createElement(renderer_1.View, { style: { width: '25%', textAlign: 'center' } },
            react_1.default.createElement(renderer_1.Text, null, col2)),
        react_1.default.createElement(renderer_1.View, { style: { width: '25%', textAlign: 'center' } },
            react_1.default.createElement(renderer_1.Text, null, col3))));
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
                                react_1.default.createElement(renderer_1.Text, null, "Designated operator Post NL"))),
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 15 } },
                                "CN22",
                                ' '))),
                    react_1.default.createElement(renderer_1.View, { style: {
                            width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            padding: 3,
                            borderBottom: '2px solid black'
                        } },
                        react_1.default.createElement(renderer_1.Text, null, "Category: Sale of Goods")),
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
                    react_1.default.createElement(renderer_1.View, { style: { height: '5%', borderBottom: '1px solid black' } }, renderTable([receiptData.productsInfo[0]['hscode'],
                        parseFloat(receiptData.packageInfo.r_weight) + 'kg',
                        parseFloat(receiptData.productsInfo.reduce((pre, cur) => pre + parseFloat(cur.price) * parseInt(cur.qty), 0).toFixed(2)).toPrecision()
                            + '$'])),
                    react_1.default.createElement(renderer_1.View, { style: { flex: 1, padding: 3, display: 'flex', justifyContent: 'space-between' } },
                        react_1.default.createElement(renderer_1.View, null,
                            react_1.default.createElement(renderer_1.Text, { style: { lineHeight: 1.2 } }, "I, the undersigned whose name and address are given on the item, certify that the particulars given in this declaration are correct and that this item does not contain any dangerous article or articles prohibited by legislation or by custom regulations"),
                            react_1.default.createElement(renderer_1.View, { style: { marginTop: 5 } },
                                react_1.default.createElement(renderer_1.Text, null, "Date and Sender's signature"),
                                react_1.default.createElement(renderer_1.View, { style: { marginTop: 2 } },
                                    react_1.default.createElement(renderer_1.Text, null,
                                        receiptData.senderInfo.name,
                                        ", ",
                                        (0, moment_1.default)(receiptData.packageInfo.reg_date).format("YYYY-MM-DD"))))),
                        react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', lineHeight: 1 } },
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%', padding: 3 } },
                                react_1.default.createElement(renderer_1.View, { style: { marginBottom: 2 } },
                                    react_1.default.createElement(renderer_1.Text, null,
                                        "No: ",
                                        receiptData.packageInfo.in_track_no,
                                        " "),
                                    react_1.default.createElement(renderer_1.Text, null,
                                        "Order No: ",
                                        receiptData.packageInfo.reference_no,
                                        " ")),
                                receiptData.productsInfo
                                    .slice(0, 4)
                                    .map((product) => {
                                    var description = [product.name, product.sku, product.qty + 'ea'].join(' / ');
                                    return (react_1.default.createElement(renderer_1.View, { style: { marginTop: 2, width: '100%', display: "flex", flexDirection: "row" } },
                                        react_1.default.createElement(renderer_1.Text, { style: { textOverflow: "ellipsis", overflow: "hidden" } }, description)));
                                }))))),
                react_1.default.createElement(renderer_1.View, { style: { width: '63%' } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%' } },
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', borderBottom: '1px solid black', textAlign: 'center', fontSize: 4, padding: '1px 0px' } },
                            react_1.default.createElement(renderer_1.Text, null, "Return if undeliverable to: H-108505, Postbus 7270, 3109 AF schiedam, Netherlands")),
                        react_1.default.createElement(renderer_1.View, { style: {
                                borderBottom: '1px solid black',
                                height: '18%',
                                display: 'flex', flexDirection: 'row'
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { paddingTop: 8, width: '55%', display: 'flex', flexDirection: 'row', borderRight: '1px solid black' } },
                                react_1.default.createElement(renderer_1.View, { style: { paddingTop: 6 } },
                                    react_1.default.createElement(renderer_1.Text, { style: { transform: "rotate(-90deg)", fontSize: 7, fontWeight: "bold" } }, "FROM")),
                                react_1.default.createElement(renderer_1.View, { style: { fontSize: 6 } },
                                    react_1.default.createElement(renderer_1.Text, null, "H3 NETWORKS"),
                                    react_1.default.createElement(renderer_1.Text, null, "#B103, The Sky Vallery 5th"),
                                    react_1.default.createElement(renderer_1.Text, null, "Hwagok-ro 416, 07548, Seoul"),
                                    react_1.default.createElement(renderer_1.Text, null, "South Korea"))),
                            react_1.default.createElement(renderer_1.View, { style: { width: '45%', fontSize: 6 } },
                                react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: "center" } },
                                    react_1.default.createElement(renderer_1.View, { style: {
                                            display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
                                        } },
                                        react_1.default.createElement(renderer_1.Image, { style: { height: 33 }, src: 'src/img/NL_POST/tracked_express_logo.jpg' }),
                                        react_1.default.createElement(renderer_1.Image, { style: { height: 33 }, src: 'src/img/NL_POST/nl_post_logo2.png' })),
                                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 7 } }, "Packet Tracked"),
                                    react_1.default.createElement(renderer_1.View, { style: { backgroundColor: 'black', width: '100%', textAlign: 'center' } },
                                        react_1.default.createElement(renderer_1.Text, { style: { color: 'white', padding: '2px 0px', fontSize: 8 } }, "STANDARD"))))),
                        react_1.default.createElement(renderer_1.View, { style: {
                                borderBottom: '1px solid black',
                                height: '28%',
                                display: 'flex', flexDirection: 'row',
                                fontSize: 8, position: 'relative'
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', height: '100%', width: '100%' } },
                                react_1.default.createElement(renderer_1.View, { style: {
                                        width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
                                    } },
                                    react_1.default.createElement(renderer_1.View, null,
                                        react_1.default.createElement(renderer_1.Text, { style: { fontWeight: "bold", fontSize: 8, padding: '0px 3px' } }, "TO")),
                                    react_1.default.createElement(renderer_1.View, { style: { padding: 5,
                                            borderLeft: '1px solid black', height: '100%',
                                            display: 'flex', justifyContent: 'space-between'
                                        } },
                                        react_1.default.createElement(renderer_1.View, null,
                                            react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.name),
                                            react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.address1),
                                            react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.address2)),
                                        react_1.default.createElement(renderer_1.View, { style: { paddingTop: 5 } },
                                            react_1.default.createElement(renderer_1.Text, null,
                                                receiptData.receiverInfo.city,
                                                ", ",
                                                receiptData.receiverInfo.state),
                                            react_1.default.createElement(renderer_1.Text, null,
                                                "ZIPCODE: ",
                                                receiptData.receiverInfo.zip,
                                                ", ",
                                                receiptData.packageInfo.country_name_en)))),
                                react_1.default.createElement(renderer_1.View, { style: { width: '35%', display: 'flex', justifyContent: 'space-between' } },
                                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', paddingTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                                        react_1.default.createElement(renderer_1.Image, { style: { width: 9, height: 9, marginRight: 2, marginTop: 1 }, src: 'src/img/NL_POST/phone.png' }),
                                        react_1.default.createElement(renderer_1.Text, null, receiptData.receiverInfo.phone)),
                                    react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', alignItems: 'flex-end' } },
                                        react_1.default.createElement(renderer_1.View, { style: { border: '1px solid black', margin: -1, padding: 2 } },
                                            react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, receiptData.packageInfo.country_code)))))),
                        react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row',
                                borderBottom: '1px solid black',
                                height: '20%', fontSize: 5 } },
                            react_1.default.createElement(renderer_1.View, { style: {
                                    width: '100%',
                                    display: 'flex', flexDirection: 'row',
                                    alignItems: 'center', justifyContent: 'center'
                                } },
                                react_1.default.createElement(renderer_1.Image, { style: { height: 35, width: 40, marginRight: 3, marginLeft: 2 }, src: 'src/img/NL_POST/scan.png' }))),
                        react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', alignItems: 'center',
                                justifyContent: 'space-between', flexGrow: 1,
                            } },
                            react_1.default.createElement(renderer_1.View, { style: { fontSize: 8, padding: '5px 0px 0px 5px', width: '100%' } },
                                react_1.default.createElement(renderer_1.Text, null,
                                    receiptData.senderInfo.name,
                                    ", ",
                                    (0, moment_1.default)(receiptData.packageInfo.reg_date).format("YYYY-MM-DD"))),
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                                react_1.default.createElement(renderer_1.Image, { style: { width: '100%' }, source: { uri: barcodeUrl } })),
                            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 5 } },
                                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 20 } }, receiptData.packageInfo.in_track_no)))))))));
}
;
