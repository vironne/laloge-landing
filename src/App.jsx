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

.hero { min-height: 100vh; display: flex; position: relative; }
.hero-side { display: flex; flex-direction: column; justify-content: center; padding: 140px 64px 80px; position: relative; overflow: hidden; flex: 1; transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
.hero-side .hero-content { transition: opacity 0.4s ease, transform 0.4s ease; }
.hero-left { background: var(--ink); color: var(--creme); }
.hero-right { background: var(--paper); color: var(--ink); }
@media (min-width: 901px) {
  .hero:hover .hero-side { flex: 0.6; }
  .hero:hover .hero-side .hero-content { opacity: 0.3; transform: scale(0.96); }
  .hero .hero-side:hover { flex: 1.4; }
  .hero .hero-side:hover .hero-content { opacity: 1 !important; transform: scale(1) !important; }
}
.hero-label { font-size: 10px; letter-spacing: 3px; font-weight: 500; margin-bottom: 24px; }
.hero-left .hero-label { color: ${C.bronze}; }
.hero-right .hero-label { color: var(--terre); opacity: 0.6; }
.hero-title { font-family: var(--serif); font-size: clamp(32px, 4vw, 48px); line-height: 1.15; margin-bottom: 20px; font-weight: 400; }
.hero-title em { font-style: italic; color: ${C.bronze}; }
.hero-desc { font-size: 15px; line-height: 1.7; opacity: 0.75; max-width: 400px; margin-bottom: 36px; font-weight: 300; }
.hero-btn { display: inline-block; padding: 14px 36px; font-family: var(--sans); font-size: 12px; letter-spacing: 1.5px; font-weight: 500; text-decoration: none; border: 1px solid; cursor: pointer; transition: all 0.3s; }
.btn-light { color: var(--creme); border-color: ${C.bronze}; background: transparent; }
.btn-light:hover { background: ${C.bronze}; color: var(--ink); }
.btn-dark { color: var(--ink); border-color: var(--terre); background: transparent; }
.btn-dark:hover { background: var(--ink); color: var(--creme); }
.hero-stat { display: flex; gap: 40px; margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); }
.hero-right .hero-stat { border-color: var(--sand); }
.stat-num { font-family: var(--serif); font-size: 28px; display: block; }
.stat-label { font-size: 11px; opacity: 0.5; margin-top: 4px; letter-spacing: 0.5px; }

.section { padding: 120px 48px; position: relative; }
.section-dark { background: var(--ink); color: var(--creme); }
.section-creme { background: var(--creme); }
.section-label { font-size: 10px; letter-spacing: 3px; font-weight: 500; color: ${C.bronze}; margin-bottom: 16px; }
.section-title { font-family: var(--serif); font-size: clamp(28px, 3.5vw, 42px); line-height: 1.2; margin-bottom: 16px; font-weight: 400; }
.section-title em { font-style: italic; }
.section-subtitle { font-size: 15px; line-height: 1.7; color: var(--stone); max-width: 560px; font-weight: 300; }
.section-dark .section-subtitle { color: var(--lin); }
.section-inner { max-width: 1160px; margin: 0 auto; }

.match-visual { display: flex; align-items: center; justify-content: center; gap: 0; margin-top: 64px; position: relative; }
.match-actor { flex: 1; max-width: 320px; padding: 40px 32px; text-align: center; position: relative; }
.match-actor-icon { font-size: 40px; margin-bottom: 16px; display: block; opacity: 0.7; }
.match-actor-title { font-family: var(--serif); font-size: 22px; margin-bottom: 8px; }
.match-actor-desc { font-size: 13px; color: var(--stone); font-weight: 300; line-height: 1.6; }
.match-engine { flex: 0 0 200px; text-align: center; position: relative; z-index: 2; }
.match-engine-circle { width: 140px; height: 140px; border-radius: 50%; background: var(--ink); display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; position: relative; box-shadow: 0 8px 40px rgba(27,27,25,0.12); }
.match-engine-score { font-family: var(--serif); font-size: 36px; color: ${C.bronze}; line-height: 1; }
.match-engine-label { font-size: 9px; letter-spacing: 2px; color: var(--lin); margin-top: 6px; font-weight: 500; }
.match-engine-title { font-family: var(--serif); font-size: 14px; color: var(--ink); margin-top: 16px; letter-spacing: 0.5px; }
.match-line { position: absolute; top: 50%; height: 1px; background: linear-gradient(90deg, transparent, ${C.sand}, transparent); z-index: 0; }
.match-line-left { left: 0; right: 50%; transform: translateY(-50%); }
.match-line-right { left: 50%; right: 0; transform: translateY(-50%); }

