export const DOCTORS:string[]; export const SERVICES:string[]; export const TIMES:string[];
export function appointmentApi(request:Request,repo:{list:(owner:string)=>Promise<unknown[]>|unknown[];remove:(id:string,owner:string)=>Promise<boolean>|boolean;count:(owner:string)=>Promise<number>|number;create:(record:Record<string,string>)=>unknown}):Promise<Response>;
