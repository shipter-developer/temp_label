
import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import {createCanvas} from "canvas";
import JsBarcode from "jsbarcode";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
const imgList = {
    logo : "src/img/COMMON/shipter_logo.png",
}
export default function PACKING(props){
    const { receiptData } = props;

    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, receiptData['packageInfo']['in_track_no'], {height:70, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });
    const joinIfPresent = (arr) =>
        arr.filter(x => typeof x === 'string' && x.trim() !== '').join(', ');
    const renderProducts = (pros) => {
        const totalDescription = [];
        let remainingRows = 18;
        const maxCharsPerLine = 85;

        const estimateLineCount = (text) => {
            return Math.ceil(text.length / maxCharsPerLine);
        };

        for (let product of pros) {
            const desc = [product.name, product.brand,  product.qty + 'ea'].join(' / ');
            const lineCount = estimateLineCount(desc);

            if (remainingRows < lineCount) break;

            totalDescription.push(desc);
            remainingRows -= lineCount;
        }

        return totalDescription.map((desc, index) => (
            <View key={index} style={{ marginBottom: 1, width: '100%', display: "flex", flexDirection: "row", alignItems: 'flex-start', lineHeight: 1 }}>
                <View style={{ width: 15, display: 'flex', alignItems: 'center' }}>
                    <Text>{index + 1}. </Text>
                </View>
                <View style={{ display: "flex", width: '98%' }}>
                    <Text style={{ fontWeight: '400' }}>
                        {desc}
                    </Text>
                </View>
            </View>
        ));




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
                  height:'15%', position:'relative',
                  borderBottom:'1px solid black', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                  <View style={{paddingLeft:10}}>
                      <Image style={{height:'90%'}} src={barcodeUrl} />
                  </View>
                  <View style={{paddingRight:5}}>
                      <Text style={{fontSize:16}}>PACKING LIST<Text style={{fontSize:10}}>[{receiptData.packageInfo.method_name}]</Text></Text>
                  </View>
              </View>
              <View style={{
                  borderBottom:'1px solid black',
                  height:'16%',
                  display:'flex', flexDirection:'row',
                  fontSize:10, position:'relative',
                  paddingLeft:10,

              }}>
                  <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:"space-between", width:'100%'}}>
                      <View style={{
                          lineHeight:1.3
                      }}>
                          <Text>{receiptData.receiverInfo.name}</Text>
                          <Text>{joinIfPresent([receiptData.receiverInfo.address2, receiptData.receiverInfo.address1])}</Text>
                          <Text>{joinIfPresent([receiptData.receiverInfo.zip, receiptData.receiverInfo.city, receiptData.receiverInfo.state])}</Text>
                      </View>

                      <View style={{
                          height:'100%', width:'15%',
                          display:'flex', justifyContent:'center', alignItems:'center', borderLeft:'1px solid black'}}>
                          <Text style={{fontSize:25}}>{receiptData.packageInfo.country_code}</Text>
                      </View>

                  </View>
              </View>
              <View style={{
                  borderBottom:'1px solid black',
                  display:'flex', flexDirection:'row',
                  fontSize:10, justifyContent:'space-between', alignItems:'center'
              }}>
                  {
                      ['OrderNum', receiptData.packageInfo.reference_no, 'TrackNum', receiptData.packageInfo.in_track_no].map((item, i)=>{
                          return(
                              <View style={{
                                  padding:'4px 0px 5px 0px', height:'100%',
                                  width: i %2 == 0 ? '13%' : '37%', borderLeft: i == 0 ? 0 : '1px solid black', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                  <Text style={{fontWeight: i%2 == 0 ? '400' : '900', fontSize:  i%2 == 0 ? 8 : 11}}>{item}</Text>
                              </View>
                          )
                      })
                  }
              </View>


              <View style={{display:'flex', flexDirection:'row',
                  flexGrow:1,
                  fontSize:8, paddingTop:2,
              }}>
                  <View style={{width:'100%', lineHeight:1}}>
                      {
                          renderProducts(
                              receiptData.productsInfo
                                  // .concat(receiptData.productsInfo).concat(receiptData.productsInfo).concat(receiptData.productsInfo)
                          )
                      }
                  </View>
              </View>
          </View>
      </Page>
  )
};


