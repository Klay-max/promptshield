// api/subscribe.js — Vercel Node.js serverless function
// 接收订阅邮箱，追加写入 GitHub 仓库 subscribers.csv（通过 GitHub Contents API）
//
// 部署前需在 Vercel 后台配置环境变量：
//   GH_TOKEN = 仅对 Klay-max/promptshield 仓库有 contents:write 权限的 GitHub fine-grained token
//
// 说明：
//   - 访客提交走 Vercel 境外节点，顺畅；前端同源调用 /api/subscribe，无需 CORS 也保留兼容头
//   - token 仅存于服务端环境变量，不进入前端代码，不入库
//   - 邮箱落盘到仓库 subscribers.csv（email,subscribed_at），可随时 git pull 或网页查看

const REPO = 'Klay-max/promptshield';
const FILE_PATH = 'subscribers.csv';

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  let email;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    email = (body.email || '').toString().trim().toLowerCase();
  } catch (e) {
    return res.status(400).json({ ok: false, error: 'Invalid request body' });
  }
  if (!isValidEmail(email)) return res.status(400).json({ ok: false, error: 'Invalid email address' });

  const token = process.env.GH_TOKEN;
  if (!token) {
    // 优雅降级：未配置 GH_TOKEN 时不落库，但对访客正常返回成功，避免线上表单报错
    console.warn('[subscribe] GH_TOKEN 未配置，订阅未落库（访客仍看到成功提示）');
    return res.status(200).json({ ok: true, stored: false });
  }

  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'promptshield-subscribe',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  try {
    let sha;
    let existing = '';
    const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, { headers: ghHeaders });
    if (getRes.status === 200) {
      const data = await getRes.json();
      sha = data.sha;
      existing = Buffer.from(data.content, 'base64').toString('utf8');
    } else if (getRes.status !== 404) {
      console.error(`[subscribe] GitHub read failed (${getRes.status})`);
      return res.status(200).json({ ok: true, stored: false });
    }

    // 去重：已存在则直接返回成功
    const lines = existing.split('\n').filter(Boolean);
    if (lines.some((l) => l.toLowerCase().startsWith(email + ','))) {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    const hasHeader = lines.length > 0 && lines[0].toLowerCase() === 'email,subscribed_at';
    const header = hasHeader ? '' : 'email,subscribed_at\n';
    const newLine = `${email},${new Date().toISOString()}`;
    const base = existing && !existing.endsWith('\n') ? existing + '\n' : existing;
    const newContent = base + header + newLine + '\n';

    const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `subscribe: ${email}`,
        content: Buffer.from(newContent, 'utf8').toString('base64'),
        sha: sha || undefined
      })
    });
    if (!putRes.ok) {
      console.error(`[subscribe] GitHub write failed (${putRes.status})`);
      return res.status(200).json({ ok: true, stored: false });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[subscribe] unexpected error:', e);
    return res.status(200).json({ ok: true, stored: false });
  }
};
