/* Dear Someone — shared layout + interactions (no build step, no dependencies) */

const CONFIG = {
  email: "info.dearsomeone@gmail.com",
  // Paste the Google Apps Script web app URL here (README → "Forms and The Wall").
  // While empty, forms open a pre-filled email instead, and wall notes stay on the visitor's device.
  formEndpoint: "https://script.google.com/macros/s/AKfycbzNSRse8QVu79fXDGbMuziGiA9NyfxV4L5Wpv2sg9zisFuhDg1qkpRoLLibU4lBjZvZfA/exec",
  substack: "https://substack.com/@mixedbutnotconfused",
  instagram: "https://www.instagram.com/juuust_angel/",
  tiktok: "https://www.tiktok.com/@juuust_angel?lang=fr",
};

const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM21.9 7.1c-.1-1.6-.4-3-1.6-4.2S17.6 1.4 16 1.3C14.3 1.2 9.7 1.2 8 1.3c-1.6.1-3 .4-4.2 1.6S2.2 5.5 2.1 7.1C2 8.8 2 13.2 2.1 14.9c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.7.1 6.3.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.7.1-6.1.2-7.8zM19.7 17a3.2 3.2 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.9.4s-4.6.1-5.9-.4A3.2 3.2 0 0 1 4.3 17c-.5-1.3-.4-4.3-.4-5.9s-.1-4.6.4-5.9A3.2 3.2 0 0 1 6.1 3.4C7.4 2.9 10.4 3 12 3s4.6-.1 5.9.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.9s.1 4.6-.4 5.9z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>',
  substack: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h18v2.4H3zm0 4.6h18V10H3zM3 12.2h18V22l-9-5-9 5z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5h20v14H2zm2 2v.4l8 5.3 8-5.3V7zm16 10V9.8l-8 5.3-8-5.3V17z"/></svg>',
};

const NAV = [
  ["book.html", "Book"],
  ["game.html", "Game"],
  ["podcast.html", "Podcast"],
  ["writing.html", "Writing"],
  ["about.html", "About"],
  ["connect.html", "Connect"],
];

const here = location.pathname.split("/").pop() || "index.html";

