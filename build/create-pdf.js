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
const react_1 = __importDefault(require("react"));
const renderer_1 = __importStar(require("@react-pdf/renderer"));
const SHIPTER_1 = __importDefault(require("./labels/SHIPTER"));
const UNI_SHIPTER_1 = __importDefault(require("./labels/UNI_SHIPTER"));
const PP_IOSS_1 = __importDefault(require("./labels/PP_IOSS"));
const UZ_POST_1 = __importDefault(require("./labels/UZ_POST"));
const UA_1 = __importDefault(require("./labels/UA"));
const UNI_VERTICAL_1 = __importDefault(require("./labels/UNI_VERTICAL"));
const LABELS = {
    'UA': UA_1.default,
    'UZ_POST': UZ_POST_1.default,
    'PP_IOSS': PP_IOSS_1.default,
    'UNI_SHIPTER': UNI_SHIPTER_1.default,
    'UNI_VERTICAL': UNI_VERTICAL_1.default,
    'SHIPTER': SHIPTER_1.default
};
const CreatePdf = ({ receipts }) => {
    return (react_1.default.createElement(renderer_1.Document, null, receipts.map((receipt) => {
        return LABELS[receipt['packageInfo']['label_name']]({ receiptData: Object.assign({}, receipt) });
    })));
};
exports.default = (receipts) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(receipts)
    // return <CreatePdf receipts={receipts}/>
    // var blob =  await pdf(<CreatePdf receipts={receipts}/>);
    // return blob.toBlob()
    // console.log(blob.toBlob())
    // console.log(blob.toString())
    // return await blob.toBlob();
    // const arrayBuffer = await blob.arrayBuffer();
    // return await Buffer.from(arrayBuffer);
    return yield renderer_1.default.renderToStream(react_1.default.createElement(CreatePdf, { receipts: receipts }));
    // const stream = await ReactPDF.renderToStream(<CreatePdf receipts={receipts}/>);
    //
    // return new Promise(function(resolve, reject) {
    //     const buffers = []
    //     stream.on('data', (data) => {
    //         buffers.push(data)
    //     })
    //     stream.on('end', () => {
    //         resolve(Buffer.concat(buffers))
    //     })
    //     stream.on('error', reject)
    // })
});
