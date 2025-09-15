import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
export default function SHIPTER(props){
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:70, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });
    const truncateByPx = (text, maxPx, fontSizePx = 10, charWidthRatio = 0.6) => {
        const fontSizePt = fontSizePx * 0.9;
        const maxPt = maxPx * 0.9;

        const maxChars = Math.floor(maxPt / (fontSizePt * charWidthRatio));
        return text.length > maxChars ? text.slice(0, maxChars - 3) + '...' : text;
    };

    return (
        <Page key={receiptData['packageInfo']['in_track_no']} size={{ width: 432, height: 288 }} orientation="portrait"   style={{
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
                    <View style={{display:'flex', flexDirection:'row'}}>
                        <View style={{fontSize:10, paddingLeft:20, lineHeight:1.5}}>
                            <Text>{receiptData.senderInfo.name}</Text>
                            <Text>{moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent:'flex-end', alignItems:'center',
                        width:'50%', fontSize:9, display:'flex', flexDirection:'row'}}>
                        <View style={{paddingRight:10}}>
                            <Text style={{fontWeight:900}}>www.shipter.kr</Text>
                            <Text style={{fontWeight:900}}>www.shiptertracking.com</Text>
                        </View>
                        <View style={{width:'25%', paddingRight:10}}>
                            <Image src='src/img/COMMON/shipter_logo.png' />
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
                                    <Text>
                                        {[
                                            receiptData.receiverInfo.address2,
                                            receiptData.receiverInfo.address1
                                        ]
                                            .filter(val => val && String(val).trim() !== '')
                                            .join(' ')}
                                    </Text>

                                    <Text>
                                        {[
                                            receiptData.receiverInfo.city,
                                            receiptData.receiverInfo.state,
                                            receiptData.receiverInfo.zip
                                        ]
                                            .filter(val => val && String(val).trim() !== '')
                                            .join(', ')}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{height:'100%', minWidth:'20%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                            <View style={{margin:-1, border:'1px solid black', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <View style={{padding:'0px 5px', paddingBottom:5}}>
                                    <Text style={{fontSize:40,  fontWeight:'bold'}}>{receiptData.packageInfo.country_code}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>


                <View style={{display:'flex', flexDirection:'row',
                    borderBottom:'1px solid black',
                    height:'30%', fontSize:8}}>
                    <View style={{display:'flex', flexDirection:'row', }}>
                        <View style={{width:'100%', paddingLeft:3}}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center', // ← key 변경!
                                paddingBottom: 4
                            }}>
                                <View style={{ flexGrow: 0 }}>
                                    <Text style={{ fontSize: 10 }}>
                                        Order No: {receiptData.packageInfo.reference_no}
                                        {/*{receiptData.packageInfo.start_track_no ? `${receiptData.packageInfo.start_track_no}` : ''}*/}
                                    </Text>
                                </View>

                                <View style={{ marginLeft: 'auto' }}>
                                    <View style={{
                                        borderLeft : '1px solid black',
                                        borderBottom : '1px solid black',
                                        // border: '1px solid black',
                                        padding: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                            {receiptData.packageInfo.method_name}
                                        </Text>
                                    </View>
                                </View>
                            </View>


                            {
                                receiptData.productsInfo
                                    .slice(0, 4)
                                    .map((product, i) => {
                                        var description =  receiptData.productsInfo.length > 2 ?
                                            [truncateByPx(product.name, 500, 10), product.qty+'ea'].join(' / ') :
                                            [ product.name, product.qty+'ea'].join(' / ')
                                        return (
                                            <View key={i} style={{lineHeight:1.2, width:'100%', display: "flex", flexDirection: "row"}}>
                                                <Text style={{textOverflow:"ellipsis"}}>
                                                    {description}
                                                </Text>
                                            </View>
                                        );
                                    })
                            }
                            <View style={{width:'100%', textAlign : 'center', paddingTop:5}}>
                                <Text>{receiptData.productsInfo.length > 4 && '...Showing first 4 items only.'}</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{height:'32%', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Image style={{width:'70%'}} src={barcodeUrl} />
                    </View>
                    <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingBottom:10}}>
                        <Text style={{fontSize:20}}>{receiptData.packageInfo.in_track_no}</Text>
                    </View>

                </View>


            </View>
        </Page>
    )
};

