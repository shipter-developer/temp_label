import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})


const imgList = {
    logo : "src/img/SK_POST/sk_post_logo.png",
    scan : "src/img/LT_POST/scan.png",
    phone : "src/img/LT_POST/phone.png",
    no_signature : "src/img/LT_POST/no_signature.png",
}

export default function SK_POST_PRIME(props) {
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:80, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });
    return (
        <Page size={{ width: 432, height: 288 }} orientation="landscape"
            // orientation="landscape"
              style={{
                  fontSize: 9,
                  padding:3,
                  fontFamily: "SpoqaHanSansNeo",
                  lineHeight:1.3,
                  fontWeight:'bold'
              }}>
            <View style={{border:'2px solid black', width:'100%', height:'100%'}}>
                <View style={{
                    borderBottom:'1px solid black',
                    height:'15%',
                    display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                    <View style={{width:'45%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <View style={{padding:5, fontSize:7}}>
                            <Text>From/Odosielateľ:</Text>
                            <Text>PostPlus – meno odosielateľa, P.O.Box 0200, Bratislava 090</Text>
                            <Text>800 90 Braislava</Text>
                            <Text>SLOVAKIA</Text>
                        </View>
                    </View>
                    <View style={{width:'55%', fontSize:7, padding:2}}>
                        <View style={{width:'100%', height:'100%', display:'flex', flexDirection:'row', border:'2px solid black'}}>
                            <View style={{width:'40%', borderRight:'2px solid black', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Image style={{height:'95%'}} src={imgList['logo']} />
                            </View>
                            <View style={{width:'60%', textAlign:'center'}}>
                                <View style={{
                                    display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center',
                                    height:'50%', borderBottom:'1px solid black'
                                }}>
                                    <Text>800 90 Bratislava 090</Text>
                                </View>
                                <View style={{
                                    display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center',
                                    height:'50%'
                                }}>
                                    <Text>530/2023</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{width:'100%', backgroundColor:'black', color:'white', fontSize:15, textAlign:'center', letterSpacing:1.5}}>
                    <Text>STANDARD</Text>
                </View>

                <View style={{
                    borderBottom:'1px solid black',
                    minHeight:'20%',
                    display:'flex', flexDirection:'row',
                    fontSize:10, position:'relative'
                }}>
                    <View style={{display:'flex', flexDirection:'row', height:'100%', width:'100%'}}>
                        <View style={{
                            width:'60%', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            <View>
                                <Text style={{fontWeight:"bold", fontSize:14, padding:'0px 3px'}}>TO</Text>
                            </View>

                            <View style={{padding:'5px 5px',
                                borderLeft:'1px solid black', height:'100%',
                                display:'flex', justifyContent:'space-between'
                            }}>
                                <View style={{}}>
                                    <Text>{receiptData.receiverInfo.name}</Text>
                                    <Text>{receiptData.receiverInfo.address1}</Text>
                                    <Text>{receiptData.receiverInfo.address2}</Text>
                                </View>
                                <View>
                                    <Text>{receiptData.receiverInfo.city}, {receiptData.receiverInfo.state}</Text>
                                    <Text>ZIPCODE: {receiptData.receiverInfo.zip}, {receiptData.packageInfo.country_code}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{width:'40%',display:'flex', justifyContent:'space-between'}}>
                            <View style={{width:'100%', paddingTop:5, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                <Image style={{width:9, height:9, marginRight:10, marginTop:2}} src={imgList['phone']} />
                                <Text>{receiptData.receiverInfo.phone}</Text>
                            </View>
                            <View style={{width:'100%', display:'flex', alignItems:'flex-end'}}>
                                <View style={{border:'1px solid black', margin:-1, padding:2}}>
                                    <Text style={{fontSize:30}}>{receiptData.packageInfo.country_code}</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                </View>


                <View style={{display:'flex', flexDirection:"column", justifyContent:"space-between",
                    borderBottom:'1px solid black',
                    height:'36%', fontSize:8}}>
                    <View style={{display:'flex', flexDirection:'row', lineHeight:1}}>
                        <View style={{width:'100%', padding:3}}>
                            <View style={{marginBottom:2, fontSize:10, lineHeight:1.2}}>
                                <Text>No: {receiptData.packageInfo.in_track_no} </Text>
                                <Text>Order No: {receiptData.packageInfo.reference_no} </Text>
                            </View>
                            {
                                receiptData.productsInfo
                                    .slice(0, 4)
                                    .map((product) => {
                                        var description = [product.name, product.sku, product.qty+'ea'].join(' / ')
                                        return (
                                            <View style={{marginTop:3, width:'100%', display: "flex", flexDirection: "row"}}>
                                                <Text style={{textOverflow:"ellipsis", overflow:"hidden"}}>
                                                    {description}
                                                </Text>
                                            </View>
                                        );
                                    })}
                        </View>
                    </View>
                    <View style={{
                        paddingBottom:5,
                        display:'flex', flexDirection:'row',
                        alignItems:'center', justifyContent:'center'
                    }}>
                        <Image style={{height:30, width:50, marginRight:5}} src={imgList['scan']} />
                        <Image style={{height:30, width:50}} src={imgList['no_signature']} />
                    </View>
                </View>


                <View style={{width:'100%', display:'flex', flexGrow:1, alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{fontSize:8, padding:'5px 0px 0px 5px', width:'100%'}}>
                        <Text>{receiptData.senderInfo.name}, {moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>
                    </View>
                    <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Image style={{width:'90%'}} source={{uri:barcodeUrl}} />
                    </View>
                    <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingBottom:5}}>
                        <Text style={{fontSize:20}}>{receiptData.packageInfo.in_track_no}</Text>
                    </View>
                </View>
            </View>
        </Page>
    )
};
