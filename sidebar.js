(function() {
  // ── CSS ──
  var css = `
  .fr-menu-btn {
    position: fixed; top: 16px; left: 16px; z-index: 9000;
    width: 42px; height: 42px; border-radius: 50%;
    background: rgba(255,255,255,0.2); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1.5px solid rgba(255,255,255,0.35);
    color: #fff; font-size: 1.05rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 14px rgba(0,40,100,0.18);
    transition: transform 0.2s, background 0.2s;
  }
  .fr-menu-btn:hover { transform: scale(1.1); background: rgba(255,255,255,0.32); }
  .fr-sidebar-overlay {
    position: fixed; inset: 0; background: rgba(0,20,60,0.25);
    z-index: 9100; opacity: 0; pointer-events: none; transition: opacity 0.26s ease;
  }
  .fr-sidebar-overlay.open { opacity: 1; pointer-events: auto; }
  .fr-sidebar {
    position: fixed; top: 0; left: 0; bottom: 0; width: min(260px, 80vw);
    background: rgba(255,255,255,0.12); backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-right: 1px solid rgba(255,255,255,0.22);
    box-shadow: 4px 0 32px rgba(0,40,100,0.2);
    z-index: 9200; display: flex; flex-direction: column;
    transform: translateX(-100%);
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
    font-family: 'Noto Serif SC', serif; overflow-y: auto;
  }
  .fr-sidebar.open { transform: translateX(0); }
  .fr-sidebar-header { display: flex; align-items: center; padding: 18px 18px 14px; border-bottom: 1px solid rgba(255,255,255,0.18); }
  .fr-sidebar-title { font-size: 0.95rem; font-weight: 600; color: rgba(255,255,255,0.92); letter-spacing: 0.1em; }
  .fr-section-label { padding: 8px 12px 4px; font-size: 0.68rem; letter-spacing: 0.2em; color: rgba(180,220,255,0.5); font-family: 'Noto Sans SC', sans-serif; }
  .fr-sidebar-menu { list-style: none; padding: 6px 0; }
  .fr-sidebar-item {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 20px; cursor: pointer;
    font-family: 'Noto Serif SC', serif; font-size: 0.9rem;
    color: rgba(220,240,255,0.88); letter-spacing: 0.06em;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    transition: background 0.15s; user-select: none;
  }
  .fr-sidebar-item:last-child { border-bottom: none; }
  .fr-sidebar-item:hover { background: rgba(255,255,255,0.12); color: #fff; }
  .fr-sidebar-item .fr-icon { font-size: 1.1rem; width: 22px; text-align: center; }
  .fr-sidebar-item .fr-arrow { margin-left: auto; color: rgba(180,220,255,0.6); font-size: 0.85rem; }
  .fr-lang-panel {
    position: fixed; top: 50%; left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(0.97);
    z-index: 9300; width: min(280px, 85vw);
    background: rgba(22,48,100,0.95); backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.14); border-radius: 20px;
    box-shadow: 0 12px 40px rgba(0,20,70,0.55); padding: 20px 16px;
    opacity: 0; pointer-events: none; visibility: hidden;
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  }
  .fr-lang-panel.open { opacity: 1; pointer-events: auto; visibility: visible; transform: translateX(-50%) translateY(-50%) scale(1); }
  .fr-lang-title { font-family: 'Noto Serif SC', serif; font-size: 0.8rem; color: rgba(200,220,255,0.65); letter-spacing: 0.22em; text-align: center; margin-bottom: 16px; }
  .fr-lang-option { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-radius: 12px; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 8px; color: rgba(220,240,255,0.88); font-family: 'Noto Serif SC', serif; font-size: 0.9rem; transition: background 0.15s; }
  .fr-lang-option:last-child { margin-bottom: 0; }
  .fr-lang-option:hover { background: rgba(255,255,255,0.1); }
  .fr-lang-option.active { background: rgba(60,120,220,0.35); border-color: rgba(120,180,255,0.35); }
  .fr-lang-check { color: rgba(120,200,255,0.8); font-size: 1rem; }
  `;


  .fr-support-panel {
    position: fixed; top: 50%; left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(0.97);
    z-index: 9300; width: min(320px, 90vw);
    background: rgba(22,48,100,0.95); backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.14); border-radius: 20px;
    box-shadow: 0 12px 40px rgba(0,20,70,0.55); padding: 24px 20px;
    opacity: 0; pointer-events: none; visibility: hidden;
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
    text-align: center;
  }
  .fr-support-panel.open {
    opacity: 1; pointer-events: auto; visibility: visible;
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
  .fr-support-title {
    font-family: 'Noto Serif SC', serif; font-size: 0.95rem;
    color: rgba(220,240,255,0.92); letter-spacing: 0.1em;
    margin-bottom: 12px;
  }
  .fr-support-text {
    font-family: 'Noto Sans SC', sans-serif; font-size: 0.8rem;
    color: rgba(180,210,255,0.75); line-height: 1.7;
    margin-bottom: 16px; letter-spacing: 0.03em;
  }
  .fr-support-qr {
    width: 180px; height: 180px; border-radius: 12px;
    margin: 0 auto 12px; display: block;
    border: 2px solid rgba(255,255,255,0.15);
  }
  .fr-support-name {
    font-size: 0.78rem; color: rgba(180,210,255,0.6);
    letter-spacing: 0.1em; margin-bottom: 16px;
  }
  .fr-support-close {
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: rgba(200,230,255,0.8); padding: 8px 24px; border-radius: 20px;
    cursor: pointer; font-size: 0.82rem; letter-spacing: 0.08em;
    font-family: 'Noto Sans SC', sans-serif;
    transition: background 0.2s;
  }
  .fr-support-close:hover { background: rgba(255,255,255,0.2); }

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── HTML ──
  var html = `
    <button class="fr-menu-btn" id="frMenuBtn" onclick="frToggleSidebar()">☰</button>
    <div class="fr-sidebar-overlay" id="frOverlay" onclick="frCloseSidebar()"></div>
    <div class="fr-sidebar" id="frSidebar">
      <div class="fr-sidebar-header">
        <span class="fr-sidebar-title">📋 目录</span>
      </div>
      <div class="fr-section-label">释放工具</div>
      <ul class="fr-sidebar-menu" style="border-bottom:1px solid rgba(255,255,255,0.12);margin-bottom:4px;">
        <li class="fr-sidebar-item" onclick="location.href='/'"><span class="fr-icon">🫧</span><span>欲望释放</span><span class="fr-arrow">›</span></li>
        <li class="fr-sidebar-item" onclick="location.href='/sedona2/'"><span class="fr-icon">🫧</span><span>识别即释放</span><span class="fr-arrow">›</span></li>
        <li class="fr-sidebar-item" onclick="location.href='/emotions/'"><span class="fr-icon">🫧</span><span>情绪释放</span><span class="fr-arrow">›</span></li>
        <li class="fr-sidebar-item" onclick="location.href='/whole/'"><span class="fr-icon">🫧</span><span>情绪欲望完整释放</span><span class="fr-arrow">›</span></li>
        <li class="fr-sidebar-item" onclick="location.href='/double/'"><span class="fr-icon">🫧</span><span>好处坏处释放</span><span class="fr-arrow">›</span></li>
      </ul>
      <div class="fr-section-label">功能</div>
      <ul class="fr-sidebar-menu">
        <li class="fr-sidebar-item" onclick="frCloseSidebar();setTimeout(frToggleLang,300)"><span class="fr-icon">🌐</span><span>语言</span><span class="fr-arrow">›</span></li>
      </ul>
      <ul class="fr-sidebar-menu" style="border-top:1px solid rgba(255,255,255,0.12);margin-top:4px;">
        <li class="fr-sidebar-item" onclick="frToggleSupport()"><span class="fr-icon">☕</span><span>支持我们的网站</span><span class="fr-arrow">›</span></li>
      </ul>
    </div>
    <div class="fr-lang-panel" id="frLangPanel">
      <div class="fr-lang-title">选 择 语 言</div>
      <div class="fr-lang-option active" id="frLangZh" onclick="frSelectLang('zh')"><span>中文</span><span class="fr-lang-check" id="frCheckZh">✓</span></div>
      <div class="fr-lang-option" id="frLangEn" onclick="frSelectLang('en')"><span>English</span><span class="fr-lang-check" id="frCheckEn" style="opacity:0">✓</span></div>
    </div>
  `;


    <div class="fr-support-panel" id="frSupportPanel">
      <div class="fr-support-title">☕ 支持我们的网站</div>
      <div class="fr-support-text">感谢你的支持！释放助手的 AI 功能需要 token 费用来维持运行，你的每一份支持都让更多人能够使用这个工具 🫧</div>
      <img class="fr-support-qr" src="data:image/webp;base64,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" alt="微信收款码" />
      <div class="fr-support-name">chiquita(*佳)</div>
      <button class="fr-support-close" onclick="frToggleSupport()">关闭</button>
    </div>

  var div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);

  // ── JS ──
  window.frToggleSidebar = function() {
    var open = document.getElementById('frSidebar').classList.contains('open');
    if (open) { frCloseSidebar(); } else {
      document.getElementById('frSidebar').classList.add('open');
      document.getElementById('frOverlay').classList.add('open');
      document.getElementById('frMenuBtn').style.display = 'none';
    }
  };
  window.frCloseSidebar = function() {
    document.getElementById('frSidebar').classList.remove('open');
    document.getElementById('frOverlay').classList.remove('open');
    document.getElementById('frMenuBtn').style.display = 'flex';
  };
  window.frToggleLang = function() {
    document.getElementById('frLangPanel').classList.toggle('open');
  };
  window.frSelectLang = function(lang) {
    document.getElementById('frLangZh').classList.toggle('active', lang==='zh');
    document.getElementById('frLangEn').classList.toggle('active', lang==='en');
    document.getElementById('frCheckZh').style.opacity = lang==='zh'?'1':'0';
    document.getElementById('frCheckEn').style.opacity = lang==='en'?'1':'0';
    setTimeout(function(){ document.getElementById('frLangPanel').classList.remove('open'); }, 400);
  };

  window.frToggleSupport = function() {
    document.getElementById('frSupportPanel').classList.toggle('open');
  };

})();
