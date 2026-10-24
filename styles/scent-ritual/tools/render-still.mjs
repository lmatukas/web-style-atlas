import {createServer} from 'node:http';
import {readFile,writeFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {launchCanonical} from '../../../scripts/previews.mjs';
const root=resolve('styles/scent-ritual'),server=createServer(async(req,res)=>{
 try{const path=new URL(req.url,'http://local').pathname;
 if(path==='/'){res.setHeader('Content-Type','text/html');res.end(`<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="/reference/tokens.css"><body style="margin:0;background:transparent"><canvas width="900" height="1100"></canvas><script type="module">import{createBottle}from'/reference/bottle.mjs';await document.fonts.load('300 40px "Crimson Pro"');await document.fonts.load('24px Jost');const canvas=document.querySelector('canvas'),gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false,preserveDrawingBuffer:true});const renderer=createBottle(gl);renderer.label('Kvapų studija','01');renderer.draw({width:900,height:1100,tilt:0,phase:1});window.ready=true;</script>`);return;}
 const p=resolve(root,'.'+path);if(!p.startsWith(root+'/'))throw Error('path');res.setHeader('Content-Type',({'.css':'text/css','.mjs':'text/javascript','.woff2':'font/woff2'})[extname(p)]||'application/octet-stream');res.end(await readFile(p));}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await launchCanonical();
try{const page=await browser.newPage({viewport:{width:900,height:1100}});page.on('pageerror',e=>console.error(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.ready);const data=await page.locator('canvas').evaluate(c=>c.toDataURL('image/png').split(',')[1]);await writeFile(resolve(root,'assets/bottle.png'),Buffer.from(data,'base64'));console.log('Original bottle rendered.');}finally{await browser.close();server.close();}
