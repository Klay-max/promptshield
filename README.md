📘 中文文档：[README.zh-CN.md](README.zh-CN.md)

# PromptShield — Anti-Hallucination Prompt Templates

🛡️ **PromptShield** is a curated pack of prompt templates for developers and indie builders. Templates encourage source-grounded answers, explicit uncertainty, and refusal boundaries; they do not guarantee correct model behavior.

> **Scope:** copy-and-paste prompt templates only. PromptShield is not a security scanner, prompt-injection detector, or runtime guardrail, and it cannot guarantee that a model will not hallucinate.
>
> **Maintenance:** frozen at v1.6. No feature roadmap or response-time commitment is offered; Issues are reviewed periodically.

---

## 🎯 The problem it solves (why this exists)

LLMs sound confident even when they're wrong. For anyone shipping AI into a real product, that's not a quirk — it's a liability:

- **They fabricate.** Invented citations, fake DOIs, non-existent statistics, made-up legal clauses or medical advice — delivered with total confidence.
- **They overstep.** A chatbot "diagnoses," a copywriter invents product specs, a researcher asserts facts with zero sources.
- **Existing guardrails are built for enterprises.** Tools like Lakera, Guardrails AI, or Microsoft Presidio are API platforms: accounts, auth, infra, monthly contracts. There is **almost nothing lightweight for a solo dev or indie maker** who just wants prompts that don't make shit up.

**PromptShield is the consumer / indie-grade answer:** copy-paste prompt templates that enforce "cite-or-refuse" discipline by construction — no backend, no SDK, no subscription to another dashboard.

---

## ✨ What it does

You can paste a template into a model and provide your content. The template asks the model to:

- **Prefer sources** — request citations or decline unsupported claims (researcher, citation auditor, data guard).
- **State boundaries** — clarify limits such as no diagnosis, buy/sell advice, or legal opinion.
- **Surface uncertainty** — include caveats and distinguish supplied facts from assumptions.
- **Review claims** — flag résumé, review, social, and case-study claims that need verification.

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

- **Grounding-oriented templates** — templates ask models to cite sources, state uncertainty, and avoid unsupported claims; results still require human review.
- **Real input → output examples** — see exactly what a template produces before you buy.
- **Mega-Prompt structure** — Role + Strict Rules + Output Format, visible on every template.
- **Multi-model** — each template is tagged with the models it works best on (ChatGPT / Claude / Gemini / Perplexity).
- **Free sample layer** — 4 templates marked FREE in this repository snapshot.
- **Template collection** — 20 templates across 10 categories in this repository snapshot.
- **Bilingual site** — English / 中文 with a one-tap toggle.

---

## 👤 Who it's for

- **Indie makers & solo developers** shipping AI features who can't afford an enterprise guardrail stack.
- **#buildinpublic** founders who want their demos to stop confidently inventing facts.
- **Content & research workflows** where sourced, honest output matters more than fluent bluffing.
- **Anyone** tired of pasting "don't hallucinate" and hoping it works.

---

## 🌐 Site & free companion

- **Site:** https://anjianzhao.space — Vercel Production deployment completed on 2026-10-15. Darwin confirms one successful checkout test; this does not establish ongoing payment or fulfillment reliability.
- **AI Launchpad** (free tool): turns a one-line idea into a project README + blueprint — `launchpad/index.html`.

---

## 🧰 Tech stack

- Pure HTML5 + hand-written CSS (Apple-style design system) + vanilla JavaScript
- No build step, no backend, no runtime dependencies
- Static site source; the 2026-10-15 Vercel Production deployment completed successfully.

## 💻 Local development

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

---

## 🧊 Maintenance scope

This repository is frozen at v1.6. One successful checkout test was reported by Darwin; it does not guarantee ongoing payment or fulfillment. No fast-response support or future template releases are promised.

The legacy v1.6 PDF was removed from the working tree because its marketing claims were outdated. A reviewed replacement is blocked until the source template data is available; the current generator references a file not included in this repository.

---

## 📄 License

MIT — for the codebase. Templates are licensed per the Terms of Service on the site.

---

**Author**: Darwin An
