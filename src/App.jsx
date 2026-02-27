import { useState, useEffect, useRef } from "react";

const C = {
  ink: "#1B1B19", charcoal: "#2A2A28", terre: "#7A6E5D",
  bronze: "#9E8B6E", stone: "#8C8578", warmGrey: "#B5AEA4",
  lin: "#C8BFA8", sand: "#D4CCC0", creme: "#EDE8DE",
  paper: "#F8F6F1", white: "#FFFFFF", green: "#5A7A52",
};

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

const css = `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
:root {
  --serif: 'Instrument Serif', Georgia, serif;
  --sans: 'Outfit', -apple-system, sans-serif;
  --ink: ${C.ink}; --terre: ${C.terre}; --bronze: ${C.bronze};
  --stone: ${C.stone}; --lin: ${C.lin}; --sand: ${C.sand};
  --creme: ${C.creme}; --paper: ${C.paper};
}
html { scroll-behavior: smooth; }
body, #root { font-family: var(--sans); color: var(--ink); background: var(--paper); -webkit-font-smoothing: antialiased; }

.noise::before {
  content: ''; position: absolute; inset: 0; opacity: 0.03; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── Nav ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 48px; background: rgba(248,246,241,0.85);
  backdrop-filter: blur(16px); border-bottom: 1px solid ${C.sand};
}
.nav-logo { font-family: var(--serif); font-size: 18px; letter-spacing: 3px; color: var(--ink); }
.nav-sub { font-family: var(--sans); font-size: 9px; letter-spacing: 2.5px; color: var(--terre); font-weight: 500; margin-top: 2px; }
.nav-links { display: flex; gap: 32px; align-items: center; }
.nav-links a { font-size: 13px; font-weight: 400; color: var(--stone); text-decoration: none; letter-spacing: 0.3px; transition: color 0.2s; }
.nav-links a:hover { color: var(--ink); }
.nav-cta { background: var(--ink) !important; color: var(--creme) !important; padding: 10px 24px !important; font-size: 12px !important; letter-spacing: 1px !important; font-weight: 500 !important; border: none; cursor: pointer; transition: all 0.25s; }
.nav-cta:hover { background: var(--terre) !important; }

/* ── Hero ── */
.hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 140px 24px 80px; position: relative; overflow: hidden; background: var(--ink); color: var(--creme); }
.hero-label { font-size: 11px; letter-spacing: 4px; font-weight: 500; color: ${C.bronze}; margin-bottom: 28px; }
.hero-title { font-family: var(--serif); font-size: clamp(32px, 5vw, 56px); line-height: 1.15; margin-bottom: 24px; font-weight: 400; max-width: 850px; }
.hero-title em { font-style: italic; color: ${C.bronze}; }
.hero-desc { font-size: 16px; line-height: 1.8; color: var(--lin); max-width: 620px; margin: 0 auto 40px; font-weight: 300; }
.hero-btn { display: inline-block; padding: 16px 40px; font-family: var(--sans); font-size: 12px; letter-spacing: 1.5px; font-weight: 500; text-decoration: none; border: 1px solid ${C.bronze}; color: var(--creme); background: transparent; cursor: pointer; transition: all 0.3s; }
.hero-btn:hover { background: ${C.bronze}; color: var(--ink); }
.hero-btn-primary { background: ${C.bronze}; color: var(--ink); border-color: ${C.bronze}; }
.hero-btn-primary:hover { background: var(--creme); border-color: var(--creme); }
.hero-micro { font-size: 12px; color: var(--stone); font-weight: 300; margin-top: 16px; letter-spacing: 0.3px; }

/* ── Banner ── */
.banner { padding: 24px 48px; background: var(--ink); border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); text-align: center; }
.banner-text { font-size: 13px; letter-spacing: 1.5px; color: ${C.bronze}; font-weight: 400; }

/* ── Sections ── */
.section { padding: 120px 48px; position: relative; }
.section-dark { background: var(--ink); color: var(--creme); }
.section-creme { background: var(--creme); }
.section-label { font-size: 10px; letter-spacing: 3px; font-weight: 500; color: ${C.bronze}; margin-bottom: 16px; }
.section-title { font-family: var(--serif); font-size: clamp(28px, 3.5vw, 42px); line-height: 1.2; margin-bottom: 16px; font-weight: 400; }
.section-title em { font-style: italic; }
.section-subtitle { font-size: 15px; line-height: 1.7; color: var(--stone); max-width: 560px; font-weight: 300; }
.section-dark .section-subtitle { color: var(--lin); }
.section-dark .section-label { color: ${C.bronze}; }
.section-inner { max-width: 1160px; margin: 0 auto; }

/* ── Hommage (tribute) ── */
.tribute-text { font-size: 16px; line-height: 1.9; color: var(--stone); max-width: 720px; font-weight: 300; margin-top: 40px; }
.tribute-text p { margin-bottom: 20px; }

/* ── Double mandat ── */
.mandat-intro { font-size: 16px; line-height: 1.8; color: var(--stone); max-width: 720px; font-weight: 300; margin: 24px 0 48px; }
.mandat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.mandat-col { padding: 40px; border: 1px solid var(--sand); background: var(--white); }
.mandat-col-title { font-family: var(--sans); font-size: 11px; letter-spacing: 2px; font-weight: 600; color: var(--ink); margin-bottom: 24px; }
.mandat-item { font-size: 14px; color: var(--stone); font-weight: 300; line-height: 1.65; padding: 10px 0; display: flex; gap: 10px; }
.mandat-item span { color: ${C.bronze}; flex-shrink: 0; }
.mandat-synthesis { margin-top: 48px; padding: 40px; background: var(--ink); color: var(--creme); text-align: center; font-family: var(--serif); font-size: 18px; line-height: 1.6; font-weight: 400; }

/* ── Problem / Pain points ── */
.pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 64px; }
.pain-card { padding: 36px 28px; border: 1px solid var(--sand); background: var(--paper); position: relative; transition: transform 0.3s, border-color 0.3s; }
.pain-card:hover { transform: translateY(-4px); border-color: ${C.bronze}; }
.pain-icon { font-size: 28px; margin-bottom: 16px; display: block; }
.pain-title { font-family: var(--serif); font-size: 19px; margin-bottom: 10px; line-height: 1.3; }
.pain-desc { font-size: 14px; color: var(--stone); font-weight: 300; line-height: 1.65; }
.pain-transition { margin-top: 48px; font-size: 16px; color: var(--stone); font-weight: 300; line-height: 1.7; max-width: 640px; font-style: italic; }

/* ── Inversion (imagine) ── */
.inversion-block { margin-top: 40px; max-width: 720px; }
.inversion-quote { font-family: var(--serif); font-size: 18px; line-height: 1.7; color: var(--creme); font-style: italic; padding: 40px; background: rgba(255,255,255,0.04); border-left: 3px solid ${C.bronze}; margin-bottom: 32px; }
.inversion-text { font-size: 16px; line-height: 1.8; color: var(--lin); font-weight: 300; }
.inversion-text p { margin-bottom: 16px; }
.inversion-punchline { font-family: var(--serif); font-size: 22px; color: ${C.bronze}; margin-top: 24px; }

/* ── How it works ── */
.how-grid { display: grid; grid-template-columns: 1fr; gap: 0; margin-top: 64px; max-width: 720px; }
.how-step { display: grid; grid-template-columns: 80px 1fr; gap: 24px; padding: 40px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.how-step:last-child { border-bottom: none; }
.how-num { font-family: var(--serif); font-size: 42px; color: ${C.bronze}; line-height: 1; }
.how-step-title { font-family: var(--serif); font-size: 20px; margin-bottom: 12px; color: var(--creme); }
.how-step-desc { font-size: 14px; color: var(--lin); font-weight: 300; line-height: 1.7; }
.how-step-micro { font-size: 12px; color: ${C.bronze}; margin-top: 12px; font-weight: 500; letter-spacing: 0.5px; }

/* ── Profil La Loge ── */
.score-intro { font-size: 16px; line-height: 1.8; color: var(--stone); max-width: 720px; font-weight: 300; margin: 24px 0 48px; }
.score-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.score-card { padding: 32px 28px; border: 1px solid var(--sand); background: var(--white); transition: transform 0.3s, border-color 0.3s; }
.score-card:hover { transform: translateY(-3px); border-color: ${C.bronze}; }
.score-card-icon { font-size: 24px; margin-bottom: 12px; display: block; }
.score-card-title { font-family: var(--serif); font-size: 17px; margin-bottom: 8px; line-height: 1.3; }
.score-card-desc { font-size: 13px; color: var(--stone); font-weight: 300; line-height: 1.65; }
.score-impact { margin-top: 48px; padding: 40px; background: var(--ink); color: var(--creme); }
.score-impact p { font-size: 15px; line-height: 1.7; color: var(--lin); font-weight: 300; margin-bottom: 16px; }
.score-impact p:last-child { margin-bottom: 0; color: ${C.bronze}; font-weight: 400; }
.score-cta { text-align: center; margin-top: 48px; }

/* ── Conciergerie services ── */
.services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 64px; }
.service-card { display: flex; gap: 20px; padding: 32px 28px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); transition: transform 0.3s, border-color 0.3s; }
.service-card:hover { transform: translateY(-3px); border-color: ${C.bronze}; }
.service-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
.service-title { font-family: var(--serif); font-size: 17px; margin-bottom: 8px; color: var(--creme); }
.service-desc { font-size: 13px; color: var(--lin); font-weight: 300; line-height: 1.65; }
.service-note { margin-top: 48px; text-align: center; font-size: 15px; color: var(--lin); font-weight: 300; line-height: 1.7; max-width: 720px; margin-left: auto; margin-right: auto; }

/* ── Before/After ── */
.compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 64px; }
.compare-col { padding: 40px; }
.compare-col-sans { background: var(--paper); border: 1px solid var(--sand); }
.compare-col-avec { background: var(--ink); color: var(--creme); }
.compare-col-title { font-family: var(--sans); font-size: 11px; letter-spacing: 2px; font-weight: 600; margin-bottom: 32px; }
.compare-col-sans .compare-col-title { color: var(--stone); }
.compare-col-avec .compare-col-title { color: ${C.bronze}; }
.compare-item { font-size: 14px; font-weight: 300; line-height: 1.5; padding: 14px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
.compare-col-sans .compare-item { color: var(--stone); border-color: var(--sand); }
.compare-col-avec .compare-item { color: var(--lin); border-color: rgba(255,255,255,0.06); }
.compare-item:last-child { border-bottom: none; }

/* ── Testimonials ── */
.proof-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 64px; }
.proof-card { background: var(--paper); padding: 40px; position: relative; border-left: 3px solid ${C.bronze}; }
.proof-quote { font-family: var(--serif); font-size: 17px; line-height: 1.6; color: var(--ink); margin-bottom: 24px; font-style: italic; }
.proof-open { font-family: var(--serif); font-size: 64px; color: var(--sand); line-height: 0; position: absolute; top: 48px; left: 20px; opacity: 0.4; }
.proof-author { font-size: 13px; color: var(--ink); font-weight: 500; }
.proof-role { font-size: 11px; color: ${C.warmGrey}; margin-top: 2px; }
.proof-meta { font-size: 11px; color: ${C.bronze}; margin-top: 8px; font-weight: 400; line-height: 1.5; }

/* ── Philosophy ── */
.philo-text { font-size: 16px; line-height: 1.9; color: var(--stone); max-width: 720px; font-weight: 300; margin-top: 40px; }
.philo-text p { margin-bottom: 20px; }
.philo-text strong { font-weight: 400; color: var(--ink); }

/* ── FAQ ── */
.faq-list { max-width: 720px; margin: 48px auto 0; }
.faq-item { border-bottom: 1px solid var(--sand); }
.faq-question { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 24px 0; font-family: var(--serif); font-size: 18px; color: var(--ink); background: none; border: none; cursor: pointer; text-align: left; }
.faq-question:hover { color: ${C.bronze}; }
.faq-arrow { font-size: 14px; color: ${C.bronze}; transition: transform 0.3s; flex-shrink: 0; margin-left: 16px; }
.faq-arrow.open { transform: rotate(180deg); }
.faq-answer { font-size: 14px; color: var(--stone); font-weight: 300; line-height: 1.7; padding: 0 0 24px; }

/* ── CTA ── */
.cta-section { padding: 120px 48px; background: var(--ink); color: var(--creme); position: relative; overflow: hidden; }
.cta-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.cta-title { font-family: var(--serif); font-size: clamp(28px, 3vw, 40px); line-height: 1.2; margin-bottom: 16px; }
.cta-title em { font-style: italic; color: ${C.bronze}; }
.cta-desc { font-size: 15px; line-height: 1.7; color: var(--lin); font-weight: 300; margin-bottom: 32px; }
.cta-promises { display: flex; flex-direction: column; gap: 14px; }
.cta-promise { display: flex; gap: 14px; align-items: center; font-size: 14px; color: var(--lin); font-weight: 300; }
.cta-promise-icon { color: ${C.bronze}; font-size: 16px; flex-shrink: 0; }

.cta-form { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 48px; }
.form-group { margin-bottom: 20px; }
.form-label { font-size: 10px; letter-spacing: 2px; font-weight: 500; color: var(--stone); margin-bottom: 8px; display: block; }
.form-input { width: 100%; padding: 12px 0; font-family: var(--sans); font-size: 14px; color: var(--creme); background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.12); outline: none; transition: border-color 0.3s; }
.form-input:focus { border-color: ${C.bronze}; }
.form-input::placeholder { color: rgba(255,255,255,0.2); }
.form-select { width: 100%; padding: 12px 0; font-family: var(--sans); font-size: 14px; color: var(--creme); background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.12); outline: none; cursor: pointer; -webkit-appearance: none; appearance: none; }
.form-select option { background: var(--ink); color: var(--creme); }
.form-submit { width: 100%; padding: 16px; background: ${C.bronze}; color: var(--ink); font-family: var(--sans); font-size: 12px; letter-spacing: 1.5px; font-weight: 600; border: none; cursor: pointer; margin-top: 12px; transition: all 0.3s; }
.form-submit:hover { background: var(--creme); }
.form-note { text-align: center; margin-top: 16px; font-size: 11px; color: var(--stone); font-weight: 300; }
.form-checkbox { display: flex; align-items: flex-start; gap: 10px; margin-top: 16px; }
.form-checkbox input[type="checkbox"] { margin-top: 3px; accent-color: ${C.bronze}; cursor: pointer; flex-shrink: 0; }
.form-checkbox label { font-size: 11px; color: var(--stone); font-weight: 300; line-height: 1.5; cursor: pointer; }
.form-checkbox a { color: var(--lin); text-decoration: underline; }

/* ── Brand B2B footer ── */
.brand-section { padding: 80px 48px; background: var(--creme); }
.brand-inner { max-width: 1160px; margin: 0 auto; }
.brand-title { font-family: var(--serif); font-size: 28px; margin-bottom: 16px; }
.brand-desc { font-size: 15px; color: var(--stone); font-weight: 300; line-height: 1.7; max-width: 640px; margin-bottom: 32px; }
.brand-points { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.brand-point { font-size: 14px; color: var(--stone); font-weight: 300; display: flex; gap: 10px; }
.brand-point span { color: ${C.bronze}; flex-shrink: 0; }
.brand-cta { font-size: 13px; color: var(--ink); font-weight: 500; text-decoration: none; letter-spacing: 0.5px; border-bottom: 1px solid ${C.bronze}; padding-bottom: 2px; transition: color 0.2s; }
.brand-cta:hover { color: var(--terre); }

/* ── Footer brand strip ── */
.footer-brand-strip { padding: 48px 48px; background: var(--creme); border-top: 1px solid var(--sand); }
.footer-brand-inner { max-width: 1160px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 48px; }
.footer-brand-label { font-size: 10px; letter-spacing: 3px; color: ${C.bronze}; font-weight: 500; margin-bottom: 10px; }
.footer-brand-title { font-family: var(--serif); font-size: 20px; margin-bottom: 8px; }
.footer-brand-desc { font-size: 13px; color: var(--stone); font-weight: 300; line-height: 1.65; max-width: 480px; }
.footer-brand-cta { font-size: 13px; color: var(--ink); font-weight: 500; text-decoration: none; letter-spacing: 0.3px; border-bottom: 1px solid ${C.bronze}; padding-bottom: 2px; white-space: nowrap; transition: color 0.2s; flex-shrink: 0; }
.footer-brand-cta:hover { color: var(--terre); }

/* ── Footer ── */
.footer { padding: 48px; background: ${C.charcoal}; color: var(--stone); font-size: 12px; border-top: 1px solid rgba(255,255,255,0.05); }
.footer-inner { max-width: 1160px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.footer-logo { font-family: var(--serif); font-size: 16px; letter-spacing: 3px; color: var(--lin); }
.footer-tagline { font-size: 10px; margin-top: 4px; letter-spacing: 1px; color: var(--stone); }
.footer-links { display: flex; gap: 24px; }
.footer-links a { color: var(--stone); text-decoration: none; font-size: 12px; transition: color 0.2s; }
.footer-links a:hover { color: var(--creme); }

/* ── Skip link ── */
.skip-link {
  position: absolute; top: -100%; left: 16px;
  z-index: 1000; padding: 12px 24px;
  background: var(--ink); color: var(--creme);
  text-decoration: none; font-family: var(--sans); font-size: 14px;
}
.skip-link:focus { top: 16px; }

/* ── Mobile ── */
@media (max-width: 900px) {
  .hero { padding: 100px 24px 64px; min-height: 100svh; }
  .hero-title { font-size: 32px; }
  .hero-desc { font-size: 15px; max-width: 100%; }
  .hero-btn { padding: 16px 28px; font-size: 12px; }

  .nav { padding: 14px 20px; }
  .nav-logo { font-size: 15px; letter-spacing: 2.5px; }
  .nav-sub { font-size: 8px; }
  .nav-links a:not(.nav-cta) { display: none; }
  .nav-cta { padding: 10px 20px !important; font-size: 11px !important; }

  .banner { padding: 20px 20px; }
  .banner-text { font-size: 11px; letter-spacing: 1px; }

  .section { padding: 64px 20px; }
  .section-title { font-size: 28px; }
  .section-subtitle { font-size: 14px; }

  .tribute-text { font-size: 15px; }

  .mandat-grid { grid-template-columns: 1fr; gap: 20px; }
  .mandat-col { padding: 28px 24px; }
  .mandat-synthesis { font-size: 16px; padding: 28px 24px; }

  .pain-grid { grid-template-columns: 1fr; gap: 16px; margin-top: 40px; }
  .pain-card { padding: 28px 24px; }

  .how-grid { margin-top: 40px; }
  .how-step { grid-template-columns: 60px 1fr; gap: 16px; padding: 28px 0; }
  .how-num { font-size: 36px; }

  .score-grid { grid-template-columns: 1fr; gap: 16px; }
  .score-card { padding: 24px 20px; }
  .score-impact { padding: 28px 24px; }

  .services-grid { grid-template-columns: 1fr; gap: 16px; }
  .service-card { padding: 24px 20px; }

  .compare-grid { grid-template-columns: 1fr; }
  .compare-col { padding: 28px 24px; }

  .proof-grid { grid-template-columns: 1fr; gap: 20px; margin-top: 40px; }
  .proof-card { padding: 28px 24px; }
  .proof-quote { font-size: 16px; }
  .proof-open { font-size: 48px; top: 36px; left: 14px; }

  .faq-question { font-size: 16px; }

  .cta-section { padding: 64px 20px; }
  .cta-inner { grid-template-columns: 1fr; gap: 40px; }
  .cta-title { font-size: 28px; }
  .cta-desc { font-size: 14px; }
  .cta-form { padding: 28px 20px; }
  .form-input { font-size: 16px; padding: 14px 0; }
  .form-select { font-size: 16px; padding: 14px 0; }
  .form-submit { padding: 18px; font-size: 13px; }

  .brand-section { padding: 48px 20px; }

  .footer-brand-strip { padding: 32px 20px; }
  .footer-brand-inner { flex-direction: column; align-items: flex-start; gap: 20px; }
  .footer-brand-title { font-size: 17px; }
  .footer-inner { flex-direction: column; gap: 20px; text-align: center; }
  .footer { padding: 36px 20px; }
  .footer-links { flex-direction: column; gap: 12px; }
  .footer-links a { font-size: 13px; }
}

@media (max-width: 400px) {
  .hero { padding: 88px 18px 48px; }
  .hero-title { font-size: 26px; }
  .section { padding: 48px 16px; }
  .section-title { font-size: 24px; }
  .cta-form { padding: 24px 16px; }
  .nav { padding: 12px 16px; }
  .mandat-synthesis { font-size: 15px; padding: 24px 16px; }
  .how-step { grid-template-columns: 48px 1fr; gap: 12px; }
  .how-num { font-size: 28px; }
}
`;

