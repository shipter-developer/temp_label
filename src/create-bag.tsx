
import React from "react";
import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    pdf
} from "@react-pdf/renderer";

import {receiptsInterface, bagsInterface} from "./type/type";
import SHIPTER_BAG from "./labels/bag/SHIPTER_BAG";

const LABELS = {
    'SHIPTER_BAG' : SHIPTER_BAG
}
const CreatePdf = ({bags}:bagsInterface) => {
    return (
        <Document>
            {
                bags.map((bag)=>{
                    return LABELS[bag['label_name']]({bagData : {...bag}})
                })
            }
        </Document>
    );
}
export default async (bags) => {
    return await ReactPDF.renderToStream(<CreatePdf bags={bags}/>);
};