"use client";
import {createContext,useContext,useEffect,useLayoutEffect,useState} from 'react';
import {messages,type Language,type MessageKey} from '../lib/messages';
import {Moon,Sun} from 'lucide-react';
import {LanguageMenu} from './language-menu';
import {HaloHover} from './halo-hover';
const Context=createContext({language:'en' as Language,t:(key:MessageKey):string=>messages.en[key]});
export function Preferences({children}:{children:React.ReactNode}){
 const [language,setLanguage]=useState<Language>('en');const [dark,setDark]=useState(false);const [ready,setReady]=useState(false);
 useLayoutEffect(()=>{try{const lang=localStorage.getItem('lumina-language');if(lang&&lang in messages)setLanguage(lang as Language);const saved=localStorage.getItem('lumina-theme');setDark(saved?saved==='dark':matchMedia('(prefers-color-scheme: dark)').matches)}catch{}setReady(true)},[]);
 useEffect(()=>{if(!ready)return;document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';document.documentElement.dataset.theme=dark?'dark':'light';try{localStorage.setItem('lumina-language',language);localStorage.setItem('lumina-theme',dark?'dark':'light')}catch{}},[language,dark,ready]);
 const t=(key:MessageKey):string=>messages[language][key]||messages.en[key];
 return <Context.Provider value={{language,t}}><HaloHover/><div className="preference-bar glass"><LanguageMenu value={language} onChange={setLanguage} label={t('language')}/><button type="button" className="theme-toggle" aria-label={t(dark?'light':'dark')} title={t(dark?'light':'dark')} aria-pressed={dark} onClick={()=>setDark(!dark)}><span className="theme-icon" key={dark?'sun':'moon'}>{dark?<Sun size={17}/>:<Moon size={17}/>}</span><span>{t(dark?'light':'dark')}</span></button></div>{children}</Context.Provider>
}
export function useClinic(){return useContext(Context)}
