# AI_COLLAB.md — 多 AI 协作纪律

> 本文件是同一项目使用多个 AI 工具时的协作契约。所有 AI 工具必须遵守。

## 进入协议

1. **先读本文件。** 进入项目后，第一步是读完这个文件，理解上一位同事做到了哪里。
2. **检查工作区。** `git status` 确认当前状态。**见到 dirty tree 不要慌**——不要执行 `git stash`、`git reset --hard`、`git clean -fd` 等破坏性操作。这些未提交的改动是上一位同事留给你的上下文。
3. **找到上下文。** 看最近的日志块，了解：做了什么、卡在哪里、下一步是什么。

## 退出协议

每次会话结束前，在本文件底部追加一个日志块：

```
## [AI 名称] — YYYY-MM-DD HH:MM

**做了什么：**
- 具体改动 1
- 具体改动 2

**当前状态：**
- 哪些文件已修改但未提交
- 是否有未完成的功能/修复

**卡在哪里 / 下一步：**
- 遇到的问题
- 建议的下一步方向
```

保持每条 1-2 行，简洁务实。

## Git 习惯

- 鼓励小步 commit，每个有意义的功能单元提交一次
- 不强制每次切换都 commit——工作区可以留未提交的改动
- 提交信息用中文或英文皆可，但要描述做了什么
- **禁止 force push**，除非你非常确定

## 环境约定

- 本机已配置全局 gitignore（`~/.gitignore_global`），自动忽略所有 AI 工具的配置目录（`.workbuddy/`、`.claude/`、`.codex/`、`.trae/` 等）
- 项目依赖锁定文件（`package-lock.json`、`yarn.lock`、`pnpm-lock.yaml`）按开发者数量判断：多人协作提交锁文件，单人项目随意

## Vault 上下文

本项目的完整上下文（产品定位、架构决策记录、已完成功能、技术债、下一步）存放在 Obsidian Vault：

→ `AIProgram/Obsidian/Vault/20-AI Forge/项目/方案-promptshield.md`

操作前建议先读该文件，了解项目全貌再动手。

## 基本原则

- **不互相拆台。** 读到未知的代码风格或结构时，先理解、再修改。
- **不重复造轮子。** 在动手前，先看日志块确认上一位同事有没有已经做了。
- **问前先试。** 遇到问题先读文件、查代码、搜索。实在解决不了再问用户。

---

## 日志

## WorkBuddy — 2026-08-11 18:55
**做了什么：** 补齐 MIT LICENSE；README 增加 MIT 许可徽章与「同作者其他项目」互链区块；evalkit/hiring-ai 标注截图待补充
**当前状态：** 改动已本地提交，未推送（仓库保持 Private）
**下一步：** 待用户决定公开后推送；公开前补齐各仓库 Demo 截图与在线演示

## WorkBuddy（主机）— 2026-08-23 18:05
**做了什么：** 本轮本地改动经 sat/darwin/promptshield-seo-opt → PR #11 → 主机 squash 合并（906f62a），已对齐本地 main
- P2 SEO：description/canonical/OG/Twitter meta + robots.txt + sitemap.xml + og-image.png + favicon.svg
- P1：Hero 双 CTA（Get Lifetime $1.9 直跳 Creem）+ JSON-LD（Product+FAQPage）+ hreflang
- P0：subscribe 文案修正 + api/subscribe.js（Vercel 函数，未配 GH_TOKEN 时优雅降级）
- 安全：footer 邮箱 HTML 实体混淆
**当前状态：** 已合并 main，工作树干净；Vercel 合并后自动部署 anjianzhao.online
**卡在哪里 / 下一步：** 订阅表单落库需 Vercel 配 GH_TOKEN（promptshield 仓库 contents:write 的 fine-grained token）；用户加后改环境变量触发重部署即可。公开转 Public 前须 grep 全仓密钥审计。

