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
.hero-title { font-family: var(--serif); font-size: clamp(36px, 5.5vw, 64px); line-height: 1.12; margin-bottom: 24px; font-weight: 400; max-width: 800px; }
.hero-title em { font-style: italic; color: ${C.bronze}; }
.hero-desc { font-size: 17px; line-height: 1.8; color: var(--lin); max-width: 560px; margin: 0 auto 40px; font-weight: 300; }
.hero-btn { display: inline-block; padding: 16px 40px; font-family: var(--sans); font-size: 12px; letter-spacing: 1.5px; font-weight: 500; text-decoration: none; border: 1px solid ${C.bronze}; color: var(--creme); background: transparent; cursor: pointer; transition: all 0.3s; }
.hero-btn:hover { background: ${C.bronze}; color: var(--ink); }
.hero-btn-secondary { margin-left: 16px; border-color: rgba(255,255,255,0.15); color: var(--lin); }
.hero-btn-secondary:hover { border-color: var(--lin); background: transparent; color: var(--creme); }
.hero-stats { display: flex; gap: 48px; margin-top: 56px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); }
.stat-num { font-family: var(--serif); font-size: 28px; display: block; color: ${C.bronze}; }
.stat-label { font-size: 11px; color: var(--lin); opacity: 0.7; margin-top: 4px; letter-spacing: 0.5px; }

/* ── Sections ── */
.section { padding: 120px 48px; position: relative; }
.section-dark { background: var(--ink); color: var(--creme); }
.section-creme { background: var(--creme); }
.section-label { font-size: 10px; letter-spacing: 3px; font-weight: 500; color: ${C.bronze}; margin-bottom: 16px; }
.section-title { font-family: var(--serif); font-size: clamp(28px, 3.5vw, 42px); line-height: 1.2; margin-bottom: 16px; font-weight: 400; }
.section-title em { font-style: italic; }
.section-subtitle { font-size: 15px; line-height: 1.7; color: var(--stone); max-width: 560px; font-weight: 300; }
.section-dark .section-subtitle { color: var(--lin); }
.section-inner { max-width: 1160px; margin: 0 auto; }

/* ── Pain Points ── */
.pain-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; margin-top: 64px; }
.pain-card { padding: 36px 28px; border: 1px solid var(--sand); background: var(--paper); position: relative; transition: transform 0.3s, border-color 0.3s; }
.pain-card:hover { transform: translateY(-4px); border-color: ${C.bronze}; }
.pain-icon { font-size: 28px; margin-bottom: 16px; display: block; }
.pain-title { font-family: var(--serif); font-size: 19px; margin-bottom: 10px; line-height: 1.3; }
.pain-desc { font-size: 14px; color: var(--stone); font-weight: 300; line-height: 1.65; }

/* ── How it works ── */
.how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 64px; position: relative; }
.how-step { text-align: center; padding: 0 16px; }
.how-num { font-family: var(--serif); font-size: 48px; color: ${C.bronze}; line-height: 1; margin-bottom: 16px; }
.how-step-title { font-family: var(--serif); font-size: 20px; margin-bottom: 10px; }
.how-step-desc { font-size: 14px; color: var(--lin); font-weight: 300; line-height: 1.65; }
.how-connector { position: absolute; top: 36px; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent); }
.how-connector-1 { left: 33%; right: 50%; }
.how-connector-2 { left: 50%; right: 33%; }

/* ── Benefits ── */
.benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 64px; }
.benefit-card { display: flex; gap: 20px; padding: 32px 28px; border: 1px solid var(--sand); background: var(--white); transition: transform 0.3s, border-color 0.3s; }
.benefit-card:hover { transform: translateY(-3px); border-color: ${C.bronze}; }
.benefit-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
.benefit-title { font-family: var(--serif); font-size: 17px; margin-bottom: 6px; }
.benefit-desc { font-size: 13px; color: var(--stone); font-weight: 300; line-height: 1.6; }
.benefit-highlight { margin-top: 64px; text-align: center; padding: 48px 32px; background: var(--ink); color: var(--creme); }
.benefit-highlight-title { font-family: var(--serif); font-size: 28px; margin-bottom: 12px; }
.benefit-highlight-title em { font-style: italic; color: ${C.bronze}; }
.benefit-highlight-desc { font-size: 15px; color: var(--lin); font-weight: 300; }

