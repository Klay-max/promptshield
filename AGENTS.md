# AGENTS.md — AIProgram 工作区落地入口

> 面向所有 AI 编码 / 协作工具（WorkBuddy / Claude Code / Codex / Trae / Coze 等）。
> 本文件是**第一入口**：落地本工作区后，先读这里，再按指引深入。

## 0. 第一步：必读顺序
1. `AI_RULES.md` — 总规范（目录结构、多 AI 协作协议、Git 规范、删除规则）
2. `USER.md` / `SOUL.md` / `MEMORY.md` — 主人是谁 / AI 人设 / 行为准则与状态锚点
   - ⚠️ 这三份是**唯一真源**；`Obsidian/Vault/AI_*` 只是镜像，勿直接改
3. 进入具体项目前，读该项目根 `AI_COLLAB.md`（看上一个 AI 的日志块）

## 1. 工作区地图
- `github/` — 5 个 Git 项目（当前均 Private，与 GitHub 云端一一对应）
- `Obsidian/Vault/` — 个人知识库 Second Brain（私有同步，六大战区 + 90-归档）
- `outputs/` — 本地产物（HTML/报告），按 `travel/` `evaluation-report/` 归类，不进版本库
- `_archive/` — 删除 / 废弃物的统一归档，勿随意翻动
- **`ai-program-config`（私有仓库）** — 本机协作基座文件（AGENTS/AI_RULES/SOUL/USER/MEMORY）的跨机同步源，见该仓 README；每台机器 `git clone` 后把这 5 个文件复制到 AIProgram 根即可 1:1
- 详细结构见 `AI_RULES.md` §一

## 2. 五个仓库一句话职责
| 仓库 | 职责 | 状态 |
|------|------|------|
| aboutresume | 个人简历 / 作品集站点 | Private |
| evalkit | AI 评测工具包 | Private |
| hiring-ai | AI 驱动的招聘 / 求职工具 | Private |
| my-homepage | 跨设备书签 + 信息聚合仪表盘（React 19，主力迭代，可作旗舰门户）| Private（2026-08-12 改名自 MyHomepage，同日从 Public 设回 Private） |
| promptshield | Prompt 安全防护（Vercel 站点已下线，待 revival） | Private |

## 3. 多 AI 协作铁律（简版，完整见 AI_RULES.md）
- 进入项目先读 `AI_COLLAB.md`，`git status` 看状态；dirty tree 不碰（那是上一位的上下文）
- 退出前在 `AI_COLLAB.md` 追加日志块
- 删除任何文件前必须先打包进 `_archive/`
- 不在根目录直接建 Git 仓库；全局 gitignore 已隔离各 AI 工具配置目录
- 涉及外部操作（推送、发布、发邮件）必须明确确认

## 4. 红线
- `Obsidian/Vault/`（second-brain）含医疗 / 持仓等隐私 —— **永不转 Public、不加协作者**
- 密钥 / 凭据：改文件占位符 ≠ 服务端作废；残留 key 必须后端吊销
