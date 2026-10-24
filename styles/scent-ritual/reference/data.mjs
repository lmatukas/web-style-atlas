export const scents = [
  {id:'silkas',number:'01',name:'Aušros šilkas',family:'Gėlių · švelnus',color:'rose',tint:[.97,.61,.43],top:'Kriaušė · bergamotė',heart:'Irisas · baltoji arbata',base:'Muskusas · šviesus medis',description:'Šviesa prasiskverbia pro užuolaidas. Vėsi kriaušė susitinka su minkštu irisu ir švariu medžiu.',profile:[0,0,0]},
  {id:'samanos',number:'02',name:'Tylos samanos',family:'Žalias · gaivus',color:'green',tint:[.57,.74,.32],top:'Žaliasis lapas · citrina',heart:'Figa · šalavijas',base:'Samanos · kedras',description:'Dar vėsus sodas po lietaus. Žalio lapo briauna, figos ramybė ir žemę primenantis kedras.',profile:[1,1,1]},
  {id:'gintaras',number:'03',name:'Lėtas gintaras',family:'Medienos · sodrus',color:'amber',tint:[.91,.52,.13],top:'Kardamonas · apelsinas',heart:'Arbata · labdanas',base:'Gintaro akordas · santalas',description:'Diena lėtėja. Šiltas kardamonas, arbatos garas ir ilgai išliekantis santalo minkštumas.',profile:[2,2,2]},
  {id:'oras',number:'04',name:'Baltas oras',family:'Švarus · skaidrus',color:'ivory',tint:[.81,.78,.60],top:'Citrina · rožinis pipiras',heart:'Nerolis · žalioji arbata',base:'Baltasis muskusas · vetiverija',description:'Atvertas langas ir švarus popierius. Citrinos žievelė, kartokas nerolis ir lengvas muskusas.',profile:[1,0,0]}
];
export const questions = [
  {title:'Kur norisi sugrįžti?',label:'01 / VIETA',answers:['Į žydintį sodą','Į mišką po lietaus','Į šiltą kambarį'],reason:['Gėlės ir švelnūs vaisiai','Žali lapai ir mediena','Prieskoniai ir šiluma']},
  {title:'Koks jūsų dienos laikas?',label:'02 / AKIMIRKA',answers:['Lėtas rytas','Šviesi popietė','Ilgas vakaras'],reason:['Skaidri pradžia','Žalias gaivumas','Šilta, sodri širdis']},
  {title:'Kokį pėdsaką palikti?',label:'03 / ARTUMAS',answers:['Tik sau','Arti esančiam','Įsimintiną'],reason:['Lengvas artumas','Rami pusiausvyra','Ryškesnis medienos pėdsakas']}
];
export function recommend(answers) {
  if(answers.length!==3||answers.some(a=>!Number.isInteger(a)||a<0||a>2))return null;
  return scents.map((s,i)=>({s,i,score:s.profile.reduce((sum,v,j)=>sum+Math.abs(v-answers[j])*[3,2,1][j],0)})).sort((a,b)=>a.score-b.score||a.i-b.i)[0].s;
}