/* ────────────────────────────────────────────
   COMPONENTS
   ──────────────────────────────────────────── */

function Nav() {
  return (
    <header>
      <nav className="nav" aria-label="Navigation principale">
        <div>
          <div className="nav-logo">L A&nbsp;&nbsp;L O G E</div>
          <div className="nav-sub">CONCIERGERIE BEAUTÉ</div>
        </div>
        <div className="nav-links">
          <a href="#concept">Le concept</a>
          <a href="#methode">Comment ça marche</a>
          <a href="#profil">Votre profil</a>
          <a href="#faq">FAQ</a>
          <a href="#contact" className="nav-cta">CANDIDATER</a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const anim = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.8s ease ${d}s, transform 0.8s ease ${d}s`,
  });

  return (
    <section className="hero noise">
      <div style={anim(0.2)}>
        <div className="hero-label">CONCIERGERIE BEAUTÉ — SALONS INDÉPENDANTS</div>
      </div>
      <div style={anim(0.35)}>
        <h1 className="hero-title">
          Pour les salons qui veulent mieux.<br />
          <em>Vos marques, vos conditions, votre choix.</em>
        </h1>
      </div>
      <div style={anim(0.5)}>
        <p className="hero-desc">
          Trouvez les marques premium qui correspondent vraiment à votre salon. Pas de commercial à attendre. Pas de minimum à respecter. Pas d'engagement à signer. Gratuitement.
        </p>
      </div>
      <div style={anim(0.65)}>
        <a href="#contact" className="hero-btn hero-btn-primary">CRÉER MON PROFIL GRATUIT</a>
      </div>
      <div style={anim(0.75)}>
        <div className="hero-micro">5 min · Gratuit · Sans engagement · Premières offres sous 48h</div>
      </div>
    </section>
  );
}

function Banner() {
  return (
    <div className="banner">
      <div className="banner-text">
        50+ marques premium mandantes &nbsp;·&nbsp; Conditions négociées sur mesure &nbsp;·&nbsp; 100 % gratuit pour les salons
      </div>
    </div>
  );
}

function Tribute() {
  return (
    <section className="section">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">CE QUE VOUS FAITES VRAIMENT</div>
          <h2 className="section-title">
            Vous ne "coupez pas les cheveux".<br /><em>Vous changez la journée de quelqu'un.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="tribute-text">
            <p>La femme qui s'assoit dans votre fauteuil à 14h, elle ne vient pas pour une coupe. Elle vient parce que son reflet ne lui ressemble plus. Elle vient parce que demain c'est un entretien, un mariage, un premier rendez-vous — ou juste un mardi où elle a besoin de se sentir belle.</p>
            <p>Et vous, en 45 minutes, vous faites ce qu'aucun algorithme, aucune appli, aucune intelligence artificielle ne sait faire : vous regardez quelqu'un dans les yeux, vous comprenez ce qu'il ne dit pas, et vous le transformez.</p>
            <p>Vos mains connaissent 200 techniques. Votre œil voit la couleur avant qu'elle n'existe. Vous êtes artisan, confident, prescripteur, artiste — parfois tout ça dans la même heure.</p>
            <p>La Loge est née de cette conviction : les meilleurs artisans de la beauté méritent une représentation à la hauteur. Pas un portail B2B. Pas un chatbot. Une vraie conciergerie.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DoubleMandat() {
  return (
    <section className="section section-creme" id="concept">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">LE CONCEPT</div>
          <h2 className="section-title">
            Mandatés par les marques.<br /><em>Corps et âme avec les salons.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mandat-intro">
            La Loge occupe une place qui n'existait pas avant dans la coiffure : les marques premium nous confient la mission de repérer les meilleurs salons de France et d'Europe. Et notre conciergerie travaille pour vous. Au quotidien.
          </p>
        </Reveal>
        <div className="mandat-grid">
          <Reveal delay={0.15}>
            <div className="mandat-col">
              <div className="mandat-col-title">CE QUE LES MARQUES NOUS DEMANDENT</div>
              {[
                "Trouver les salons qui portent leur image avec fierté",
                "Qualifier le positionnement, la clientèle, l'influence",
                "Présenter uniquement les profils à la hauteur",
                "Elles nous rémunèrent pour ce travail de sélection",
              ].map((t, i) => (
                <div className="mandat-item" key={i}><span>→</span>{t}</div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mandat-col">
              <div className="mandat-col-title">CE QU'ON FAIT POUR VOUS, AU QUOTIDIEN</div>
              {[
                "Négocier vos conditions comme un agent négocie pour son artiste",
                "Filtrer les marques — vous ne voyez que celles qui vous correspondent vraiment",
                "Vous ouvrir les portes de marques inaccessibles en direct",
                "Vous accompagner dans la durée, pas juste au premier contact",
                "Et vous ne payez rien. Jamais. Zéro.",
              ].map((t, i) => (
                <div className="mandat-item" key={i}><span>→</span>{t}</div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <div className="mandat-synthesis">
            Les marques nous mandatent parce qu'elles cherchent des salons d'exception. Vous accédez à un réseau et des conditions que vous n'obtiendriez pas seul. Un modèle où les intérêts sont naturellement alignés.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  const pains = [
    {
      icon: "😶",
      title: "LE COMMERCIAL FANTÔME",
      desc: "Votre représentant a changé 3 fois en 2 ans. Le dernier ? Plus de nouvelles depuis septembre. Vous commandez en ligne sur un portail qui n'a pas changé depuis 2015. Quand vous avez un problème, vous parlez à un chatbot. Vous qui passez vos journées à créer du lien humain, vous méritez mieux que ça.",
    },
    {
      icon: "🔒",
      title: "L'IMPASSE",
      desc: "Pour accéder à la marque que vous voulez vraiment, on vous demande 2 000 € de stock minimum et une exclusivité sur la catégorie. Un modèle qui laisse peu de place aux indépendants. La Loge est là pour changer ça.",
    },
    {
      icon: "📱",
      title: "L'ARTISAN INVISIBLE",
      desc: "10 000 abonnés. Des avant/après qui font 50K vues. Des clientes qui traversent la ville pour vos balayages. Et vous commandez aux mêmes conditions que le salon qui vient d'ouvrir avec un Groupon. Votre art, votre communauté, votre réputation — tout ça mérite d'être reconnu à sa juste valeur.",
    },
  ];

  return (
    <section className="section" id="probleme">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">CE QUI NE VA PAS</div>
          <h2 className="section-title">
            Vous êtes au cœur de la beauté.<br /><em>Vous méritez d'être traité comme tel.</em>
          </h2>
          <p className="section-subtitle">
            Vous prescrivez des produits à des centaines de clientes par mois. Vous êtes le dernier maillon avant l'achat — souvent le plus décisif. La Loge est convaincue qu'il existe une meilleure façon de valoriser ça.
          </p>
        </Reveal>
        <div className="pain-grid">
          {pains.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="pain-card">
                <span className="pain-icon">{p.icon}</span>
                <div className="pain-title">{p.title}</div>
                <div className="pain-desc">{p.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.35}>
          <p className="pain-transition">
            Le circuit traditionnel n'a pas été conçu pour les artisans indépendants. La Loge ouvre une autre voie.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Inversion() {
  return (
    <section className="section section-dark noise" id="imaginez">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">IMAGINEZ</div>
          <h2 className="section-title" style={{ color: C.creme }}>
            Lundi matin. 9h12. <em>Un message.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="inversion-block">
            <div className="inversion-quote">
              "Bonjour Sophie, deux marques ont regardé votre profil cette semaine. Il y en a une qui nous semble bien correspondre à ce que vous cherchez. On a quelques questions avant d'aller plus loin — quand avez-vous cinq minutes ?"
            </div>
            <div className="inversion-text">
              <p>Vous n'avez rien demandé. Vous n'avez appelé personne. Vous n'avez pas rempli un seul bon de commande. Vous avez juste fait ce que vous faites tous les jours : votre métier.</p>
              <p>Le reste, c'est La Loge qui s'en est chargé.</p>
            </div>
            <div className="inversion-punchline">C'est ça, avoir une conciergerie.</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "VOTRE HISTOIRE",
      desc: "On ne vous demande pas de remplir un formulaire froid. On veut comprendre votre salon : comment vous travaillez, ce que vous aimez, ce qui vous manque, où vous voulez aller. Votre positionnement, vos spécialités, votre clientèle, vos marques actuelles — tout compte.",
      micro: "→ 5 minutes en ligne",
    },
    {
      num: "02",
      title: "VOTRE PROFIL LA LOGE",
      desc: "On analyse les signaux qui racontent votre salon — réputation en ligne, présence digitale, spécialités, positionnement — et on construit votre profil. Ce profil détermine quelles marques vous correspondent. Plus votre travail est remarquable, plus les opportunités sont intéressantes.",
      micro: "→ Profil établi sous 24h",
    },
    {
      num: "03",
      title: "LES MARQUES VIENNENT À VOUS",
      desc: "Inversion totale : ce sont les marques qui soumettent leurs propositions à votre dossier. Conditions, animations, formations, support — tout est transparent. Vous ne démarchez personne. Vous choisissez.",
      micro: "→ Premières offres sous 48h",
    },
    {
      num: "04",
      title: "ON VOUS ACCOMPAGNE",
      desc: "Une offre vous plaît ? Notre conciergerie entre en jeu. On négocie les détails, on s'assure que tout roule, on reste votre interlocuteur unique. Et si demain vous voulez explorer d'autres marques, on recommence. On est là dans la durée.",
      micro: "→ En continu, aussi longtemps que vous le souhaitez",
    },
  ];

  return (
    <section className="section section-dark noise" id="methode">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">LE PROCESSUS</div>
          <h2 className="section-title" style={{ color: C.creme }}>
            Simple à démarrer.<br /><em>Sérieux dans la durée.</em>
          </h2>
        </Reveal>
        <div className="how-grid">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="how-step">
                <div className="how-num">{s.num}</div>
                <div>
                  <div className="how-step-title">{s.title}</div>
                  <div className="how-step-desc">{s.desc}</div>
                  <div className="how-step-micro">{s.micro}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScoreLaLoge() {
  const pillars = [
    { icon: "🎯", title: "VOS TECHNIQUES & SPÉCIALITÉS", desc: "Coloriste, barbier, spécialiste du curly, expert en soins capillaires, extensions, lissages techniques — on identifie votre savoir-faire distinctif. Les marques ne cherchent pas des généralistes : elles cherchent des salons qui maîtrisent les gestes qui mettent leurs produits en valeur. Plus votre spécialisation est pointue, plus les marques spécialisées s'intéressent à votre profil." },
    { icon: "📍", title: "VOTRE EMPLACEMENT & ZONE DE CHALANDISE", desc: "Quartier, ville, densité de salons autour de vous, pouvoir d'achat de la zone, flux piéton — on cartographie votre environnement. Un salon premium dans un quartier premium, c'est une vitrine rêvée pour une marque haut de gamme. Mais un salon d'exception dans une ville moyenne, c'est aussi un signal fort : vous attirez des clientes qui font le déplacement. Les deux comptent." },
    { icon: "💰", title: "VOTRE POSITIONNEMENT PRIX", desc: "Votre grille tarifaire raconte une histoire. On prend en compte le prix moyen de vos prestations, votre positionnement par rapport au marché local, la cohérence entre vos tarifs et votre offre. Une coupe à 65 € dans un salon qui respire le premium, avec des produits haut de gamme en rayon — c'est un signal de cohérence que les marques remarquent." },
    { icon: "⭐", title: "VOS AVIS & VOTRE RÉPUTATION", desc: "Note Google, nombre d'avis, fraîcheur des avis, diversité des commentaires, note sur Planity, Treatwell ou d'autres plateformes — on croise tout. On ne regarde pas juste la moyenne : on analyse le sentiment, la récurrence des compliments sur des points précis, et détecte les signaux d'une clientèle fidèle qui revient et qui parle de vous." },
    { icon: "📱", title: "VOTRE PRÉSENCE DIGITALE", desc: "Nombre de followers — oui, mais surtout taux d'engagement, qualité visuelle des posts, régularité de publication, diversité du contenu. Ce qui compte vraiment : un compte à 5 000 abonnés avec 8 % d'engagement vaut souvent plus pour une marque qu'un compte à 50 000 avec 0,3 %." },
    { icon: "🏛️", title: "VOTRE SALON — L'ESPACE, LE DÉCOR, L'AMBIANCE", desc: "On s'appuie sur les photos de votre salon disponibles en ligne : Google, Instagram, votre site web. L'agencement, la lumière, les matériaux, la cohérence visuelle. Un salon qui a investi dans son espace envoie un message clair aux marques : ici, chaque détail compte." },
    { icon: "🤝", title: "VOS MARQUES ACTUELLES", desc: "Ce que vous avez déjà en rayon raconte votre niveau d'exigence. On prend en compte vos marques actuelles pour évaluer la cohérence de votre offre. Un salon qui porte Davines, Olaplex et Kevin Murphy n'a pas le même profil qu'un salon tout-L'Oréal. Les marques qui vous correspondent ne sont pas les mêmes. On fait le tri." },
    { icon: "👥", title: "VOTRE CLIENTÈLE", desc: "Âge moyen, pouvoir d'achat, fidélité, fréquence de visite — on déduit le profil de votre clientèle à partir de multiples signaux. Les marques qui visent les 25-35 ans urbaines ne cherchent pas les mêmes salons que celles qui ciblent une clientèle mature et premium. Votre clientèle est votre valeur aux yeux des marques. On la rend visible." },
  ];

  return (
    <section className="section" id="profil">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">VOTRE PROFIL</div>
          <h2 className="section-title">
            Chaque balayage, chaque post, chaque cliente fidèle —<br /><em>ça compte enfin.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="score-intro">
            Quand une marque consulte un dossier La Loge, elle ne voit pas une note. Elle découvre un profil — votre univers, vos spécialités, votre clientèle, vos ambitions. On construit ce profil à partir de ce qui fait vraiment votre salon, et il s'enrichit au fil de votre travail.
          </p>
        </Reveal>
        <div className="score-grid">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="score-card">
                <span className="score-card-icon">{p.icon}</span>
                <div className="score-card-title">{p.title}</div>
                <div className="score-card-desc">{p.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <div className="score-impact">
            <p>Votre profil évolue en continu. Chaque nouvel avis, chaque publication qui résonne, chaque nouvelle prestation — tout ça enrichit votre dossier et affine le matching avec les marques. Votre travail au quotidien se traduit directement en opportunités.</p>
            <p>Un profil solide, c'est l'accès à des partenariats et des conditions qui correspondent vraiment à ce que vous avez construit — pas à la taille de vos commandes.</p>
          </div>
        </Reveal>
        <Reveal delay={0.55}>
          <div className="score-cta">
            <a href="#contact" className="hero-btn" style={{ borderColor: C.bronze, color: C.ink }}>CRÉER MON PROFIL</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Conciergerie() {
  const services = [
    { icon: "🔍", title: "SCOUTING SUR MESURE", desc: "On ne vous envoie pas un PDF de 200 marques. On écoute ce que vous cherchez — une marque végane pour compléter votre offre, un soin technique premium, une ligne homme qui correspond à votre clientèle — et on va la chercher pour vous. Quelques recommandations ciblées — pas un catalogue." },
    { icon: "💰", title: "NÉGOCIATION EN VOTRE NOM", desc: "Vous n'avez plus jamais à négocier seul face à un directeur commercial qui fait ça toute la journée. La Loge négocie pour vous : tarifs, remises de lancement, PLV, animations en salon, formation technique offerte. On obtient ce que vous n'auriez pas obtenu seul — parce que c'est notre métier." },
    { icon: "🚀", title: "ACCÈS À L'INACCESSIBLE", desc: "Des marques que vous admirez de loin mais qui ne répondent pas aux indépendants ? La Loge a les contacts directs. Le réseau permet d'établir des contacts que vous n'auriez pas pu avoir seul, et de négocier avec un poids collectif." },
    { icon: "🤝", title: "UN INTERLOCUTEUR HUMAIN", desc: "Pas un chatbot. Pas un formulaire. Pas un numéro vert avec 45 minutes d'attente. Un être humain qui connaît votre salon, vos marques, vos préférences. Quelqu'un à qui vous écrivez quand vous avez une question — et qui répond." },
    { icon: "📈", title: "ÉVOLUTION CONTINUE", desc: "Votre salon évolue. Vos besoins aussi. Régulièrement, on fait le point : est-ce que vos marques actuelles sont toujours les bonnes ? Est-ce qu'il y a des opportunités que vous ne voyez pas ? De nouvelles marques qui arrivent et qui correspondent à votre nouvelle direction ? On anticipe pour vous." },
    { icon: "🤫", title: "ACCÈS AVANT-PREMIÈRE", desc: "Les nouvelles marques qui arrivent en France passent par La Loge pour trouver leurs premiers salons ambassadeurs. Être dans le réseau, c'est avoir accès aux nouvelles marques avant qu'elles ne soient disponibles en distribution classique." },
  ];

  return (
    <section className="section section-dark noise">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">VOTRE CONCIERGERIE</div>
          <h2 className="section-title" style={{ color: C.creme }}>
            Vous créez de la beauté.<br /><em>On s'occupe de tout le reste.</em>
          </h2>
        </Reveal>
        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="service-card">
                <span className="service-icon">{s.icon}</span>
                <div>
                  <div className="service-title">{s.title}</div>
                  <div className="service-desc">{s.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <div className="service-note">
            Tout ça, sans débourser un centime. Les marques investissent dans votre accompagnement parce qu'un salon bien accompagné est un salon heureux. Et un salon heureux, c'est leur meilleur ambassadeur.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const items = [
    { sans: "Vous cherchez les marques", avec: "Les marques vous trouvent" },
    { sans: "Vous négociez seul, sans levier", avec: "La Loge négocie en votre nom" },
    { sans: "Conditions catalogue, les mêmes pour tous", avec: "Conditions sur mesure, calculées par l'algorithme" },
    { sans: "2 000 € de stock pour \"tester\"", avec: "Pas de minimum — testez ce que vous voulez" },
    { sans: "Votre Instagram ? Joli, mais sans impact", avec: "Votre présence digitale booste vos conditions" },
    { sans: "Commercial injoignable depuis des mois", avec: "Un interlocuteur humain dédié, qui décroche" },
    { sans: "Vous découvrez les marques au salon pro", avec: "Vous y accédez avant tout le monde" },
    { sans: "Vos clientes vous adorent mais les marques ne le savent pas", avec: "Votre réputation se transforme en pouvoir de négociation" },
  ];

  return (
    <section className="section section-creme">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">DEUX MONDES</div>
          <h2 className="section-title">
            Le même métier. <em>Deux réalités.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="compare-grid">
            <div className="compare-col compare-col-sans">
              <div className="compare-col-title">SANS LA LOGE</div>
              {items.map((item, i) => (
                <div className="compare-item" key={i}>{item.sans}</div>
              ))}
            </div>
            <div className="compare-col compare-col-avec">
              <div className="compare-col-title">AVEC LA LOGE</div>
              {items.map((item, i) => (
                <div className="compare-item" key={i}>{item.avec}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "Je fais ce métier depuis 22 ans. J'ai vu les marques disparaître, les commerciaux changer, les conditions se dégrader. Quand La Loge m'a contactée, j'étais sceptique — encore un truc commercial. Mais non. Pour la première fois, quelqu'un m'a demandé ce que MOI je voulais. Et 3 semaines après, j'avais deux nouvelles marques en rayon. Avec des conditions que je n'avais jamais eues en 22 ans de métier.",
      author: "Sophie M., Salon Éclat, Lyon",
      meta: "3 nouvelles marques en 4 mois",
    },
    {
      quote: "J'ai 28 ans, j'ai ouvert mon salon il y a 3 ans. Je pensais que les marques premium, c'était réservé aux gros. Que je devais 'faire mes preuves' pendant 10 ans avant d'y avoir droit. La Loge m'a montré que mon profil correspondait exactement à ce que certaines marques cherchaient — grâce à mon travail sur Insta. Chez MOI. Le petit salon de Bordeaux. J'en reviens toujours pas.",
      author: "Amira K., Studio Amira, Bordeaux",
      meta: "Marge produits : +18 % en 3 mois",
    },
    {
      quote: "Ça faisait 6 ans que j'avais les mêmes marques. Pas par amour — par flemme de me battre pour en changer. La Loge a fait le boulot à ma place : ils m'ont trouvé 4 marques qui correspondaient à mon positionnement et ils ont négocié les conditions. J'en ai gardé 2 nouvelles. Mes clientes me demandent ce qui a changé. Tout. L'énergie du salon a changé.",
      author: "Thomas R., Maison Thomas, Paris 11e",
      meta: "Passé de 2 à 4 marques en rayon",
    },
    {
      quote: "Le moment où j'ai compris que La Loge c'était différent : ils m'ont dit 'votre travail sur les réseaux vous donne un levier que vous n'utilisez pas'. Personne ne m'avait jamais dit ça. Ils ont utilisé mon profil pour négocier un statut ambassadeur avec une marque que j'essayais d'avoir depuis 2 ans. Shooting offert, formation technique, conditions partenaires. Tout ça parce que quelqu'un a enfin vu la valeur de ce que je fais tous les jours.",
      author: "Nadia F., L'Atelier Nadia, Annecy",
      meta: "Statut ambassadeur avec une marque premium",
    },
  ];

  return (
    <section className="section" id="resultats">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">LEURS MOTS, PAS LES NÔTRES</div>
          <h2 className="section-title">
            Ils ont candidaté. Ils ont été sélectionnés.<br /><em>Voici ce que ça a changé.</em>
          </h2>
        </Reveal>
        <div className="proof-grid">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="proof-card">
                <span className="proof-open">"</span>
                <p className="proof-quote">{t.quote}</p>
                <div className="proof-author">{t.author}</div>
                <div className="proof-meta" style={{ whiteSpace: "pre-line" }}>{t.meta}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="section section-creme">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">CE QU'ON CROIT</div>
          <h2 className="section-title">
            Ce métier <em>mérite mieux.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="philo-text">
            <p>La coiffure, c'est le premier métier du toucher. Le premier métier du regard. C'est un art qui se pratique à bout de bras, debout, 8 heures par jour, les mains dans la couleur et le cœur dans la conversation.</p>
            <p>Un coiffeur, c'est la personne à qui on raconte son divorce avant d'en parler à sa meilleure amie. C'est celui qui voit qu'une cliente ne va pas bien juste à la façon dont elle s'assoit. C'est l'artisan qui transforme une coupe en confiance, un balayage en lumière, une couleur en personnalité.</p>
            <p>Cette personne-là mérite un accompagnement à la hauteur de ce qu'elle crée.</p>
            <p>La Loge existe parce qu'on pense que les meilleurs artisans de la beauté méritent d'être représentés comme les artistes qu'ils sont. Avec un agent. Avec une conciergerie. Avec quelqu'un qui se bat pour eux dans les coulisses, pour qu'eux puissent rester là où ils sont les meilleurs : dans leur fauteuil, face à leur client.</p>
            <p>C'est aussi simple que ça.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: "C'est gratuit — comment vous rémunérez-vous ?",
      a: "Oui. Le modèle est simple : les marques premium nous versent une commission pour accéder à notre réseau de salons qualifiés. Cette commission vient de leur budget distribution — pas de votre marge. Pour vous : candidature, score, matching, négociation, accompagnement — tout est inclus. Pas de frais cachés. Pas de commission sur vos commandes. C'est structurellement gratuit.",
    },

    {
      q: "Vous travaillez pour les marques ou pour moi ?",
      a: "Les marques nous mandatent pour trouver les meilleurs salons — c'est elles qui financent le système. Mais notre conciergerie travaille pour vous. On négocie vos conditions, on filtre les marques, on vous accompagne. Pourquoi ? Parce que notre réseau ne vaut quelque chose que si nos salons sont heureux. Un salon mécontent, c'est un salon qui part. Et un réseau qui se vide, c'est un réseau mort. Nos intérêts sont alignés avec les vôtres.",
    },
    {
      q: "En quoi vous êtes différents d'un grossiste ou d'une marketplace ?",
      a: "Un grossiste vous vend des produits. Une marketplace vous donne un catalogue. La Loge vous représente. On est votre agent : on négocie pour vous, on filtre pour vous, on ouvre des portes pour vous. C'est la différence entre réserver un hôtel sur Booking et avoir un concierge qui connaît vos goûts. Le premier vous donne une liste. Le second vous offre une expérience.",
    },
    {
      q: "Quelles marques sont disponibles ?",
      a: "Plus de 50 marques coiffure et beauté — des niches premium aux professionnelles reconnues. Le réseau s'enrichit chaque mois. Mais vous ne verrez pas les 50 : on ne vous présente que celles qui correspondent à votre positionnement et votre clientèle. Si une marque ne vous correspond pas, elle n'arrive pas jusqu'à vous.",
    },
    {
      q: "Est-ce que tous les salons sont acceptés ?",
      a: "Non, et c'est volontaire. La sélectivité garantit la qualité du réseau — et donc la valeur des partenariats pour tous. Si votre candidature n'est pas retenue immédiatement, on vous donne les pistes concrètes pour améliorer votre Score et recandidater. Certains salons qui n'étaient pas retenus au départ ont été acceptés quelques mois plus tard, après avoir amélioré leur score.",
    },
    {
      q: "Est-ce que je dois quitter mes marques actuelles ?",
      a: "Jamais. La Loge est 100 % complémentaire. On ajoute des possibilités, on ne retire rien. Aucune exclusivité demandée. Votre liberté, c'est non négociable.",
    },
    {
      q: "Comment fonctionne le matching ?",
      a: "L'algorithme analyse des dizaines de signaux en temps réel : vos techniques et spécialités, votre emplacement, votre positionnement prix, vos avis Google et plateformes, votre présence Instagram, l'espace et le décor de votre salon, vos marques actuelles, le profil de votre clientèle. Il croise tout ça avec les critères des marques partenaires et construit votre profil d'attractivité. Il s'enrichit en continu : chaque nouvel avis, chaque publication, chaque évolution de votre salon affine le matching.",
    },
    {
      q: "Combien de temps avant de recevoir des offres ?",
      a: "5 minutes pour candidater. Profil établi sous 24h. Premières propositions sous 48h. Ensuite, les offres arrivent en continu à chaque fois qu'une marque correspond à votre profil.",
    },
    {
      q: "Qu'est-ce que vous faites de mes données ?",
      a: "Vos données servent uniquement au Score et au matching. Elles ne sont jamais revendues — à personne, jamais. Les marques ne voient votre dossier que si vous acceptez la mise en relation. Vous pouvez retirer votre profil à tout moment.",
    },
  ];

  return (
    <section className="section" id="faq">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">VOS QUESTIONS</div>
          <h2 className="section-title">
            Tout ce que vous voulez<br /><em>savoir.</em>
          </h2>
        </Reveal>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="faq-item">
                <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}
                  <span className={`faq-arrow ${open === i ? "open" : ""}`}>▼</span>
                </button>
                {open === i && <div className="faq-answer">{f.a}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="cta-section noise" id="contact">
      <div className="cta-inner">
        <Reveal>
          <div>
            <div className="section-label">CANDIDATER</div>
            <h2 className="cta-title">
              Votre salon mérite<br /><em>d'être représenté.</em>
            </h2>
            <p className="cta-desc">
              La Loge construit le premier réseau de salons d'exception en France. Les candidatures sont ouvertes.
            </p>
            <div className="cta-promises">
              {[
                "Une conciergerie dédiée qui négocie pour vous",
                "Des conditions que vous n'obtiendriez pas seul",
                "Votre profil visible auprès des marques du réseau",
                "Aucun frais, aucun engagement, aucune exclusivité — jamais",
              ].map((p, i) => (
                <div className="cta-promise" key={i}>
                  <span className="cta-promise-icon">✅</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="cta-form">
            <div className="form-group">
              <label htmlFor="salon-name" className="form-label">NOM DU SALON</label>
              <input id="salon-name" className="form-input" placeholder="Ex : Salon Éclat" aria-required="true" />
            </div>
            <div className="form-group">
              <label htmlFor="city" className="form-label">VILLE</label>
              <input id="city" className="form-input" placeholder="Ex : Lyon" aria-required="true" />
            </div>
            <div className="form-group">
              <label htmlFor="first-name" className="form-label">VOTRE PRÉNOM</label>
              <input id="first-name" className="form-input" placeholder="Ex : Sophie" aria-required="true" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">EMAIL PROFESSIONNEL</label>
              <input id="email" className="form-input" type="email" placeholder="Ex : sophie@salon-eclat.fr" aria-required="true" />
            </div>
            <div className="form-group">
              <label htmlFor="instagram" className="form-label">INSTAGRAM DU SALON (OPTIONNEL)</label>
              <input id="instagram" className="form-input" placeholder="Ex : @salon_eclat" />
            </div>
            <div className="form-group">
              <label htmlFor="interest" className="form-label">CE QUI VOUS INTÉRESSE LE PLUS</label>
              <select id="interest" className="form-select" aria-required="true">
                <option value="">Sélectionnez...</option>
                <option>Accéder à des marques premium inaccessibles aujourd'hui</option>
                <option>Obtenir de meilleures conditions sur mes marques actuelles</option>
                <option>Avoir quelqu'un qui négocie pour moi</option>
                <option>Faire reconnaître la valeur de mon salon et de mon travail</option>
                <option>Tout ça à la fois</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="current-brands" className="form-label">VOS MARQUES ACTUELLES (OPTIONNEL)</label>
              <input id="current-brands" className="form-input" placeholder="Ex : L'Oréal Pro, Schwarzkopf, Davines..." />
            </div>
            <div className="form-checkbox">
              <input type="checkbox" id="rgpd-consent" aria-required="true" />
              <label htmlFor="rgpd-consent">
                En candidatant, vous acceptez que La Loge analyse votre salon pour le matching avec les marques partenaires, conformément à notre{" "}
                <a href="#">politique de confidentialité</a>. Aucune donnée n'est revendue.
              </label>
            </div>
            <button className="form-submit">SOUMETTRE MA CANDIDATURE</button>
            <div className="form-note">Résultat sous 48h · 100 % gratuit · Annulable à tout moment</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}



function Footer() {
  return (
    <footer>
      <div className="footer-brand-strip">
        <div className="footer-brand-inner">
          <div>
            <div className="footer-brand-label">POUR LES MARQUES</div>
            <div className="footer-brand-title">Vous cherchez des salons qui portent votre image ?</div>
            <div className="footer-brand-desc">La Loge identifie les salons qui correspondent à votre positionnement — des prescripteurs engagés, pas des points de vente. Matching par affinité, mise en relation directe.</div>
          </div>
          <a href="mailto:marques@laloge-beaute.com" className="footer-brand-cta">marques@laloge-beaute.com →</a>
        </div>
      </div>
      <div className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">L A&nbsp;&nbsp;L O G E</div>
            <div className="footer-tagline">Conciergerie des salons indépendants</div>
          </div>
          <div className="footer-links">
            <a href="#concept">Le concept</a>
            <a href="#profil">Votre profil</a>
            <a href="#faq">FAQ</a>
            <a href="mailto:bonjour@laloge-beaute.com">bonjour@laloge-beaute.com</a>
          </div>
          <div className="footer-links">
            <a href="#">Mentions légales</a>
            <a href="#">Confidentialité</a>
            <span style={{ color: C.stone }}>© 2025 La Loge. Tous droits réservés.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{css}</style>
      <a href="#main-content" className="skip-link">Aller au contenu principal</a>
      <Nav />
      <main id="main-content">
        <Hero />
        <Banner />
        <Tribute />
        <DoubleMandat />
        <Problem />
        <Inversion />
        <HowItWorks />
        <ScoreLaLoge />
        <Conciergerie />
        <BeforeAfter />
        <Testimonials />
        <Philosophy />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
