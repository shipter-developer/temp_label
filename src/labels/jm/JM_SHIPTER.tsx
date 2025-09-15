import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
Font.register({
    family: 'NotoSansHebrew',
    fonts: [
        { src: 'src/fonts/Noto_Sans_Hebrew/static/NotoSansHebrew-Regular.ttf' },
        { src: 'src/fonts/Noto_Sans_Hebrew/static/NotoSansHebrew-Bold.ttf', fontWeight: 'bold' }
    ]
});

const imgList = {
    logo : "src/img/SK_POST/sk_post_logo.png",
    scan : "src/img/LT_POST/scan.png",
    phone : "src/img/LT_POST/phone.png",
    no_signature : "src/img/LT_POST/no_signature.png",
    shipter_logo : "src/img/COMMON/shipter_logo.png",
    joom_logo : "src/img/JOOM/joom_logo.png"
}
export default function JM_SHIPTER(props){
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:70, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });

    function containsHebrew(text) {
        // 히브리어 유니코드 범위: U+0590–U+05FF
        return /[\u0590-\u05FF]/.test(text);
    }

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
            fontFamily: "SpoqaHanSansNeo"
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
                        width:'55%', fontSize:9, display:'flex', flexDirection:'row'}}>
                        <View style={{paddingRight:10, lineHeight:1.5, display:'flex', flexDirection:'column', alignItems : 'flex-end'}}>
                            <Text>입고지: 인천광역시 서구 갑문1로 20</Text>
                            <Text>3층 5번 도크 SHIPTER</Text>
                        </View>
                        <View style={{paddingRight:10}}>
                            <View style={{padding:'5px 0px'}}>
                                <Image style={{width:80}} src={imgList['joom_logo']}/>
                            </View>
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
                                fontFamily : containsHebrew(JSON.stringify(receiptData.receiverInfo)) ? "NotoSansHebrew" : "SpoqaHanSansNeo",
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
                                lineHeight:1,
                            }}>
                                <View style={{ flexGrow: 0 }}>
                                    <Text style={{ fontSize: 10 }}>
                                        Order No: {receiptData.packageInfo.start_track_no ? `${receiptData.packageInfo.start_track_no}` : ''}
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
                                    .slice(0, 5)
                                    .map((product, i) => {
                                        var description =  [ product.name,product.brand,  product.qty+'ea'].join(' / ');
                                        return (
                                            <View key={i} style={{lineHeight:1, width:'100%', display: "flex", flexDirection: "row"}}>
                                                <Text>
                                                    {description}
                                                </Text>
                                            </View>
                                        );
                                    })
                            }
                            <View style={{width:'100%', textAlign : 'center'}}>
                                <Text>{receiptData.productsInfo.length > 5 && '...Showing first 5 items only.'}</Text>
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