/* ── Social proof ── */
.proof-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 64px; }
.proof-card { background: var(--paper); padding: 40px; position: relative; border-left: 3px solid ${C.bronze}; }
.proof-quote { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink); margin-bottom: 24px; font-style: italic; }
.proof-open { font-family: var(--serif); font-size: 64px; color: var(--sand); line-height: 0; position: absolute; top: 48px; left: 20px; opacity: 0.4; }
.proof-author { font-size: 13px; color: var(--stone); font-weight: 400; }
.proof-role { font-size: 11px; color: ${C.warmGrey}; margin-top: 2px; }
.proof-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--sand); }
.proof-stat-num { font-family: var(--serif); font-size: 48px; color: var(--terre); }
.proof-stat-label { font-size: 13px; color: var(--stone); margin-top: 8px; font-weight: 300; line-height: 1.5; }

/* ── FAQ ── */
.faq-list { max-width: 720px; margin: 48px auto 0; }
.faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); }
.faq-question { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 24px 0; font-family: var(--serif); font-size: 18px; color: var(--creme); background: none; border: none; cursor: pointer; text-align: left; }
.faq-question:hover { color: ${C.bronze}; }
.faq-arrow { font-size: 14px; color: ${C.bronze}; transition: transform 0.3s; flex-shrink: 0; margin-left: 16px; }
.faq-arrow.open { transform: rotate(180deg); }
.faq-answer { font-size: 14px; color: var(--lin); font-weight: 300; line-height: 1.7; padding: 0 0 24px; }

/* ── CTA ── */
.cta-section { padding: 120px 48px; background: var(--ink); color: var(--creme); position: relative; overflow: hidden; }
.cta-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
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

/* ── Brand banner ── */
.brand-banner { padding: 64px 48px; background: var(--creme); text-align: center; }
.brand-banner-title { font-family: var(--serif); font-size: 22px; margin-bottom: 8px; }
.brand-banner-title em { font-style: italic; }
.brand-banner-desc { font-size: 14px; color: var(--stone); font-weight: 300; margin-bottom: 20px; }
.brand-banner-link { font-size: 13px; color: var(--ink); font-weight: 500; text-decoration: none; letter-spacing: 0.5px; border-bottom: 1px solid ${C.bronze}; padding-bottom: 2px; transition: color 0.2s; }
.brand-banner-link:hover { color: var(--terre); }

/* ── Footer ── */
.footer { padding: 48px; background: ${C.charcoal}; display: flex; justify-content: space-between; align-items: center; color: var(--stone); font-size: 12px; border-top: 1px solid rgba(255,255,255,0.05); }
.footer-logo { font-family: var(--serif); font-size: 16px; letter-spacing: 3px; color: var(--lin); }
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
  .hero-title { font-size: 36px; }
  .hero-desc { font-size: 15px; max-width: 100%; }
  .hero-btn { padding: 16px 28px; font-size: 12px; }
  .hero-btn-secondary { margin-left: 0; margin-top: 12px; }
  .hero-btns { display: flex; flex-direction: column; align-items: center; gap: 0; }
  .hero-stats { gap: 24px; flex-wrap: wrap; justify-content: center; }
  .stat-num { font-size: 24px; }

  .nav { padding: 14px 20px; }
  .nav-logo { font-size: 15px; letter-spacing: 2.5px; }
  .nav-sub { font-size: 8px; }
  .nav-links a:not(.nav-cta) { display: none; }
  .nav-cta { padding: 10px 20px !important; font-size: 11px !important; }

  .section { padding: 64px 20px; }
  .section-title { font-size: 28px; }
  .section-subtitle { font-size: 14px; }

  .pain-grid { grid-template-columns: 1fr; gap: 16px; margin-top: 40px; }
  .pain-card { padding: 28px 24px; }

  .how-grid { grid-template-columns: 1fr; gap: 40px; margin-top: 40px; }
  .how-connector { display: none; }

  .benefits-grid { grid-template-columns: 1fr; gap: 16px; margin-top: 40px; }
  .benefit-card { padding: 24px 20px; }
  .benefit-highlight { padding: 36px 24px; margin-top: 40px; }

  .proof-grid { grid-template-columns: 1fr; gap: 20px; margin-top: 40px; }
  .proof-card { padding: 28px 24px; }
  .proof-quote { font-size: 16px; }
  .proof-open { font-size: 48px; top: 36px; left: 14px; }
  .proof-stats { grid-template-columns: 1fr; gap: 32px; margin-top: 40px; padding-top: 32px; }

  .faq-question { font-size: 16px; }

  .cta-section { padding: 64px 20px; }
  .cta-inner { grid-template-columns: 1fr; gap: 40px; }
  .cta-title { font-size: 28px; }
  .cta-desc { font-size: 14px; }
  .cta-form { padding: 28px 20px; }
  .form-input { font-size: 16px; padding: 14px 0; }
  .form-select { font-size: 16px; padding: 14px 0; }
  .form-submit { padding: 18px; font-size: 13px; }

  .brand-banner { padding: 48px 20px; }

  .footer { flex-direction: column; gap: 20px; text-align: center; padding: 36px 20px; }
  .footer-links { flex-direction: column; gap: 12px; }
  .footer-links a { font-size: 13px; }
}

