"use strict";
// CreatePdfExport.tsx
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
const _labelMap_1 = __importDefault(require("./labels/_labelMap")); // LABELS 분리해도 가독성 좋아짐
const logger_1 = require("./config/logger");
const shipterLogger = (0, logger_1.createLogger)('shipter');
const CreatePdf = ({ receipts }) => {
    return (react_1.default.createElement(renderer_1.Document, null, receipts
        .filter(receipt => {
        var _a;
        const label = (_a = receipt === null || receipt === void 0 ? void 0 : receipt.packageInfo) === null || _a === void 0 ? void 0 : _a.label_name;
        return label && Object.prototype.hasOwnProperty.call(_labelMap_1.default, label);
    })
        .map(receipt => {
        const label = receipt.packageInfo.label_name;
        // const LabelComponent = LABELS[label as keyof typeof LABELS];
        const LabelComponent = label in _labelMap_1.default
            ? _labelMap_1.default[label]
            : _labelMap_1.default["SHIPTER"];
        return (react_1.default.createElement(LabelComponent, { key: receipt.packageInfo.in_track_no, receiptData: Object.assign({}, receipt) }));
    })));
};
const generatePdfStream = (receipts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trackNums = receipts.map(x => x.packageInfo.in_track_no).join(', ');
        const trackPreview = trackNums.length > 200 ? trackNums.slice(0, 200) + '…' : trackNums;
        shipterLogger.info(`Generating PDF for ${receipts.length} receipts: [${trackPreview}]`);
        const stream = yield renderer_1.default.renderToStream(react_1.default.createElement(CreatePdf, { receipts: receipts }));
        return stream;
    }
    catch (e) {
        shipterLogger.error(`PDF generation failed: ${e.message}`, {
            stack: e.stack || 'no stack trace',
        });
        throw e;
    }
});
exports.default = generatePdfStream;