function header() {
  const links = NAV.map(([href, label]) =>
    `<a href="${href}"${href === here ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  return `
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap">
      <a class="logo" href="index.html" aria-label="Dear Someone home">
        <span class="mono">DS</span><span class="word">Dear Someone</span>
      </a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
      <nav class="nav" id="nav" aria-label="Main">${links}</nav>
    </div>
  </header>`;
}

function socials() {
  return `<div class="socials">
    <a href="${CONFIG.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
    <a href="${CONFIG.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${ICONS.tiktok}</a>
    <a href="${CONFIG.substack}" target="_blank" rel="noopener" aria-label="Substack">${ICONS.substack}</a>
    <a href="mailto:${CONFIG.email}" aria-label="Email">${ICONS.mail}</a>
  </div>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <span class="eyebrow" style="color:var(--sand)">With love, always</span>
          <div class="foot-sign">— Marlène</div>
          ${socials()}
        </div>
        <div>
          <span class="eyebrow" style="color:var(--sand)">The rooms</span>
          <ul class="foot-list">
            <li><a href="book.html">The Book</a></li>
            <li><a href="game.html">The Card Game</a></li>
            <li><a href="podcast.html">New-ance Podcast</a></li>
            <li><a href="writing.html">Writing</a></li>
          </ul>
        </div>
        <div>
          <span class="eyebrow" style="color:var(--sand)">Say hello</span>
          <ul class="foot-list">
            <li><a href="about.html">Meet Marlène</a></li>
            <li><a href="connect.html">Contact</a></li>
            <li><a href="wall.html">The Wall</a></li>
            <li><a href="press.html">Press &amp; Media kit</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} Dear Someone · Marlène Mutwa</span>
        <span><a href="privacy.html">Privacy</a> &nbsp;·&nbsp; <a href="terms.html">Terms</a></span>
      </div>
    </div>
  </footer>
  <button class="float-note" aria-label="Open a little note" aria-expanded="false">✉︎</button>
  <div class="note-pop" role="dialog" aria-label="A little note">
    <span class="script">Dear someone,</span>
    <p id="note-text"></p>
    <button class="tiny" id="note-next">Another one →</button>
  </div>`;
}

/* ---------- Postal pieces: stamps, postmarks and the postbox ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const PA_ROOMS = {
  book: { num: "I", name: "The Book" },
  game: { num: "II", name: "The Card Game" },
  pod: { num: "III", name: "New-ance" },
  write: { num: "IV", name: "Writing" },
};
const svg100 = (inner) => `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
const MOTIF = {
  book: svg100('<path d="M50 30C40 23 26 22 14 26V74C26 70 40 71 50 78C60 71 74 70 86 74V26C74 22 60 23 50 30Z"/><path d="M50 30V78"/><path d="M22 37C29 35 37 35.5 43 38.5M22 46C29 44 37 44.5 43 47.5M22 55C29 53 37 53.5 43 56.5M57 38.5C63 35.5 71 35 78 37M57 47.5C63 44.5 71 44 78 46M57 56.5C63 53.5 71 53 78 55" stroke-width="2"/><path d="M66 73V88L70.5 84L75 88V71.5" fill="currentColor" stroke="none"/>'),
  game: svg100('<rect x="33" y="22" width="34" height="50" rx="4" transform="rotate(-18 50 80)"/><rect x="33" y="22" width="34" height="50" rx="4" transform="rotate(18 50 80)"/><rect class="pa-occ" x="33" y="20" width="34" height="50" rx="4"/><path d="M53 33A9 9 0 0 0 53 51A12 12 0 0 1 53 33Z" fill="currentColor" stroke="none"/><circle cx="41" cy="60" r="1.7" fill="currentColor" stroke="none"/><circle cx="59" cy="62" r="1.7" fill="currentColor" stroke="none"/>'),
  pod: svg100('<circle cx="50" cy="50" r="18"/><path d="M50 32A18 18 0 0 0 50 68Z" fill="currentColor" stroke="none"/><path d="M26 38Q19 50 26 62M17 31Q6 50 17 69M74 38Q81 50 74 62M83 31Q94 50 83 69"/>'),
  write: svg100('<g transform="translate(62 40) rotate(35)"><path d="M0 30L-11 4C-13 -6 -9 -16 -9 -24H9C9 -16 13 -6 11 4Z"/><path d="M0 30V6"/><circle cx="0" cy="2" r="3.2"/></g><path d="M45 65C38 72 30 74 26 70C22 66 28 60 32 66C36 72 30 80 20 82" stroke-width="2.4"/>'),
  ds: svg100('<text x="50" y="64" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="500" font-size="46" fill="currentColor" stroke="none">DS</text>'),
};
const POSTBOX = `<svg viewBox="0 0 120 204" aria-hidden="true" focusable="false">
  <ellipse cx="60" cy="199" rx="52" ry="4.5" fill="rgba(47,38,26,.18)"/>
  <rect x="14" y="184" width="92" height="13" rx="2.5" fill="#2f261a"/>
  <rect x="20" y="62" width="80" height="124" fill="#d2602b"/>
  <path d="M14 66Q14 21 60 17Q106 21 106 66Z" fill="#d2602b"/>
  <path d="M30 60Q32 32 60 27" fill="none" stroke="rgba(251,245,234,.28)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="60" cy="13" r="5.5" fill="#b4532a"/>
  <rect x="11" y="58" width="98" height="11" rx="3" fill="#b4532a"/>
  <rect x="26" y="77" width="68" height="17" rx="3.5" fill="#b4532a"/>
  <rect class="pa-slot" x="32" y="86" width="56" height="4.5" rx="2" fill="#2f261a"/>
  <rect x="27" y="101" width="66" height="76" rx="3" fill="none" stroke="rgba(47,38,26,.25)" stroke-width="1.2"/>
  <rect x="24" y="70" width="5" height="112" fill="rgba(251,245,234,.14)"/>
  <rect x="37" y="109" width="46" height="31" rx="2" fill="#f5ead7"/>
  <text x="60" y="124" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="600" font-size="13" fill="#b4532a">DS</text>
  <text x="60" y="134.5" text-anchor="middle" font-family="Jost, sans-serif" font-size="5.6" letter-spacing="1.5" fill="#4e3f2c">LETTERS</text>
  <circle cx="84" cy="156" r="2.6" fill="#2f261a"/>
</svg>`;

function paStamp(room, o = {}) {
  const r = PA_ROOMS[room] || { num: "", name: "Dear Someone" };
  return `<span class="pa-stamp${o.cls ? " " + o.cls : ""}" data-room="${room}" aria-hidden="true"><span class="pa-stamp-paper pa-perf"><span class="pa-stamp-art"><span class="pa-stamp-den">${r.num}</span><span class="pa-stamp-motif">${MOTIF[room] || MOTIF.ds}</span>${o.name ? `<span class="pa-stamp-name">${r.name}</span>` : ""}</span></span></span>`;
}

// A rubber-stamp postmark: the ink texture is a shared SVG filter, added the first time one is drawn.
let pmN = 0;
function paPostmark(o = {}) {
  if (!document.getElementById("pa-ink")) document.body.insertAdjacentHTML("beforeend", `<svg class="pa-defs" aria-hidden="true" focusable="false"><defs>
  <filter id="pa-ink" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -6 0 0 0 4.1" result="speck"/>
    <feComposite in="SourceGraphic" in2="speck" operator="in" result="ink"/>
    <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="9" result="w"/>
    <feDisplacementMap in="ink" in2="w" scale="2.4" xChannelSelector="R" yChannelSelector="G"/>
  </filter></defs></svg>`);
  const id = "pa-pm" + ++pmN;
  const d = new Date(o.date || Date.now());
  const dm = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).replace(".", "").toUpperCase();
  return `<svg class="pa-postmark${o.cls ? " " + o.cls : ""}" viewBox="0 0 100 100" style="--rot:${o.rot ?? -12}deg" aria-hidden="true" focusable="false"><g filter="url(#pa-ink)">
    <defs><path id="${id}t" d="M17,50a33,33 0 0,1 66,0"/><path id="${id}b" d="M10.5,50a39.5,39.5 0 0,0 79,0"/></defs>
    <g fill="currentColor" stroke="none" font-size="9" letter-spacing="1.3"><text><textPath href="#${id}t" startOffset="50%" text-anchor="middle">${esc(o.top || "DEAR SOMEONE")}</textPath></text><text><textPath href="#${id}b" startOffset="50%" text-anchor="middle">${esc(o.bottom || "PAR AVION")}</textPath></text></g>
    <g fill="none" stroke="currentColor"><circle cx="50" cy="50" r="45" stroke-width="2.6"/><circle cx="50" cy="50" r="27.5" stroke-width="1.3"/></g>
    <g fill="currentColor" stroke="none" text-anchor="middle"><text x="50" y="49" font-size="11.5" letter-spacing=".6">${esc(o.c1 || dm)}</text><text x="50" y="61.5" font-size="9.5" letter-spacing="1">${esc(o.c2 || String(d.getFullYear()))}</text></g>
  </g></svg>`;
}

