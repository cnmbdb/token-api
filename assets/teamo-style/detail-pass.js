(() => {
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  const navItems = [
    ['首页', '#top'], ['实时价格', '#pricing'], ['接入 Codex', '#quickstart'],
    ['API 文档', '/rankings'], ['控制台', '/dashboard/overview'], ['邀请返现', '/dashboard/overview?tab=aff']
  ];
  const links = $('#links');
  if (links) links.innerHTML = navItems.map(([label, href], i) =>
    `<a href="${href}">${label}${i === 5 ? '<img class="nav-gift" src="assets/teamo-style/gift-badge.webp" alt="">' : ''}</a>`
  ).join('');
  $$('#links a').forEach(a => a.addEventListener('click', () => $('#nav')?.classList.remove('open')));

  const globe = $('.globe');
  if (globe) {
    globe.setAttribute('aria-label', '语言');
    globe.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>';
  }
  const hamburger = $('#hamb');
  if (hamburger) hamburger.innerHTML = '<svg class="ic-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"></path></svg><svg class="ic-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>';

  $$('.brand img, .core img').forEach(img => {
    img.src = 'assets/teamo-style/logo-suxin.png';
    img.alt = 'suxin';
    const size = innerWidth <= 900 ? 22 : 25;
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
    img.style.objectFit = 'contain';
  });
  const footerLogo = $('.footbrand .brand img');
  if (footerLogo) {
    footerLogo.src = 'assets/teamo-style/logo-suxin-white.png';
    footerLogo.style.width = '27px';
    footerLogo.style.height = '27px';
  }

  const heroTitle = $('.hero h1');
  const defaultTitleFrames = [
    [{ text: 'Agent 接入', grad: 'Agent' }, { text: '大模型的统一入口' }],
    [{ text: '专用于生产环境的', grad: '生产环境' }, { text: '统一大模型网关' }]
  ];
  function chars(text, gradWord = '') {
    const start = gradWord ? text.indexOf(gradWord) : -1;
    return [...text].map((char, i) => {
      const inGrad = start >= 0 && i >= start && i < start + [...gradWord].length;
      const cls = `hero-title-char${char === ' ' ? ' space' : ''}${inGrad ? ' grad' : ''}`;
      return `<span class="${cls}">${char === ' ' ? '&nbsp;' : char}</span>`;
    }).join('');
  }
  function renderHeroTitle(titleFrames) {
    if (!heroTitle) return;
    window.__heroTitleMedia?.revert?.();
    window.__heroTitleTimeline?.kill?.();
    heroTitle.className = 'hero-title-gsap';
    heroTitle.innerHTML = titleFrames.map((frame, frameIndex) =>
      `<span class="hero-title-frame" data-frame="${frameIndex}">${frame.map(line => `<span class="hero-title-line">${chars(line.text, line.grad)}</span>`).join('')}</span>`
    ).join('');
    const frames = $$('.hero-title-frame', heroTitle);
    const setAccessibleTitle = index => heroTitle.setAttribute('aria-label', titleFrames[index].map(line => line.text).join(' '));
    setAccessibleTitle(0);

    if (window.gsap) {
      heroTitle.dataset.gsap = window.gsap.version || 'loaded';
      const titleMedia = gsap.matchMedia();
      titleMedia.add({ reduceMotion: '(prefers-reduced-motion: reduce)', motionOK: '(prefers-reduced-motion: no-preference)' }, context => {
        const { reduceMotion } = context.conditions;
        gsap.set(frames, { autoAlpha: 0 });
        gsap.set(frames[0], { autoAlpha: 1 });
        if (reduceMotion) return;

        const timeline = gsap.timeline({ repeat: -1, defaults: { overwrite: 'auto' }, onStart: () => heroTitle.dataset.gsapState = 'running' });
        frames.forEach((frame, index) => {
          const letters = $$('.hero-title-char', frame);
          timeline
            .set(frame, { autoAlpha: 1 })
            .call(() => setAccessibleTitle(index))
            .fromTo(letters,
              { autoAlpha: 0, y: 22, rotationX: -62, transformOrigin: '50% 100%' },
              { autoAlpha: 1, y: 0, rotationX: 0, duration: .68, stagger: { each: .024, from: 'start' }, ease: 'power3.out', immediateRender: false }
            )
            .to({}, { duration: 2.45 })
            .to(letters,
              { autoAlpha: 0, y: -17, rotationX: 48, duration: .38, stagger: { each: .014, from: 'end' }, ease: 'power2.in' }
            )
            .set(frame, { autoAlpha: 0 });
        });
        window.__heroTitleTimeline = timeline;
        return () => { timeline.kill(); delete window.__heroTitleTimeline; };
      });
      window.__heroTitleMedia = titleMedia;
    } else {
      heroTitle.dataset.gsap = 'fallback';
      frames.forEach((frame, index) => frame.style.visibility = index ? 'hidden' : 'visible');
    }
  }
  renderHeroTitle(defaultTitleFrames);
  window.__setHeroTitleFrames = renderHeroTitle;

  const heroCtas = $$('.hero-buttons .btn');
  if (heroCtas[0]) {
    heroCtas[0].classList.add('hero-key-btn');
    heroCtas[0].innerHTML = '<span class="hero-key-knob" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></svg></span><span class="hero-cta-label">获取 API Key</span>';
  }
  if (heroCtas[1]) {
    heroCtas[1].classList.add('hero-client-btn');
    heroCtas[1].innerHTML = '<span class="hero-cta-label">下载客户端</span>';
    heroCtas[1].href = '#quickstart';
  }

  const routes = $('.routes');
  if (routes) routes.innerHTML = `
    <canvas class="route-canvas-v2" aria-hidden="true"></canvas>
    <span class="route-note left">全球模型直连</span><span class="route-note right">AGENT 客户端</span>
    <div class="route-node model-1" data-side="left"><img src="assets/teamo-style/anthropic.svg" alt=""><span>Claude</span></div>
    <div class="route-node model-2" data-side="left"><img src="assets/teamo-style/openai.svg" alt=""><span>GPT</span></div>
    <div class="route-node model-3" data-side="left"><img src="assets/teamo-style/google.svg" alt=""><span>Gemini</span></div>
    <div class="route-hub"><span class="route-hub-ring"><img src="assets/teamo-style/logo-suxin.png" alt="suxin" style="width:31px;height:31px;object-fit:contain"></span><b>智能调度</b></div>
    <div class="route-node client-1" data-side="right"><img src="assets/teamo-style/anthropic.svg" alt=""><span>Claude Code</span></div>
    <div class="route-node client-2" data-side="right"><img src="assets/teamo-style/openai.svg" alt=""><span>Codex</span></div>
    <div class="route-node client-3" data-side="right"><img src="assets/teamo-style/cc-switch.webp" alt=""><span>CC Switch</span></div>
    <div class="route-node client-4" data-side="right"><img src="assets/teamo-style/openclaw.svg" alt=""><span>OpenClaw</span></div>
    <span class="client-count">已支持 10+ Agent / 客户端</span>`;

  const proofColors = ['#fd924f','#818cf8','#2dd4bf','#fbbf24','#60a5fa','#34d399'];
  $$('.proofgrid > div').forEach((el, i) => el.insertAdjacentHTML('afterbegin', `<i class="proof-dot" style="--dot:${proofColors[i]}"></i>`));
  const social = $('.social');
  if (social) social.innerHTML = `<span class="trust-avatars"><img src="assets/teamo-style/trust-ama.png" alt="AMA"><img src="assets/teamo-style/trust-teamo.png" alt="suxin"><span class="trust-bolt" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4.5 13.5h6L11 22l8.5-11.5h-6z"></path></svg></span></span><span>已有 <strong>6000+</strong> 开发团队与独立开发者在用</span>`;

  const setText = (selector, value) => { const el = $(selector); if (el) el.innerHTML = value; };
  setText('.pay p', '你的账户统一按美元计费，按模型自动计价，无月费、无订阅。');
  setText('.pay small', '美元计费 · 无最低消费 · 随时充值 · 支持支付宝');
  setText('#quickstart .head p', '100% 协议兼容，只改一行 Base URL，即可接入生产环境；<br>使用 suxin，无需复杂配置即可接入 Codex / Claude Code。');
  setText('.metrics + *', '');
  const sectionHeads = $$('.section .head h2');
  const productionHead = sectionHeads.find(h => h.textContent.includes('生产环境'));
  if (productionHead) productionHead.nextElementSibling.innerHTML = '三项核心指标均来自生产环境实测，与首页实时数据同源可查证。';
  const metricPs = $$('.metric p');
  if (metricPs[0]) metricPs[0].textContent = '2000+ 供应商实时竞价与质量监控，让每次请求打出极致折扣——全模型实时竞价数据首页透明可见。';
  if (metricPs[1]) metricPs[1].textContent = '请求延迟、推理速度打平官方——来自全网生产流量实测，慢速渠道分钟级封禁，实时数据首页可见。';
  if (metricPs[2]) metricPs[2].textContent = '独家 Harness Routing 技术，生产级 SLA + Cache 率保障：多通道故障自动切换、7×24 服务不中断。';
  const trustCols = $$('.trust > div');
  if (trustCols[0]) trustCols[0].querySelector(':scope > p').textContent = '可低成本稳定运行 Agent Harness 任务，模型表现与成本控制稳定、可审计。';
  if (trustCols[1]) trustCols[1].querySelector(':scope > p').textContent = '一个账户，一张账单。上游供应商由我们逐家验。';
  setText('.routecopy > p', '严格保障效率，通过多级容灾和效率敏感的路由策略优先保障服务质量，响应稳稳接住、始终丝滑，高峰期和官方宕机时可能折扣变少，但不会超过官方原价。');
  setText('#live .head p', '折扣随上游成本按小时浮动，数据实时更新；每次调用按请求时的实时折扣结算。');
  setText('#ranking .head p', '每日零点刷新');
  const rankPs = $$('.rank > p');
  if (rankPs[1]) rankPs[1].textContent = '按客户端周调用量排名 · 趋势为周环比';
  if (rankPs[2]) rankPs[2].textContent = '按模型周调用量排名 · 趋势为周环比';
  setText('.buy p', '现在充值，让每一次调用都跑在更低的成本上。美元余额持续保留在你的账户中，随用随扣。');
  $('.buy .btn')?.insertAdjacentHTML('afterend', '<small>美元计费 · 无最低消费 · 随时充值 · 支持支付宝</small>');
  setText('.footbrand p', '为企业和专业人士打造的 Agentic LLM 统一网关');

  const faqs = $('#faqs');
  if (faqs && $$('.faq', faqs).length < 5) {
    faqs.insertAdjacentHTML('beforeend', '<article class="faq"><button class="question">额度会过期吗？<span class="plus">＋</span></button><div class="answer">不会。想充就充，随时使用，无需订阅。</div></article>');
    const q = faqs.lastElementChild.querySelector('.question'); q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
  }
  const faqCopy = [
    ['什么是 LLM 路由？','一个夹在你的工具和模型供应商之间的统一 API。你只调用一个地址、只用一把 Key，路由层把每次请求分发给 Claude、GPT、Gemini 或其他模型，计量用量，最后给你一张账单。'],
    ['suxin 兼容 OpenAI 协议吗？','两种协议都兼容。OpenAI 兼容端点只需改 Base URL，即可配合官方 OpenAI SDK 和 Codex 使用；Claude Code 走 Anthropic 兼容端点，配置两个环境变量即可。'],
    ['价格为什么能低至 1 折？','靠规模。我们与已验证的供应商签订企业级用量承诺，把差价直接让给你。折扣逐模型不同，并随上游成本浮动——上方价格表是实时的。'],
    ['我的数据会被拿去训练模型吗？','不会。Prompt 与返回结果仅用于路由、计量、计费、反滥用与技术支持，绝不用于训练，也绝不出售。'],
    ['额度会过期吗？','不会。想充就充，随时使用，无需订阅。']
  ];
  $$('.faq', faqs).forEach((item,i)=>{ if(!faqCopy[i]) return; item.querySelector('.question').innerHTML=`${faqCopy[i][0]}<span class="plus">＋</span>`; item.querySelector('.answer').textContent=faqCopy[i][1]; });

  function startRouteCanvas() {
    const canvas = $('.route-canvas-v2'); if (!canvas) return;
    const ctx = canvas.getContext('2d'); let w = 0, h = 0, dpr = 1, raf = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resize = () => { const r = canvas.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2); w = r.width; h = r.height; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const point = el => { const a = el.getBoundingClientRect(), b = canvas.getBoundingClientRect(); return { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2 }; };
    const bezierPoint = (a, b, t) => { const c1 = {x:a.x+(b.x-a.x)*.46,y:a.y}, c2={x:a.x+(b.x-a.x)*.54,y:b.y}; const u=1-t; return {x:u*u*u*a.x+3*u*u*t*c1.x+3*u*t*t*c2.x+t*t*t*b.x,y:u*u*u*a.y+3*u*u*t*c1.y+3*u*t*t*c2.y+t*t*t*b.y}; };
    const curve = (a,b) => { const dx=(b.x-a.x)*.46; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.bezierCurveTo(a.x+dx,a.y,b.x-dx,b.y,b.x,b.y); ctx.stroke(); };
    const draw = now => {
      ctx.clearRect(0,0,w,h); const hub=point($('.route-hub-ring')); const left=$$('.route-node[data-side="left"]').map(point), right=$$('.route-node[data-side="right"]').map(point);
      const paths=[...left.map((p,i)=>[p,hub,['rgba(250,139,81,.36)','rgba(116,134,238,.34)','rgba(73,143,245,.34)'][i]]),...right.map((p,i)=>[hub,p,['rgba(222,92,53,.34)','rgba(102,103,245,.38)','rgba(242,164,47,.34)','rgba(239,94,67,.28)'][i]])];
      ctx.lineWidth=1.15; paths.forEach(([a,b,color])=>{ctx.strokeStyle=color;curve(a,b)});
      const all=[...left.map((p,i)=>[p,hub,i*.17]),...right.map((p,i)=>[hub,p,.45+i*.11])];
      all.forEach(([a,b,offset],i)=>{ const t=reduced?.55:((now/2600+offset)%1); const p=bezierPoint(a,b,t); const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,7); g.addColorStop(0,i<3?'rgba(218,78,39,.95)':'rgba(62,105,215,.95)'); g.addColorStop(1,'rgba(255,255,255,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,7,0,Math.PI*2); ctx.fill(); ctx.fillStyle=i<3?'#d54f28':'#4971da'; ctx.fillRect(p.x-1.4,p.y-1.4,2.8,2.8); });
      if(!reduced) raf=requestAnimationFrame(draw);
    };
    resize(); draw(performance.now()); addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(performance.now()); }, {passive:true});
  }
  startRouteCanvas();

  function startSectionReveals() {
    const root = document.documentElement;
    if (!window.gsap || !window.ScrollTrigger) {
      root.dataset.scrollTrigger = 'fallback';
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    root.dataset.scrollTrigger = ScrollTrigger.version || 'loaded';

    const revealGroups = [
      { section: '.proof', items: ['.proofgrid > div', '.social'] },
      { section: '#pricing', items: ['.head > *', '.price', '.center', '.stat'] },
      { section: '.pay', items: ['.pay > div > *'] },
      { section: '#quickstart', items: ['.head > *', '.aside > *', '.quick > div:last-child'] },
      { section: '.metrics', host: 'section', items: ['.head > *', '.metric'] },
      { section: '.trust', host: 'section', items: ['.trust > div > h3', '.trust > div > p', '.trustcard'] },
      { section: '.routebox', host: 'section', items: ['.routecopy > *', '.routedemo'] },
      { section: '#live', items: ['.head > *', '.tools > *', '.live > *'] },
      { section: '#ranking', items: ['.head > *', '.rank'] },
      { section: '.buy', items: ['.buy .shell > *'] },
      { section: '#faq', items: ['.head > *', '.faq'] },
      { section: '.footer', items: ['.footbrand', '.footlinks > div', '.end > div'] }
    ];

    const revealMedia = gsap.matchMedia();
    revealMedia.add({
      reduceMotion: '(prefers-reduced-motion: reduce)',
      motionOK: '(prefers-reduced-motion: no-preference)',
      isDesktop: '(min-width: 901px)',
      isMobile: '(max-width: 900px)'
    }, context => {
      const { reduceMotion, isMobile } = context.conditions;

      revealGroups.forEach((group, index) => {
        const anchor = $(group.section);
        if (!anchor) return;
        const section = group.host ? anchor.closest(group.host) : anchor;
        const items = [...new Set(group.items.flatMap(selector => $$(selector, section)))];
        if (!items.length) return;

        section.dataset.scrollReveal = `section-${index + 1}`;
        section.dataset.revealState = reduceMotion ? 'reduced-motion' : 'ready';

        if (reduceMotion) {
          gsap.set(items, { clearProps: 'opacity,visibility,transform' });
          return;
        }

        const prepare = () => items.forEach(item => { item.style.willChange = 'transform, opacity'; });
        const release = () => items.forEach(item => { item.style.removeProperty('will-change'); });
        const lead = items.slice(0, Math.min(2, items.length));
        const rest = items.slice(lead.length);
        const shift = isMobile ? 25 : 38;

        const timeline = gsap.timeline({
          defaults: { duration: isMobile ? .56 : .68, ease: 'power3.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
            onEnter: () => { prepare(); section.dataset.revealState = 'entered'; },
            onLeave: () => { release(); section.dataset.revealState = 'left'; },
            onEnterBack: () => { prepare(); section.dataset.revealState = 'entered-back'; },
            onLeaveBack: () => { release(); section.dataset.revealState = 'reset'; }
          }
        });

        timeline.fromTo(lead,
          { autoAlpha: 0, y: shift },
          { autoAlpha: 1, y: 0, stagger: .09, immediateRender: true }
        );
        if (rest.length) {
          timeline.fromTo(rest,
            { autoAlpha: 0, y: shift * .8, scale: .988 },
            { autoAlpha: 1, y: 0, scale: 1, stagger: { each: isMobile ? .055 : .075, from: 'start' }, immediateRender: true },
            '-=.34'
          );
        }
        timeline.eventCallback('onComplete', release);
        timeline.eventCallback('onReverseComplete', release);
      });

      return () => {
        $$('[data-scroll-reveal]').forEach(section => {
          delete section.dataset.scrollReveal;
          delete section.dataset.revealState;
        });
      };
    });

    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
    window.__sectionRevealMedia = revealMedia;
  }
  startSectionReveals();
})();
