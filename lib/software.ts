export type Category = 'all' | 'productivity' | 'design' | 'ai' | 'development' | 'entertainment' | 'utilities'
export type Platform = 'macOS' | 'Windows' | 'iOS' | 'Android' | 'Web' | 'Linux'

export interface Software {
  id: string
  name: string
  icon: string
  category: Exclude<Category, 'all'>
  description: string
  detail: string
  url: string
  platforms: Platform[]
  pricing: '免费' | '免费增值' | '付费'
  tags: string[]
  featured?: boolean
}

export const categoryLabels: Record<Category, string> = {
  all: '全部应用',
  productivity: '效率办公',
  design: '设计创意',
  ai: 'AI 工具',
  development: '开发工具',
  entertainment: '影音娱乐',
  utilities: '系统工具',
}

export const software: Software[] = [
  {
    id: 'notion', name: 'Notion', icon: 'notion', category: 'productivity',
    description: '笔记、知识与协作，一个空间就够。',
    detail: '把零散的想法变成有条理的知识库。用灵活的页面、数据库和看板，管理个人笔记、项目与团队协作，让每一份灵感都有归处。',
    url: 'https://www.notion.com', platforms: ['macOS', 'Windows', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['笔记', '知识管理', '团队协作'], featured: true,
  },
  {
    id: 'raycast', name: 'Raycast', icon: 'raycast', category: 'productivity',
    description: '让每一次操作，都快人一步。',
    detail: '从一个快捷入口启动应用、查找文件、管理剪贴板和运行工作流。丰富的扩展与键盘优先的交互，让日常重复操作更轻松。',
    url: 'https://www.raycast.com', platforms: ['macOS', 'Windows'], pricing: '免费增值', tags: ['启动器', '快捷操作', '自动化'], featured: true,
  },
  {
    id: 'figma', name: 'Figma', icon: 'figma', category: 'design',
    description: '让好点子，从想象走向现实。',
    detail: '在同一块画布上完成界面设计、交互原型与团队协作。借助组件、设计系统和实时评论，把灵感一步步打磨成出色的产品体验。',
    url: 'https://www.figma.com', platforms: ['macOS', 'Windows', 'Web'], pricing: '免费增值', tags: ['UI 设计', '原型', '团队协作'], featured: true,
  },
  {
    id: 'chatgpt', name: 'ChatGPT', icon: 'openai', category: 'ai',
    description: '你的灵感搭子，也是得力助手。',
    detail: '通过自然对话探索新想法、辅助写作、学习知识和理解代码。为模糊的灵感找到起点，也为日常工作提供新的思路。AI 输出可能不准确，请核实重要信息。',
    url: 'https://chatgpt.com', platforms: ['macOS', 'Windows', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['AI 助手', '对话', '写作'], featured: true,
  },
  {
    id: 'arc', name: 'Arc', icon: 'arc', category: 'utilities',
    description: '重新想象，你与互联网的相处方式。',
    detail: '用侧边栏、空间和分屏重新整理你的浏览体验。把工作、学习与生活分开，让标签页不再杂乱，给专注留出更多空间。下载前请查看官方维护与平台支持说明。',
    url: 'https://arc.net', platforms: ['macOS', 'Windows', 'iOS'], pricing: '免费', tags: ['浏览器', '专注', '标签管理'],
  },
  {
    id: 'vscode', name: 'Visual Studio Code', icon: 'visual-studio-code', category: 'development',
    description: '轻巧而强大，让代码自由生长。',
    detail: '一款可扩展的代码编辑器，集成智能补全、调试、终端与 Git。通过丰富的语言与工具扩展，打造适合自己的开发环境。',
    url: 'https://code.visualstudio.com', platforms: ['macOS', 'Windows', 'Linux'], pricing: '免费', tags: ['代码编辑', '开发', '扩展'],
  },
  {
    id: 'linear', name: 'Linear', icon: 'linear', category: 'productivity',
    description: '更清晰地规划，更专注地推进。',
    detail: '为产品与研发团队设计的项目管理工具。用问题追踪、迭代周期和路线图，把复杂项目拆成清晰可执行的下一步。',
    url: 'https://linear.app', platforms: ['macOS', 'Windows', 'Web', 'iOS', 'Android'], pricing: '免费增值', tags: ['项目管理', '团队协作', '规划'],
  },
  {
    id: 'spotify', name: 'Spotify', icon: 'spotify', category: 'entertainment',
    description: '让喜欢的声音，陪伴每个日常。',
    detail: '探索音乐、专辑与播客，发现适合当下心情的歌单。创建自己的收藏，让工作、散步和休息都拥有恰到好处的背景音。服务与套餐因地区而异。',
    url: 'https://www.spotify.com', platforms: ['macOS', 'Windows', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['音乐', '播客', '放松'],
  },
  {
    id: 'obsidian', name: 'Obsidian', icon: 'obsidian', category: 'productivity',
    description: '连接每个想法，构建第二大脑。',
    detail: '以本地 Markdown 文件为基础的知识管理工具，个人与商业用途均可免费使用。通过双向链接和关系图谱连接笔记，文件始终掌握在自己手中；官方 Sync 与 Publish 属于可选付费服务。',
    url: 'https://obsidian.md', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], pricing: '免费', tags: ['笔记', 'Markdown', '知识管理'],
  },
  {
    id: 'framer', name: 'Framer', icon: 'framer', category: 'design',
    description: '从画布到网站，灵感即刻上线。',
    detail: '用可视化画布设计和发布响应式网站。融合布局、交互动效与内容管理，让设计师可以把想法直接变成可访问的网站。',
    url: 'https://www.framer.com', platforms: ['Web'], pricing: '免费增值', tags: ['网站设计', '无代码', '动效'],
  },
  {
    id: 'claude', name: 'Claude', icon: 'claude', category: 'ai',
    description: '认真思考，与你一同探索可能。',
    detail: '适用于写作、分析、编程与长文档理解的 AI 助手。用对话逐步梳理思路、完善内容，或将复杂问题拆解成更容易理解的部分。AI 输出需要人工核实。',
    url: 'https://claude.ai', platforms: ['macOS', 'Windows', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['AI 助手', '写作', '编程'],
  },
  {
    id: '1password', name: '1Password', icon: '1password', category: 'utilities',
    description: '记住一个密码，安心每一次登录。',
    detail: '集中管理密码、通行密钥和敏感资料。生成独立强密码，在受支持的平台上安全填充，让数字生活更便捷，也更有条理。',
    url: 'https://1password.com', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android', 'Web'], pricing: '付费', tags: ['密码管理', '安全', '隐私'],
  },
  {
    id: 'perplexity', name: 'Perplexity', icon: 'perplexity', category: 'ai',
    description: '好奇心有方向，答案有据可循。',
    detail: '结合网络搜索与 AI 对话，帮助你理解问题并继续追问。回答附带来源，方便进一步阅读与核实，而不只是停留在一句答案。',
    url: 'https://www.perplexity.ai', platforms: ['Web', 'iOS', 'Android', 'macOS'], pricing: '免费增值', tags: ['AI 搜索', '研究', '知识'],
  },
  {
    id: 'github', name: 'GitHub', icon: 'github', category: 'development',
    description: '一起协作，让好的代码走得更远。',
    detail: '托管代码、追踪问题、审阅变更并自动化开发流程。无论个人作品还是团队项目，都能在这里参与开源和协作构建软件。',
    url: 'https://github.com', platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'], pricing: '免费增值', tags: ['代码托管', '开源', '团队协作'],
  },
  {
    id: 'canva', name: 'Canva', icon: 'canva', category: 'design',
    description: '每个人，都能把想法设计出来。',
    detail: '借助模板、素材和简洁的编辑工具，制作海报、演示文稿、社交内容与短视频。降低设计门槛，让表达更自由。',
    url: 'https://www.canva.com', platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'], pricing: '免费增值', tags: ['平面设计', '演示文稿', '创意'],
  },
  {
    id: 'cursor', name: 'Cursor', icon: 'cursor', category: 'development',
    description: '与 AI 结对，把想法写成代码。',
    detail: '将 AI 对话、代码补全与项目上下文融入编辑器。探索代码库、生成修改建议并辅助调试。采用生成的代码前，请认真审阅并测试。',
    url: 'https://www.cursor.com', platforms: ['macOS', 'Windows', 'Linux'], pricing: '免费增值', tags: ['AI 编程', '代码编辑', '开发'],
  },
]

export const collections = [
  { id: 'daily', label: '编辑精选', title: '让日常，轻盈一点。', description: '少一点繁琐，多一点专注。', category: 'productivity' as Category, icons: ['notion', 'raycast', 'linear'], count: 4 },
  { id: 'creative', label: '灵感工具箱', title: '好创意，值得被看见。', description: '从脑海中的一闪，到眼前的惊艳。', category: 'design' as Category, icons: ['figma', 'framer', 'canva'], count: 3 },
  { id: 'intelligence', label: 'AI 新可能', title: '你的下一位灵感搭子。', description: '释放想象，把不可能变成可能。', category: 'ai' as Category, icons: ['openai', 'claude', 'perplexity'], count: 3 },
]