const ENVELOPE_HEAD = '<p class="pa-env-head" aria-hidden="true">Par avion</p><div class="pa-env-row"><span class="pa-lbl">To</span><span class="pa-hand">Marlène</span></div>';

function signupBlock(el) {
  const title = el.dataset.title || "Letters, delivered.";
  const text = el.dataset.text || "A warm note from me now and then, and first word whenever a new door opens.";
  const cta = el.dataset.cta || "Send me letters";
  const list = el.dataset.list || "newsletter";
  const room = { "book.html": "book", "game.html": "game", "podcast.html": "pod", "writing.html": "write" }[here] || "ds";
  el.outerHTML = `
  <section class="pa-post"${el.id ? ` id="${el.id}"` : ""} aria-labelledby="signup-${list}">
    <div class="wrap pa-post-grid">
      <div class="pa-post-copy">
        <span class="eyebrow">The mailing list</span>
        <h2 id="signup-${list}">${title}</h2>
        <p class="lead">${text}</p>
      </div>
      <div class="pa-post-stage">
        <form class="js-form pa-envelope pa-airmail" data-list="${list}" data-ok="Thank you, dear someone. Check your inbox soon.">
          ${paStamp(room, { cls: "pa-env-stamp" })}
          ${ENVELOPE_HEAD}
          <div class="pa-env-row"><label class="pa-lbl" for="em-${list}">From<span class="pa-sr">: your email address</span></label><input id="em-${list}" type="email" name="email" placeholder="your@email.com" required autocomplete="email"></div>
          <button class="btn" type="submit">${cta}</button>
          <p class="form-note">You can unsubscribe at any time. See our <a href="privacy.html">privacy note</a>.</p>
        </form>
        <div class="pa-postbox" aria-hidden="true">${POSTBOX}</div>
        <p class="pa-post-ok" role="status" aria-live="polite"></p>
      </div>
    </div>
  </section>`;
}

