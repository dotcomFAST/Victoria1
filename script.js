// Ukrainian text lives in index.html (primary language).
// English translations are keyed by data-i18n.
const EN = {
  "logo": "Victoria Fastovets",
  "nav.about": "About", "nav.services": "Services", "nav.experience": "Experience",
  "nav.contact": "Contact",
  "cta.consult": "Consultation", "cta.more": "Learn more", "cta.details": "Details →",
  "cta.write": "Write to me",
  "hero.eyebrow": "Lawyer · Attorney · Kyiv",
  "hero.title": "Reliable<br>protection<br><em>for your business</em>",
  "hero.lead": "Over 20 years of legal practice in commercial, corporate, civil, tax and labour law.",
  "hero.clients": "Years of practice",
  "hl.1.eyebrow": "Courts", "hl.2.eyebrow": "Business", "hl.3.eyebrow": "Authorities",
  "hl.1.title": "Litigation", "hl.2.title": "Corporate law", "hl.3.title": "Tax disputes",
  "hl.1.text": "Representation in civil, commercial and administrative disputes — from pre-trial settlement to cassation.",
  "hl.2.text": "Minutes, changes of members, director and business activities, day-to-day contract work of the company.",
  "hl.3.text": "Appealing decisions of the tax inspectorate, customs and environmental authorities.",
  "about.title": "Over 20 years<br><em>protecting business</em>",
  "about.p1": "I am a qualified lawyer and attorney with more than 20 years of practice, licensed to practise law since 2012.",
  "about.p2": "My career path runs from lawyer at the state enterprise “Plant 410 CA” to head of the legal and contracts department and deputy director for legal affairs. Education: Drahomanov National Pedagogical University (law teacher, lawyer) and the Postgraduate Institute of the National Aviation University (economist). I continually develop my expertise through seminars and professional events.",
  "about.signature": "V. Fastovets", "about.role": "Lawyer · Attorney", "about.brand": "Kyiv",
  "services.title": "Areas<br><em>of practice</em>",
  "services.lead": "Full legal support for companies — from drafting contracts to representation in courts of all instances.",
  "services.1": "Litigation", "services.2": "Contract work", "services.3": "Tax & customs", "services.4": "Debt recovery",
  "services.1d": "Civil, commercial and administrative cases, road-accident disputes. Full preparation of court documents.",
  "services.2d": "Transport, supply, works, lease and advertising contracts. Explaining terms, consequences and risks.",
  "services.3d": "Disputes with the tax inspectorate, customs and environmental authorities, appealing their decisions.",
  "services.4d": "Claims, lawsuits, appeals and cassation complaints, representation before the enforcement service.",
  "services.quote": "Responsibility, persistence and a well-grounded position on every disputed issue.",
  "exp.title": "Experienced<br><em>and trusted</em>",
  "exp.lead": "Two decades of legal support for companies in aircraft repair, passenger and freight transport, fuel and spare-parts trade.",
  "exp.s1": "Years of practice", "exp.s2": "Areas of law", "exp.s3": "Court instances",
  "exp.s3n": "All",
  "exp.t0.role": "Attorney", "exp.t0.org": "Private law practice · present",
  "exp.t1.role": "Legal counsel", "exp.t1.org": "“Service-Champion” · freight transport, fuel and spare-parts trade",
  "exp.t2.role": "Deputy director for legal affairs", "exp.t2.org": "LLC “Kyitrans-2005” · passenger transport",
  "exp.t3.role": "Head of legal and contracts department", "exp.t3.org": "SE “Plant 410 CA” · aircraft repair",
  "exp.t4.role": "Lawyer", "exp.t4.org": "SE “Plant 410 CA”",
  "exp.p1": "Analysis", "exp.p2": "Strategy", "exp.p3": "Result",
  "contact.title": "Book a<br><em>consultation</em>",
  "contact.lead": "Oral and written consultations on current legislation. Leave a request.",
  "contact.phone": "Phone",
  "form.name": "Name", "form.phone": "Phone",
  "form.msg": "Message", "form.send": "Send",
  "footer.rights": "All rights reserved"
};

const nodes = document.querySelectorAll("[data-i18n]");
const UK = {};
nodes.forEach(el => { UK[el.dataset.i18n] ??= el.innerHTML; });
const DICT = { uk: UK, en: EN };

function setLang(lang) {
  const dict = DICT[lang] || UK;
  nodes.forEach(el => {
    const val = dict[el.dataset.i18n];
    if (val != null) el.innerHTML = val;
  });
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang__btn").forEach(b =>
    b.classList.toggle("is-active", b.dataset.lang === lang));
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

document.querySelectorAll(".lang__btn").forEach(b =>
  b.addEventListener("click", () => setLang(b.dataset.lang)));

let saved = "uk";
try { saved = localStorage.getItem("lang") || "uk"; } catch (e) {}
if (saved !== "uk") setLang(saved);

// Mobile menu
const nav = document.getElementById("nav");
document.getElementById("burger").addEventListener("click", () => nav.classList.toggle("is-open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("is-open")));

// ---------- Animations ----------
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Header shadow on scroll
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 20);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mark elements for scroll reveal; items in a group get a small stagger
const revealGroups = [
  [".highlights .hl", "up"],
  [".about__text > *", "up"],
  [".profile", "right"],
  [".services__grid > div:first-child > :not(.features)", "up"],
  [".feature", "up"],
  [".services__visual", "zoom"],
  [".exp__text > *", "up"],
  [".stat", "up"],
  [".step", "up"],
  [".exp__visual", "left"],
  [".contact__grid > div > *", "up"],
  [".contact__list li", "up"],
  [".form", "right"],
];
revealGroups.forEach(([sel, dir]) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    if (el.hasAttribute("data-reveal")) return;
    el.setAttribute("data-reveal", dir);
    el.style.setProperty("--d", `${Math.min(i, 5) * 0.1}s`);
  });
});


const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-visible");
    io.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

document.querySelectorAll("[data-reveal], .rule").forEach(el => io.observe(el));
