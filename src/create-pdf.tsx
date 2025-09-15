import React from "react";
import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    pdf
} from "@react-pdf/renderer";

import SHIPTER from "./labels/SHIPTER";
import {receiptType, receiptsInterface, productType} from "./type/type";
import UNI_SHIPTER from "./labels/UNI_SHIPTER";
import PP_IOSS from "./labels/PP_IOSS";
import UZ_POST from "./labels/UZ_POST";
import UA from "./labels/UA";
import UNI_VERTICAL from "./labels/UNI_VERTICAL";


const LABELS = {
    'UA' : UA,
    'UZ_POST' : UZ_POST,
    'PP_IOSS' : PP_IOSS,
    'UNI_SHIPTER' : UNI_SHIPTER,
    'UNI_VERTICAL' : UNI_VERTICAL,
    'SHIPTER': SHIPTER
}
const CreatePdf = ({receipts}:receiptsInterface) => {
    return (
        <Document>
            {
                receipts.map((receipt)=>{
                    return LABELS[receipt['packageInfo']['label_name']]({receiptData : {...receipt}})
                })
            }
        </Document>
    );
}
export default async (receipts) => {
    // console.log(receipts)
    // return <CreatePdf receipts={receipts}/>
    // var blob =  await pdf(<CreatePdf receipts={receipts}/>);
    // return blob.toBlob()
    // console.log(blob.toBlob())
    // console.log(blob.toString())
    // return await blob.toBlob();
    // const arrayBuffer = await blob.arrayBuffer();
    // return await Buffer.from(arrayBuffer);

    return await ReactPDF.renderToStream(<CreatePdf receipts={receipts}/>);
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
};