.match-criteria { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 48px; }
.match-tag { padding: 8px 18px; font-size: 12px; letter-spacing: 0.5px; font-weight: 400; color: var(--stone); border: 1px solid var(--sand); background: var(--paper); transition: all 0.3s; }
.match-tag:hover { border-color: ${C.bronze}; color: var(--ink); }

.match-bottom { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--sand); }
.match-bottom-num { font-family: var(--serif); font-size: 40px; color: var(--terre); }
.match-bottom-label { font-size: 13px; color: var(--stone); margin-top: 6px; font-weight: 300; line-height: 1.5; }

.match-pulse { animation: pulse 2.5s ease-in-out infinite; }
@keyframes pulse {
  0%, 100% { box-shadow: 0 8px 40px rgba(27,27,25,0.12); }
  50% { box-shadow: 0 8px 40px rgba(27,27,25,0.12), 0 0 0 12px rgba(158,139,110,0.08); }
}

.match-tags-anim .match-tag { opacity: 0; transform: translateY(10px); animation: tagIn 0.4s ease forwards; }
.match-tags-anim .match-tag:nth-child(1) { animation-delay: 0s; }
.match-tags-anim .match-tag:nth-child(2) { animation-delay: 0.06s; }
.match-tags-anim .match-tag:nth-child(3) { animation-delay: 0.12s; }
.match-tags-anim .match-tag:nth-child(4) { animation-delay: 0.18s; }
.match-tags-anim .match-tag:nth-child(5) { animation-delay: 0.24s; }
.match-tags-anim .match-tag:nth-child(6) { animation-delay: 0.30s; }
.match-tags-anim .match-tag:nth-child(7) { animation-delay: 0.36s; }
.match-tags-anim .match-tag:nth-child(8) { animation-delay: 0.42s; }
@keyframes tagIn { to { opacity: 1; transform: translateY(0); } }

.tiers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 64px; }
.tier-card { padding: 40px 32px; position: relative; border: 1px solid rgba(255,255,255,0.08); transition: transform 0.3s, border-color 0.3s; }
.tier-card:hover { transform: translateY(-4px); border-color: ${C.bronze}; }
.tier-featured { background: var(--terre); border-color: ${C.bronze}; }
.tier-badge { font-size: 9px; letter-spacing: 2.5px; font-weight: 600; margin-bottom: 20px; opacity: 0.5; }
.tier-featured .tier-badge { opacity: 0.8; color: var(--creme); }
.tier-price { font-family: var(--serif); font-size: 32px; margin-bottom: 8px; }
.tier-unit { font-size: 13px; opacity: 0.5; margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.tier-featured .tier-unit { border-color: rgba(255,255,255,0.15); }
.tier-features { list-style: none; }
.tier-features li { font-size: 13px; line-height: 1.6; padding: 6px 0; font-weight: 300; opacity: 0.75; padding-left: 16px; position: relative; }
.tier-features li::before { content: '—'; position: absolute; left: 0; color: ${C.bronze}; }
.tier-ideal { margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); font-style: italic; font-family: var(--serif); font-size: 13px; opacity: 0.6; }
.tier-featured .tier-ideal { border-color: rgba(255,255,255,0.15); opacity: 0.8; }

.proof-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 64px; }
.proof-card { background: var(--paper); padding: 40px; position: relative; border-left: 3px solid ${C.bronze}; }
.proof-quote { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink); margin-bottom: 24px; font-style: italic; }
.proof-open { font-family: var(--serif); font-size: 64px; color: var(--sand); line-height: 0; position: absolute; top: 48px; left: 20px; opacity: 0.4; }
.proof-author { font-size: 13px; color: var(--stone); font-weight: 400; }
.proof-role { font-size: 11px; color: ${C.warmGrey}; margin-top: 2px; }
.proof-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--sand); }
.proof-stat-num { font-family: var(--serif); font-size: 48px; color: var(--terre); }
.proof-stat-label { font-size: 13px; color: var(--stone); margin-top: 8px; font-weight: 300; line-height: 1.5; }

