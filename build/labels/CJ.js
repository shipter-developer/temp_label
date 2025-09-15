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
exports.default = CJ;
const react_1 = __importStar(require("react"));
const renderer_1 = require("@react-pdf/renderer");
const moment_1 = __importDefault(require("moment"));
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const canvas_4 = require("canvas");
renderer_1.Font.register({ family: 'Noto Sans KR',
    fonts: [
        { src: 'src/fonts/Noto_Sans_KR/static/NotoSansKR-Bold.ttf' },
        // {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold'}
    ]
});
function CJ(props) {
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas_1 = (0, canvas_4.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas_1, receiptData['packageInfo']['in_track_no'], { height: 50, format: 'CODE128', displayValue: false });
        return canvas_1.toDataURL('image/png');
    });
    const [smallBarcodeUrl, setSmallBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas_2 = (0, canvas_4.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas_2, receiptData['packageInfo']['in_track_no'], { height: 30, format: 'CODE128', displayValue: false });
        return canvas_2.toDataURL('image/png');
    });
    const [sortingBarcodeUrl, setSortingBarcodeUrl] = (0, react_1.useState)(() => {
        const canvas_3 = (0, canvas_4.createCanvas)(10, 10);
        (0, jsbarcode_1.default)(canvas_3, receiptData['etcInfo']['CLSFCD'], { height: 60, format: 'CODE128', displayValue: false });
        return canvas_3.toDataURL('image/png');
    });
    // {
    //     "RESULT_CD": "S",
    //     "RESULT_DETAIL": "Success",
    //     "DATA": {
    //     "CLSFCD": "3Z70",
    //         "SUBCLSFCD": "2g",
    //         "CLSFADDR": "등촌 628-9 스카이5",
    //         "CLLDLVBRANNM": "강서등촌",
    //         "CLLDLVEMPNM": "##",
    //      "CLLDLVBRANNM"   "CLLDLVEMPNICKNM": "G01-6구역",
    //         "RSPSDIV": "01",
    //         "P2PCD": null
    // }
    // }
    const getBoxType = (doc) => {
        let weightKg = parseFloat(doc['actualWeight']);
        let lengthCm = parseFloat(doc['length']) + parseFloat(doc['width']) + parseFloat(doc['height']);
        const categories = [
            { name: "극소", maxLength: 80, maxWeight: 2 },
            { name: "소", maxLength: 100, maxWeight: 5 },
            { name: "중", maxLength: 120, maxWeight: 10 },
            { name: "대 1", maxLength: 140, maxWeight: 15 },
            { name: "대 2", maxLength: 160, maxWeight: 20 },
            { name: "이형", maxLength: 190, maxWeight: 25 },
            { name: "취급제한", maxLength: Infinity, maxWeight: Infinity } // 취급제한
        ];
        for (let category of categories) {
            if (lengthCm <= category.maxLength && weightKg <= category.maxWeight) {
                return category.name;
            }
        }
        return "06"; // 혹시나 예외 처리
    };
    const formatKoreanPhoneNumber = (phoneNumber) => {
        // 국가 코드 제거 및 0으로 시작하도록 변경
        phoneNumber = phoneNumber.replace(/^(\+82|82)/, '0');
        // 하이픈 포맷 적용
        if (/^02\d{8}$/.test(phoneNumber)) {
            // 서울 지역번호: 02-XXXX-XXXX
            return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }
        else if (/^0\d{2}\d{7,8}$/.test(phoneNumber)) {
            // 그 외 지역번호나 휴대폰 번호: 010-XXXX-YYYY 또는 031-XXX-YYYY
            return phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
        }
        else {
            // 형식이 맞지 않으면 그대로 반환
            return phoneNumber;
        }
    };
    const maskTail = (val, len) => {
        val = val.toString();
        return val.slice(0, val.length - len) + '*'.repeat(len);
    };
    return (react_1.default.createElement(renderer_1.Page, { key: receiptData['packageInfo']['in_track_no'], size: { width: 432, height: 288 }, orientation: "portrait", style: {
            fontSize: 10,
            padding: 2,
            height: '100%',
            fontFamily: "Noto Sans KR",
        } },
        react_1.default.createElement(renderer_1.View, { style: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column' } },
            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid gray' } },
                react_1.default.createElement(renderer_1.View, { style: { width: '40%', alignItems: 'center' } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 12 } }, receiptData['packageInfo']['in_track_no'])),
                react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' } },
                    react_1.default.createElement(renderer_1.View, null,
                        react_1.default.createElement(renderer_1.Text, null, (0, moment_1.default)(receiptData['packageInfo']['reg_date']).format('YYYY.MM.DD'))),
                    react_1.default.createElement(renderer_1.View, null,
                        react_1.default.createElement(renderer_1.Text, null, "1/1")),
                    react_1.default.createElement(renderer_1.View, null,
                        react_1.default.createElement(renderer_1.Text, null, "\uC7AC\uCD9C\uB825: ")))),
            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                    borderBottom: '0.5px solid gray'
                } },
                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', width: '30%', alignItem: 'center', justifyContent: 'flex-end' } },
                    react_1.default.createElement(renderer_1.Image, { style: { width: '95%', height: 56 }, src: sortingBarcodeUrl })),
                react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'row', alignItems: 'flex-end', lineHeight: 1, marginTop: -30 } },
                    react_1.default.createElement(renderer_1.Text, null,
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 36, textDecoration: 'underline' } }, receiptData['etcInfo']['CLSFCD'].slice(0, 1)),
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 53 } }, receiptData['etcInfo']['CLSFCD'].slice(1)),
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 36 } },
                            "-",
                            receiptData['etcInfo']['SUBCLSFCD']))),
                react_1.default.createElement(renderer_1.View, { style: { paddingRight: 25, minWidth: 10 } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 30 } }, receiptData['etcInfo']['P2PCD'] && receiptData['etcInfo']['P2PCD']))),
            react_1.default.createElement(renderer_1.View, { style: {
                    width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20
                } },
                react_1.default.createElement(renderer_1.View, { style: { fontSize: 10 } },
                    react_1.default.createElement(renderer_1.Text, null, [
                        maskTail(receiptData['etcInfo']['receiverLocalInfo']['name'], 1),
                        maskTail(formatKoreanPhoneNumber(receiptData['receiverInfo']['phone']), 4),
                        "/",
                        maskTail(formatKoreanPhoneNumber(receiptData['receiverInfo']['phone']), 4),
                    ].join(" ")),
                    react_1.default.createElement(renderer_1.Text, null, ['state', 'city', 'address1', 'address2'].map(x => receiptData['etcInfo']['receiverLocalInfo'][x] && receiptData['etcInfo']['receiverLocalInfo'][x]).join(" "))),
                react_1.default.createElement(renderer_1.View, { style: { width: '35%' } },
                    react_1.default.createElement(renderer_1.Image, { style: { width: '80%', height: 20 }, src: smallBarcodeUrl }))),
            react_1.default.createElement(renderer_1.View, { style: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20 } },
                react_1.default.createElement(renderer_1.Text, { style: { fontSize: 24, lineHeight: 1.3, marginTop: -5 } }, receiptData['etcInfo']['CLSFADDR'])),
            react_1.default.createElement(renderer_1.View, { style: { lineHeight: 0.9,
                    width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20,
                    fontSize: 10, alignItems: 'center'
                } },
                react_1.default.createElement(renderer_1.View, { style: { width: '45%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 7 } }, receiptData['senderInfo']['name']),
                    react_1.default.createElement(renderer_1.Text, { style: { fontSize: 7 } }, formatKoreanPhoneNumber(receiptData['senderInfo']['phone']))),
                react_1.default.createElement(renderer_1.View, { style: { paddingLeft: 20, width: '55%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
                    react_1.default.createElement(renderer_1.Text, null, getBoxType(receiptData)),
                    react_1.default.createElement(renderer_1.Text, null, "0"),
                    react_1.default.createElement(renderer_1.Text, null, "\uC2E0\uC6A9"))),
            react_1.default.createElement(renderer_1.View, { style: {
                    borderBottom: '0.5px solid gray',
                    width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20
                } },
                react_1.default.createElement(renderer_1.Text, null, ['state', 'city', 'address1', 'address2'].map(x => receiptData['senderInfo'][x] && receiptData['senderInfo'][x]).join(" "))),
            react_1.default.createElement(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' } },
                react_1.default.createElement(renderer_1.View, { style: { paddingLeft: 10 } }, [receiptData['productsInfo'].slice(0, 6).map(pro => {
                        return (react_1.default.createElement(renderer_1.View, { style: {
                                display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
                            } },
                            react_1.default.createElement(renderer_1.View, null,
                                react_1.default.createElement(renderer_1.Text, { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
                                    pro['brand'] && react_1.default.createElement(renderer_1.Text, null,
                                        "[",
                                        pro['brand'],
                                        "] "),
                                    react_1.default.createElement(renderer_1.Text, null,
                                        pro['name'].slice(0, 65),
                                        " ",
                                        pro['name'].length > 65 && '...'))),
                            react_1.default.createElement(renderer_1.View, { style: { paddingRight: 10 } },
                                react_1.default.createElement(renderer_1.Text, null, pro['qty']))));
                    })]),
                react_1.default.createElement(renderer_1.View, { style: {
                        width: '100%', height: 60,
                        borderTop: '0.5px solid gray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    } },
                    react_1.default.createElement(renderer_1.View, { style: { width: '50%', textAlign: 'center' } },
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 6 } }, "-"),
                        react_1.default.createElement(renderer_1.Text, { style: { fontSize: 18 } }, ["CLLDLVBRANNM", "CLLDLVEMPNICKNM"].map(x => receiptData['etcInfo'][x] && receiptData['etcInfo'][x]).join(" - "))),
                    react_1.default.createElement(renderer_1.View, { style: { width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' } },
                        react_1.default.createElement(renderer_1.Image, { style: { width: '80%', height: 48 }, src: barcodeUrl }),
                        react_1.default.createElement(renderer_1.View, { style: { marginTop: -5 } },
                            react_1.default.createElement(renderer_1.Text, null, receiptData['packageInfo']['in_track_no']))))))));
}
;
