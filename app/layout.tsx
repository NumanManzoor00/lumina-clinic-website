import type { Metadata } from "next";
import "./globals.css";
import {Preferences} from "../components/preferences";
export const metadata: Metadata = {title:"Lumina Clinic | A little care goes a long way",description:"Explore care, meet our illustrative team, and try a simple appointment booking experience."};
const preferenceBoot = `(function(){try{var l=localStorage.getItem('lumina-language');if(!['en','zh','es','ar'].includes(l))l='en';var t=localStorage.getItem('lumina-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';document.documentElement.dataset.theme=d?'dark':'light';}catch(e){}})();`;
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:preferenceBoot}}/><link rel="icon" type="image/svg+xml" href="/favicon.svg"/></head><body><Preferences>{children}</Preferences></body></html>}
