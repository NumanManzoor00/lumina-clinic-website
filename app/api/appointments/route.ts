import {getRepository} from '@/lib/appointment-repository';
import {appointmentApi} from '../../../server/appointment-api.mjs';
export const dynamic='force-dynamic';
async function handle(request:Request){try{return await appointmentApi(request,getRepository())}catch{return Response.json({error:'Appointment service is unavailable.'},{status:503})}}
export const GET=handle;export const POST=handle;export const DELETE=handle;
