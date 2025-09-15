import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
export default function NL_POST_CN22_PRIME(props){
    const { receiptData } = props;
    const canvas = createCanvas(10, 10);
    JsBarcode(canvas, receiptData.packageInfo.in_track_no, { height: 60, format: "CODE128", displayValue: false });
    const barcodeUrl = canvas.toDataURL("image/png");

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
       <Page size={{ width: 432, height: 288 }} orientation="portrait"  style={{
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
                                   <Text>Designated operator Post NL</Text>
                               </View>
                           </View>
                           <View>
                               <Text style={{fontSize:15}}>CN22{' '}</Text>
                           </View>
                       </View>

                       <View style={{
                           width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap',
                           padding:3,
                           borderBottom:'2px solid black'
                       }}>
                           <Text>Category: Sale of Goods</Text>
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
                       <View style={{height:'5%', borderBottom:'1px solid black'}}>
                           {

                               renderTable(
                                   [receiptData.productsInfo[0]['hscode'],
                                       parseFloat(receiptData.packageInfo.r_weight) + 'kg',
                                       parseFloat(receiptData.productsInfo.reduce((pre, cur)=>pre + parseFloat(cur.price) * parseInt(cur.qty), 0).toFixed(2)).toPrecision()
                                       + '$']
                               )
                           }
                       </View>


                       <View style={{flex:1, padding:3, display:'flex', justifyContent:'space-between'}}>
                           <View>
                               <Text style={{lineHeight:1.2}}>
                                   I, the undersigned whose name and address are given on the
                                   item, certify that the particulars given in this declaration
                                   are correct and that this item does not contain any dangerous
                                   article or articles prohibited by legislation or by custom
                                   regulations
                               </Text>
                               <View style={{marginTop:5}}>
                                   <Text>
                                       Date and Sender's signature
                                   </Text>
                                   <View style={{marginTop:2}}>
                                       <Text>{receiptData.senderInfo.name}, {moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>

                                   </View>
                               </View>
                           </View>




                           <View style={{display:'flex', flexDirection:'row', lineHeight:1}}>
                               <View style={{width:'100%', padding:3}}>
                                   <View style={{marginBottom:2}}>
                                       <Text>No: {receiptData.packageInfo.in_track_no} </Text>
                                       <Text>Order No: {receiptData.packageInfo.reference_no} </Text>
                                   </View>
                                   {
                                       receiptData.productsInfo
                                           .slice(0, 4)
                                           .map((product) => {
                                               var description = [product.name, product.sku, product.qty+'ea'].join(' / ')
                                               return (
                                                   <View style={{marginTop:2, width:'100%', display: "flex", flexDirection: "row"}}>
                                                       <Text style={{textOverflow:"ellipsis", overflow:"hidden"}}>
                                                           {description}
                                                       </Text>
                                                   </View>
                                               );
                                           })}
                               </View>
                           </View>


                       </View>
                   </View>



                   <View style={{width:'63%'}}>
                       <View style={{width:'100%', height:'100%'}}>
                           <View style={{width:'100%', borderBottom:'1px solid black', textAlign:'center', fontSize:4, padding:'1px 0px'}}>
                               <Text>
                                   Return if undeliverable to: H-108505, Postbus 7270, 3109 AF schiedam, Netherlands
                               </Text>
                           </View>
                           <View style={{
                               borderBottom:'1px solid black',
                               height:'18%',
                               display:'flex', flexDirection:'row'}}>
                               <View style={{paddingTop:8, width:'55%', display:'flex', flexDirection:'row', borderRight:'1px solid black'}}>
                                   <View style={{paddingTop:6}}>
                                       <Text style={{transform: "rotate(-90deg)", fontSize:7, fontWeight:"bold"}}>FROM</Text>
                                   </View>
                                   <View style={{fontSize:6}}>
                                       {/*<Text>Sender</Text>*/}
                                       <Text>H3 NETWORKS</Text>
                                       <Text>#B103, The Sky Vallery 5th</Text>
                                       <Text>Hwagok-ro 416, 07548, Seoul</Text>
                                       <Text>South Korea</Text>
                                   </View>
                               </View>
                               <View style={{width:'45%', fontSize:6}}>
                                   <View style={{width:'100%', height:'100%', display:'flex', justifyContent:'flex-end', alignItems:"center"}}>

                                       <View style={{
                                           display:'flex', flexDirection:'row', justifyContent:'space-around' }}>
                                           <Image style={{height:33}} src={'src/img/NL_POST/tracked_express_logo.jpg'}/>
                                           <Image style={{height:33}} src={'src/img/NL_POST/nl_post_logo2.png'}/>
                                       </View>
                                       <Text style={{fontSize:7}}>Packet Tracked</Text>
                                       <View style={{backgroundColor:'black', width:'100%', textAlign:'center'}}>
                                           <Text style={{color:'white', padding:'2px 0px', fontSize:8}}>STANDARD</Text>
                                       </View>
                                   </View>
                               </View>
                           </View>







                           <View style={{
                               borderBottom:'1px solid black',
                               height:'28%',
                               display:'flex', flexDirection:'row',
                               fontSize:8, position:'relative'
                           }}>
                               <View style={{display:'flex', flexDirection:'row', height:'100%', width:'100%'}}>
                                   <View style={{
                                       width:'65%', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                                       <View>
                                           <Text style={{fontWeight:"bold", fontSize:8, padding:'0px 3px'}}>TO</Text>
                                       </View>

                                       <View style={{padding:5,
                                           borderLeft:'1px solid black', height:'100%',
                                           display:'flex', justifyContent:'space-between'
                                       }}>
                                           <View>
                                               <Text>{receiptData.receiverInfo.name}</Text>
                                               <Text>{receiptData.receiverInfo.address1}</Text>
                                               <Text>{receiptData.receiverInfo.address2}</Text>
                                           </View>
                                           <View style={{paddingTop:5}}>
                                               <Text>{receiptData.receiverInfo.city}, {receiptData.receiverInfo.state}</Text>
                                               <Text>ZIPCODE: {receiptData.receiverInfo.zip}, {receiptData.packageInfo.country_name_en}</Text>
                                           </View>
                                       </View>
                                   </View>

                                   <View style={{width:'35%',display:'flex', justifyContent:'space-between'}}>
                                       <View style={{width:'100%', paddingTop:5, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                           <Image style={{width:9, height:9, marginRight:2, marginTop:1}} src={'src/img/NL_POST/phone.png'} />
                                           <Text>{receiptData.receiverInfo.phone}</Text>
                                       </View>
                                       <View style={{width:'100%', display:'flex', alignItems:'flex-end'}}>
                                           <View style={{border:'1px solid black', margin:-1, padding:2}}>
                                               <Text style={{fontSize:20}}>{receiptData.packageInfo.country_code}</Text>
                                           </View>
                                       </View>
                                   </View>
                               </View>
                           </View>

                           <View style={{display:'flex', flexDirection:'row',
                               borderBottom:'1px solid black',
                               height:'20%', fontSize:5}}>
                               <View style={{
                                   width:'100%',
                                   display:'flex', flexDirection:'row',
                                   alignItems:'center', justifyContent:'center'
                               }}>
                                   <Image style={{height:35, width:40, marginRight:3, marginLeft:2}} src={'src/img/NL_POST/scan.png'} />
                               </View>
                           </View>


                           <View style={{width:'100%', display:'flex', alignItems:'center',
                               justifyContent:'space-between', flexGrow:1,
                           }}>
                               <View style={{fontSize:8, padding:'5px 0px 0px 5px', width:'100%'}}>
                                   <Text>{receiptData.senderInfo.name}, {moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>
                               </View>
                               <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                   <Image style={{width:'100%'}} source={{uri:barcodeUrl}} />
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