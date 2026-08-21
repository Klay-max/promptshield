const LS_KEY = 'ps-lang';
let lang = localStorage.getItem(LS_KEY) || 'en';

const UI = {
  en: {
    'back':'← Back to home','lang.toggle':'中文',
    'hero.eyebrow':'AI Project Launchpad','hero.title':'Find a project you can actually start today.',
    'hero.copy':'Answer five small questions and get three project ideas shaped around your goal, time, confidence, and GitHub showcase value.',
    'status.1':'1. Tell us where you are','status.2':'2. Compare three directions','status.3':'3. Generate a README draft',
    'results.eyebrow':'Recommendations','results.title':'Your three best directions','results.reset':'Reset',
    'readme.eyebrow':'README Draft','readme.placeholder':'Choose a project card to generate a README.',
    'form.level':'Current level','form.goal':'Main goal','form.interest':'Interest area','form.time':'Daily time','form.mood':'Current mood','form.generate':'Generate Ideas',
    'card.why':'Why it fits:','card.first':'First version:','card.github':'GitHub highlight:','card.today':'Today:','card.readme':'Generate README',
    'rm.whyThisExists':'## Why This Exists','rm.firstVersion':'## First Version','rm.githubHighlight':'## GitHub Highlight','rm.firstTask':'## First Task','rm.estimatedScope':'## Estimated Scope',
    'rm.difficulty':'Difficulty','rm.timeline':'Timeline','rm.direction':'Direction'
  },
  zh: {
    'back':'← 返回首页','lang.toggle':'EN',
    'hero.eyebrow':'AI 项目启动台','hero.title':'找一个你今天就能动手的项目。',
    'hero.copy':'回答 5 个小问题，获得 3 个项目点子，围绕你的目标、时间、信心与 GitHub 展示价值量身打造。',
    'status.1':'1. 说说你现在的状况','status.2':'2. 对比三个方向','status.3':'3. 生成 README 草稿',
    'results.eyebrow':'推荐','results.title':'最适合你的三个方向','results.reset':'重置',
    'readme.eyebrow':'README 草稿','readme.placeholder':'选择一张项目卡片以生成 README。',
    'form.level':'当前水平','form.goal':'主要目标','form.interest':'兴趣领域','form.time':'每日时间','form.mood':'当前心情','form.generate':'生成点子',
    'card.why':'为何适合：','card.first':'首个版本：','card.github':'GitHub 亮点：','card.today':'今天：','card.readme':'生成 README',
    'rm.whyThisExists':'## 它为何存在','rm.firstVersion':'## 首个版本','rm.githubHighlight':'## GitHub 亮点','rm.firstTask':'## 第一步','rm.estimatedScope':'## 预估范围',
    'rm.difficulty':'难度','rm.timeline':'周期','rm.direction':'方向'
  }
};

const OPTS = {
  level: [ {value:'beginner',en:'Zero foundation',zh:'零基础'}, {value:'learning',en:'Learning the basics',zh:'打基础中'}, {value:'builder',en:'Can build small projects',zh:'能做一些小项目'} ],
  goal: [ {value:'portfolio',en:'Build a portfolio',zh:'做作品集'}, {value:'learning',en:'Learn useful skills',zh:'学实用技能'}, {value:'recognition',en:'Earn stars and recognition',zh:'攒 star 与认可'}, {value:'productivity',en:'Improve daily productivity',zh:'提升日常效率'}, {value:'fun',en:'Make something fun',zh:'做点好玩的'} ],
  interest: [ {value:'ai',en:'AI tools',zh:'AI 工具'}, {value:'learning',en:'Learning',zh:'学习'}, {value:'life',en:'Daily life',zh:'日常生活'}, {value:'github',en:'GitHub projects',zh:'GitHub 项目'}, {value:'game',en:'Games',zh:'游戏'} ],
  time: [ {value:'short',en:'30 minutes',zh:'30 分钟'}, {value:'medium',en:'1 hour',zh:'1 小时'}, {value:'long',en:'2 hours or more',zh:'2 小时及以上'} ],
  mood: [ {value:'lost',en:'A bit lost',zh:'有点迷茫'}, {value:'quick',en:'Want quick results',zh:'想要快速见效'}, {value:'careful',en:'Afraid it will be too hard',zh:'怕太难'}, {value:'wow',en:'Want something impressive',zh:'想要惊艳的效果'} ]
};

