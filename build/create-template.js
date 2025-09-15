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
const styles = renderer_1.StyleSheet.create({
    page: {
        backgroundColor: "#E4E4E4",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 600,
        color: "#131925",
        marginBottom: 8
    },
    statement: {
        fontSize: 20,
        color: "#131925",
        lineHeight: 1.4,
        marginBottom: 4,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#999999",
        margin: "24px 0 24px 0"
    },
    paragraph: {
        fontSize: 12,
        color: "#212935",
        lineHeight: 1.67,
    },
    columnParent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    columnStart: {
        flex: 1,
    },
    columnEnd: {
        flex: 1,
        alignItems: "flex-end"
    },
});
const PDF = ({ data }) => {
    return (react_1.default.createElement(renderer_1.Document, null,
        react_1.default.createElement(renderer_1.Page, { size: "A4", style: styles.page },
            react_1.default.createElement(renderer_1.View, { style: styles.section },
                react_1.default.createElement(renderer_1.View, { style: styles.columnParent },
                    react_1.default.createElement(renderer_1.View, { style: styles.columnStart },
                        react_1.default.createElement(renderer_1.Text, { style: styles.heading }, data.companyName),
                        react_1.default.createElement(renderer_1.Text, { style: styles.paragraph }, data.companyPhone),
                        react_1.default.createElement(renderer_1.Text, { style: styles.paragraph }, data.companyEmail)),
                    react_1.default.createElement(renderer_1.View, { style: styles.columnEnd },
                        react_1.default.createElement(renderer_1.Text, { style: styles.heading }, "Receipt"),
                        react_1.default.createElement(renderer_1.Text, { style: styles.paragraph },
                            "Receipt number: ",
                            data.receiptNumber),
                        react_1.default.createElement(renderer_1.Text, { style: styles.paragraph },
                            "Date paid: ",
                            data.datePaid),
                        react_1.default.createElement(renderer_1.Text, { style: styles.paragraph },
                            "Payment method: ",
                            data.paymentMethod))),
                react_1.default.createElement(renderer_1.View, { style: styles.divider }),
                react_1.default.createElement(renderer_1.View, null,
                    react_1.default.createElement(renderer_1.Text, { style: styles.statement }, `${data.amount} paid on ${data.datePaid}`),
                    react_1.default.createElement(renderer_1.Text, { style: styles.paragraph }, "Thank you for your business!"))))));
};
exports.default = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield renderer_1.default.renderToStream(react_1.default.createElement(PDF, { data }));
});
