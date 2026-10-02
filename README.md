📘 中文文档：[README.zh-CN.md](README.zh-CN.md)

# PromptShield — Anti-Hallucination Prompt Templates

🛡️ **PromptShield** is a curated pack of **anti-hallucination AI prompt templates** for developers and indie builders. Every template bakes in strict rules — citations required, refuse when uncertain, explicit disclaimers — so your AI features stop making things up in production.

> A small digital product by Darwin (Klay). It is **not** a security scanner or injection-detection tool — it's a set of prompts you copy and paste.

---

## 🎯 The problem it solves (why this exists)

LLMs sound confident even when they're wrong. For anyone shipping AI into a real product, that's not a quirk — it's a liability:

- **They fabricate.** Invented citations, fake DOIs, non-existent statistics, made-up legal clauses or medical advice — delivered with total confidence.
- **They overstep.** A chatbot "diagnoses," a copywriter invents product specs, a researcher asserts facts with zero sources.
- **Existing guardrails are built for enterprises.** Tools like Lakera, Guardrails AI, or Microsoft Presidio are API platforms: accounts, auth, infra, monthly contracts. There is **almost nothing lightweight for a solo dev or indie maker** who just wants prompts that don't make shit up.

**PromptShield is the consumer / indie-grade answer:** copy-paste prompt templates that enforce "cite-or-refuse" discipline by construction — no backend, no SDK, no subscription to another dashboard.

---

## ✨ What it does

You paste a template into ChatGPT / Claude / Gemini / Perplexity, drop in your content, and get output that is:

- **Grounded** — refuses to answer without verified sources (researcher, citation auditor, data guard).
- **Bounded** — explicitly states what it will *not* do: no diagnosis, no buy/sell advice, no legal opinion (medical, finance, legal, contract guards).
- **Honest about uncertainty** — surfaces caveats instead of confident hallucinations (data, UX, support guards).
- **Fact-checking by default** — flags inflated résumés, fake reviews, unverified social claims, fabricated case studies.

Each template is a **Mega-Prompt**: a clear `Role` + `Strict Rules` + `Output Format` + your `Input` — the same professional structure that makes prompts reliably behave.

---

## 📦 What's inside (20 templates, 10 categories)

- **K-Beauty INCI Analyzer** — cosmetic ingredient breakdown with conservative EWG-style ratings
- **Gaokao-EN Wordbank Builder** — CEFR B1–B2 vocabulary tables for Chinese college-entrance exam prep
- **Legal Q&A Guard** — answers only with a stated jurisdiction + double disclaimers
- **Medical Triage Filter** — symptom-to-department routing, never diagnoses
- **Web-Search-Required Researcher** — refuses to answer without verified citations
- **Finance Disclaimer Guard** — explains concepts, refuses buy/sell/hold advice
- **Code Review Critic** — finds bugs & security issues, never certifies bug-free
- **Academic Citation Auditor** — flags fabricated references, refuses to invent DOIs
- **Support Reply Guard** — drafts support replies only from your knowledge base
- **E-com Copy Guard** — writes product copy strictly from source specs
- **Resume Fact-Checker** — flags inflated/fabricated résumé claims
- **Legal Contract Guard** — flags one-sided clauses, refuses legal advice
- **Admissions Essay Guard** — flags fabricated credentials, refuses to invent
- **Data Interpretation Guard** — explains data with caveats, refuses fake stats
- **Social Post Copy Guard** — flags unverified claims & fake urgency in social captions, never fabricates engagement
- **Cold Email Guard** — flags spammy tactics & fabricated case studies in outreach
- **Product Description Guard** — flags unverifiable specs & fake reviews in listings
- **UX Copy Guard** — flags dark patterns & misleading microcopy in UI text
- **Meeting Notes Guard** — turns raw notes into decisions/actions without inventing owners
- **Investment Research Guard** — summarizes market info with sourced claims, no guarantees

---

## 🔑 Key features

- **Anti-hallucination by design** — every template encodes "cite-or-refuse" and no-fabrication constraints.
- **Real input → output examples** — see exactly what a template produces before you buy.
- **Mega-Prompt structure** — Role + Strict Rules + Output Format, visible on every template.
- **Multi-model** — each template is tagged with the models it works best on (ChatGPT / Claude / Gemini / Perplexity).
- **Free sample layer** — 4 full-access templates, MIT licensed, no paywall.
- **Lifetime unlock** — one payment, all 20 templates + future drops.
- **Bilingual site** — English / 中文 with a one-tap toggle.

---

## 👤 Who it's for

- **Indie makers & solo developers** shipping AI features who can't afford an enterprise guardrail stack.
- **#buildinpublic** founders who want their demos to stop confidently inventing facts.
- **Content & research workflows** where sourced, honest output matters more than fluent bluffing.
- **Anyone** tired of pasting "don't hallucinate" and hoping it works.

---

## 🌐 Live site & free companion

- **Site:** https://anjianzhao.space — browse templates, see examples, unlock the full pack.
- **AI Launchpad** (free tool): turns a one-line idea into a project README + blueprint — `launchpad/index.html`.

---

## 🧰 Tech stack

- Pure HTML5 + hand-written CSS (Apple-style design system) + vanilla JavaScript
- No build step, no backend, no runtime dependencies
- Deployed on Vercel (custom domain `anjianzhao.space`)

## 💻 Local development

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

---

## 💳 Pricing & payments

- **Free** — 4 sample templates (full access), MIT licensed.
- **Lifetime — $1.9** — one-time payment; all 20 templates + future drops. Processed by Creem (Merchant of Record). 14-day refund.

---

## 🔗 Same author

Private repos in Darwin's AI toolkit: `aboutresume` (portfolio), `evalkit` (AI education assessment), `MyHomepage`, `hiring-ai`.

---

## 📄 License

MIT — for the codebase. Templates are licensed per the Terms of Service on the site.

---

**Author**: Darwin An