const PROFILES = {
  beginner: { en:{label:'Beginner friendly',note:'You need a project with a small first version and fast visual feedback.'}, zh:{label:'新手友好',note:'你需要一个首版小巧、能快速看到视觉效果的项目。'} },
  learning: { en:{label:'Skill building',note:'You can handle a little structure, as long as the first goal stays clear.'}, zh:{label:'技能积累',note:'你能应付一点结构，只要第一步目标清晰。'} },
  builder: { en:{label:'Builder mode',note:'You can take on a richer feature set and polish the experience.'}, zh:{label:'构建模式',note:'你能承担更丰富的功能集，并把体验打磨到位。'} }
};

const GOALS = {
  portfolio: { en:'The best fit is something easy to explain and attractive in screenshots.', zh:'最合适的是容易讲清楚、截图也好看的东西。' },
  learning: { en:'The best fit should teach you one or two useful skills without becoming huge.', zh:'最合适的是能教你一两个实用技能、又不会变得太大的项目。' },
  recognition: { en:'The best fit needs a clear audience, a strong README, and a memorable hook.', zh:'最合适的是受众明确、README 扎实、且有记忆点的项目。' },
  productivity: { en:'The best fit should solve a small repeated problem in daily life.', zh:'最合适的是能解决生活里一个小而重复的问题。' },
  fun: { en:'The best fit should feel playful quickly, even before it has many features.', zh:'最合适的是即使功能还不多、也能很快让人觉得好玩。' }
};

const MOODS = {
  lost: { en:'Because you feel a bit lost, the first version should be narrow and reassuring.', zh:'因为你有点迷茫，首版应该小而让人安心。' },
  quick: { en:'Because you want quick results, the first version should be finishable in one or two sessions.', zh:'因为你想快速见效，首版应该一两次就能做完。' },
  careful: { en:'Because you are worried about difficulty, the plan should avoid hidden technical traps.', zh:'因为你怕太难，方案应避免隐藏的技术坑。' },
  wow: { en:'Because you want something impressive, the idea needs a visual or emotional hook.', zh:'因为你想惊艳，点子需要一个视觉或情感上的钩子。' }
};

const TIME = {
  short: { en:'2-4 days', zh:'2–4 天' },
  medium: { en:'1 week', zh:'1 周' },
  long: { en:'1-2 weeks', zh:'1–2 周' }
};

const CARDTYPES = [
  { type:{en:'Safe Pick',zh:'稳妥之选'}, difficulty:'2/5', angle:{en:'The easiest path to a finished first version.',zh:'最轻松走到首个完成版本的路径。'} },
  { type:{en:'Showcase Pick',zh:'展示之选'}, difficulty:'3/5', angle:{en:'The strongest choice for GitHub presentation.',zh:'最适合在 GitHub 上展示。'} },
  { type:{en:'Growth Pick',zh:'成长之选'}, difficulty:'4/5', angle:{en:'The best choice if you want to learn more while building.',zh:'如果你想边做边学更多，这是最佳选择。'} }
];

