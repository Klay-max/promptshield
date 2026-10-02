# -*- coding: utf-8 -*-
"""Generate PromptShield deliverable PDF from _templates.json (real site data)."""
import json, re, os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, PageBreak,
                                Preformatted, Table, TableStyle, HRFlowable)

BASE = os.path.dirname(os.path.abspath(__file__))
data = json.load(open(os.path.join(BASE, '_templates.json'), encoding='utf-8'))
PROMPTS, DETAILS, CATEGORIES = data['PROMPTS'], data['TEMPLATE_DETAILS'], data['CATEGORIES']
CAT = {c['key']: c for c in CATEGORIES}

# ---------- fonts ----------
pdfmetrics.registerFont(TTFont('MSYH', r'C:\Windows\Fonts\msyh.ttc', subfontIndex=0))
pdfmetrics.registerFont(TTFont('MSYHBD', r'C:\Windows\Fonts\msyhbd.ttc', subfontIndex=0))
pdfmetrics.registerFontFamily('MSYH', normal='MSYH', bold='MSYHBD', italic='MSYH', boldItalic='MSYHBD')

# ---------- palette ----------
INK    = colors.HexColor('#1D1D1F')
GRAY   = colors.HexColor('#6E6E73')
ACCENT = colors.HexColor('#0071E3')
BG     = colors.HexColor('#F5F5F7')
BORDER = colors.HexColor('#E5E5EA')
GREEN  = colors.HexColor('#34C759')

