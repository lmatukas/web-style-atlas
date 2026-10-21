import {json,fail} from './lib/files.mjs';
export function capabilityModel(brief){
 const renderers={webgl:['webgl'],'svg-or-webgl':['svg','webgl'],svg:['svg'],'html-svg':['html','svg'],'web-audio-2d':['canvas2d','svg','html']}[brief.enhancement];
 if(!renderers||typeof brief.audio!=='boolean')throw Error('Brief requires an explicit renderer and audio capability model');
 return{renderers,audio:brief.audio};
}
export function validateRuntime(root,style,brief,check){
 const path=`styles/${style}/runtime.json`,runtime=check('runtime',json(root,path),path),required=capabilityModel(brief);
 if(!required.renderers.includes(runtime.renderer))fail(path,'/renderer','brief requires '+required.renderers.join(' or '));
 if(runtime.audio!==required.audio)fail(path,'/audio','must match the public brief audio capability');
 return runtime;
}
