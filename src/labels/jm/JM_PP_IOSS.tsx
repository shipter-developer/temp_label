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

export default function JM_PP_IOSS(props){
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:60, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });

    return (
        <Page size={{ width: 432, height: 288 }}  orientation="landscape"
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
                    display:'flex', flexDirection:'row'}}>
                    <View style={{paddingTop:8, width:'55%', display:'flex', flexDirection:'row', borderRight:'1px solid black', alignItems:'center'}}>
                        <View style={{}}>
                            <Text style={{transform: "rotate(-90deg)", fontSize:10, fontWeight:"bold"}}>FROM</Text>
                        </View>
                        <View style={{fontSize:6}}>
                            <Text>PostPlus - meno odosielatela,</Text>
                            <Text>P.O.Box 0200, Bratislava 090</Text>
                            <Text>80090 Bratislava</Text>
                            <Text>Slovakia</Text>
                        </View>
                    </View>
                    <View style={{width:'45%', fontSize:7}}>
                        <View style={{width:'100%', height:'100%', display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                            <View style={{width:'90%', textAlign:'center', display:'flex', justifyContent:'flex-end', }}>
                                <View style={{
                                    height:'60%',
                                    border:'1px solid black', display:'flex', flexDirection:'row', }}>
                                    <View style={{
                                        width:'30%', borderRight:'1px solid black', justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{fontSize:8}}>P.P.</Text>
                                    </View>
                                    <View style={{width:'70%'}}>
                                        <View style={{
                                            borderBottom:'1px solid black', width:'100%',
                                            height:'50%',
                                            display:'flex', justifyContent:'center', alignItems:'center'
                                        }}>
                                            <Text>800 90 Bratislava 090</Text>
                                        </View>
                                        <View style={{
                                            height:'50%',
                                            display:'flex', justifyContent:'center', alignItems:'center'
                                        }}>
                                            <Text>530/2023</Text>
                                        </View>
                                    </View>

                                </View>
                                <Text style={{fontSize:8}}>POSTAGE PAID</Text>
                            </View>
                            <View style={{backgroundColor:'black', width:'100%', textAlign:'center'}}>
                                <Text style={{color:'white', padding:'2px 0px', fontSize:8}}>PRIORITY</Text>
                            </View>
                        </View>
                    </View>
                </View>







                <View style={{
                    borderBottom:'1px solid black',
                    height:'20%',
                    display:'flex', flexDirection:'row',
                    fontSize:10, position:'relative'
                }}>
                    <View style={{display:'flex', flexDirection:'row', height:'100%', width:'100%'}}>
                        <View style={{
                            width:'55%', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            <View>
                                <Text style={{fontWeight:"bold", fontSize:14, padding:'0px 3px'}}>TO</Text>
                            </View>

                            <View style={{padding:'5px 5px', fontSize:9, lineHeight:1.2,
                                borderLeft:'1px solid black', height:'100%',
                                display:'flex', justifyContent:'space-between'
                            }}>
                                <View>
                                    <Text>{receiptData.receiverInfo.name}</Text>
                                    <Text>{receiptData.receiverInfo.address1}</Text>
                                    <Text>{receiptData.receiverInfo.address2}</Text>
                                </View>
                                <View>
                                    <Text>{receiptData.receiverInfo.city}, {receiptData.receiverInfo.state}</Text>
                                    <Text>ZIPCODE: {receiptData.receiverInfo.zip}</Text>
                                    <Text>{receiptData.packageInfo.country_name_en}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{width:'45%',display:'flex', justifyContent:'space-between'}}>
                            <View style={{width:'100%', paddingTop:10, display:'flex', flexDirection:'row', justifyContent:'center'}}>
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
                    height:'40%', fontSize:8}}>
                    <View style={{display:'flex', flexDirection:'row', lineHeight:1}}>
                        <View style={{width:'100%', padding:3}}>
                            <View style={{marginBottom:2, fontSize:10, lineHeight:1.2}}>
                                <Text>No: {receiptData.packageInfo.in_track_no} </Text>
                                <Text style={{fontSize:10}}>Order No: {receiptData.packageInfo.start_track_no && receiptData.packageInfo.start_track_no}</Text>
                            </View>
                            {
                                receiptData.productsInfo
                                    .slice(0, 5)
                                    .map((product) => {
                                        var description = [ product.name, product.brand ,product.qty+'ea'].join(' / ')
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
                        alignItems:'center', justifyContent:'center',
                        borderTop:'1px solid black'
                    }}>
                        <Image style={{height:30, width:50, marginRight:5}} src={imgList['scan']} />
                        <Image style={{height:30, width:70}} src={imgList['no_signature']} />
                    </View>
                </View>


                <View style={{width:'100%', display:'flex', flexGrow:1, alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{fontSize:8, padding:'5px 0px 0px 5px', width:'100%'}}>
                        <Text>{receiptData.senderInfo.name}, {moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>
                    </View>
                    <View style={{width:'90%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Image style={{width:'100%'}} source={{uri:barcodeUrl}} />
                    </View>
                    <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingBottom:5}}>
                        <Text style={{fontSize:15}}>{receiptData.packageInfo.in_track_no}</Text>
                    </View>
                </View>
            </View>
        </Page>
    )
};

