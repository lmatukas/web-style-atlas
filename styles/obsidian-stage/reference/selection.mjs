const form=document.querySelector('#configuration');
const error=document.querySelector('#form-error');
const confirmation=document.querySelector('#confirmation');
const prices=Object.freeze({'01':249,'02':349,'03':449});
const memory=Object.freeze({'32':0,'64':40,'128':90});
const finishes=Object.freeze({graphite:{name:'Graphite',price:0},silver:{name:'Frost',price:20}});
const money=value=>`€${value}`;
function selection(){const d=new FormData(form);const model=d.get('model'),finish=d.get('finish'),storage=d.get('storage');if(!Object.hasOwn(prices,model)||!Object.hasOwn(memory,storage)||!Object.hasOwn(finishes,finish))return null;return{model,finish,storage,base:prices[model],extra:memory[storage]+finishes[finish].price,total:prices[model]+memory[storage]+finishes[finish].price};}
function render(){const s=selection();if(!s)return;const text={'model-name':s.model,'finish-name':finishes[s.finish].name,'storage-name':`${s.storage} GB`,'base-price':money(s.base),'extra-price':money(s.extra)};for(const[key,value]of Object.entries(text))document.querySelector(`[data-${key}]`).textContent=value;document.querySelector('#total').textContent=money(s.total);const img=document.querySelector('[data-selection-image]');img.style.filter=s.finish==='silver'?'brightness(1.7) saturate(.5)':'none';img.alt=`Veylqor ${s.model}, ${finishes[s.finish].name.toLowerCase()}, ${s.storage} GB, illustration of the selected device`;window.atlasRuntime?.setSelection(s);confirmation.textContent='';error.textContent='';form.elements.ack.removeAttribute('aria-invalid');}
form.addEventListener('change',render);
form.addEventListener('submit',e=>{e.preventDefault();const s=selection();if(!s){error.textContent='Choose a model, a finish and storage.';return;}if(!form.elements.ack.checked){error.textContent='Tick the box to confirm you understand this is a demonstration.';form.elements.ack.setAttribute('aria-invalid','true');form.elements.ack.focus();return;}error.textContent='';confirmation.textContent=`Summary created: Veylqor ${s.model} · ${finishes[s.finish].name} · ${s.storage} GB. Total ${money(s.total)}. No order was placed and no payment was made.`;confirmation.focus();});
form.addEventListener('reset',e=>{e.preventDefault();for(const [name,value] of [['model','01'],['finish','graphite'],['storage','32']])form.querySelector(`input[name=${name}][value="${value}"]`).checked=true;form.elements.ack.checked=false;render();});
render();
