"use client";

import {useEffect,useRef,useState} from 'react';
import {Pause,Play} from 'lucide-react';
import {useClinic} from './preferences';

/** A lightweight canvas interpretation of the supplied HeroDithering demo. */
export function HeroDithering({colorFront='#8b5cf6',speed=.7,scale=.8}:{colorFront?:string;speed?:number;scale?:number}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const [paused,setPaused]=useState(false);
 const {t}=useClinic();
 useEffect(()=>{
  const el=canvas.current;if(!el)return;
  const context=el.getContext('2d',{alpha:true});if(!context)return;
  const ctx=context;const surface=el;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const bayer=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
  let width=1,height=1,frame=0,last=-Infinity,time=0,visible=true,dark=document.documentElement.dataset.theme==='dark';
  function draw(){
   ctx.clearRect(0,0,width,height);
   ctx.fillStyle=dark?'#bda1ff':colorFront;
   const cell=5;
   for(let y=0;y<height;y+=cell){
    const ny=y/height;
    for(let x=0;x<width;x+=cell){
     const nx=x/width;
     const bend=Math.sin(ny*5+time*.65)*.15;
     const radius=Math.hypot((nx-.46+bend)*1.25,(ny-.4)*.9);
     const wave=Math.sin(radius*20*scale-time*1.2)*.2+Math.sin(nx*9*scale+ny*6+time*.6)*.12;
     const envelope=Math.max(0,1-radius*.82);
     const density=Math.max(0,Math.min(.94,(.46+wave)*envelope));
     const threshold=(bayer[((y/cell)&3)*4+((x/cell)&3)]+.5)/16;
     if(density>threshold)ctx.fillRect(x,y,3,3);
    }
   }
  }
  function tick(now:number){frame=0;if(now-last>=50){time+=.025*speed;last=now;draw()}if(visible&&!document.hidden&&!paused&&!reduced.matches)frame=requestAnimationFrame(tick)}
  function resume(){if(frame)cancelAnimationFrame(frame);frame=0;draw();if(visible&&!document.hidden&&!paused&&!reduced.matches){last=-Infinity;frame=requestAnimationFrame(tick)}}
  function resize(){const rect=surface.getBoundingClientRect();width=Math.max(1,Math.round(rect.width));height=Math.max(1,Math.round(rect.height));surface.width=width;surface.height=height;draw()}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(surface);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;resume()});intersection.observe(surface);
  const theme=new MutationObserver(()=>{dark=document.documentElement.dataset.theme==='dark';draw()});theme.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  reduced.addEventListener('change',resume);document.addEventListener('visibilitychange',resume);resize();resume();
  return()=>{if(frame)cancelAnimationFrame(frame);resizeObserver.disconnect();intersection.disconnect();theme.disconnect();reduced.removeEventListener('change',resume);document.removeEventListener('visibilitychange',resume)};
 },[paused,colorFront,speed,scale]);
 return <><div className="hero-dithering" aria-hidden="true"><div className="dither-light dither-light-one"/><div className="dither-light dither-light-two"/><canvas ref={canvas}/><div className="dither-vignette"/></div><button type="button" className="dither-toggle" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={t(paused?'playVisual':'pauseVisual')} title={t(paused?'playVisual':'pauseVisual')}>{paused?<Play size={14}/>:<Pause size={14}/>}</button></>;
}
