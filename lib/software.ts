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
    detail: '以本地 Markdown 文件为基础的知识管理工具。通过双向链接和关系图谱连接笔记，逐渐形成属于自己的知识网络，文件始终掌握在自己手中。',
    url: 'https://obsidian.md', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], pricing: '免费增值', tags: ['笔记', 'Markdown', '知识管理'],
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
  {
    id: 'wechat', name: '微信', icon: 'wechat', category: 'productivity',
    description: '连接重要的人，也连接每一种日常。',
    detail: '集聊天、群组、音视频通话与文件传输于一体，让个人沟通和团队协作自然衔接。公众号与小程序也把常用服务带进同一个入口。',
    url: 'https://www.wechat.com', platforms: ['macOS', 'Windows', 'iOS', 'Android', 'Web'], pricing: '免费', tags: ['WeChat', '聊天', '社交', '通讯', '小程序'], featured: true,
  },
  {
    id: 'alipay', name: '支付宝', icon: 'alipay', category: 'utilities',
    description: '从付款到生活服务，轻松一步完成。',
    detail: '覆盖移动支付、账单管理、出行与多种城市服务。把高频生活事务收进一个入口，让每次付款和查询都更省心。金融与生活服务请以当地实际开放情况为准。',
    url: 'https://www.alipay.com', platforms: ['iOS', 'Android', 'Web'], pricing: '免费', tags: ['Alipay', '支付', '付款', '生活服务', '出行'],
  },
  {
    id: 'qq', name: 'QQ', icon: 'qq', category: 'productivity',
    description: '自在聊天，也把兴趣与朋友聚在一起。',
    detail: '提供文字聊天、群组、音视频通话与文件传输，并通过频道和兴趣社区连接更多同好。适合跨设备保持联系，也方便分享大文件。',
    url: 'https://im.qq.com', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], pricing: '免费增值', tags: ['腾讯 QQ', '聊天', '社交', '群聊', '文件传输'],
  },
  {
    id: 'taobao', name: '淘宝', icon: 'taobao', category: 'utilities',
    description: '发现所爱，也发现生活的新选择。',
    detail: '从日常用品到兴趣好物，浏览丰富的商品与店铺，并完成下单、物流查询和售后。购物前请仔细核对商品信息、商家资质与价格。',
    url: 'https://www.taobao.com', platforms: ['iOS', 'Android', 'Web'], pricing: '免费', tags: ['Taobao', '购物', '电商', '网购', '生活'],
  },
  {
    id: 'bilibili', name: '哔哩哔哩', icon: 'bilibili', category: 'entertainment',
    description: '看见热爱，与有趣的人一起分享。',
    detail: '探索动画、影视、知识、游戏与生活等丰富视频内容。关注喜欢的创作者，在评论和弹幕中与同好交流，也可以记录并发布自己的创作。',
    url: 'https://www.bilibili.com', platforms: ['macOS', 'Windows', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['Bilibili', 'B站', '视频', '弹幕', '动画'],
  },
  {
    id: 'netease-cloud-music', name: '网易云音乐', icon: 'netease-cloud-music', category: 'entertainment',
    description: '让每一种心情，都有音乐回应。',
    detail: '听歌、收藏专辑、创建歌单并发现新的声音。个性化推荐和音乐社区，让熟悉的旋律与偶然遇见的好歌陪伴每一个时刻。曲库与套餐因地区而异。',
    url: 'https://music.163.com', platforms: ['macOS', 'Windows', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['NetEase Cloud Music', '音乐', '歌单', '播客', '听歌'],
  },
  {
    id: 'zhihu', name: '知乎', icon: 'zhihu', category: 'productivity',
    description: '认真提问，也认真寻找每一个答案。',
    detail: '通过问答、文章与专栏了解不同领域的经验和观点。沿着感兴趣的问题继续阅读，在多元讨论中完善认识，也分享自己的知识。重要信息请交叉核实来源。',
    url: 'https://www.zhihu.com', platforms: ['iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['Zhihu', '问答', '知识', '学习', '社区'],
  },
  {
    id: 'xiaohongshu', name: '小红书', icon: 'xiaohongshu', category: 'entertainment',
    description: '记录真实生活，发现新鲜灵感。',
    detail: '浏览来自创作者的生活方式、旅行、美食与兴趣内容，用图文或视频记录自己的体验。消费建议具有主观性，做决定前请结合实际情况判断。',
    url: 'https://www.xiaohongshu.com', platforms: ['iOS', 'Android', 'Web'], pricing: '免费', tags: ['Xiaohongshu', 'RED', '生活方式', '社区', '种草'],
  },
  {
    id: 'google-chrome', name: 'Google Chrome', icon: 'google-chrome', category: 'utilities',
    description: '快速、安全，把网络带到每台设备。',
    detail: '简洁而成熟的网页浏览器，支持跨设备同步书签、密码与标签页。丰富扩展和开发者工具，兼顾日常浏览、工作与网页调试。',
    url: 'https://www.google.com/chrome/', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], pricing: '免费', tags: ['Chrome', '谷歌浏览器', '浏览器', '网页', '扩展'],
  },
  {
    id: 'youtube', name: 'YouTube', icon: 'youtube', category: 'entertainment',
    description: '看见世界，也分享你的声音。',
    detail: '观看来自全球创作者的视频、直播与短内容，订阅喜欢的频道并建立播放列表。部分内容和会员服务会因地区而有所不同。',
    url: 'https://www.youtube.com', platforms: ['iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['视频', '直播', '创作者', '影音', '油管'],
  },
  {
    id: 'telegram', name: 'Telegram', icon: 'telegram', category: 'productivity',
    description: '轻快沟通，让消息跨设备自然流动。',
    detail: '支持私聊、群组、频道、语音与视频通话，并可在多台设备间同步消息。使用前请了解所在地的可用性以及群组内容和隐私设置。',
    url: 'https://telegram.org', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['聊天', '通讯', '频道', '群组', '电报'],
  },
  {
    id: 'discord', name: 'Discord', icon: 'discord', category: 'productivity',
    description: '与朋友和社群，随时待在同一个频道。',
    detail: '通过文字、语音与视频频道组织社群沟通，适合游戏好友、兴趣小组和协作团队。用频道、身份组与管理工具，为不同话题留出清晰空间。',
    url: 'https://discord.com', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['聊天', '语音', '社群', '游戏', '协作'],
  },
  {
    id: 'steam', name: 'Steam', icon: 'steam', category: 'entertainment',
    description: '发现下一款想玩的游戏。',
    detail: '浏览和管理丰富的 PC 游戏库，关注更新、成就与玩家社区。购买前可查看配置要求、用户评价和退款政策，让每次选择更安心。',
    url: 'https://store.steampowered.com/about/', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android', 'Web'], pricing: '免费', tags: ['游戏', '游戏平台', 'PC', '社区', '商店'],
  },
  {
    id: 'slack', name: 'Slack', icon: 'slack', category: 'productivity',
    description: '让团队沟通更集中，工作更顺畅。',
    detail: '用频道整理项目与话题，通过消息、语音和工作流保持团队同步。连接常用服务，把分散的信息和协作动作带回同一个工作空间。',
    url: 'https://slack.com', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['团队聊天', '协作', '频道', '办公', '工作流'],
  },
  {
    id: 'dropbox', name: 'Dropbox', icon: 'dropbox', category: 'productivity',
    description: '重要文件，随时都在手边。',
    detail: '在设备间同步文件与文件夹，通过链接分享内容并与团队协作。版本记录和恢复功能为日常文件管理多添一份安心，具体额度取决于套餐。',
    url: 'https://www.dropbox.com', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android', 'Web'], pricing: '免费增值', tags: ['云盘', '云存储', '文件同步', '分享', '备份'],
  },
  {
    id: 'blender', name: 'Blender', icon: 'blender', category: 'design',
    description: '从第一笔轮廓，到完整的三维世界。',
    detail: '开源的三维创作套件，覆盖建模、雕刻、动画、渲染与视频后期。无论独立创作还是专业流程，都能用一套工具把想象构建出来。',
    url: 'https://www.blender.org', platforms: ['macOS', 'Windows', 'Linux'], pricing: '免费', tags: ['3D', '三维建模', '动画', '渲染', '开源'],
  },
]

export const collections = [
  { id: 'daily', label: '编辑精选', title: '让日常，轻盈一点。', description: '少一点繁琐，多一点专注。', category: 'productivity' as Category, icons: ['notion', 'raycast', 'linear'], count: 11 },
  { id: 'creative', label: '灵感工具箱', title: '好创意，值得被看见。', description: '从脑海中的一闪，到眼前的惊艳。', category: 'design' as Category, icons: ['figma', 'framer', 'canva'], count: 3 },
  { id: 'intelligence', label: 'AI 新可能', title: '你的下一位灵感搭子。', description: '释放想象，把不可能变成可能。', category: 'ai' as Category, icons: ['openai', 'claude', 'perplexity'], count: 3 },
]
