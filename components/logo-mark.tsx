export function LogoMark({large=false}:{large?:boolean}){
 return <span className={large?'logo-mark logo-mark-3d logo-mark-large':'logo-mark logo-mark-3d'} aria-hidden="true"><img src="/lumina-logo-3d.svg" width={large?112:42} height={large?112:42} alt=""/></span>;
}
