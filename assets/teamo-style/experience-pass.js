(() => {
  'use strict';
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const quickIcons = ['quick-book.svg', 'quick-download.svg'];
  $$('.option-icon').forEach((slot, index) => { slot.innerHTML = `<img src="assets/teamo-style/${quickIcons[index]}" alt="">`; });

  const codeSamples = {
    Python: ['main.py', `from openai import OpenAI\n\nclient = OpenAI(\n  base_url="https://suxin.ai/v1",\n  api_key="$SUXIN_API_KEY",\n)\n\nresponse = client.chat.completions.create(\n  model="gpt-5.6-sol",\n  messages=[{"role": "user", "content": "Hello"}],\n)`],
    TypeScript: ['index.ts', `import OpenAI from "openai";\n\nconst client = new OpenAI({\n  baseURL: "https://suxin.ai/v1",\n  apiKey: process.env.SUXIN_API_KEY,\n});`],
    curl: ['request.sh', `curl https://suxin.ai/v1/chat/completions \\\n  -H "Authorization: Bearer $SUXIN_API_KEY" \\\n  -H "Content-Type: application/json"`],
    Go: ['main.go', `client := openai.NewClient("$SUXIN_API_KEY")\nclient.BaseURL = "https://suxin.ai/v1"`],
    Java: ['Main.java', `OpenAIClient client = OpenAIOkHttpClient.builder()\n  .baseUrl("https://suxin.ai/v1")\n  .apiKey(System.getenv("SUXIN_API_KEY"))\n  .build();`],
    Rust: ['main.rs', `let client = Client::builder()\n  .with_api_base("https://suxin.ai/v1")\n  .with_api_key(env::var("SUXIN_API_KEY")?)\n  .build()?;`],
    PHP: ['index.php', `$client = OpenAI::factory()\n  ->withApiKey(getenv('SUXIN_API_KEY'))\n  ->withBaseUri('https://suxin.ai/v1')\n  ->make();`],
    Ruby: ['main.rb', `client = OpenAI::Client.new(\n  access_token: ENV["SUXIN_API_KEY"],\n  uri_base: "https://suxin.ai/v1"\n)`]
  };
  const cliSamples = {
    claude: {
      unix: `# Route Claude Code through suxin\nexport ANTHROPIC_BASE_URL="https://suxin.ai"\nexport ANTHROPIC_AUTH_TOKEN="$SUXIN_API_KEY"\nclaude`,
      windows: `# PowerShell\n$env:ANTHROPIC_BASE_URL="https://suxin.ai"\n$env:ANTHROPIC_AUTH_TOKEN=$env:SUXIN_API_KEY\nclaude`
    },
    codex: {
      unix: `# Route Codex CLI through suxin\nexport OPENAI_BASE_URL="https://suxin.ai/v1"\nexport OPENAI_API_KEY="$SUXIN_API_KEY"\ncodex`,
      windows: `# PowerShell\n$env:OPENAI_BASE_URL="https://suxin.ai/v1"\n$env:OPENAI_API_KEY=$env:SUXIN_API_KEY\ncodex`
    },
    kimi: {
      unix: `# Route Kimi Code through suxin\nexport OPENAI_BASE_URL="https://suxin.ai/v1"\nexport OPENAI_API_KEY="$SUXIN_API_KEY"\nkimi`,
      windows: `# PowerShell\n$env:OPENAI_BASE_URL="https://suxin.ai/v1"\n$env:OPENAI_API_KEY=$env:SUXIN_API_KEY\nkimi`
    }
  };

  const localeCopy = {
    'zh-CN': {clientTitle:['把 TeamoRouter 接入','客户端'], clientDesc:'下载 Teamo 客户端，一键完成安装与 TeamoRouter 接入。', download:'下载客户端', tutorial:'逐步接入教程', route:[
      ['上游是否正在经历故障？','容灾切换','首选','DeepSeek V4 Pro','BaiduCloud / 百度云','DeepSeek / 深度求索','已接管','故障','实际成交的通道','未采用的通道'],
      ['有更低价上游渠道？','择优','基准','Claude Opus 5','AWS Bedrock','Anthropic','2折','原价','实际成交的通道','未采用的通道'],
      ['首字延迟超阈值？','换线','默认','Kimi K3','TencentCloud / 腾讯云','Moonshot AI','首字 3.6s','首字 15.2s','实际成交的通道','未采用的通道']
    ]},
    'zh-TW': {clientTitle:['把 TeamoRouter 接入','用戶端'], clientDesc:'下載 Teamo 用戶端，一鍵完成安裝與 TeamoRouter 接入。', download:'下載用戶端', tutorial:'逐步接入教學', route:[
      ['上游是否發生故障？','容災切換','首選','DeepSeek V4 Pro','BaiduCloud / 百度雲','DeepSeek / 深度求索','已接管','故障','實際成交通道','未採用通道'],
      ['有更低價的上游通道？','擇優','基準','Claude Opus 5','AWS Bedrock','Anthropic','2折','原價','實際成交通道','未採用通道'],
      ['首字延遲超過門檻？','換線','預設','Kimi K3','TencentCloud / 騰訊雲','Moonshot AI','首字 3.6s','首字 15.2s','實際成交通道','未採用通道']
    ]},
    en: {clientTitle:['Connect TeamoRouter to','Client'], clientDesc:'Download Teamo Client to install and connect TeamoRouter in one click.', download:'Download client', tutorial:'Step-by-step guide', route:[
      ['Is the upstream having an outage?','Failover','Preferred','DeepSeek V4 Pro','BaiduCloud','DeepSeek','Active','Outage','Selected route','Route not used'],
      ['Is a cheaper upstream available?','Best value','Baseline','Claude Opus 5','AWS Bedrock','Anthropic','0.2×','List price','Selected route','Route not used'],
      ['First-token latency over limit?','Switch line','Default','Kimi K3','TencentCloud','Moonshot AI','First token 3.6s','First token 15.2s','Selected route','Route not used']
    ]},
    ja: {clientTitle:['TeamoRouter を接続','クライアント'], clientDesc:'Teamo クライアントをダウンロードして、インストールと接続を一括完了します。', download:'クライアントをダウンロード', tutorial:'導入ガイド', route:[
      ['上流で障害が発生していますか？','フェイルオーバー','優先','DeepSeek V4 Pro','BaiduCloud','DeepSeek','引継ぎ済み','障害','採用ルート','未採用ルート'],
      ['より安い上流がありますか？','最適化','基準','Claude Opus 5','AWS Bedrock','Anthropic','2割','定価','採用ルート','未採用ルート'],
      ['初回応答がしきい値超過？','回線変更','既定','Kimi K3','TencentCloud','Moonshot AI','初回 3.6s','初回 15.2s','採用ルート','未採用ルート']
    ]},
    ru: {clientTitle:['Подключить TeamoRouter к','клиенту'], clientDesc:'Скачайте Teamo Client, чтобы установить и подключить TeamoRouter одним нажатием.', download:'Скачать клиент', tutorial:'Пошаговая инструкция', route:[
      ['Сбой у основного поставщика?','Резерв','Основной','DeepSeek V4 Pro','BaiduCloud','DeepSeek','Активен','Сбой','Выбранный маршрут','Не используется'],
      ['Есть более дешёвый канал?','Оптимум','База','Claude Opus 5','AWS Bedrock','Anthropic','0,2×','Базовая цена','Выбранный маршрут','Не используется'],
      ['Задержка первого токена высока?','Смена линии','По умолчанию','Kimi K3','TencentCloud','Moonshot AI','Первый токен 3,6s','Первый токен 15,2s','Выбранный маршрут','Не используется']
    ]},
    'hi-IN': {clientTitle:['TeamoRouter को जोड़ें','क्लाइंट'], clientDesc:'एक क्लिक में इंस्टॉल और कनेक्ट करने के लिए Teamo Client डाउनलोड करें।', download:'क्लाइंट डाउनलोड करें', tutorial:'कदम-दर-कदम गाइड', route:[
      ['क्या अपस्ट्रीम में खराबी है?','फ़ेलओवर','प्राथमिक','DeepSeek V4 Pro','BaiduCloud','DeepSeek','सक्रिय','खराबी','चुना गया रूट','उपयोग नहीं हुआ'],
      ['क्या सस्ता अपस्ट्रीम उपलब्ध है?','सर्वोत्तम','बेसलाइन','Claude Opus 5','AWS Bedrock','Anthropic','0.2×','मूल मूल्य','चुना गया रूट','उपयोग नहीं हुआ'],
      ['पहले token की देरी अधिक है?','लाइन बदलें','डिफ़ॉल्ट','Kimi K3','TencentCloud','Moonshot AI','पहला token 3.6s','पहला token 15.2s','चुना गया रूट','उपयोग नहीं हुआ']
    ]}
  };
  localeCopy.hi = localeCopy['hi-IN'];
  let currentLang = document.documentElement.lang || 'zh-CN';
  let activeRoute = 'availability';

  const copyText = async (value, button) => {
    const original = button.textContent;
    try { await navigator.clipboard.writeText(value); button.textContent = window.__i18n?.t('copied') || '已复制'; }
    catch { button.textContent = window.__i18n?.t('copyFailed') || '复制失败'; }
    setTimeout(() => { button.textContent = original; }, 900);
  };
  const setCode = name => {
    const sample = codeSamples[name] || codeSamples.Python;
    $('#filename').textContent = sample[0];
    $('#code').textContent = sample[1];
  };
  setCode('Python');
  $$('#langs button').forEach(button => {
    button.onclick = () => {
      $$('#langs button').forEach(item => item.classList.toggle('active', item === button));
      setCode(button.textContent.trim());
    };
  });

  const showPanel = (method, animate = true) => {
    const next = $(`.qs-panel[data-panel="${method}"]`);
    const previous = $('.qs-panel.active');
    $$('#methodTabs button').forEach(button => {
      const selected = button.dataset.method === method;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
    });
    if (!next || next === previous) return;
    if (method === 'api') setCode($('#langs .active')?.textContent.trim() || 'Python');
    previous?.classList.remove('active');
    next.classList.add('active');
    if (animate && window.gsap && !reduced) gsap.fromTo(next, {autoAlpha:0, y:13}, {autoAlpha:1, y:0, duration:.4, ease:'power3.out', clearProps:'all'});
  };
  $$('#methodTabs button').forEach(button => button.onclick = () => showPanel(button.dataset.method));

  const setCli = () => {
    const tool = $('#cliTools .active')?.dataset.tool || 'claude';
    const os = $('#cliOs .active')?.dataset.os || 'unix';
    $('#cliCode').textContent = cliSamples[tool][os];
  };
  $$('#cliTools button, #cliOs button').forEach(button => button.onclick = () => {
    const group = button.closest('.qs-subtabs, .qs-os');
    $$('button', group).forEach(item => item.classList.toggle('active', item === button));
    setCli();
  });
  setCli();
  $('#copyCode').onclick = () => copyText($('#code').textContent, $('#copyCode'));
  $('#copyCli').onclick = () => copyText($('#cliCode').textContent, $('#copyCli'));

  $$('.metric').forEach(card => {
    const icon = $('.metric-ico', card);
    if (!icon || !window.gsap || reduced) return;
    card.addEventListener('pointerenter', () => gsap.to(icon, {autoAlpha:.95, filter:'blur(0px)', x:0, y:'-68%', scale:1, rotation:0, duration:.55, ease:'power4.out', overwrite:true}));
    card.addEventListener('pointerleave', () => gsap.to(icon, {autoAlpha:0, filter:'blur(7px)', x:26, y:'-32%', scale:.86, rotation:4, duration:.42, ease:'power2.out', overwrite:true}));
  });

  const routeIndex = {availability:0, cost:1, latency:2};
  const restoreRouteTabIcons = () => {
    const icons = ['route-shield.svg', 'route-tag.svg', 'route-gauge.svg'];
    $$('#routeTabs button').forEach((button, index) => {
      const label = button.textContent.trim();
      button.innerHTML = `<img src="assets/teamo-style/${icons[index]}" alt=""><span>${label}</span>`;
    });
  };
  restoreRouteTabIcons();
  const renderRoute = (route, animate = true) => {
    activeRoute = route;
    const lang = localeCopy[currentLang] ? currentLang : 'en';
    const data = localeCopy[lang].route[routeIndex[route] || 0];
    const graph = $('.rdg-canvas-local');
    const update = () => {
      $('.rdg-question').textContent = data[0];
      $('.rdg-choice-live .rdg-tag').textContent = data[1];
      $('.rdg-choice-dim .rdg-tag').textContent = data[2];
      $$('.rdg-model').forEach(el => el.textContent = data[3]);
      $('.rdg-choice-live .rdg-provider').textContent = data[4];
      $('.rdg-choice-dim .rdg-provider').textContent = data[5];
      $('.rdg-choice-live .rdg-result').textContent = data[6];
      $('.rdg-choice-dim .rdg-result').textContent = data[7];
      $('.rdg-choice-live em').textContent = data[8];
      $('.rdg-choice-dim em').textContent = data[9];
      const icon = route === 'cost' ? 'anthropic.svg' : route === 'latency' ? 'route-tencent.svg' : 'route-deepseek.svg';
      $$('.rdg-provider-icon').forEach(el => { el.innerHTML = `<img src="assets/teamo-style/${icon}" alt="">`; });
    };
    $$('#routeTabs button').forEach(button => {
      const selected = button.dataset.route === route;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
    });
    if (!window.gsap || reduced || !animate) { update(); return; }
    gsap.timeline({defaults:{ease:'power2.out'}})
      .to(graph, {autoAlpha:.35, y:5, duration:.16})
      .add(update)
      .fromTo('.rdg-app, .rdg-question', {autoAlpha:0, y:-9}, {autoAlpha:1, y:0, duration:.34, stagger:.06})
      .fromTo('.rdg-choice', {autoAlpha:0, y:14}, {autoAlpha:1, y:0, duration:.42, stagger:.1}, '<.08')
      .fromTo('.rdg-streak', {strokeDashoffset:180}, {strokeDashoffset:-180, duration:.85, ease:'power1.inOut'}, '<')
      .to(graph, {autoAlpha:1, y:0, duration:.12});
  };
  $$('#routeTabs button').forEach(button => button.onclick = () => renderRoute(button.dataset.route));
  renderRoute('availability', false);

  const applyLocale = lang => {
    currentLang = localeCopy[lang] ? lang : 'en';
    const copy = localeCopy[currentLang];
    $$('.qs-client').forEach(panel => {
      const client = panel.dataset.panel === 'codex' ? 'Codex' : 'Claude';
      $('h3', panel).innerHTML = `${copy.clientTitle[0]}<br>${client} ${copy.clientTitle[1]}`;
      $('p', panel).textContent = copy.clientDesc;
      $('.btn', panel).textContent = copy.download;
    });
    $$('.qs-other small').forEach(el => el.textContent = copy.tutorial);
    restoreRouteTabIcons();
    renderRoute(activeRoute, false);
  };
  document.addEventListener('suxin:languagechange', event => applyLocale(event.detail.language));
  applyLocale(currentLang);

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (!reduced) {
      gsap.fromTo('.rdg-canvas-local', {autoAlpha:0, y:30}, {autoAlpha:1, y:0, duration:.8, ease:'power3.out', scrollTrigger:{trigger:'#route-decision-graph', start:'top 82%', once:true}});
      gsap.fromTo('.finale-copy > *', {autoAlpha:0, y:24}, {autoAlpha:1, y:0, duration:.75, stagger:.12, ease:'power3.out', scrollTrigger:{trigger:'#finale', start:'top 78%', once:true}});
    }
  }

  const startTunnel = () => {
    const canvas = $('#finaleTunnel');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const palette = ['#49a9ff','#95dfff','#fff6c4','#ffb25d','#f36d58','#b885ff','#ffffff','#55d0bd'];
    const streaks = Array.from({length:96}, (_, i) => ({
      side: i % 2 ? 1 : -1,
      y: ((i * 37) % 100) / 100,
      color: palette[i % palette.length],
      width: 1 + (i % 5) * .55,
      speed: .35 + (i % 11) * .055,
      phase: (i * .173) % 1
    }));
    let width = 0, height = 0, dpr = 1, raf = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2); width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = time => {
      const cx = width * .5, cy = height * .52;
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * .64);
      bg.addColorStop(0, '#050810'); bg.addColorStop(.25, '#030612'); bg.addColorStop(1, '#02040a');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);
      streaks.forEach((s, i) => {
        const p = reduced ? s.phase : (time * .00008 * s.speed + s.phase) % 1;
        const spread = .14 + p * .86;
        const edgeX = cx + s.side * width * .56 * spread;
        const baseY = height * (.08 + s.y * .84);
        const edgeY = cy + (baseY - cy) * spread;
        const startX = cx + s.side * width * (.025 + p * .08);
        const startY = cy + (baseY - cy) * (.03 + p * .1);
        const grad = ctx.createLinearGradient(startX,startY,edgeX,edgeY);
        grad.addColorStop(0,'rgba(255,255,255,0)'); grad.addColorStop(.42,s.color+'88'); grad.addColorStop(1,s.color);
        ctx.strokeStyle = grad; ctx.lineWidth = s.width * (.5 + p * 1.3); ctx.globalAlpha = .28 + p * .72;
        ctx.beginPath(); ctx.moveTo(startX,startY); ctx.quadraticCurveTo((startX+edgeX)*.5, edgeY+(i%3-1)*8, edgeX,edgeY); ctx.stroke();
      });
      ctx.globalAlpha = 1;
      const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,width*.16); glow.addColorStop(0,'rgba(110,159,255,.22)'); glow.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=glow; ctx.fillRect(0,0,width,height);
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    resize(); draw(performance.now());
    addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(performance.now()); }, {passive:true});
  };
  startTunnel();
})();
