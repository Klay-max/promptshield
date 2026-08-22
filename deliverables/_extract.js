const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync('index.html', 'utf8');
const script = src.match(/<script>([\s\S]*?)<\/script>/);
if (!script) { console.error('no script block'); process.exit(1); }
const js = script[1];

const pStart = js.indexOf('const PROMPTS');
const tdStart = js.indexOf('const TEMPLATE_DETAILS');
const buyStart = js.indexOf('const BUY_URL');
const catStart = js.indexOf('const CATEGORIES');
const toastStart = js.indexOf('let toastText', catStart);
if ([pStart, tdStart, buyStart, catStart, toastStart].some(x => x < 0)) { console.error('marker not found'); process.exit(1); }

function sliceBlock(a, b, closer) {
  const s = js.slice(a, b);
  const i = s.lastIndexOf(closer);
  if (i < 0) { console.error('closer not found:', closer); process.exit(1); }
  return s.slice(0, i + closer.length);
}

const promptChunk = sliceBlock(pStart, tdStart, '];');
const tdChunk = sliceBlock(tdStart, buyStart, '};');
const catChunk = sliceBlock(catStart, toastStart, '];');

const ctx = {};
vm.createContext(ctx);
vm.runInContext(`${promptChunk}\n${tdChunk}\n${catChunk}\n;this.__out = JSON.stringify({PROMPTS, TEMPLATE_DETAILS, CATEGORIES});`, ctx);
fs.writeFileSync('_templates.json', ctx.__out);
const data = JSON.parse(ctx.__out);
console.log('OK. PROMPTS:', data.PROMPTS.length, '| TEMPLATE_DETAILS:', Object.keys(data.TEMPLATE_DETAILS).length, '| CATEGORIES:', data.CATEGORIES.length, '| JSON bytes:', ctx.__out.length);
