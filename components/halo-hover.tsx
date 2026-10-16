"use client";

import {useEffect} from 'react';

// A shared, decorative halo layer. Pointer updates never trigger React renders.
const surfaces = 'button, a.button, a.secondary, a.round-link, a.text-link, .nav a, .footer-link-group a, .footer-top-link, .glass:not(.preference-bar), .language-picker, .language-options, .profile-facts > div, .steps > div:not(:first-child), .doctor-image-link';

export function HaloHover() {
  useEffect(() => {
    let frame = 0;
    let pending: PointerEvent | null = null;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function decorate(root: Document | HTMLElement) {
      if (root instanceof HTMLElement && root.matches(surfaces)) root.setAttribute('data-halo', '');
      root.querySelectorAll<HTMLElement>(surfaces).forEach(el => el.setAttribute('data-halo', ''));
    }
    decorate(document);

    const observer = new MutationObserver(records => {
      for (const record of records) {
        record.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) decorate(node);
        });
      }
    });
    observer.observe(document.body, {childList: true, subtree: true});

    function update() {
      frame = 0;
      const event = pending;
      pending = null;
      if (!event || !(event.target instanceof Element)) return;
      let el = event.target.closest<HTMLElement>('[data-halo]');
      while (el) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--halo-x', `${event.clientX - rect.left}px`);
        el.style.setProperty('--halo-y', `${event.clientY - rect.top}px`);
        if (el.classList.contains('organic-card') && rect.width && rect.height) {
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          el.style.setProperty('--organic-rx', `${Math.max(-1.6, Math.min(1.6, -y * 3.2))}deg`);
          el.style.setProperty('--organic-ry', `${Math.max(-1.6, Math.min(1.6, x * 3.2))}deg`);
        }
        el = el.parentElement?.closest<HTMLElement>('[data-halo]') ?? null;
      }
    }
    function move(event: PointerEvent) {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
      pending = event;
      if (!frame) frame = requestAnimationFrame(update);
    }
    document.addEventListener('pointermove', move, {passive: true});
    return () => {
      document.removeEventListener('pointermove', move);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
