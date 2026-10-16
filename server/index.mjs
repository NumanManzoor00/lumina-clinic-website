import http from 'node:http';
import {appointmentApi} from './appointment-api.mjs';
import {getNodeRepository} from './repository.mjs';
const port=Number(process.env.API_PORT||4000);
const repo=getNodeRepository();
const server=http.createServer(async(req,res)=>{try{const url=`http://${req.headers.host}${req.url}`;if(new URL(url).pathname==='/api/health'){res.writeHead(200,{'Content-Type':'application/json'});res.end('{"ok":true,"runtime":"node","storage":"sqlite"}');return}if(new URL(url).pathname!=='/api/appointments'){res.writeHead(404);res.end();return}let body='';for await(const chunk of req){body+=chunk;if(body.length>8192){res.writeHead(413);res.end();return}}const request=new Request(url,{method:req.method,headers:req.headers,body:['GET','HEAD'].includes(req.method)?undefined:body});const response=await appointmentApi(request,repo);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text())}catch{res.writeHead(500,{'Content-Type':'application/json'});res.end('{"error":"Internal server error"}')}});
server.listen(port,'127.0.0.1',()=>console.log(`Clinic Node.js API running on http://127.0.0.1:${port}`));
