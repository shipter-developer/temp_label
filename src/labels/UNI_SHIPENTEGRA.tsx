import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
export default function UNI_SHIPENTEGRA(props){
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:70, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });
    const [qrcodeUrl, setQrcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        QRCode.toCanvas(canvas,  receiptData['packageInfo']['in_track_no'],  { errorCorrectionLevel: 'H' })
        return canvas.toDataURL('image/png')
    });


    return (
        <Page key={receiptData['packageInfo']['in_track_no']} size={{width:432, height:288}}  style={{
            fontSize: 10,
            padding:2,
            fontWeight:'bold',
            lineHeight:1,
            height:'100%',
            fontFamily: "SpoqaHanSansNeo",
        }}>
            <View style={{width:'100%', height:'100%',border:'2px solid black', }}>
                <View style={{
                    width:'100%',
                    height:'16%',
                    borderBottom:'1px solid black', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View style={{width:'27%', marginLeft:10, alignItems:'center', fontSize:9, display:'flex', flexDirection:'row'}}>
                        <View style={{paddingRight:10}}>
                            <Image src='src/img/logo_shipentegra.png' />
                        </View>
                        {/*<View style={{paddingRight:10}}>*/}
                        {/*    <Text>www.shipter.kr</Text>*/}
                        {/*    <Text>www.shiptertracking.com</Text>*/}
                        {/*</View>*/}

                    </View>
                    <View style={{marginRight:10, display:'flex', flexDirection:'row'}}>
                        <View style={{fontSize:10, paddingLeft:20, lineHeight:1.2, display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                            {/*<Text>{receiptData.senderInfo.name}</Text>*/}
                            {/*<Text>{moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>*/}
                            <Text style={{fontSize:15}}>{receiptData?.etcInfo?.userdata2 || receiptData.packageInfo.country_code}</Text>
                        </View>
                    </View>
                </View>

                <View style={{
                    borderBottom:'1px solid black',
                    height:'22%',
                    display:'flex', flexDirection:'row',
                    fontSize:10, position:'relative',
                }}>
                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', height:'100%', width:'100%'}}>
                        <View style={{height:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            <View>
                                <Text style={{fontSize:14, padding:'0px 5px'}}>TO</Text>
                            </View>

                            <View style={{
                                height:'100%',
                                width:'100%',
                                padding:'5px 5px 5px 5px',
                                // paddingLeft:5,
                                borderLeft:'1px solid black',
                                display:'flex', justifyContent:'space-around', lineHeight:1.2,
                                flexGrow:1,
                            }}>
                                <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                    <Text>{receiptData.receiverInfo.name}</Text>
                                    <View style={{}}>
                                        <Text>{receiptData.receiverInfo.phone}</Text>
                                    </View>
                                </View>

                                <View>
                                    <Text>{[receiptData.receiverInfo.address2, receiptData.receiverInfo.address1].filter(x=> x &&  (x + "").trim() != '').join(' ')}</Text>
                                    <Text>
                                        {[receiptData.receiverInfo.city, receiptData.receiverInfo.state, receiptData.receiverInfo.zip ].filter(x=> x &&  (x + "").trim() != '').join(', ')}
                                        {/*{" "  + receiptData.deliveryTypeInfo.country_name_en}*/}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{height:'100%', minWidth:'30%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                            <View style={{margin:-1, border:'1px solid black', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <View style={{padding:'0px 5px', paddingBottom:5}}>
                                    <Text style={{fontSize:30,  fontWeight:'bold'}}>{receiptData.packageInfo.country_code}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>


                <View style={{display:'flex', flexDirection:'row',
                    borderBottom:'1px solid black',
                    height:'30%', fontSize:8}}>
                    <View style={{display:'flex', flexDirection:'row', }}>
                        <View style={{width:'100%', padding:3}}>
                            <View style={{
                                width:'100%',
                                display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <View>
                                    <Text style={{fontSize:10}}>Order No: {receiptData.packageInfo.reference_no}{receiptData.packageInfo.start_track_no && " / "+receiptData.packageInfo.start_track_no}</Text>
                                </View>

                                {/*<View style={{width:'20%'}}>*/}
                                {/*    <View style={{margin:-4, border:'1px solid black', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:5}}>*/}
                                {/*        <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>*/}
                                {/*            <Text style={{fontSize:15, fontWeight:'bold'}}>{receiptData.etcInfo.userdata1}</Text>*/}
                                {/*        </View>*/}
                                {/*    </View>*/}
                                {/*</View>*/}
                            </View>


                            {
                                receiptData.productsInfo
                                    .slice(0, 4)
                                    .map((product, i) => {
                                        var description = [product.name, product.qty+'ea'].join(' / ')
                                        return (
                                            <View key={i} style={{lineHeight:1.2, width:'100%', display: "flex", flexDirection: "row"}}>
                                                <Text style={{textOverflow:"ellipsis"}}>
                                                    {description}
                                                </Text>
                                            </View>
                                        );
                                    })
                            }
                        </View>
                    </View>
                </View>


                <View style={{height:'32%', width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{width:'70%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                        <Image style={{width:'80%'}} src={barcodeUrl} />
                        <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingBottom:5}}>
                            <Text style={{fontSize:16}}>{receiptData.packageInfo.in_track_no}</Text>
                        </View>
                    </View>
                    <Image style={{aspectRatio:1}} src={qrcodeUrl} />


                </View>


            </View>
        </Page>
    )
};



