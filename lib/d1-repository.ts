import {env} from 'cloudflare:workers';
export function getRepository(){
 const db=env.DB;if(!db)throw Error('Database unavailable');
 return {
 list:async(owner:string)=>(await db.prepare('SELECT id,name,email,doctor,service,date,time,created_at AS createdAt FROM appointments WHERE owner=? ORDER BY date,time').bind(owner).all()).results,
 count:async(owner:string)=>Number((await db.prepare('SELECT count(*) AS n FROM appointments WHERE owner=?').bind(owner).first<{n:number}>())?.n||0),
 remove:async(id:string,owner:string)=>(await db.prepare('DELETE FROM appointments WHERE id=? AND owner=?').bind(id,owner).run()).meta.changes>0,
 create:async(a:Record<string,string>)=>db.prepare('INSERT INTO appointments(id,owner,name,email,doctor,service,date,time,created_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(a.id,a.owner,a.name,a.email,a.doctor,a.service,a.date,a.time,a.createdAt).run()
 };
}
