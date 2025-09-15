import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})

export default function SHIPTER_BAG(props){
    const { bagData } = props;
    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas = createCanvas(10,10);
        JsBarcode(canvas, bagData['bag_number'], {height:70, format:'CODE128', displayValue: false})
        return canvas.toDataURL('image/png')
    });

    return (
        <Page key={bagData['bag_number']} size={{ width: 432, height: 288 }} orientation="landscape" style={{
            fontSize: 12,
            padding:2,
            fontWeight:'bold',
            lineHeight:1,
            height:'100%',
            fontFamily: "SpoqaHanSansNeo",
        }}>
            <View style={{
                height:20,
                fontSize:18,
                fontWeight:'bold',
                width:'100%', display:'flex', flexDirection:'row',
                textAlign:'center', backgroundColor:'black', color:'white', alignItems:'center', padding:'0px 0px'
            }}>
                <div style={{width:'70%'}}>
                    <Text>MAWB</Text>
                </div>
                <div style={{width:'30%'}}>
                    <Text>Dest.</Text>
                </div>
            </View>

            <View style={{
                height:20,
                fontSize:20,
                fontWeight:'bold',
                width:'100%', display:'flex', flexDirection:'row',
                textAlign:'center', alignItems:'center', margin:'0px 0px',
            }}>
                {/*<div style={{width:'70%'}}>*/}
                {/*    <Text>{bagData['note_master'] || ' '}</Text>*/}
                {/*</div>*/}
                {/*<div style={{width:'30%'}}>*/}
                {/*    <Text>{bagData['note_dest'] || ' '}</Text>*/}
                {/*</div>*/}
            </View>


            <View style={{width:'100%', borderTop:'2px double black', paddingTop:2}}>
                <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <Image style={{width:'90%'}} src={barcodeUrl} />
                </View>
                <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingBottom:5}}>
                    <Text style={{fontSize:20}}>{bagData.bag_number}</Text>
                </View>
            </View>

            <View style={{width:'100%', display:'flex', flexDirection:'row', fontSize:14, marginTop:5, alignItems:'center'}}>
                <View style={{width:'50%', paddingLeft:20, fontSize:10}}>
                    <Text style={{fontWeight:'normal'}}>Dispatch date: </Text>
                </View>
                <Text>{moment().format('DD-MMMM-YYYY')}</Text>
            </View>

            <View style={{width:'100%', display:'flex', flexDirection:'row', fontSize:14, marginTop:5, alignItems:'center'}}>
                <View style={{width:'50%', paddingLeft:20, fontSize:10}}>
                    <Text style={{fontWeight:'normal'}}>Country: </Text>
                </View>
                <Text>{bagData['country_code']}</Text>
            </View>

            <View style={{
                lineHeight:1.4,
                width:'100%', display:'flex', flexDirection:'row', fontSize:14, marginTop:5, alignItems:'center',
                borderBottom: '2px double black', paddingBottom:5
            }}>
                <View style={{width:'50%', display:'flex', flexDirection:'row', fontSize:14, alignItems:'center'}}>
                    <View style={{width:'50%', paddingLeft:20, fontSize:10}}>
                        <Text style={{fontWeight:'normal'}}>Pices: </Text>
                    </View>
                    <Text>{bagData['parcels'].length}</Text>
                </View>
                <View style={{width:'50%', display:'flex', flexDirection:'row', fontSize:14, alignItems:'center'}}>
                    <View style={{width:'50%', fontSize:10}}>
                        <Text style={{fontWeight:'normal'}}>Weight: </Text>
                    </View>
                    <Text>{bagData['parcels'].reduce((a, b) => a + parseFloat(b.weight), 0).toFixed(2)} kg</Text>
                </View>
            </View>


            <View style={{
                display:'flex',
                flexDirection:'column', flexGrow:1,
                justifyContent:'center',
                width:'100%', textAlign:'center'}}>
                <Text style={{fontSize:20}}>
                    {bagData['bag_number']}
                </Text>
            </View>

        </Page>
    )
};

