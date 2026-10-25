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
  for(const table of tables){const input=room.querySelector(`[value="${table.id}"]`),label=input.closest('label'),small=label.querySelector('[data-table-state]');const reason=!state.slot?'Time first':table.capacity<+guests.value?'Too small':ids.has(table.id)?'Laisvas':'Taken';input.disabled=reason!=='Laisvas';input.checked=state.table===table.id;label.dataset.state=input.checked?'selected':reason==='Laisvas'?'available':'unavailable';small.textContent=input.checked?'Pasirinktas':reason;input.setAttribute('aria-label',`Table ${table.id}, ${table.zone}, up to ${table.capacity} guests. ${small.textContent}.`);}
 }
 function renderAvailability(resetMessage=''){
  const kind=dateState(date.value,range),count=slots.filter(s=>available(date.value,s,+guests.value,range).length).length;
  announce(kind==='invalid'?'Choose a date from tomorrow up to 60 days ahead.':kind==='closed'?'The room rests on Mondays. Choose another date.':kind==='full'?'This demonstration evening is full. Choose another date.':!count?'No places for this number of guests. Choose another date.':resetMessage||`${formatDate(date.value)} · ${guests.value} ${+guests.value===1?'guest':'guests'} · ${count} free ${count===1?'time':'times'}. Choose a time, then a table.`);
 }
 function refresh(){state.slot='';state.table='';clearErrors();renderTimes();renderRoom();renderAvailability('Choices updated. Choose a time and table again.');}
 date.addEventListener('change',refresh);guests.addEventListener('change',refresh);
 times.addEventListener('change',event=>{if(event.target.name!=='time')return;state.slot=event.target.value;state.table='';clearErrors();renderRoom();announce(`${state.slot}–${endTime(state.slot)} · ${available(date.value,state.slot,+guests.value,range).length} suitable tables. Choose a place on the plan.`);});
 room.addEventListener('change',event=>{if(event.target.name!=='table')return;state.table=event.target.value;clearErrors();renderRoom();const t=tables.find(t=>t.id===state.table);announce(`Table ${t.id} chosen · ${t.zone} · up to ${t.capacity} guests.`);});
 form.addEventListener('submit',event=>{
  event.preventDefault();clearErrors();range=bounds();date.min=range.min;date.max=range.max;
  let first=null;const problem=(key,message,el)=>{const target=showError(key,message,el);first??=target;};
  if(dateState(date.value,range)!=='open')problem('date','Choose an open evening from tomorrow up to 60 days ahead.',date);
  if(!Number.isInteger(+guests.value)||+guests.value<1||+guests.value>6)problem('guests','You can choose 1 to 6 guests.',guests);
  const free=available(date.value,state.slot,+guests.value,range);
  if(!state.slot||!free.length)problem('time','Choose a free time.',times.querySelector('input:not(:disabled)')||form.querySelector('[data-time-heading]'));
  if(!state.table||!free.some(t=>t.id===state.table))problem('table','Choose a free table of the right size.',room.querySelector('input:not(:disabled)')||form.querySelector('[data-room-heading]'));
  if(note.value.length>300)problem('allergies','The note can be up to 300 characters.',note);
  if(!ack.checked)problem('demo','Tick the box to confirm you understand the demonstration limit.',ack);
  if(first){error.textContent='Check the marked choices. No summary has been created yet.';first.focus();return;}
  const table=tables.find(t=>t.id===state.table),rows=[['Evening',formatDate(date.value)],['Time',`${state.slot}–${endTime(state.slot)} · about 2.5 h`],['Guests',guests.value],['Place',`Table ${table.id} · ${table.zone} · up to ${table.capacity} guests`],['Menu','10 courses · Autumn / winter'],['Pairing',pairing.options[pairing.selectedIndex].text],['Allergy note',note.value.trim()||'No note given. Allergy arrangements are not confirmed.']];
  details.replaceChildren();for(const [key,value] of rows){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;details.append(dt,dd);}
  form.hidden=true;summary.hidden=false;summary.focus();
 });
 function reset(){range=bounds();form.reset();date.min=range.min;date.max=range.max;date.value=firstDate(range);state.slot='';state.table='';summary.hidden=true;form.hidden=false;details.replaceChildren();clearErrors();renderTimes();renderRoom();renderAvailability();}
 root.querySelector('[data-edit]').addEventListener('click',()=>{summary.hidden=true;form.hidden=false;date.focus();});
 root.querySelector('[data-clear]').addEventListener('click',()=>{reset();date.focus();announce('Summary and choices cleared. Choose a new evening.');});
 form.querySelector('[data-reset]').addEventListener('click',()=>{reset();date.focus();announce('Choices cleared.');});
 reset();fields.disabled=false;form.querySelector('[type="submit"]').disabled=false;root.dataset.ready='true';
}