.cta-section { padding: 120px 48px; background: var(--ink); color: var(--creme); position: relative; overflow: hidden; }
.cta-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.cta-title { font-family: var(--serif); font-size: clamp(28px, 3vw, 40px); line-height: 1.2; margin-bottom: 16px; }
.cta-title em { font-style: italic; color: ${C.bronze}; }
.cta-desc { font-size: 15px; line-height: 1.7; color: var(--lin); font-weight: 300; margin-bottom: 32px; }
.cta-steps { display: flex; flex-direction: column; gap: 16px; }
.cta-step { display: flex; gap: 16px; align-items: flex-start; }
.cta-step-num { font-family: var(--serif); font-size: 20px; color: ${C.bronze}; min-width: 28px; }
.cta-step-text { font-size: 13px; color: var(--lin); font-weight: 300; line-height: 1.5; }

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

.footer { padding: 48px; background: ${C.charcoal}; display: flex; justify-content: space-between; align-items: center; color: var(--stone); font-size: 12px; border-top: 1px solid rgba(255,255,255,0.05); }
.footer-logo { font-family: var(--serif); font-size: 16px; letter-spacing: 3px; color: var(--lin); }
.footer-links { display: flex; gap: 24px; }
.footer-links a { color: var(--stone); text-decoration: none; font-size: 12px; transition: color 0.2s; }
.footer-links a:hover { color: var(--creme); }

@media (max-width: 900px) {
  .hero { flex-direction: column; }
  .hero-side { padding: 80px 24px 48px; min-height: auto; }
  .hero-left { min-height: 100svh; }
  .hero-right { min-height: 80svh; }
  .hero-title { font-size: 36px; }
  .hero-desc { font-size: 15px; line-height: 1.75; max-width: 100%; }
  .hero-btn { padding: 16px 32px; font-size: 13px; width: 100%; text-align: center; }
  .hero-stat { gap: 24px; flex-wrap: wrap; }
  .stat-num { font-size: 24px; }

  .nav { padding: 14px 20px; }
  .nav-logo { font-size: 15px; letter-spacing: 2.5px; }
  .nav-sub { font-size: 8px; }
  .nav-links a:not(.nav-cta) { display: none; }
  .nav-cta { padding: 10px 20px !important; font-size: 11px !important; }

  .section { padding: 64px 20px; }
  .section-title { font-size: 28px; }
  .section-subtitle { font-size: 14px; }

  .match-visual { flex-direction: column; gap: 0; margin-top: 40px; }
  .match-actor { max-width: 100%; padding: 24px 0; }
  .match-engine { flex: none; width: 100%; margin: 8px 0; }
  .match-engine-circle { width: 110px; height: 110px; }
  .match-engine-score { font-size: 28px; }
  .match-line { display: none; }
  .match-criteria { margin-top: 32px; }
  .match-tag { font-size: 12px; padding: 7px 14px; }
  .match-bottom { grid-template-columns: 1fr; gap: 28px; margin-top: 40px; padding-top: 32px; }
  .match-bottom-num { font-size: 36px; }

  .tiers-grid { grid-template-columns: 1fr; gap: 16px; margin-top: 40px; }
  .tier-card { padding: 32px 24px; }
  .tier-price { font-size: 28px; }
  .tier-features li { font-size: 14px; padding: 5px 0; }
  .tier-ideal { font-size: 14px; }

  .proof-grid { grid-template-columns: 1fr; gap: 20px; margin-top: 40px; }
  .proof-card { padding: 28px 24px; }
  .proof-quote { font-size: 16px; }
  .proof-open { font-size: 48px; top: 36px; left: 14px; }
  .proof-stats { grid-template-columns: 1fr; gap: 32px; margin-top: 40px; padding-top: 32px; }
  .proof-stat-num { font-size: 40px; }
  .proof-stat-label { font-size: 14px; }

  .cta-section { padding: 64px 20px; }
  .cta-inner { grid-template-columns: 1fr; gap: 40px; }
  .cta-title { font-size: 28px; }
  .cta-desc { font-size: 14px; }
  .cta-form { padding: 28px 20px; }
  .form-input { font-size: 16px; padding: 14px 0; }
  .form-select { font-size: 16px; padding: 14px 0; }
  .form-submit { padding: 18px; font-size: 13px; }

  .footer { flex-direction: column; gap: 20px; text-align: center; padding: 36px 20px; }
  .footer-links { flex-direction: column; gap: 12px; }
  .footer-links a { font-size: 13px; }
}

