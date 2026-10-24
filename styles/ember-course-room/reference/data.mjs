// Original fictional menu and deterministic local demonstration inventory.
export const courses = [
 {name:'Rugio pasveikinimas',time:'18:30',description:'Šilta raugo duona, plaktas sviestas ir lengvas salyklo traškesys.',wine:'Sausas putojantis vynas',free:'Rugio ir obuolių gėrimas',image:'table',chapter:'Miško pradžia'},
 {name:'Rudeninis burokėlis',time:'18:42',description:'Keptas burokėlis, juodųjų serbentų rūgštelė ir krapų aliejus.',wine:'Gaivus baltasis vynas',free:'Juodųjų serbentų lapų arbata',image:'table',chapter:'Miško pradžia'},
 {name:'Grybų tyla',time:'18:55',description:'Miško grybai, rusvintas sviestas ir kelios šviežių žolelių natos.',wine:'Lengvas ąžuole brandintas baltasis',free:'Šilta grybų ir čiobrelių arbata',image:'table',chapter:'Miško pradžia'},
 {name:'Saliero šaknis',time:'19:08',description:'Žarijose keptas salieras, obuolys ir skrudinto lazdyno riešuto trupinys.',wine:'Sausas mineralus baltasis',free:'Obuolių ir saliero gėrimas',image:'trout',chapter:'Upės šviesa'},
 {name:'Upės upėtakis',time:'19:22',description:'Upėtakis traškia odele, saliero kremas ir krapų aliejaus lašai.',wine:'Subtilus sausas baltasis',free:'Agurkų ir krapų užpilas',image:'trout',chapter:'Upės šviesa'},
 {name:'Tarp dviejų krantų',time:'19:36',description:'Šaukštelis obuolių šerbeto su švelnia kadagio gaiva.',wine:'Vandens pertrauka',free:'Negazuotas vanduo',image:'trout',chapter:'Upės šviesa'},
 {name:'Moliūgo žarija',time:'19:48',description:'Lėtai keptas moliūgas, sėklų kremas ir rūgštaus šermukšnio akcentas.',wine:'Švelnus lengvas raudonasis',free:'Šermukšnių ir moliūgų sėklų arbata',image:'table',chapter:'Šilta žarija'},
 {name:'Vakaro sūris',time:'20:04',description:'Brandintas sūris, šiltas kriaušių pagardas ir plona ruginė skrebutė.',wine:'Santūrus raudonasis vynas',free:'Juodosios arbatos ir kriaušių užpilas',image:'pear',chapter:'Sodo pabaiga'},
 {name:'Kriaušė prie žarijų',time:'20:22',description:'Sirupe troškinta kriaušė, vaniliniai ledai ir trapus migdolų lakštas.',wine:'Nedidelė taurė desertinio vyno',free:'Šilta kriaušių ir čiobrelių arbata',image:'pear',chapter:'Sodo pabaiga'},
 {name:'Paskutinė kibirkštis',time:'20:42',description:'Juodojo šokolado kąsnis ir puodelis grikių arbatos. Pokalbiui dar lieka laiko.',wine:'Kava arba grikių arbata',free:'Grikių arbata',image:'pear',chapter:'Sodo pabaiga'}
];
export const imageDescriptions = {table:'Miško grybai tamsioje keraminėje lėkštėje, vyno taurė ir žvakė ant riešutmedžio stalo.',trout:'Upėtakis su traškia odele, šviesiu saliero kremu ir krapais tamsioje keraminėje lėkštėje.',pear:'Troškinta kriaušė, vanilinių ledų kaušelis ir plonas migdolų lakštas žvakių šviesoje.'};
export const tables = [
 {id:'01',capacity:2,zone:'Prie lango',position:'window-a'},
 {id:'02',capacity:2,zone:'Prie lango',position:'window-b'},
 {id:'03',capacity:4,zone:'Salės viduryje',position:'room-a'},
 {id:'04',capacity:4,zone:'Salės viduryje',position:'room-b'},
 {id:'05',capacity:6,zone:'Prie virtuvės',position:'chef-a'},
 {id:'06',capacity:6,zone:'Ramiame kampe',position:'chef-b'}
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
export function formatDate(iso){return new Intl.DateTimeFormat('lt-LT',{year:'numeric',month:'long',day:'numeric'}).format(new Date(iso+'T12:00:00'));}