@media (max-width: 400px) {
  .hero { padding: 88px 18px 48px; }
  .hero-title { font-size: 30px; }
  .section { padding: 52px 16px; }
  .cta-form { padding: 24px 16px; }
  .nav { padding: 12px 16px; }
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
          <a href="#probleme">Le problème</a>
          <a href="#methode">Comment ça marche</a>
          <a href="#resultats">Résultats</a>
          <a href="#contact" className="nav-cta">REJOINDRE LA LOGE</a>
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
      <div style={anim(0.2)}><div className="hero-label">POUR LES SALONS QUI VEULENT MIEUX</div></div>
      <div style={anim(0.35)}>
        <h1 className="hero-title">
          Vos marques, vos conditions,<br />
          <em>votre choix.</em>
        </h1>
      </div>
      <div style={anim(0.5)}>
        <p className="hero-desc">
          Découvrez les marques premium qui correspondent vraiment à votre salon.
          Pas de commercial à attendre. Pas de minimum à respecter. Pas d'engagement à signer.
        </p>
      </div>
      <div style={anim(0.65)} className="hero-btns">
        <a href="#contact" className="hero-btn">CRÉER MON PROFIL GRATUIT</a>
        <a href="#probleme" style={{ color: C.lin, fontSize: "13px", textDecoration: "none", borderBottom: `1px solid ${C.stone}`, paddingBottom: "2px", marginLeft: "24px", transition: "color 0.2s" }}>Comprendre l'approche</a>
      </div>
      <div className="hero-stats" style={anim(0.8)}>
        <div><span className="stat-num">100%</span><span className="stat-label">Gratuit pour les salons</span></div>
        <div><span className="stat-num">0</span><span className="stat-label">Engagement minimum</span></div>
        <div><span className="stat-num">50+</span><span className="stat-label">Marques disponibles</span></div>
      </div>
    </section>
  );
}

