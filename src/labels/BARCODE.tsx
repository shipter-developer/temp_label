import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
export default function BARCODE(props){
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:80, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });


    return (
        <Page key={receiptData['packageInfo']['in_track_no']} size={{ width: 432, height: 288 }} orientation="portrait"   style={{
            fontSize: 10,
            padding:2,
            fontWeight:'bold',
            lineHeight:1,
            height:'100%',
            fontFamily: "SpoqaHanSansNeo",
        }}>
            <View style={{width:'100%', height:'100%',border:'2px solid black', display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                <View style={{width:'100%'}}>
                    <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Image style={{width:'80%'}} src={barcodeUrl} />
                    </View>
                    <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingTop:10}}>
                        <Text style={{fontSize:20}}>{receiptData.packageInfo.in_track_no}</Text>
                    </View>
                </View>

            </View>
        </Page>
    )
};

