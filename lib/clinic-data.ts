export const doctors=[{id:'sarah-mitchell',name:'sarah',role:'physician',image:'photo-1559839734-2b71ea197ec2',tag:'general',bio:'sarahBio',interests:'sarahInterests'},{id:'james-wilson',name:'james',role:'cardiologist',image:'photo-1622253692010-333f2da6031d',tag:'cardiology',bio:'jamesBio',interests:'jamesInterests'},{id:'emily-chen',name:'emily',role:'dermatologist',image:'photo-1594824476967-48c8b964273f',tag:'dermatology',bio:'emilyBio',interests:'emilyInterests'}] as const;
export const services=['general','cardiology','dermatology','mental','preventive','assessment'] as const;
export const times=['09:00','10:00','11:00','14:00','15:00','16:00'];
export type Appointment={id:string;name:string;email:string;doctor:string;service:string;date:string;time:string;createdAt:string};
