// CreatePdfExport.tsx

import React from "react";
import ReactPDF, { Document } from "@react-pdf/renderer";
import { receiptsInterface } from "./type/type";
import LABELS from "./labels/_labelMap"; // LABELS 분리해도 가독성 좋아짐
import {createLogger} from './config/logger';
const shipterLogger = createLogger('shipter');


const CreatePdf: React.FC<receiptsInterface> = ({ receipts }) => {
    return (
        <Document>
            {receipts
                .filter(receipt => {
                    const label = receipt?.packageInfo?.label_name;
                    return label && Object.prototype.hasOwnProperty.call(LABELS, label);
                })
                .map(receipt => {
                    const label = receipt.packageInfo.label_name;
                    // const LabelComponent = LABELS[label as keyof typeof LABELS];
                    const LabelComponent = label in LABELS
                        ? LABELS[label as keyof typeof LABELS]
                        : LABELS["SHIPTER"];
                    return (
                        <LabelComponent
                            key={receipt.packageInfo.in_track_no}
                            receiptData={{ ...receipt }}
                        />
                    );
                })}
        </Document>
    );
};

const generatePdfStream = async (
    receipts: receiptsInterface['receipts']
): Promise<NodeJS.ReadableStream> => {
    try {
        const trackNums = receipts.map(x => x.packageInfo.in_track_no).join(', ');
        const trackPreview = trackNums.length > 200 ? trackNums.slice(0, 200) + '…' : trackNums;
        shipterLogger.info(`Generating PDF for ${receipts.length} receipts: [${trackPreview}]`);
        const stream = await ReactPDF.renderToStream(<CreatePdf receipts={receipts} />);
        return stream;

    } catch (e: any) {
        shipterLogger.error(`PDF generation failed: ${e.message}`, {
            stack: e.stack || 'no stack trace',
        });
        throw e;
    }
};

export default generatePdfStream;