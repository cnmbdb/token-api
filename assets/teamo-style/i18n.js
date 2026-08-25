(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const STORAGE_KEY = 'suxin-language';
  const SUPPORTED = ['zh-CN', 'zh-TW', 'en', 'ja', 'ru', 'hi'];
  const languageNames = {
    'zh-CN': '简体中文', 'zh-TW': '繁體中文', en: 'English',
    ja: '日本語', ru: 'Русский', hi: 'हिन्दी'
  };

  const dictionaries = {
    'zh-CN': {
      meta: ['suxin · Agent 接入大模型的统一入口', 'suxin 为 Agent 和生产环境提供统一的大模型 API、智能路由、实时价格与用量追踪。'],
      language: '语言', menu: '菜单', start: '开始使用', copied: '已复制', copyFailed: '复制失败', copy: '复制', integrationGuide: '接入说明', discountSuffix: ' 折', freeNote: '免安装配置',
      nav: ['主页', '控制台', '模型广场', '排行榜', '文档', '关于', '邀请返现'],
      pill: '全球模型直连 · 低至 1 折',
      titleFrames: [[{text:'Agent 接入',grad:'Agent'},{text:'大模型的统一入口'}],[{text:'专用于生产环境的',grad:'生产环境'},{text:'统一大模型网关'}]],
      heroButtons: ['获取 API Key', '下载客户端'], protocol: ['OpenAI 协议', 'Anthropic 协议', 'Google 协议'],
      routeHero: ['全球模型直连', 'AGENT 客户端', '智能调度', '已支持 10+ Agent / 客户端'],
      proof: ['智能调度', '提示缓存', '自动兜底', '一张账单', '消费追踪', '绝不降级'], social: ['已有', '开发团队与独立开发者在用'],
      pricing: ['实时价格 · 低至 1 折', '价格实时更新，折扣随上游成本波动；每次调用按请求时的实时折扣结算。<br>价格单位：USD / 1M Tokens。', '上下文 1M', '支持 Fast Mode', '输入 / 1M TOKENS', '输出 / 1M TOKENS', '快速接入', '查看全部模型价格'],
      stats: ['昨日路由 tokens', '提示缓存命中率', '路由 SLA', '新模型支持速度', '小时级'],
      pay: ['按量付费，', '用多少付多少', '你的账户统一按美元计费，按模型自动计价，无月费、无订阅。', '购买额度', '快速接入', '美元计费 · 无最低消费 · 随时充值 · 支持支付宝'],
      quick: ['快速开始', '100% 协议兼容，只改一行 Base URL，即可接入生产环境；<br>只需下载 Teamo 客户端，即可一键接入 Codex / CC。', '同样适用于 Codex、Claude Desktop、OpenClaw、CC-Switch，以及任何兼容 OpenAI 协议的客户端。', '查看 API 文档', '接入生产环境或 Agent Harness', '免 Key，一键接入 Codex', '下载 Teamo 客户端，自动完成配置（新手推荐）'],
      methodTabs: ['API', 'Codex 客户端', 'Claude 客户端', '命令行', '其他'],
      methodDescriptions: {codex:'Codex 客户端：设置 OPENAI_BASE_URL=https://suxin.ai/v1',claude:'Claude 客户端：将兼容端点设置为 https://suxin.ai',cli:'命令行：导出 SUXIN_API_KEY 后即可调用。',other:'其他兼容 OpenAI 协议的客户端只需替换 Base URL。'},
      metrics: ['一个敢用于生产环境的路由层', '三项核心指标均来自生产环境实测，与首页实时数据同源可查证。', ['价格 · PRICE','延迟 · FIRST TOKEN','可用性 · UPTIME'], '1折', ['2000+供应商实时竞价&质量监控，让每次请求打出极致折扣——全模型实时竞价数据首页透明可见。','请求延迟、推理速度打平官方——来自全网生产流量实测，慢速渠道分钟级封禁，实时数据首页可见。','独家 Harness Routing 技术，生产级 SLA+Cache 率保障：多通道故障自动切换、7×24 服务不中断。']],
      trust: ['为什么选 suxin？','可低成本稳定运行 Agent Harness 任务，模型表现与成本控制稳定、可审计。','这个价格是怎么做到的？','一个账户，一张账单。上游供应商由我们逐家验。',['模型不降级','数据隐私','消费可追踪','供应商竞价网络','规模化采购','平台补贴'],['请求直达已验证上游，不静默替换模型。','Prompt 与结果只用于路由、计量与技术支持。','预算和路由策略可控，账单逐条可查。','聚合多模型供应商，持续监控价格与质量。','企业级用量承诺带来更好的采购成本。','把运营效率持续回馈给正在增长的用户。']],
      route: ['路由方案','生产级路由算法','严格保障效率，通过多级容灾和效率敏感的路由策略优先保障服务质量，响应稳稳接住、始终丝滑，高峰期和官方宕机时可能折扣变少，但不会超过官方原价。',['价格','低至官方原价 1 折','延迟','智能选择更快通道','适用','生产环境与研发团队','保障','多级容灾'],['可用性','成本','延迟'],'统一请求入口'],
      routeStates: {availability:['容灾切换','高可用通道已接管'],cost:['实时竞价','当前最优价格通道'],latency:['延迟优先','首字更快通道']},
      live: ['实时折扣','折扣随上游成本按小时浮动，数据实时更新；每次调用按请求时的实时折扣结算。','精选','搜索模型...',['当前折扣','48H 平均','48H 最低','折后输入','折后输出','折后缓存']],
      ranking: ['使用排行榜','每日零点刷新',['模型使用量','Agent 排行榜','模型排行榜'],['每日经 suxin 路由的 token 总量','按客户端周调用量排名 · 趋势为周环比','按模型周调用量排名 · 趋势为周环比'],'任务','次','成功率'],
      buy: ['每一份 token 都更划算','现在充值，让每一次调用都跑在更低的成本上。美元余额持续保留在你的账户中，随用随扣。','购买额度','美元计费 · 无最低消费 · 随时充值 · 支持支付宝'],
      faqTitle: '常见问题', faqs: [['什么是 LLM 路由？','一个夹在你的工具和模型供应商之间的统一 API。你只调用一个地址、只用一把 Key，路由层把每次请求分发给 Claude、GPT、Gemini 或其他模型，计量用量，最后给你一张账单。'],['suxin 兼容 OpenAI 协议吗？','两种协议都兼容。OpenAI 兼容端点只需改 Base URL，即可配合官方 OpenAI SDK 和 Codex 使用；Claude Code 走 Anthropic 兼容端点，配置两个环境变量即可。'],['价格为什么能低至 1 折？','靠规模。我们与已验证的供应商签订企业级用量承诺，把差价直接让给你。折扣逐模型不同，并随上游成本浮动——上方价格表是实时的。'],['我的数据会被拿去训练模型吗？','不会。Prompt 与返回结果仅用于路由、计量、计费、反滥用与技术支持，绝不用于训练，也绝不出售。'],['额度会过期吗？','不会。想充就充，随时使用，无需订阅。']],
      footer: ['为企业和专业人士打造的 Agentic LLM 统一网关',['产品','资源','账户'],['定价','模型排行榜','实时折扣','接入 Agent','API 文档','常见问题','控制台','开始使用'],'© 2026 suxin.ai. 保留所有权利。','每一次调用，都穿越最优通道']
    },
    'zh-TW': {
      meta: ['suxin · Agent 接入大型模型的統一入口', 'suxin 為 Agent 與生產環境提供統一的大型模型 API、智慧路由、即時價格與用量追蹤。'],
      language:'語言',menu:'選單',start:'開始使用',copied:'已複製',copyFailed:'複製失敗',copy:'複製',integrationGuide:'接入說明',discountSuffix:' 折',freeNote:'免安裝設定',
      nav:['主頁','控制台','模型廣場','排行榜','文件','關於','邀請返現'],pill:'全球模型直連 · 低至 1 折',
      titleFrames:[[{text:'Agent 接入',grad:'Agent'},{text:'大型模型的統一入口'}],[{text:'專為生產環境打造',grad:'生產環境'},{text:'統一大型模型閘道'}]],
      heroButtons:['取得 API Key','下載客戶端'],protocol:['OpenAI 協定','Anthropic 協定','Google 協定'],routeHero:['全球模型直連','AGENT 客戶端','智慧調度','已支援 10+ Agent / 客戶端'],
      proof:['智慧調度','提示快取','自動備援','一張帳單','消費追蹤','絕不降級'],social:['已有','開發團隊與獨立開發者使用'],
      pricing:['即時價格 · 低至 1 折','價格即時更新，折扣隨上游成本波動；每次呼叫按請求當下的即時折扣結算。<br>價格單位：USD / 1M Tokens。','上下文 1M','支援 Fast Mode','輸入 / 1M TOKENS','輸出 / 1M TOKENS','快速接入','查看全部模型價格'],stats:['昨日路由 tokens','提示快取命中率','路由 SLA','新模型支援速度','小時級'],
      pay:['按量付費，','用多少付多少','帳戶統一以美元計費，依模型自動定價，無月費、無訂閱。','購買額度','快速接入','美元計費 · 無最低消費 · 隨時儲值 · 支援支付寶'],
      quick:['快速開始','100% 協定相容，只需修改一行 Base URL，即可接入生產環境；<br>使用 suxin，無需複雜設定即可接入 Codex / Claude Code。','同樣適用於 Codex、Claude Desktop、OpenClaw、CC-Switch，以及任何相容 OpenAI 協定的客戶端。','查看 API 文件','接入生產環境或 Agent Harness','免安裝，一鍵接入','取得 API Key 並開始呼叫'],methodTabs:['API','Codex 客戶端','Claude 客戶端','命令列','其他'],methodDescriptions:{codex:'Codex 客戶端：設定 OPENAI_BASE_URL=https://suxin.ai/v1',claude:'Claude 客戶端：將相容端點設為 https://suxin.ai',cli:'命令列：匯出 SUXIN_API_KEY 後即可呼叫。',other:'其他相容 OpenAI 協定的客戶端只需替換 Base URL。'},
      metrics:['敢用於生產環境的路由層','三項核心指標均來自生產環境實測，與首頁即時資料同源可查證。',['價格 · PRICE','延遲 · FIRST TOKEN','可用性 · UPTIME'],'1 折',['2000+ 供應商即時競價與品質監控，讓每次請求取得極致折扣——全模型即時競價資料首頁透明可見。','請求延遲、推理速度媲美官方——來自全網生產流量實測，慢速通道分鐘級封鎖。','獨家 Harness Routing 技術，生產級 SLA + Cache 率保障：多通道故障自動切換、7×24 服務不中斷。']],
      trust:['為什麼選 suxin？','低成本穩定執行 Agent Harness 任務，模型表現與成本控制穩定且可稽核。','這個價格如何做到？','一個帳戶，一張帳單。上游供應商由我們逐家驗證。',['模型不降級','資料隱私','消費可追蹤','供應商競價網路','規模化採購','平台補貼'],['請求直達已驗證上游，不會靜默替換模型。','Prompt 與結果僅用於路由、計量與技術支援。','預算和路由策略可控，帳單逐筆可查。','聚合多模型供應商，持續監控價格與品質。','企業級用量承諾帶來更好的採購成本。','將營運效率持續回饋給成長中的使用者。']],
      route:['路由方案','生產級路由演算法','透過多級容災與效率敏感的路由策略優先保障服務品質；尖峰與官方中斷時折扣可能變少，但不會超過官方原價。',['價格','低至官方原價 1 折','延遲','智慧選擇更快通道','適用','生產環境與研發團隊','保障','多級容災'],['可用性','成本','延遲'],'統一請求入口'],routeStates:{availability:['容災切換','高可用通道已接管'],cost:['即時競價','目前最佳價格通道'],latency:['延遲優先','首字更快通道']},
      live:['即時折扣','折扣隨上游成本按小時浮動，資料即時更新；每次呼叫按請求當下的即時折扣結算。','精選','搜尋模型...',['目前折扣','48H 平均','48H 最低','折後輸入','折後輸出','折後快取']],ranking:['使用排行榜','每日零點更新',['模型使用量','Agent 排行榜','模型排行榜'],['每日經 suxin 路由的 token 總量','依客戶端週呼叫量排名 · 趨勢為週環比','依模型週呼叫量排名 · 趨勢為週環比'],'任務','次','成功率'],
      buy:['每一份 token 都更划算','立即儲值，讓每次呼叫都以更低成本運行。美元餘額持續保留，隨用隨扣。','購買額度','美元計費 · 無最低消費 · 隨時儲值 · 支援支付寶'],faqTitle:'常見問題',faqs:[['什麼是 LLM 路由？','位於工具與模型供應商之間的統一 API。你只需呼叫一個位址、使用一把 Key，路由層會分配請求、計量用量並統一結算。'],['suxin 相容 OpenAI 協定嗎？','相容 OpenAI 與 Anthropic 協定。只需更換 Base URL，即可繼續使用官方 SDK、Codex 與 Claude Code。'],['價格為什麼能低至 1 折？','靠規模化採購。我們與已驗證供應商簽訂企業級用量承諾，並將價差直接回饋給你。'],['我的資料會被用來訓練模型嗎？','不會。Prompt 與回傳結果僅用於路由、計量、計費、反濫用與技術支援，絕不用於訓練或出售。'],['額度會過期嗎？','不會。可隨時儲值、隨時使用，無需訂閱。']],footer:['為企業與專業人士打造的 Agentic LLM 統一閘道',['產品','資源','帳戶'],['定價','模型排行榜','即時折扣','接入 Agent','API 文件','常見問題','控制台','開始使用'],'© 2026 suxin.ai. 保留所有權利。','每一次呼叫，都穿越最佳通道']
    },
    en: {
      meta:['suxin · One gateway for every AI Agent','suxin provides a unified LLM API, intelligent routing, live pricing, and usage tracking for Agents and production workloads.'],language:'Language',menu:'Menu',start:'Get started',copied:'Copied',copyFailed:'Copy failed',copy:'Copy',integrationGuide:'Integration guide',discountSuffix:'×',freeNote:'No setup required',
      nav:['Home','Console','Model Square','Rankings','Docs','About','Referral rewards'],pill:'Global model access · From 0.1×',titleFrames:[[{text:'One gateway for',grad:'gateway'},{text:'every AI Agent'}],[{text:'Production-ready',grad:'Production'},{text:'unified LLM gateway'}]],heroButtons:['Get API Key','Download client'],protocol:['OpenAI protocol','Anthropic protocol','Google protocol'],routeHero:['GLOBAL MODEL ACCESS','AGENT CLIENTS','Smart routing','Supports 10+ Agents / clients'],
      proof:['Smart routing','Prompt caching','Automatic fallback','One invoice','Usage tracking','No downgrades'],social:['Trusted by','developer teams and independent builders'],pricing:['Live pricing · From 0.1×','Prices update live with upstream costs. Every request is billed at the discount shown when it is sent.<br>Unit: USD / 1M Tokens.','1M context','Fast Mode supported','INPUT / 1M TOKENS','OUTPUT / 1M TOKENS','Connect now','View all model prices'],stats:['tokens routed yesterday','prompt cache hit rate','routing SLA','new-model availability','Within hours'],
      pay:['Pay as you go. ','Only for what you use.','Your account is billed in USD and priced automatically by model. No monthly fee or subscription.','Buy credits','Connect now','USD billing · No minimum spend · Top up anytime · Alipay supported'],quick:['Quick start','100% protocol compatible. Change one Base URL to connect production workloads.<br>With suxin, Codex and Claude Code work without complex setup.','Also works with Codex, Claude Desktop, OpenClaw, CC-Switch, and any OpenAI-compatible client.','View API docs','Connect production or Agent Harness workloads','One-click setup','Get an API Key and start calling'],methodTabs:['API','Codex client','Claude client','Command line','Other'],methodDescriptions:{codex:'Codex client: set OPENAI_BASE_URL=https://suxin.ai/v1',claude:'Claude client: set the compatible endpoint to https://suxin.ai',cli:'Command line: export SUXIN_API_KEY, then call the API.',other:'For any other OpenAI-compatible client, replace the Base URL.'},
      metrics:['A routing layer built for production','All three metrics come from production measurements and share the same verifiable live data shown on this page.',['PRICE','FIRST TOKEN','UPTIME'],'0.1×',['Live bidding and quality monitoring across 2,000+ suppliers drives the best available discount for each request.','Request latency and inference speed match official channels. Slow routes are blocked within minutes using production traffic data.','Exclusive Harness Routing with production SLA and cache guarantees automatically fails over across channels, 24/7.']],trust:['Why suxin?','Run Agent Harness workloads reliably at lower cost, with stable, auditable model performance and spend.','How are prices this low?','One account and one invoice. We verify every upstream supplier.',['No model downgrades','Data privacy','Traceable spend','Supplier bidding network','Volume purchasing','Platform subsidy'],['Requests go directly to verified upstreams. Models are never silently replaced.','Prompts and responses are used only for routing, metering, and support.','Budgets and routing policies stay under your control, with itemized billing.','Multiple model suppliers compete while price and quality are continuously monitored.','Enterprise usage commitments reduce procurement costs.','Operational efficiency is returned to growing users.']],
      route:['ROUTING PLAN','Production-grade routing','Multi-level failover and efficiency-aware routing prioritize service quality. Discounts may narrow during peaks or provider outages, but prices never exceed official rates.',['PRICE','From 0.1× official price','LATENCY','Selects faster routes automatically','BEST FOR','Production and engineering teams','PROTECTION','Multi-level failover'],['Availability','Cost','Latency'],'Unified request entry'],routeStates:{availability:['Failover','High-availability route active'],cost:['Live bidding','Best-priced route selected'],latency:['Latency first','Faster first-token route']},
      live:['Live discounts','Discounts follow upstream costs hourly and update live. Each request is billed at the current discount.','Featured','Search models...',['Current discount','48H average','48H low','Input after discount','Output after discount','Cache after discount']],ranking:['Usage rankings','Updated daily at 00:00',['Model usage','Agent rankings','Model rankings'],['Total tokens routed through suxin each day','Ranked by weekly client calls · Trend is week over week','Ranked by weekly model calls · Trend is week over week'],'Tasks','calls','Success rate'],
      buy:['Make every token cost less','Top up now and run every call at a lower cost. Your USD balance remains available and is deducted only when used.','Buy credits','USD billing · No minimum spend · Top up anytime · Alipay supported'],faqTitle:'Frequently asked questions',faqs:[['What is LLM routing?','A unified API between your tools and model providers. You use one endpoint and one Key; the routing layer distributes requests across Claude, GPT, Gemini, and other models, meters usage, and gives you one bill.'],['Is suxin OpenAI-compatible?','Yes. The OpenAI-compatible endpoint works by changing only the Base URL. Claude Code can use the Anthropic-compatible endpoint with two environment variables.'],['How can prices start at 0.1×?','Scale. We make enterprise usage commitments with verified suppliers and pass the difference on to you. Discounts vary by model and upstream cost.'],['Is my data used to train models?','No. Prompts and responses are used only for routing, metering, billing, abuse prevention, and support. They are never sold or used for training.'],['Do credits expire?','No. Top up whenever you want and use the balance at any time. No subscription is required.']],footer:['The unified Agentic LLM gateway for businesses and professionals',['Product','Resources','Account'],['Pricing','Model rankings','Live discounts','Connect Agent','API docs','FAQ','Console','Get started'],'© 2026 suxin.ai. All rights reserved.','Every call takes the best route']
    },
    ja: {
      meta:['suxin · AI Agent のための統合ゲートウェイ','suxin は Agent と本番環境向けに、統合 LLM API、スマートルーティング、リアルタイム価格、使用量追跡を提供します。'],language:'言語',menu:'メニュー',start:'利用開始',copied:'コピー済み',copyFailed:'コピー失敗',copy:'コピー',integrationGuide:'接続ガイド',discountSuffix:'割',freeNote:'インストール不要',
      nav:['ホーム','コンソール','モデル広場','ランキング','ドキュメント','このサービスについて','紹介特典'],pill:'世界中のモデルへ直結 · 最低 1 割',titleFrames:[[{text:'AI Agent 接続の',grad:'AI Agent'},{text:'統合ゲートウェイ'}],[{text:'本番環境向けの',grad:'本番環境'},{text:'統合 LLM ゲートウェイ'}]],heroButtons:['API Key を取得','クライアントを入手'],protocol:['OpenAI プロトコル','Anthropic プロトコル','Google プロトコル'],routeHero:['世界中のモデルへ直結','AGENT クライアント','スマートルーティング','10+ Agent / クライアントに対応'],
      proof:['スマートルーティング','プロンプトキャッシュ','自動フォールバック','請求書を一本化','利用量追跡','モデルを格下げしない'],social:['すでに','の開発チームと個人開発者が利用'],pricing:['リアルタイム価格 · 最低 1 割','価格は上流コストに応じてリアルタイム更新。各リクエストは送信時の割引率で精算されます。<br>単位：USD / 1M Tokens。','コンテキスト 1M','Fast Mode 対応','入力 / 1M TOKENS','出力 / 1M TOKENS','今すぐ接続','全モデル価格を見る'],stats:['昨日のルーティング tokens','プロンプトキャッシュ命中率','ルーティング SLA','新モデル対応速度','数時間以内'],
      pay:['従量課金。','使った分だけお支払い','アカウントは米ドルで統一請求され、モデル別に自動計算。月額料金やサブスクリプションはありません。','クレジット購入','今すぐ接続','USD 請求 · 最低利用額なし · いつでもチャージ · Alipay 対応'],quick:['クイックスタート','プロトコル 100% 互換。Base URL を 1 行変更するだけで本番環境に接続できます。<br>suxin なら Codex / Claude Code も複雑な設定なしで利用できます。','Codex、Claude Desktop、OpenClaw、CC-Switch、その他 OpenAI 互換クライアントにも対応。','API ドキュメントを見る','本番環境または Agent Harness を接続','インストール不要・ワンクリック','API Key を取得して開始'],methodTabs:['API','Codex クライアント','Claude クライアント','コマンドライン','その他'],methodDescriptions:{codex:'Codex クライアント：OPENAI_BASE_URL=https://suxin.ai/v1 を設定',claude:'Claude クライアント：互換エンドポイントを https://suxin.ai に設定',cli:'コマンドライン：SUXIN_API_KEY をエクスポートして呼び出します。',other:'その他の OpenAI 互換クライアントは Base URL の変更だけで利用できます。'},
      metrics:['本番環境で使えるルーティング層','3 つの主要指標は本番環境の実測値で、ページ上のリアルタイムデータと同じソースから検証できます。',['価格 · PRICE','レイテンシ · FIRST TOKEN','可用性 · UPTIME'],'1 割',['2,000+ のサプライヤーによるリアルタイム入札と品質監視で、各リクエストの最適な割引を実現。','本番トラフィックの実測に基づき、遅い経路を数分で遮断。公式同等の応答・推論速度を提供します。','独自の Harness Routing、SLA、Cache 保証により、複数経路を自動切替し 24 時間 365 日稼働。']],trust:['suxin を選ぶ理由','Agent Harness を低コストで安定運用。モデル性能とコストは安定し、監査可能です。','なぜこの価格が可能？','1 アカウント、1 請求書。上流サプライヤーを一社ずつ検証します。',['モデルを格下げしない','データプライバシー','支出を追跡可能','サプライヤー入札網','大規模調達','プラットフォーム補助'],['検証済み上流へ直接送信し、モデルを無断で置換しません。','Prompt と結果はルーティング、計測、サポートにのみ使用。','予算とルーティング方針を管理でき、請求明細も確認可能。','複数サプライヤーを集約し、価格と品質を継続監視。','企業規模の利用契約で調達コストを削減。','運用効率を成長中のユーザーへ還元します。']],
      route:['ルーティングプラン','本番グレードのルーティング','多段フェイルオーバーと効率重視のルーティングで品質を優先。ピーク時も公式価格を超えません。',['価格','公式価格の最低 1 割','レイテンシ','高速経路を自動選択','対象','本番環境と開発チーム','保護','多段フェイルオーバー'],['可用性','コスト','レイテンシ'],'統一リクエスト入口'],routeStates:{availability:['フェイルオーバー','高可用経路へ切替済み'],cost:['リアルタイム入札','最安経路を選択中'],latency:['レイテンシ優先','初回 token が速い経路']},
      live:['リアルタイム割引','割引は上流コストに応じて毎時変動し、リアルタイム更新。各リクエストは現在の割引率で精算。','おすすめ','モデルを検索...',['現在の割引','48H 平均','48H 最低','割引後の入力','割引後の出力','割引後のキャッシュ']],ranking:['利用ランキング','毎日 0 時更新',['モデル使用量','Agent ランキング','モデルランキング'],['suxin が毎日ルーティングする token 総量','クライアント週次呼出数順 · 前週比','モデル週次呼出数順 · 前週比'],'タスク','回','成功率'],buy:['すべての token をもっとお得に','今すぐチャージして、すべての呼び出しを低コストに。USD 残高は保持され、使用分だけ差し引かれます。','クレジット購入','USD 請求 · 最低利用額なし · いつでもチャージ · Alipay 対応'],faqTitle:'よくある質問',faqs:[['LLM ルーティングとは？','ツールとモデルプロバイダーの間にある統合 API です。1 つのエンドポイントと 1 つの Key で、Claude、GPT、Gemini などへリクエストを振り分け、利用量と請求を一本化します。'],['suxin は OpenAI 互換ですか？','はい。Base URL の変更だけで OpenAI 互換 SDK と Codex を利用できます。Claude Code は Anthropic 互換エンドポイントに対応します。'],['なぜ最低 1 割にできるのですか？','規模の力です。検証済みサプライヤーと企業向け利用契約を結び、差額をユーザーへ還元します。'],['データはモデル学習に使われますか？','いいえ。Prompt と応答はルーティング、計測、請求、不正防止、サポートにのみ使用し、販売や学習には使いません。'],['クレジットに有効期限はありますか？','ありません。いつでもチャージして利用でき、サブスクリプションも不要です。']],footer:['企業とプロフェッショナル向け Agentic LLM 統合ゲートウェイ',['製品','リソース','アカウント'],['価格','モデルランキング','リアルタイム割引','Agent 接続','API ドキュメント','FAQ','コンソール','利用開始'],'© 2026 suxin.ai. All rights reserved.','すべての呼び出しを最適な経路へ']
    },
    ru: {
      meta:['suxin · Единый шлюз для AI-агентов','suxin предоставляет единый LLM API, интеллектуальную маршрутизацию, актуальные цены и учёт использования.'],language:'Язык',menu:'Меню',start:'Начать',copied:'Скопировано',copyFailed:'Ошибка копирования',copy:'Копировать',integrationGuide:'Инструкция',discountSuffix:'×',freeNote:'Без установки',nav:['Главная','Консоль','Витрина моделей','Рейтинги','Документы','О проекте','Реферальная программа'],pill:'Прямой доступ к моделям · от 0,1×',titleFrames:[[{text:'Единый шлюз',grad:'шлюз'},{text:'для AI-агентов'}],[{text:'Для production',grad:'production'},{text:'единый LLM-шлюз'}]],heroButtons:['Получить API Key','Скачать клиент'],protocol:['Протокол OpenAI','Протокол Anthropic','Протокол Google'],routeHero:['ДОСТУП К МОДЕЛЯМ','КЛИЕНТЫ AGENT','Умная маршрутизация','Поддержка 10+ Agents / клиентов'],proof:['Умная маршрутизация','Кэш Prompt','Авто-резерв','Один счёт','Учёт расходов','Без понижения модели'],social:['Нам доверяют','команд и независимых разработчиков'],pricing:['Актуальные цены · от 0,1×','Цены обновляются вместе с затратами поставщиков. Каждый запрос оплачивается по скидке на момент отправки.<br>Единица: USD / 1M Tokens.','Контекст 1M','Поддержка Fast Mode','ВХОД / 1M TOKENS','ВЫХОД / 1M TOKENS','Подключить','Все цены моделей'],stats:['tokens за вчера','попаданий в Prompt-кэш','SLA маршрутизации','подключение новых моделей','За часы'],pay:['Оплата по факту. ','Только за использование','Единый счёт в USD и автоматическая цена по модели. Без абонплаты и подписки.','Купить кредиты','Подключить','USD · Без минимума · Пополнение в любое время · Alipay'],quick:['Быстрый старт','100% совместимость протоколов. Измените одну строку Base URL для production.<br>suxin подключает Codex / Claude Code без сложной настройки.','Работает с Codex, Claude Desktop, OpenClaw, CC-Switch и любым OpenAI-совместимым клиентом.','API-документация','Production или Agent Harness','Один клик без установки','Получить API Key и начать'],methodTabs:['API','Клиент Codex','Клиент Claude','Командная строка','Другое'],methodDescriptions:{codex:'Клиент Codex: задайте OPENAI_BASE_URL=https://suxin.ai/v1',claude:'Клиент Claude: задайте совместимый endpoint https://suxin.ai',cli:'Командная строка: экспортируйте SUXIN_API_KEY и вызовите API.',other:'В другом OpenAI-совместимом клиенте замените Base URL.'},metrics:['Маршрутизация для production','Все три показателя измерены на production-трафике и доступны для проверки.',['ЦЕНА · PRICE','ЗАДЕРЖКА · FIRST TOKEN','ДОСТУПНОСТЬ · UPTIME'],'0,1×',['Торги и контроль качества среди 2 000+ поставщиков дают лучшую доступную скидку.','Скорость ответа на уровне официальных каналов; медленные маршруты блокируются за минуты.','Harness Routing, SLA и Cache автоматически переключают каналы и обеспечивают работу 24/7.']],trust:['Почему suxin?','Надёжный Agent Harness по низкой цене с предсказуемыми и проверяемыми расходами.','Откуда такая цена?','Один аккаунт и один счёт. Мы проверяем каждого поставщика.',['Без понижения модели','Конфиденциальность','Прозрачные расходы','Сеть торгов','Оптовые закупки','Субсидии платформы'],['Запросы идут проверенным поставщикам без скрытой замены модели.','Prompt и ответы используются только для маршрутизации, учёта и поддержки.','Бюджеты и правила под контролем, все позиции видны в счёте.','Поставщики конкурируют, а цена и качество постоянно контролируются.','Корпоративные объёмы снижают закупочную цену.','Экономия платформы возвращается растущим пользователям.']],route:['ПЛАН МАРШРУТИЗАЦИИ','Маршрутизация уровня production','Многоуровневый резерв и приоритет эффективности сохраняют качество. Цена не превышает официальный тариф.',['ЦЕНА','От 0,1× официальной','ЗАДЕРЖКА','Автовыбор быстрого канала','ДЛЯ КОГО','Production и разработка','ЗАЩИТА','Многоуровневый резерв'],['Доступность','Стоимость','Задержка'],'Единая точка входа'],routeStates:{availability:['Переключение','Активен резервный канал'],cost:['Торги','Выбран лучший тариф'],latency:['Приоритет скорости','Быстрый первый token']},live:['Актуальные скидки','Скидки меняются каждый час вместе с затратами поставщиков. Запрос оплачивается по текущей ставке.','Рекомендуемые','Поиск моделей...',['Текущая скидка','Средняя 48H','Минимум 48H','Вход со скидкой','Выход со скидкой','Кэш со скидкой']],ranking:['Рейтинг использования','Обновление ежедневно в 00:00',['Использование моделей','Рейтинг Agent','Рейтинг моделей'],['Общий объём tokens через suxin за день','По недельным вызовам клиентов · изменение за неделю','По недельным вызовам моделей · изменение за неделю'],'Задач','вызовов','Успешность'],buy:['Каждый token дешевле','Пополните баланс и запускайте каждый вызов дешевле. Баланс USD сохраняется и списывается по мере использования.','Купить кредиты','USD · Без минимума · Пополнение в любое время · Alipay'],faqTitle:'Частые вопросы',faqs:[['Что такое LLM-маршрутизация?','Единый API между вашими инструментами и поставщиками моделей. Один endpoint и один Key распределяют запросы между Claude, GPT, Gemini и другими моделями, учитывают расход и формируют один счёт.'],['suxin совместим с OpenAI?','Да. Достаточно заменить Base URL для OpenAI SDK и Codex. Claude Code использует Anthropic-совместимый endpoint.'],['Почему цена начинается от 0,1×?','Благодаря масштабу. Мы заключаем корпоративные соглашения с проверенными поставщиками и передаём разницу вам.'],['Используются ли мои данные для обучения?','Нет. Prompt и ответы нужны только для маршрутизации, учёта, оплаты, защиты от злоупотреблений и поддержки.'],['Сгорают ли кредиты?','Нет. Пополняйте и используйте баланс когда угодно, подписка не нужна.']],footer:['Единый Agentic LLM-шлюз для бизнеса и профессионалов',['Продукт','Ресурсы','Аккаунт'],['Цены','Рейтинг моделей','Скидки','Подключить Agent','API-документация','Вопросы','Консоль','Начать'],'© 2026 suxin.ai. Все права защищены.','Каждый вызов идёт по лучшему маршруту']
    },
    hi: {
      meta:['suxin · हर AI Agent के लिए एकीकृत गेटवे','suxin Agent और production उपयोग के लिए एकीकृत LLM API, स्मार्ट रूटिंग, लाइव मूल्य और उपयोग ट्रैकिंग देता है।'],language:'भाषा',menu:'मेनू',start:'शुरू करें',copied:'कॉपी हुआ',copyFailed:'कॉपी नहीं हुआ',copy:'कॉपी',integrationGuide:'इंटीग्रेशन गाइड',discountSuffix:'×',freeNote:'इंस्टॉल नहीं करना',nav:['होम','कंसोल','मॉडल स्क्वायर','रैंकिंग','दस्तावेज़','परिचय','रेफ़रल रिवॉर्ड'],pill:'वैश्विक मॉडल एक्सेस · 0.1× से',titleFrames:[[{text:'हर AI Agent के लिए',grad:'AI Agent'},{text:'एकीकृत गेटवे'}],[{text:'Production के लिए',grad:'Production'},{text:'एकीकृत LLM गेटवे'}]],heroButtons:['API Key लें','क्लाइंट डाउनलोड करें'],protocol:['OpenAI प्रोटोकॉल','Anthropic प्रोटोकॉल','Google प्रोटोकॉल'],routeHero:['वैश्विक मॉडल एक्सेस','AGENT क्लाइंट','स्मार्ट रूटिंग','10+ Agents / क्लाइंट समर्थित'],proof:['स्मार्ट रूटिंग','Prompt कैश','ऑटो फ़ॉलबैक','एक बिल','खर्च ट्रैकिंग','मॉडल डाउनग्रेड नहीं'],social:['हम पर भरोसा करते हैं','डेवलपर टीमें और स्वतंत्र डेवलपर'],pricing:['लाइव मूल्य · 0.1× से','अपस्ट्रीम लागत के साथ मूल्य लाइव बदलते हैं। हर अनुरोध भेजते समय दिखी छूट पर बिल होता है।<br>इकाई: USD / 1M Tokens।','1M कॉन्टेक्स्ट','Fast Mode समर्थित','इनपुट / 1M TOKENS','आउटपुट / 1M TOKENS','अभी जोड़ें','सभी मॉडल मूल्य देखें'],stats:['कल रूट किए tokens','Prompt कैश हिट रेट','रूटिंग SLA','नया मॉडल उपलब्धता','कुछ घंटों में'],pay:['उपयोग के अनुसार भुगतान। ','सिर्फ जितना उपयोग करें','USD में एक बिल और मॉडल के अनुसार ऑटो मूल्य। कोई मासिक शुल्क या सब्सक्रिप्शन नहीं।','क्रेडिट खरीदें','अभी जोड़ें','USD बिलिंग · न्यूनतम खर्च नहीं · कभी भी टॉप-अप · Alipay'],quick:['तुरंत शुरू करें','100% प्रोटोकॉल संगत। Production से जुड़ने के लिए सिर्फ एक Base URL बदलें।<br>suxin के साथ Codex / Claude Code बिना जटिल सेटअप चलता है।','Codex, Claude Desktop, OpenClaw, CC-Switch और हर OpenAI-संगत क्लाइंट के साथ काम करता है।','API दस्तावेज़ देखें','Production या Agent Harness जोड़ें','बिना इंस्टॉल, एक क्लिक','API Key लेकर शुरू करें'],methodTabs:['API','Codex क्लाइंट','Claude क्लाइंट','कमांड लाइन','अन्य'],methodDescriptions:{codex:'Codex क्लाइंट: OPENAI_BASE_URL=https://suxin.ai/v1 सेट करें',claude:'Claude क्लाइंट: संगत endpoint को https://suxin.ai सेट करें',cli:'कमांड लाइन: SUXIN_API_KEY export करके API कॉल करें।',other:'अन्य OpenAI-संगत क्लाइंट में सिर्फ Base URL बदलें।'},metrics:['Production के लिए तैयार रूटिंग','तीनों मुख्य मेट्रिक production माप से हैं और पेज के लाइव डेटा से सत्यापित किए जा सकते हैं।',['मूल्य · PRICE','देरी · FIRST TOKEN','उपलब्धता · UPTIME'],'0.1×',['2,000+ सप्लायर की लाइव बोली और गुणवत्ता निगरानी हर अनुरोध के लिए सबसे अच्छी छूट देती है।','Production ट्रैफ़िक के आधार पर धीमे रूट मिनटों में बंद होते हैं और गति आधिकारिक चैनल जैसी रहती है।','Harness Routing, SLA और Cache गारंटी कई चैनलों में ऑटो फ़ेलओवर और 24/7 सेवा देते हैं।']],trust:['suxin क्यों?','कम लागत पर स्थिर Agent Harness, ऑडिट योग्य प्रदर्शन और खर्च।','मूल्य इतना कम कैसे?','एक अकाउंट और एक बिल। हर अपस्ट्रीम सप्लायर सत्यापित है।',['मॉडल डाउनग्रेड नहीं','डेटा गोपनीयता','खर्च का पूरा रिकॉर्ड','सप्लायर बोली नेटवर्क','बड़े पैमाने की खरीद','प्लेटफ़ॉर्म सहायता'],['अनुरोध सत्यापित अपस्ट्रीम को जाते हैं; मॉडल चुपचाप नहीं बदलता।','Prompt और उत्तर सिर्फ रूटिंग, मीटरिंग और सहायता के लिए हैं।','बजट और रूटिंग नीति आपके नियंत्रण में, बिल आइटमवार।','कई सप्लायर प्रतिस्पर्धा करते हैं और मूल्य व गुणवत्ता लगातार जाँची जाती है।','Enterprise उपयोग प्रतिबद्धता खरीद लागत घटाती है।','ऑपरेशन की बचत बढ़ते उपयोगकर्ताओं को लौटती है।']],route:['रूटिंग योजना','Production-grade रूटिंग','बहु-स्तरीय फ़ेलओवर और दक्षता आधारित रूटिंग गुणवत्ता बनाए रखते हैं। मूल्य आधिकारिक दर से ऊपर नहीं जाता।',['मूल्य','आधिकारिक मूल्य का 0.1× से','देरी','तेज़ रूट का ऑटो चयन','उपयुक्त','Production और डेवलपमेंट टीम','सुरक्षा','बहु-स्तरीय फ़ेलओवर'],['उपलब्धता','लागत','देरी'],'एकीकृत अनुरोध प्रवेश'],routeStates:{availability:['फ़ेलओवर','उच्च उपलब्धता रूट सक्रिय'],cost:['लाइव बोली','सबसे कम मूल्य वाला रूट'],latency:['देरी प्राथमिकता','तेज़ पहला token रूट']},live:['लाइव छूट','छूट अपस्ट्रीम लागत के साथ हर घंटे बदलती और लाइव अपडेट होती है। हर अनुरोध वर्तमान छूट पर बिल होता है।','चुनिंदा','मॉडल खोजें...',['वर्तमान छूट','48H औसत','48H न्यूनतम','छूट के बाद इनपुट','छूट के बाद आउटपुट','छूट के बाद कैश']],ranking:['उपयोग रैंकिंग','हर दिन 00:00 पर अपडेट',['मॉडल उपयोग','Agent रैंकिंग','मॉडल रैंकिंग'],['suxin से रोज़ रूट किए कुल tokens','साप्ताहिक क्लाइंट कॉल · सप्ताह-दर-सप्ताह ट्रेंड','साप्ताहिक मॉडल कॉल · सप्ताह-दर-सप्ताह ट्रेंड'],'टास्क','कॉल','सफलता दर'],buy:['हर token की लागत कम करें','अभी टॉप-अप करें और हर कॉल कम लागत में चलाएँ। USD बैलेंस सुरक्षित रहता है और उपयोग पर ही कटता है।','क्रेडिट खरीदें','USD बिलिंग · न्यूनतम खर्च नहीं · कभी भी टॉप-अप · Alipay'],faqTitle:'अक्सर पूछे जाने वाले प्रश्न',faqs:[['LLM रूटिंग क्या है?','आपके टूल और मॉडल प्रदाताओं के बीच एकीकृत API। एक endpoint और एक Key से अनुरोध Claude, GPT, Gemini और अन्य मॉडलों में बाँटे जाते हैं, उपयोग मापा जाता है और एक बिल मिलता है।'],['क्या suxin OpenAI-संगत है?','हाँ। सिर्फ Base URL बदलकर OpenAI SDK और Codex चलाएँ। Claude Code के लिए Anthropic-संगत endpoint उपलब्ध है।'],['मूल्य 0.1× से कैसे?','बड़े पैमाने के कारण। हम सत्यापित सप्लायर से enterprise उपयोग समझौते करते हैं और बचत सीधे आपको देते हैं।'],['क्या मेरा डेटा ट्रेनिंग में उपयोग होता है?','नहीं। Prompt और उत्तर सिर्फ रूटिंग, मीटरिंग, बिलिंग, दुरुपयोग रोकने और सहायता के लिए उपयोग होते हैं।'],['क्या क्रेडिट समाप्त होते हैं?','नहीं। कभी भी टॉप-अप और उपयोग करें; सब्सक्रिप्शन आवश्यक नहीं।']],footer:['व्यवसाय और प्रोफ़ेशनल के लिए एकीकृत Agentic LLM गेटवे',['उत्पाद','संसाधन','अकाउंट'],['मूल्य','मॉडल रैंकिंग','लाइव छूट','Agent जोड़ें','API दस्तावेज़','FAQ','कंसोल','शुरू करें'],'© 2026 suxin.ai. सर्वाधिकार सुरक्षित।','हर कॉल सबसे अच्छे रूट से']
    }
  };

  const setText = (selector, value, parent = document) => { const el = $(selector, parent); if (el) el.textContent = value; };
  const setHtml = (selector, value, parent = document) => { const el = $(selector, parent); if (el) el.innerHTML = value; };
  const setTexts = (selector, values, parent = document) => $$(selector, parent).forEach((el, index) => { if (values[index] !== undefined) el.textContent = values[index]; });
  const numberFrom = text => (text.match(/[\d.,]+/) || [''])[0];
  let currentLanguage = 'en';

  function applyLanguage(language, source = 'manual') {
    const lang = SUPPORTED.includes(language) ? language : 'en';
    const d = dictionaries[lang];
    currentLanguage = lang;
    document.documentElement.lang = lang === 'hi' ? 'hi-IN' : lang;
    document.documentElement.dataset.language = lang;
    document.documentElement.dataset.languageSource = source;
    document.title = d.meta[0];
    $('meta[name="description"]')?.setAttribute('content', d.meta[1]);
    document.documentElement.style.setProperty('--free-note', JSON.stringify(d.freeNote));

    const navLinks = $$('#links .nav-menu-item');
    navLinks.forEach((link, index) => {
      const gift = link.querySelector('img');
      link.textContent = d.nav[index];
      if (gift) link.append(gift);
    });
    setText('.actions .btn', d.start);
    setText('.nav-login-m', d.start);
    $('#hamb')?.setAttribute('aria-label', d.menu);
    $('#languageToggle')?.setAttribute('aria-label', d.language);
    $('#languageToggle')?.setAttribute('title', `${d.language}: ${languageNames[lang]}`);

    const pill = $('.pill');
    if (pill) pill.innerHTML = `<i class="dot"></i>${d.pill}`;
    window.__setHeroTitleFrames?.(d.titleFrames);
    const heroButtons = $$('.hero-buttons .btn');
    if (heroButtons[0]) setText('.hero-key-btn .hero-cta-label', d.heroButtons[0]);
    if (heroButtons[1]) setText('.hero-client-btn .hero-cta-label', d.heroButtons[1]);
    $$('.protocol-menu button').forEach((button, index) => {
      button.textContent = d.protocol[index];
      button.dataset.name = d.protocol[index];
    });
    const activeProtocol = $$('.protocol-menu button').find(button => button.dataset.url === $('#baseUrl')?.textContent);
    setText('#protocolLabel', activeProtocol?.dataset.name || d.protocol[0]);
    $('#copyBase')?.setAttribute('aria-label', `${d.copy} Base URL`);

    setText('.route-note.left', d.routeHero[0]); setText('.route-note.right', d.routeHero[1]);
    setText('.route-hub b', d.routeHero[2]); setText('.client-count', d.routeHero[3]);
    $$('.proofgrid > div').forEach((el, index) => {
      const dot = el.querySelector('.proof-dot'); el.textContent = d.proof[index]; if (dot) el.prepend(dot);
    });
    const socialText = $('.social > span:last-child');
    if (socialText) socialText.innerHTML = `${d.social[0]} <strong>6000+</strong> ${d.social[1]}`;

    setText('#pricing .head h2', d.pricing[0]); setHtml('#pricing .head p', d.pricing[1]);
    $$('#pricing .price').forEach(card => {
      const provider = $('.provider', card); if (provider) provider.textContent = `${provider.textContent.split(' · ')[0]} · ${d.pricing[2]}`;
      const badge = $('.badge', card); if (badge) badge.textContent = `${numberFrom(badge.textContent)}${d.discountSuffix}`;
      setText('.fast', d.pricing[3], card); setTexts('.plabel', [d.pricing[4], d.pricing[5]], card); setText('.cardcta', d.pricing[6], card);
    });
    setText('#pricing .center .btn', d.pricing[7]); setTexts('#pricing .stat span', d.stats.slice(0, 4));
    const speed = $$('#pricing .stat strong')[3]; if (speed) speed.textContent = d.stats[4];

    const payTitle = $('.pay h2'); if (payTitle) payTitle.innerHTML = `<span>${d.pay[0]}</span><span class="grad">${d.pay[1]}</span>`;
    setText('.pay p', d.pay[2]);
    $$('.paybuttons .btn').forEach((button, index) => {
      const label = $('.pay-label', button);
      if (label) label.textContent = d.pay[3 + index];
      else button.textContent = d.pay[3 + index];
    });
    setText('.pay small', d.pay[5]);
    setText('#quickstart .head h2', d.quick[0]); setHtml('#quickstart .head p', d.quick[1]); setText('#quickstart .aside > p', d.quick[2]);
    const options = $$('#quickstart .option');
    options.forEach((option, index) => { setText('b', d.quick[3 + index * 2], option); setText('span:not(.option-icon)', d.quick[4 + index * 2], option); });
    setTexts('#methodTabs button', d.methodTabs); setText('#copyCode', d.copy);
    const activeMethod = $('#methodTabs .active')?.dataset.method;
    if (activeMethod && activeMethod !== 'api') { setText('#filename', d.integrationGuide); setText('#code', d.methodDescriptions[activeMethod]); }

    const metrics = $('.metrics')?.closest('section');
    if (metrics) { setText('.head h2', d.metrics[0], metrics); setText('.head p', d.metrics[1], metrics); setTexts('.metric .eyebrow', d.metrics[2], metrics); setText('.metric .big', d.metrics[3], metrics); setTexts('.metric p', d.metrics[4], metrics); }
    const trust = $('.trust');
    if (trust) {
      const columns = $$(':scope > div', trust); setText('h3', d.trust[0], columns[0]); setText(':scope > p', d.trust[1], columns[0]); setText('h3', d.trust[2], columns[1]); setText(':scope > p', d.trust[3], columns[1]);
      setTexts('.trustcard b', d.trust[4], trust); setTexts('.trustcard p', d.trust[5], trust);
    }
    const routeBox = $('.routebox');
    if (routeBox) { setText('.routecopy .eyebrow', d.route[0], routeBox); setText('.routecopy h3', d.route[1], routeBox); setText('.routecopy > p', d.route[2], routeBox); setTexts('.spec > *', d.route[3], routeBox); setTexts('#routeTabs button', d.route[4], routeBox); setText('.flowin .node:first-child strong', d.route[5], routeBox); const active = $('#routeTabs .active')?.dataset.route || 'availability'; const state = d.routeStates[active]; setText('#routeTag', state[0]); setText('#routeChoice', state[1]); }

    setText('#live .head h2', d.live[0]); setText('#live .head p', d.live[1]); setText('#providers [data-provider="featured"]', d.live[2]); $('#search')?.setAttribute('placeholder', d.live[3]); setTexts('#live .chartmetrics span', d.live[4]);
    window.__refreshModelList?.();
    $$('#live .chartmetrics strong').slice(0, 3).forEach(el => { el.textContent = `${numberFrom(el.textContent)}${d.discountSuffix}`; });

    setText('#ranking .head h2', d.ranking[0]); setText('#ranking .head p', d.ranking[1]); setTexts('#ranking .rank h3', d.ranking[2]);
    setText('#ranking .rank-usage-head p', d.ranking[3][0]); setText('#ranking .rank-agent > p', d.ranking[3][1]); setText('#ranking .rank-model > p', d.ranking[3][2]);
    window.__refreshDailyRanking?.([...d.ranking[2], ...d.ranking[3], d.ranking[4], d.ranking[5], d.ranking[6]]);
    setText('.buy h2', d.buy[0]); setText('.buy p', d.buy[1]); setText('.buy .btn', d.buy[2]); setText('.buy small', d.buy[3]);

    setText('#faq .head h2', d.faqTitle);
    $$('#faqs .faq').forEach((item, index) => { const copy = d.faqs[index]; if (!copy) return; const plus = item.querySelector('.plus'); const button = item.querySelector('.question'); button.textContent = copy[0]; if (plus) button.append(plus); setText('.answer', copy[1], item); });

    setText('.footbrand p', d.footer[0]); setTexts('.footlinks h4', d.footer[1]); setTexts('.footlinks a', d.footer[2]); setText('.copyright', d.footer[3]); setText('.end h2', d.footer[4]);
    $$('.language-menu button').forEach(button => { const active = button.dataset.lang === lang; button.classList.toggle('active', active); button.setAttribute('aria-checked', String(active)); });
    window.ScrollTrigger?.refresh?.();
    document.dispatchEvent(new CustomEvent('suxin:languagechange', { detail: { language: lang, source } }));
  }

  function createLanguageMenu() {
    const toggle = $('.globe'); if (!toggle) return;
    toggle.id = 'languageToggle'; toggle.setAttribute('type', 'button'); toggle.setAttribute('aria-haspopup', 'menu'); toggle.setAttribute('aria-expanded', 'false');
    const menu = document.createElement('div'); menu.className = 'language-menu'; menu.id = 'languageMenu'; menu.setAttribute('role', 'menu');
    menu.innerHTML = SUPPORTED.map(lang => `<button type="button" role="menuitemradio" aria-checked="false" data-lang="${lang}"><span>${languageNames[lang]}</span><i aria-hidden="true">✓</i></button>`).join('');
    $('.actions')?.append(menu);
    const close = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', event => { event.stopPropagation(); const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
    menu.addEventListener('click', event => { const button = event.target.closest('[data-lang]'); if (!button) return; localStorage.setItem(STORAGE_KEY, button.dataset.lang); applyLanguage(button.dataset.lang, 'manual'); close(); });
    document.addEventListener('click', event => { if (!event.target.closest('.language-menu') && !event.target.closest('#languageToggle')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  function languageForCountry(countryCode) {
    const code = String(countryCode || '').toUpperCase();
    if (code === 'CN') return 'zh-CN';
    if (['TW', 'HK', 'MO'].includes(code)) return 'zh-TW';
    if (code === 'JP') return 'ja';
    if (code === 'RU') return 'ru';
    if (code === 'IN') return 'hi';
    return 'en';
  }

  async function detectLanguageByIp() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);
    try {
      const lookup = async (url, field) => {
        const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error(`IP lookup ${response.status}`);
        const data = await response.json();
        const country = String(data[field] || '').toUpperCase();
        if (!country || data.success === false) throw new Error('IP country unavailable');
        return country;
      };
      let country;
      try {
        country = await lookup('https://api.country.is/', 'country');
      } catch {
        country = await lookup('https://ipwho.is/?fields=success,country_code', 'country_code');
      }
      return { language: languageForCountry(country), country };
    } catch {
      return { language: 'en', country: '' };
    } finally {
      clearTimeout(timeout);
    }
  }

  window.__i18n = {
    apply: language => { localStorage.setItem(STORAGE_KEY, language); applyLanguage(language, 'manual'); },
    clear: () => { localStorage.removeItem(STORAGE_KEY); location.reload(); },
    t: key => dictionaries[currentLanguage]?.[key] ?? dictionaries.en[key] ?? key,
    methodDescription: method => dictionaries[currentLanguage]?.methodDescriptions?.[method] || dictionaries.en.methodDescriptions[method],
    routeState: route => dictionaries[currentLanguage]?.routeStates?.[route] || dictionaries.en.routeStates[route],
    languageForCountry,
    get language() { return currentLanguage; },
    supported: [...SUPPORTED]
  };

  createLanguageMenu();
  const saved = localStorage.getItem(STORAGE_KEY);
  if (SUPPORTED.includes(saved)) {
    applyLanguage(saved, 'saved');
  } else {
    applyLanguage('en', 'fallback');
    detectLanguageByIp().then(({ language, country }) => {
      document.documentElement.dataset.ipCountry = country || 'unavailable';
      if (!localStorage.getItem(STORAGE_KEY)) applyLanguage(language, country ? 'ip' : 'ip-default');
    });
  }
})();
