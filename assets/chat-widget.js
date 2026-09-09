(function () {
  const AI_ENDPOINT = 'https://qingcheng-api.pages.dev/api/chat';
  const CHIPS = {
    zh: ['他黑客松拿了什么成绩？', '他创业做了什么？', '他技术能力到什么程度？', '他在找什么岗位？'],
    en: ['What did he achieve at the hackathon?', 'Tell me about his startup.',
         'How technical is he really?', 'What role is he looking for?'],
  };
  const TXT = {
    zh: {
      greet: '你好，我是本站的 AI 导览。经历、项目和求职方向都可以问——想从哪儿聊起？',
      thinking: '思考中',
      neterr: '网络没连上，稍后再试，或直接邮件：fishboypek@qq.com',
      timeout: '响应有点慢，请稍后再试一次，或直接邮件：fishboypek@qq.com',
      open: '打开 AI 导览', close: '缩小', expand: '全屏', restore: '退出全屏',
      copy: '复制', copied: '已复制', paste: '粘贴', latest: '回到最新消息',
    },
    en: {
      greet: "Hi, I'm the portfolio's AI guide. Ask about the background, projects, or target roles — where shall we start?",
      thinking: 'Thinking',
      neterr: 'Network issue — please retry, or email fishboypek@qq.com',
      timeout: 'Taking too long — please retry, or email fishboypek@qq.com',
      open: 'Open AI guide', close: 'Minimize', expand: 'Full screen', restore: 'Exit full screen',
      copy: 'Copy', copied: 'Copied', paste: 'Paste', latest: 'Jump to latest',
    },
  };

  let busy = false;
  window.aiHasHistory = false;
  const $ = (id) => document.getElementById(id);
  const cur = () => (document.documentElement.lang === 'en' ? 'en' : 'zh');
  const nearBottom = (el) => el.scrollHeight - el.scrollTop - el.clientHeight < 72;

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
    CHIPS[cur()].forEach((question) => {
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
    add('bot', TXT[cur()].greet);
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
        body: JSON.stringify({ question }),
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

  document.addEventListener('DOMContentLoaded', function () {
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
  });
})();
