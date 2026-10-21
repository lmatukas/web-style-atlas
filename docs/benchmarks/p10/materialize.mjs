import {cpSync,existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const here=dirname(fileURLToPath(import.meta.url));
const [id,destination]=process.argv.slice(2);
if(!/^[a-z][a-z0-9-]+$/.test(id||'') || !destination) throw new Error('use: node materialize.mjs <case-id> <new-target-directory>');
const source=resolve(here,'sites',id), target=resolve(destination);
if(!existsSync(source) || existsSync(target)) throw new Error('known case and a new destination required');
mkdirSync(target,{recursive:true});
cpSync(source,target,{recursive:true});
const assetsFile=resolve(source,'atlas-assets.json');
if(existsSync(assetsFile)) for(const asset of JSON.parse(readFileSync(assetsFile,'utf8'))) {
 if(!/^styles\/[a-z0-9-]+\/assets\/[a-zA-Z0-9._-]+$/.test(asset.source) || !/^assets\/[a-zA-Z0-9._-]+$/.test(asset.target)) throw new Error('unsafe asset path');
 const bytes=readFileSync(resolve(here,'../../..',asset.source));
 if(createHash('sha256').update(bytes).digest('hex')!==asset.sha256) throw new Error('asset source changed; inspect provenance');
 mkdirSync(dirname(resolve(target,asset.target)),{recursive:true});
 writeFileSync(resolve(target,asset.target),bytes);
}
console.log(target);
