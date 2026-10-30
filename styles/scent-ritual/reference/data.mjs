export const scents = [
  {id:'silkas',number:'01',name:'Dawn Silk',family:'Floral · soft',color:'rose',tint:[.97,.61,.43],top:'Pear · bergamot',heart:'Iris · white tea',base:'Musk · pale wood',description:'Light comes through the curtains. Cool pear meets soft iris and clean wood.',profile:[0,0,0]},
  {id:'samanos',number:'02',name:'Quiet Moss',family:'Green · fresh',color:'green',tint:[.57,.74,.32],top:'Green leaf · lemon',heart:'Fig · sage',base:'Moss · cedar',description:'A garden still cool after rain. The edge of a green leaf, fig and an earthy cedar.',profile:[1,1,1]},
  {id:'gintaras',number:'03',name:'Slow Amber',family:'Woody · rich',color:'amber',tint:[.91,.52,.13],top:'Cardamom · orange',heart:'Tea · labdanum',base:'Amber accord · sandalwood',description:'The day slows down. Warm cardamom, steam from tea and the long softness of sandalwood.',profile:[2,2,2]},
  {id:'oras',number:'04',name:'White Air',family:'Clean · clear',color:'ivory',tint:[.81,.78,.60],top:'Lemon · pink pepper',heart:'Neroli · green tea',base:'White musk · vetiver',description:'An open window and clean paper. Lemon peel, bitter-sweet neroli and light musk.',profile:[1,0,0]}
];
export const questions = [
  {title:'Where would you like to return?',label:'01 / PLACE',answers:['To a garden in bloom','To a forest after rain','To a warm room'],reason:['Flowers and soft fruit','Green leaves and wood','Spice and warmth']},
  {title:'What is your time of day?',label:'02 / MOMENT',answers:['A slow morning','A bright afternoon','A long evening'],reason:['A clear start','Green freshness','A warm, rich heart']},
  {title:'What trail should it leave?',label:'03 / CLOSENESS',answers:['Just for me','For someone close','A memorable one'],reason:['Light closeness','Calm balance','A stronger trail of wood']}
];
export function recommend(answers) {
  if(answers.length!==3||answers.some(a=>!Number.isInteger(a)||a<0||a>2))return null;
  return scents.map((s,i)=>({s,i,score:s.profile.reduce((sum,v,j)=>sum+Math.abs(v-answers[j])*[3,2,1][j],0)})).sort((a,b)=>a.score-b.score||a.i-b.i)[0].s;
}
