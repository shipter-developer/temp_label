"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TrackingFetcher.ts
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = __importDefault(require("../config/config"));
class Shipter {
    constructor() {
    }
    static getDoc(trackingNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT TR._ID,
                   TR.NATIONCODE,
                   n.NATIONNAMEENG,
                   TR.DELIVERYTYPE,
                   TR.RECEIPTNUM,
                   TR.REQUESTDATE,
                   TR.ORDERNUM1,
                   TR.ORDERNUM2,
                   TR.TRACKINGNO,
                   TR.STARTNATIONTRACKNO,
                   TR.REALWEIGHT,
                   TR.VWEIGHT,
                   TR.PRICEWEIGHT,
                   TR.PRODUCTNAME,
                   TR.RECEIVERMEMO,
                   TR.TOTALPRODUCTCOUNT,
                   TR.TOTALPRODUCTPRICE,
                   TR.PRODUCTPRICECURRENCY,
                   TR.SENDERENGNAME,
                   TR.SENDERPHONENUMBER,
                   TR.SENDERENGADDRESS,
                   TR.RECEIVERNAME,
                   TR.RECEIVERPHONENUMBER,
                   TR.RECEIVERZIPCODE,
                   TR.RECEIVERADDRESS,
                   TR.RECEIVERADDRESS2,
                   TR.RECEIVERID,
                   TR.RECEIVEREMAIL,
                   TR.RECEIVERSTATE,
                   TR.RECEIVERCITY,
                   TR.IOSS,
                   TR.PRODUCTINFO,
                   TDT.DELIVERYTYPENAME,
                   TDT.APITYPE,
                   TNDT.DELIVERYTYPEID,
                   TR.COMPANYID
            FROM TBL_RECEIPT TR
                     LEFT JOIN TBL_NATION_DELIVERY_TYPE TNDT ON TNDT._ID = TR.DELIVERYTYPE
                     LEFT JOIN TBL_DELIVERY_TYPE TDT ON TDT._ID = TNDT.DELIVERYTYPEID
                     LEFT JOIN TBL_NATION n ON TR.NATIONCODE = n.NATIONCODE
                     LEFT JOIN TBL_RECEIPT_PROCESS rp ON TR._ID = rp.RECEIPTID
            WHERE rp.TRACKINGNO = ?
                LIMIT 1
        `;
            const [rows] = yield this.pool.query(query, [trackingNo]);
            if (!Array.isArray(rows) || rows.length === 0)
                return null;
            const row = rows[0];
            const regex = /[^0-9]/g;
            // 안전한 JSON 파싱
            let productInfo = [];
            try {
                productInfo = JSON.parse(row['PRODUCTINFO'] || '[]');
            }
            catch (e) {
                productInfo = [];
            }
            const labelNameMap = {
                134: 'PP_IOSS',
                140: 'SK_POST_PRIME',
                141: 'SK_POST_PRIME',
                158: 'UA',
                229: 'UZ_POST_EMS',
                242: 'UNI_SHIPTER',
                243: 'UA',
                254: 'UZ_POST',
                308: 'UZ_POST_EMS',
                309: 'UZ_POST',
                319: 'UZ_POST',
                321: 'SK_POST_PRIME',
                322: 'SK_POST_PRIME',
                333: 'UA',
                338: 'UZ_POST',
                339: 'UZ_POST',
                403: 'SK_POST_CN22_PRIME',
                405: 'UA',
                409: 'UZ_POST_REG',
                411: 'UZ_POST_REG',
                412: 'UZ_POST_REG',
                414: 'UZ_POST_REG',
                415: 'SK_POST_CN22_PRIME',
                416: 'SK_POST_CN22_PRIME',
                430: 'UNI_SHIPTER',
                431: 'UNI_SHIPTER',
                432: 'UNI_SHIPTER',
                433: 'UNI_SHIPTER',
                435: 'UNI_SHIPTER',
                439: 'UA',
                444: 'UNI_PAK'
            };
            const usCity = { JFK: 'A', MIA: 'B', ORD: 'C', DFW: 'D', LAX: 'E' };
            const deliveryType = parseInt(row['DELIVERYTYPE'], 10);
            const deliveryTypeName = row['DELIVERYTYPENAME'];
            const receiverMemo = row['RECEIVERMEMO'];
            const companyId = parseInt(row['COMPANYID'], 10);
            // etcInfo 구성
            let etcInfo = {};
            if ([242, 430, 431, 432, 433, 435, 444].includes(deliveryType)) {
                const airport = deliveryTypeName.split('_')[1]; // ex) US_LAX → LAX
                etcInfo = {
                    userdata1: airport == 'PAK' ? 'A' : usCity[airport],
                    userdata2: receiverMemo,
                };
            }
            // 라벨 이름 구성
            let label_name = labelNameMap[deliveryType] || 'SHIPTER';
            if (companyId === 601) {
                label_name = 'JM_' + label_name;
            }
            const doc = {
                packageInfo: {
                    label_name: label_name,
                    reg_date: row['REQUESTDATE'], // 필요시 날짜 포맷 YYYY-MM-DD로 변환
                    country_name_en: row['NATIONNAMEENG'],
                    country_code: row['NATIONCODE'],
                    method_name: row['DELIVERYTYPENAME'],
                    reference_no: row['ORDERNUM1'], // or trackingNo, 선택
                    box_num: 1, // 항상 1로 고정이라면 상수, 아니라면 row에서 추출
                    r_weight: row['REALWEIGHT'] || 1,
                    in_track_no: row['TRACKINGNO'],
                    start_track_no: row['STARTNATIONTRACKNO'] || '',
                    currency: row['PRODUCTPRICECURRENCY']
                },
                senderInfo: {
                    name: row['SENDERENGNAME'],
                    phone: row['SENDERPHONENUMBER'],
                    email: '',
                    address1: row['SENDERENGADDRESS'],
                    address2: "",
                    state: "",
                    city: "",
                    zip: "",
                },
                receiverInfo: {
                    name: row['RECEIVERNAME'],
                    phone: (row['RECEIVERPHONENUMBER'] || '').replace(regex, ''),
                    email: row['RECEIVEREMAIL'],
                    zip: row['RECEIVERZIPCODE'],
                    state: row['RECEIVERSTATE'],
                    city: row['RECEIVERCITY'],
                    address1: row['RECEIVERADDRESS'],
                    address2: row['RECEIVERADDRESS2'],
                },
                etcInfo: {
                    userdata1: (etcInfo === null || etcInfo === void 0 ? void 0 : etcInfo.userdata1) || '',
                    userdata2: (etcInfo === null || etcInfo === void 0 ? void 0 : etcInfo.userdata2) || '',
                },
                productsInfo: productInfo.map((pro) => ({
                    sku: pro['productsku'],
                    name: pro['productname'],
                    qty: pro['productcount'],
                    price: pro['productprice'],
                    brand: pro['brandname'],
                    url: '',
                    hscode: pro['hscode'],
                }))
            };
            // 배송타입 → 라벨명 매핑
            return doc;
        });
    }
}
Shipter.pool = promise_1.default.createPool({
    host: config_1.default.host,
    user: config_1.default.user,
    password: config_1.default.password,
    database: config_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});
exports.default = Shipter;
