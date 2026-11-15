/* Digital Skill Academy – single-page site (hash routing, no dependencies). */
(function () {
'use strict';
const D = window.DSA, S = D.site;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slug = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const store = {
  get(k, d) { try { const v = localStorage.getItem('dsa_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('dsa_' + k, JSON.stringify(v)); } catch (e) {} }
};
const fmtDate = d => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const ICON = {
  code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>', phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  palette: '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16" cy="10" r="1"/><path d="M12 21c-2 0-2-2 0-3s2-3 0-3"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  megaphone: '<path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zM15 9a4 4 0 010 6M18 6a8 8 0 010 12"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 14h.01M15 14h.01M2 14h2M20 14h2"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  cloud: '<path d="M7 18a4 4 0 010-8 5 5 0 019.6-1A4.5 4.5 0 0117 18z"/>',
  network: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M12 12l-6 5M12 12l6 5"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  video: '<rect x="2" y="5" width="14" height="14" rx="2"/><path d="M16 10l6-3v10l-6-3"/>',
  grad: '<path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c3 2 9 2 12 0v-5"/>',
  check: '<path d="M20 6L9 17l-5-5"/>', arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', menu: '<path d="M3 6h18M3 12h18M3 18h18"/>', x: '<path d="M18 6L6 18M6 6l12 12"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>', chev: '<path d="M6 9l6 6 6-6"/>', message: '<path d="M21 12a8 8 0 01-11.6 7.1L3 21l1.9-6.4A8 8 0 1121 12z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>', pin: '<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M17 5a3.5 3.5 0 010 7M22 20c0-2.5-1.5-4.4-4-5.3"/>',
  zap: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', heart: '<path d="M12 21s-8-5.3-8-11a5 5 0 019-3 5 5 0 019 3c0 5.7-10 11-10 11z"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>', briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/>',
  coins: '<circle cx="9" cy="9" r="6"/><path d="M15.5 9.2A6 6 0 1115 21"/>', level: '<path d="M4 20V14M10 20V9M16 20V4"/>', book: '<path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4z"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2"/>'
};
const ic = (n, c = '') => `<svg class="ic ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n] || ICON.zap}</svg>`;

/* ---------- derived data ---------- */
const services = D.categories.flatMap(c => c.items.map(n => ({ name: n, slug: slug(n), cat: c })));
const courses = D.courses.map(c => Object.assign({ slug: slug(c.title) }, c));
const posts = D.posts.map(p => Object.assign({ slug: slug(p.title) }, p));
const toast = (m) => { const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 3200); };

/* ---------- shared UI ---------- */
const crumbs = l => `<nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a>${l.map(([t, h]) => h ? `<span>/</span><a href="${h}">${esc(t)}</a>` : `<span>/</span><span aria-current="page">${esc(t)}</span>`).join('')}</nav>`;
const pageHead = (t, sub, l) => `<section class="page-head"><div class="container">${crumbs(l)}<h1>${esc(t)}</h1>${sub ? `<p>${esc(sub)}</p>` : ''}</div></section>`;
const secHead = (eb, t, p, left) => `<div class="sec-head ${left ? 'left' : ''} reveal"><span class="eyebrow">${esc(eb)}</span><h2>${esc(t)}</h2>${p ? `<p>${esc(p)}</p>` : ''}</div>`;
const quoteBand = (t = 'Ready to start your project?') => `<section class="section"><div class="container"><div class="cta-band reveal"><div><h2>${esc(t)}</h2><p>Tell us what you need and we will reply with a clear scope and next steps.</p></div><a class="btn" href="#/contact">Get a Free Consultation ${ic('arrow')}</a></div></div></section>`;
const filterBar = (chips, ph) => `<div class="toolbar"><div class="chips" role="group" aria-label="Filter">${['All', ...chips].map((c, i) => `<button class="chip ${i ? '' : 'on'}" data-chip="${i ? esc(c) : 'all'}">${esc(c)}</button>`).join('')}</div><label class="search">${ic('search')}<input type="search" data-q placeholder="${esc(ph)}" aria-label="${esc(ph)}"></label></div>`;
const faqs = (items) => `<div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`;
const generalFaq = [
  ['How do I get a quote?', 'Use the Get a Quote form. Describe your goals and budget range and we will respond with a proposed scope and estimate.'],
  ['Do you work with international clients?', 'Yes. We work remotely with clients in Bangladesh and abroad, and agree on communication channels and time zones up front.'],
  ['Do you provide support after delivery?', 'Yes. Maintenance and support options can be agreed as part of the project or as a separate plan.'],
  ['Can I learn these skills at the Academy?', 'Yes. The Academy lists courses across development, design, marketing and productivity. See the Courses page for details.']
];

function header() {
  const links = [['Home', '#/'], ['About Us', '#/about']];
  return `<header class="site-header"><div class="container nav">
  <a class="logo" href="#/" aria-label="Digital Skill Academy home"><span class="logo-mark">${ic('code')}</span><span>Digital Skill Academy</span></a>
  <ul class="nav-links" id="navlinks">
   <li><a class="nl" href="#/">Home</a></li><li><a class="nl" href="#/about">About Us</a></li>
   <li class="has-dd"><a class="nl" href="#/services">Services ${ic('chev')}</a><div class="dd">${D.categories.map(c => `<a href="#/services/${c.id}">${ic(c.icon)}${esc(c.name)}</a>`).join('')}<a href="#/services"><strong>View all services →</strong></a></div></li>
   <li><a class="nl" href="#/solutions">Solutions</a></li><li><a class="nl" href="#/academy">Academy</a></li><li><a class="nl" href="#/courses">Courses</a></li>
   <li><a class="nl" href="#/portfolio">Portfolio</a></li><li><a class="nl" href="#/blog">Blog</a></li><li><a class="nl" href="#/contact">Contact</a></li>
  </ul>
  <div class="nav-actions"><button class="icon-btn" data-act="search" aria-label="Search">${ic('search')}</button><a class="btn btn-primary btn-sm" href="#/contact?quote=1">Get a Quote</a><button class="icon-btn burger" data-act="menu" aria-label="Toggle menu" aria-expanded="false">${ic('menu')}</button></div>
  </div></header>`;
}
function footer() {
  const soc = Object.entries(S.social).map(([n, u]) => `<a href="${u || '#/contact'}" aria-label="${n}" ${u ? 'target="_blank" rel="noopener"' : 'title="Link not configured"'}>${n[0]}</a>`).join('');
  return `<footer class="site-footer"><div class="container"><div class="foot-grid">
  <div><a class="logo" style="color:#fff" href="#/"><span class="logo-mark">${ic('code')}</span>Digital Skill Academy</a><p style="margin-top:14px">${esc(S.tagline)} IT services, custom software and practical digital education.</p><div class="socials">${soc}</div></div>
  <div><h4>Quick Links</h4><ul><li><a href="#/about">About Us</a></li><li><a href="#/services">Services</a></li><li><a href="#/solutions">Solutions</a></li><li><a href="#/portfolio">Portfolio</a></li><li><a href="#/blog">Blog</a></li><li><a href="#/contact">Contact</a></li></ul></div>
  <div><h4>Our Services</h4><ul>${D.categories.slice(0, 7).map(c => `<li><a href="#/services/${c.id}">${esc(c.name)}</a></li>`).join('')}</ul></div>
  <div><h4>Academy &amp; Courses</h4><ul><li><a href="#/academy">Digital Academy</a></li><li><a href="#/courses">All Courses</a></li><li><a href="#/student">Student Portal (demo)</a></li>${courses.slice(0, 4).map(c => `<li><a href="#/course/${c.slug}">${esc(c.title)}</a></li>`).join('')}</ul></div>
  <div><h4>Contact</h4><ul><li>${esc(S.emailLabel)}</li><li>${esc(S.phoneLabel)}</li><li>${esc(S.addressLabel)}</li></ul>
   <form class="news" data-form="newsletter" novalidate><input type="email" name="email" placeholder="Your email" aria-label="Newsletter email" required><button class="btn btn-primary btn-sm">Join</button></form></div>
  </div><div class="foot-bottom"><span>© ${new Date().getFullYear()} Digital Skill Academy. All rights reserved.</span><span><a href="#/privacy">Privacy Policy</a> · <a href="#/terms">Terms &amp; Conditions</a> · <a href="#/refund">Refund Policy</a> · <a href="#/admin">Admin (demo)</a></span></div></div></footer>
  <button class="fab wa" data-act="wa" aria-label="WhatsApp">${ic('message')}</button><button class="fab chat" data-act="chat" aria-label="Live chat">${ic('users')}</button><button class="fab top" data-act="top" aria-label="Back to top" hidden>${ic('up')}</button>`;
}

/* ---------- cards ---------- */
const catCard = c => `<a class="card reveal" href="#/services/${c.id}"><span class="ico">${ic(c.icon)}</span><h3>${esc(c.name)}</h3><p>${esc(c.blurb)}</p><ul class="mini-list">${c.items.slice(0, 4).map(i => `<li>${esc(i)}</li>`).join('')}</ul><span class="link more">View all ${c.items.length} services ${ic('arrow')}</span></a>`;
const svcCard = s => `<a class="card svc-card" data-item data-cat="${s.cat.id}" data-text="${esc((s.name + ' ' + s.cat.name).toLowerCase())}" href="#/service/${s.slug}"><span class="ico">${ic(s.cat.icon)}</span><h3>${esc(s.name)}</h3><span class="link">Learn More ${ic('arrow')}</span></a>`;
const courseCard = c => `<article class="card" data-item data-cat="${esc(c.cat)}" data-text="${esc((c.title + ' ' + c.desc + ' ' + c.cat + ' ' + c.level).toLowerCase())}"><div class="thumb t${1 + (c.title.length % 3)}">${ic(c.icon)}</div><div class="meta"><span class="tag">${esc(c.cat)}</span><span>${ic('level')}${esc(c.level)}</span><span>${ic('clock')}${esc(c.duration)}</span></div><h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p><a class="btn btn-ghost btn-sm more" href="#/course/${c.slug}">View Course ${ic('arrow')}</a></article>`;
const projCard = p => `<article class="card" data-item data-cat="${esc(p.cat)}" data-text="${esc((p.name + ' ' + p.cat + ' ' + p.tech.join(' ')).toLowerCase())}"><div class="thumb t${1 + (p.name.length % 3)}">${ic(p.icon)}</div><div class="meta"><span class="tag">${esc(p.cat)}</span><span class="tag demo">Demo concept</span></div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="meta">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div><button class="btn btn-ghost btn-sm more" data-act="project" data-i="${D.projects.indexOf(p)}">View Project</button></article>`;
const postCard = p => `<article class="card" data-item data-cat="${esc(p.cat)}" data-text="${esc((p.title + ' ' + p.excerpt + ' ' + p.cat).toLowerCase())}"><div class="meta"><span class="tag">${esc(p.cat)}</span><span>${fmtDate(p.date)}</span></div><h3><a href="#/blog/${p.slug}">${esc(p.title)}</a></h3><p>${esc(p.excerpt)}</p><a class="link more" href="#/blog/${p.slug}">Read article ${ic('arrow')}</a></article>`;

/* ---------- pages ---------- */
function home() {
  const art = `<div class="hero-art"><div class="code-card"><div class="dots"><i></i><i></i><i></i></div><div><span class="c">// your idea, shipped</span><br><span class="k">const</span> project = {<br>&nbsp;&nbsp;goal: <span class="s">"grow online"</span>,<br>&nbsp;&nbsp;team: <span class="s">"Digital Skill Academy"</span>,<br>&nbsp;&nbsp;stack: [<span class="s">"web"</span>, <span class="s">"mobile"</span>, <span class="s">"AI"</span>]<br>};<br><span class="k">await</span> launch(project);</div>
  <svg viewBox="0 0 400 120" style="margin-top:14px" role="img" aria-label="Network graphic"><g stroke="#22d3ee" stroke-opacity=".5" fill="none"><path d="M20 90L110 30 200 70 290 20 380 60"/><path d="M110 30L200 100 290 20M20 90L200 100 380 60"/></g><g fill="#2563EB" stroke="#22d3ee"><circle cx="20" cy="90" r="6"/><circle cx="110" cy="30" r="6"/><circle cx="200" cy="70" r="6"/><circle cx="290" cy="20" r="6"/><circle cx="380" cy="60" r="6"/><circle cx="200" cy="100" r="5"/></g></svg></div>
  <div class="float-chip a">${ic('shield')}Secure by design</div><div class="float-chip b">${ic('zap')}Modern stack</div></div>`;
  const html = `<section class="hero"><div class="container hero-grid"><div><span class="eyebrow" style="color:#22d3ee">Digital Skill Academy</span><h1>Transform Your Business with <span>Smart Digital Solutions</span></h1><p class="lead">Digital Skill Academy delivers innovative IT services, custom software, creative digital solutions, and professional technology training to help businesses and individuals grow in the digital world.</p><div class="cta-row"><a class="btn btn-primary" href="#/services">Explore Our Services ${ic('arrow')}</a><a class="btn btn-outline" href="#/contact">Get a Free Consultation</a></div><div class="badge-row"><span>${ic('check')}Web &amp; software</span><span>${ic('check')}Mobile apps</span><span>${ic('check')}AI &amp; automation</span><span>${ic('check')}IT training</span></div></div>${art}</div></section>
  <section class="section"><div class="container">${secHead('Who we are', 'A technology and digital solutions partner', 'We combine IT services with practical education, so your business gets reliable solutions and your team gets the skills to use them.')}
   <div class="grid g4">${[['zap', 'Innovative Solutions', 'Modern tools applied to real business problems.'], ['briefcase', 'Professional Expertise', 'Structured delivery from discovery to support.'], ['heart', 'Customer-Focused Services', 'Your goals shape every decision we make.'], ['shield', 'Reliable Technical Support', 'Help available after launch, not just before it.']].map(([i, t, d]) => `<div class="card reveal"><span class="ico">${ic(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
  <section class="section alt"><div class="container">${secHead('Our services', 'Everything your business needs to grow digitally', 'Eleven service areas covering ' + services.length + ' specific services.')}<div class="grid g3">${D.categories.map(catCard).join('')}</div></div></section>
  <section class="section dark"><div class="container"><div class="grid g2" style="align-items:center;gap:48px"><div class="reveal"><span class="eyebrow">Digital Academy</span><h2>Learn Digital Skills. Build Your Future.</h2><p style="margin:14px 0 24px">Practical courses in development, design, marketing, productivity, AI and security for beginners through advanced learners.</p><div class="cta-row"><a class="btn btn-primary" href="#/courses">Browse Courses</a><a class="btn btn-outline" href="#/academy">About the Academy</a></div></div><div class="grid g2">${courses.slice(0, 4).map(c => `<a class="card reveal" href="#/course/${c.slug}"><span class="ico">${ic(c.icon)}</span><h3>${esc(c.title)}</h3><div class="meta"><span>${esc(c.level)}</span><span>${esc(c.duration)}</span></div></a>`).join('')}</div></div></div></section>
  <section class="section"><div class="container">${secHead('Why choose us', 'Built on principles you can rely on')}<div class="grid g4">${D.why.map(([t, d, i]) => `<div class="card reveal"><span class="ico">${ic(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
  <section class="section alt"><div class="container">${secHead('How we work', 'Our working process')}${processHtml()}</div></section>
  <section class="section"><div class="container">${secHead('Portfolio', 'Project showcase', 'Clearly labeled demo concepts until client work can be shared.')}<div class="grid g3">${D.projects.slice(0, 3).map(projCard).join('')}</div><p style="text-align:center;margin-top:28px"><a class="btn btn-ghost" href="#/portfolio">View full portfolio</a></p></div></section>
  <section class="section alt"><div class="container">${secHead('Testimonials', 'Client feedback', 'Placeholders only. Genuine reviews will be shown here once collected.')}<div class="grid g3">${D.testimonials.map(t => `<div class="card quote-card reveal"><span class="tag demo">Placeholder</span><p>${esc(t)}</p></div>`).join('')}</div></div></section>
  <section class="section"><div class="container" style="max-width:820px">${secHead('FAQ', 'Common questions')}${faqs(generalFaq)}</div></section>${quoteBand()}`;
  return { title: 'Digital Skill Academy | IT Services Company & Professional IT Training', desc: 'IT services, website and software development, digital marketing, graphics design and professional IT training for Bangladesh and international clients.', html, ld: { '@type': 'Organization', name: S.name, url: S.baseUrl, slogan: S.tagline } };
}
function processHtml() { return `<div class="steps">${D.process.map(([t, d], i) => `<div class="step reveal"><div class="n">0${i + 1}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>`; }

function about() {
  const html = pageHead('About Us', 'A technology and digital education company built around practical results.', [['About Us']]) + `
  <section class="section"><div class="container detail"><div class="prose"><h2>Who we are</h2><p>Digital Skill Academy is an IT services and digital skills training company. We help businesses plan, build and run digital products, and we help individuals learn the skills behind them.</p><h2>Our story</h2><p>Digital Skill Academy was created on a simple idea: technology works best when the people using it understand it. By offering services and training under one roof, we aim to build solutions that clients can confidently own and grow. <em>(Replace this paragraph with your real founding story.)</em></p><h2>Our expertise</h2><ul class="check">${D.categories.map(c => `<li>${ic('check')}${esc(c.name)}</li>`).join('')}</ul><h2>Our working approach</h2><p>We start with your goals, agree scope and milestones in writing, communicate progress regularly, and test before delivery. After launch we offer support so your solution keeps working.</p></div>
  <aside class="side"><div class="panel"><h3>${ic('target')} Our mission</h3><p>To empower businesses and individuals through innovative technology solutions and practical digital education.</p></div><div class="panel"><h3>${ic('eye')} Our vision</h3><p>To become a trusted digital solutions and technology education provider.</p></div></aside></div></section>
  <section class="section alt"><div class="container">${secHead('Our values', 'What guides our work')}<div class="grid g4">${D.values.map(([t, d]) => `<div class="card reveal"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
  <section class="section"><div class="container">${secHead('Why choose us', 'Why clients work with us')}<div class="grid g4">${D.why.map(([t, d, i]) => `<div class="card reveal"><span class="ico">${ic(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
  <section class="section alt"><div class="container">${secHead('Team', 'Meet the team', 'Team profiles will be published here once confirmed.')}<div class="grid g4">${[1, 2, 3, 4].map(i => `<div class="card"><div class="thumb t${(i % 3) + 1}">${ic('users')}</div><h3>Team member ${i}</h3><p>Role and short bio (placeholder).</p><span class="tag demo">Placeholder</span></div>`).join('')}</div></div></section>` + quoteBand();
  return { title: 'About Us | Digital Skill Academy', desc: 'Learn about Digital Skill Academy: our mission, vision, values and approach to IT services and digital training.', html };
}

function servicesPage(catId) {
  const cat = D.categories.find(c => c.id === catId);
  const cats = cat ? [cat] : D.categories;
  const html = pageHead(cat ? cat.name : 'Our Services', cat ? cat.blurb : 'Explore all IT, creative and digital services offered by Digital Skill Academy.', cat ? [['Services', '#/services'], [cat.name]] : [['Services']]) + `<section class="section"><div class="container" data-filter>${filterBar(D.categories.map(c => c.name), 'Search services…').replace(/data-chip="([^"]+)"/g, (m, v) => { const c = D.categories.find(x => esc(x.name) === v); return c ? `data-chip="${c.id}"` : m; })}
  ${cats.map(c => `<div class="group" data-group><h2>${ic(c.icon)} ${esc(c.name)}</h2><p>${esc(c.blurb)}</p><div class="grid g4">${services.filter(s => s.cat === c).map(svcCard).join('')}</div></div>`).join('')}<p class="empty" data-empty hidden>No services match your search.</p></div></section>` + quoteBand();
  return { title: (cat ? cat.name : 'IT Services') + ' | Digital Skill Academy', desc: cat ? cat.blurb : 'Website development, software, mobile apps, design, marketing, AI, cybersecurity, cloud and more.', html, ld: { '@type': 'ItemList', name: 'Services', itemListElement: services.slice(0, 20).map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name })) } };
}
function serviceDetail(sl) {
  const s = services.find(x => x.slug === sl); if (!s) return null;
  const c = s.cat, name = s.name;
  const related = services.filter(x => x.cat === c && x !== s).slice(0, 6);
  const f = [`Discovery of goals and requirements for ${name.toLowerCase()}`, ...c.features];
  const benefits = ['A clear scope, timeline and deliverables', 'Work shaped around your business goals', 'Documentation and handover so you stay in control', 'Support options after launch'];
  const html = pageHead(name, `${name} from Digital Skill Academy, part of our ${c.name} services.`, [['Services', '#/services'], [c.name, '#/services/' + c.id], [name]]) + `
  <section class="section"><div class="container detail"><div class="prose"><h2>Service overview</h2><p>${esc(name)} is part of our ${esc(c.name)} offering. ${esc(c.blurb)} We begin by understanding your goals, then agree a clear scope before any work starts. <em>(Add service-specific details and example deliverables here.)</em></p>
  <h2>Key features</h2><ul class="check">${f.map(x => `<li>${ic('check')}${esc(x)}</li>`).join('')}</ul><h2>Benefits</h2><ul class="check">${benefits.map(x => `<li>${ic('check')}${esc(x)}</li>`).join('')}</ul>
  <h2>Our working process</h2>${processHtml()}<h2 style="margin-top:40px">Technologies used</h2><div class="chips">${c.tech.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div><p style="margin-top:8px;font-size:.85rem;color:var(--muted)">Indicative technologies; the final stack is agreed per project.</p>
  <h2>FAQs</h2>${faqs([[`How long does ${name.toLowerCase()} take?`, 'It depends on scope. After a short discovery call we provide a timeline with milestones.'], ['How is pricing decided?', 'Pricing is based on scope, complexity and timeline. We share a written estimate before starting.'], ['Do I own the final work?', 'Ownership terms are written into the agreement for each project.'], ['Is support available after delivery?', 'Yes. Maintenance and support can be agreed as part of the project or separately.']])}</div>
  <aside class="side"><div class="panel"><h3>Request a Quote</h3><p style="color:var(--muted);margin-bottom:14px">Tell us about your ${esc(name.toLowerCase())} needs.</p><a class="btn btn-primary" href="#/contact?service=${encodeURIComponent(name)}">Request a Quote ${ic('arrow')}</a></div><div class="panel"><h3>Related services</h3><ul class="mini-list">${related.map(r => `<li><a href="#/service/${r.slug}">${esc(r.name)}</a></li>`).join('')}</ul></div></aside></div></section>`;
  return { title: `${name} | ${c.name} | Digital Skill Academy`, desc: `${name} services from Digital Skill Academy. ${c.blurb}`, html, ld: { '@type': 'Service', name, provider: { '@type': 'Organization', name: S.name }, category: c.name } };
}

function solutions() {
  const sol = [['Startup Launch Kit', 'rocket', ['Website Design', 'Logo Design', 'Social Media Design', 'Search Engine Optimization (SEO)'], 'Brand, website and visibility for a new business.'], ['E-commerce Growth', 'coins', ['E-commerce Website Development', 'Shopify Development', 'Google Ads', 'Email Marketing'], 'Build and grow an online store.'], ['Business Automation Suite', 'bot', ['Business Process Automation', 'AI Chatbot Development', 'CRM Software', 'Workflow Automation'], 'Reduce manual work across sales and support.'], ['Secure & Reliable Infrastructure', 'shield', ['VPS Hosting Setup', 'Website Security', 'Data Backup Solutions', 'Security Monitoring'], 'Hosting, protection and backups working together.'], ['Team Upskilling', 'grad', ['IT Consulting', 'Technical Support', 'Virtual Assistance'], 'Pair services with Academy training for your staff.']];
  const html = pageHead('Solutions', 'Packaged combinations of services for common business needs.', [['Solutions']]) + `<section class="section"><div class="container"><div class="grid g3">${sol.map(([t, i, list, d]) => `<div class="card reveal"><span class="ico">${ic(i === 'rocket' ? 'zap' : i)}</span><h3>${t}</h3><p>${d}</p><ul class="mini-list">${list.map(n => { const s = services.find(x => x.name === n); return `<li>${s ? `<a href="#/service/${s.slug}">${esc(n)}</a>` : esc(n)}</li>`; }).join('')}</ul><a class="link more" href="#/contact?service=${encodeURIComponent(t)}">Ask about this ${ic('arrow')}</a></div>`).join('')}</div></div></section>` + quoteBand();
  return { title: 'Business Solutions | Digital Skill Academy', desc: 'Packaged IT and digital solutions for startups, e-commerce, automation and secure infrastructure.', html };
}

function academy() {
  const cats = [...new Set(courses.map(c => c.cat))];
  const html = pageHead('Digital Academy', 'Learn Digital Skills. Build Your Future.', [['Academy']]) + `<section class="section"><div class="container"><div class="grid g2" style="align-items:center;gap:48px"><div class="prose"><h2>Practical training for the digital economy</h2><p>The Digital Academy offers ${courses.length} courses across ${cats.length} areas, from computer basics to full stack development. Each course lists its curriculum, outcomes, duration and level so you can choose with confidence.</p><div class="cta-row"><a class="btn btn-primary" href="#/courses">Browse all courses</a><a class="btn btn-ghost" href="#/student">Student portal (demo)</a></div></div><div class="grid g2">${cats.map(c => `<a class="card" href="#/courses?cat=${encodeURIComponent(c)}"><h3>${esc(c)}</h3><p>${courses.filter(x => x.cat === c).length} courses</p></a>`).join('')}</div></div></div></section><section class="section alt"><div class="container">${secHead('Featured', 'Popular starting points')}<div class="grid g3">${courses.slice(0, 6).map(courseCard).join('')}</div></div></section>` + quoteBand('Need training for your team?');
  return { title: 'Digital Academy | Professional IT Training | Digital Skill Academy', desc: 'Professional IT training and freelancing courses: web development, design, marketing, Excel, AI tools and cybersecurity fundamentals.', html };
}
function coursesPage(q) {
  const cats = [...new Set(courses.map(c => c.cat))];
  const html = pageHead('Courses', 'Find the right course by category, level or keyword.', [['Academy', '#/academy'], ['Courses']]) + `<section class="section"><div class="container" data-filter data-initcat="${esc(q.get('cat') || '')}">${filterBar(cats, 'Search courses…')}<div class="grid g3">${courses.map(courseCard).join('')}</div><p class="empty" data-empty hidden>No courses match your search.</p></div></section>`;
  return { title: 'Courses | Digital Skill Academy', desc: 'Browse professional IT and digital skills courses with curriculum, duration and level.', html };
}
function courseDetail(sl) {
  const c = courses.find(x => x.slug === sl); if (!c) return null;
  const rel = courses.filter(x => x.cat === c.cat && x !== c).slice(0, 3);
  const html = pageHead(c.title, c.desc, [['Academy', '#/academy'], ['Courses', '#/courses'], [c.title]]) + `<section class="section"><div class="container detail"><div class="prose"><div class="thumb t${1 + (c.title.length % 3)}" style="height:220px;margin-bottom:24px">${ic(c.icon)}</div><h2>About this course</h2><p>${esc(c.desc)} Sessions combine explanation with hands-on practice. <em>(Add the final course description.)</em></p>
  <h2>Curriculum</h2><div class="faq">${c.modules.map((m, i) => `<details ${i === 0 ? 'open' : ''}><summary>Module ${i + 1}: ${esc(m)}</summary><p>Lessons, practice exercises and a short review for this module. (Detailed lesson list to be added.)</p></details>`).join('')}</div>
  <h2>Learning outcomes</h2><ul class="check">${[`Understand the core concepts of ${c.title.toLowerCase()}`, 'Complete practical exercises and a final project', 'Build a portfolio-ready piece of work', 'Know what to learn next'].map(x => `<li>${ic('check')}${esc(x)}</li>`).join('')}</ul>
  <h2>Instructor</h2><div class="panel"><strong>Instructor to be announced</strong><p style="color:var(--muted)">Instructor name, background and experience will be published here once confirmed. We do not display unverified credentials.</p></div></div>
  <aside class="side"><div class="panel"><h3>Course details</h3><ul class="mini-list"><li>Category: ${esc(c.cat)}</li><li>Level: ${esc(c.level)}</li><li>Duration: ${esc(c.duration)} (indicative)</li><li>Format: to be confirmed</li></ul><button class="btn btn-primary" style="margin-top:14px;width:100%;justify-content:center" data-act="enroll" data-slug="${c.slug}">Enroll Now</button><p style="font-size:.8rem;color:var(--muted);margin-top:10px">Demo enrollment is stored in your browser only. Payments are not connected.</p></div><div class="panel"><h3>Share</h3>${shareLinks(c.title)}</div>${rel.length ? `<div class="panel"><h3>Related courses</h3><ul class="mini-list">${rel.map(r => `<li><a href="#/course/${r.slug}">${esc(r.title)}</a></li>`).join('')}</ul></div>` : ''}</aside></div></section>`;
  return { title: `${c.title} Course | Digital Skill Academy`, desc: c.desc, html, ld: { '@type': 'Course', name: c.title, description: c.desc, provider: { '@type': 'Organization', name: S.name } } };
}

function portfolio() {
  const cats = ['Website Development', 'Software Development', 'Mobile Applications', 'Graphics Design', 'Branding', 'Digital Marketing', 'UI/UX Design'];
  const html = pageHead('Portfolio', 'Demo projects that illustrate our approach.', [['Portfolio']]) + `<section class="section"><div class="container" data-filter><div class="alert info">All projects below are <strong>demo concepts</strong> created to show capabilities. They are not real client work.</div>${filterBar(cats, 'Search projects…')}<div class="grid g3">${D.projects.map(projCard).join('')}</div><p class="empty" data-empty hidden>No projects match your search.</p></div></section>` + quoteBand();
  return { title: 'Portfolio | Digital Skill Academy', desc: 'Demo project showcase across web, software, mobile, branding, marketing and UI/UX design.', html };
}

function shareLinks(title) {
  const u = encodeURIComponent(location.href.split('#')[0] + location.hash), t = encodeURIComponent(title);
  return `<div class="cta-row"><a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${u}">Facebook</a><a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${u}">LinkedIn</a><a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url=${u}&text=${t}">X</a><button class="btn btn-ghost btn-sm" data-act="copy">Copy link</button></div>`;
}
function blog(q) {
  const feat = posts.filter(p => p.featured);
  const html = pageHead('Blog & Technology News', 'Guides, tips and updates on technology, digital marketing and learning.', [['Blog']]) + `<section class="section"><div class="container" data-filter data-initcat="${esc(q.get('cat') || '')}"><div class="grid g2" style="margin-bottom:40px">${feat.map(p => `<a class="card" href="#/blog/${p.slug}"><span class="tag demo">Featured · sample article</span><h3 style="font-size:1.3rem">${esc(p.title)}</h3><p>${esc(p.excerpt)}</p><div class="meta"><span>${fmtDate(p.date)}</span><span>Digital Skill Academy Editorial Team</span></div></a>`).join('')}</div>${filterBar(D.blogCategories, 'Search articles…')}<div class="grid g3">${posts.map(postCard).join('')}</div><p class="empty" data-empty hidden>No articles match your search.</p></div></section>`;
  return { title: 'Blog & Technology News | Digital Skill Academy', desc: 'Articles on web development, AI, cybersecurity, digital marketing, freelancing and online learning.', html };
}
function blogPost(sl) {
  const p = posts.find(x => x.slug === sl); if (!p) return null;
  const rel = posts.filter(x => x !== p && x.cat === p.cat).concat(posts.filter(x => x !== p && x.cat !== p.cat)).slice(0, 3);
  const html = pageHead(p.title, '', [['Blog', '#/blog'], [p.cat, '#/blog?cat=' + encodeURIComponent(p.cat)], [p.title]]) + `<section class="section"><div class="container detail"><article class="prose"><div class="meta" style="margin-bottom:20px"><span class="tag">${esc(p.cat)}</span><span>${fmtDate(p.date)}</span><span>By Digital Skill Academy Editorial Team</span></div><div class="alert info">Sample article: replace with your own published content.</div>${p.body.map(x => `<p>${esc(x)}</p>`).join('')}<h2>Share this article</h2>${shareLinks(p.title)}</article><aside class="side"><div class="panel"><h3>About the author</h3><p style="color:var(--muted)">Digital Skill Academy Editorial Team. Add real author profiles when available.</p></div><div class="panel"><h3>Related posts</h3><ul class="mini-list">${rel.map(r => `<li><a href="#/blog/${r.slug}">${esc(r.title)}</a></li>`).join('')}</ul></div></aside></div></section>`;
  return { title: `${p.title} | Digital Skill Academy Blog`, desc: p.excerpt, html, ld: { '@type': 'BlogPosting', headline: p.title, datePublished: p.date, author: { '@type': 'Organization', name: S.name }, publisher: { '@type': 'Organization', name: S.name } } };
}

function contact(q) {
  const pre = q.get('service') || '';
  const quote = q.get('quote');
  const opts = ['', ...services.map(s => s.name), 'Business solution package', 'Academy / training inquiry', 'Other'];
  const html = pageHead(quote ? 'Get a Quote' : 'Contact Us', 'Tell us about your project and we will get back to you with next steps.', [['Contact']]) + `<section class="section"><div class="container detail"><div><div id="formmsg" role="alert"></div><form class="form" data-form="inquiry" novalidate>
   <div class="field"><label for="f-name">Full name *</label><input id="f-name" name="name" autocomplete="name" required><div class="err">Please enter your name (2+ characters).</div></div>
   <div class="field"><label for="f-email">Email address *</label><input id="f-email" name="email" type="email" autocomplete="email" required><div class="err">Please enter a valid email.</div></div>
   <div class="field"><label for="f-phone">Phone number</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="+880…"><div class="err">Use digits, spaces, + or - only (7–16 characters).</div></div>
   <div class="field"><label for="f-company">Company name</label><input id="f-company" name="company" autocomplete="organization"></div>
   <div class="field"><label for="f-service">Service *</label><select id="f-service" name="service" required>${opts.map(o => `<option value="${esc(o)}" ${o === pre ? 'selected' : ''}>${o ? esc(o) : 'Select a service'}</option>`).join('')}</select><div class="err">Please choose a service.</div></div>
   <div class="field"><label for="f-budget">Project budget</label><select id="f-budget" name="budget">${D.budgets.map(b => `<option>${esc(b)}</option>`).join('')}</select></div>
   <div class="field full"><label for="f-details">Project details *</label><textarea id="f-details" name="details" required></textarea><div class="err">Please describe your project (at least 20 characters).</div></div>
   <div class="field full"><label for="f-file">Attachment (optional, max 5 MB)</label><input id="f-file" name="file" type="file"><div class="err">File is larger than 5 MB.</div></div>
   <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
   <div class="full"><button class="btn btn-primary" type="submit">Submit Inquiry ${ic('arrow')}</button></div></form></div>
  <aside class="side"><div class="panel"><h3>Contact details</h3><ul class="mini-list"><li>${ic('mail')} ${esc(S.emailLabel)}</li><li>${ic('phone')} ${esc(S.phoneLabel)}</li><li>${ic('message')} ${esc(S.whatsappLabel)}</li><li>${ic('pin')} ${esc(S.addressLabel)}</li></ul></div>
  <div class="panel"><h3>Find us</h3><div class="thumb t2" style="height:160px">${ic('pin')}</div><p style="font-size:.85rem;color:var(--muted);margin-top:8px">Google Maps embed placeholder. Add your embed URL in app.js.</p></div>
  <div class="panel"><h3>Follow us</h3><div class="chips">${Object.keys(S.social).map(n => `<span class="tag">${n}</span>`).join('')}</div></div></aside></div></section>`;
  return { title: (quote ? 'Get a Quote' : 'Contact') + ' | Digital Skill Academy', desc: 'Contact Digital Skill Academy or request a free quote for web, software, design, marketing and IT services.', html };
}

const legal = {
  privacy: ['Privacy Policy', ['This is a template policy and not legal advice. Have it reviewed by a qualified professional before launch.', 'Information we collect: details you submit through forms (such as name, email, phone and project description) and basic usage data if analytics is enabled.', 'How we use it: to respond to inquiries, deliver services, send newsletters you opted into and improve the website.', 'Your choices: you may request access, correction or deletion of your data by contacting us at the email listed on the Contact page.', 'Cookies: this site shows a cookie notice. Only essential storage is used until analytics is configured.']],
  terms: ['Terms & Conditions', ['This is a template and not legal advice. Have it reviewed before launch.', 'Services are provided under a written agreement or proposal specifying scope, timeline and fees for each project.', 'Intellectual property transfers according to the agreement for each project.', 'Website content is provided for general information and may change without notice.', 'Liability is limited as stated in individual project agreements and applicable law.']],
  refund: ['Refund Policy', ['This is a template and not legal advice. Replace with your real policy.', 'Services: refund terms are defined per project in the proposal, including milestone payments and revision rounds.', 'Courses: describe your refund window, conditions and process here.', 'To request a refund, contact us with your order or enrollment details.']]
};
function legalPage(k) {
  const [t, ps] = legal[k];
  return { title: t + ' | Digital Skill Academy', desc: t + ' for Digital Skill Academy.', html: pageHead(t, '', [[t]]) + `<section class="section"><div class="container prose" style="max-width:800px"><div class="alert info">Template content, review before publishing.</div>${ps.map(x => `<p>${esc(x)}</p>`).join('')}</div></section>` };
}
function notFound() { return { title: 'Page not found | Digital Skill Academy', desc: 'Page not found.', html: `<section class="section"><div class="container" style="text-align:center;padding:60px 0"><div class="stat" style="font-size:5rem">404</div><h1 style="font-size:2rem;margin:12px 0">This page could not be found</h1><p style="color:var(--muted);margin-bottom:24px">The link may be broken or the page may have moved.</p><div class="cta-row" style="justify-content:center"><a class="btn btn-primary" href="#/">Go home</a><a class="btn btn-ghost" href="#/services">Browse services</a></div></div></section>` }; }

/* ---------- demo auth + student + admin ---------- */
async function sha(s) {
  const data = new TextEncoder().encode('dsa-demo-salt:' + s);
  if (window.crypto && crypto.subtle) { const b = await crypto.subtle.digest('SHA-256', data); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
  let h = 5381; for (const ch of s) h = ((h << 5) + h + ch.charCodeAt(0)) | 0; return 'fallback-' + h;
}
const DEMO_NOTE = `<div class="alert info"><strong>Demo mode.</strong> Data is stored only in this browser (localStorage). A production system needs a real backend with a database, server-side authentication and role-based access control (see README).</div>`;

function student() {
  const me = store.get('student_session', null);
  let body;
  if (!me) {
    body = `<div class="grid g2"><div class="panel"><h3>Student login</h3><div class="alert no" id="smsg" hidden></div><form data-form="slogin" novalidate class="form" style="grid-template-columns:1fr"><div class="field"><label>Email</label><input name="email" type="email" required></div><div class="field"><label>Password</label><input name="password" type="password" required></div><button class="btn btn-primary">Log in</button></form></div>
    <div class="panel"><h3>Student registration</h3><form data-form="sreg" novalidate class="form" style="grid-template-columns:1fr"><div class="field"><label>Full name</label><input name="name" required></div><div class="field"><label>Email</label><input name="email" type="email" required></div><div class="field"><label>Password (8+ characters)</label><input name="password" type="password" minlength="8" required></div><button class="btn btn-primary">Create account</button></form></div></div>`;
  } else {
    const en = store.get('enroll_' + me.email, {});
    const list = Object.keys(en);
    body = `<div class="toolbar"><h2>Welcome, ${esc(me.name)}</h2><button class="btn btn-ghost btn-sm" data-act="slogout">Log out</button></div>` + (list.length ? list.map(sl => {
      const c = courses.find(x => x.slug === sl); if (!c) return '';
      const done = en[sl].done || [], pct = Math.round(done.length / c.modules.length * 100);
      return `<div class="panel" style="margin-bottom:16px"><div class="toolbar" style="margin:0 0 10px"><h3>${esc(c.title)}</h3><span class="tag">${pct}% complete</span></div><div class="progress"><i style="width:${pct}%"></i></div><ul class="check" style="margin-top:14px">${c.modules.map((m, i) => `<li><label><input type="checkbox" data-act="lesson" data-slug="${sl}" data-i="${i}" ${done.includes(i) ? 'checked' : ''}> Module ${i + 1}: ${esc(m)}</label></li>`).join('')}</ul>${pct === 100 ? `<button class="btn btn-primary btn-sm" style="margin-top:14px" data-act="cert" data-slug="${sl}">View certificate</button>` : ''}</div>`;
    }).join('') : `<div class="empty">You have not enrolled in any course yet. <a class="link" href="#/courses">Browse courses</a></div>`);
    body += `<div class="alert info">Not included in this demo: video lessons, downloadable resources, assignments and quizzes (need storage and a backend). Certificates are unofficial demo certificates.</div>`;
  }
  return { title: 'Student Portal (Demo) | Digital Skill Academy', desc: 'Demo student portal.', html: pageHead('Student Portal', 'Demo registration, enrollment, progress and certificate.', [['Academy', '#/academy'], ['Student Portal']]) + `<section class="section"><div class="container">${DEMO_NOTE}${body}</div></section>` };
}
function admin() {
  const has = store.get('admin_hash', null), ok = sessionStorage.getItem('dsa_admin') === '1';
  let body;
  if (!has) body = `<div class="panel" style="max-width:420px"><h3>Create admin passcode</h3><p style="color:var(--muted);margin-bottom:12px">No default credentials exist. Choose a passcode (10+ characters). Demo only: it is hashed and kept in this browser.</p><form data-form="asetup" novalidate class="form" style="grid-template-columns:1fr"><div class="field"><label>Passcode</label><input type="password" name="pass" required></div><button class="btn btn-primary">Save passcode</button></form></div>`;
  else if (!ok) body = `<div class="panel" style="max-width:420px"><h3>Admin login</h3><div class="alert no" id="amsg" hidden></div><form data-form="alogin" novalidate class="form" style="grid-template-columns:1fr"><div class="field"><label>Passcode</label><input type="password" name="pass" required></div><button class="btn btn-primary">Log in</button></form></div>`;
  else {
    const inq = store.get('inquiries', []), subs = store.get('subscribers', []);
    const students = store.get('students', []);
    const enr = students.reduce((n, s) => n + Object.keys(store.get('enroll_' + s.email, {})).length, 0);
    const tab = (new URLSearchParams((location.hash.split('?')[1]) || '')).get('t') || 'overview';
    const tabs = ['overview', 'inquiries', 'subscribers', 'students', 'content'];
    const tb = `<div class="tabs">${tabs.map(t => `<a class="chip ${t === tab ? 'on' : ''}" href="#/admin?t=${t}">${t[0].toUpperCase() + t.slice(1)}</a>`).join('')}<button class="chip" data-act="alogout">Log out</button></div>`;
    const tbl = (head, rows, kind) => `<div class="table-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}<th></th></tr></thead><tbody>${rows.length ? rows.map((r, i) => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}<td><button class="btn btn-ghost btn-sm" data-act="adel" data-kind="${kind}" data-i="${i}">Delete</button></td></tr>`).join('') : `<tr><td colspan="${head.length + 1}" class="empty">Nothing here yet.</td></tr>`}</tbody></table></div><p style="margin-top:12px"><button class="btn btn-ghost btn-sm" data-act="acsv" data-kind="${kind}">Export CSV</button></p>`;
    let c = '';
    if (tab === 'overview') c = `<div class="grid g4">${[['Services', services.length], ['Courses', courses.length], ['Inquiries', inq.length], ['Subscribers', subs.length], ['Students', students.length], ['Enrollments', enr], ['Blog posts', posts.length], ['Projects', D.projects.length]].map(([l, n]) => `<div class="panel"><div class="stat">${n}</div><div style="color:var(--muted)">${l}</div></div>`).join('')}</div>`;
    if (tab === 'inquiries') c = tbl(['Date', 'Name', 'Email', 'Service', 'Budget', 'Details'], inq.map(x => [x.date.slice(0, 10), x.name, x.email, x.service, x.budget, x.details.slice(0, 80)]), 'inquiries');
    if (tab === 'subscribers') c = tbl(['Date', 'Email'], subs.map(x => [x.date.slice(0, 10), x.email]), 'subscribers');
    if (tab === 'students') c = tbl(['Name', 'Email'], students.map(x => [x.name, x.email]), 'students');
    if (tab === 'content') c = `<div class="alert info">Services, courses, projects and posts live in <code>data.js</code> in this static build. Editing them from a dashboard (CRUD, testimonials, SEO metadata, media library, roles) requires the Next.js + PostgreSQL/Supabase build described in the README.</div>`;
    body = tb + c;
  }
  return { title: 'Admin (Demo) | Digital Skill Academy', desc: 'Demo admin.', noindex: true, html: pageHead('Admin Dashboard (Demo)', 'Local demo only. Not secure for production.', [['Admin']]) + `<section class="section"><div class="container">${DEMO_NOTE}${body}</div></section>` };
}

/* ---------- router ---------- */
function setMeta(t, d, noindex, ld) {
  document.title = t;
  let m = $('meta[name=description]'); if (m) m.content = d;
  const url = S.baseUrl + '/' + (location.hash || '#/');
  const can = $('link[rel=canonical]'); if (can) can.href = url;
  [['og:title', t], ['og:description', d], ['og:url', url]].forEach(([p, v]) => { const e = $(`meta[property="${p}"]`); if (e) e.content = v; });
  let r = $('meta[name=robots]'); if (noindex) { if (!r) { r = document.createElement('meta'); r.name = 'robots'; document.head.appendChild(r); } r.content = 'noindex,nofollow'; } else if (r) r.remove();
  const g = [{ '@type': 'Organization', name: S.name, url: S.baseUrl }]; if (ld) g.push(ld);
  $('#ld').textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': g });
}
function route() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, qs] = raw.split('?'); const q = new URLSearchParams(qs || '');
  const [a, b] = path.split('/').filter(Boolean);
  let o;
  if (!a) o = home(); else if (a === 'about') o = about(); else if (a === 'services') o = servicesPage(b); else if (a === 'service') o = serviceDetail(b);
  else if (a === 'solutions') o = solutions(); else if (a === 'academy') o = academy(); else if (a === 'courses') o = coursesPage(q); else if (a === 'course') o = courseDetail(b);
  else if (a === 'portfolio') o = portfolio(); else if (a === 'blog') o = b ? blogPost(b) : blog(q); else if (a === 'contact' || a === 'quote') o = contact(q);
  else if (legal[a]) o = legalPage(a); else if (a === 'student') o = student(); else if (a === 'admin') o = admin();
  if (!o) o = notFound();
  $('#app').innerHTML = o.html; setMeta(o.title, o.desc, o.noindex || o === null, o.ld);
  if (!o.noindex && o.title.startsWith('Page not found')) setMeta(o.title, o.desc, true);
  window.scrollTo(0, 0); $('#navlinks') && $('#navlinks').classList.remove('open');
  $$('#navlinks .nl').forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#/' + (a || '')));
  initFilters(); initReveal();
}
function initFilters() {
  $$('[data-filter]').forEach(root => {
    let cat = 'all', qv = '';
    const apply = () => {
      let n = 0; $$('[data-item]', root).forEach(it => { const show = (cat === 'all' || it.dataset.cat === cat) && it.dataset.text.includes(qv); it.hidden = !show; if (show) n++; });
      $$('[data-group]', root).forEach(g => g.hidden = !$$('[data-item]:not([hidden])', g).length);
      const e = $('[data-empty]', root); if (e) e.hidden = n > 0;
      $$('[data-chip]', root).forEach(c => c.classList.toggle('on', c.dataset.chip === cat));
    };
    root.addEventListener('click', e => { const c = e.target.closest('[data-chip]'); if (c) { cat = c.dataset.chip; apply(); } });
    const inp = $('[data-q]', root); inp && inp.addEventListener('input', () => { qv = inp.value.trim().toLowerCase(); apply(); });
    if (root.dataset.initcat) { const m = $$('[data-chip]', root).find(c => c.dataset.chip === root.dataset.initcat); if (m) cat = m.dataset.chip; }
    apply();
  });
}
function initReveal() {
  if (!('IntersectionObserver' in window)) { $$('.reveal').forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
  $$('.reveal').forEach(e => io.observe(e));
}

/* ---------- overlays ---------- */
const layer = () => $('#layer');
function modal(html) { layer().innerHTML = `<div class="overlay" data-close><div class="modal" role="dialog" aria-modal="true"><button class="icon-btn x" data-close aria-label="Close">${ic('x')}</button>${html}</div></div>`; }
function closeModal() { layer().innerHTML = ''; }
function searchModal() {
  modal(`<h3 style="margin-bottom:12px">Search</h3><label class="search">${ic('search')}<input id="gs" type="search" placeholder="Search services, courses, articles…" aria-label="Global search" autofocus></label><div class="results" id="gsr" style="margin-top:12px"></div>`);
  const inp = $('#gs'); inp.focus();
  inp.addEventListener('input', () => {
    const v = inp.value.trim().toLowerCase(); if (v.length < 2) { $('#gsr').innerHTML = ''; return; }
    const r = [...services.filter(s => s.name.toLowerCase().includes(v)).map(s => [s.name, 'Service', '#/service/' + s.slug]), ...courses.filter(c => c.title.toLowerCase().includes(v)).map(c => [c.title, 'Course', '#/course/' + c.slug]), ...posts.filter(p => p.title.toLowerCase().includes(v)).map(p => [p.title, 'Article', '#/blog/' + p.slug])].slice(0, 12);
    $('#gsr').innerHTML = r.length ? r.map(([t, k, h]) => `<a href="${h}" data-close><span>${esc(t)}</span><span class="tag">${k}</span></a>`).join('') : '<p class="empty">No results.</p>';
  });
}

/* ---------- forms ---------- */
function setBad(f, name, bad) { const el = f.elements[name]; if (!el) return; el.closest('.field').classList.toggle('bad', bad); }
const emailOK = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
function rateLimited(key, max, ms) {
  const now = Date.now(), arr = store.get('rl_' + key, []).filter(t => now - t < ms);
  if (arr.length >= max) return true; arr.push(now); store.set('rl_' + key, arr); return false;
}
async function onSubmit(e) {
  const f = e.target.closest('form[data-form]'); if (!f) return; e.preventDefault();
  const kind = f.dataset.form, v = n => (f.elements[n] ? f.elements[n].value.trim() : '');
  if (f.elements.website && f.elements.website.value) return; // honeypot
  if (kind === 'newsletter') {
    if (!emailOK(v('email'))) return toast('Please enter a valid email.');
    if (rateLimited('news', 5, 600000)) return toast('Too many attempts. Please wait a few minutes.');
    const s = store.get('subscribers', []); if (!s.find(x => x.email === v('email'))) s.push({ email: v('email'), date: new Date().toISOString() }); store.set('subscribers', s);
    f.reset(); return toast('Subscribed (demo: saved in this browser only).');
  }
  if (kind === 'inquiry') {
    const bad = { name: v('name').length < 2, email: !emailOK(v('email')), phone: v('phone') && !/^[+\d][\d\s\-]{6,15}$/.test(v('phone')), service: !v('service'), details: v('details').length < 20 };
    const file = f.elements.file.files[0]; bad.file = !!(file && file.size > 5 * 1024 * 1024);
    Object.entries(bad).forEach(([k, b]) => setBad(f, k, !!b));
    const msg = $('#formmsg');
    if (Object.values(bad).some(Boolean)) { msg.innerHTML = '<div class="alert no">Please fix the highlighted fields and try again.</div>'; return; }
    if (rateLimited('inq', 3, 600000)) { msg.innerHTML = '<div class="alert no">Too many submissions. Please wait a few minutes and try again.</div>'; return; }
    const list = store.get('inquiries', []); list.push({ date: new Date().toISOString(), name: v('name'), email: v('email'), phone: v('phone'), company: v('company'), service: v('service'), budget: v('budget'), details: v('details'), file: file ? file.name : '' }); store.set('inquiries', list);
    msg.innerHTML = '<div class="alert ok"><strong>Thank you!</strong> Your inquiry was recorded. <em>Demo notice: this build has no email or server connected, so it is saved in this browser only.</em></div>'; f.reset(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (kind === 'sreg') {
    if (v('name').length < 2 || !emailOK(v('email')) || v('password').length < 8) return toast('Enter a name, valid email and 8+ character password.');
    const st = store.get('students', []); if (st.find(x => x.email === v('email').toLowerCase())) return toast('That email is already registered.');
    const s = { name: v('name'), email: v('email').toLowerCase(), hash: await sha(v('password')) }; st.push(s); store.set('students', st); store.set('student_session', { name: s.name, email: s.email }); route();
  }
  if (kind === 'slogin') {
    if (rateLimited('slogin', 5, 300000)) return toast('Too many attempts. Try again in a few minutes.');
    const s = store.get('students', []).find(x => x.email === v('email').toLowerCase());
    if (!s || s.hash !== await sha(v('password'))) { const m = $('#smsg'); m.hidden = false; m.textContent = 'Invalid email or password.'; return; }
    store.set('student_session', { name: s.name, email: s.email }); route();
  }
  if (kind === 'asetup') { if (v('pass').length < 10) return toast('Use at least 10 characters.'); store.set('admin_hash', await sha(v('pass'))); sessionStorage.setItem('dsa_admin', '1'); route(); }
  if (kind === 'alogin') {
    if (rateLimited('alogin', 5, 300000)) return toast('Too many attempts. Try again in a few minutes.');
    if (await sha(v('pass')) === store.get('admin_hash')) { sessionStorage.setItem('dsa_admin', '1'); route(); } else { const m = $('#amsg'); m.hidden = false; m.textContent = 'Incorrect passcode.'; }
  }
}

/* ---------- global events ---------- */
document.addEventListener('submit', onSubmit);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.addEventListener('click', e => {
  const cl = e.target.closest('[data-close]'); if (cl && (cl.classList.contains('overlay') ? e.target === cl : true)) { closeModal(); }
  const dd = e.target.closest('.has-dd > a.nl'); if (dd && window.innerWidth <= 1020 && !dd.parentElement.classList.contains('open')) { e.preventDefault(); dd.parentElement.classList.add('open'); return; }
  const t = e.target.closest('[data-act]'); if (!t) return; const a = t.dataset.act;
  if (a === 'menu') { const n = $('#navlinks'); const o = n.classList.toggle('open'); t.setAttribute('aria-expanded', o); }
  else if (a === 'search') searchModal();
  else if (a === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
  else if (a === 'wa') { if (S.whatsapp) window.open('https://wa.me/' + S.whatsapp.replace(/\D/g, ''), '_blank', 'noopener'); else toast('WhatsApp number not configured yet (placeholder).'); }
  else if (a === 'chat') { const c = $('.chatbox'); if (c) c.remove(); else { const b = document.createElement('div'); b.className = 'chatbox'; b.innerHTML = '<header><span>Live chat</span><button data-act="chat" aria-label="Close" style="background:none;border:0;color:#fff;cursor:pointer">✕</button></header><div>Live chat is a placeholder. Connect a provider (Tawk.to, Crisp, Intercom…) in app.js. Meanwhile, please use the <a class="link" href="#/contact">contact form</a>.</div>'; document.body.appendChild(b); } }
  else if (a === 'copy') { navigator.clipboard && navigator.clipboard.writeText(location.href).then(() => toast('Link copied'), () => toast('Could not copy')); }
  else if (a === 'project') { const p = D.projects[+t.dataset.i]; modal(`<span class="tag demo">Demo concept, not client work</span><h2 style="margin:10px 0">${esc(p.name)}</h2><p style="margin-bottom:12px">${esc(p.desc)}</p><p><strong>Category:</strong> ${esc(p.cat)}<br><strong>Technologies:</strong> ${p.tech.map(esc).join(', ')}</p><p style="margin-top:16px"><a class="btn btn-primary btn-sm" href="#/contact?service=${encodeURIComponent(p.cat)}" data-close>Start a similar project</a></p>`); }
  else if (a === 'enroll') { const me = store.get('student_session', null); if (!me) { toast('Please register or log in first.'); location.hash = '#/student'; return; } const k = 'enroll_' + me.email, en = store.get(k, {}); if (!en[t.dataset.slug]) en[t.dataset.slug] = { done: [] }; store.set(k, en); toast('Enrolled (demo). See your Student Portal.'); location.hash = '#/student'; }
  else if (a === 'lesson') { const me = store.get('student_session'); const k = 'enroll_' + me.email, en = store.get(k, {}), d = en[t.dataset.slug].done, i = +t.dataset.i; en[t.dataset.slug].done = t.checked ? [...new Set([...d, i])] : d.filter(x => x !== i); store.set(k, en); route(); }
  else if (a === 'slogout') { localStorage.removeItem('dsa_student_session'); route(); }
  else if (a === 'cert') { const me = store.get('student_session'), c = courses.find(x => x.slug === t.dataset.slug); modal(`<div class="cert"><p>Digital Skill Academy</p><h2>Certificate of Completion (Demo)</h2><p style="margin:14px 0">This certifies that</p><h3 style="font-size:1.6rem">${esc(me.name)}</h3><p style="margin:14px 0">has completed all modules of</p><h3>${esc(c.title)}</h3><p style="margin-top:20px;font-size:.8rem;color:var(--muted)">Unofficial demo certificate · ${new Date().toLocaleDateString('en-GB')}</p></div><p style="margin-top:14px"><button class="btn btn-primary btn-sm" onclick="window.print()">Print</button></p>`); }
  else if (a === 'alogout') { sessionStorage.removeItem('dsa_admin'); route(); }
  else if (a === 'adel') { const k = t.dataset.kind, l = store.get(k, []); l.splice(+t.dataset.i, 1); store.set(k, l); route(); }
  else if (a === 'acsv') { const l = store.get(t.dataset.kind, []); if (!l.length) return toast('Nothing to export.'); const keys = Object.keys(l[0]).filter(k => k !== 'hash'); const csv = [keys.join(','), ...l.map(r => keys.map(k => '"' + String(r[k] == null ? '' : r[k]).replace(/"/g, '""').replace(/^([=+\-@])/, "'$1") + '"').join(','))].join('\n'); const a2 = document.createElement('a'); a2.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a2.download = t.dataset.kind + '.csv'; a2.click(); }
});
window.addEventListener('scroll', () => { const b = $('.fab.top'); if (b) b.hidden = window.scrollY < 600; }, { passive: true });
window.addEventListener('hashchange', route);

/* ---------- boot ---------- */
$('#chrome-top').innerHTML = header();
$('#chrome-bottom').innerHTML = footer();
if (!store.get('cookie', null)) {
  const c = document.createElement('div'); c.className = 'cookie'; c.setAttribute('role', 'dialog'); c.setAttribute('aria-label', 'Cookie notice');
  c.innerHTML = `<p>We use essential storage to make this site work and, once configured, analytics to improve it. See our <a class="link" href="#/privacy">Privacy Policy</a>.</p><button class="btn btn-primary btn-sm" data-ck="1">Accept</button><button class="btn btn-outline btn-sm" data-ck="0">Decline</button>`;
  c.addEventListener('click', e => { const b = e.target.closest('[data-ck]'); if (b) { store.set('cookie', b.dataset.ck); c.remove(); } });
  document.body.appendChild(c);
}
route();
})();
