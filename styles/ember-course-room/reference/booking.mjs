import {tables,slots,bounds,dateState,available,firstDate,endTime,formatDate} from './data.mjs';
export function initializeBooking(root){
 const form=root.querySelector('form'),fields=form.querySelector('[data-booking-fields]'),date=form.elements.date,guests=form.elements.guests,note=form.elements.allergies,pairing=form.elements.pairing,ack=form.elements.demo;
 const times=form.querySelector('[data-times]'),room=form.querySelector('[data-room]'),status=form.querySelector('[data-availability]'),error=form.querySelector('[data-form-error]'),summary=root.querySelector('[data-confirmation]'),details=summary.querySelector('dl');
 const state={slot:'',table:''};let range=bounds();
 const announce=message=>status.textContent=message;
 function clearErrors(){error.textContent='';for(const el of form.querySelectorAll('[aria-invalid]'))el.removeAttribute('aria-invalid');for(const el of form.querySelectorAll('[data-field-error]'))el.textContent='';}
 function showError(key,message,control){form.querySelector(`[data-field-error="${key}"]`).textContent=message;control?.setAttribute('aria-invalid','true');return control;}
 function renderTimes(){
  const old=state.slot;times.replaceChildren();
  for(const time of slots){const count=available(date.value,time,+guests.value,range).length,label=document.createElement('label');label.className='time-option';const input=document.createElement('input');input.type='radio';input.name='time';input.value=time;input.disabled=!count;input.checked=old===time;input.setAttribute('aria-describedby','time-error');
   const text=document.createElement('span'),small=document.createElement('small');text.textContent=time;small.textContent=count?`${count} ${count===1?'stalas':'stalai'}`:'Pilna';label.append(input,text,small);times.append(label);
  }
 }
 function renderRoom(){
  const free=available(date.value,state.slot,+guests.value,range),ids=new Set(free.map(t=>t.id));
  for(const table of tables){const input=room.querySelector(`[value="${table.id}"]`),label=input.closest('label'),small=label.querySelector('[data-table-state]');const reason=!state.slot?'Pirma laikas':table.capacity<+guests.value?'Per mažas':ids.has(table.id)?'Laisvas':'Užimtas';input.disabled=reason!=='Laisvas';input.checked=state.table===table.id;label.dataset.state=input.checked?'selected':reason==='Laisvas'?'available':'unavailable';small.textContent=input.checked?'Pasirinktas':reason;input.setAttribute('aria-label',`Stalas ${table.id}, ${table.zone}, iki ${table.capacity} svečių. ${small.textContent}.`);}
 }
 function renderAvailability(resetMessage=''){
  const kind=dateState(date.value,range),count=slots.filter(s=>available(date.value,s,+guests.value,range).length).length;
  announce(kind==='invalid'?'Pasirinkite datą nuo rytojaus iki 60 dienų į priekį.':kind==='closed'?'Pirmadieniais menė ilsisi. Pasirinkite kitą datą.':kind==='full'?'Šis demonstracinis vakaras užpildytas. Pasirinkite kitą datą.':!count?'Šiam svečių skaičiui vietų nėra. Pasirinkite kitą datą.':resetMessage||`${formatDate(date.value)} · ${guests.value} sveč. · ${count} laisvi laikai. Pasirinkite laiką, tada stalą.`);
 }
 function refresh(){state.slot='';state.table='';clearErrors();renderTimes();renderRoom();renderAvailability('Pasirinkimai atnaujinti. Pasirinkite laiką ir stalą iš naujo.');}
 date.addEventListener('change',refresh);guests.addEventListener('change',refresh);
 times.addEventListener('change',event=>{if(event.target.name!=='time')return;state.slot=event.target.value;state.table='';clearErrors();renderRoom();announce(`${state.slot}–${endTime(state.slot)} · ${available(date.value,state.slot,+guests.value,range).length} tinkami stalai. Pasirinkite vietą plane.`);});
 room.addEventListener('change',event=>{if(event.target.name!=='table')return;state.table=event.target.value;clearErrors();renderRoom();const t=tables.find(t=>t.id===state.table);announce(`Pasirinktas stalas ${t.id} · ${t.zone} · iki ${t.capacity} svečių.`);});
 form.addEventListener('submit',event=>{
  event.preventDefault();clearErrors();range=bounds();date.min=range.min;date.max=range.max;
  let first=null;const problem=(key,message,el)=>{const target=showError(key,message,el);first??=target;};
  if(dateState(date.value,range)!=='open')problem('date','Pasirinkite atvirą vakarą nuo rytojaus iki 60 dienų į priekį.',date);
  if(!Number.isInteger(+guests.value)||+guests.value<1||+guests.value>6)problem('guests','Galima rinktis nuo 1 iki 6 svečių.',guests);
  const free=available(date.value,state.slot,+guests.value,range);
  if(!state.slot||!free.length)problem('time','Pasirinkite laisvą laiką.',times.querySelector('input:not(:disabled)')||form.querySelector('[data-time-heading]'));
  if(!state.table||!free.some(t=>t.id===state.table))problem('table','Pasirinkite tinkamo dydžio laisvą stalą.',room.querySelector('input:not(:disabled)')||form.querySelector('[data-room-heading]'));
  if(note.value.length>300)problem('allergies','Pastaba gali būti iki 300 simbolių.',note);
  if(!ack.checked)problem('demo','Pažymėkite, kad suprantate demonstracijos ribą.',ack);
  if(first){error.textContent='Patikrinkite pažymėtus pasirinkimus. Santrauka dar nesukurta.';first.focus();return;}
  const table=tables.find(t=>t.id===state.table),rows=[['Vakaras',formatDate(date.value)],['Laikas',`${state.slot}–${endTime(state.slot)} · apie 2,5 val.`],['Svečiai',guests.value],['Vieta',`Stalas ${table.id} · ${table.zone} · iki ${table.capacity} svečių`],['Meniu','10 patiekalų · Ruduo / žiema'],['Derinimas',pairing.options[pairing.selectedIndex].text],['Alergijų pastaba',note.value.trim()||'Pastabos nepateikta. Alergijų suderinimas nepatvirtintas.']];
  details.replaceChildren();for(const [key,value] of rows){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;details.append(dt,dd);}
  form.hidden=true;summary.hidden=false;summary.focus();
 });
 function reset(){range=bounds();form.reset();date.min=range.min;date.max=range.max;date.value=firstDate(range);state.slot='';state.table='';summary.hidden=true;form.hidden=false;details.replaceChildren();clearErrors();renderTimes();renderRoom();renderAvailability();}
 root.querySelector('[data-edit]').addEventListener('click',()=>{summary.hidden=true;form.hidden=false;date.focus();});
 root.querySelector('[data-clear]').addEventListener('click',()=>{reset();date.focus();announce('Santrauka ir pasirinkimai išvalyti. Pasirinkite naują vakarą.');});
 form.querySelector('[data-reset]').addEventListener('click',()=>{reset();date.focus();announce('Pasirinkimai išvalyti.');});
 reset();fields.disabled=false;form.querySelector('[type="submit"]').disabled=false;root.dataset.ready='true';
}
