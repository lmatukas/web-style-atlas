// Original fictional menu and deterministic local demonstration inventory.
export const courses = [
 {name:'Rye welcome',time:'18:30',description:'Warm sourdough, whipped butter and a light malt crisp.',wine:'Dry sparkling wine',free:'Rye and apple drink',image:'table',chapter:'Forest beginning'},
 {name:'Autumn beetroot',time:'18:42',description:'Roasted beetroot, a blackcurrant sharpness and dill oil.',wine:'Fresh white wine',free:'Blackcurrant leaf tea',image:'table',chapter:'Forest beginning'},
 {name:'Mushroom silence',time:'18:55',description:'Forest mushrooms, brown butter and a few notes of fresh herbs.',wine:'Light oak-aged white',free:'Warm mushroom and thyme tea',image:'table',chapter:'Forest beginning'},
 {name:'Celeriac',time:'19:08',description:'Ember-roasted celeriac, apple and a crumb of toasted hazelnut.',wine:'Dry mineral white',free:'Apple and celery drink',image:'trout',chapter:'River light'},
 {name:'River trout',time:'19:22',description:'Crisp-skinned trout, celeriac cream and drops of dill oil.',wine:'Delicate dry white',free:'Cucumber and dill infusion',image:'trout',chapter:'River light'},
 {name:'Between two banks',time:'19:36',description:'A spoonful of apple sorbet with a gentle juniper freshness.',wine:'A water pause',free:'Still water',image:'trout',chapter:'River light'},
 {name:'Pumpkin ember',time:'19:48',description:'Slow-roasted pumpkin, seed cream and a touch of sour rowan.',wine:'Soft light red',free:'Rowan and pumpkin seed tea',image:'table',chapter:'Warm ember'},
 {name:'Evening cheese',time:'20:04',description:'Aged cheese, a warm pear relish and a thin rye toast.',wine:'Restrained red wine',free:'Black tea and pear infusion',image:'pear',chapter:'Orchard ending'},
 {name:'Pear by the embers',time:'20:22',description:'Pear poached in syrup, vanilla ice cream and a crisp almond tuile.',wine:'A small glass of dessert wine',free:'Warm pear and thyme tea',image:'pear',chapter:'Orchard ending'},
 {name:'The last spark',time:'20:42',description:'A bite of dark chocolate and a cup of buckwheat tea. There is still time to talk.',wine:'Coffee or buckwheat tea',free:'Buckwheat tea',image:'pear',chapter:'Orchard ending'}
];
export const imageDescriptions = {table:'Forest mushrooms on a dark ceramic plate, a wine glass and a candle on a walnut table.',trout:'Crisp-skinned trout with pale celeriac cream and dill on a dark ceramic plate.',pear:'Poached pear, a scoop of vanilla ice cream and a thin almond tuile in candlelight.'};
export const tables = [
 {id:'01',capacity:2,zone:'By the window',position:'window-a'},
 {id:'02',capacity:2,zone:'By the window',position:'window-b'},
 {id:'03',capacity:4,zone:'Centre of the room',position:'room-a'},
 {id:'04',capacity:4,zone:'Centre of the room',position:'room-b'},
 {id:'05',capacity:6,zone:'By the kitchen',position:'chef-a'},
 {id:'06',capacity:6,zone:'In a quiet corner',position:'chef-b'}
];
export const slots = ['18:00','18:30','19:00','19:30','20:00'];
export function dateISO(date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function shiftDate(iso,days){const d=new Date(iso+'T12:00:00');d.setDate(d.getDate()+days);return dateISO(d);}
export function bounds(now=new Date()){const today=dateISO(now);return {min:shiftDate(today,1),max:shiftDate(today,60)};}
export function dateState(iso,range=bounds()){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(iso))return 'invalid';
 const d=new Date(iso+'T12:00:00');if(Number.isNaN(+d)||dateISO(d)!==iso||iso<range.min||iso>range.max)return 'invalid';
 if(d.getDay()===1)return 'closed';
 const serial=Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000);
 return serial%13===0?'full':'open';
}
export function available(iso,slot,guests,range=bounds()){
 if(dateState(iso,range)!=='open'||!slots.includes(slot)||!Number.isInteger(guests)||guests<1||guests>6||slot==='20:00')return [];
 const serial=Math.floor(Date.parse(iso+'T12:00:00Z')/86400000),si=slots.indexOf(slot);
 return tables.filter((t,i)=>t.capacity>=guests&&(serial+si*3+i*2)%7!==0);
}
export function firstDate(range=bounds()){let iso=range.min;while(dateState(iso,range)!=='open'&&iso<=range.max)iso=shiftDate(iso,1);return iso;}
export function endTime(start){const [h,m]=start.split(':').map(Number),total=h*60+m+150;return `${String(Math.floor(total/60)%24).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;}
export function formatDate(iso){return new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'long',day:'numeric'}).format(new Date(iso+'T12:00:00'));}
