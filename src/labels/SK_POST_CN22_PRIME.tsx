import React, {useState} from "react";
import {Page, Text, View, Image, Font, Document} from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";
import {createCanvas} from "canvas";

Font.register({family: 'SpoqaHanSansNeo', fonts:[{src: 'src/fonts/SpoqaHanSansNeo-Medium.ttf'}, {src: 'src/fonts/SpoqaHanSansNeo-Bold.ttf', fontWeight:'bold'}]})
const imgList = {
    check: 'src/img/check.png',
    uncheck: 'src/img/uncheck.png',
    logo : "src/img/SK_POST/sk_post_logo.png",
    scan: "src/img/LT_POST/scan.png",
    phone: "src/img/LT_POST/phone.png",
    no_signature: "src/img/LT_POST/no_signature.png",
}
const target = {'70101': 'QN', '70202': 'BA', '70204': 'QN', '70206': 'QM', '70210': 'QN', '70220': 'BA', '70223': 'BA', '70224': 'BA', '70225': 'BA', '70230': 'BA', '70233': 'BA', '70234': 'BA', '70235': 'BA', '70236': 'BA', '70237': 'BA', '70240': 'BA', '70241': 'QN', '70243': 'BA', '70246': 'BA', '70247': 'BA', '70259': 'QN', '70260': 'QM', '70262': 'QM', '70266': 'QM', '70267': 'QM', '70270': 'QM', '70273': 'QM', '70274': 'QM', '70275': 'QM', '70280': 'QN', '71000': 'BA', '71003': 'BA', '71101': 'BA', '71102': 'BA', '71103': 'BA', '71104': 'BA', '71105': 'BA', '71106': 'BA', '71107': 'BA', '71108': 'BA', '71120': 'BA', '71121': 'BA', '71122': 'BA', '71123': 'QM', '71124': 'QM', '71125': 'BA', '71126': 'QM', '71127': 'BA', '71140': 'BA', '71141': 'BA', '71142': 'BA', '71143': 'BA', '71144': 'QM', '71145': 'BA', '71160': 'BA', '71161': 'BA', '71162': 'BA', '71163': 'BA', '71164': 'BA', '71165': 'BA', '71166': 'BA', '71167': 'BA', '71299': 'BA', '71210': 'BA', '71211': 'BA', '71212': 'BA', '71213': 'QM', '71214': 'QM', '71215': 'BA', '71216': 'QM', '71217': 'BA', '71218': 'BA', '71219': 'BA', '71220': 'QM', '71221': 'BA', '71222': 'QM', '71223': 'BA', '71230': 'QM', '71232': 'QM', '71233': 'QM', '71240': 'BA', '71243': 'BA', '71244': 'BA', '71245': 'QM', '71250': 'QN', '71253': 'BA', '71254': 'QN', '71255': 'QN', '71260': 'QN', '71270': 'BA', '71275': 'QN', '71300': 'BA', '71305': 'BA', '71320': 'BA', '71321': 'BA', '71322': 'BA', '71323': 'BA', '71330': 'BA', '71333': 'BA', '71335': 'QN', '71340': 'BA', '71345': 'BA', '71347': 'BA', '71350': 'QM', '71355': 'QM', '71356': 'QM', '71357': 'QM', '71360': 'QM', '71370': 'BA', '71373': 'BA', '71380': 'BA', '71383': 'BA', '71385': 'BA', '71387': 'BA', '71420': 'QM', '71423': 'QM', '71425': 'QM', '71428': 'QM', '72000': 'BA', '72101': 'BA', '72102': 'BA', '72103': 'BA', '72104': 'BA', '72105': 'BA', '72106': 'BA', '72107': 'BA', '72108': 'BA', '72109': 'BA', '72112': 'BA', '72207': 'BA', '72209': 'BA', '72212': 'BA', '72213': 'BA', '72215': 'BA', '72216': 'BA', '72220': 'BA', '72224': 'BA', '72225': 'BA', '72226': 'BA', '72227': 'BA', '72230': 'QN', '72233': 'BA', '72236': 'BA', '72238': 'QN', '72240': 'BA', '72243': 'BA', '72244': 'BA', '72245': 'BA', '72246': 'BA', '72248': 'BA', '72250': 'QN', '72251': 'BA', '72252': 'BA', '72253': 'BA', '72254': 'BA', '72256': 'QN', '72260': 'QN', '72264': 'BA', '72265': 'BA', '72270': 'BA', '72273': 'BA', '72274': 'BA', '72276': 'QN', '72277': 'BA', '72278': 'BA', '72281': 'BA', '72282': 'BA', '72283': 'BA', '72284': 'BA', '72285': 'BA', '72286': 'BA', '72290': 'QN', '72291': 'QN', '72293': 'BA', '72295': 'QN', '73000': 'BA', '73101': 'BA', '73102': 'BA', '73110': 'QM', '73202': 'QM', '73205': 'BA', '73206': 'BA', '73207': 'BA', '73208': 'BA', '73220': 'QM', '73223': 'QM', '73225': 'QM', '73226': 'QM', '73228': 'QM', '73240': 'QM', '73242': 'QM', '73244': 'QM', '73245': 'QM', '73247': 'QM', '73249': 'QM', '73250': 'BA', '73255': 'BA', '73260': 'QM', '73263': 'QM', '73265': 'QM', '73267': 'QM', '73280': 'QM', '73283': 'QM', '73285': 'QM', '73287': 'QM', '73290': 'BA', '73295': 'BA', '73300': 'QM', '73301': 'QM', '73302': 'QM', '73303': 'QM', '73305': 'QM', '73307': 'QM', '73309': 'QM', '73311': 'QM', '73313': 'QM', '73314': 'QM', '73319': 'QM', '74101': 'QM', '74103': 'QM', '74104': 'QM', '74105': 'QM', '74106': 'QM', '74203': 'BA', '74206': 'BA', '74207': 'BA', '74208': 'QM', '74209': 'QM', '74210': 'QM', '74211': 'QM', '74212': 'QM', '74213': 'QM', '74214': 'QM', '74215': 'QM', '74216': 'QM', '74217': 'QM', '74221': 'QM', '74222': 'QM', '74223': 'QM', '74225': 'QM', '74230': 'QN', '74250': 'BA', '74253': 'BA', '74254': 'QN', '74255': 'QM', '74256': 'BA', '74258': 'QN', '74260': 'BA', '74261': 'QM', '74264': 'BA', '74265': 'QM', '74266': 'BA', '74268': 'BA', '74270': 'QM', '74271': 'QM', '74272': 'QM', '74273': 'QM', '74274': 'QM', '74275': 'QM', '74276': 'QM', '74277': 'QM', '74278': 'QM', '74279': 'QM', '74317': 'QM', '74322': 'QM', '74323': 'QM', '74400': 'QM', '74412': 'QM', '74413': 'QM', '74417': 'QM', '74418': 'QM', '74450': 'QM', '74451': 'QM', '74452': 'QM', '74455': 'QM', '74470': 'QM', '74480': 'QM', '74483': 'QM', '74484': 'QM', '74485': 'QM', '74487': 'QM', '74488': 'QM', '74489': 'QM', '75000': 'BA', '75101': 'BA', '75103': 'BA', '75104': 'BA', '75105': 'BA', '75106': 'BA', '75107': 'BA', '75108': 'BA', '75109': 'BA', '75110': 'BA', '75111': 'BA', '75112': 'BA', '75113': 'BA', '75203': 'BA', '75206': 'BA', '75207': 'BA', '75208': 'BA', '75211': 'BA', '75212': 'BA', '75213': 'BA', '75214': 'BA', '75216': 'BA', '75240': 'QM', '75245': 'BA', '75246': 'BA', '75247': 'QM', '75248': 'QM', '75249': 'QM', '75260': 'BA', '75265': 'BA', '75267': 'BA', '75268': 'BA', '75270': 'BA', '75272': 'BA', '75273': 'BA', '75274': 'BA', '75275': 'BA', '75276': 'BA', '75280': 'BA', '75283': 'BA', '75290': 'BA', '75300': 'BA', '75301': 'BA', '75303': 'BA', '75304': 'BA', '75305': 'BA', '75306': 'BA', '75308': 'BA', '75320': 'BA', '75323': 'BA', '75324': 'BA', '75326': 'BA', '75327': 'BA', '75328': 'BA', '75329': 'BA', '75330': 'QM', '75350': 'BA', '75353': 'BA', '75355': 'BA', '75356': 'BA', '75357': 'BA', '75358': 'BA', '75400': 'QM', '75401': 'QM', '75403': 'QM', '75404': 'QM', '75405': 'QM', '75406': 'QM', '75410': 'QM', '75411': 'BA', '75412': 'QM', '75413': 'QM', '75414': 'BA', '75420': 'QM', '75422': 'QM', '75430': 'QM', '75433': 'QM', '75434': 'QM', '75453': 'QM', '75436': 'QM', '75440': 'QM', '75444': 'QM', '75445': 'QM', '75446': 'QM', '75450': 'QM', '75455': 'QM', '75940': 'QM', '76101': 'QM', '76105': 'QM', '76106': 'QM', '76109': 'QM', '76120': 'BA', '76204': 'QN', '76205': 'QN', '76206': 'BA', '76207': 'BA', '76208': 'BA', '76209': 'BA', '76210': 'QN', '76212': 'QM', '76214': 'QN', '76216': 'QM', '76218': 'QM', '76219': 'BA', '76230': 'QM', '76231': 'QN', '76233': 'QN', '76234': 'QN', '76235': 'QM', '76236': 'QM', '76237': 'QM', '76238': 'QM', '76239': 'QM', '76250': 'BA', '76254': 'BA', '76256': 'QM', '76257': 'BA', '76258': 'BA', '76259': 'BA', '76270': 'QN', '76271': 'QN', '76272': 'QN', '76273': 'QM', '76274': 'QN', '76275': 'QN', '76276': 'QN', '76277': 'QN', '76278': 'QM', '76279': 'QN', '76281': 'QN', '76290': 'QN', '76292': 'QN', '76293': 'QN', '76295': 'QN', '76296': 'QN', '76297': 'QN', '76300': 'QM', '76301': 'QM', '76303': 'QM', '76304': 'QM', '76305': 'QM', '76310': 'QM', '76311': 'QM', '76312': 'QM', '76313': 'QM', '76315': 'QM', '76316': 'QM', '76318': 'QM', '76321': 'QM', '76323': 'QM', '76325': 'QM', '76327': 'QM', '76328': 'QM', '76329': 'QM', '76330': 'QM', '76333': 'QM', '76335': 'QM', '77000': 'BA', '77101': 'BA', '77103': 'BA', '77104': 'BA', '77105': 'BA', '77106': 'BA', '77203': 'BA', '77204': 'BA', '77205': 'BA', '77206': 'BA', '77207': 'BA', '77208': 'BA', '77209': 'BA', '77215': 'BA', '77220': 'BA', '77222': 'BA', '77223': 'BA', '77224': 'BA', '77225': 'BA', '77226': 'BA', '77227': 'BA', '77228': 'BA', '77230': 'BA', '77231': 'BA', '77232': 'BA', '77233': 'BA', '77234': 'BA', '77235': 'BA', '77236': 'BA', '77240': 'BA', '77241': 'BA', '77242': 'BA', '77243': 'BA', '77244': 'BA', '77245': 'BA', '77246': 'BA', '77248': 'BA', '77249': 'BA', '77250': 'BA', '77253': 'BA', '77254': 'BA', '77265': 'BA', '78000': 'QM', '78101': 'QM', '78102': 'QM', '78103': 'QM', '78104': 'QM', '78105': 'QM', '78106': 'QM', '78107': 'QM', '78108': 'QM', '78109': 'QM', '78110': 'QM', '78111': 'QM', '78112': 'QM', '78113': 'QM', '78114': 'QM', '78115': 'QM', '78117': 'QM', '78202': 'QM', '78203': 'QM', '78204': 'QM', '78206': 'QM', '78207': 'QM', '78208': 'QM', '78211': 'QM', '78212': 'QM', '78214': 'QM', '78215': 'QM', '78216': 'QM', '78217': 'QM', '78220': 'QM', '78221': 'QM', '78222': 'QM', '78223': 'QM', '78224': 'QM', '78225': 'QM', '78226': 'QM', '78227': 'QM', '78230': 'QM', '78233': 'QM', '78234': 'QM', '78240': 'QM', '78242': 'QM', '78243': 'QM', '78244': 'QM', '78250': 'QM', '78252': 'QM', '78253': 'QM', '78255': 'QM', '78256': 'QM', '78400': 'QM', '78403': 'QM', '78404': 'QM', '78405': 'QM', '78406': 'QM', '78407': 'QM', '78408': 'QM', '78409': 'QM', '78410': 'QM', '78411': 'QM', '78418': 'QM', '78420': 'QM', '78422': 'QM', '78423': 'QM', '78424': 'QM', '78427': 'QM', '78428': 'QM', '78429': 'QM', '78430': 'QM', '78432': 'QM', '78433': 'QM', '78434': 'QM', '78435': 'QM', '78436': 'QM', '78437': 'QM', '78438': 'QM', '78439': 'QM', '78443': 'QM', '79000': 'QM', '79101': 'QM', '79102': 'QM', '79103': 'QM', '79104': 'QM', '79105': 'QM', '79202': 'QM', '79203': 'QM', '79204': 'QM', '79206': 'QM', '79208': 'QM', '79220': 'QM', '79223': 'QM', '79224': 'QM', '79226': 'QM', '79227': 'QM', '79228': 'QM', '79229': 'QM', '79236': 'QM', '79240': 'QM', '79243': 'QM', '79244': 'QM', '79246': 'QM', '79247': 'QM', '79249': 'QM', '79260': 'BA', '79262': 'BA', '79263': 'QM', '79264': 'BA', '79265': 'BA', '79266': 'BA', '79267': 'BA', '79268': 'BA', '79269': 'QM', '79280': 'BA', '79283': 'QM', '79284': 'BA', '79285': 'BA', '79287': 'QM', '79288': 'QM', '79289': 'QM', '79290': 'QM', '80101': 'QN', '80202': 'QN', '80203': 'QN', '80204': 'QN', '80205': 'QN', '80206': 'QN', '80208': 'QN', '80209': 'QN', '80211': 'QN', '80230': 'QN', '80240': 'QN', '80243': 'QN', '80244': 'QN', '80245': 'QN', '80246': 'QN', '80247': 'QN', '80249': 'QN', '80260': 'QN', '80270': 'QN', '80320': 'QN', '88000': 'QN', '88001': 'QN', '88005': 'QN', '88101': 'QN', '88103': 'BA', '88104': 'BA', '88105': 'QN', '88106': 'QN', '88107': 'QN', '88108': 'BA', '88109': 'QN', '88110': 'BA', '88113': 'BA', '88201': 'BA', '88202': 'QN', '88203': 'QN', '88204': 'BA', '88206': 'BA', '88207': 'BA', '88208': 'BA', '88213': 'BA', '88215': 'BA', '88220': 'QN', '88223': 'QN', '88224': 'QN', '88226': 'QN', '88240': 'QN', '88243': 'QN', '88245': 'QN', '88247': 'QN', '88260': 'QN', '88263': 'QN', '88265': 'QN', '88266': 'QN', '88267': 'QN', '88268': 'QN', '88280': 'QM', '88283': 'QM', '88285': 'QM', '88286': 'QM', '88288': 'QM', '88300': 'QN', '88301': 'QN', '88305': 'QN', '88306': 'QN', '88307': 'QN', '88320': 'QN', '88323': 'QN', '88324': 'QN', '88325': 'QN', '88326': 'QN', '88327': 'QN', '88340': 'QN', '88342': 'QN', '88343': 'QN', '88344': 'QN', '88345': 'QN', '88347': 'QN', '88348': 'QN', '88360': 'QN', '88363': 'QM', '88365': 'BA', '88366': 'BA', '88367': 'QN', '88368': 'QN', '88370': 'QN', '88375': 'QN', '88380': 'QM', '88390': 'QN', '88392': 'QN', '88394': 'QN', '88395': 'QN', '88400': 'BA', '88402': 'BA', '88403': 'BA', '88404': 'BA', '88405': 'BA', '88406': 'BA', '88407': 'BA', '88408': 'BA', '88409': 'BA', '88420': 'BA', '88422': 'BA', '88423': 'BA', '88440': 'QN', '88443': 'QN', '88444': 'QN', '88445': 'BA', '88446': 'BA', '89101': 'QM', '89103': 'QM', '89201': 'QM', '89202': 'QM', '89203': 'QM', '89204': 'QM', '89206': 'QM', '89208': 'QM', '89209': 'QM', '89230': 'QM', '89231': 'QM', '89233': 'QM', '89235': 'QM', '89240': 'QM', '89243': 'QM', '89245': 'QM', '89247': 'QM', '71200': 'BA', '72200': 'BA', '78003': 'QM', '75200': 'BA', '77200': 'BA', '88200': 'QN', '88003': 'QN', '70000': 'BA', '78200': 'QM', '76900': 'QN', '72900': 'QN', '80200': 'QN', '76200': 'QM', '74200': 'QM', '72001': 'BA', '78118': 'QM', '76000': 'QM', '88500': 'BA', '71168': 'BA', '71109': 'BA', '78120': 'QM', '88124': 'QN', '76110': 'QN', '71129': 'QM', '71381': 'BA', '74000': 'QM', '76100': 'BA', '89000': 'QM', '76306': 'QM', '79291': 'QM', '78119': 'QM', '76107': 'QM', '71128': 'QM'};
export default function SK_POST_CN22_PRIME (props){
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
                             <View style={{paddingTop:3, diaplay: "flex", flexDirection: "row", justifyContent: "space-between",}}>
                                 <Text>Designated operator SLOVAK POST</Text>
                             </View>
                         </View>
                         <View>
                             <Text style={{fontSize:13}}>CN22{' '}</Text>
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
                                     <View key={i} style={{minWidth:i%3 == 1? '35%' : '25%', display:'flex', flexDirection:'row', margin:'1px 0px'}}>
                                         <Image src={i == 5 ?imgList['check'] :   imgList['uncheck']} style={{height:5, marginRight:2}}/>
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



                 <View style={{width:'63%', fontSize:6}}>
                     <View style={{width:'100%', height:'100%'}}>
                         <View style={{
                             borderBottom:'1px solid black',
                             height:'15%',
                             display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                             <View style={{width:'45%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                                 <View style={{padding:5}}>
                                     <Text>From/Odosielateľ:</Text>
                                     <Text>PostPlus – meno odosielateľa, P.O.Box 0200, Bratislava 090</Text>
                                     <Text>800 90 Braislava</Text>
                                     <Text>SLOVAKIA</Text>
                                 </View>
                             </View>
                             <View style={{width:'55%', fontSize:7, padding:2}}>
                                 <View style={{width:'100%', height:'100%', display:'flex', flexDirection:'row', border:'2px solid black'}}>
                                     <View style={{width:'40%', borderRight:'2px solid black', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                         <Image style={{height:'95%'}} src={imgList['logo']} />
                                     </View>
                                     <View style={{width:'60%', textAlign:'center'}}>
                                         <View style={{
                                             display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center',
                                             height:'50%', borderBottom:'1px solid black'
                                         }}>
                                             <Text>800 90 Bratislava 090</Text>
                                         </View>
                                         <View style={{
                                             display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center',
                                             height:'50%'
                                         }}>
                                             <Text>530/2023</Text>
                                         </View>
                                     </View>
                                 </View>
                             </View>
                         </View>


                         <View style={{width:'100%', backgroundColor:'black', color:'white', fontSize:13, textAlign:'center', letterSpacing:1.5, paddingBottom:3}}>
                             <Text>PRIORITY</Text>
                         </View>

                         <View style={{
                             borderBottom:'1px solid black',
                             height:'20%',
                             display:'flex', flexDirection:'row',
                             fontSize:8, position:'relative'
                         }}>
                             <View style={{display:'flex', flexDirection:'row', height:'100%', width:'100%'}}>
                                 <View style={{
                                     width:'55%', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                                     <View>
                                         <Text style={{fontWeight:"bold", fontSize:12, padding:'0px 3px'}}>TO</Text>
                                     </View>

                                     <View style={{padding:2,
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
                                             <Text>{receiptData.packageInfo.nation_name}</Text>
                                         </View>
                                     </View>
                                 </View>

                                 <View style={{width:'45%',display:'flex', justifyContent:'space-between'}}>
                                     <View style={{width:'100%', paddingTop:5, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                         <Image style={{width:9, height:9, marginRight:10, marginTop:2}} src={imgList['phone']} />
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


                         <View style={{display:'flex', flexDirection:"column", justifyContent:"space-between",
                             borderBottom:'1px solid black',
                             height:'33%', fontSize:5}}>
                             <View style={{display:'flex', flexDirection:'row', lineHeight:1}}>
                                 <View style={{width:'100%', padding:3}}>
                                     <View style={{marginBottom:2, fontSize:8, lineHeight:1.2}}>
                                         <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:"center"}}>
                                             <View>
                                                 <Text>No: {receiptData.packageInfo.in_track_no} </Text>
                                                 <Text>Order No: {receiptData.packageInfo.reference_no} </Text>
                                             </View>
                                             {
                                                 receiptData.packageInfo.country_code == 'BA' &&
                                                 <View style={{paddingRight:2}}>
                                                     <Text style={{fontSize:20}}>{target[(receiptData.receiverInfo.zip).toString()] || 'ERR'}</Text>
                                                 </View>
                                             }
                                         </View>

                                     </View>
                                     {
                                         receiptData.productsInfo
                                             .slice(0, 4)
                                             .map((product) => {
                                                 var description = [product.name, product.sku, product.qty+'ea'].join(' / ')
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
                                 alignItems:'center', justifyContent:'center'
                             }}>
                                 <Image style={{height:20, width:30, marginRight:5}} src={imgList['scan']} />
                                 <Image style={{height:20, width:30}} src={imgList['no_signature']} />
                                 <View style={{marginLeft:15, textAlign:'center'}}>
                                     {
                                         receiptData.packageInfo.country_code == 'ME' &&
                                         <Text style={{fontSize:8, fontWeight:'bold'}}>
                                             POŠILJALAC PLATIO TROŠAK{'\n'}PODNOŠENJA NA{'\n'}CARINSKI PREGLED
                                         </Text>
                                     }
                                 </View>
                             </View>
                         </View>


                         <View style={{width:'100%', display:'flex', flexGrow:1, alignItems:'center', justifyContent:'space-between'}}>
                             <View style={{fontSize:6, padding:'5px 0px 0px 5px', width:'100%'}}>
                                 <Text>{receiptData.senderInfo.name}, {moment(receiptData.packageInfo.reg_date).format("YYYY-MM-DD")}</Text>
                             </View>
                             <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                 <Image style={{width:'90%'}} source={{uri:barcodeUrl}} />
                             </View>
                             <View style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', paddingBottom:5}}>
                                 <Text style={{fontSize:15}}>{receiptData.packageInfo.in_track_no}</Text>
                             </View>
                         </View>
                     </View>
                 </View>



             </View>
         </View>
     </Page>
 )
};