# ---------- helpers ----------
def strip_emoji(s):
    s = s.replace('\u26a0\ufe0f', '!').replace('\u26a0', '!')
    s = s.replace('\U0001f31f', '*').replace('\U0001f33f', '*')
    s = re.sub(r'[\U0001F000-\U0001FAFF\uFE0F\u2600-\u26FF]', '', s)
    return s

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def para(s, style):
    s = strip_emoji(s)
    s = esc(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = s.replace('`', '')
    return Paragraph(s, style)

def mono(s, style):
    return Preformatted(strip_emoji(s), style)

def prompt_box(body, style):
    t = Table([[mono(body, style)]], colWidths=[170*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    return t

# ---------- styles ----------
S = {}
S['coverTitle'] = ParagraphStyle('coverTitle', fontName='MSYHBD', fontSize=40, leading=48, textColor=INK, alignment=TA_CENTER)
S['coverSub']   = ParagraphStyle('coverSub', fontName='MSYH', fontSize=13, leading=20, textColor=GRAY, alignment=TA_CENTER)
S['coverBody']  = ParagraphStyle('coverBody', fontName='MSYH', fontSize=10, leading=17, textColor=INK, alignment=TA_LEFT)
S['h1']   = ParagraphStyle('h1', fontName='MSYHBD', fontSize=16, leading=21, textColor=INK, spaceAfter=2)
S['h2']   = ParagraphStyle('h2', fontName='MSYHBD', fontSize=10.5, leading=14, textColor=ACCENT, spaceBefore=6, spaceAfter=2)
S['h3']   = ParagraphStyle('h3', fontName='MSYHBD', fontSize=9, leading=12, textColor=INK, spaceBefore=5, spaceAfter=1)
S['body'] = ParagraphStyle('body', fontName='MSYH', fontSize=8.8, leading=13.5, textColor=INK)
S['small']= ParagraphStyle('small', fontName='MSYH', fontSize=8, leading=11, textColor=GRAY)
S['badge']= ParagraphStyle('badge', fontName='MSYHBD', fontSize=8, leading=10, textColor=ACCENT)
S['mono'] = ParagraphStyle('mono', fontName='MSYH', fontSize=7.6, leading=10.6, textColor=INK)
S['toc']  = ParagraphStyle('toc', fontName='MSYH', fontSize=8.8, leading=13, textColor=INK)
S['tocN'] = ParagraphStyle('tocN', fontName='MSYHBD', fontSize=8.8, leading=13, textColor=GRAY)

def meta_line(p):
    cat = CAT.get(p['cat'])
    catname = f"{cat['en']} / {cat['zh']}" if cat else p['cat']
    models = ' · '.join(p.get('models', []))
    free = 'FREE' if p.get('isFree') else ''
    return f"<font color='#6E6E73'>{catname}</font> &nbsp;&nbsp;|&nbsp;&nbsp; Models: {models}" + (f" &nbsp;&nbsp;|&nbsp;&nbsp; <font color='#34C759'><b>{free}</b></font>" if free else "")

def example_block(io_text, style):
    parts = re.split(r'\nOutput:|\n输出：', io_text)
    if len(parts) < 2:
        return mono(io_text, style)
    inp = re.sub(r'^Input:\s?|^输入：\s?', '', parts[0])
    out = re.sub(r'^Output:\s?|^输出：\s?', '', parts[1])
    rows = []
    rows.append(Paragraph('<b>Input</b>', S['h3']))
    rows.append(prompt_box(inp, style))
    rows.append(Paragraph('<b>Output</b>', S['h3']))
    rows.append(prompt_box(out, style))
    return rows

def template_flow(p):
    d = DETAILS.get(str(p['id']), {})
    flow = []
    # header
    flow.append(Paragraph(f"<font color='#0071E3'>#{p['id']}</font> &nbsp; {esc(p['en']['title'])}", S['h1']))
    flow.append(Paragraph(esc(p['zh']['title']), S['h2']))
    flow.append(Paragraph(meta_line(p), S['small']))
    flow.append(Spacer(1, 2))
    flow.append(HRFlowable(width='100%', thickness=0.6, color=BORDER, spaceAfter=6))
    for lang, flag in (('en', 'EN'), ('zh', 'ZH')):
        item = p[lang]
        det = d.get(lang) or {}
        flow.append(Paragraph(f"<b>{flag}</b> — {esc(item['desc'])}", S['body']))
        flow.append(Spacer(1, 3))
        flow.append(Paragraph('<b>Prompt · 提示词</b>', S['h3']))
        flow.append(prompt_box(item['body'], S['mono']))
        if det.get('useCase'):
            flow.append(Paragraph('<b>Use case · 使用场景</b>', S['h3']))
            flow.append(para(det['useCase'], S['body']))
        if det.get('io'):
            flow.append(Paragraph('<b>Example · 示例</b>', S['h3']))
            ex = example_block(det['io'], S['mono'])
            if isinstance(ex, list):
                flow.extend(ex)
            else:
                flow.append(ex)
        if det.get('principle'):
            flow.append(Paragraph('<b>Principle · 原理</b>', S['h3']))
            flow.append(para(det['principle'], S['body']))
        if det.get('boundary'):
            flow.append(Paragraph('<b>Boundary · 边界</b>', S['h3']))
            flow.append(para(det['boundary'], S['body']))
        flow.append(Spacer(1, 8))
    flow.append(PageBreak())
    return flow

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('MSYH', 7.5)
    canvas.setFillColor(GRAY)
    canvas.drawString(18*mm, 10*mm, 'PromptShield · 20 Anti-Hallucination Prompt Templates')
    canvas.drawRightString(192*mm, 10*mm, f'Page {doc.page}')
    canvas.restoreState()

# ---------- build ----------
doc = SimpleDocTemplate(os.path.join(BASE, 'PromptShield_Templates_v1.6.pdf'),
                        pagesize=A4, leftMargin=18*mm, rightMargin=18*mm,
                        topMargin=16*mm, bottomMargin=16*mm,
                        title='PromptShield — 20 Anti-Hallucination Prompt Templates',
                        author='Darwin An')
story = []

# cover
story.append(Spacer(1, 34*mm))
story.append(Paragraph('PromptShield', S['coverTitle']))
story.append(Spacer(1, 6))
story.append(Paragraph('🛡️ → 🛡 replaced', S['small']))  # placeholder replaced below
story = story[:-1]
story.append(Paragraph('20 Anti-Hallucination Prompt Templates<br/>20 个抗幻觉提示词模板', S['coverSub']))
story.append(Spacer(1, 10))
story.append(Paragraph('One-time <font color="#0071E3"><b>$1.9</b></font> · Lifetime access · 一次买断 · 终身使用', S['coverSub']))
story.append(Spacer(1, 16))
story.append(HRFlowable(width='40%', thickness=0.6, color=BORDER, spaceAfter=14, hAlign='CENTER'))
story.append(Paragraph(
    "PromptShield is a curated pack of anti-hallucination prompt templates: every template enforces "
    "“cite-or-refuse” discipline — citations required, refuse when uncertain, explicit disclaimers. "
    "Paste a template into ChatGPT / Claude / Gemini / Perplexity and ship grounded output.<br/><br/>"
    "PromptShield 是一套精选的抗幻觉提示词模板：每个模板都强制“有依据就给、没依据就拒绝”的纪律——"
    "必须给引用、不确定就拒绝、显式免责声明。把模板粘贴进 ChatGPT / Claude / Gemini / Perplexity，"
    "即可获得有依据的输出。", S['coverBody']))
story.append(Spacer(1, 10))
story.append(Paragraph('By Darwin An · <font color="#0071E3">https://anjianzhao.space</font> · August 2026 · v1.6', S['coverSub']))
story.append(PageBreak())

# toc
story.append(Paragraph('Templates · 模板清单', S['h1']))
story.append(HRFlowable(width='100%', thickness=0.6, color=BORDER, spaceAfter=8))
rows = [[Paragraph(f"<font color='#0071E3'>#{p['id']}</font>", S['tocN']),
         Paragraph(esc(p['en']['title']), S['toc']),
         Paragraph(esc(p['zh']['title']), S['toc']),
         Paragraph(CAT.get(p['cat'], {}).get('zh', p['cat']), S['small'])]
        for p in PROMPTS]
t = Table(rows, colWidths=[12*mm, 58*mm, 70*mm, 30*mm])
t.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.3, BORDER),
    ('BACKGROUND', (0,0), (-1,-1), colors.white),
    ('ROWBACKGROUNDS', (0,0), (-1,-1), [colors.white, BG]),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('LEFTPADDING', (0,0), (-1,-1), 6),
]))
story.append(t)
story.append(Spacer(1, 8))
story.append(Paragraph('4 templates are fully free (marked FREE) · 16 require the one-time $1.9 unlock.<br/>4 个模板完全免费（标注 FREE）· 16 个需 $1.9 一次性解锁。', S['small']))
story.append(PageBreak())

# templates
for p in PROMPTS:
    story.extend(template_flow(p))

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print('PDF OK:', os.path.join(BASE, 'PromptShield_Templates_v1.6.pdf'))
