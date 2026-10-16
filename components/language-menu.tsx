"use client";
import {useEffect,useRef,useState} from 'react';
import {Languages,ChevronDown,Check} from 'lucide-react';
import type {Language} from '../lib/messages';
const options:{value:Language;label:string}[]=[{value:'en',label:'English'},{value:'zh',label:'中文'},{value:'es',label:'Español'},{value:'ar',label:'العربية'}];
export function LanguageMenu({value,onChange,label}:{value:Language;onChange:(value:Language)=>void;label:string}){
 const [open,setOpen]=useState(false);
 const root=useRef<HTMLDivElement>(null);const trigger=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(!open)return;function outside(event:PointerEvent){if(event.target instanceof Node&&!root.current?.contains(event.target))setOpen(false)}function escape(event:KeyboardEvent){if(event.key==='Escape'){setOpen(false);trigger.current?.focus()}}
 document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
 return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)}},[open]);
 function focusOption(index:number){requestAnimationFrame(()=>root.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')[index]?.focus())}
 function choose(language:Language){onChange(language);setOpen(false);trigger.current?.focus()}
 return <div ref={root} className="language-control" onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setOpen(false)}}>
  <button ref={trigger} type="button" className="language-trigger" aria-label={label} aria-expanded={open} aria-haspopup="listbox" aria-controls="language-options" onClick={()=>setOpen(!open)} onKeyDown={event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();setOpen(true);focusOption(options.findIndex(o=>o.value===value))}}}>
   <Languages size={16}/><span>{options.find(o=>o.value===value)?.label}</span><ChevronDown className={open?'disclosure-arrow rotated':'disclosure-arrow'} size={14}/>
  </button>
  <div className={open?'language-panel panel-visible':'language-panel'} inert={!open} aria-hidden={!open}>
   <div className="language-panel-clip"><div className="language-options glass" id="language-options" role="listbox" aria-label={label} onKeyDown={event=>{const nodes=Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="option"]'));const index=nodes.indexOf(document.activeElement as HTMLButtonElement);let next=index;if(event.key==='ArrowDown')next=(index+1)%options.length;else if(event.key==='ArrowUp')next=(index-1+options.length)%options.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=options.length-1;else return;event.preventDefault();nodes[next]?.focus()}}>
    {options.map(option=><button type="button" role="option" aria-selected={value===option.value} tabIndex={open?0:-1} className={value===option.value?'language-option option-selected':'language-option'} key={option.value} lang={option.value} onClick={()=>choose(option.value)}><span>{option.label}</span>{value===option.value?<Check size={15}/>:<span className="option-check-space"/>}</button>)}
   </div></div>
  </div>
 </div>
}
