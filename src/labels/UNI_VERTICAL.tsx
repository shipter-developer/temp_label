import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
export default function UNI_VERTICAL(props){
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:80, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });
    const [qrcodeUrl, setQrcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        QRCode.toCanvas(canvas,  receiptData['packageInfo']['in_track_no'],  { errorCorrectionLevel: 'H' })
        return canvas.toDataURL('image/png')
    });


    return (
        <Page key={receiptData['packageInfo']['in_track_no']} size={{ width: 432, height: 288 }} orientation="landscape" style={{
            fontSize: 12,
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
                    <View style={{marginLeft:10, alignItems:'center', fontSize:9, display:'flex', flexDirection:'row'}}>
                        <View style={{width:'30%', paddingRight:10}}>
                            <Image src='src/img/COMMON/shipter_logo.png' />
                        </View>
                        <View style={{paddingRight:5}}>
                            <Text>shipter.kr</Text>
                            <Text>shiptertracking.com</Text>
                        </View>
                    </View>
                    <View style={{marginRight:10, display:'flex', flexDirection:'row'}}>
                        <View style={{fontSize:10, paddingRight:5, lineHeight:1.2, display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                            {/*<Text>{receiptData.senderInfo.name}</Text>*/}
                            {/*<Text>{moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>*/}
                            <Text style={{fontSize:17}}>{receiptData.packageInfo.country_code}{receiptData?.etcInfo?.userdata1 && ('-'+receiptData?.etcInfo?.userdata1)}</Text>
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
                                padding:'5px 0px 0px 5px',
                                // paddingLeft:5,
                                fontSize:10,
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

                        <View style={{height:'100%', minWidth:'27%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                            <View style={{margin:-1, border:'1px solid black', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <View style={{padding:'0px 5px', paddingBottom:5}}>
                                    <Text style={{fontSize:30,  fontWeight:'bold'}}>{receiptData?.etcInfo?.userdata1 && receiptData.etcInfo.userdata1}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>


                <View style={{display:'flex', flexDirection:'row',
                    borderBottom:'1px solid black',
                    height:'30%', fontSize:10}}>
                    <View style={{display:'flex', flexDirection:'row', }}>
                        <View style={{width:'100%', padding:3}}>
                            <View style={{
                                width:'100%',
                                display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <View>
                                    <Text style={{fontSize:10, lineHeight:1.2, }}>Order No: {receiptData.packageInfo.reference_no}</Text>
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

                    <View style={{height:'18%', width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Image style={{width:'90%'}} src={barcodeUrl} />
                    </View>
                    <View style={{
                        borderTop:'1px solid black',
                        height:'16%', width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flexGrow:1, display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:16}}>{receiptData.packageInfo.in_track_no}</Text>
                        </View>
                        <Image style={{aspectRatio:1}} src={qrcodeUrl} />
                    </View>
            </View>
        </Page>
    )
};

