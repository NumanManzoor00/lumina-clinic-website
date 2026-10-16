import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
let repository;
export function getNodeRepository(){
 if(repository)return repository;
 const folder=resolve(process.env.DATA_DIR||'server/data');mkdirSync(folder,{recursive:true});
 const db=new DatabaseSync(resolve(folder,'clinic.sqlite'));
 db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS appointments(id TEXT PRIMARY KEY,owner TEXT NOT NULL,name TEXT NOT NULL,email TEXT NOT NULL,doctor TEXT NOT NULL,service TEXT NOT NULL,date TEXT NOT NULL,time TEXT NOT NULL,created_at TEXT NOT NULL); CREATE UNIQUE INDEX IF NOT EXISTS unique_doctor_slot ON appointments(doctor,date,time);');
 repository={list:owner=>db.prepare('SELECT id,name,email,doctor,service,date,time,created_at AS createdAt FROM appointments WHERE owner=? ORDER BY date,time').all(owner),count:owner=>Number(db.prepare('SELECT count(*) AS n FROM appointments WHERE owner=?').get(owner).n),remove:(id,owner)=>db.prepare('DELETE FROM appointments WHERE id=? AND owner=?').run(id,owner).changes>0,create:a=>db.prepare('INSERT INTO appointments VALUES(?,?,?,?,?,?,?,?,?)').run(a.id,a.owner,a.name,a.email,a.doctor,a.service,a.date,a.time,a.createdAt)};
 return repository;
}