@media (max-width: 400px) {
  .hero-side { padding: 72px 18px 40px; }
  .hero-title { font-size: 30px; }
  .section { padding: 52px 16px; }
  .cta-form { padding: 24px 16px; }
  .nav { padding: 12px 16px; }
}
`;

function Nav() {
  return (
    <nav className="nav">
      <div>
        <div className="nav-logo">L A&nbsp;&nbsp;L O G E</div>
        <div className="nav-sub">CONCIERGERIE BEAUTÉ</div>
      </div>
      <div className="nav-links">
        <a href="#methode">Matching</a>
        <a href="#offre">Offre</a>
        <a href="#resultats">Résultats</a>
        <a href="#contact" className="nav-cta">PRENDRE RDV</a>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(null); // "left" | "right" | null
  const heroRef = useRef(null);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const anim = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.8s ease ${d}s, transform 0.8s ease ${d}s`,
  });

  const dividerLeft = hovered === "left" ? "70%" : hovered === "right" ? "30%" : "50%";

  return (
    <section className="hero" ref={heroRef}>
      <div
        className="hero-side hero-left noise"
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="hero-content">
          <div style={anim(0.2)}><div className="hero-label">POUR LES MARQUES</div></div>
          <div style={anim(0.35)}>
            <h1 className="hero-title">Accédez aux<br />meilleurs salons<br /><em>d'Europe.</em></h1>
          </div>
          <div style={anim(0.5)}>
            <p className="hero-desc">Des leads qualifiés, intentionnistes, scorés par IA. Zéro coût fixe. Vous ne payez qu'au résultat.</p>
          </div>
          <div style={anim(0.65)}><a href="#offre" className="hero-btn btn-light">DÉCOUVRIR L'OFFRE</a></div>
          <div className="hero-stat" style={anim(0.8)}>
            <div><span className="stat-num">78 Md€</span><span className="stat-label">Marché européen</span></div>
            <div><span className="stat-num">400K+</span><span className="stat-label">Salons en Europe</span></div>
          </div>
        </div>
      </div>
      <div
        className="hero-side hero-right noise"
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="hero-content">
          <div style={anim(0.3)}><div className="hero-label">POUR LES SALONS</div></div>
          <div style={anim(0.45)}>
            <h1 className="hero-title">Choisissez les<br />marques qui vous<br /><em>correspondent.</em></h1>
          </div>
          <div style={anim(0.6)}>
            <p className="hero-desc" style={{ color: C.stone }}>Recevez des propositions de marques premium sélectionnées pour vous. Gratuit. Sans engagement. Vous décidez.</p>
          </div>
          <div style={anim(0.75)}><a href="#contact" className="hero-btn btn-dark">REJOINDRE LE RÉSEAU</a></div>
          <div className="hero-stat" style={anim(0.9)}>
            <div><span className="stat-num">12</span><span className="stat-label">Critères de qualification</span></div>
            <div><span className="stat-num">100%</span><span className="stat-label">Gratuit pour les salons</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Matching() {
  const [ref, visible] = useReveal(0.1);
  const tags = [
    "Positionnement", "Zone géographique", "Spécialités",
    "Marques actuelles", "Taille du salon", "Clientèle cible", "Potentiel de croissance",
  ];
  return (
    <section className="section" id="methode">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">NOTRE TECHNOLOGIE</div>
          <h2 className="section-title">Un algorithme de matching<br /><em>qui crée les bonnes rencontres.</em></h2>
          <p className="section-subtitle">Notre système analyse une multitude de critères pour chaque salon et chaque marque, puis calcule un score d'affinité unique. Résultat : des connexions pertinentes pour les deux parties.</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="match-visual">
            <div className="match-line match-line-left" />
            <div className="match-line match-line-right" />
            <div className="match-actor">
              <span className="match-actor-icon" role="img" aria-label="marque">&#9670;</span>
              <div className="match-actor-title">La Marque</div>
              <div className="match-actor-desc">Ses gammes, son positionnement, ses zones cibles, son historique distribution.</div>
            </div>
            <div className="match-engine">
              <div className="match-engine-circle match-pulse">
                <div className="match-engine-score">87</div>
                <div className="match-engine-label">SCORE D'AFFINITÉ</div>
              </div>
              <div className="match-engine-title">Algorithme La Loge</div>
            </div>
            <div className="match-actor">
              <span className="match-actor-icon" role="img" aria-label="salon">&#9676;</span>
              <div className="match-actor-title">Le Salon</div>
              <div className="match-actor-desc">Son CA, ses spécialités, sa clientèle, ses marques actuelles, ses attentes.</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div ref={ref} className={`match-criteria ${visible ? "match-tags-anim" : ""}`}>
            {tags.map((t, i) => (
              <span className="match-tag" key={i}>{t}</span>
            ))}
          </div>
        </Reveal>

        <div className="match-bottom">
          {[
            { num: "0–100", label: "Score d'affinité calculé\npour chaque paire" },
            { num: "Multi-critères", label: "Analyse croisée de\ndizaines de paramètres" },
            { num: "Temps réel", label: "Mise à jour continue\nselon l'évolution du marché" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div className="match-bottom-num">{s.num}</div>
                <div className="match-bottom-label" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tiers() {
  const tiers = [
    { name: "INTELLIGENCE", price: "Sur devis", unit: "adapté à vos besoins", features: ["Profils enrichis (spécialités, marques)", "Score d'affinité IA avec votre marque", "Export CSV pour intégration CRM"], ideal: "Alimenter votre force de vente en data actionnable" },
    { name: "CONCIERGE", price: "Sur devis", unit: "adapté à vos objectifs", featured: true, features: ["Tout Intelligence inclus", "Mise en relation personnalisée", "Salons avec intérêt actif confirmé", "RDV qualifié livré"], ideal: "Lancer une gamme, pénétrer un territoire" },
    { name: "PARTNERSHIP", price: "Sur devis", unit: "adapté à l'ambition", features: ["Tout Concierge inclus", "Accompagnement jusqu'à la signature", "Account manager dédié", "Suivi post-signature 6 mois"], ideal: "Déploiement national, partenariat structurant" },
  ];
  return (
    <section className="section section-dark noise" id="offre">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">OFFRE PARTENAIRES</div>
          <h2 className="section-title" style={{ color: C.creme }}>Trois niveaux.<br /><em>Un seul objectif.</em></h2>
        </Reveal>
        <div className="tiers-grid">
          {tiers.map((t, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className={`tier-card ${t.featured ? "tier-featured" : ""}`}>
                <div className="tier-badge">{t.name}</div>
                <div className="tier-price">{t.price}</div>
                <div className="tier-unit">{t.unit}</div>
                <ul className="tier-features">{t.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
                <div className="tier-ideal">Idéal pour : {t.ideal}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="section section-creme" id="resultats">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">RÉSULTATS</div>
          <h2 className="section-title">Ce qu'ils <em>en disent.</em></h2>
        </Reveal>
        <div className="proof-grid">
          {[
            { quote: "En 3 semaines, La Loge nous a livré 50 leads qualifiés avec un score moyen de 82. Notre taux de conversion a doublé par rapport au terrain.", author: "Directrice commerciale", role: "Groupe beauté professionnelle — France" },
            { quote: "On a enfin accès à des marques qui correspondent à notre positionnement. Pas du démarchage, une vraie sélection personnalisée.", author: "Gérante de salon", role: "12 fauteuils — Lyon" },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="proof-card">
                <span className="proof-open">"</span>
                <p className="proof-quote">{t.quote}</p>
                <div className="proof-author">{t.author}</div>
                <div className="proof-role">{t.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="proof-stats">
          {[
            { num: "5,1×", label: "ROI moyen constaté\nsur l'offre Concierge" },
            { num: "42%", label: "Taux de conversion\ndes leads qualifiés" },
            { num: "÷10", label: "Coût par lead\nvs prospection terrain" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div className="proof-stat-num">{s.num}</div>
                <div className="proof-stat-label" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const [profile, setProfile] = useState("marque");
  return (
    <section className="cta-section noise" id="contact">
      <div className="cta-inner">
        <Reveal>
          <div>
            <div className="section-label">COMMENCER</div>
            <h2 className="cta-title">Prêt à transformer<br />votre <em>approche salon ?</em></h2>
            <p className="cta-desc">30 minutes pour comprendre votre marque, vos objectifs, vos zones prioritaires. Sans engagement.</p>
            <div className="cta-steps">
              {[
                { n: "01", t: "Appel de découverte — 30 min" },
                { n: "02", t: "Calibrage de l'offre sur mesure" },
                { n: "03", t: "Pilote 30 jours — zéro engagement" },
                { n: "04", t: "Déploiement si le pilote performe" },
              ].map((s, i) => (
                <div className="cta-step" key={i}>
                  <span className="cta-step-num">{s.n}</span>
                  <span className="cta-step-text">{s.t}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="cta-form">
            <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
              {["marque", "salon"].map((p) => (
                <button key={p} onClick={() => setProfile(p)} style={{
                  flex: 1, padding: "14px 8px",
                  background: profile === p ? C.bronze : "transparent",
                  color: profile === p ? C.ink : C.stone,
                  border: `1px solid ${profile === p ? C.bronze : "rgba(255,255,255,0.1)"}`,
                  fontFamily: "var(--sans)", fontSize: "11px", letterSpacing: "1px",
                  fontWeight: 500, cursor: "pointer", transition: "all 0.3s", textTransform: "uppercase",
                  WebkitTapHighlightColor: "transparent",
                }}>{p === "marque" ? "JE SUIS UNE MARQUE" : "JE SUIS UN SALON"}</button>
              ))}
            </div>
            <div className="form-group">
              <label className="form-label">{profile === "marque" ? "NOM DE LA MARQUE" : "NOM DU SALON"}</label>
              <input className="form-input" placeholder={profile === "marque" ? "Ex: Wella Professionals" : "Ex: Salon Élégance"} />
            </div>
            <div className="form-group">
              <label className="form-label">VOTRE NOM</label>
              <input className="form-input" placeholder="Prénom Nom" />
            </div>
            <div className="form-group">
              <label className="form-label">EMAIL PROFESSIONNEL</label>
              <input className="form-input" type="email" placeholder="vous@entreprise.com" />
            </div>
            {profile === "marque" ? (
              <div className="form-group">
                <label className="form-label">OBJECTIF PRINCIPAL</label>
                <select className="form-select">
                  <option value="">Sélectionnez...</option>
                  <option>Lancement de gamme</option>
                  <option>Pénétration territoriale</option>
                  <option>Déploiement national</option>
                  <option>Data & intelligence salon</option>
                </select>
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">NOMBRE DE FAUTEUILS</label>
                <select className="form-select">
                  <option value="">Sélectionnez...</option>
                  <option>1-3 fauteuils</option>
                  <option>4-8 fauteuils</option>
                  <option>9+ fauteuils</option>
                </select>
              </div>
            )}
            <button className="form-submit">{profile === "marque" ? "RÉSERVER MON APPEL DÉCOUVERTE" : "REJOINDRE LE RÉSEAU LA LOGE"}</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer-logo">L A&nbsp;&nbsp;L O G E</div>
        <div style={{ fontSize: "10px", marginTop: "4px", letterSpacing: "1px" }}>Conciergerie Beauté</div>
      </div>
      <div className="footer-links">
        <a href="#">Mentions légales</a>
        <a href="#">Confidentialité</a>
        <a href="#">bonjour@laloge-beaute.com</a>
      </div>
      <div style={{ fontSize: "11px" }}>© 2026 La Loge</div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{css}</style>
      <Nav />
      <Hero />
      <Matching />
      <Tiers />
      <SocialProof />
      <CTA />
      <Footer />
    </>
  );
}