## WorkBuddy（主机）— 2026-08-23 21:35
**做了什么：**
- 全仓密钥审计通过（工作树无 .env/真实令牌；git 历史无 DeepSeek/阿里云/真实 key 残留；GH_TOKEN 仅在 Vercel 环境变量，代码仅 process.env 引用）
- PII 隔离：订阅落库目标从公开主库改为独立私有库 Klay-max/promptshield-data（api/subscribe.js 改 REPO + 支持 GITHUB_REPO 覆盖）；主库 subscribers.csv 已删
- 用户更新 fine-grained token 权限覆盖 promptshield-data → 实测订阅写入私有库成功
- 仓库由 Private 转 Public（`gh repo edit --visibility public --accept-visibility-change-consequences`）；promptshield-data 保持 Private
**当前状态：** promptshield = public；订阅 PII 全程不公开；anjianzhao.online 全功能上线
**卡在哪里 / 下一步：** 无。后续收订阅改用真实邮箱，数据进私有库 promptshield-data。本地工作目录为 github/promptshield_r（原 promptshield 因 checkout 空 SHA 损坏，待用户手动清理）

---

## 2026-10-02 17:15 · darwin · 域名迁移 anjianzhao.online → anjianzhao.space（WorkBuddy 主线程）

**做了什么：**
- Darwin 拍板：.online 10-24 到期不续费，PromptShield 全链路迁移到新注册的 anjianzhao.space（.space 为工信部批准后缀，Radix/然迪克思 2020 获批，可备案）
- 代码替换（统一裸域，去 www）：index.html（canonical/alternate×3/og:url/og:image/twitter:image）、robots.txt、sitemap.xml×3、README.md、README.zh-CN.md、deliverables/_make_pdf.py 封面 URL；活代码中 .online 引用清零（grep 复核）
- Vercel 侧：本地无有效 token（凭据台账 vcp_ token 实测 invalidToken），域名挂载待 Darwin 重新发 token 或手动 dashboard 添加

**当前状态：**
- 已提交本仓并推送 main（触发 Vercel 自动部署，站点内容不变仅域名引用更新）
- .online 在 Vercel 项目上建议保留挂载至 10-24 自然到期，旧链接访客不受影响

**卡在哪里 / 下一步：**
- 🔴 .space DNS 未配置（RDAP/whois 暂查无记录，需确认注册商）：A @ → Vercel（以 dashboard 给出的记录为准，通常 A 76.76.21.21 / CNAME www → cname.vercel-dns.com）
- Vercel dashboard 将 anjianzhao.space 加进本仓对应项目；aboutresume 名片页回链已同步改（本机待 01 岗推送）

## Codex — 2026-10-15（冻结版文档整理）
- 做了什么：中英文 README、AGENTS 与在线站点源码统一到模板产品边界和 v1.6 冻结口径；移除失效的旧仓列表及过期营销 PDF（已归档）；新增 description/topics 草稿，修正提示词效果和更新承诺文案，并修复手机 Hero 示例横向溢出。
- 当前状态：本地未提交；线上 `anjianzhao.space` 返回 HTTP 200，未测试支付；本地 Playwright 验证中英文切换与桌面/手机 Hero；未修改 GitHub metadata、未推送或部署。
- 待办 / 风险：description/topics 需单独确认后在 GitHub 设置；结账功能未核验。缺少 `_templates.json`，PDF 无法重建；维护期间应避免把提示词效果表述为保证。

## Codex — 2026-10-15（冻结版整理发布）
- 做了什么：经 Darwin 确认，准备推送 v1.6 双语说明与页面边界修订；待同步 GitHub 仓库简介和 Topics，不修改网站字段或结账配置。
- 当前状态：PromptShield 维持 Public、v1.6 冻结；旧 PDF 已在本地归档，当前源码不含它；本地静态页面目检通过。
- 下一步：推送后核验远端 Actions / 部署记录及站点内容；支付与订阅履约未核验，避免对外声称可用。
- 发布核验：提交 `8242e32` 已推送；仓库 Description / Topics 已设置并经 API 回读确认，visibility 仍为 Public。随后提交 `49ebd50` 的 Vercel Production 部署延迟出现并报告成功；旧 PDF 已本地归档，结账与订阅未验证。