/* ---------- Mount layout ---------- */
document.body.insertAdjacentHTML("afterbegin", header());
document.querySelectorAll("[data-signup]").forEach(signupBlock);
document.querySelectorAll("[data-motif]").forEach((m) => { m.innerHTML = MOTIF[m.dataset.motif] || ""; });
document.body.insertAdjacentHTML("beforeend", footer());

/* ---------- Mobile nav ---------- */
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

/* ---------- Forms ---------- */
// A hidden field people never see or fill in. Spam bots do, and the backend quietly drops those.
document.querySelectorAll(".js-form, .wall-form").forEach((f) => f.insertAdjacentHTML("beforeend",
  '<div class="hp" aria-hidden="true"><label>Leave this empty <input name="ds_check" tabindex="-1" autocomplete="off"></label></div>'));

// Sent as plain text so the browser posts straight to Google Apps Script (no CORS preflight).
async function sendForm(data) {
  const r = await fetch(CONFIG.formEndpoint, { method: "POST", body: JSON.stringify(data) });
  const res = await r.json();
  if (!res.ok) throw new Error(res.error || "Not saved");
  return res;
}

document.addEventListener("submit", async (e) => {
  const form = e.target.closest(".js-form");
  if (!form) return;
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  data.list = form.dataset.list;
  const ok = () => {
    const msg = form.dataset.ok || "Thank you, dear someone.";
    const stage = form.closest(".pa-post-stage");
    if (stage) {
      const out = stage.querySelector(".pa-post-ok");
      out.textContent = "";
      setTimeout(() => { out.textContent = msg; }, 60);
      postLetter(form, stage, data.email);
    } else {
      form.querySelectorAll(".form-ok").forEach((n) => n.remove());
      form.insertAdjacentHTML("beforeend", `<p class="form-ok" role="status">${msg}</p>`);
    }
    form.reset();
  };
  if (data.ds_check) return ok();
  delete data.ds_check;
  if (CONFIG.formEndpoint) {
    const btn = form.querySelector('[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      await sendForm(data);
      return ok();
    } catch (_) { /* fall through to email, so nothing is lost */ } finally {
      if (btn) btn.disabled = false;
    }
  }
  const subject = `Dear Someone: ${data.subject || data.list}`;
  const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
  const mailto = (text) => `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  if (mailto(body).length <= 1800) {
    location.href = mailto(body);
    return ok();
  }
  // Long letters can be cut off by email apps: copy the full text, and keep the form filled in.
  let copied = false;
  try { await navigator.clipboard.writeText(body); copied = true; } catch (_) { /* clipboard unavailable */ }
  location.href = mailto(copied ? "(Your full letter is copied. Paste it here.)" : "(Please paste your letter here.)");
  form.querySelectorAll(".form-ok").forEach((n) => n.remove());
  form.insertAdjacentHTML("beforeend", `<p class="form-ok" role="status">${copied
    ? "Your letter is long, so we copied it for you. Paste it into the email that just opened."
    : "Your letter is long. Please copy it into the email that just opened. Everything you wrote is still here."}</p>`);
});

/* ---------- Long letters: the writing space grows as you write ---------- */
const grow = (t) => { t.style.height = "auto"; t.style.height = t.scrollHeight + 2 + "px"; };
document.addEventListener("input", (e) => { if (e.target.matches("textarea[data-grow]")) grow(e.target); });
document.addEventListener("reset", (e) => e.target.querySelectorAll("textarea[data-grow]").forEach((t) => (t.style.height = "")));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    io.unobserve(en.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Floating note ---------- */
const NOTES = [
  "you are allowed to begin again, as many times as it takes.",
  "the version of you that survived deserves your gentleness.",
  "rest is not a reward. It is part of the becoming.",
  "you can be grateful and still grieve. Both are allowed.",
  "what you call 'too much' may be exactly what someone needs.",
  "grace was never meant to be earned. Receive it.",
  "your story is not over just because this chapter is hard.",
  "be as patient with yourself as God is with you.",
];
const pop = document.querySelector(".note-pop");
const noteBtn = document.querySelector(".float-note");
const noteText = document.getElementById("note-text");
let noteI = Math.floor(Math.random() * NOTES.length);
const showNote = () => { noteText.textContent = NOTES[noteI++ % NOTES.length]; };
noteBtn.addEventListener("click", () => {
  const open = pop.classList.toggle("show");
  noteBtn.setAttribute("aria-expanded", open);
  noteBtn.textContent = open ? "×" : "✉︎";
  if (open) showNote();
});
document.getElementById("note-next").addEventListener("click", showNote);

/* ---------- Photos: no right-click saving or dragging out ---------- */
document.addEventListener("contextmenu", (e) => { if (e.target.closest("img")) e.preventDefault(); });
document.addEventListener("dragstart", (e) => { if (e.target.closest("img")) e.preventDefault(); });

/* ---------- Sparkle cursor (desktop, motion-safe) ---------- */
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!calm && matchMedia("(pointer: fine)").matches) {
  let last = 0;
  addEventListener("pointermove", (e) => {
    const now = performance.now();
    if (now - last < 60) return;
    last = now;
    const s = document.createElement("span");
    s.className = "spark";
    s.textContent = Math.random() > 0.5 ? "✦" : "·";
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    s.style.setProperty("--dx", (Math.random() - 0.5) * 40 + "px");
    s.style.setProperty("--dy", Math.random() * 30 + 10 + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  });
}

/* ---------- Draggable polaroids ---------- */
let z = 10;
document.querySelectorAll(".polaroid").forEach((p) => {
  p.addEventListener("pointerdown", (e) => {
    if (matchMedia("(max-width: 700px)").matches) return;
    const box = p.parentElement.getBoundingClientRect();
    const start = { x: e.clientX, y: e.clientY, l: p.offsetLeft, t: p.offsetTop };
    p.style.zIndex = ++z;
    p.setPointerCapture(e.pointerId);
    const move = (ev) => {
      const l = Math.max(-40, Math.min(box.width - p.offsetWidth + 40, start.l + ev.clientX - start.x));
      const t = Math.max(-40, Math.min(box.height - p.offsetHeight + 40, start.t + ev.clientY - start.y));
      p.style.left = l + "px";
      p.style.top = t + "px";
    };
    const up = () => { p.removeEventListener("pointermove", move); p.removeEventListener("pointerup", up); };
    p.addEventListener("pointermove", move);
    p.addEventListener("pointerup", up);
  });
});

/* ---------- Typed salutation: "Dear someone" → "Dear you" ---------- */
const cycler = document.querySelector(".cycler");
if (cycler) {
  const words = JSON.parse(cycler.dataset.words);
  if (calm) cycler.textContent = words[words.length - 1];
  else {
    let w = 0, i = 0, del = false;
    const tick = () => {
      const word = words[w];
      cycler.textContent = word.slice(0, i);
      if (!del && i < word.length) { i++; return setTimeout(tick, 75); }
      if (!del) { if (w === words.length - 1) return; del = true; return setTimeout(tick, 1300); }
      if (i > 0) { i--; return setTimeout(tick, 35); }
      del = false; w++; setTimeout(tick, 250);
    };
    setTimeout(tick, 600);
  }
}

/* ---------- Mailing list: the envelope is posted into the box ---------- */
function postLetter(form, stage, email) {
  const box = stage.querySelector(".pa-postbox");
  const slot = box && box.querySelector(".pa-slot");
  stage.classList.remove("posted");
  if (calm || !slot || !form.animate) { void stage.offsetWidth; stage.classList.add("posted"); return; }
  stage.classList.add("posting");
  const g = document.createElement("div");
  g.className = "pa-env-ghost pa-envelope pa-airmail";
  g.setAttribute("aria-hidden", "true");
  g.innerHTML = `${form.querySelector(".pa-env-stamp").outerHTML}${ENVELOPE_HEAD}<div class="pa-env-row"><span class="pa-lbl">From</span><span class="pa-typed">${esc(email || "")}</span></div><span class="pa-flap"><svg viewBox="0 0 100 50" preserveAspectRatio="none"><path d="M0 0H100L50 47Z" fill="#f3e4c8" stroke="rgba(78,63,44,.28)" stroke-width="1" vector-effect="non-scaling-stroke"/></svg></span>`;
  g.style.left = form.offsetLeft + "px";
  g.style.top = form.offsetTop + "px";
  g.style.width = form.offsetWidth + "px";
  stage.appendChild(g);
  form.classList.add("away");
  const sr = stage.getBoundingClientRect();
  const sl = slot.getBoundingClientRect();
  const W = g.offsetWidth, H = g.offsetHeight, x0 = g.offsetLeft, y0 = g.offsetTop;
  const s = Math.min(1, (sl.width * 0.94) / W);
  const tx = sl.left - sr.left + sl.width / 2 - (s * W) / 2 - x0;
  const ty = sl.top - sr.top - s * H - y0;
  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    g.remove();
    stage.classList.remove("posting");
    stage.classList.add("posted");
    setTimeout(() => {
      form.classList.remove("away");
      form.classList.add("back");
      setTimeout(() => form.classList.remove("back"), 700);
    }, 2400);
  };
  (async () => {
    await g.querySelector(".pa-flap").animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 380, easing: "cubic-bezier(.3,.7,.4,1)", fill: "forwards" }).finished;
    await g.animate([
      { transform: "translate(0,0) rotate(-1deg) scale(1)" },
      { transform: `translate(${tx * 0.55}px, ${Math.min(ty, 0) - 46}px) rotate(-6deg) scale(${(1 + s) / 2})`, offset: 0.5 },
      { transform: `translate(${tx}px, ${ty}px) rotate(0deg) scale(${s})` },
    ], { duration: 950, easing: "cubic-bezier(.45,.05,.3,1)", fill: "forwards" }).finished;
    await g.animate([
      { transform: `translate(${tx}px, ${ty}px) scale(${s})`, clipPath: "inset(0 0 0 0)" },
      { transform: `translate(${tx}px, ${ty + s * H}px) scale(${s})`, clipPath: "inset(0 0 100% 0)" },
    ], { duration: 420, easing: "cubic-bezier(.55,0,.8,.55)", fill: "forwards" }).finished;
    box.classList.remove("gulp"); void box.offsetWidth; box.classList.add("gulp");
    done();
  })().catch(done);
  // If the animation timeline stalls (e.g. a hidden tab), still bring the envelope back.
  setTimeout(done, 2600);
}

/* ---------- About: the portrait stamp, the verse and the four rooms ---------- */
const me = document.querySelector(".pa-me");
if (me) me.insertAdjacentHTML("beforeend", paPostmark({ rot: -14, cls: "pa-me-pm" }));
const psalm = document.querySelector(".pa-psalm");
if (psalm) psalm.innerHTML = paPostmark({ top: "PSALM", bottom: "DEAR SOMEONE", c1: "46:5", c2: " ", rot: -9 });
document.querySelectorAll(".pa-rs[data-room]").forEach((a, i) => {
  a.style.setProperty("--tilt", [-4, 3, -2, 5][i % 4] + "deg");
  a.insertAdjacentHTML("afterbegin", paStamp(a.dataset.room, { name: true, cls: "pa-rs-stamp" }));
});
// The luggage tag swings a little when you touch it
const tag = document.querySelector(".pa-luggage");
if (tag && !calm) {
  const swing = (e) => {
    if (e.target.closest("a")) return;
    tag.classList.remove("swing");
    void tag.offsetWidth;
    tag.classList.add("swing");
  };
  tag.addEventListener("click", swing);
  tag.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") swing(e); });
  tag.addEventListener("animationend", () => tag.classList.remove("swing"));
}

/* ---------- Book: Burundi, France, and the letters in between ---------- */
const route = document.querySelector(".pa-route");
if (route) {
  const path = route.querySelector(".pa-route-path");
  const mask = route.querySelector(".pa-route-draw");
  const letter = route.querySelector(".pa-route-letter");
  const L = path.getTotalLength();
  // The little letter stays upright and only leans with the slope of the route
  const place = (t) => {
    const p = path.getPointAtLength(L * t);
    const a = path.getPointAtLength(L * Math.max(0, t - 0.01));
    const b = path.getPointAtLength(L * Math.min(1, t + 0.01));
    const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    letter.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(ang * 0.6).toFixed(1)})`);
  };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const finish = () => { mask.setAttribute("stroke-dashoffset", "0"); route.classList.add("drawn", "home"); place(0); };
  place(1);
  if (calm) finish();
  else {
    mask.setAttribute("stroke-dashoffset", "1");
    const draw = () => {
      const t0 = performance.now(), d1 = 2300, d2 = 2600;
      const step = (now) => {
        const t = Math.min(1, (now - t0) / d1);
        mask.setAttribute("stroke-dashoffset", String(1 - ease(t)));
        if (t < 1) return requestAnimationFrame(step);
        route.classList.add("drawn");
        setTimeout(() => requestAnimationFrame((t1) => {
          const back = (n) => {
            const u = Math.min(1, (n - t1) / d2);
            place(1 - ease(u));
            if (u < 1) requestAnimationFrame(back); else route.classList.add("home");
          };
          back(t1);
        }), 350);
      };
      requestAnimationFrame(step);
    };
    const ro = new IntersectionObserver((en) => { if (en.some((x) => x.isIntersecting)) { ro.disconnect(); draw(); } }, { threshold: 0.45 });
    ro.observe(route);
  }
}

/* ---------- Coming back with the back button ---------- */
addEventListener("pageshow", (e) => {
  if (!e.persisted) return;
  document.querySelectorAll(".pa-env-ghost").forEach((g) => g.remove());
  document.querySelectorAll(".pa-envelope.away").forEach((f) => f.classList.remove("away"));
  document.querySelectorAll(".pa-post-stage.posting").forEach((s) => s.classList.remove("posting"));
});
