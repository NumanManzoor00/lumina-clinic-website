"use client";
import {ArrowUpRight,ArrowUp,CalendarDays,ShieldCheck,MapPin,Heart} from 'lucide-react';
import {useClinic} from './preferences';
import {LogoMark} from './logo-mark';
export function ClinicFooter(){
 const {t}=useClinic();
 return <footer className="site-footer">
  <div className="footer-shell glass organic-card">
   <div className="footer-top">
    <div className="footer-emblem"><LogoMark large/></div>
    <div className="footer-cta-copy"><span className="eyebrow">{t('footerKicker')}</span><h2>{t('footerTitle')}</h2><p>{t('footerDescription')}</p></div>
    <a href="/book" className="button"><span className="button-label">{t('book')}</span><ArrowUpRight size={18}/></a>
   </div>
   <div className="footer-columns">
    <div className="footer-brand"><a className="logo" href="/"><LogoMark/>lumina<span className="logo-clinic">clinic</span></a><p>{t('footer')}</p><div className="footer-trust"><span><ShieldCheck size={15}/>{t('careNote')}</span><span><Heart size={15}/>{t('human')}</span></div></div>
    <div className="footer-link-group"><h3>{t('footerExplore')}</h3><a href="/">{t('home')}<ArrowUpRight size={13}/></a><a href="/doctors">{t('doctors')}<ArrowUpRight size={13}/></a><a href="/services">{t('services')}<ArrowUpRight size={13}/></a></div>
    <div className="footer-link-group"><h3>{t('appointments')}</h3><a href="/book">{t('book')}<CalendarDays size={14}/></a><a href="/appointments">{t('appointments')}<ArrowUpRight size={13}/></a><a href="https://www.google.com/maps/search/clinics+near+me" target="_blank" rel="noreferrer">{t('maps')}<MapPin size={14}/></a></div>
    <div className="footer-link-group"><h3>{t('footerResources')}</h3><a href="/architecture.md" download>{t('architecture')}<ArrowUpRight size={13}/></a><a href="/design-system.md" download>{t('designSystem')}<ArrowUpRight size={13}/></a><p className="footer-demo-note">{t('demo')}</p></div>
   </div>
   <div className="footer-bottom"><span>© {new Date().getFullYear()} Lumina Clinic <span aria-hidden="true">·</span> {t('demo')}</span><a href="#top" className="footer-top-link">{t('backTop')}<ArrowUp size={15}/></a></div>
  </div>
 </footer>;
}