const BLUEPRINTS = {
  ai: [
    { en:{name:'Prompt Pocket',summary:'A clean place to save, tag, and copy useful AI prompts.',features:['Add and edit prompts','Filter by use case','Copy with one click'],github:'Easy to explain with screenshots, and AI users immediately understand the value.'},
      zh:{name:'提示口袋',summary:'一个干净的地方，保存、标记并复制好用的 AI 提示词。',features:['添加和编辑提示词','按场景筛选','一键复制'],github:'用截图很好解释，AI 用户一眼就懂它的价值。'} },
    { en:{name:'Idea Coach',summary:'A helper that turns vague ideas into small project plans.',features:['Collect goals and constraints','Suggest three project paths','Generate a first-day checklist'],github:'It speaks directly to beginners, which makes the README feel personal and useful.'},
      zh:{name:'点子教练',summary:'把模糊的想法变成小型项目计划的助手。',features:['收集目标与约束','给出三条项目路径','生成首日清单'],github:'它直接面向新手，让 README 显得亲切又实用。'} },
    { en:{name:'AI Study Cards',summary:'A flashcard builder for turning notes into review questions.',features:['Create cards','Mark confidence','Review weak cards first'],github:'It combines AI, learning, and a clear daily-use workflow.'},
      zh:{name:'AI 学习卡',summary:'把笔记变成复习题的闪卡生成器。',features:['创建卡片','标记掌握程度','优先复习薄弱卡'],github:'它结合了 AI、学习与清晰的日常使用流程。'} }
  ],
  learning: [
    { en:{name:'Learning Ladder',summary:'A tiny roadmap builder that turns a topic into weekly steps.',features:['Choose a topic','Create milestone cards','Track progress'],github:'People like projects that show a journey, not just a tool.'},
      zh:{name:'学习阶梯',summary:'把主题拆解成每周步骤的迷你路线图工具。',features:['选择主题','创建里程碑卡片','跟踪进度'],github:'人们喜欢能展现“旅程”而非只是工具的项目。'} },
    { en:{name:'Focus Sprint Board',summary:'A study board for planning focused 30-minute learning sessions.',features:['Plan sessions','Start a timer','Record what was learned'],github:'It is simple, practical, and easy to demo in one screenshot.'},
      zh:{name:'专注冲刺板',summary:'规划 30 分钟专注学习时段的学习看板。',features:['规划时段','开始计时','记录所学'],github:'简单、实用，一张截图就能演示。'} },
    { en:{name:'Concept Garden',summary:'A visual notebook for connecting ideas while learning.',features:['Add concepts','Link related ideas','Search notes'],github:'It has room to grow into a visually memorable project.'},
      zh:{name:'概念花园',summary:'边学习边连接想法的可视化笔记。',features:['添加概念','关联相关想法','搜索笔记'],github:'有成长空间，能做成视觉上令人印象深刻的项技。'} }
  ],
  life: [
    { en:{name:'Tiny Life Planner',summary:'A gentle planner for daily tasks, habits, and small wins.',features:['Plan today','Track small wins','Review the week'],github:'It feels relatable because everyone understands daily overwhelm.'},
      zh:{name:'轻量生活规划',summary:'温和地规划每日任务、习惯与小成就。',features:['规划今天','记录小成就','回顾一周'],github:'人人都懂"日常被淹没感"，所以很容易有共鸣。'} },
    { en:{name:'Decision Compass',summary:'A tool for comparing choices when you are stuck.',features:['List options','Score what matters','Show a clear recommendation'],github:'The idea is emotionally clear: it helps people move when they feel stuck.'},
      zh:{name:'决策罗盘',summary:'当你卡住时比较选项的工具。',features:['列出选项','为关键项打分','给出清晰建议'],github:'它精准击中一种普遍情绪：帮人在卡住时重新动起来。'} },
    { en:{name:'File Calm',summary:'A visual helper for planning how to organize messy folders.',features:['Pick file categories','Preview folder structure','Create an organization plan'],github:'It solves a common pain without needing a complex backend.'},
      zh:{name:'文件整理助手',summary:'规划如何整理杂乱文件夹的可视化工具。',features:['选择文件类别','预览文件夹结构','生成整理方案'],github:'解决常见痛点，且不需要复杂后端。'} }
  ],
  github: [
    { en:{name:'README Spark',summary:'A generator that helps projects tell their story clearly.',features:['Collect project basics','Generate README sections','Suggest badges and screenshots'],github:'GitHub users care about README quality, so the audience is already there.'},
      zh:{name:'README 火花',summary:'帮项目把故事讲清楚的生成器。',features:['收集项目基本信息','生成 README 各章节','建议徽章与截图'],github:'GitHub 用户在意 README 质量，受众天然存在。'} },
    { en:{name:'Repo First Aid',summary:'A checklist app for improving a new GitHub repository.',features:['Check README quality','Suggest missing files','Create next actions'],github:'It is made for GitHub builders, which makes it naturally shareable.'},
      zh:{name:'仓库急救箱',summary:'改进新 GitHub 仓库的检查清单应用。',features:['检查 README 质量','建议缺失文件','生成下一步行动'],github:'为 GitHub 建设者而生，天然适合分享。'} },
    { en:{name:'Launch Checklist',summary:'A release checklist for turning a local project into a public repo.',features:['Track launch tasks','Generate repo description','Plan the next version'],github:'It helps people cross the gap from private practice to public work.'},
      zh:{name:'发布清单',summary:'把本地项目变成公开仓库的发布清单。',features:['跟踪发布任务','生成仓库描述','规划下一版本'],github:'帮人跨越从私下练习到公开作品的门槛。'} }
  ],
  game: [
    { en:{name:'Bug Squash Board',summary:'A small browser game about fixing project bugs before time runs out.',features:['Click bugs','Gain focus points','Unlock small upgrades'],github:'Games are easy to show visually and can make a simple repo feel alive.'},
      zh:{name:'捉虫板',summary:'在时限内修复项目 bug 的小游戏。',features:['点击 bug','获得专注点','解锁小升级'],github:'游戏容易用视觉展示，让简单仓库显得有活力。'} },
    { en:{name:'Code Quest Cards',summary:'A card game where each card is a beginner coding challenge.',features:['Draw a challenge','Pick a difficulty','Track completed cards'],github:'It turns learning into something playful and screenshot-friendly.'},
      zh:{name:'代码闯关卡',summary:'每张卡都是一道新手编程题的卡牌游戏。',features:['抽一道题','选择难度','跟踪完成张数'],github:'把学习变成好玩、且适合截图分享的东西。'} },
    { en:{name:'Pixel Habit Garden',summary:'A tiny garden that grows when you complete daily tasks.',features:['Add habits','Water plants','Unlock garden tiles'],github:'It has charm, progress, and obvious visual improvement over time.'},
      zh:{name:'像素习惯花园',summary:'完成每日任务就会生长的小花园。',features:['添加习惯','给植物浇水','解锁花园格子'],github:'有魅力、有进度，且随时间有肉眼可见的成长。'} }
  ]
};

