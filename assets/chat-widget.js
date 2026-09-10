(function () {
  const AI_ENDPOINT = 'https://qingcheng-api.pages.dev/api/chat';
  const PAGE_CONTEXT = {
    home: {
      zh: { focus: '整份作品集', brief: '于清程定位为 AI Agent / AI Infra 产品经理；主页汇总教育、小红书实习、三个 AI 项目、中科院研究和环球卡社创业。', title: 'AI 导览', sub: '基于公开资料回答', greet: '你好，我是本站的 AI 导览。经历、项目和求职方向都可以问——想从哪儿聊起？', chips: ['他黑客松拿了什么成绩？', '他创业做了什么？', '他技术能力到什么程度？', '他在找什么岗位？'] },
      en: { focus: 'the full portfolio', brief: 'Qingcheng Yu is positioned as an AI Agent / AI Infrastructure product manager; the portfolio covers education, Xiaohongshu, three AI projects, CASIA research, and Collector Universe.', title: 'AI guide', sub: 'Answers from public materials', greet: "Hi, I'm the portfolio's AI guide. Ask about the background, projects, or target roles — where shall we start?", chips: ['What did he achieve at the hackathon?', 'Tell me about his startup.', 'How technical is he really?', 'What role is he looking for?'] },
    },
    education: {
      zh: { focus: '教育与能力', brief: '西悉尼大学计算机科学本科 with Distinction，GPA 6.636/7.0；Dean\'s Medal 实物照片是奖章本身，AHEGS 是正式毕业证明，其中记录 Dean\'s Medal for Outstanding Scholarship 2026；现就读港科大 MSc AI。', title: 'AI 导览 · 教育', sub: '你正在看教育与能力', greet: '这页讲的是一条不太直的学习路径：中断、创业筹学费、返校完成学位，再到港科大 MSc AI。你想先问哪一段？', chips: ['Dean\'s Medal 是什么成绩？', '为什么中断 ANU 学业？', '他如何挣回学费并返校？', '港科大这一年在补什么？'] },
      en: { focus: 'Education & capability', brief: 'Western Sydney University BSc Computer Science with Distinction, GPA 6.636/7.0. The photo shows the physical Dean\'s Medal; the AHEGS is the formal graduation statement recording the Dean\'s Medal for Outstanding Scholarship 2026. He is now studying HKUST MSc AI.', title: 'AI guide · Education', sub: 'You are viewing Education & capability', greet: 'This page follows a non-linear path: an interrupted degree, a startup to fund the return, a completed bachelor\'s, and now HKUST MSc AI. Which part interests you?', chips: ["What does the Dean's Medal represent?", 'Why was his ANU study interrupted?', 'How did he fund his return?', 'What is he building at HKUST?'] },
    },
    xhs: {
      zh: { focus: '小红书 AI 基础设施产品实习', brief: '2026.05—09，负责值班 Agent 产品侧与评估，推动 Agent 工作台 38 项可验收改进，并基于多产品数据提出统一入口与品牌融合方案；GPU 碎卡治理是辅助模块。', title: 'AI 导览 · 小红书', sub: '你正在看 AI 基础设施实习', greet: '你现在看到的是小红书 AI 基础设施产品实习：工作台改造、值班 Agent 评估和统一入口判断。可以直接追问其中任何一条。', chips: ['38 项工作台改进怎么推进的？', '值班 Agent 里他负责什么？', '为什么要做统一入口？', 'GPU 治理在这段经历里是什么位置？'] },
      en: { focus: 'the Xiaohongshu AI infrastructure internship', brief: 'May–Sep 2026: product and evaluation work for an on-call agent, 38 testable Agent Workspace improvements, and a data-led unified-entry and brand-consolidation proposal; GPU fragmentation governance was a supporting module.', title: 'AI guide · Xiaohongshu', sub: 'You are viewing the AI infrastructure internship', greet: 'This page covers the Xiaohongshu AI infrastructure internship: workspace improvements, on-call agent evaluation, and the unified-entry decision. Ask about any of them.', chips: ['How were the 38 improvements delivered?', 'What did he own for the on-call agent?', 'Why propose a unified entry?', 'Where did GPU governance fit?'] },
    },
    hackathon: {
      zh: { focus: '红书人物志', brief: '从用户已发布故事中识别人物与关系，而不是要求用户手工维护社交图谱；36 小时独立完成产品与全栈 Demo，819 人中入选前 200 Demo Day。', title: 'AI 导览 · 人物志', sub: '你正在看 36 小时黑客松项目', greet: '这页是红书人物志：36 小时里，从已经发布的故事反向长出人物关系。你可以问产品判断、AI 能力或 Demo 实现。', chips: ['人物志最核心的产品判断是什么？', '36 小时里他独立完成了什么？', '两个 AI 能力分别做什么？', '真实能力和 Demo 状态怎么区分？'] },
      en: { focus: 'Rednote Person Graph', brief: 'The product derives people and relationships from stories users already published instead of asking them to maintain a social graph. Product and full-stack demo were built solo in 36 hours; selected among the top 200 from 819 participants.', title: 'AI guide · Person Graph', sub: 'You are viewing the 36-hour hackathon project', greet: 'This is Rednote Person Graph: relationships grown from stories people had already shared, built in 36 hours. Ask about the product decision, AI, or demo implementation.', chips: ['What was the core product insight?', 'What did he deliver solo in 36 hours?', 'What did the two AI features do?', 'What was real versus demo state?'] },
    },
    driving: {
      zh: { focus: 'AI 驾驶行为检测', brief: '独立完成产品、前端、后端、模型与 AI 测试闭环；用 YOLOv8 和规则检测镜头可观测的驾驶行为，形成 10 个页面与 11 个接口，并在 2026 年重构跑通。', title: 'AI 导览 · 驾驶检测', sub: '你正在看独立全栈 AI 项目', greet: '这页讲的是 AI 驾驶行为检测：用 AI coding 串起产品、前端、后端、模型和数据层，并按镜头可观测性选择检测行为。', chips: ['为什么保留这四类驾驶行为？', 'AI coding 的完整过程是什么？', '10 个页面和 11 个接口怎么组成闭环？', '2026 年为什么重新跑通？'] },
      en: { focus: 'AI Driving Behavior Detection', brief: 'An independently delivered product/front-end/back-end/model/AI-testing loop using YOLOv8 and rules for camera-observable driving behaviors, spanning 10 screens and 11 APIs, rebuilt and rerun in 2026.', title: 'AI guide · Driving', sub: 'You are viewing the independent full-stack AI project', greet: 'This page is about AI Driving Behavior Detection: using AI coding across product, front end, back end, model, and data, with behaviors chosen by camera observability.', chips: ['Why keep those four behaviors?', 'What was the AI-coding workflow?', 'How do 10 pages and 11 APIs form the loop?', 'Why rebuild it in 2026?'] },
    },
    interview: {
      zh: { focus: 'AI 面试辅导智能体', brief: '把实时面试拆成提问、追问、评分与复盘闭环；围绕语音延迟预算设计冷热路径与 WebSocket 链路，明确产品职责与团队协作边界。', title: 'AI 导览 · 面试智能体', sub: '你正在看实时语音 Agent', greet: '这页是 AI 面试辅导智能体：把实时面试拆成提问、追问、评分和复盘，并围绕延迟预算设计语音链路。', chips: ['为什么要拆分提问和评分？', '冷热路径分别解决什么？', '实时语音最难的约束是什么？', '他在这个项目中负责什么？'] },
      en: { focus: 'AI Interview Coaching Agent', brief: 'A real-time interview loop split into asking, follow-up, scoring, and review, with hot/cold paths and WebSocket voice flow designed around a latency budget and clear ownership boundaries.', title: 'AI guide · Interview agent', sub: 'You are viewing the real-time voice agent', greet: 'This page covers an AI interview coaching agent: separating asking, follow-up, scoring, and review, with the voice path designed around latency.', chips: ['Why separate asking from scoring?', 'What did the hot and cold paths solve?', 'What constrained the real-time voice flow?', 'What did he own in this project?'] },
    },
    casia: {
      zh: { focus: '中科院自动驾驶场景建模研究', brief: '2026.02—05，参与自动驾驶场景建模：将 BEV + JSON 推到关系三元组原型，通过三轮实验定位候选空间问题并提出把约束前移。', title: 'AI 导览 · 科研', sub: '你正在看自动驾驶场景建模', greet: '这页是中科院自动化所的场景建模研究：从 BEV + JSON 到关系三元组原型，再用三轮实验定位候选空间问题。', chips: ['三轮实验分别发现了什么？', '为什么要把约束前移？', '他在研究中具体完成了什么？', '这段研究如何影响产品判断？'] },
      en: { focus: 'CASIA autonomous-driving scene modelling research', brief: 'Feb–May 2026 research on autonomous-driving scene modelling: moving BEV + JSON into a relation-triple prototype, then using three experiments to isolate candidate-space problems and propose earlier constraints.', title: 'AI guide · Research', sub: 'You are viewing autonomous-driving scene modelling', greet: 'This page covers scene-modelling research at CASIA: from BEV + JSON to relation triples, then three experiments that isolated a candidate-space problem.', chips: ['What did the three experiments reveal?', 'Why move constraints earlier?', 'What exactly did he complete?', 'How did this research shape product judgement?'] },
    },
    hqks: {
      zh: { focus: '环球卡社创业经历', brief: '两年全职经营球星卡业务，将内容、社群与交易服务做成生意；发布 214 篇内容，降低非标商品理解门槛，并用收入筹回返校学费。', title: 'AI 导览 · 创业', sub: '你正在看两年全职经营', greet: '这页是环球卡社：两年全职经营，把内容、社群和交易服务做成一门生意，也用它挣回了返校学费。', chips: ['环球卡社具体做什么？', '214 篇内容带来了什么？', '他如何降低非标商品理解门槛？', '创业怎样支撑他重返大学？'] },
      en: { focus: 'the Collector Universe startup', brief: 'Two years running a sports-card business full-time, combining content, community, and transaction services; 214 published pieces lowered the learning barrier for non-standard products, and the income funded his return to university.', title: 'AI guide · Startup', sub: 'You are viewing two years of full-time operation', greet: 'This page is Collector Universe: two years turning content, community, and transaction services into a business that also funded his return to university.', chips: ['What did Collector Universe do?', 'What did 214 articles achieve?', 'How did he explain a non-standard product?', 'How did the startup fund his return?'] },
    },
  };
  const TXT = {
    zh: {
      thinking: '思考中',
      neterr: '网络没连上，稍后再试，或直接邮件：fishboypek@qq.com',
      timeout: '响应有点慢，请稍后再试一次，或直接邮件：fishboypek@qq.com',
      open: '打开 AI 导览', close: '缩小', expand: '全屏', restore: '退出全屏',
      copy: '复制', copied: '已复制', paste: '粘贴', latest: '回到最新消息',
      launcher: '问问 AI 导览', placeholder: '问点关于我的任何事…', send: '发送',
      note: '回答由大模型生成，可能有疏漏。要紧的事请直接邮件：fishboypek@qq.com',
    },
    en: {
      thinking: 'Thinking',
      neterr: 'Network issue — please retry, or email fishboypek@qq.com',
      timeout: 'Taking too long — please retry, or email fishboypek@qq.com',
      open: 'Open AI guide', close: 'Minimize', expand: 'Full screen', restore: 'Exit full screen',
      copy: 'Copy', copied: 'Copied', paste: 'Paste', latest: 'Jump to latest',
      launcher: 'Ask the AI guide', placeholder: 'Ask me anything…', send: 'Send',
      note: 'AI-generated answers may contain errors. For anything important: fishboypek@qq.com',
    },
  };

  let busy = false;
  window.aiHasHistory = false;
  const $ = (id) => document.getElementById(id);
  const cur = () => (document.documentElement.lang === 'en' ? 'en' : 'zh');
  const pageKey = () => {
    const path = window.location.pathname;
    if (path.includes('/projects/education/')) return 'education';
    if (path.includes('/projects/xhs/')) return 'xhs';
    if (path.includes('/projects/hackathon/')) return 'hackathon';
    if (path.includes('/projects/ai-driving/')) return 'driving';
    if (path.includes('/projects/ai-interview/')) return 'interview';
    if (path.includes('/projects/casia/')) return 'casia';
    if (path.includes('/projects/hqks/')) return 'hqks';
    return 'home';
  };
  const context = () => PAGE_CONTEXT[pageKey()][cur()];
  const nearBottom = (el) => el.scrollHeight - el.scrollTop - el.clientHeight < 72;

  function mountWidget() {
    if ($('ai-float')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="ai-float" id="ai-float">
        <section class="ai-panel" id="ai-panel" role="dialog" aria-labelledby="ai-title" aria-hidden="true" aria-modal="false">
          <header class="ai-head">
            <span class="ai-dot" aria-hidden="true"></span>
            <div class="ai-head-copy"><h2 id="ai-title"></h2><p id="ai-sub"></p></div>
            <div class="ai-head-actions">
              <button class="ai-icon-btn" id="ai-expand" type="button" onclick="aiToggleFullscreen()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg></button>
              <button class="ai-icon-btn" id="ai-close" type="button" onclick="aiToggle(false)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14"/></svg></button>
            </div>
          </header>
          <div class="ai-body-wrap">
            <div class="ai-body" id="ai-body" aria-live="polite" aria-atomic="false"></div>
            <button class="ai-to-bottom" id="ai-to-bottom" type="button" onclick="aiScrollLatest()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
          </div>
          <footer class="ai-foot">
            <div class="ai-input-row">
              <button class="ai-icon-btn" id="ai-paste" type="button" onclick="aiPaste()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M9 5h6M9 3h6v4H9z"/><path d="M7 5H5v16h14V5h-2"/></svg></button>
              <textarea id="ai-input" rows="1" aria-label="提问输入框"></textarea>
              <button id="ai-send" type="button" onclick="aiSend()"></button>
            </div>
            <p class="ai-note" id="ai-note"></p>
          </footer>
        </section>
        <button class="ai-launcher" id="ai-launcher" type="button" onclick="aiToggle(true)" aria-expanded="false" aria-controls="ai-panel">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M24 7v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="5" r="2.5" fill="#6FBE86"/>
            <rect x="9" y="12" width="30" height="25" rx="9" fill="#F2F0EB" stroke="currentColor" stroke-width="1.5"/>
            <circle class="bot-eye" cx="19" cy="24" r="2.2" fill="currentColor"/><circle class="bot-eye" cx="29" cy="24" r="2.2" fill="currentColor"/>
            <path d="M18.5 30c2.8 2.3 8.2 2.3 11 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 21H6v7h3M39 21h3v7h-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="ai-launcher-status" aria-hidden="true"></span>
        </button>
        <span class="ai-launcher-label" id="ai-launcher-label"></span>
      </div>`);
  }

  function updateScrollButton() {
    const el = $('ai-body');
    const button = $('ai-to-bottom');
    if (!el || !button) return;
    button.classList.toggle('is-visible', el.scrollHeight > el.clientHeight + 24 && !nearBottom(el));
  }

  function scrollLatest(behavior = 'smooth') {
    const el = $('ai-body');
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
    window.setTimeout(updateScrollButton, behavior === 'smooth' ? 240 : 0);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  }

  function addCopyAction(message) {
    if (message.querySelector('.ai-copy')) return;
    const actions = document.createElement('div');
    actions.className = 'ai-msg-actions';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ai-copy';
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg><span></span>';
    const label = button.querySelector('span');
    label.textContent = TXT[cur()].copy;
    button.setAttribute('aria-label', TXT[cur()].copy);
    button.addEventListener('click', async () => {
      try {
        await copyText(message.querySelector('.ai-bubble').textContent);
        label.textContent = TXT[cur()].copied;
        window.setTimeout(() => { label.textContent = TXT[cur()].copy; }, 1400);
      } catch (error) {
        label.textContent = TXT[cur()].copy;
      }
    });
    actions.appendChild(button);
    message.appendChild(actions);
  }

  function updateChatLabels() {
    const text = TXT[cur()];
    const page = context();
    const full = $('ai-panel')?.classList.contains('is-fullscreen');
    const labels = [
      [$('ai-launcher'), text.open],
      [$('ai-close'), text.close],
      [$('ai-expand'), full ? text.restore : text.expand],
      [$('ai-paste'), text.paste],
      [$('ai-to-bottom'), text.latest],
    ];
    labels.forEach(([element, label]) => {
      if (!element) return;
      element.setAttribute('aria-label', label);
      element.setAttribute('title', label);
    });
    document.querySelectorAll('.ai-copy span').forEach((element) => {
      element.textContent = text.copy;
    });
    $('ai-title').textContent = page.title;
    $('ai-sub').textContent = page.sub;
    $('ai-launcher-label').textContent = text.launcher;
    $('ai-input').placeholder = text.placeholder;
    $('ai-send').textContent = text.send;
    $('ai-note').textContent = text.note;
  }

  function add(who, text, copyable = false) {
    const el = $('ai-body');
    const stick = nearBottom(el);
    const message = document.createElement('div');
    message.className = 'ai-msg ' + who;
    const bubble = document.createElement('span');
    bubble.className = 'ai-bubble';
    bubble.textContent = text;
    message.appendChild(bubble);
    if (copyable) addCopyAction(message);
    el.appendChild(message);
    requestAnimationFrame(() => {
      if (stick) scrollLatest('auto');
      else updateScrollButton();
    });
    return message;
  }

  function chips() {
    const wrap = document.createElement('div');
    wrap.className = 'ai-chips';
    context().chips.forEach((question) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ai-chip';
      button.textContent = question;
      button.addEventListener('click', () => {
        if (busy) return;
        $('ai-input').value = question;
        window.aiSend();
      });
      wrap.appendChild(button);
    });
    $('ai-body').appendChild(wrap);
  }

  window.aiSeed = function () {
    if (window.aiHasHistory || busy) return;
    $('ai-body').innerHTML = '';
    add('bot', context().greet);
    chips();
  };

  window.aiToggle = function (open) {
    const root = $('ai-float');
    const shouldOpen = typeof open === 'boolean' ? open : !root.classList.contains('is-open');
    root.classList.toggle('is-open', shouldOpen);
    $('ai-panel').setAttribute('aria-hidden', String(!shouldOpen));
    $('ai-launcher').setAttribute('aria-expanded', String(shouldOpen));
    if (!shouldOpen) {
      $('ai-panel').classList.remove('is-fullscreen');
      $('ai-panel').setAttribute('aria-modal', 'false');
      document.body.classList.remove('ai-chat-full');
      updateChatLabels();
      $('ai-launcher').focus();
      return;
    }
    window.setTimeout(() => {
      scrollLatest('auto');
      $('ai-input').focus({ preventScroll: true });
    }, 220);
  };

  window.aiToggleFullscreen = function () {
    const panel = $('ai-panel');
    const full = !panel.classList.contains('is-fullscreen');
    panel.classList.toggle('is-fullscreen', full);
    panel.setAttribute('aria-modal', String(full));
    document.body.classList.toggle('ai-chat-full', full);
    updateChatLabels();
    window.setTimeout(() => scrollLatest('auto'), 30);
  };

  window.aiScrollLatest = function () {
    scrollLatest('smooth');
  };

  window.aiPaste = async function () {
    const box = $('ai-input');
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        const start = box.selectionStart ?? box.value.length;
        const end = box.selectionEnd ?? box.value.length;
        box.value = box.value.slice(0, start) + text + box.value.slice(end);
        box.dispatchEvent(new Event('input'));
        box.selectionStart = box.selectionEnd = start + text.length;
      }
    } catch (error) {
      // Clipboard read permission is browser-controlled; keep the composer focused if denied.
    }
    box.focus();
  };

  window.aiSetLanguage = updateChatLabels;

  window.aiSend = async function () {
    if (busy) return;
    const box = $('ai-input');
    const question = box.value.trim();
    if (!question) return;
    const page = context();
    const apiQuestion = pageKey() === 'home' ? question : (cur() === 'zh'
      ? `访客当前正在浏览作品集的「${page.focus}」页面。页面公开摘要：${page.brief} 请优先结合这段经历回答；如果问题中出现“这个项目”“这段经历”或“这张图”，均指当前页面。访客问题：${question}`
      : `The visitor is viewing the portfolio page about ${page.focus}. Public page summary: ${page.brief} Answer primarily in that context; “this project”, “this experience”, or “this image” refers to the current page. Visitor question: ${question}`);
    document.querySelector('.ai-chips')?.remove();
    box.value = '';
    box.style.height = 'auto';
    window.aiHasHistory = true;
    add('me', question);
    busy = true;
    $('ai-send').disabled = true;
    const response = add('bot', '');
    response.querySelector('.ai-bubble').innerHTML =
      TXT[cur()].thinking + ' <span class="ai-typing"><span>·</span><span>·</span><span>·</span></span>';

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort('timeout'), 28000);
    try {
      const request = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: apiQuestion }),
        signal: controller.signal,
      });
      const contentType = request.headers.get('Content-Type') || '';
      if (!request.ok || contentType.includes('application/json')) {
        const data = await request.json().catch(() => ({}));
        response.className = 'ai-msg err';
        response.querySelector('.ai-bubble').textContent = data.error || TXT[cur()].neterr;
      } else {
        const reader = request.body.getReader();
        const decoder = new TextDecoder();
        let answer = '';
        const el = $('ai-body');
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          const stick = nearBottom(el);
          response.querySelector('.ai-bubble').textContent = answer;
          if (stick) scrollLatest('auto');
          else updateScrollButton();
        }
        if (!answer.trim()) {
          response.className = 'ai-msg err';
          response.querySelector('.ai-bubble').textContent = TXT[cur()].neterr;
        }
      }
    } catch (error) {
      response.className = 'ai-msg err';
      response.querySelector('.ai-bubble').textContent =
        (error && (error === 'timeout' || error.name === 'AbortError')) ? TXT[cur()].timeout : TXT[cur()].neterr;
    } finally {
      window.clearTimeout(timer);
      busy = false;
      $('ai-send').disabled = false;
      addCopyAction(response);
      updateScrollButton();
    }
  };

  function init() {
    mountWidget();
    const box = $('ai-input');
    box.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 80) + 'px';
    });
    box.addEventListener('keydown', function (event) {
      if (event.isComposing || event.keyCode === 229) return;
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        window.aiSend();
      }
    });
    $('ai-body').addEventListener('scroll', updateScrollButton, { passive: true });
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !$('ai-float').classList.contains('is-open')) return;
      if ($('ai-panel').classList.contains('is-fullscreen')) window.aiToggleFullscreen();
      else window.aiToggle(false);
    });
    window.aiSeed();
    updateChatLabels();
    new MutationObserver(() => {
      if (!window.aiHasHistory && !busy) window.aiSeed();
      updateChatLabels();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
