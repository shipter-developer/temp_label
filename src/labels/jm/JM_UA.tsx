import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
const imgList = {
    logo : "src/img/SK_POST/sk_post_logo.png",
    scan : "src/img/LT_POST/scan.png",
    phone : "src/img/LT_POST/phone.png",
    no_signature : "src/img/LT_POST/no_signature.png",
    shipter_logo : "src/img/shipterLogoHi.jpg",
    joom_logo : "src/img/JOOM/joom_logo.png"
}
export default function JM_UA(props){
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:70, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });




    return (
        <Page size={{ width: 432, height: 288 }} orientation="portrait" style={{
            fontSize: 8,
            padding:2,
            fontFamily: "SpoqaHanSansNeo",
            lineHeight:1.1,
            fontWeight:'bold'
        }}>
            <View style={{border:'2px solid black', width:'100%', height:'100%'}}>
                <View style={{height:'10%', fontSize:8, width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black', alignItems:'center'}}>
                    <View style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center', width:'15%', borderRight:'0.5px solid black'}}>
                        <Text>
                            {receiptData.productsInfo.reduce((previousValue, currentValue) => previousValue + parseInt(currentValue.qty), 0)}
                            /
                            {receiptData.productsInfo.length}
                        </Text>
                        <Text>psc</Text>

                    </View>
                    <View style={{
                        flex:1,
                        paddingRight:'3%',
                        paddingLeft:'3%', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View>
                            <Text>Order No: {receiptData.packageInfo.start_track_no ? `${receiptData.packageInfo.start_track_no}` : ''}</Text>
                            <Text>OrderDate: {moment(receiptData.packageInfo.reg_date).format("DD.MM.YYYY")}</Text>
                        </View>
                        <View style={{padding:'5px 0px'}}>
                            <Image style={{width:80}} src={imgList['joom_logo']}/>
                        </View>
                    </View>
                </View>

                <View style={{
                    width:'100%', height:'20%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                    <View style={{width:'50%', borderRight:'0.5px solid black'}}>
                        <View style={{
                            height:'100%',
                            lineHeight:1.2,
                            padding:5, display:'flex', justifyContent:'space-between', fontWeight:'normal',}}>
                            <View>
                                <Text style={{fontSize:8, fontWeight:'bold'}}>Sender:</Text>
                                <Text>{receiptData.senderInfo.name}</Text>
                                <Text>{receiptData.senderInfo.address}</Text>
                            </View>
                            <View>
                                <Text><Text style={{fontSize:8, fontWeight:'bold'}}>Contact: </Text>{receiptData.senderInfo.name}</Text>
                                <Text><Text style={{fontSize:8, fontWeight:'bold'}}>Phone: </Text>{receiptData.senderInfo.phone}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{width:'50%'}}>
                        <View style={{
                            height:'100%',lineHeight:1.2,
                            padding:5, display:'flex', justifyContent:'space-between', fontWeight:'normal',}}>
                            <View>
                                <Text style={{fontSize:8, fontWeight:'bold'}}>Receiver:</Text>
                                <Text>{receiptData.receiverInfo.address2}</Text>
                                <Text>{receiptData.receiverInfo.address1}</Text>
                            </View>
                            <View>
                                <Text>{receiptData.receiverInfo.city}, {receiptData.receiverInfo.state}</Text>
                                <Text>{receiptData.packageInfo.country_code == "MD" && "MD-"}{receiptData.receiverInfo.zip}</Text>
                                <Text>{receiptData.packageInfo.country_name_en}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{
                    width:'100%', height:'25%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                    <View style={{width:'50%', borderRight:'0.5px solid black'}}>
                        <View style={{
                            height:'100%',
                            padding:'2px 5px', display:'flex', fontWeight:'normal',}}>
                            {/*<Text style={{fontSize:8, fontWeight:'bold', marginBottom:2}}>Content:</Text>*/}
                            {
                                receiptData.productsInfo
                                    .slice(0, 4)
                                    .map((product, i) => {
                                        var description =  [ product.name, product.brand,  product.qty+'ea'].join(' / ');
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
                                <Text>{receiptData.productsInfo.length > 4 && '...Showing first 4 items only.'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{width:'50%'}}>
                        <View style={{
                            height:'100%', lineHeight:1.3,
                            display:'flex', justifyContent:'space-between', fontWeight:'normal',}}>
                            <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <View style={{padding:'2px 5px', }}>
                                    <Text style={{fontSize:8, fontWeight:'bold'}}>Ship to:</Text>
                                    <Text>{receiptData.receiverInfo.address2}</Text>
                                </View>

                                <View style={{border:'1px solid black', margin:-1, padding:2}}>
                                    <Text style={{fontSize:20}}>{receiptData.packageInfo.country_code}</Text>
                                </View>
                            </View>
                            <View style={{padding:'2px 5px'}}>
                                {/*<Text><Text style={{fontSize:8, fontWeight:'bold'}}>City: </Text>{receiptData.receiverInfo.city}</Text>*/}
                                <Text><Text style={{fontSize:8, fontWeight:'bold'}}>Contact: </Text>{receiptData.receiverInfo.name}</Text>
                                <Text><Text style={{fontSize:8, fontWeight:'bold'}}>Phone: </Text>{receiptData.receiverInfo.phone}</Text>
                            </View>
                        </View>
                    </View>

                </View>


                <View style={{
                    width:'100%', height:'8%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                    <View style={{width:'50%', borderRight:'0.5px solid black',
                        display:'flex', flexDirection:'row', alignItems:'center'
                    }}>
                        <View style={{
                            width:'100%', justifyContent:'space-between',
                            padding:'0px 10px', display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontWeight:'normal'}}>origin:</Text>
                            <Text style={{fontSize:8}}>KR</Text>
                        </View>
                    </View>
                    <View style={{width:'23%', borderRight:'0.5px solid black',
                        display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <View style={{
                            width:'100%', justifyContent:'space-between',
                            padding:'0px 10px', display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontWeight:'normal'}}>destination:</Text>
                            <Text style={{fontSize:8}}>{receiptData.packageInfo.country_code}</Text>
                        </View>
                    </View>
                    <View style={{width:'27%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:"center"}}>
                        <Text style={{fontSize:8}}>{receiptData.packageInfo.r_weight} KG</Text>
                    </View>

                </View>

                <View style={{
                    flex:1,
                    width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>

                    <View style={{width:'73%', borderRight:'0.5px solid black', display:'flex', justifyContent:'center'}}>
                        <View style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                <Image style={{width:'85%'}} source={{uri:barcodeUrl}} />
                            </View>
                            <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingBottom:3}}>
                                <Text style={{fontSize:18}}>{receiptData['packageInfo']['in_track_no']}</Text>
                                <View style={{width:'100%', textAlign:'center'}}>
                                    <Text style={{fontSize:10}}>{receiptData['packageInfo']['receipt_number']}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{width:'27%', display:'flex', justifyContent:'center', alignItems:'center',
                        fontSize:8, lineHeight:1.5,
                    }}>
                        <Text>Customs value:</Text>
                        <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Text>
                                {parseFloat(receiptData.productsInfo.reduce((pre, cur)=>pre + parseFloat(cur.price) * parseInt(cur.qty), 0).toFixed(2)).toPrecision()}
                                {" "}
                                {receiptData.productsInfo[0]['currency']}
                            </Text>
                            <Text>E-Commerce</Text>
                        </View>
                    </View>
                </View>





            </View>
        </Page>
    )
};

