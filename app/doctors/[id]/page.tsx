import Clinic from '../../../components/clinic';
import {doctors} from '../../../lib/clinic-data';
import {notFound} from 'next/navigation';
export default async function DoctorPage({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!doctors.some(d=>d.id===id))notFound();return <Clinic page="doctor" doctorId={id}/>}
