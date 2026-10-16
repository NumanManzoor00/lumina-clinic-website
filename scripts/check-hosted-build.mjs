import {readdir,readFile} from 'node:fs/promises';
import {join} from 'node:path';
async function files(dir){const entries=await readdir(dir,{withFileTypes:true});return(await Promise.all(entries.map(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]))).flat()}
const source=await Promise.all((await files('dist/server')).filter(p=>p.endsWith('.js')).map(async p=>({path:p,code:await readFile(p,'utf8')})));
const api=source.filter(f=>f.code.includes('FROM appointments'));
if(!api.length)throw Error('Appointment repository missing from hosted bundle');
for(const f of api){if(f.code.includes('DatabaseSync')||f.code.includes('node:sqlite'))throw Error('Node-only SQLite adapter leaked into hosted build');if(!f.code.includes('Database unavailable'))throw Error('D1 repository missing from appointment bundle')}
console.log('Hosted appointment API verified: D1 adapter, no Node SQLite.');
