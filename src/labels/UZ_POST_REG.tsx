import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
export default function UZ_POST_REG(props){
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:70, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });

    const renderTable = ([col1, col2, col3], border = false) => (
        <View style={{
            width: '100%',
            borderBottom: border ? '1px solid black' : 0,
            flexDirection: 'row',
            padding: border ? '1px 2px' : '2px 2px'
        }}>
            <View style={{ width: '50%' }}><Text>{col1}</Text></View>
            <View style={{ width: '25%', textAlign: 'center' }}><Text>{col2}</Text></View>
            <View style={{ width: '25%', textAlign: 'center' }}><Text>{col3}</Text></View>
        </View>
    );



    return (
        <Page size={{ width: 432, height: 288 }} orientation="portrait" style={{
            fontSize: 5,
            padding:2,
            fontFamily: "SpoqaHanSansNeo",
            lineHeight:1.1,
            fontWeight:'bold'
        }}>
            <View style={{
                border:'2px solid black', width:'100%', height:'100%'}}>
                <View style={{display:'flex', flexDirection:'row', width:'100%'}}>
                    <View style={{
                        height:'100%',
                        borderRight:'1px solid black',
                        width:'37%'}}>
                        <View style={{
                            padding:3,
                            borderBottom:'1px solid black',
                            display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <View>
                                <Text>CUSTOMS</Text>
                                <Text>DECLARATION</Text>
                                <Text>May be opened officially</Text>
                                <View style={{diaplay: "flex", flexDirection: "row", justifyContent: "space-between",}}>
                                    <Text>Designated operator Uzbekist on Pochtasi</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{fontSize:15}}>CN22{' '}</Text>
                            </View>
                        </View>

                        <View style={{
                            width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap',
                            padding:'0px 3px',
                            borderBottom:'2px solid black'
                        }}>
                            {
                                ['GIFT', 'Comm.sample','Others','Docs','Returned goods','Sale of goods'].map((item,i)=>{
                                    return(
                                        <View style={{minWidth:i%3 == 1? '35%' : '25%', display:'flex', flexDirection:'row', margin:'1px 0px'}}>
                                            <Image src={i == 5 ? 'src/img/check.png' :   'src/img/uncheck.png'} style={{height:5, marginRight:2}}/>
                                            <Text>{item}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>


                        {

                            renderTable(
                                [
                                    "Quantity and detailed\ndescription of contents",
                                    "Weight\n(in kg)" ,
                                    "Value\n(in USD)"], true
                            )
                        }
                        <View style={{height:'22%', borderBottom:'1px solid black'}}>
                            {
                                receiptData.productsInfo
                                    .map((product, i) =>
                                        renderTable(
                                            [product.name.length > 25
                                                ? product.name.slice(0, 25).concat("...")
                                                : product.name,
                                                parseFloat((receiptData.packageInfo.r_weight/receiptData.productsInfo.length).toFixed(2)).toPrecision() + 'kg',
                                                parseFloat((parseFloat(product.price) * parseInt(product.qty)).toFixed(2)).toPrecision() + '$'
                                            ]
                                        ))
                            }
                        </View>
                        {
                            renderTable(
                                ["For commercial items only\nIf known HS tariff number\nand country of origin of\ngoods",
                                    "Total\nWeight",
                                    "Total\nValue"], true
                            )
                        }
                        <View style={{height:'15%', borderBottom:'1px solid black'}}>
                            {

                                renderTable(
                                    [receiptData.productsInfo[0]['hscode'],
                                        parseFloat(receiptData.packageInfo.r_weight) + 'kg',
                                        parseFloat(receiptData.productsInfo.reduce((pre, cur)=>pre + parseFloat(cur.price) * parseInt(cur.qty), 0).toFixed(2)).toPrecision()
                                        + '$']
                                )
                            }
                        </View>


                        <View style={{padding:3}}>
                            <Text style={{lineHeight:1.3}}>
                                I, the undersigned whose name and address are given on the
                                item, certify that the particulars given in this declaration
                                are correct and that this item does not contain any dangerous
                                article or articles prohibited by legislation or by custom
                                regulations
                            </Text>
                            <View style={{marginTop:20}}>
                                <Text>
                                    Date and Sender's signature
                                </Text>
                            </View>

                            <View style={{marginTop:3}}>
                                <Text>{receiptData.senderInfo.name}</Text>
                                <Text>{moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>
                            </View>
                        </View>
                    </View>



                    <View style={{width:'63%'}}>
                        <View style={{width:'100%', height:'100%'}}>
                            {/*<View style={{width:'100%', borderBottom:'1px solid black', textAlign:'center', fontSize:4, padding:'1px 0px'}}>*/}
                            {/*    <Text>*/}
                            {/*        Return if undeliverable, Vilniaus logistikos centras, P.d. 5045,*/}
                            {/*        Metalo g. 5, 02190 Vilnius, LITHUANIA*/}
                            {/*    </Text>*/}
                            {/*</View>*/}
                            <View style={{
                                borderBottom:'1px solid black',
                                height:'18%',
                                display:'flex', flexDirection:'row'}}>
                                <View style={{paddingTop:8, width:'55%', display:'flex', flexDirection:'row', borderRight:'1px solid black'}}>
                                    <View style={{paddingTop:6}}>
                                        <Text style={{transform: "rotate(-90deg)", fontSize:7, fontWeight:"bold"}}>FROM</Text>
                                    </View>
                                    <View style={{fontSize:6}}>
                                        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end'}}>
                                            <Text>Sender</Text>
                                            {
                                                receiptData['packageInfo']['delivery_name'] == 'TEST_UZ' &&
                                                <View>
                                                    <Text style={{fontSize:8}}>HT2</Text>
                                                </View>
                                            }

                                        </View>
                                        {/*<Text>"Xalqaro Pocht amt" br. P.O. Box 0371</Text>*/}
                                        {/*<Text>Turkest anskaya Str. 4</Text>*/}
                                        {/*<Text>100015, TASHKENT</Text>*/}
                                        {/*<Text>Republic of Uzbekistan</Text>*/}
                                        <Text>Optimal Mile Ltd.</Text>
                                        <Text>P.O. Box 0371</Text>
                                        <Text>100000, TASHKENT</Text>
                                        <Text>Republic of Uzbekistan</Text>
                                    </View>
                                </View>
                                <View style={{width:'45%', fontSize:6}}>
                                    <View style={{width:'100%', height:'100%', display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                                        <View style={{width:'70%', textAlign:'center', display:'flex', justifyContent:'flex-end', }}>
                                            <View style={{
                                                height:'60%',
                                                border:'1px solid black', display:'flex', flexDirection:'row', }}>
                                                <View style={{
                                                    width:'100%', justifyContent:'center', alignItems:'center'}}>
                                                    <Image style={{width:25}} src={'src/img/UZ_POST/uzpost_2_2.png'}/>
                                                </View>
                                            </View>
                                            <Text style={{fontSize:7}}>POSTAGE PAID</Text>
                                        </View>
                                        <View style={{backgroundColor:'black', width:'100%', textAlign:'center'}}>
                                            <Text style={{color:'white', padding:'2px 0px', fontSize:8}}>PRIORITY</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>







                            <View style={{
                                borderBottom:'1px solid black',
                                height:'18%',
                                display:'flex', flexDirection:'row',
                                fontSize:8, position:'relative'
                            }}>
                                <View style={{display:'flex', flexDirection:'row', height:'100%', width:'100%'}}>
                                    <View style={{
                                        width:'55%', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                                        <View>
                                            <Text style={{fontWeight:"bold", fontSize:8, padding:'0px 3px'}}>TO</Text>
                                        </View>

                                        <View style={{padding:3, fontSize:7,
                                            borderLeft:'1px solid black', height:'100%',
                                            display:'flex', justifyContent:'space-between'
                                        }}>
                                            <View>
                                                <Text>{receiptData.receiverInfo.name}</Text>
                                                <Text>{receiptData.receiverInfo.address1}</Text>
                                                <Text>{receiptData.receiverInfo.address2}</Text>
                                            </View>
                                            <View style={{}}>
                                                <Text>{receiptData.receiverInfo.city}, {receiptData.receiverInfo.state}</Text>
                                                <Text>ZIPCODE: {receiptData.receiverInfo.zip}</Text>
                                                <Text>{receiptData.packageInfo.country_name_en}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{width:'45%',display:'flex', justifyContent:'space-between'}}>
                                        <View style={{width:'100%', paddingTop:3, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                            <Image style={{width:9, height:9, marginRight:10, marginTop:2}} src={'src/img/LT_POST/phone.png'} />
                                            <Text>{receiptData.receiverInfo.phone}</Text>
                                        </View>
                                        <View style={{width:'100%', display:'flex', alignItems:'flex-end'}}>
                                            <View style={{border:'1px solid black', margin:-1, padding:2}}>
                                                <Text style={{fontSize:20}}>{receiptData.packageInfo.country_code.toUpperCase()}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>


                            <View style={{display:'flex', flexDirection:"column", justifyContent:"space-between",
                                borderBottom:'1px solid black',
                                height:'30%', fontSize:5}}>
                                <View style={{display:'flex', flexDirection:'row', lineHeight:1}}>
                                    <View style={{width:'100%', padding:3}}>
                                        <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                            <View style={{fontSize:7, lineHeight:1}}>
                                                <Text>No: {receiptData.packageInfo.in_track_no} / {receiptData.packageInfo.reference_no}</Text>
                                            </View>
                                        </View>

                                        {
                                            receiptData.productsInfo
                                                .slice(0, 4)
                                                .map((product) => {
                                                    var description = [product.name, product.sku, product.qty+'ea'].join(' / ')
                                                    return (
                                                        <View style={{marginTop:2, width:'100%', display: "flex", flexDirection: "row"}}>
                                                            <Text style={{lineHeight:1, fontSize:7, textOverflow:"ellipsis", overflow:"hidden"}}>
                                                                {description}
                                                            </Text>
                                                        </View>
                                                    );
                                                })}
                                    </View>
                                </View>
                                <View style={{
                                    display:'flex', flexDirection:'row',
                                    alignItems:'center', justifyContent:'center'
                                }}>
                                    <Image style={{height:20, width:30}} src={'src/img/LT_POST/signature.png'} />
                                </View>
                            </View>



                            <View style={{width:'100%', display:'flex', alignItems:'center',
                                justifyContent:'space-between', flexGrow:1,
                            }}>
                                <View style={{fontSize:8, padding:'5px 0px 0px 5px', width:'100%'}}>
                                    <Text>{receiptData.senderInfo.name}, {moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>
                                </View>
                                <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
                                    <Text style={{fontSize:50}}>R</Text>
                                    <Image style={{width:'80%'}} source={{uri:barcodeUrl}} />
                                </View>
                                <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingBottom:5}}>
                                    <Text style={{fontSize:20}}>{receiptData.packageInfo.in_track_no}</Text>
                                </View>
                            </View>
                        </View>
                    </View>



                </View>
            </View>
        </Page>
    )


};

