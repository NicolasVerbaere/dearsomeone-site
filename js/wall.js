/* The Wall: storage and handwriting helpers for wall.html.
   Stories and replies are sent to the Google Sheet backend (CONFIG.formEndpoint in js/site.js,
   see backend/apps-script.gs). Nothing goes up until Marlène ticks "Approved". Meanwhile, your own
   notes are kept in this browser (localStorage) so you can see them, marked as waiting.
   Without an endpoint (a local preview), notes only ever live in this browser. */

const Wall = (() => {
  const KEY = "ds-wall";
  const API = (typeof CONFIG !== "undefined" && CONFIG.formEndpoint) || "";
  const PAPERS = ["notebook", "card", "sticky", "kraft"];
  const FORGET = 30 * 864e5; // a note that never went up stops showing to its writer after 30 days
  const empty = () => ({ letters: [], replies: {} });
  const read = () => {
    try { return Object.assign(empty(), JSON.parse(localStorage.getItem(KEY))); } catch (_) { return empty(); }
  };
  const write = (d) => {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (_) { /* storage blocked or full */ }
  };
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const clean = (s, max) => String(s || "").trim().slice(0, max);

  // Preview only: add ?samples to the page address to see a filled wall. These are
  // made-up examples, stamped "Sample", and never shown without that flag.
  const SAMPLES = [
    { id: "s1", name: "Amara", to: "is still waiting", paper: "notebook", pen: 0,
      body: "I prayed for a door that never opened. I was angry about it for a long time, at God, at myself, at everyone who got theirs.\nI'm writing this from a life I didn't plan and wouldn't trade now. I'm not saying the waiting was easy. I'm saying it wasn't wasted.",
      replies: [{ id: "s1a", name: "Joy", body: "I needed \"it wasn't wasted\" today. Thank you." },
        { id: "s1b", name: "", body: "Reading this in a waiting room. Literally. Holding on." }] },
    { id: "s2", name: "", to: "feels too much", paper: "sticky", pen: 1,
      body: "I used to apologise for crying. At work, at church, at my mum's table.\nThis year I stopped. It turns out the people who love me were never asking me to be smaller.",
      replies: [{ id: "s2a", name: "Esther", body: "Same table, same apology. Stopping today." }] },
    { id: "s3", name: "J.", to: "is far from home", paper: "card", pen: 2,
      body: "My first winter in a new country, I didn't know a single person. A woman at the bus stop asked where I was from, then invited me to dinner.\nI never learned her last name. She saved my December.",
      replies: [] },
    { id: "s4", name: "Grace", to: "carries everyone", paper: "kraft", pen: 0,
      body: "I'm the one everyone calls. Last month, for the first time, I called someone first. My voice shook the whole time.\nShe just said, \"I'm here.\" That was it. That was everything.",
      replies: [{ id: "s4a", name: "", body: "Calling my sister tonight because of this." },
        { id: "s4b", name: "Ruth", body: "Proud of you, stranger." }] },
    { id: "s5", name: "", to: "lost someone", paper: "notebook", pen: 1,
      body: "My dad died in the spring. People keep telling me it gets easier. It hasn't, not yet.\nBut some mornings I laugh at something he would have laughed at, and for a second he's in the room again.",
      replies: [{ id: "s5a", name: "Daniel", body: "Five years for me. Those moments come more often. Sending you love." }] },
    { id: "s6", name: "Nadia", to: "is starting over", paper: "card", pen: 2,
      body: "I left a job, a city and a version of me that said yes to everything. I'm thirty-four and starting from the very beginning.\nScared? Every day. Free? Also every day.",
      replies: [{ id: "s6a", name: "", body: "Thirty-six, same story. Free is worth it." }] },
  ].map((s) => ({ ...s, sample: true }));
  const showSamples = new URLSearchParams(location.search).has("samples");

  /* ---------- Storage ---------- */
  const str = (v) => (v == null ? "" : String(v));
  const tidyReply = (r) => ({ id: str(r.id), name: str(r.name), body: str(r.body), pen: Number(r.pen), createdAt: Number(r.createdAt) || 0 });
  const tidy = (l) => ({
    id: str(l.id), name: str(l.name), body: str(l.body), paper: str(l.paper), pen: Number(l.pen),
    createdAt: Number(l.createdAt) || 0, replies: Array.isArray(l.replies) ? l.replies.map(tidyReply) : [],
  });
  const send = (payload) => sendForm(payload); // shared with the other forms, in js/site.js

  // Your own notes leave this browser once they're on the wall, or after FORGET if they never go up.
  function prune(d, live) {
    const seen = new Set();
    live.forEach((l) => { seen.add(l.id); l.replies.forEach((r) => seen.add(r.id)); });
    const keep = (x) => !seen.has(x.id) && Date.now() - (x.createdAt || 0) < FORGET;
    d.letters = d.letters.filter(keep);
    Object.keys(d.replies).forEach((k) => {
      d.replies[k] = d.replies[k].filter(keep);
      if (!d.replies[k].length) delete d.replies[k];
    });
    write(d);
  }

  // Everything on the wall: your waiting notes first, then the approved ones, newest first.
  async function list() {
    const d = read();
    let live = [], failed = false;
    if (API) {
      try {
        const r = await fetch(API + (API.includes("?") ? "&" : "?") + "action=wall");
        const res = await r.json();
        if (!res.ok || !Array.isArray(res.letters)) throw new Error(res.error);
        live = res.letters.map(tidy).filter((l) => l.id && l.body);
        prune(d, live);
      } catch (_) { failed = true; }
    }
    const mine = d.letters.slice().sort((a, b) => b.createdAt - a.createdAt).map((l) => ({ ...l, pending: true }));
    const letters = mine.concat(live, showSamples ? SAMPLES : []).map((l) => ({
      ...l, replies: (l.replies || []).concat((d.replies[l.id] || []).map((r) => ({ ...r, pending: true }))),
    }));
    return { letters, failed };
  }
  async function post(input) {
    const letter = {
      name: clean(input.name, 40), body: clean(input.body, 2000),
      paper: PAPERS.includes(input.paper) ? input.paper : "notebook", pen: Number(input.pen) || 0,
    };
    let id = uid();
    if (API) id = (await send({ list: "wall-story", ...letter, mine: input.mine, ds_check: input.ds_check })).id || id;
    const saved = { ...letter, id, createdAt: Date.now() };
    const d = read();
    d.letters.push(saved);
    write(d);
    return { ...saved, pending: true, replies: [] };
  }
  async function reply(letter, input) {
    const r = { name: clean(input.name, 40), body: clean(input.body, 600), pen: Number(input.pen) || 0 };
    let id = uid();
    // Samples and notes still waiting aren't on the shared wall, so replies to them stay in this browser.
    if (API && !letter.sample && !letter.pending) {
      id = (await send({ list: "wall-reply", storyId: letter.id, ...r, ds_check: input.ds_check })).id || id;
    }
    const saved = { ...r, id, createdAt: Date.now() };
    const d = read();
    (d.replies[letter.id] = d.replies[letter.id] || []).push(saved);
    write(d);
    return { ...saved, pending: true };
  }

  /* ---------- Handwriting helpers ---------- */
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hash = (s) => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const pen = (item) => (Number.isInteger(item.pen) && item.pen >= 0 && item.pen < 3 ? item.pen : hash(item.id) % 3);
  const signed = (item) => "— " + (item.name || "Someone");
  const dear = (item) => (item.to ? `Dear someone who ${item.to.replace(/^who\s+/i, "").replace(/[\s,.;:]+$/, "")},` : "Dear someone,");
  const when = (ts) => (ts ? new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "");
  const preview = (text, max) => {
    if (text.length <= max) return text;
    const cut = text.lastIndexOf(" ", max);
    return text.slice(0, cut > max * 0.6 ? cut : max).replace(/[\s.,;:!?…]+$/, "") + "…";
  };
  const count = (n, one, many, none) => (n ? `${n} ${n === 1 ? one : many}` : none);

  // Build an element; strings are added as text nodes, so visitor writing is never parsed as HTML.
  function el(tag, props = {}, ...kids) {
    const n = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (v == null || v === false) return;
      if (k === "class") n.className = v;
      else if (k === "style") n.style.cssText = v;
      else if (k === "text") n.textContent = v;
      else n.setAttribute(k, v === true ? "" : v);
    });
    kids.flat().forEach((c) => c != null && n.append(c));
    return n;
  }

  // Letters appear word by word, as if the ink were still drying.
  function ink(node, text) {
    node.textContent = "";
    if (calm) { node.textContent = text; return; }
    const parts = text.split(/(\s+)/);
    const words = parts.filter((p) => p.trim()).length;
    const step = Math.min(55, 1500 / Math.max(words, 1));
    let i = 0;
    parts.forEach((p) => {
      if (!p.trim()) return node.append(p);
      node.append(el("span", { class: "inkw", style: `animation-delay:${Math.round(i++ * step)}ms` }, p));
    });
  }

  // Native modal dialogs: close button, click outside, focus back to the opener.
  // (The page behind stops scrolling through CSS while a dialog is open.)
  function wire(d) {
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-close]")) d.close();
    });
    d.addEventListener("close", () => {
      if (d.returnTo && d.returnTo.isConnected) d.returnTo.focus({ preventScroll: true });
    });
  }
  function open(d, opener) {
    d.returnTo = opener || document.activeElement;
    d.showModal();
  }

  return { live: !!API, list, post, reply, calm, hash, pen, signed, dear, when, preview, count, el, ink, wire, open };
})();
