# SYNC.md — 卫星机协作规则（分机可改，主机决定）

本仓库适用跨机同步协议：**家里主机持有默认分支权威，任何备用机（公司机 / 笔记本 / #3 / #4）只能改，不能并。**

1. 机器身份 `<id>` = 主机名小写（如 `company` / `laptop` / `pc3`）。
2. 备用机**只**在隔离区工作：
   - 代码仓库：开 `sat/<id>/<topic>` 分支，**绝不 push 默认分支**。
   - 内容仓库（Vault）：只写 `99-Inbox/<id>/`，分支 `sat/<id>`。
3. 备用机产出推到 `sat/<id>*` 分支；**由家里主机 fetch 后审阅、合并进默认分支**。
4. AI 工具同样遵守：先读本文件 + `AI_COLLAB.md`；不碰默认分支 / 核心文件；只有家主机上的 AI 才做“转正”。

完整协议见 `ai-program-config` 仓库 `SATELLITE-SYNC.md`（本机通常在 `_config_sync/SATELLITE-SYNC.md`）。
