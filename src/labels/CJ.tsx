import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'Noto Sans KR',
    fonts: [
        {src: 'src/fonts/Noto_Sans_KR/static/NotoSansKR-Bold.ttf'},
        // {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight: 'bold'}
    ]
})
export default function CJ(props){
    const { receiptData } = props;

    const [barcodeUrl, setBarcodeUrl] = useState(()=>{
        const canvas_1 = createCanvas(10,10);
        JsBarcode(canvas_1, receiptData['packageInfo']['in_track_no'], {height:50, format:'CODE128', displayValue: false})
        return canvas_1.toDataURL('image/png')
    });
    const [smallBarcodeUrl, setSmallBarcodeUrl] = useState(()=>{
        const canvas_2 = createCanvas(10,10);
        JsBarcode(canvas_2, receiptData['packageInfo']['in_track_no'], {height:30, format:'CODE128', displayValue: false})
        return canvas_2.toDataURL('image/png')
    });
    const [sortingBarcodeUrl, setSortingBarcodeUrl] = useState(()=>{
        const canvas_3 = createCanvas(10,10);
        JsBarcode(canvas_3, receiptData['etcInfo']['CLSFCD'], {height:60, format:'CODE128', displayValue: false})
        return canvas_3.toDataURL('image/png')
    });

    // {
    //     "RESULT_CD": "S",
    //     "RESULT_DETAIL": "Success",
    //     "DATA": {
    //     "CLSFCD": "3Z70",
    //         "SUBCLSFCD": "2g",
    //         "CLSFADDR": "등촌 628-9 스카이5",
    //         "CLLDLVBRANNM": "강서등촌",
    //         "CLLDLVEMPNM": "##",
    //      "CLLDLVBRANNM"   "CLLDLVEMPNICKNM": "G01-6구역",
    //         "RSPSDIV": "01",
    //         "P2PCD": null
    // }
    // }


     const getBoxType = (doc) =>{
         let weightKg = parseFloat(doc['actualWeight']);
         let lengthCm = parseFloat(doc['length']) +parseFloat(doc['width']) +parseFloat(doc['height']);

        const categories = [
            { name: "극소", maxLength: 80, maxWeight: 2 },
            { name: "소", maxLength: 100, maxWeight: 5 },
            { name: "중", maxLength: 120, maxWeight: 10 },
            { name: "대 1", maxLength: 140, maxWeight: 15 },
            { name: "대 2", maxLength: 160, maxWeight: 20 },
            { name: "이형", maxLength: 190, maxWeight: 25 },
            { name: "취급제한", maxLength: Infinity, maxWeight: Infinity } // 취급제한
        ];

        for (let category of categories) {
            if (lengthCm <= category.maxLength && weightKg <= category.maxWeight) {
                return category.name;
            }
        }
        return "06"; // 혹시나 예외 처리

    }

    const formatKoreanPhoneNumber = (phoneNumber)=> {
        // 국가 코드 제거 및 0으로 시작하도록 변경
        phoneNumber = phoneNumber.replace(/^(\+82|82)/, '0');

        // 하이픈 포맷 적용
        if (/^02\d{8}$/.test(phoneNumber)) {
            // 서울 지역번호: 02-XXXX-XXXX
            return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (/^0\d{2}\d{7,8}$/.test(phoneNumber)) {
            // 그 외 지역번호나 휴대폰 번호: 010-XXXX-YYYY 또는 031-XXX-YYYY
            return phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
        } else {
            // 형식이 맞지 않으면 그대로 반환
            return phoneNumber;
        }
    }

    const maskTail = (val, len) => {
        val = val.toString();
        return val.slice(0, val.length - len) + '*'.repeat(len);
    };

    return (
        <Page key={receiptData['packageInfo']['in_track_no']} size={{ width: 432, height: 288 }} orientation="portrait" style={{
            fontSize:10,
            padding:2,
            height:'100%',
            fontFamily: "Noto Sans KR",
        }}>
            <View style={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', borderBottom:'0.5px solid gray'}}>
                <View style={{width:'40%', alignItems:'center'}}>
                    <Text style={{fontSize:12}}>{receiptData['packageInfo']['in_track_no']}</Text>
                </View>
                <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                    <View><Text>{moment(receiptData['packageInfo']['reg_date']).format('YYYY.MM.DD')}</Text></View>
                    <View><Text>1/1</Text></View>
                    <View><Text>재출력: </Text></View>
                </View>
            </View>

            <View style={{width:'100%', display:'flex', flexDirection:'row',
                justifyContent:'space-between', alignItems:'center',
                borderBottom:'0.5px solid gray'
            }}>
                <View style={{display:'flex', flexDirection:'row', width:'30%', alignItem:'center', justifyContent:'flex-end'}}>
                    <Image style={{width:'95%', height:56}} src={sortingBarcodeUrl} />
                </View>

                <View style={{display:'flex', flexDirection:'row', alignItems:'flex-end',  lineHeight:1, marginTop:-30}}>
                    <Text>
                        <Text style={{fontSize:36, textDecoration:'underline'}}>{receiptData['etcInfo']['CLSFCD'].slice(0,1)}</Text>
                        <Text style={{fontSize:53}}>{receiptData['etcInfo']['CLSFCD'].slice(1)}</Text>
                        <Text style={{fontSize:36}}>-{receiptData['etcInfo']['SUBCLSFCD']}</Text>
                    </Text>
                </View>

                <View style={{paddingRight:25, minWidth:10}}>
                    <Text style={{fontSize:30}}>{receiptData['etcInfo']['P2PCD'] && receiptData['etcInfo']['P2PCD']}</Text>
                </View>
            </View>


            <View style={{
                width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between', paddingLeft:20}}>
                <View style={{fontSize:10}}>
                        <Text>
                            {
                                [
                                    maskTail(receiptData['etcInfo']['receiverLocalInfo']['name'],1),
                                    maskTail(formatKoreanPhoneNumber(receiptData['receiverInfo']['phone']), 4),
                                    "/",
                                    maskTail(formatKoreanPhoneNumber(receiptData['receiverInfo']['phone']), 4),
                                ].join(" ")

                            }
                        </Text>
                        <Text>
                            {['state', 'city', 'address1', 'address2'].map(x=> receiptData['etcInfo']['receiverLocalInfo'][x] && receiptData['etcInfo']['receiverLocalInfo'][x]).join(" ")}
                        </Text>
                </View>

                <View style={{width:'35%'}}>
                    <Image style={{width:'80%', height:20}} src={smallBarcodeUrl} />
                </View>
            </View>



            <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between', paddingLeft:20}}>
                <Text style={{fontSize:24, lineHeight:1.3, marginTop:-5}}>{receiptData['etcInfo']['CLSFADDR']}</Text>
            </View>

            <View style={{lineHeight:0.9,
                width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between', paddingLeft:20,
                fontSize:10, alignItems:'center'
            }}>
                    <View style={{width:'45%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:7}}>{receiptData['senderInfo']['name']}</Text>
                        <Text style={{fontSize:7}}>{formatKoreanPhoneNumber(receiptData['senderInfo']['phone'])}</Text>
                    </View>
                    <View style={{paddingLeft:20, width:'55%', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text>{getBoxType(receiptData)}</Text>
                        <Text>0</Text>
                        <Text>신용</Text>
                    </View>
            </View>
            <View style={{
                borderBottom:'0.5px solid gray',
                width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between',  paddingLeft:20}}>
                <Text>
                    {['state', 'city', 'address1', 'address2'].map(x=> receiptData['senderInfo'][x] && receiptData['senderInfo'][x]).join(" ")}
                </Text>
            </View>

                <View style={{display:'flex', flexDirection:'column', flexGrow:1, justifyContent:'space-between'}}>
                    <View style={{paddingLeft:10}}>
                        {
                            [receiptData['productsInfo'].slice(0,6).map(pro => {
                                return(
                                    <View  style={{
                                        display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                        <View>
                                            <Text style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                            {pro['brand'] && <Text>[{pro['brand']}] </Text>}<Text>{pro['name'].slice(0,65)} {pro['name'].length > 65 && '...'}</Text>
                                            </Text>
                                        </View>
                                        <View style={{paddingRight:10}}>
                                            <Text>{pro['qty']}</Text>
                                        </View>
                                    </View>
                                )
                            })]
                        }
                    </View>


                    <View style={{
                        width:'100%', height:60,
                        borderTop:'0.5px solid gray', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{width:'50%', textAlign:'center'}}>
                            <Text style={{fontSize:6}}>-</Text>
                            <Text style={{fontSize:18}}>
                                {["CLLDLVBRANNM","CLLDLVEMPNICKNM"].map(x=>receiptData['etcInfo'][x] && receiptData['etcInfo'][x]).join(" - ")}
                            </Text>
                        </View>
                        <View style={{width:'50%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <Image style={{width:'80%', height:48}} src={barcodeUrl} />
                            <View style={{marginTop:-5}}>
                                <Text>{receiptData['packageInfo']['in_track_no']}</Text>
                            </View>
                        </View>
                    </View>

                </View>


            </View>




        </Page>
    )
};

