export const DOCTORS=['sarah-mitchell','james-wilson','emily-chen'];
export const SERVICES=['general','cardiology','dermatology','mental','preventive','assessment'];
export const TIMES=['09:00','10:00','11:00','14:00','15:00','16:00'];
const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store',...headers}});
export async function appointmentApi(request,repo){
 const url=new URL(request.url);const method=request.method;
 if(!['GET','POST','DELETE'].includes(method))return json({error:'Method not allowed'},405);
 if(method!=='GET') {const origin=request.headers.get('origin');if(origin&&origin!==url.origin)return json({error:'Origin not allowed'},403);}
 let owner=(request.headers.get('cookie')||'').match(/(?:^|;\s*)lumina_session=([a-f0-9]{64})(?:;|$)/)?.[1];
 const fresh=!owner;if(!owner)owner=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(owner));
 const ownerHash=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
 const cookie=fresh?{'Set-Cookie':`lumina_session=${owner}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${url.protocol==='https:'?'; Secure':''}`} : {};
 try {
 if(method==='GET')return json({appointments:await repo.list(ownerHash)},200,cookie);
 if(method==='DELETE') {const id=url.searchParams.get('id');if(!id||id.length>50)return json({error:'Invalid appointment'},400,cookie);const removed=await repo.remove(id,ownerHash);return json(removed?{ok:true}:{error:'Appointment not found'},removed?200:404,cookie);}
 if(Number(request.headers.get('content-length')||0)>8192)return json({error:'Request too large'},413,cookie);
 const raw=await request.text();if(raw.length>8192)return json({error:'Request too large'},413,cookie);
 let body;try{body=JSON.parse(raw)}catch{return json({error:'Invalid JSON'},400,cookie)}
 const {name,email,doctor,service,date,time}=body||{};
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Karachi'}).format(new Date());
 const clinicNow=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Karachi',hour:'2-digit',minute:'2-digit'});
 const weekday=typeof date==='string'?new Date(date).getUTCDay():NaN;
 const realDate=typeof date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&!isNaN(Date.parse(date))&&new Date(date).toISOString().slice(0,10)===date;
 if(typeof name!=='string'||name.trim().length<2||name.length>80||typeof email!=='string'||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!DOCTORS.includes(doctor)||!SERVICES.includes(service)||!realDate||date<today||date>new Date(Date.now()+366*86400000).toISOString().slice(0,10)||!TIMES.includes(time)||weekday===0||weekday===6||(date===today&&time<=clinicNow))return json({error:'Please check your name, email, doctor, service, date and time.'},422,cookie);
 if(await repo.count(ownerHash)>=20)return json({error:'Maximum 20 saved visits. Cancel a visit before booking another.'},429,cookie);
 const appointment={id:crypto.randomUUID(),name:name.trim(),email:email.trim(),doctor,service,date,time,createdAt:new Date().toISOString()};
 try{await repo.create({...appointment,owner:ownerHash})}catch(e){if(/UNIQUE|constraint|occupied/i.test(String(e)))return json({error:'This time is already booked. Please choose another slot.'},409,cookie);throw e}
 return json({appointment},201,cookie);
 }catch{ return json({error:'Appointment service is unavailable. Please try again.'},503,cookie);}
}
