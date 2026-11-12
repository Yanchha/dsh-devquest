# DevQuest · 冒险者公会

> **把你的 DSH 使用记录变成一张会生长的 RPG 角色卡。**
> Turn agent turns, tool calls and lines of code into a pixel RPG character that levels up as you work.

![DevQuest crest](icon.svg)

一个运行在 [DeepSeek Harness](https://deepseek.com) 里的社区插件。它不改变 Agent 的行为，也不往对话里塞任何内容——只是安静地坐在旁边，把已经发生的事讲成一段冒险：**你写代码，你的角色就变强。**

An unofficial community plugin for DeepSeek Harness. It observes what already happened in your sessions — turns, tool calls, edits, todos, subagents — and turns that into XP, gear, bosses and achievements. It never modifies the agent loop and never writes into the conversation.

---

## 这是什么

DevQuest 监听 DSH 暴露的会话事件，把「真实发生的工作」折算成游戏进度：

| 你实际做的事 | 游戏里的结果 |
| --- | --- |
| 成功调用工具 | +6 XP、对 BOSS 造成伤害 |
| 完成一个回合 | +18 XP |
| 写入文件 / 编辑代码 | +4 XP，行数越多额外经验越多 |
| 清空待办清单 | +30 XP |
| 运行 workflow / 子代理 | +70 / +30 XP |
| 读文件、搜索、跑命令 | 计入职业专精的五条线 |

它**不**读取你的对话内容、**不**上传任何数据、**不**执行命令、**不**控制 Agent。所有状态都存在插件目录下的一个 JSON 文件里。

> 非官方社区项目，与 DeepSeek 官方无隶属关系。

## 画面里有什么

- **角色卡**：头像框、等级、经验条、职业段位、当前称号、星币、连续天数。
- **像素战场**：你的冒险者对上每日 / 每周 / 赛季 BOSS，每次真实操作都会落下一刀——挥剑、暴击、伤害数字、BOSS 受击抖动，倒下时 VICTORY。
- **装备与工坊**：武器 / 护甲 / 护符 / 头像框四个槽位，**217 件装备**，**9 档稀有度**（普通 → 稀有 → 史诗 → 传说 → 神话 → 红装 → 远古 → 神圣 → 超凡）。
- **强化 / 进阶 / 合成**：单件强化到 +100、进阶 5 阶；同部位同稀有度 5 件可合成下一档。
- **三条 BOSS 战线**：每日（9 种怪）、每周（9 种）、赛季（6 种），共 24 只，每只都有自己的配色和剪影。
- **常规战线**：一条无限关卡线，血量每关 ×1.25，战力不够就会卡住。
- **赛季通行证**：每 28 天一个赛季，15 阶奖励，赛季 BOSS 专属武器。
- **76 枚成就** + 成就点商店（可兑换红装）。
- **转生系统**：60 级封顶 → 巅峰十阶 → 转生，每世永久 +8% 伤害 / +5% 经验，头像框上每世镶一颗宝石。

> 截图：建议自己截几张放在 `docs/` 里，本文档顶部加一行 `![screenshot](docs/panel.png)` 即可。

## 安装

包名：**`@yanchha/dsh-devquest`**（与 npm 上已有的 `dsh-devquest` 不冲突）

### 从 GitHub 安装（推荐）

```powershell
dsh plugin --profile desktop add github:Yanchha/dsh-devquest
```

或者在 DSH 里让 Agent 执行：`plugin_manager` → `install_bundle`，target 填 `github:Yanchha/dsh-devquest`。

### 从 npm 安装（发布后）

```powershell
dsh plugin --profile desktop add @yanchha/dsh-devquest
```

### 从本地目录安装

把仓库克隆/下载到任意位置，然后让 Agent 执行 `install_bundle`，target 指向该目录。

### 从压缩包安装

```powershell
npm pack          # 生成 yanchha-dsh-devquest-<version>.tgz
```

解压后同样用 `install_bundle` 指向 `package/` 目录。

装好后**刷新页面**：左侧栏会出现公会图标，输入框附近会出现 HUD 挂件。

## 支持的版本

- DSH：随桌面版分发的 Cordis 插件体系（Host + Web Client 两端）。
- Node：20 及以上（仅安装时用，运行时不依赖 Node API 之外的东西）。
- 无第三方依赖，无构建步骤，`index.js` / `client.js` 直接就是产物。

## 数据与隐私

- 状态保存在**插件目录**下的 `data/state.json`，本地读写，**不联网、不上传、无遥测**。
- 只保存聚合计数和最近事件摘要：工具名、文件基名、行数。不保存完整工具参数、对话文本或文件内容。
- Host 只在回环地址注册 `/devquest/api`，页面同源读取。插件不提供任何文件读取、命令执行或 Agent 控制能力。
- 每个 Session 用游标去重，重启不会重复结算。
- 仓库里**不包含任何人的存档**，`.gitignore` 已排除 `data/`。

## 常见问题

**会影响我的 Agent 吗？**
不会。它只订阅会话事件，不拦截、不修改、不注入提示词。

**会拖慢 DSH 吗？**
事件处理是纯内存累加 + 定时落盘；面板每几秒拉一次快照。没有网络请求。

**卸载会丢档吗？**
不会。移除插件后 `data/state.json` 还在，重装继续。

**为什么我的进度是 0？**
新装默认从 1 级、80 星币开始；只有在你自己的会话里发生工具调用 / 回合后才会涨。

**能改数值吗？**
可以，`index.js` 顶部的常量都是明文：经验、掉落、BOSS 血量、强化曲线。

## 目录结构

```
index.js            Host 半：事件监听、状态机、/devquest/api
client.js           Client 半：面板、战场、装备页（React + 内联 CSS）
cordis.patch.yml    bundle patch（注册插件行）
locale/             zh / en 资源
icon.svg            插件图标
data/state.json     本地存档（不入库）
```

## 开发

- 纯 JavaScript，无构建、无依赖，改完 `node --check index.js client.js` 即可。
- Host 使用 `session/event`、`workflow/end`、`subagent/end`，只读观察。
- Client 通过 `ctx.slots.inject` 注册 `main`、`sidebar.panellist`、`shell.overlay`。
- 所有可见文案走 `ctx.locale` 的 `devquest` 命名空间，中英各一份。

## 许可

[MIT](LICENSE) © 2026 Yanchha
