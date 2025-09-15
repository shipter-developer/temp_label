import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
export default function UZ_POST_EMS(props){
    const { receiptData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:70, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });

    const renderPadding=(data, head=null)=>{
        return(
            <View style={{height:15, padding:'0px 1px', alignItems:'center', borderBottom:'0.5px solid black', display:'flex', flexDirection:'row',/* flexWrap:'wrap' */}}>
                <Text>
                    {
                        head &&
                        <Text style={{fontWeight:'normal'}}>{head} : </Text>
                    }
                    <Text>{data}</Text>
                </Text>
            </View>
        )
    }
   return (
       <Page size={{ width: 432, height: 288 }} orientation="portrait"  style={{
           fontSize: 5,
           padding:2,
           fontFamily: "SpoqaHanSansNeo",
           lineHeight:1.1,
           fontWeight:'bold'
       }}>
           <View style={{border:'2px solid black', width:'100%', height:'100%'}}>
               <View style={{
                   borderBottom:'0.5px solid black',
                   height:60,
                   width:'100%', display:'flex', flexDirection:'row'}}>
                   <View style={{width:'20%', display:'flex', justifyContent:'center'}}>
                       <Image style={{height:40}} src={'src/img/UZ_POST/UZ-EMS-logo.jpg'}/>
                   </View>
                   <View style={{
                       marginRight:2, display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                       <Image style={{height:10, marginRight:5}} src={'src/img/UZ_POST/return_mark.png'}/>
                       <View>
                           <Text>Return if undeliverable :</Text>
                           <Text>PO Box 0371 TASHKENT-UZBEKISTAN</Text>
                           <Text>The Item / Parcel maybe opened officially</Text>
                       </View>
                   </View>
                   <View style={{width:'38%'}}>
                       <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                           <Image style={{width:'100%'}} source={{uri:barcodeUrl}} />
                       </View>
                       <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingBottom:5}}>
                           <Text style={{fontSize:10}}>{receiptData.packageInfo.in_track_no}</Text>
                       </View>
                   </View>
                   <View style={{
                       width:'13%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                       <View style={{border:'1px solid black', width:'90%', fontSize:7, textAlign:'center', padding:2}}>
                           <Text>POSTAGE PAID</Text>
                           <Text style={{fontSize:9}}>UZA</Text>
                       </View>
                   </View>
               </View>

               <View style={{width:'100%', display:'flex', flexDirection:'row',
                   height:'100%'
               }}>
                   <View style={{
                       width:'40%',
                       display:'flex', flexDirection:"column",
                       borderRight:'0.5px solid black'
                       // borderBottom:'0.5px solid black'
                   }}>
                       <View style={{width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                           <View style={{width:'10%', padding:2}}>
                               <Text>From</Text>
                           </View>
                           <View style={{width:'90%', borderLeft:'0.5px solid black'}}>
                               <View style={{}}>
                                   {renderPadding(receiptData.senderInfo.name)}
                                   {renderPadding(receiptData.senderInfo.address1, 'Address')}
                                   {renderPadding(receiptData.senderInfo.phone, 'Tel')}
                                   <View style={{ height:15, width:'100%', display:'flex', flexDirection:'row', padding:'0px 1px'}}>
                                       <View style={{width:'50%', display:'flex', justifyContent:'center'}}>
                                           <Text><Text style={{fontWeight:'normal'}}>Postcode:</Text> {receiptData.senderInfo?.zip}</Text>
                                       </View>
                                       <View style={{width:'50%', display:'flex', justifyContent:'center'}}>
                                           <Text><Text style={{fontWeight:'normal'}}>City:</Text> {receiptData.senderInfo?.city}</Text>
                                       </View>
                                   </View>
                               </View>
                           </View>
                       </View>

                       <View style={{width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                           <View style={{width:'10%', padding:2}}>
                               <Text>To</Text>
                           </View>
                           <View style={{width:'90%', borderLeft:'0.5px solid black', position:'relative'}}>
                               <View style={{width:'100%'}}>
                                   {renderPadding(receiptData.receiverInfo.name, 'Addressee')}
                                   {renderPadding([receiptData.receiverInfo.address1, receiptData.receiverInfo.address2].filter(x=> x.trim() != '').join(', '), 'Address')}
                                   {renderPadding(receiptData.receiverInfo.phone, 'Tel')}
                                   <View style={{ height:15, width:'100%', display:'flex', padding:'0px 1px', justifyContent:'space-around', paddingRight: 40}}>
                                       <View style={{display:'flex', justifyContent:'center'}}>
                                           <Text><Text style={{fontWeight:'normal'}}>Postcode:</Text> {receiptData.receiverInfo.zip}</Text>
                                       </View>
                                       <View style={{display:'flex', justifyContent:'center'}}>
                                           <Text><Text style={{fontWeight:'normal'}}>City:</Text> {receiptData.receiverInfo.city}</Text>
                                       </View>
                                   </View>
                               </View>

                               <View style={{
                                   margin:-0.5,
                                   width:35,
                                   height:31, display:'flex', justifyContent:'center', alignItems:'center',
                                   position:'absolute', right:0, bottom:0, backgroundColor:'white', border:'0.5px solid black'}}>
                                   <Text style={{fontSize:20}}>{receiptData.packageInfo.country_code}</Text>
                               </View>
                           </View>
                       </View>


                       <View style={{flex:1,
                           display:'flex', flexDirection:'row',
                           justifyContent:'space-around', alignItems:'center'
                       }}>
                           <View style={{
                               padding:3,
                               width:'45%', height:'90%', border:'0.5px solid black'}}>
                               <View style={{height:'20%'}}/>
                               <View style={{height:'80%', display:'flex', justifyContent:'space-around'}}>
                                   <Text>Weight(Gr.){receiptData.packageInfo.r_weight}</Text>
                                   <Text>Date: {moment(receiptData.packageInfo.reg_date).format("DD/MM/YYYY")}</Text>
                                   <Text>Time:</Text>
                                   <Text>Postage:</Text>
                               </View>
                           </View>

                           <View style={{
                               padding:3,
                               width:'45%', height:'90%', border:'0.5px solid black'}}>
                               <View style={{height:'20%', textAlign:'center'}}>
                                   <Text>DELIVERY PARITICULARS</Text>
                                   <Text>Item was received</Text>
                               </View>
                               <View style={{height:'80%', display:'flex', justifyContent:'space-around'}}>
                                   <Text>Name:</Text>
                                   <Text>Date:</Text>
                                   <Text>Time:</Text>
                                   <Text>Signature:</Text>
                               </View>
                           </View>
                       </View>
                   </View>

                   <View style={{width:'60%'}}>
                       <View style={{height:15, width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                           <View style={{width:'55%', borderRight:'0.5px solid black', display:'flex', justifyContent:'center', paddingLeft:2}}>
                               <Text>CUSTOMS DECLARATION</Text>
                               <Text>Importers telephone/fax/email (if known )</Text>
                           </View>
                           <View style={{paddingLeft:2, display:'flex', justifyContent:'center'}}>
                               <Text>Importer's reference (if any){'\n'}( tax code / VAT )</Text>
                           </View>


                       </View>

                       <View style={{height:30, width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>

                           <View style={{width:'33%', borderRight:'0.5px solid black', display:'flex', alignItems:'center', justifyContent:'center'}}>
                               <Text>Detail description of contents</Text>
                           </View>
                           <View style={{width:'11%', borderRight:'0.5px solid black', display:'flex', alignItems:'center', justifyContent:'center'}}>
                               <Text>Quantity</Text>
                           </View>
                           <View style={{width:'11%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', borderRight:'0.5px solid black'}}>
                               <Text>Net{'\n'}Weight{'\n'}(kg)</Text>
                           </View>

                           {/*<View style={{height:10, width:'100%', borderBottom:'0.5px solid black', display:'flex', alignItems:'center', justifyContent:'center'}}>*/}
                           {/*    <Text>For Commercial items only</Text>*/}
                           {/*</View>*/}
                           {/*<View style={{height:20, width:'100%', display:'flex', flexDirection:'row'}}>*/}
                           <View style={{width:'11%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', borderRight:'0.5px solid black'}}>
                               <Text>Unit{'\n'}value{'\n'}(USD)</Text>
                           </View>

                           <View style={{width:'34%'}}>
                               <View style={{
                                   width:'100%', height:7,
                                   textAlign:'center',
                                   borderBottom:'0.5px solid black'
                               }}>
                                   <Text>For Commercial items only</Text>
                               </View>

                               <View style={{
                                   height:23, width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                   <View style={{
                                       height:'100%',
                                       width:'60%', borderRight:'0.5px solid black', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                       <Text>HS traiff no</Text>
                                   </View>
                                   <View style={{
                                       height:'100%',
                                       width:'40%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
                                       <Text>Country of{'\n'}origin of{'\n'}good</Text>
                                   </View>
                               </View>
                           </View>

                       </View>




                       {receiptData.productsInfo.slice(0,3)
                           .map((pro, index) => {
                               return (
                                   <View style={{height:index == 0 ? 15.5 : 15, width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                                       <View style={{padding:'0px 2px', width:'33%', borderRight:'0.5px solid black', display:'flex', justifyContent:'center'}}>
                                           <Text style={{textOverflow:"ellipsis", overflow:"hidden"}}>{pro.name}</Text>
                                       </View>
                                       <View style={{width:'11%', borderRight:'0.5px solid black', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                           <Text>{pro.qty}</Text>
                                       </View>
                                       <View style={{width:'11%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', borderRight:'0.5px solid black'}}>
                                           <Text>{parseFloat((receiptData.packageInfo.r_weight/receiptData.productsInfo.length).toFixed(2)).toPrecision()}</Text>
                                       </View>
                                       <View style={{width:'11%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', borderRight:'0.5px solid black'}}>
                                           <Text>{(receiptData.packageInfo.currency).toLowerCase() === "usd" ? "$" : "€"}{" "}{parseFloat((parseFloat(pro.price) * parseInt(pro.qty)).toFixed(2)).toPrecision()}</Text>
                                       </View>
                                       <View style={{
                                           width:'20.4%', borderRight:'0.5px solid black', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                           <Text>{pro.hsCode}</Text>
                                       </View>
                                       <View style={{
                                           width:'13.6%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
                                           <Text>KR</Text>
                                       </View>
                                   </View>
                               )
                           })}
                       {
                           receiptData.productsInfo.length > 3 &&
                           <View style={{height:15, width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                               <View style={{padding:'0px 2px', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                   <Text style={{textOverflow:"ellipsis", overflow:"hidden"}}>...{(receiptData.productsInfo.length - 3)} items omitted</Text>
                               </View>
                           </View>
                       }
                       <View style={{height:15.5, width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                           <View style={{padding:'0px 2px', width:'44%', borderRight:'0.5px solid black', display:'flex', justifyContent:'center', textAlign:'center'}}>
                               <Text style={{textOverflow:"ellipsis", overflow:"hidden"}}>TOTAL</Text>
                           </View>

                           <View style={{width:'11%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', borderRight:'0.5px solid black'}}>
                               <Text>{parseFloat(parseFloat(receiptData.packageInfo.r_weight).toFixed(2)).toPrecision()}</Text>
                           </View>
                           <View style={{width:'11%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', borderRight:'0.5px solid black'}}>
                               <Text>{(receiptData.packageInfo.currency).toLowerCase() === "usd" ? "$" : "€"}{" "}{parseFloat(receiptData.productsInfo.reduce((pre, cur)=>pre + parseFloat(cur.price) * parseInt(cur.qty), 0).toFixed(2)).toPrecision()}</Text>
                           </View>
                       </View>

                       <View style={{width:'100%', display:'flex', flexDirection:'row', borderBottom:'0.5px solid black'}}>
                           <View style={{width:'48%', padding:'0x 2px'}}>
                               <View style={{padding:'2px 0px 5px 0px'}}>
                                   <Text>Category of item</Text>
                               </View>
                               <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                                   {
                                       ['GIFT', 'Commercial','Others','Documents','Returned goods','Sale of goods'].map((item,i)=>{
                                           return(
                                               <View style={{minWidth:'50%', display:'flex', flexDirection:'row', margin:'1px 0px'}}>
                                                   <Image src={i == 5 ? 'src/img/check.png' :   'src/img/uncheck.png'} style={{height:5, marginRight:2}}/>
                                                   <Text>{item}</Text>
                                               </View>
                                           )
                                       })
                                   }
                               </View>
                           </View>
                           <View style={{paddingTop:2, width:'18%', borderRight:'0.5px solid black', display:'flex'}}>
                               <Text>Explanation:</Text>
                           </View>

                           <View style={{
                               height:50,
                               width:'34%', display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
                               <Text style={{fontWeight:'normal'}}>
                                   Office of origin{'\n'}Date of posting
                               </Text>
                               <View style={{padding:'5px 0px',
                                   display:'flex', justifyContent:'center', alignItems:'center',
                                   textAlign:'center', fontSize:6}}>
                                   <Text>SHIPTER Co.</Text>
                                   <Text>
                                       {moment(receiptData.packageInfo.reg_date).format("DD/MM/YY")}
                                   </Text>
                               </View>
                           </View>
                       </View>

                       <View style={{width:'100%',flex:1,  display:'flex', flexDirection:'row'}}>
                           <View style={{flex:1, width:'66%', borderRight:'0.5px solid black'}}>
                               <View style={{
                                   height:30,
                                   display:'flex',
                                   padding:5,
                                   borderBottom:'0.5px solid black'
                               }}>
                                   <Text>
                                       Comments: (e.g.: good subject to quarantine sanitary /{'\n'}
                                       phytosanitary inspection or other restrictions).
                                   </Text>
                               </View>
                               <View style={{flex:1, paddingTop:5}}>
                                   <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                                       {
                                           ['Licence', 'Cerificate','Invoice'].map((item,i)=>{
                                               return(
                                                   <View style={{}}>
                                                       <View style={{display:'flex', flexDirection:'row', margin:'1px 0px', alignItems:'center'}}>
                                                           <View style={{width:15, height:15, border:'0.5px solid black'}}/>
                                                           <View style={{paddingLeft:2}}>
                                                               <Text style={{fontSize:7, fontWeight:'normal'}}>{item}</Text>
                                                           </View>
                                                       </View>
                                                       <Text>No. of {item.toLowerCase()}(s)</Text>
                                                   </View>
                                               )
                                           })
                                       }
                                   </View>
                               </View>
                           </View>

                           <View style={{width:'34%',  padding:5}}>
                               <Text style={{fontWeight:'normal'}}>
                                   I certify that the particulars given in this customs
                                   decleration are correct and that this term does not contain
                                   any dangerous article or articles prohibited by regislation
                               </Text>
                               <View style={{paddingTop:10}}>
                                   <Text>
                                       Date and sender's signature
                                   </Text>
                               </View>
                               <View style={{marginTop:3}}>
                                   <Text>{receiptData.senderInfo.name}</Text>
                                   <Text>{moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>
                               </View>
                           </View>


                       </View>

                   </View>
               </View>
           </View>
       </Page>
   )
};