const FIRST_TASK = {
  en: {
    beginner:(n)=>`Create a single page that shows the title "${n}", the one-line idea, and three feature cards.`,
    learning:(n,f)=>`Build the main page and make one interactive control work for "${f}".`,
    builder:(n,f)=>`Build a polished first screen and connect the main interaction for "${f}".`
  },
  zh: {
    beginner:(n)=>`做一个单页，展示标题"${n}"、一句话点子，以及三张功能卡片。`,
    learning:(n,f)=>`搭好主页面，并让"${f}"这一个交互控件跑起来。`,
    builder:(n,f)=>`做出精致的首屏，并连通"${f}"这个主交互。`
  }
};

const form = document.querySelector('#project-form');
const cardsGrid = document.querySelector('#cards-grid');
const resetButton = document.querySelector('#reset-button');
const readmeTitle = document.querySelector('#readme-title');
const readmeOutput = document.querySelector('#readme-output');

function t(k){ return (UI[lang] && UI[lang][k] != null) ? UI[lang][k] : k; }

function renderStaticText(){
  document.documentElement.lang = (lang === 'zh') ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.getAttribute('data-i18n')));
  document.getElementById('langToggle').textContent = t('lang.toggle');
}

function renderForm(){
  const prev = {};
  ['level','goal','interest','time','mood'].forEach(k => { const el = form.elements[k]; if(el) prev[k] = el.value; });
  const fields = [
    { key:'level', label:t('form.level'), opts:OPTS.level },
    { key:'goal', label:t('form.goal'), opts:OPTS.goal },
    { key:'interest', label:t('form.interest'), opts:OPTS.interest },
    { key:'time', label:t('form.time'), opts:OPTS.time },
    { key:'mood', label:t('form.mood'), opts:OPTS.mood }
  ];
  form.innerHTML = fields.map(f => `
    <div class="field-group">
      <label for="${f.key}">${f.label}</label>
      <select id="${f.key}" name="${f.key}">
        ${f.opts.map(o => `<option value="${o.value}">${o[lang]}</option>`).join('')}
      </select>
    </div>`).join('') + `<button type="submit" class="btn btn-primary">${t('form.generate')}</button>`;
  ['level','goal','interest','time','mood'].forEach(k => { if(prev[k]){ const el = form.elements[k]; if(el) el.value = prev[k]; } });
}

