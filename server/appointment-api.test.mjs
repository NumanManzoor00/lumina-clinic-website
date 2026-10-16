import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
const folder=mkdtempSync(join(tmpdir(),'lumina-test-'));
const port=4327;const origin=`http://127.0.0.1:${port}`;let child;
async function start(){child=spawn(process.execPath,['server/index.mjs'],{env:{...process.env,DATA_DIR:folder,API_PORT:String(port)},stdio:['ignore','pipe','pipe']});await Promise.race([once(child.stdout,'data'),once(child,'exit').then(()=>{throw Error('Server failed')})]);}
async function stop(){if(child&&!child.killed){child.kill();await once(child,'exit')}}
test('Node HTTP API validates, persists, isolates and cancels appointments',{timeout:15000},async()=>{try{await start();
 let r=await fetch(origin+'/api/health');assert.equal(r.status,200);assert.equal((await r.json()).runtime,'node');
 r=await fetch(origin+'/api/appointments');assert.equal(r.status,200);const cookie=r.headers.get('set-cookie').split(';')[0];assert.match(r.headers.get('set-cookie'),/HttpOnly/);assert.deepEqual((await r.json()).appointments,[]);
 const future=new Date(Date.now()+2*86400000);while([0,6].includes(future.getUTCDay()))future.setUTCDate(future.getUTCDate()+1);const date=future.toISOString().slice(0,10);const record={name:'Demo Patient',email:'demo@example.com',doctor:'sarah-mitchell',service:'general',date,time:'10:00'};
 const post=(value,headers={})=>fetch(origin+'/api/appointments',{method:'POST',headers:{'content-type':'application/json',cookie,...headers},body:JSON.stringify(value)});
 r=await post({...record,email:'wrong'});assert.equal(r.status,422);
 r=await post({...record,date:'2026-02-30'});assert.equal(r.status,422);
 r=await post(record,{origin:'https://another-origin.example'});assert.equal(r.status,403);
 r=await post(record);assert.equal(r.status,201);const saved=(await r.json()).appointment;
 r=await post(record);assert.equal(r.status,409);
 r=await fetch(origin+'/api/appointments');assert.deepEqual((await r.json()).appointments,[]);
 r=await fetch(origin+'/api/appointments?id='+saved.id,{method:'DELETE'});assert.equal(r.status,404);
 await stop();await start();
 r=await fetch(origin+'/api/appointments',{headers:{cookie}});const list=(await r.json()).appointments;assert.equal(list.length,1);assert.equal(list[0].id,saved.id);assert.equal(list[0].owner,undefined);
 r=await fetch(origin+'/api/appointments?id='+saved.id,{method:'DELETE',headers:{cookie}});assert.equal(r.status,200);
 r=await fetch(origin+'/api/appointments',{headers:{cookie}});assert.deepEqual((await r.json()).appointments,[]);
 }finally{await stop();rmSync(folder,{recursive:true,force:true})}});
