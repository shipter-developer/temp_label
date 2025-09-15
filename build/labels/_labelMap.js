"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SHIPTER_1 = __importDefault(require("./SHIPTER"));
const UNI_SHIPTER_1 = __importDefault(require("./UNI_SHIPTER"));
const PP_IOSS_1 = __importDefault(require("./PP_IOSS"));
const UZ_POST_1 = __importDefault(require("./UZ_POST"));
const UA_1 = __importDefault(require("./UA"));
const UNI_VERTICAL_1 = __importDefault(require("./UNI_VERTICAL"));
const CJ_1 = __importDefault(require("./CJ"));
const UNI_SHIPENTEGRA_1 = __importDefault(require("./UNI_SHIPENTEGRA"));
const UZ_POST_REG_1 = __importDefault(require("./UZ_POST_REG"));
const UZ_POST_EMS_1 = __importDefault(require("./UZ_POST_EMS"));
const NL_POST_CN22_PRIME_1 = __importDefault(require("./NL_POST_CN22_PRIME"));
const SK_POST_PRIME_1 = __importDefault(require("./SK_POST_PRIME"));
const SK_POST_CN22_PRIME_1 = __importDefault(require("./SK_POST_CN22_PRIME"));
const JM_PP_IOSS_1 = __importDefault(require("./jm/JM_PP_IOSS"));
const JM_SHIPTER_1 = __importDefault(require("./jm/JM_SHIPTER"));
const JM_SK_POST_PRIME_1 = __importDefault(require("./jm/JM_SK_POST_PRIME"));
const JM_SK_POST_CN22_PRIME_1 = __importDefault(require("./jm/JM_SK_POST_CN22_PRIME"));
const JM_UA_1 = __importDefault(require("./jm/JM_UA"));
const JM_UZ_POST_1 = __importDefault(require("./jm/JM_UZ_POST"));
const JM_UZ_POST_REG_1 = __importDefault(require("./jm/JM_UZ_POST_REG"));
const JM_UZ_POST_EMS_1 = __importDefault(require("./jm/JM_UZ_POST_EMS"));
const UNI_PAK_1 = __importDefault(require("./UNI_PAK"));
const PACKING_1 = __importDefault(require("./packing/PACKING"));
const BARCODE_1 = __importDefault(require("./BARCODE"));
const LABELS = {
    BARCODE: BARCODE_1.default,
    UNI_PAK: UNI_PAK_1.default,
    SHIPTER: SHIPTER_1.default,
    UNI_SHIPTER: UNI_SHIPTER_1.default,
    PP_IOSS: PP_IOSS_1.default,
    UA: UA_1.default,
    UNI_VERTICAL: UNI_VERTICAL_1.default,
    UZ_POST: UZ_POST_1.default,
    CJ: CJ_1.default,
    UNI_SHIPENTEGRA: UNI_SHIPENTEGRA_1.default,
    UZ_POST_REG: UZ_POST_REG_1.default,
    UZ_POST_EMS: UZ_POST_EMS_1.default,
    NL_POST_CN22_PRIME: NL_POST_CN22_PRIME_1.default,
    SK_POST_PRIME: SK_POST_PRIME_1.default,
    SK_POST_CN22_PRIME: SK_POST_CN22_PRIME_1.default,
    JM_PP_IOSS: JM_PP_IOSS_1.default,
    JM_SHIPTER: JM_SHIPTER_1.default,
    JM_SK_POST_CN22_PRIME: JM_SK_POST_CN22_PRIME_1.default,
    JM_SK_POST_PRIME: JM_SK_POST_PRIME_1.default,
    JM_UA: JM_UA_1.default,
    JM_UZ_POST: JM_UZ_POST_1.default,
    JM_UZ_POST_EMS: JM_UZ_POST_EMS_1.default,
    JM_UZ_POST_REG: JM_UZ_POST_REG_1.default,
    PACKING: PACKING_1.default
};
exports.default = LABELS;