function PainPoints() {
  const pains = [
    {
      icon: "🔒",
      title: "Les meilleures conditions ? Réservées aux gros.",
      desc: "Remises, animations, mobilier, exclusivités… Les grands groupes gardent le meilleur pour les chaînes et les franchises. Vous, vous prenez ce qui reste.",
    },
    {
      icon: "👻",
      title: "Captif ou invisible. Pas de troisième option.",
      desc: "Soit vous êtes lié à un fournisseur par un contrat d'exclusivité, soit votre commercial a disparu et personne ne répond. Aucune initiative possible de votre côté.",
    },
    {
      icon: "📱",
      title: "10K abonnés Instagram, 0 reconnaissance.",
      desc: "Vous faites rayonner la marque sur les réseaux, vous formez vos équipes, vous gagnez des prix… mais vous êtes traité exactement comme le salon d'à côté qui ne fait rien.",
    },
    {
      icon: "📦",
      title: "Minimums de commande délirants.",
      desc: "Pour tester une nouvelle gamme, on vous demande 2 000€ de stock minimum. Résultat : vous restez avec les mêmes produits depuis 5 ans.",
    },
  ];

  return (
    <section className="section" id="probleme">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">LE CONSTAT</div>
          <h2 id="probleme-salons" className="section-title">Le système actuel ne vous<br /><em>mérite pas.</em></h2>
          <p className="section-subtitle">Vous êtes au cœur de la beauté. Vous conseillez, vous prescrivez, vous fidélisez. Mais les marques vous traitent comme un point de vente interchangeable.</p>
        </Reveal>
        <div className="pain-grid">
          {pains.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="pain-card">
                <span className="pain-icon">{p.icon}</span>
                <div className="pain-title">{p.title}</div>
                <div className="pain-desc">{p.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section section-dark noise" id="methode">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">COMMENT ÇA MARCHE</div>
          <h2 id="comment-ca-marche" className="section-title" style={{ color: C.creme }}>
            Trois étapes.<br /><em>Vous décidez à chaque fois.</em>
          </h2>
          <p className="section-subtitle">
            La Loge analyse votre salon, identifie les marques qui vous correspondent vraiment,
            et vous les présente. Vous choisissez. Jamais l'inverse.
          </p>
        </Reveal>
        <div className="how-grid">
          <div className="how-connector how-connector-1" />
          <div className="how-connector how-connector-2" />
          {[
            {
              num: "01",
              title: "Votre profil salon",
              desc: "On analyse votre positionnement, vos spécialités, votre clientèle, vos marques actuelles et vos ambitions. 5 minutes, en ligne.",
            },
            {
              num: "02",
              title: "Le matching intelligent",
              desc: "Notre algorithme croise vos critères avec ceux des marques partenaires et calcule un score d'affinité. Seules les marques pertinentes apparaissent.",
            },
            {
              num: "03",
              title: "Vous choisissez",
              desc: "Vous recevez des propositions personnalisées avec les conditions associées. Vous acceptez celles qui vous intéressent. Rien de plus.",
            },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="how-step">
                <div className="how-num">{s.num}</div>
                <div className="how-step-title">{s.title}</div>
                <div className="how-step-desc">{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    {
      icon: "✦",
      title: "Marques premium accessibles",
      desc: "Accédez à des marques niches et premium habituellement réservées aux grands réseaux — sans attendre un démarchage.",
    },
    {
      icon: "✦",
      title: "Conditions négociées pour vous",
      desc: "La Loge négocie des conditions groupées. Vous bénéficiez de tarifs, d'animations et de support habituellement réservés aux chaînes.",
    },
    {
      icon: "✦",
      title: "Votre présence digitale valorisée",
      desc: "Votre engagement Instagram, vos avis Google, vos formations… tout compte dans votre score. Les marques voient enfin votre vraie valeur.",
    },
    {
      icon: "✦",
      title: "Zéro minimum, zéro engagement",
      desc: "Testez une marque sans commander 2 000€ de stock. Pas de contrat d'exclusivité. Vous gardez votre liberté totale.",
    },
    {
      icon: "✦",
      title: "Tout au même endroit",
      desc: "Plus besoin de courir les salons pro ou d'attendre un commercial. Découvrez, comparez et choisissez vos marques depuis un seul espace.",
    },
    {
      icon: "✦",
      title: "Un statut qui grandit avec vous",
      desc: "Plus vous contribuez à l'image des marques, plus vos conditions s'améliorent. Votre engagement est enfin récompensé.",
    },
  ];

  return (
    <section className="section">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">CE QUE VOUS Y GAGNEZ</div>
          <h2 id="avantages" className="section-title">Ce que La Loge change pour vous.<br /><em>Concrètement.</em></h2>
          <p className="section-subtitle">
            La Loge renverse le rapport de force. Ce n'est plus la marque qui vous choisit — c'est vous qui choisissez la marque.
          </p>
        </Reveal>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="benefit-card">
                <span className="benefit-icon" style={{ color: C.bronze }}>{b.icon}</span>
                <div>
                  <div className="benefit-title">{b.title}</div>
                  <div className="benefit-desc">{b.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className="benefit-highlight noise">
            <div className="benefit-highlight-title">La Loge est <em>100% gratuite</em> pour les salons.</div>
            <div className="benefit-highlight-desc">Ce sont les marques qui financent le service. Vous, vous en profitez.</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="section section-creme" id="resultats">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">TÉMOIGNAGES</div>
          <h2 id="temoignages" className="section-title">Ils ont rejoint <em>La Loge.</em></h2>
        </Reveal>
        <div className="proof-grid">
          {[
            {
              quote: "On a enfin accès à des marques qui correspondent à notre positionnement. Pas du démarchage agressif, une vraie sélection personnalisée. En 3 semaines on avait deux nouvelles marques en rayon.",
              author: "Sophie L.",
              role: "Gérante — 12 fauteuils, Lyon",
            },
            {
              quote: "J'avais l'impression de subir mes fournisseurs depuis des années. La Loge m'a permis de découvrir des marques premium que je ne connaissais même pas. Et les conditions sont meilleures qu'en direct.",
              author: "Marie D.",
              role: "Responsable — 6 fauteuils, Paris 11e",
            },
            {
              quote: "Ce qui m'a convaincue, c'est que mon travail sur Instagram est enfin reconnu. Mon score est élevé et les marques me proposent des conditions partenaires. Ça change tout.",
              author: "Camille R.",
              role: "Indépendante — 3 fauteuils, Bordeaux",
            },
            {
              quote: "Zéro engagement, zéro minimum de commande. J'ai pu tester une nouvelle marque premium sans risque. Mes clientes adorent et ma marge est bien meilleure qu'avec mon ancien fournisseur.",
              author: "Nathalie F.",
              role: "Coloriste — 8 fauteuils, Nantes",
            },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
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
            { num: "200+", label: "Salons dans le réseau\nLa Loge en France*" },
            { num: "+35%", label: "Marge moyenne constatée\nvs fournisseur historique*" },
            { num: "48h", label: "Délai moyen constaté pour\nune première proposition*" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div className="proof-stat-num">{s.num}</div>
                <div className="proof-stat-label" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: C.warmGrey, fontWeight: 300 }}>
          * Chiffres constatés sur le réseau La Loge — résultats non garantis, variables selon le profil du salon.
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: "C'est vraiment gratuit pour mon salon ?",
      a: "Oui, 100%. Ce sont les marques partenaires qui financent La Loge. Pour vous, l'inscription, le matching et les propositions sont entièrement gratuits. Pas de frais cachés, pas de commission sur vos commandes.",
    },
    {
      q: "Comment La Loge gagne-t-elle de l'argent si c'est gratuit pour moi ?",
      a: "Les marques nous versent une commission pour accéder à notre réseau de salons qualifiés. Cette commission est intégrée dans leurs budgets de distribution — elle ne vient jamais de votre marge. Vous payez le même prix (ou moins) qu'en direct.",
    },
    {
      q: "Quelles marques sont disponibles ?",
      a: "Nous travaillons avec plus de 50 marques coiffure et beauté, des marques niches et premium aux marques professionnelles reconnues. Le catalogue évolue chaque mois. Vous ne verrez que les marques pertinentes pour votre profil.",
    },
    {
      q: "Est-ce que je dois quitter mes marques actuelles ?",
      a: "Pas du tout. La Loge est complémentaire. Vous pouvez ajouter de nouvelles marques en parallèle de celles que vous avez déjà. Aucune exclusivité n'est demandée.",
    },
    {
      q: "Comment sont calculées les conditions ?",
      a: "Votre score de salon prend en compte votre positionnement, vos spécialités, votre présence digitale, vos avis clients et votre engagement. Plus votre score est élevé, meilleures sont les conditions proposées par les marques.",
    },
    {
      q: "Qu'est-ce que vous faites de mes données ?",
      a: "Vos données servent uniquement au matching avec les marques. Elles ne sont jamais revendues. Les marques ne voient votre profil détaillé que si vous acceptez une mise en relation. Vous gardez le contrôle.",
    },
    {
      q: "Combien de temps ça prend pour commencer ?",
      a: "5 minutes pour créer votre profil. Vous recevez vos premières propositions de marques sous 48h. Ensuite, c'est vous qui décidez du rythme.",
    },
  ];

  return (
    <section className="section section-dark noise">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">QUESTIONS FRÉQUENTES</div>
          <h2 id="faq" className="section-title" style={{ color: C.creme }}>
            Tout ce que vous voulez<br /><em>savoir.</em>
          </h2>
        </Reveal>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
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

function CTA() {
  return (
    <section className="cta-section noise" id="contact">
      <div className="cta-inner">
        <Reveal>
          <div>
            <div className="section-label">REJOINDRE LA LOGE</div>
            <h2 id="inscription" className="cta-title">
              Prêt à reprendre le<br /><em>contrôle ?</em>
            </h2>
            <p className="cta-desc">
              Créez votre profil salon en 5 minutes. Recevez vos premières propositions de marques sous 48h. Gratuit, sans engagement, vous décidez de tout.
            </p>
            <div className="cta-promises">
              {[
                "Inscription gratuite, sans carte bancaire",
                "Premières propositions sous 48h",
                "Aucun engagement, aucune exclusivité",
                "Vos marques actuelles ne changent pas",
                "Vos données restent confidentielles",
              ].map((p, i) => (
                <div className="cta-promise" key={i}>
                  <span className="cta-promise-icon">—</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="cta-form">
            <div style={{
              fontFamily: "var(--serif)", fontSize: "18px", color: C.creme,
              marginBottom: "8px", textAlign: "center",
            }}>Créez votre profil salon</div>
            <div style={{
              fontSize: "12px", color: C.stone, marginBottom: "32px",
              textAlign: "center", fontWeight: 300,
            }}>5 minutes — c'est tout ce qu'il faut.</div>
            <div className="form-group">
              <label htmlFor="salon-name" className="form-label">NOM DU SALON</label>
              <input id="salon-name" className="form-input" placeholder="Ex: Salon Élégance" aria-required="true" />
            </div>
            <div className="form-group">
              <label htmlFor="owner-name" className="form-label">VOTRE NOM</label>
              <input id="owner-name" className="form-input" placeholder="Prénom Nom" aria-required="true" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">EMAIL PROFESSIONNEL</label>
              <input id="email" className="form-input" type="email" placeholder="vous@salon.com" aria-required="true" />
            </div>
            <div className="form-group">
              <label htmlFor="seats" className="form-label">NOMBRE DE FAUTEUILS</label>
              <select id="seats" className="form-select" aria-required="true">
                <option value="">Sélectionnez...</option>
                <option>1-3 fauteuils</option>
                <option>4-8 fauteuils</option>
                <option>9+ fauteuils</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="interest" className="form-label">CE QUI VOUS INTÉRESSE LE PLUS</label>
              <select id="interest" className="form-select" aria-required="true">
                <option value="">Sélectionnez...</option>
                <option>Découvrir de nouvelles marques</option>
                <option>Obtenir de meilleures conditions</option>
                <option>Diversifier mes fournisseurs</option>
                <option>Accéder à des marques premium</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="current-brands" className="form-label">VOS MARQUES ACTUELLES (OPTIONNEL)</label>
              <input id="current-brands" className="form-input" placeholder="Ex: L'Oréal Pro, Schwarzkopf..." />
            </div>
            <div className="form-checkbox">
              <input type="checkbox" id="rgpd-consent" aria-required="true" />
              <label htmlFor="rgpd-consent">
                J'accepte que mes données soient traitées par La Loge pour le matching avec les marques partenaires, conformément à notre{" "}
                <a href="#">politique de confidentialité</a>. Aucune donnée n'est revendue.
              </label>
            </div>
            <button className="form-submit">CRÉER MON PROFIL GRATUITEMENT</button>
            <div className="form-note">Gratuit — Sans engagement — Données confidentielles</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BrandBanner() {
  return (
    <div className="brand-banner">
      <div className="brand-banner-title">Vous êtes une <em>marque ?</em></div>
      <div className="brand-banner-desc">Accédez aux meilleurs salons d'Europe grâce à notre réseau qualifié.</div>
      <a href="mailto:marques@laloge-beaute.com" className="brand-banner-link">Contactez notre équipe partenaires →</a>
    </div>
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
        <a href="mailto:bonjour@laloge-beaute.com">bonjour@laloge-beaute.com</a>
      </div>
      <div style={{ fontSize: "11px" }}>© 2026 La Loge</div>
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
        <PainPoints />
        <HowItWorks />
        <Benefits />
        <SocialProof />
        <FAQ />
        <CTA />
        <BrandBanner />
      </main>
      <Footer />
    </>
  );
}