function createRecommendations(fd){
  const bps = BLUEPRINTS[fd.interest] || [];
  return bps.map((bp, i) => {
    const c = CARDTYPES[i];
    const p = bp[lang];
    const firstTask = FIRST_TASK[lang][fd.level](p.name, p.features[0]);
    return {
      ...p,
      type: c.type[lang],
      difficulty: c.difficulty,
      angle: c.angle[lang],
      reason: `${PROFILES[fd.level].note[lang]} ${GOALS[fd.goal][lang]} ${MOODS[fd.mood][lang]}`,
      firstVersion: p.features.slice(0, 3),
      firstTask,
      timeline: TIME[fd.time][lang],
      levelLabel: PROFILES[fd.level].label[lang]
    };
  });
}

function renderCards(recs){
  cardsGrid.innerHTML = '';
  recs.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <strong>${project.type}</strong>
      <h3>${project.name}</h3>
      <p>${project.summary}</p>
      <div class="meta-row">
        <span>${project.levelLabel}</span>
        <span>${UI[lang].rm.difficulty} ${project.difficulty}</span>
        <span>${project.timeline}</span>
      </div>
      <p><b>${UI[lang].card.why}</b> ${project.reason}</p>
      <p><b>${UI[lang].card.first}</b></p>
      <ul>${project.firstVersion.map(f => `<li>${f}</li>`).join('')}</ul>
      <p><b>${UI[lang].card.github}</b> ${project.github}</p>
      <p><b>${UI[lang].card.today}</b> ${project.firstTask}</p>
      <button class="card-button" type="button">${UI[lang].card.readme}</button>`;
    card.querySelector('button').addEventListener('click', () => renderReadme(project));
    cardsGrid.appendChild(card);
  });
}

function renderReadme(project){
  if(!project) return;
  readmeTitle.textContent = `${project.name}`;
  readmeOutput.textContent =
`# ${project.name}

${project.summary}

${UI[lang].rm.whyThisExists}

${project.reason}

${UI[lang].rm.firstVersion}

${project.firstVersion.map(f => `- ${f}`).join('\n')}

${UI[lang].rm.githubHighlight}

${project.github}

${UI[lang].rm.firstTask}

${project.firstTask}

${UI[lang].rm.estimatedScope}

- ${UI[lang].rm.difficulty}: ${project.difficulty}
- ${UI[lang].rm.timeline}: ${project.timeline}
- ${UI[lang].rm.direction}: ${project.type}
`;
}

function getFormData(){
  return Object.fromEntries(new FormData(form).entries());
}

function generate(){
  const recs = createRecommendations(getFormData());
  renderCards(recs);
  renderReadme(recs[0]);
}

function toggleLang(){
  lang = (lang === 'en') ? 'zh' : 'en';
  localStorage.setItem(LS_KEY, lang);
  renderStaticText();
  renderForm();
  generate();
}

document.addEventListener('DOMContentLoaded', () => {
  renderStaticText();
  renderForm();
  form.addEventListener('submit', (e) => { e.preventDefault(); generate(); });
  resetButton.addEventListener('click', () => { form.reset(); generate(); });
  generate();
});
