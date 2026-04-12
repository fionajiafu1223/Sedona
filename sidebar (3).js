(function () {

  // ═══════════════════════════════════════════════════
  //  CSS
  // ═══════════════════════════════════════════════════
  var css = `
  /* ── MENU BUTTON ── */
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

  /* ── SIDEBAR OVERLAY ── */
  .fr-sidebar-overlay {
    position: fixed; inset: 0; background: rgba(0,20,60,0.25);
    z-index: 9100; opacity: 0; pointer-events: none; transition: opacity 0.26s ease;
  }
  .fr-sidebar-overlay.open { opacity: 1; pointer-events: auto; }

  /* ── SIDEBAR ── */
  .fr-sidebar {
    position: fixed; top: 0; left: 0; bottom: 0; width: min(260px, 80vw);
    height: 100%; max-height: 100vh;
    background: rgba(255,255,255,0.12); backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-right: 1px solid rgba(255,255,255,0.22);
    box-shadow: 4px 0 32px rgba(0,40,100,0.2);
    z-index: 9200; display: flex; flex-direction: column;
    transform: translateX(-100%);
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
    font-family: 'Noto Serif SC', serif;
    overflow-y: auto; overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }
  .fr-sidebar.open { transform: translateX(0); }
  .fr-sidebar-header {
    display: flex; align-items: center; padding: 18px 18px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.18);
  }
  .fr-sidebar-title { font-size: 0.95rem; font-weight: 600; color: rgba(255,255,255,0.92); letter-spacing: 0.1em; }
  .fr-section-label { padding: 8px 12px 4px; font-size: 0.68rem; letter-spacing: 0.2em; color: rgba(180,220,255,0.5); font-family: 'Noto Sans SC', sans-serif; }
  .fr-sidebar-menu { list-style: none; padding: 6px 0; margin: 0; }
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
  .fr-sidebar-item.active { background: rgba(255,255,255,0.18); color: #fff; font-weight: 600; }
  .fr-sidebar-item .fr-icon { font-size: 1.1rem; width: 22px; text-align: center; }
  .fr-sidebar-item .fr-arrow { margin-left: auto; color: rgba(180,220,255,0.6); font-size: 0.85rem; }

  /* ── LANGUAGE PANEL ── */
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

  /* ── MODAL OVERLAY ── */
  .fr-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(5,20,50,0.45); backdrop-filter: blur(4px);
    z-index: 9300; display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none;
    transition: opacity 0.25s ease;
  }
  .fr-modal-overlay.open { opacity: 1; pointer-events: auto; }
  @media (max-width: 480px) {
    .fr-modal-overlay { align-items: flex-end; padding: 0 10px 12px; }
    .fr-modal-box { width: 100%; max-height: 76vh; border-radius: 20px; transform: translateY(110%); padding: 16px 14px 24px; display: flex; flex-direction: column; }
    .fr-modal-overlay.open .fr-modal-box { transform: translateY(0); }
    .fr-modal-tabs { margin: -4px -14px 14px; padding: 0 14px; }
    .gain-cats { gap: 5px; }
    .gain-cat { font-size: 0.68rem; padding: 4px 8px; }
    .fr-tab-panel { overflow-y: auto; flex: 1; }
    .fr-asst-panel { overflow-y: auto; flex: 1; }
  }
  .fr-modal-box {
    background: linear-gradient(145deg, rgba(240,250,255,0.98), rgba(220,238,255,0.96));
    border-radius: 20px; padding: 18px 16px;
    width: min(440px, 100vw); max-height: 92vh; overflow-y: auto;
    box-shadow: 0 16px 56px rgba(0,40,100,0.24);
    font-family: 'Noto Serif SC', serif; position: relative;
    transform: translateY(16px);
    transition: transform 0.25s ease;
  }
  .fr-modal-overlay.open .fr-modal-box { transform: translateY(0); }
  .fr-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .fr-modal-title { font-size: 1rem; font-weight: 600; color: #0e3050; letter-spacing: 0.1em; }
  .fr-modal-close { background: none; border: none; font-size: 1.1rem; color: #5a7aa0; cursor: pointer; line-height: 1; transition: color 0.15s, transform 0.15s; }
  .fr-modal-close:hover { color: #0e2840; transform: scale(1.2); }
  .fr-modal-tabs { display: flex; gap: 0; border-bottom: 2px solid rgba(100,160,220,0.18); margin: -4px -18px 16px; padding: 0 18px; }
  .fr-modal-tab { flex: 1; padding: 11px 8px; background: none; border: none; font-family: 'Noto Serif SC', serif; font-size: 0.88rem; color: #7a9ab8; cursor: pointer; letter-spacing: 0.08em; border-bottom: 2.5px solid transparent; margin-bottom: -2px; transition: color 0.18s, border-color 0.18s; }
  .fr-modal-tab.active { color: #0e3050; border-bottom-color: #4a9fd4; font-weight: 600; }
  .fr-modal-tab:hover:not(.active) { color: #2a6090; }
  .fr-tab-panel { display: none; }
  .fr-tab-panel.active { display: block; animation: frFadeIn 0.18s ease; }
  @keyframes frFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

  /* ── GOALS ── */
  .fr-goals-panel { display: flex; flex-direction: column; gap: 0; }
  .fr-goals-add-row { display: flex; gap: 8px; margin-bottom: 14px; }
  .fr-goals-add-row input { flex: 1; padding: 9px 12px; border: 1.5px solid rgba(100,160,220,0.4); border-radius: 12px; background: rgba(255,255,255,0.75); font-family: 'Noto Sans SC', sans-serif; font-size: 0.84rem; color: #0e2840; outline: none; transition: border-color 0.2s; }
  .fr-goals-add-row input:focus { border-color: rgba(80,140,220,0.8); }
  .fr-goals-add-row button { padding: 9px 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #4a9fd4, #2a7abf); color: #fff; font-family: 'Noto Serif SC', serif; font-size: 0.82rem; cursor: pointer; white-space: nowrap; transition: opacity 0.2s, transform 0.15s; }
  .fr-goals-add-row button:hover { opacity: 0.88; transform: scale(1.04); }
  .fr-goals-list { list-style: none; display: flex; flex-direction: column; gap: 8px; padding: 0; margin: 0; }
  .fr-goal-item { background: rgba(255,255,255,0.68); border-radius: 13px; padding: 10px 12px; border: 1px solid rgba(100,160,220,0.22); display: flex; flex-direction: column; gap: 7px; }
  .fr-goal-item-text { font-size: 0.86rem; color: #0e2840; line-height: 1.45; word-break: break-all; }
  .fr-goal-item-actions { display: flex; gap: 7px; }
  .fr-goal-btn-release { flex: 1; padding: 6px 0; border-radius: 10px; border: none; background: linear-gradient(135deg, rgba(74,159,212,0.85), rgba(42,122,191,0.85)); color: #fff; font-family: 'Noto Serif SC', serif; font-size: 0.76rem; cursor: pointer; transition: opacity 0.18s, transform 0.12s; }
  .fr-goal-btn-release:hover { opacity: 0.85; transform: scale(1.04); }
  .fr-goal-btn-drop { flex: 1; padding: 6px 0; border-radius: 10px; border: none; background: linear-gradient(135deg, rgba(255,190,80,0.92), rgba(220,140,30,0.88)); color: #2a1200; font-family: 'Noto Serif SC', serif; font-size: 0.76rem; cursor: pointer; transition: opacity 0.18s, transform 0.12s; }
  .fr-goal-btn-drop:hover { opacity: 0.85; transform: scale(1.04); }
  .fr-goal-btn-del { width: 30px; height: 30px; border-radius: 50%; border: none; background: rgba(200,60,60,0.1); color: #c04040; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
  .fr-goal-btn-del:hover { background: rgba(200,60,60,0.22); }
  .fr-goals-empty { text-align: center; color: #8aaac0; font-size: 0.78rem; padding: 28px 0; font-family: 'Noto Sans SC', sans-serif; }

  /* ── GAINBOOK ── */
  .gain-input-row { display: flex; gap: 8px; margin-bottom: 16px; }
  .gain-input-row input { flex: 1; padding: 9px 14px; border: 1.5px solid rgba(100,160,220,0.4); border-radius: 12px; background: rgba(255,255,255,0.7); font-family: 'Noto Sans SC', sans-serif; font-size: 0.88rem; color: #0e2840; outline: none; transition: border-color 0.2s; }
  .gain-input-row input:focus { border-color: rgba(80,140,220,0.8); }
  .gain-input-row button { padding: 9px 16px; border-radius: 12px; border: none; background: linear-gradient(135deg, #4a9fd4, #2a7abf); color: #fff; font-family: 'Noto Serif SC', serif; font-size: 0.84rem; cursor: pointer; white-space: nowrap; transition: opacity 0.2s, transform 0.15s; }
  .gain-input-row button:hover { opacity: 0.88; transform: scale(1.04); }
  .gain-cats { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .gain-cat { padding: 4px 10px; border-radius: 20px; border: 1.5px solid rgba(100,160,220,0.4); background: rgba(255,255,255,0.55); font-family: 'Noto Sans SC', sans-serif; font-size: 0.72rem; color: #2a5080; cursor: pointer; transition: all 0.18s ease; }
  .gain-cat:hover { background: rgba(200,230,255,0.7); }
  .gain-cat.active { background: linear-gradient(135deg, rgba(74,159,212,0.85), rgba(42,122,191,0.85)); border-color: rgba(74,159,212,0.6); color: #fff; }
  .gain-filter-row { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
  .gain-filter-label { font-size: 0.72rem; color: #5a7aa0; font-family: 'Noto Sans SC', sans-serif; }
  .gain-filter { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid rgba(100,160,220,0.4); background: rgba(255,255,255,0.55); font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.18s ease; }
  .gain-filter[data-filter="all"] { width: auto; padding: 0 10px; font-size: 0.72rem; font-family: 'Noto Sans SC', sans-serif; color: #5a7aa0; }
  .gain-filter:hover { background: rgba(200,230,255,0.7); }
  .gain-filter.active { background: linear-gradient(135deg, rgba(74,159,212,0.85), rgba(42,122,191,0.85)); border-color: rgba(74,159,212,0.6); color: #fff; }
  .gain-section-title { font-size: 0.78rem; color: #2a5080; letter-spacing: 0.08em; margin: 14px 0 8px; font-weight: 600; }
  .gain-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; padding: 0; }
  .gain-item { background: rgba(255,255,255,0.62); border-radius: 12px; padding: 10px 14px; border: 1px solid rgba(100,160,220,0.2); display: flex; flex-direction: column; gap: 5px; }
  .gain-item.shared { background: rgba(230,245,255,0.62); }
  .gain-text { font-size: 0.84rem; color: #0e2840; line-height: 1.5; }
  .gain-badge { display: inline-flex; align-items: center; gap: 3px; background: rgba(74,159,212,0.15); border-radius: 10px; padding: 2px 8px; font-size: 0.68rem; color: #2a6090; font-family: 'Noto Sans SC', sans-serif; align-self: flex-start; }
  .gain-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
  .gain-meta { font-size: 0.64rem; color: #7a9ab0; font-family: 'Noto Sans SC', sans-serif; }
  .gain-like-btn { display: inline-flex; align-items: center; gap: 4px; background: none; border: 1px solid rgba(100,160,220,0.25); border-radius: 20px; padding: 3px 10px; font-size: 0.7rem; color: #7a9ab0; font-family: 'Noto Sans SC', sans-serif; cursor: pointer; transition: all 0.18s ease; line-height: 1; }
  .gain-like-btn:hover { background: rgba(255,100,130,0.08); border-color: rgba(255,100,130,0.4); color: #e05080; }
  .gain-like-btn.liked { background: rgba(255,100,130,0.12); border-color: rgba(255,100,130,0.5); color: #e05080; }
  .gain-like-count { font-weight: 600; }
  .gain-sort-btn { padding: 4px 10px; border-radius: 14px; border: 1.5px solid rgba(100,160,220,0.35); background: rgba(255,255,255,0.5); font-size: 0.68rem; color: #5a7aa0; font-family: 'Noto Sans SC', sans-serif; cursor: pointer; transition: all 0.18s ease; }
  .gain-sort-btn:hover { background: rgba(200,230,255,0.7); }
  .gain-sort-btn.active { background: linear-gradient(135deg, rgba(74,159,212,0.85), rgba(42,122,191,0.85)); border-color: rgba(74,159,212,0.6); color: #fff; }
  .gain-loading { font-size: 0.78rem; color: #8aaac0; text-align: center; padding: 10px 0; }
  .gain-empty { font-size: 0.78rem; color: #8aaac0; text-align: center; padding: 14px 0; list-style: none; }

  /* ── RELEASE ASSISTANT ── */
  .fr-asst-panel { display: flex; flex-direction: column; gap: 12px; }
  .fr-asst-subtitle { font-size: 0.7rem; color: #5a7aa0; font-family: 'Noto Sans SC', sans-serif; letter-spacing: 0.04em; line-height: 1.6; }
  .fr-asst-textarea { width: 100%; padding: 11px 14px; min-height: 96px; border: 1.5px solid rgba(100,160,220,0.4); border-radius: 14px; background: rgba(255,255,255,0.75); font-family: 'Noto Sans SC', sans-serif; font-size: 0.86rem; color: #0e2840; outline: none; resize: vertical; line-height: 1.6; transition: border-color 0.2s; box-sizing: border-box; }
  .fr-asst-textarea:focus { border-color: rgba(80,140,220,0.75); }
  .fr-asst-submit { align-self: flex-end; padding: 9px 22px; border-radius: 12px; border: none; background: linear-gradient(135deg, #4a9fd4, #2a7abf); color: #fff; font-family: 'Noto Serif SC', serif; font-size: 0.84rem; cursor: pointer; transition: opacity 0.2s, transform 0.15s; }
  .fr-asst-submit:hover { opacity: 0.88; transform: scale(1.04); }
  .fr-asst-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .fr-asst-result { background: rgba(255,255,255,0.7); border-radius: 14px; border: 1px solid rgba(100,160,220,0.22); padding: 14px 16px; display: none; flex-direction: column; gap: 10px; }
  .fr-asst-result.show { display: flex; animation: frFadeIn 0.22s ease; }
  .fr-asst-desire-badges { display: flex; gap: 8px; flex-wrap: wrap; }
  .fr-asst-badge { padding: 5px 14px; border-radius: 20px; font-family: 'Noto Serif SC', serif; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; }
  .fr-asst-badge.bc { background: rgba(255,192,210,0.55); color: #7a1030; border: 1.5px solid rgba(192,51,82,0.3); }
  .fr-asst-badge.ba { background: rgba(153,251,200,0.45); color: #0a4a28; border: 1.5px solid rgba(24,134,73,0.3); }
  .fr-asst-badge.bs { background: rgba(161,202,255,0.45); color: #0a2860; border: 1.5px solid rgba(43,74,219,0.3); }
  .fr-asst-analysis { font-size: 0.84rem; color: #1a3a5a; line-height: 1.75; font-family: 'Noto Sans SC', sans-serif; display: flex; flex-direction: column; gap: 8px; }
  .fr-asst-point { display: flex; align-items: flex-start; gap: 10px; background: rgba(255,255,255,0.5); border-radius: 11px; padding: 9px 12px; border: 1px solid rgba(100,160,220,0.18); }
  .fr-asst-point-badge { flex-shrink: 0; padding: 3px 10px; border-radius: 14px; font-family: 'Noto Serif SC', serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.04em; margin-top: 1px; }
  .fr-asst-point-body { display: flex; flex-direction: column; gap: 3px; }
  .fr-asst-point-quote { font-size: 0.82rem; color: #0e2840; font-weight: 500; line-height: 1.5; }
  .fr-asst-point-reason { font-size: 0.76rem; color: #5a7aa0; line-height: 1.5; }
  .fr-asst-go-btn { width: 100%; padding: 12px; border-radius: 14px; border: none; background: linear-gradient(135deg, #4a9fd4, #2a7abf); color: #fff; font-family: 'Noto Serif SC', serif; font-size: 0.92rem; letter-spacing: 0.08em; cursor: pointer; transition: opacity 0.2s, transform 0.15s; margin-top: 4px; }
  .fr-asst-go-btn:hover { opacity: 0.88; transform: scale(1.02); }
  .fr-asst-loading { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #5a7aa0; font-family: 'Noto Sans SC', sans-serif; }
  .fr-asst-dot { width: 6px; height: 6px; border-radius: 50%; background: #4a9fd4; animation: frAsstPulse 1.2s ease-in-out infinite; }
  .fr-asst-dot:nth-child(2) { animation-delay: 0.2s; }
  .fr-asst-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes frAsstPulse { 0%,100% { opacity: 0.25; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }

  /* ── MUSIC BUTTON & PANEL ── */
  .fr-music-btn {
    position: fixed; top: 16px; right: 62px; z-index: 9000;
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.2); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1.5px solid rgba(255,255,255,0.35);
    color: #fff; font-size: 1rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 14px rgba(0,40,100,0.18);
    transition: transform 0.2s, background 0.2s;
  }
  .fr-music-btn:hover { transform: scale(1.1); background: rgba(255,255,255,0.32); }
  .fr-music-btn.playing { background: rgba(100,190,255,0.28); border-color: rgba(160,225,255,0.55); }
  .fr-music-btn.playing .fr-music-icon { display: inline-block; animation: frMusicRotate 4s linear infinite; }
  @keyframes frMusicRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .fr-music-panel {
    position: fixed; top: 64px; right: 12px; z-index: 9250;
    width: min(390px, 90vw);
    background: rgba(22,48,100,0.93); backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.14); border-radius: 20px;
    box-shadow: 0 12px 40px rgba(0,20,70,0.55);
    padding: 16px 14px 14px;
    max-height: min(75vh, 560px); overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    opacity: 0; pointer-events: none; visibility: hidden;
    transform: translateY(-8px) scale(0.97);
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  }
  .fr-music-panel.open { opacity: 1; pointer-events: auto; visibility: visible; transform: translateY(0) scale(1); }
  .fr-music-panel-title { display: block; font-family: 'Noto Serif SC', serif; font-size: 0.8rem; color: rgba(200,220,255,0.65); letter-spacing: 0.22em; text-align: center; margin-bottom: 12px; }
  .fr-music-tracks { display: flex; flex-direction: column; gap: 8px; }
  .fr-music-track { display: flex; align-items: center; gap: 14px; padding: 13px 14px; border-radius: 12px; cursor: pointer; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); transition: background 0.18s, border-color 0.18s; }
  .fr-music-track:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.18); }
  .fr-music-track.active { background: rgba(60,120,220,0.3); border-color: rgba(120,180,255,0.4); }
  .fr-music-track-icon { font-size: 1.5rem; width: 36px; text-align: center; flex-shrink: 0; }
  .fr-music-track-info { flex: 1; min-width: 0; }
  .fr-music-play-btn { flex-shrink: 0; width: 30px; height: 30px; border-radius: 50%; border: none; background: rgba(255,255,255,0.14); color: rgba(220,240,255,0.9); font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.18s, transform 0.12s; }
  .fr-music-play-btn:hover { background: rgba(255,255,255,0.26); transform: scale(1.1); }
  .fr-music-play-btn.playing { background: rgba(60,120,220,0.55); color: rgba(200,230,255,1); }
  .fr-music-track-name { font-family: 'Noto Sans SC', sans-serif; font-size: 0.9rem; font-weight: 400; color: rgba(230,245,255,0.95); letter-spacing: 0.03em; }
  .fr-music-track-desc { display: block; font-size: 0.68rem; color: rgba(170,200,255,0.55); margin-top: 2px; letter-spacing: 0.02em; }
  .fr-music-playing-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(140,220,255,0.9); animation: frDotPulse 1.4s ease-in-out infinite; flex-shrink: 0; }
  @keyframes frDotPulse { 0%,100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
  .fr-music-volume-row { display: flex; align-items: center; gap: 10px; margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.12); }
  .fr-music-vol-icon { font-size: 1.1rem; color: rgba(180,220,255,0.6); }
  .fr-music-volume { flex: 1; -webkit-appearance: none; appearance: none; height: 3px; border-radius: 2px; outline: none; cursor: pointer; background: rgba(255,255,255,0.2); }
  .fr-music-volume::-webkit-slider-thumb { -webkit-appearance: none; width: 13px; height: 13px; border-radius: 50%; background: rgba(220,240,255,0.9); box-shadow: 0 1px 5px rgba(0,40,100,0.35); cursor: pointer; }
  .fr-music-source-tabs { display: flex; gap: 4px; background: rgba(0,0,0,0.18); border-radius: 12px; padding: 4px; margin-bottom: 14px; }
  .fr-music-source-tab { flex: 1; padding: 7px 4px; border-radius: 9px; border: none; font-family: 'Noto Sans SC', sans-serif; font-size: 0.7rem; color: rgba(170,200,255,0.65); cursor: pointer; background: none; transition: all 0.18s ease; letter-spacing: 0.02em; text-align: center; line-height: 1.3; }
  .fr-music-source-tab.active { background: rgba(60,120,220,0.42); color: rgba(220,240,255,0.95); box-shadow: 0 1px 6px rgba(0,20,80,0.3); }
  .fr-music-source-tab:hover:not(.active) { color: rgba(200,230,255,0.85); }
  .fr-music-source-panel { display: none; }
  .fr-music-source-panel.active { display: block; }
  .fr-music-import-zone { border: 1.5px dashed rgba(100,160,220,0.35); border-radius: 14px; padding: 18px 14px; text-align: center; cursor: pointer; transition: all 0.2s ease; margin-bottom: 10px; background: rgba(255,255,255,0.04); }
  .fr-music-import-zone:hover { border-color: rgba(140,200,255,0.6); background: rgba(255,255,255,0.08); }
  .fr-music-import-zone.dragover { border-color: rgba(140,200,255,0.8); background: rgba(60,120,220,0.15); }
  .fr-music-import-icon { font-size: 1.6rem; margin-bottom: 6px; }
  .fr-music-import-text { font-size: 0.76rem; color: rgba(170,200,255,0.7); line-height: 1.5; }
  .fr-music-import-sub { font-size: 0.65rem; color: rgba(120,160,210,0.5); margin-top: 3px; }
  .fr-music-imported-list { display: flex; flex-direction: column; gap: 7px; }
  .fr-music-imported-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09); cursor: pointer; transition: background 0.16s; }
  .fr-music-imported-item:hover { background: rgba(255,255,255,0.11); }
  .fr-music-imported-item.active { background: rgba(60,120,220,0.28); border-color: rgba(100,180,255,0.35); }
  .fr-music-imported-name { flex: 1; font-size: 0.8rem; color: rgba(210,235,255,0.88); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'Noto Sans SC', sans-serif; }
  .fr-music-imported-del { background: none; border: none; color: rgba(180,200,230,0.4); font-size: 0.9rem; cursor: pointer; padding: 2px 4px; transition: color 0.15s; flex-shrink: 0; line-height: 1; }
  .fr-music-imported-del:hover { color: rgba(255,120,120,0.8); }
  .fr-music-import-empty { font-size: 0.74rem; color: rgba(120,160,200,0.5); text-align: center; padding: 8px 0; font-family: 'Noto Sans SC', sans-serif; }
  .fr-music-record-panel { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 8px 0 4px; }
  .fr-record-btn-wrap { position: relative; }
  .fr-record-btn { width: 68px; height: 68px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; background: radial-gradient(circle at 38% 35%, rgba(255,120,120,0.85), rgba(180,30,30,0.75)); box-shadow: 0 4px 18px rgba(180,30,30,0.4); transition: transform 0.18s, box-shadow 0.18s; }
  .fr-record-btn:hover { transform: scale(1.06); }
  .fr-record-btn.recording { background: radial-gradient(circle at 38% 35%, rgba(255,60,60,0.9), rgba(160,10,10,0.85)); animation: frRecordPulse 1.4s ease-in-out infinite; }
  @keyframes frRecordPulse { 0%,100% { box-shadow: 0 4px 18px rgba(180,30,30,0.4), 0 0 0 0 rgba(220,60,60,0.35); } 50% { box-shadow: 0 4px 24px rgba(220,30,30,0.6), 0 0 0 14px rgba(220,60,60,0); } }
  .fr-record-btn.has-recording { background: radial-gradient(circle at 38% 35%, rgba(80,180,120,0.88), rgba(20,100,60,0.78)); box-shadow: 0 4px 18px rgba(20,120,70,0.4); }
  .fr-record-status { font-size: 0.76rem; color: rgba(180,220,255,0.7); font-family: 'Noto Sans SC', sans-serif; text-align: center; letter-spacing: 0.04em; }
  .fr-record-timer { font-size: 1.5rem; font-family: 'Noto Serif SC', serif; color: rgba(220,240,255,0.9); letter-spacing: 0.1em; min-height: 2rem; display: flex; align-items: center; justify-content: center; }
  .fr-record-timer.active { color: rgba(255,140,140,0.95); }
  .fr-record-waveform { width: 100%; height: 40px; display: flex; align-items: center; justify-content: center; gap: 2px; }
  .fr-record-wave-bar { width: 3px; background: rgba(100,180,255,0.45); border-radius: 2px; transition: height 0.06s ease; min-height: 3px; }
  .fr-record-actions { display: flex; gap: 10px; width: 100%; }
  .fr-record-action-btn { flex: 1; padding: 9px; border-radius: 12px; border: none; font-family: 'Noto Serif SC', serif; font-size: 0.8rem; cursor: pointer; transition: opacity 0.18s, transform 0.12s; }
  .fr-record-action-btn:hover { opacity: 0.85; transform: scale(1.03); }
  .fr-record-play-btn { background: rgba(60,120,220,0.45); color: rgba(220,240,255,0.92); border: 1px solid rgba(100,180,255,0.25); }
  .fr-record-save-btn { background: linear-gradient(135deg, rgba(60,180,120,0.8), rgba(20,120,70,0.8)); color: rgba(220,255,235,0.95); }
  .fr-record-discard-btn { background: rgba(255,255,255,0.06); color: rgba(180,200,230,0.6); border: 1px solid rgba(255,255,255,0.1); }
  .fr-record-hint { font-size: 0.66rem; color: rgba(100,150,200,0.5); font-family: 'Noto Sans SC', sans-serif; text-align: center; line-height: 1.6; }
  .fr-record-bg-section { width: 100%; margin-bottom: 6px; }
  .fr-record-bg-label { font-size: 0.68rem; color: rgba(140,180,220,0.7); font-family: 'Noto Sans SC', sans-serif; letter-spacing: 0.06em; margin-bottom: 8px; }
  .fr-record-bg-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 8px; }
  .fr-record-bg-item { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 7px 4px; border-radius: 10px; cursor: pointer; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09); transition: all 0.16s ease; }
  .fr-record-bg-item:hover { background: rgba(255,255,255,0.11); }
  .fr-record-bg-item.active { background: rgba(60,120,220,0.35); border-color: rgba(100,180,255,0.45); }
  .fr-record-bg-icon { font-size: 1.2rem; }
  .fr-record-bg-name { font-size: 0.62rem; color: rgba(180,210,255,0.75); font-family: 'Noto Sans SC', sans-serif; text-align: center; }
  .fr-record-bg-vol-row { display: flex; align-items: center; gap: 8px; padding: 6px 2px; }

  /* ── SUPPORT PANEL ── */
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
  .fr-support-panel.open { opacity: 1; pointer-events: auto; visibility: visible; transform: translateX(-50%) translateY(-50%) scale(1); }
  .fr-support-title { font-family: 'Noto Serif SC', serif; font-size: 0.95rem; color: rgba(220,240,255,0.92); letter-spacing: 0.1em; margin-bottom: 12px; }
  .fr-support-text { font-family: 'Noto Sans SC', sans-serif; font-size: 0.8rem; color: rgba(180,210,255,0.75); line-height: 1.7; margin-bottom: 16px; letter-spacing: 0.03em; }
  .fr-support-qr { width: 180px; height: 180px; border-radius: 12px; margin: 0 auto 12px; display: block; border: 2px solid rgba(255,255,255,0.15); }
  .fr-support-name { font-size: 0.78rem; color: rgba(180,210,255,0.6); letter-spacing: 0.1em; margin-bottom: 16px; }
  .fr-support-close { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: rgba(200,230,255,0.8); padding: 8px 24px; border-radius: 20px; cursor: pointer; font-size: 0.82rem; letter-spacing: 0.08em; font-family: 'Noto Sans SC', sans-serif; transition: background 0.2s; }
  .fr-support-close:hover { background: rgba(255,255,255,0.2); }
  `;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ═══════════════════════════════════════════════════
  //  HTML
  // ═══════════════════════════════════════════════════
  var html = `
    <button class="fr-music-btn" id="frMusicBtn" onclick="frToggleMusicPanel()" title="背景音乐">
      <svg class="fr-music-icon" viewBox="0 0 20 22" width="16" height="18" fill="rgba(255,255,255,0.78)" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17.5c0 1.38-1.12 2.5-2.5 2.5S2 18.88 2 17.5 3.12 15 4.5 15c.56 0 1.08.19 1.5.5V6.5l9-2v8.5c-.42-.31-.94-.5-1.5-.5-1.38 0-2.5 1.12-2.5 2.5S12.12 17 13.5 17 16 15.88 16 14.5V3L7 5.2V17.5z"/>
      </svg>
    </button>

    <!-- Music Panel -->
    <div class="fr-music-panel" id="frMusicPanel">
      <div class="fr-music-panel-title">背 景 音 乐</div>
      <div class="fr-music-source-tabs">
        <button class="fr-music-source-tab active" id="frMsrc-builtin" onclick="frSwitchMusicSource('builtin')">🎵 App内置</button>
        <button class="fr-music-source-tab" id="frMsrc-import" onclick="frSwitchMusicSource('import')">📁 本地导入</button>
        <button class="fr-music-source-tab" id="frMsrc-record" onclick="frSwitchMusicSource('record')">🎙️ 录制背景音</button>
      </div>
      <div class="fr-music-source-panel active" id="frMpanel-builtin">
        <div class="fr-music-tracks">
          <div class="fr-music-track" data-track="bowl"><span class="fr-music-track-icon">🔔</span><div class="fr-music-track-info"><div class="fr-music-track-name">冥想钵</div><span class="fr-music-track-desc">396Hz · 释放恐惧</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('bowl')">▶</button></div>
          <div class="fr-music-track" data-track="deepbowl"><span class="fr-music-track-icon">🎐</span><div class="fr-music-track-info"><div class="fr-music-track-name">颂钵冥想</div><span class="fr-music-track-desc">三钵共鸣 · 深度放松</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('deepbowl')">▶</button></div>
          <div class="fr-music-track" data-track="hz528"><span class="fr-music-track-icon">💚</span><div class="fr-music-track-info"><div class="fr-music-track-name">528Hz 疗愈</div><span class="fr-music-track-desc">爱的频率 · DNA修复</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('hz528')">▶</button></div>
          <div class="fr-music-track" data-track="awaken"><span class="fr-music-track-icon">✨</span><div class="fr-music-track-info"><div class="fr-music-track-name">963Hz 觉醒</div><span class="fr-music-track-desc">松果体 · 灵性连接</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('awaken')">▶</button></div>
          <div class="fr-music-track" data-track="schumann"><span class="fr-music-track-icon">🌍</span><div class="fr-music-track-info"><div class="fr-music-track-name">舒曼共振</div><span class="fr-music-track-desc">7.83Hz · 地球脑波</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('schumann')">▶</button></div>
          <div class="fr-music-track" data-track="deep"><span class="fr-music-track-icon">🌌</span><div class="fr-music-track-info"><div class="fr-music-track-name">432Hz 深空</div><span class="fr-music-track-desc">自然律 · 宇宙共鸣</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('deep')">▶</button></div>
          <div class="fr-music-track" data-track="piano"><span class="fr-music-track-icon">🎹</span><div class="fr-music-track-info"><div class="fr-music-track-name">528调式钢琴</div><span class="fr-music-track-desc">五声音阶 · 宁静</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('piano')">▶</button></div>
          <div class="fr-music-track" data-track="rain"><span class="fr-music-track-icon">🌧️</span><div class="fr-music-track-info"><div class="fr-music-track-name">夜雨</div><span class="fr-music-track-desc">细密雨声 · 静谧</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('rain')">▶</button></div>
          <div class="fr-music-track" data-track="ocean"><span class="fr-music-track-icon">🌊</span><div class="fr-music-track-info"><div class="fr-music-track-name">海浪</div><span class="fr-music-track-desc">潮汐呼吸 · 放松</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('ocean')">▶</button></div>
          <div class="fr-music-track" data-track="water"><span class="fr-music-track-icon">💧</span><div class="fr-music-track-info"><div class="fr-music-track-name">山涧流水</div><span class="fr-music-track-desc">溪流 · 清澈</span></div><button class="fr-music-play-btn" onclick="frSelectTrack('water')">▶</button></div>
        </div>
      </div>
      <div class="fr-music-source-panel" id="frMpanel-import">
        <div class="fr-music-import-zone" id="frImportDropZone"
             onclick="document.getElementById('frImportFileInput').click()"
             ondragover="frHandleImportDragOver(event)"
             ondragleave="frHandleImportDragLeave(event)"
             ondrop="frHandleImportDrop(event)">
          <div class="fr-music-import-icon">🎵</div>
          <div class="fr-music-import-text">点击选择音乐文件<br>或将文件拖拽至此</div>
          <div class="fr-music-import-sub">支持 MP3 · WAV · AAC · OGG · FLAC</div>
        </div>
        <input type="file" id="frImportFileInput" accept="audio/*" multiple style="display:none" onchange="frHandleImportFile(this.files)">
        <div class="fr-music-imported-list" id="frImportedList">
          <div class="fr-music-import-empty">还没有导入的音乐</div>
        </div>
      </div>
      <div class="fr-music-source-panel" id="frMpanel-record">
        <div class="fr-music-record-panel">
          <div class="fr-record-bg-section">
            <div class="fr-record-bg-label">① 选择混音背景（可跳过）</div>
            <div class="fr-record-bg-grid" id="frRecordBgGrid">
              <div class="fr-record-bg-item" data-track="" onclick="frSelectRecordBg(this,'')"><span class="fr-record-bg-icon">🔇</span><span class="fr-record-bg-name">纯人声</span></div>
              <div class="fr-record-bg-item" data-track="bowl" onclick="frSelectRecordBg(this,'bowl')"><span class="fr-record-bg-icon">🔔</span><span class="fr-record-bg-name">冥想钵</span></div>
              <div class="fr-record-bg-item" data-track="deepbowl" onclick="frSelectRecordBg(this,'deepbowl')"><span class="fr-record-bg-icon">🎐</span><span class="fr-record-bg-name">颂钵</span></div>
              <div class="fr-record-bg-item" data-track="hz528" onclick="frSelectRecordBg(this,'hz528')"><span class="fr-record-bg-icon">💚</span><span class="fr-record-bg-name">528Hz</span></div>
              <div class="fr-record-bg-item" data-track="awaken" onclick="frSelectRecordBg(this,'awaken')"><span class="fr-record-bg-icon">✨</span><span class="fr-record-bg-name">963Hz</span></div>
              <div class="fr-record-bg-item" data-track="schumann" onclick="frSelectRecordBg(this,'schumann')"><span class="fr-record-bg-icon">🌍</span><span class="fr-record-bg-name">舒曼</span></div>
              <div class="fr-record-bg-item" data-track="deep" onclick="frSelectRecordBg(this,'deep')"><span class="fr-record-bg-icon">🌌</span><span class="fr-record-bg-name">432Hz</span></div>
              <div class="fr-record-bg-item" data-track="piano" onclick="frSelectRecordBg(this,'piano')"><span class="fr-record-bg-icon">🎹</span><span class="fr-record-bg-name">钢琴</span></div>
              <div class="fr-record-bg-item" data-track="rain" onclick="frSelectRecordBg(this,'rain')"><span class="fr-record-bg-icon">🌧️</span><span class="fr-record-bg-name">夜雨</span></div>
              <div class="fr-record-bg-item" data-track="ocean" onclick="frSelectRecordBg(this,'ocean')"><span class="fr-record-bg-icon">🌊</span><span class="fr-record-bg-name">海浪</span></div>
              <div class="fr-record-bg-item" data-track="water" onclick="frSelectRecordBg(this,'water')"><span class="fr-record-bg-icon">💧</span><span class="fr-record-bg-name">流水</span></div>
            </div>
            <div class="fr-record-bg-vol-row" id="frRecordBgVolRow" style="display:none;">
              <span style="font-size:0.68rem;color:rgba(140,180,220,0.7);">背景音量</span>
              <input type="range" class="fr-music-volume" id="frRecordBgVol" min="0" max="100" value="40" oninput="frUpdateRecordBgVol(this.value)" style="flex:1;">
              <span style="font-size:0.68rem;color:rgba(140,180,220,0.7);" id="frRecordBgVolNum">40%</span>
            </div>
          </div>
          <div class="fr-record-bg-label">② 录制</div>
          <div class="fr-record-waveform" id="frRecordWaveform"></div>
          <div class="fr-record-timer" id="frRecordTimer">00:00</div>
          <div class="fr-record-btn-wrap">
            <button class="fr-record-btn" id="frRecordBtn" onclick="frToggleRecord()">🎙️</button>
          </div>
          <div class="fr-record-status" id="frRecordStatus">选好背景后点击开始录制</div>
          <div class="fr-record-actions" id="frRecordActions" style="display:none;">
            <button class="fr-record-action-btn fr-record-play-btn" onclick="frPlayRecording()">▶ 试听</button>
            <button class="fr-record-action-btn fr-record-save-btn" onclick="frSaveRecording()">💾 保存使用</button>
            <button class="fr-record-action-btn fr-record-discard-btn" onclick="frDiscardRecording()">✕ 丢弃</button>
          </div>
          <div class="fr-record-hint">录制时麦克风声音与背景音将混合为一个文件</div>
        </div>
      </div>
      <div class="fr-music-volume-row">
        <span class="fr-music-vol-icon">🔉</span>
        <input type="range" class="fr-music-volume" id="frMusicVolume" min="0" max="100" value="50" oninput="frSetMusicVolume(this.value)">
        <span class="fr-music-vol-icon">🔊</span>
      </div>
    </div>

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
        <li class="fr-sidebar-item" id="frNavGoals" onclick="frOpenTab('goals')"><span class="fr-icon">🎯</span><span>目标表</span><span class="fr-arrow">›</span></li>
        <li class="fr-sidebar-item" id="frNavGainbook" onclick="frOpenTab('gainbook')"><span class="fr-icon">📒</span><span>收获本</span><span class="fr-arrow">›</span></li>
        <li class="fr-sidebar-item" id="frNavAsst" onclick="frOpenAsst()"><span class="fr-icon">🫧</span><span>释放助手</span><span class="fr-arrow">›</span></li>
        <li class="fr-sidebar-item" onclick="frCloseSidebar();setTimeout(frToggleMusicPanel,300)"><span class="fr-icon">🎵</span><span>背景音</span><span class="fr-arrow">›</span></li>
        <li class="fr-sidebar-item" onclick="frCloseSidebar();setTimeout(frToggleLang,300)"><span class="fr-icon">🌐</span><span>语言</span><span class="fr-arrow">›</span></li>
        <li class="fr-sidebar-item" onclick="frToggleSupport()" style="border-top:1px solid rgba(255,255,255,0.12);margin-top:4px;"><span class="fr-icon">☕</span><span>支持我们的网站</span><span class="fr-arrow">›</span></li>
      </ul>
    </div>

    <!-- Language Panel -->
    <div class="fr-lang-panel" id="frLangPanel">
      <div class="fr-lang-title">选 择 语 言</div>
      <div class="fr-lang-option active" id="frLangZh" onclick="frSelectLang('zh')"><span>中文</span><span class="fr-lang-check" id="frCheckZh">✓</span></div>
      <div class="fr-lang-option" id="frLangEn" onclick="frSelectLang('en')"><span>English</span><span class="fr-lang-check" id="frCheckEn" style="opacity:0">✓</span></div>
    </div>

    <!-- Main Modal: Goals + Gainbook -->
    <div class="fr-modal-overlay" id="frMainOverlay" onclick="frCloseModalOnBg(event,'frMainOverlay')">
      <div class="fr-modal-box" id="frMainModalBox">
        <div class="fr-modal-header" style="margin-bottom:0;">
          <div class="fr-modal-tabs" style="flex:1;">
            <button class="fr-modal-tab active" id="frTabBtnGoals" onclick="frSwitchTab('goals')">🎯 目标表</button>
            <button class="fr-modal-tab" id="frTabBtnGainbook" onclick="frSwitchTab('gainbook')">📒 收获本</button>
          </div>
          <button class="fr-modal-close" onclick="frCloseNav()" style="margin-left:12px;margin-bottom:2px;">✕</button>
        </div>

        <!-- GOALS TAB -->
        <div class="fr-tab-panel active" id="frTabGoals">
          <div class="fr-goals-panel">
            <div class="gain-cats" id="frGoalCats" style="margin-bottom:10px;">
              <button class="gain-cat active" data-cat="健康" onclick="frSelectGoalCat(this)">🌿 健康</button>
              <button class="gain-cat" data-cat="财富" onclick="frSelectGoalCat(this)">💰 财富</button>
              <button class="gain-cat" data-cat="SP" onclick="frSelectGoalCat(this)">💞 SP</button>
              <button class="gain-cat" data-cat="人际关系" onclick="frSelectGoalCat(this)">🤝 人际关系</button>
              <button class="gain-cat" data-cat="学业" onclick="frSelectGoalCat(this)">📚 学业</button>
              <button class="gain-cat" data-cat="工作" onclick="frSelectGoalCat(this)">💼 工作</button>
              <button class="gain-cat" data-cat="其他" onclick="frSelectGoalCat(this)">✨ 其他</button>
            </div>
            <div class="fr-goals-add-row">
              <input type="text" id="frGoalInput" placeholder="写下想要释放的目标…" maxlength="60"
                     onkeydown="if(event.key==='Enter')frAddGoal()" />
              <button onclick="frAddGoal()">添加</button>
            </div>
            <ul class="fr-goals-list" id="frGoalsList"></ul>
          </div>
        </div>

        <!-- GAINBOOK TAB -->
        <div class="fr-tab-panel" id="frTabGainbook">
          <div>
            <div style="font-size:0.72rem;color:#5a7aa0;font-family:'Noto Sans SC',sans-serif;margin-bottom:10px;letter-spacing:0.04em;">记录每一次释放后的收获与领悟，与所有人共享</div>
            <div class="gain-cats" id="frGainCats">
              <button class="gain-cat active" data-cat="健康" onclick="frSelectGainCat(this)">🌿 健康</button>
              <button class="gain-cat" data-cat="财富" onclick="frSelectGainCat(this)">💰 财富</button>
              <button class="gain-cat" data-cat="SP" onclick="frSelectGainCat(this)">💞 SP</button>
              <button class="gain-cat" data-cat="人际关系" onclick="frSelectGainCat(this)">🤝 人际关系</button>
              <button class="gain-cat" data-cat="学业" onclick="frSelectGainCat(this)">📚 学业</button>
              <button class="gain-cat" data-cat="工作" onclick="frSelectGainCat(this)">💼 工作</button>
              <button class="gain-cat" data-cat="其他" onclick="frSelectGainCat(this)">✨ 其他</button>
            </div>
            <div class="gain-input-row" style="margin-top:10px;">
              <input type="text" id="frGainInput" placeholder="写下你释放后的收获…" maxlength="80"
                     onkeydown="if(event.key==='Enter')frSubmitGain()" />
              <button onclick="frSubmitGain()">记录</button>
            </div>
            <div class="gain-filter-row">
              <span class="gain-filter-label">筛选：</span>
              <button class="gain-filter active" data-filter="all" onclick="frSelectGainFilter(this)">全部</button>
              <button class="gain-filter" data-filter="健康" onclick="frSelectGainFilter(this)">🌿</button>
              <button class="gain-filter" data-filter="财富" onclick="frSelectGainFilter(this)">💰</button>
              <button class="gain-filter" data-filter="SP" onclick="frSelectGainFilter(this)">💞</button>
              <button class="gain-filter" data-filter="人际关系" onclick="frSelectGainFilter(this)">🤝</button>
              <button class="gain-filter" data-filter="学业" onclick="frSelectGainFilter(this)">📚</button>
              <button class="gain-filter" data-filter="工作" onclick="frSelectGainFilter(this)">💼</button>
              <button class="gain-filter" data-filter="其他" onclick="frSelectGainFilter(this)">✨</button>
            </div>
            <div class="gain-section-title" id="frMyGainTitle">我的记录</div>
            <ul class="gain-list" id="frMyGainList"><li class="gain-loading">加载中…</li></ul>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;">
              <div class="gain-section-title" id="frSharedGainTitle" style="margin:0;">所有人的收获</div>
              <div style="display:flex;gap:6px;">
                <button class="gain-sort-btn active" id="frSortLikes" onclick="frSetSort('likes')">❤️ 最多赞</button>
                <button class="gain-sort-btn" id="frSortTime" onclick="frSetSort('time')">🕐 最新</button>
              </div>
            </div>
            <ul class="gain-list" id="frSharedGainList"><li class="gain-loading">加载中…</li></ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Assistant Modal -->
    <div class="fr-modal-overlay" id="frAsstOverlay" onclick="frCloseModalOnBg(event,'frAsstOverlay')">
      <div class="fr-modal-box" id="frAsstModalBox">
        <div class="fr-modal-header">
          <span class="fr-modal-title">🫧 释放助手</span>
          <button class="fr-modal-close" onclick="frCloseAsst()">✕</button>
        </div>
        <div class="fr-asst-panel">
          <p class="fr-asst-subtitle">写下你对这个目标的感受、担忧或执着，释放助手会帮你看见背后的欲望模式。</p>
          <textarea class="fr-asst-textarea" id="frAsstInput" placeholder="例如：我很担心项目做不好，害怕别人觉得我能力不足……"></textarea>
          <button class="fr-asst-submit" id="frAsstSubmit" onclick="frRunAssistant()">✨ 分析</button>
          <div class="fr-asst-loading" id="frAsstLoading" style="display:none;">
            <div class="fr-asst-dot"></div><div class="fr-asst-dot"></div><div class="fr-asst-dot"></div>
            <span>正在感受你的文字…</span>
          </div>
          <div class="fr-asst-result" id="frAsstResult">
            <div class="fr-asst-desire-badges" id="frAsstBadges"></div>
            <div class="fr-asst-analysis" id="frAsstAnalysis"></div>
            <button class="fr-asst-go-btn" id="frAsstGoBtn" onclick="frGoRelease()">🫧 去释放这些想要</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Support Panel -->
    <div class="fr-support-panel" id="frSupportPanel">
      <div class="fr-support-title">☕ 支持我们的网站</div>
      <div class="fr-support-text">感谢你的支持！释放助手的 AI 功能需要 token 费用来维持运行，你的每一份支持都让更多人能够使用这个工具 🫧</div>
      <img class="fr-support-qr" src="data:image/webp;base64,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" alt="微信收款码" />
      <div class="fr-support-name">chiquita(*佳)</div>
      <button class="fr-support-close" onclick="frToggleSupport()">关闭</button>
    </div>
  `;

  var div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);

  // ═══════════════════════════════════════════════════
  //  CONSTANTS
  // ═══════════════════════════════════════════════════
  var SUPA_URL = 'https://ryoaxziysgdkjcjiuqti.supabase.co';
  var SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5b2F4eml5c2dka2pjaml1cXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDg2MDAsImV4cCI6MjA4OTA4NDYwMH0.ORG_8Ue8LjYfReMvKo1iQOFNGN7fcTz1_fMs8Gq1Kds';
  var CAT_ICONS = { '健康':'🌿', '财富':'💰', 'SP':'💞', '人际关系':'🤝', '学业':'📚', '工作':'💼', '其他':'✨' };
  var CAT_EN    = { '健康':'Health', '财富':'Wealth', 'SP':'SP', '人际关系':'Relations', '学业':'Study', '工作':'Work', '其他':'Other' };

  var frLang = localStorage.getItem('fr-lang') || 'zh';
  var frGoalSelectedCat = '健康';
  var frGainSelectedCat = '健康';
  var frGainFilter = 'all';
  var frGainSort = 'likes';
  var frLikedKeys = new Set();
  var frAsstPoints = [];

  // ═══════════════════════════════════════════════════
  //  SIDEBAR TOGGLE
  // ═══════════════════════════════════════════════════
  window.frToggleSidebar = function () {
    var open = document.getElementById('frSidebar').classList.contains('open');
    if (open) { frCloseSidebar(); } else {
      document.getElementById('frSidebar').classList.add('open');
      document.getElementById('frOverlay').classList.add('open');
      document.getElementById('frMenuBtn').style.display = 'none';
    }
  };
  window.frCloseSidebar = function () {
    document.getElementById('frSidebar').classList.remove('open');
    document.getElementById('frOverlay').classList.remove('open');
    document.getElementById('frMenuBtn').style.display = 'flex';
  };

  // ═══════════════════════════════════════════════════
  //  LANGUAGE
  // ═══════════════════════════════════════════════════
  window.frToggleLang = function () {
    document.getElementById('frLangPanel').classList.toggle('open');
  };
  window.frSelectLang = function (lang) {
    frLang = lang;
    document.getElementById('frLangZh').classList.toggle('active', lang === 'zh');
    document.getElementById('frLangEn').classList.toggle('active', lang === 'en');
    document.getElementById('frCheckZh').style.opacity = lang === 'zh' ? '1' : '0';
    document.getElementById('frCheckEn').style.opacity = lang === 'en' ? '1' : '0';
    localStorage.setItem('fr-lang', lang);
    document.dispatchEvent(new CustomEvent('fr-lang-change', { detail: lang }));
    setTimeout(function () { document.getElementById('frLangPanel').classList.remove('open'); }, 400);
  };

  // ═══════════════════════════════════════════════════
  //  MODAL HELPERS
  // ═══════════════════════════════════════════════════
  function frClearActiveNav() {
    document.querySelectorAll('.fr-sidebar-item').forEach(function (el) { el.classList.remove('active'); });
  }
  window.frOpenTab = function (tab) {
    frCloseSidebar();
    frClearActiveNav();
    var navEl = document.getElementById('frNav' + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (navEl) navEl.classList.add('active');
    document.getElementById('frMainOverlay').classList.add('open');
    frSwitchTab(tab);
  };
  window.frSwitchTab = function (tab) {
    document.querySelectorAll('.fr-modal-tab').forEach(function (b) { b.classList.remove('active'); });
    var tabBtn = document.getElementById('frTabBtn' + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (tabBtn) tabBtn.classList.add('active');
    document.querySelectorAll('.fr-tab-panel').forEach(function (p) { p.classList.remove('active'); });
    var panel = document.getElementById('frTab' + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (panel) panel.classList.add('active');
    if (tab === 'gainbook') frLoadGains();
    if (tab === 'goals') frRenderGoals();
    var box = document.getElementById('frMainModalBox');
    if (box) box.scrollTop = 0;
  };
  window.frCloseNav = function () {
    document.getElementById('frMainOverlay').classList.remove('open');
    frClearActiveNav();
  };
  window.frCloseModalOnBg = function (e, id) {
    if (e.target === document.getElementById(id)) {
      if (id === 'frAsstOverlay') frCloseAsst(); else frCloseNav();
    }
  };
  window.frOpenAsst = function () {
    frCloseSidebar();
    frClearActiveNav();
    var navEl = document.getElementById('frNavAsst');
    if (navEl) navEl.classList.add('active');
    document.getElementById('frAsstOverlay').classList.add('open');
    var box = document.getElementById('frAsstModalBox');
    if (box) box.scrollTop = 0;
  };
  window.frCloseAsst = function () {
    document.getElementById('frAsstOverlay').classList.remove('open');
    frClearActiveNav();
  };

  // ═══════════════════════════════════════════════════
  //  SUPPORT PANEL
  // ═══════════════════════════════════════════════════
  window.frToggleSupport = function () {
    document.getElementById('frSupportPanel').classList.toggle('open');
  };

  // ═══════════════════════════════════════════════════
  //  TOAST (self-contained, won't override page toast)
  // ═══════════════════════════════════════════════════
  function frShowToast(msg) {
    // Use page's showToast if available, otherwise use our own
    if (typeof window.showToast === 'function') { window.showToast(msg); return; }
    var t = document.getElementById('frToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'frToast';
      t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:rgba(20,50,100,0.9);color:#fff;padding:10px 20px;border-radius:20px;font-size:0.84rem;z-index:99999;opacity:0;transition:opacity 0.3s;pointer-events:none;font-family:"Noto Sans SC",sans-serif;white-space:nowrap;';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.style.opacity = '0'; }, 2500);
  }

  // ═══════════════════════════════════════════════════
  //  GOALS
  // ═══════════════════════════════════════════════════
  function frGetGoals() {
    try { return JSON.parse(localStorage.getItem('goals') || '[]'); } catch (_) { return []; }
  }
  function frSaveGoals(goals) {
    try { localStorage.setItem('goals', JSON.stringify(goals)); } catch (_) {}
  }
  window.frSelectGoalCat = function (btn) {
    document.querySelectorAll('#frGoalCats .gain-cat').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    frGoalSelectedCat = btn.dataset.cat;
  };
  function frEscapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function frRenderGoals() {
    var goals = frGetGoals();
    var list = document.getElementById('frGoalsList');
    if (!list) return;
    if (!goals.length) {
      list.innerHTML = '<li class="fr-goals-empty">' + (frLang === 'en' ? 'No goals yet. Add one above.' : '还没有目标，在上方添加吧。') + '</li>';
      return;
    }
    list.innerHTML = goals.map(function (g, i) {
      var icon = CAT_ICONS[g.cat] || '✨';
      var catLabel = frLang === 'en' ? (CAT_EN[g.cat] || g.cat) : g.cat;
      var badge = g.cat ? '<span class="gain-badge" style="margin-bottom:2px;">' + icon + ' ' + catLabel + '</span>' : '';
      var relBtn = frLang === 'en' ? '🫧 Release' : '🫧 释放';
      var dropBtn = frLang === 'en' ? '✨ Drop' : '✨ 掉落';
      return '<li class="fr-goal-item" id="fr-goal-item-' + i + '">'
        + badge
        + '<span class="fr-goal-item-text">' + frEscapeHtml(g.text) + '</span>'
        + '<div class="fr-goal-item-actions">'
        + '<button class="fr-goal-btn-release" onclick="frReleaseGoal(' + i + ')">' + relBtn + '</button>'
        + '<button class="fr-goal-btn-drop" onclick="frDropGoal(' + i + ')">' + dropBtn + '</button>'
        + '<button class="fr-goal-btn-del" onclick="frDeleteGoal(' + i + ')">✕</button>'
        + '</div></li>';
    }).join('');
  }
  window.frAddGoal = function () {
    var input = document.getElementById('frGoalInput');
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    var goals = frGetGoals();
    goals.unshift({ text: text, cat: frGoalSelectedCat, ts: Date.now() });
    frSaveGoals(goals);
    frRenderGoals();
  };
  window.frDeleteGoal = function (i) {
    var goals = frGetGoals();
    goals.splice(i, 1);
    frSaveGoals(goals);
    frRenderGoals();
  };
  window.frReleaseGoal = function (i) {
    var goals = frGetGoals();
    var goal = goals[i];
    if (!goal) return;
    // If page has its own releaseGoal (main sedona page), use it
    if (typeof window.releaseGoal === 'function') {
      window.releaseGoal(i);
    } else {
      frShowToast(frLang === 'en' ? '🫧 Go to the main page to release' : '🫧 请前往欲望释放页面进行释放');
    }
    frCloseNav();
  };
  window.frDropGoal = function (i) {
    var goals = frGetGoals();
    var goal = goals[i];
    if (!goal) return;
    frSubmitGainEntry(goal.text, goal.cat || '其他');
    goals.splice(i, 1);
    frSaveGoals(goals);
    frRenderGoals();
    frShowToast(frLang === 'en' ? '✨ Dropped into Gain Book' : '✨ 已掉落到收获本');
  };

  // ═══════════════════════════════════════════════════
  //  GAINBOOK
  // ═══════════════════════════════════════════════════
  function frGetMyItems() {
    try { return JSON.parse(sessionStorage.getItem('gainMy') || '[]'); } catch (_) { return []; }
  }
  function frSaveMyItems(items) {
    try { sessionStorage.setItem('gainMy', JSON.stringify(items)); } catch (_) {}
  }
  async function frSupaFetch(path, opts) {
    opts = opts || {};
    var res = await fetch(SUPA_URL + path, Object.assign({}, opts, {
      headers: Object.assign({
        'apikey': SUPA_KEY,
        'Authorization': 'Bearer ' + SUPA_KEY,
        'Content-Type': 'application/json',
        'Prefer': opts.prefer || '',
      }, opts.headers || {}),
    }));
    if (!res.ok) throw new Error(await res.text());
    var text = await res.text();
    return text ? JSON.parse(text) : null;
  }
  window.frSelectGainCat = function (btn) {
    document.querySelectorAll('#frGainCats .gain-cat').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    frGainSelectedCat = btn.dataset.cat;
  };
  window.frSelectGainFilter = function (btn) {
    document.querySelectorAll('#frTabGainbook .gain-filter').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    frGainFilter = btn.dataset.filter;
    frLoadGains();
  };
  window.frSetSort = function (s) {
    frGainSort = s;
    document.getElementById('frSortLikes').classList.toggle('active', s === 'likes');
    document.getElementById('frSortTime').classList.toggle('active', s === 'time');
    frLoadGains();
  };
  function frFormatRelTime(ts) {
    var diff = Date.now() - ts;
    if (frLang === 'en') {
      if (diff < 60000) return 'just now';
      if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
      if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
      return Math.floor(diff / 86400000) + 'd ago';
    }
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + ' 分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + ' 小时前';
    return Math.floor(diff / 86400000) + ' 天前';
  }
  async function frLoadGains() {
    var myEl = document.getElementById('frMyGainList');
    var sharedEl = document.getElementById('frSharedGainList');
    var myTitleEl = document.getElementById('frMyGainTitle');
    var sharedTitleEl = document.getElementById('frSharedGainTitle');
    if (!myEl || !sharedEl) return;
    sharedEl.innerHTML = '<li class="gain-loading">加载中…</li>';
    var myItems = frGetMyItems();
    if (frGainFilter !== 'all') myItems = myItems.filter(function (i) { return i.cat === frGainFilter; });
    if (myTitleEl) myTitleEl.textContent = (frLang === 'en' ? 'My Records (' : '我的记录（') + myItems.length + (frLang === 'en' ? ')' : '）');
    frRenderGainList(myEl, myItems, false);
    try {
      var order = frGainSort === 'likes' ? 'likes.desc,ts.desc' : 'ts.desc';
      var url = '/rest/v1/gain_entries?select=*&order=' + order;
      if (frGainFilter !== 'all') url += '&cat=eq.' + encodeURIComponent(frGainFilter);
      var items = await frSupaFetch(url);
      if (sharedTitleEl) sharedTitleEl.textContent = (frLang === 'en' ? 'Everyone\'s Gains (' : '所有人的收获（') + ((items || []).length) + (frLang === 'en' ? ')' : '）');
      frRenderGainList(sharedEl, items || [], true);
    } catch (e) {
      sharedEl.innerHTML = '<li class="gain-empty">加载失败：' + frEscapeHtml(e.message.slice(0, 80)) + '</li>';
    }
  }
  function frRenderGainList(el, items, isShared) {
    if (!items.length) {
      var emptyText = isShared
        ? (frLang === 'en' ? 'No one has shared yet — be the first 🌸' : '还没有人分享，成为第一个吧 🌸')
        : (frLang === 'en' ? 'No gains yet' : '暂无记录');
      el.innerHTML = '<li class="gain-empty">' + emptyText + '</li>';
      return;
    }
    el.innerHTML = items.map(function (item) {
      var icon = CAT_ICONS[item.cat] || '🌸';
      var catDisp = frLang === 'en' ? (CAT_EN[item.cat] || item.cat) : item.cat;
      var badge = item.cat ? '<span class="gain-badge">' + icon + ' ' + catDisp + '</span>' : '';
      var likes = item.likes || 0;
      var itemId = isShared ? (item.id + '') : (item.ts + '');
      var liked = frLikedKeys.has(itemId);
      var likeBtn = isShared
        ? '<button class="gain-like-btn ' + (liked ? 'liked' : '') + '" onclick="frLikeGain(\'' + item.id + '\', this)">'
          + (liked ? '❤️' : '🤍') + ' <span class="gain-like-count">' + (likes > 0 ? likes : (frLang === 'en' ? 'Like' : '赞')) + '</span></button>'
        : '<span class="gain-meta">' + (likes > 0 ? '❤️ ' + likes : '') + '</span>';
      return '<li class="gain-item ' + (isShared ? 'shared' : '') + '">'
        + '<span class="gain-text">' + frEscapeHtml(item.text) + '</span>'
        + '<div class="gain-footer"><div style="display:flex;align-items:center;gap:6px;">'
        + badge + '<span class="gain-meta">' + frFormatRelTime(item.ts) + '</span></div>'
        + likeBtn + '</div></li>';
    }).join('');
  }
  window.frLikeGain = async function (id, btn) {
    if (frLikedKeys.has(id + '')) return;
    frLikedKeys.add(id + '');
    btn.classList.add('liked');
    btn.innerHTML = '❤️ <span class="gain-like-count">…</span>';
    try {
      var rows = await frSupaFetch('/rest/v1/gain_entries?id=eq.' + id + '&select=likes');
      var current = (rows && rows[0]) ? (rows[0].likes || 0) : 0;
      var newLikes = current + 1;
      await frSupaFetch('/rest/v1/gain_entries?id=eq.' + id, {
        method: 'PATCH', prefer: 'return=minimal',
        body: JSON.stringify({ likes: newLikes }),
      });
      btn.querySelector('.gain-like-count').textContent = newLikes;
    } catch (_) {
      btn.querySelector('.gain-like-count').textContent = frLang === 'en' ? 'Like' : '赞';
    }
  };
  async function frSubmitGainEntry(text, cat) {
    var entry = { text: text, cat: cat, ts: Date.now(), likes: 0 };
    var myItems = frGetMyItems();
    myItems.unshift(entry);
    if (myItems.length > 30) myItems.splice(30);
    frSaveMyItems(myItems);
    try {
      await frSupaFetch('/rest/v1/gain_entries', {
        method: 'POST', prefer: 'return=minimal',
        body: JSON.stringify(entry),
      });
    } catch (_) {}
  }
  window.frSubmitGain = async function () {
    var input = document.getElementById('frGainInput');
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    await frSubmitGainEntry(text, frGainSelectedCat);
    var icon = CAT_ICONS[frGainSelectedCat] || '✨';
    frShowToast((frLang === 'en' ? '✨ Recorded under ' : '✨ 已记录到') + icon + ' ' + (frLang === 'en' ? (CAT_EN[frGainSelectedCat] || frGainSelectedCat) : frGainSelectedCat));
    frLoadGains();
  };

  // ═══════════════════════════════════════════════════
  //  RELEASE ASSISTANT
  // ═══════════════════════════════════════════════════
  var FR_DESIRE_INFO = {
    control:  { get label() { return frLang === 'en' ? 'Wanting to Control' : '想要控制'; }, cls: 'bc' },
    approval: { get label() { return frLang === 'en' ? 'Wanting Approval' : '想要被认同'; }, cls: 'ba' },
    safety:   { get label() { return frLang === 'en' ? 'Wanting Security' : '想要安全'; }, cls: 'bs' },
  };

  function frGetSystemPrompt() {
    if (frLang === 'en') {
      return 'You are a deep psychological insight guide, expert in the Sedona Method.\n\n'
        + 'The three core desires:\n'
        + '- control: craving to control situations, outcomes, others; fear of losing control\n'
        + '- approval: craving acceptance, validation, love; fear of rejection, criticism, abandonment\n'
        + '- safety: craving stability, certainty, permanence; fear of loss, change, harm\n\n'
        + 'Reply ONLY in this JSON format:\n'
        + '{"points":[{"quote":"brief phrase max 20 words","desire":"control|approval|safety","reason":"insight 40-60 words"}]}\n\n'
        + 'No limit on number of points. List every insight.';
    }
    return '你是一位深度心理洞察师，精通圣多纳释放法（Sedona Method）。\n\n'
      + '三种核心欲望：\n'
      + '- control（想要控制）：渴望掌控局面、结果、他人；害怕失控\n'
      + '- approval（想要被认同）：渴望被接受、肯定、爱；害怕被拒绝\n'
      + '- safety（想要安全）：渴望稳定、保障、确定；害怕失去、改变\n\n'
      + '严格用以下JSON格式回复，不要任何其他内容：\n'
      + '{"points":[{"quote":"从用户原文提炼的短句不超过20字","desire":"control或approval或safety","reason":"深度洞察40-60字"}]}\n\n'
      + '不要限制条数，每个值得洞察的点都单独列出。';
  }

  window.frRunAssistant = async function () {
    var text = document.getElementById('frAsstInput').value.trim();
    if (!text) { frShowToast(frLang === 'en' ? 'Please write something first' : '请先写下你的感受'); return; }
    var loadingEl = document.getElementById('frAsstLoading');
    var resultEl = document.getElementById('frAsstResult');
    loadingEl.style.display = 'flex';
    resultEl.classList.remove('show');
    try {
      var res = await fetch('https://api.freedreleasing.com/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-chat',
          max_tokens: 1200,
          messages: [
            { role: 'system', content: frGetSystemPrompt() },
            { role: 'user', content: text },
          ],
        }),
      });
      var data = await res.json();
      if (data.error) throw new Error(data.error.message);
      var raw = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
      if (!raw) throw new Error('empty response');
      var json = { points: [] };
      try {
        var start = raw.indexOf('{');
        var end = raw.lastIndexOf('}');
        json = JSON.parse(raw.slice(start, end + 1));
      } catch (_) {}
      frAsstPoints = (json.points || []).filter(function (p) { return FR_DESIRE_INFO[p.desire]; });
      if (!frAsstPoints.length) throw new Error(frLang === 'en' ? 'Could not parse response' : '解析失败，请重试');

      resultEl.innerHTML = '<div class="fr-asst-desire-badges" id="frAsstBadges"></div>'
        + '<div class="fr-asst-analysis" id="frAsstAnalysis"></div>'
        + '<button class="fr-asst-go-btn" id="frAsstGoBtn" onclick="frGoRelease()">'
        + (frLang === 'en' ? '🫧 Go Release These' : '🫧 去释放这些想要') + '</button>';

      var seenBadge = new Set();
      document.getElementById('frAsstBadges').innerHTML = frAsstPoints
        .filter(function (p) { return !seenBadge.has(p.desire) && seenBadge.add(p.desire); })
        .map(function (p) { return '<span class="fr-asst-badge ' + FR_DESIRE_INFO[p.desire].cls + '">' + FR_DESIRE_INFO[p.desire].label + '</span>'; })
        .join('');

      document.getElementById('frAsstAnalysis').innerHTML = frAsstPoints.map(function (p) {
        return '<div class="fr-asst-point">'
          + '<span class="fr-asst-point-badge ' + FR_DESIRE_INFO[p.desire].cls + '">' + FR_DESIRE_INFO[p.desire].label + '</span>'
          + '<div class="fr-asst-point-body">'
          + '<span class="fr-asst-point-quote">「' + frEscapeHtml(p.quote) + '」</span>'
          + '<span class="fr-asst-point-reason">' + frEscapeHtml(p.reason) + '</span>'
          + '</div></div>';
      }).join('');

      resultEl.classList.add('show');
    } catch (e) {
      var msg = (e && e.message) ? e.message : String(e);
      frShowToast('❌ ' + msg.slice(0, 80));
      var resultEl2 = document.getElementById('frAsstResult');
      resultEl2.innerHTML = '<div style="padding:12px;color:#c04040;font-size:0.78rem;line-height:1.6;font-family:monospace;word-break:break-all;">错误：' + msg + '</div>';
      resultEl2.classList.add('show');
    } finally {
      loadingEl.style.display = 'none';
    }
  };

  window.frGoRelease = function () {
    // If on main sedona page and startReleaseQueue exists, use it
    if (typeof window.startReleaseQueue === 'function' && typeof window.asstPoints !== 'undefined') {
      window.asstPoints = frAsstPoints;
      window.startReleaseQueue();
    } else {
      // Navigate to main page
      frCloseAsst();
      frShowToast(frLang === 'en' ? '🫧 Navigating to release page…' : '🫧 正在前往欲望释放页…');
      setTimeout(function () { location.href = '/'; }, 800);
    }
  };

  // ═══════════════════════════════════════════════════
  //  MUSIC ENGINE
  // ═══════════════════════════════════════════════════
  var frAudioCtx = null;
  var frMasterGain = null;
  var frCurrentTrack = null;
  var frMusicStopFns = [];
  var frMusicPlaying = false;
  var frMusicPanelOpen = false;
  var frCurrentImportId = null;
  var frImportedTracks = [];
  var frImportAudioEl = null;
  var frRecordingActive = false;
  var frRecordBlob = null;
  var frRecordObjectUrl = null;
  var frRecordTimerSec = 0;
  var frRecordTimerInt = null;
  var frRecordAnalyser = null;
  var frRecordAnimFrame = null;
  var frRecordMicStream = null;
  var frRecordBgTrack = '';
  var frRecordBgGainNode = null;
  var frRecordBgStopFn = null;
  var frMediaRecorder = null;
  var frRecordChunks = [];
  var frRecordPreviewEl = null;

  function frUnlockAudio() {
    if (!frAudioCtx) return;
    var buf = frAudioCtx.createBuffer(1, 1, frAudioCtx.sampleRate);
    var src = frAudioCtx.createBufferSource();
    src.buffer = buf; src.connect(frAudioCtx.destination); src.start(0);
  }

  function frStopAllMusic() {
    frMusicStopFns.forEach(function(fn) { try { fn(); } catch(_) {} });
    frMusicStopFns = [];
    frMusicPlaying = false;
    var btn = document.getElementById('frMusicBtn');
    if (btn) btn.classList.remove('playing');
    document.querySelectorAll('.fr-music-track').forEach(function(t) {
      t.classList.remove('active');
      var pb = t.querySelector('.fr-music-play-btn');
      if (pb) { pb.textContent = '▶'; pb.classList.remove('playing'); }
    });
  }

  function frSetMusicVolume(v) {
    if (frMasterGain && frAudioCtx) frMasterGain.gain.setTargetAtTime(v / 100, frAudioCtx.currentTime, 0.05);
    var slider = document.getElementById('frMusicVolume');
    if (slider) slider.style.background = 'linear-gradient(to right,rgba(140,210,255,0.85) 0%,rgba(140,210,255,0.85) ' + v + '%,rgba(255,255,255,0.18) ' + v + '%)';
    if (frImportAudioEl) frImportAudioEl.volume = v / 100;
  }
  window.frSetMusicVolume = frSetMusicVolume;

  function frMakeMasterChain(ctx, dest, preGain) {
    var pre = ctx.createGain(); pre.gain.value = preGain || 1.0;
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20; comp.knee.value = 10; comp.ratio.value = 6;
    comp.attack.value = 0.003; comp.release.value = 0.3;
    var g = ctx.createGain(); g.gain.value = 0.65;
    pre.connect(comp); comp.connect(g); g.connect(dest);
    return pre;
  }

  function frPlayBowl() {
    var ctx = frAudioCtx, chain = frMakeMasterChain(ctx, frMasterGain, 1.2);
    var freqs = [99,132,198,264,396,528,594], stopped = false, idx = 0, timers = [];
    function strike(freq) {
      var now = ctx.currentTime;
      [[1,0.42],[2.756,0.12],[5.04,0.04]].forEach(function(p) {
        var osc = ctx.createOscillator(), g = ctx.createGain();
        osc.type='sine'; osc.frequency.value = freq*p[0];
        g.gain.setValueAtTime(0,now); g.gain.linearRampToValueAtTime(p[1],now+0.012);
        g.gain.exponentialRampToValueAtTime(0.0001,now+(p[0]===1?7:p[0]<3?4:2));
        osc.connect(g); g.connect(chain); osc.start(now); osc.stop(now+(p[0]===1?7.2:4.5));
      });
    }
    function schedule() { if(stopped)return; strike(freqs[idx++%freqs.length]); timers.push(setTimeout(schedule,3800+Math.random()*2200)); }
    schedule();
    frMusicStopFns.push(function(){ stopped=true; timers.forEach(clearTimeout); try{chain.disconnect();}catch(_){} });
  }

  function frPlay528() {
    var ctx = frAudioCtx, chain = frMakeMasterChain(ctx, frMasterGain, 0.55), nodes = [];
    [[528,0.28],[1056,0.08],[264,0.12],[792,0.06]].forEach(function(p) {
      var osc=ctx.createOscillator(), g=ctx.createGain(), lfo=ctx.createOscillator(), lfoG=ctx.createGain();
      osc.type='sine'; osc.frequency.value=p[0]; g.gain.value=p[1];
      lfo.type='sine'; lfo.frequency.value=0.06+Math.random()*0.04; lfoG.gain.value=p[1]*0.12;
      lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start(); osc.start();
      osc.connect(g); g.connect(chain); nodes.push(osc,g,lfo,lfoG);
    });
    frMusicStopFns.push(function(){ nodes.forEach(function(n){try{if(n.stop)n.stop();}catch(_){} try{n.disconnect();}catch(_){}}); try{chain.disconnect();}catch(_){} });
  }

  function frPlayWater() {
    var ctx=frAudioCtx, chain=frMakeMasterChain(ctx,frMasterGain,1.0), sr=ctx.sampleRate;
    var buf=ctx.createBuffer(2,sr*4,sr);
    for(var ch=0;ch<2;ch++){var d=buf.getChannelData(ch),b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;for(var i=0;i<d.length;i++){var w=Math.random()*2-1;b0=0.99886*b0+w*0.0555179;b1=0.99332*b1+w*0.0750759;b2=0.96900*b2+w*0.1538520;b3=0.86650*b3+w*0.3104856;b4=0.55000*b4+w*0.5329522;b5=-0.7616*b5-w*0.0168980;d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.18;b6=w*0.115926;}}
    var src=ctx.createBufferSource(); src.buffer=buf; src.loop=true;
    var lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2800;
    var hp=ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=220;
    src.connect(lp); lp.connect(hp); hp.connect(chain); src.start();
    frMusicStopFns.push(function(){try{src.stop();}catch(_){} try{chain.disconnect();}catch(_){}});
  }

  function frPlayPiano() {
    var ctx=frAudioCtx, chain=frMakeMasterChain(ctx,frMasterGain,0.8);
    var scales=[[264,330,396,528,660],[220,275,330,440,550],[198,247.5,297,396,495],[176,220,264,352,440]];
    var stopped=false,ci=0,timers=[];
    function playChord(){
      if(stopped)return;
      var now=ctx.currentTime, notes=scales[ci++%scales.length], pick=notes.filter(function(_,i){return[0,2,4].includes(i);});
      pick.forEach(function(freq,i){var osc=ctx.createOscillator(),g=ctx.createGain(),t=now+i*0.4;osc.type='triangle';osc.frequency.value=freq;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(0.3,t+0.25);g.gain.exponentialRampToValueAtTime(0.0001,t+7);osc.connect(g);g.connect(chain);osc.start(t);osc.stop(t+7.5);});
      timers.push(setTimeout(playChord,8000+Math.random()*3000));
    }
    playChord();
    frMusicStopFns.push(function(){stopped=true;timers.forEach(clearTimeout);try{chain.disconnect();}catch(_){}});
  }

  function frPlaySchumann() {
    var ctx=frAudioCtx, chain=frMakeMasterChain(ctx,frMasterGain,0.65), nodes=[], sr=ctx.sampleRate, dur=30;
    var buf=ctx.createBuffer(2,sr*dur,sr);
    for(var i=0;i<sr*dur;i++){buf.getChannelData(0)[i]=Math.sin(2*Math.PI*200*i/sr)*0.32;buf.getChannelData(1)[i]=Math.sin(2*Math.PI*207.83*i/sr)*0.32;}
    var src=ctx.createBufferSource(); src.buffer=buf; src.loop=true;
    var lfoOsc=ctx.createOscillator(),lfoG=ctx.createGain(),mainG=ctx.createGain();
    lfoOsc.type='sine'; lfoOsc.frequency.value=7.83; lfoG.gain.value=0.08; mainG.gain.value=0.55;
    lfoOsc.connect(lfoG); lfoG.connect(mainG.gain); src.connect(mainG); mainG.connect(chain);
    src.start(); lfoOsc.start(); nodes.push(lfoOsc,lfoG,mainG);
    frMusicStopFns.push(function(){try{src.stop();}catch(_){}nodes.forEach(function(n){try{if(n.stop)n.stop();}catch(_){} try{n.disconnect();}catch(_){}});try{chain.disconnect();}catch(_){}});
  }

  function frPlayDeep() {
    var ctx=frAudioCtx, chain=frMakeMasterChain(ctx,frMasterGain,0.42), nodes=[];
    [[432,0.22],[216,0.16],[108,0.12],[864,0.06],[54,0.08]].forEach(function(p,i){
      var osc=ctx.createOscillator(),g=ctx.createGain(),lfo=ctx.createOscillator(),lfoG=ctx.createGain();
      osc.type='sine'; osc.frequency.value=p[0]; g.gain.value=p[1];
      lfo.type='sine'; lfo.frequency.value=0.04+i*0.015; lfoG.gain.value=p[1]*0.15;
      lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start(); osc.start(); osc.connect(g); g.connect(chain);
      nodes.push(osc,g,lfo,lfoG);
    });
    var sr=ctx.sampleRate,nbuf=ctx.createBuffer(1,sr*3,sr),nd=nbuf.getChannelData(0);
    for(var i=0;i<nd.length;i++) nd[i]=(Math.random()*2-1);
    var nsrc=ctx.createBufferSource(); nsrc.buffer=nbuf; nsrc.loop=true;
    var nf=ctx.createBiquadFilter(); nf.type='lowpass'; nf.frequency.value=180; nf.Q.value=4;
    var ng=ctx.createGain(); ng.gain.value=0.08;
    nsrc.connect(nf); nf.connect(ng); ng.connect(chain); nsrc.start(); nodes.push(nsrc,nf,ng);
    frMusicStopFns.push(function(){nodes.forEach(function(n){try{if(n.stop)n.stop();}catch(_){} try{n.disconnect();}catch(_){}});try{chain.disconnect();}catch(_){}});
  }

  function frPlayAwaken() {
    var ctx=frAudioCtx, chain=frMakeMasterChain(ctx,frMasterGain,0.58), nodes=[], timers=[], stopped=false;
    [[963,0.18],[481.5,0.14],[1926,0.05],[321,0.10]].forEach(function(p){
      var osc=ctx.createOscillator(),g=ctx.createGain(),lfo=ctx.createOscillator(),lfoG=ctx.createGain();
      osc.type='sine'; osc.frequency.value=p[0]; g.gain.value=p[1];
      lfo.type='sine'; lfo.frequency.value=0.05+Math.random()*0.05; lfoG.gain.value=p[1]*0.1;
      lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start(); osc.start(); osc.connect(g); g.connect(chain);
      nodes.push(osc,g,lfo,lfoG);
    });
    function ding(){if(stopped)return;var now=ctx.currentTime,osc=ctx.createOscillator(),g=ctx.createGain();osc.type='sine';osc.frequency.value=963*(1+Math.random()*0.01);g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(0.22,now+0.01);g.gain.exponentialRampToValueAtTime(0.0001,now+5);osc.connect(g);g.connect(chain);osc.start(now);osc.stop(now+5.5);timers.push(setTimeout(ding,5000+Math.random()*4000));}
    ding();
    frMusicStopFns.push(function(){stopped=true;timers.forEach(clearTimeout);nodes.forEach(function(n){try{if(n.stop)n.stop();}catch(_){} try{n.disconnect();}catch(_){}});try{chain.disconnect();}catch(_){}});
  }

  function frPlayRain() {
    var ctx=frAudioCtx, chain=frMakeMasterChain(ctx,frMasterGain,0.95), nodes=[], timers=[], stopped=false;
    function makeRainLayer(bufDur,lpFreq,hpFreq,vol){
      var sr=ctx.sampleRate,buf=ctx.createBuffer(2,sr*bufDur,sr);
      for(var ch=0;ch<2;ch++){var d=buf.getChannelData(ch),b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;for(var i=0;i<d.length;i++){var w=Math.random()*2-1;b0=0.99886*b0+w*0.0555179;b1=0.99332*b1+w*0.0750759;b2=0.96900*b2+w*0.1538520;b3=0.86650*b3+w*0.3104856;b4=0.55000*b4+w*0.5329522;b5=-0.7616*b5-w*0.0168980;d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.22;b6=w*0.115926;}}
      var src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
      var lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=lpFreq;
      var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=hpFreq;
      var g=ctx.createGain();g.gain.value=vol;
      src.connect(lp);lp.connect(hp);hp.connect(g);g.connect(chain);src.start();nodes.push(src,lp,hp,g);
    }
    makeRainLayer(5,4000,400,0.55); makeRainLayer(7,1200,150,0.3);
    function raindrop(){if(stopped)return;var now=ctx.currentTime,osc=ctx.createOscillator(),g=ctx.createGain();osc.type='sine';osc.frequency.value=600+Math.random()*400;osc.frequency.exponentialRampToValueAtTime(200+Math.random()*100,now+0.08);g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(0.12+Math.random()*0.08,now+0.005);g.gain.exponentialRampToValueAtTime(0.0001,now+0.12);osc.connect(g);g.connect(chain);osc.start(now);osc.stop(now+0.14);timers.push(setTimeout(raindrop,200+Math.random()*800));}
    timers.push(setTimeout(raindrop,Math.random()*500));
    frMusicStopFns.push(function(){stopped=true;timers.forEach(clearTimeout);nodes.forEach(function(n){try{if(n.stop)n.stop();}catch(_){} try{n.disconnect();}catch(_){}});try{chain.disconnect();}catch(_){}});
  }

  function frPlayOcean() {
    var ctx=frAudioCtx, chain=frMakeMasterChain(ctx,frMasterGain,0.9), nodes=[], sr=ctx.sampleRate;
    var buf=ctx.createBuffer(2,sr*8,sr);
    for(var ch=0;ch<2;ch++){var d=buf.getChannelData(ch),b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;for(var i=0;i<d.length;i++){var w=Math.random()*2-1;b0=0.99886*b0+w*0.0555179;b1=0.99332*b1+w*0.0750759;b2=0.96900*b2+w*0.1538520;b3=0.86650*b3+w*0.3104856;b4=0.55000*b4+w*0.5329522;b5=-0.7616*b5-w*0.0168980;d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.28;b6=w*0.115926;}}
    var src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
    var lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=800;
    var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=60;
    var g=ctx.createGain();g.gain.value=0.5;
    var lfo=ctx.createOscillator(),lfoG=ctx.createGain();lfo.type='sine';lfo.frequency.value=0.12;lfoG.gain.value=0.38;lfo.connect(lfoG);lfoG.connect(g.gain);lfo.start();
    src.connect(lp);lp.connect(hp);hp.connect(g);g.connect(chain);src.start();nodes.push(src,lp,hp,g,lfo,lfoG);
    frMusicStopFns.push(function(){nodes.forEach(function(n){try{if(n.stop)n.stop();}catch(_){} try{n.disconnect();}catch(_){}});try{chain.disconnect();}catch(_){}});
  }

  function frPlayDeepBowl() {
    var ctx=frAudioCtx, chain=frMakeMasterChain(ctx,frMasterGain,0.78), timers=[], stopped=false;
    var sets=[[174.61,261.63,392.00],[194.18,291.00,436.00],[220.00,330.00,440.00]], setIdx=0;
    function strikeSet(){
      if(stopped)return; var freqs=sets[setIdx++%sets.length], now=ctx.currentTime;
      freqs.forEach(function(freq,fi){[[1,0.36],[2.756,0.10],[4.07,0.04],[5.04,0.02]].forEach(function(p,hi){var osc=ctx.createOscillator(),g=ctx.createGain(),t=now+fi*0.6;osc.type='sine';osc.frequency.value=freq*p[0];g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(p[1],t+0.015);g.gain.exponentialRampToValueAtTime(0.0001,t+(hi===0?10:hi===1?6:3));osc.connect(g);g.connect(chain);osc.start(t);osc.stop(t+(hi===0?10.5:6.5));});});
      timers.push(setTimeout(strikeSet,12000+Math.random()*4000));
    }
    strikeSet();
    frMusicStopFns.push(function(){stopped=true;timers.forEach(clearTimeout);try{chain.disconnect();}catch(_){}});
  }

  var FR_TRACKS = {
    bowl:frPlayBowl, hz528:frPlay528, water:frPlayWater, piano:frPlayPiano,
    schumann:frPlaySchumann, deep:frPlayDeep, awaken:frPlayAwaken,
    rain:frPlayRain, ocean:frPlayOcean, deepbowl:frPlayDeepBowl
  };

  window.frSelectTrack = function(id) {
    if (!frAudioCtx) {
      try {
        frAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        frMasterGain = frAudioCtx.createGain();
        frMasterGain.gain.value = 0.45;
        frMasterGain.connect(frAudioCtx.destination);
      } catch(e) { frShowToast('❌ 浏览器不支持Web Audio'); return; }
    }
    if (frAudioCtx.state === 'suspended') frAudioCtx.resume();
    frUnlockAudio();
    if (frCurrentTrack === id && frMusicPlaying) { frStopAllMusic(); frCurrentTrack = null; return; }
    frStopAllMusic();
    frCurrentTrack = id; frMusicPlaying = true;
    FR_TRACKS[id]();
    var vol = document.getElementById('frMusicVolume').value;
    frMasterGain.gain.value = vol / 100;
    frSetMusicVolume(vol);
    document.getElementById('frMusicBtn').classList.add('playing');
    document.querySelectorAll('.fr-music-track').forEach(function(t) {
      t.classList.remove('active');
      var pb = t.querySelector('.fr-music-play-btn');
      if (pb) { pb.textContent = '▶'; pb.classList.remove('playing'); }
      if (t.dataset.track === id) { t.classList.add('active'); if (pb) { pb.textContent = '⏹'; pb.classList.add('playing'); } }
    });
  };

  window.frToggleMusicPanel = function() {
    if (!frAudioCtx) {
      try {
        frAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        frMasterGain = frAudioCtx.createGain();
        frMasterGain.gain.value = 0.45;
        frMasterGain.connect(frAudioCtx.destination);
      } catch(e) {}
    }
    if (frAudioCtx && frAudioCtx.state === 'suspended') frAudioCtx.resume();
    if (frAudioCtx) frUnlockAudio();
    frMusicPanelOpen = !frMusicPanelOpen;
    document.getElementById('frMusicPanel').classList.toggle('open', frMusicPanelOpen);
  };

  document.addEventListener('click', function(e) {
    if (frMusicPanelOpen && !e.target.closest('#frMusicPanel') && !e.target.closest('#frMusicBtn')) {
      frMusicPanelOpen = false;
      document.getElementById('frMusicPanel').classList.remove('open');
    }
  });

  window.frSwitchMusicSource = function(src) {
    ['builtin','import','record'].forEach(function(s) {
      document.getElementById('frMsrc-' + s).classList.toggle('active', s === src);
      document.getElementById('frMpanel-' + s).classList.toggle('active', s === src);
    });
    if (src === 'record') frInitRecordWaveform();
  };

  // ── LOCAL IMPORT ──
  window.frHandleImportDragOver = function(e) { e.preventDefault(); document.getElementById('frImportDropZone').classList.add('dragover'); };
  window.frHandleImportDragLeave = function() { document.getElementById('frImportDropZone').classList.remove('dragover'); };
  window.frHandleImportDrop = function(e) { e.preventDefault(); document.getElementById('frImportDropZone').classList.remove('dragover'); frHandleImportFile(e.dataTransfer.files); };
  window.frHandleImportFile = function(files) {
    if (!files || !files.length) return;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (!file.type.startsWith('audio/')) { frShowToast('❌ 请选择音频文件'); continue; }
      var url = URL.createObjectURL(file);
      var id = 'import-' + Date.now() + '-' + Math.random().toString(36).slice(2,6);
      frImportedTracks.push({ id:id, name:file.name.replace(/\.[^.]+$/,''), src:url, objectUrl:url });
      frRenderImportedList();
    }
    document.getElementById('frImportFileInput').value = '';
  };
  function frEnsureImportAudio() {
    if (!frImportAudioEl) { frImportAudioEl = new Audio(); frImportAudioEl.loop = true; }
    return frImportAudioEl;
  }
  function frRenderImportedList() {
    var list = document.getElementById('frImportedList');
    if (!frImportedTracks.length) { list.innerHTML = '<div class="fr-music-import-empty">还没有导入的音乐</div>'; return; }
    list.innerHTML = frImportedTracks.map(function(track) {
      return '<div class="fr-music-imported-item ' + (frCurrentImportId===track.id?'active':'') + '" onclick="frSelectImportTrack(\'' + track.id + '\')">'
        + '<span style="font-size:1.1rem;flex-shrink:0;">' + (frCurrentImportId===track.id?'▶':'🎵') + '</span>'
        + '<span class="fr-music-imported-name" title="' + frEscapeHtml(track.name) + '">' + frEscapeHtml(track.name) + '</span>'
        + '<button class="fr-music-imported-del" onclick="frDeleteImportTrack(event,\'' + track.id + '\')">✕</button>'
        + '</div>';
    }).join('');
  }
  window.frSelectImportTrack = function(id) {
    frEnsureImportAudio();
    if (frCurrentImportId === id && frMusicPlaying && frCurrentTrack === '__import__') {
      frStopAllMusic(); frCurrentImportId = null; frRenderImportedList(); return;
    }
    frStopAllMusic();
    var track = frImportedTracks.find(function(t) { return t.id === id; });
    if (!track) return;
    frCurrentImportId = id; frCurrentTrack = '__import__'; frMusicPlaying = true;
    frImportAudioEl.src = track.src;
    var vol = document.getElementById('frMusicVolume').value;
    frImportAudioEl.volume = vol / 100;
    frImportAudioEl.play().catch(function(e) { frShowToast('❌ 无法播放：' + e.message.slice(0,40)); });
    frMusicStopFns.push(function() { frImportAudioEl.pause(); frImportAudioEl.src = ''; });
    document.getElementById('frMusicBtn').classList.add('playing');
    frRenderImportedList();
  };
  window.frDeleteImportTrack = function(e, id) {
    e.stopPropagation();
    var idx = frImportedTracks.findIndex(function(t) { return t.id === id; });
    if (idx === -1) return;
    if (frCurrentImportId === id) { frStopAllMusic(); frCurrentImportId = null; }
    var track = frImportedTracks[idx];
    if (track.objectUrl) URL.revokeObjectURL(track.objectUrl);
    frImportedTracks.splice(idx, 1);
    frRenderImportedList();
  };

  // ── RECORDING ──
  window.frSelectRecordBg = function(btn, trackKey) {
    document.querySelectorAll('.fr-record-bg-item').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    frRecordBgTrack = trackKey;
    document.getElementById('frRecordBgVolRow').style.display = trackKey ? 'flex' : 'none';
  };
  window.frUpdateRecordBgVol = function(v) {
    document.getElementById('frRecordBgVolNum').textContent = v + '%';
    if (frRecordBgGainNode && frAudioCtx) frRecordBgGainNode.gain.setTargetAtTime(v/100, frAudioCtx.currentTime, 0.05);
  };
  function frInitRecordWaveform() {
    var wf = document.getElementById('frRecordWaveform');
    if (wf.children.length > 0) return;
    for (var i = 0; i < 28; i++) { var bar = document.createElement('div'); bar.className = 'fr-record-wave-bar'; bar.style.height = '4px'; wf.appendChild(bar); }
  }
  function frUpdateRecordTimer() {
    frRecordTimerSec++;
    var m = String(Math.floor(frRecordTimerSec/60)).padStart(2,'0');
    var s = String(frRecordTimerSec%60).padStart(2,'0');
    document.getElementById('frRecordTimer').textContent = m + ':' + s;
    if (frRecordTimerSec >= 300) frStopRecord();
  }
  function frAnimateWaveform() {
    if (!frRecordAnalyser) return;
    var data = new Uint8Array(frRecordAnalyser.frequencyBinCount);
    frRecordAnalyser.getByteFrequencyData(data);
    var bars = document.querySelectorAll('.fr-record-wave-bar');
    var step = Math.floor(data.length / bars.length);
    bars.forEach(function(bar, i) {
      var v = data[i*step] || 0;
      var h = 3 + (v/255)*34;
      bar.style.height = h + 'px';
      bar.style.background = v > 100 ? 'rgba(255,120,120,0.8)' : 'rgba(100,180,255,0.5)';
    });
    frRecordAnimFrame = requestAnimationFrame(frAnimateWaveform);
  }
  window.frToggleRecord = function() { if (frRecordingActive) { frStopRecord(); } else { frStartRecord(); } };
  async function frStartRecord() {
    if (!frAudioCtx) {
      try { frAudioCtx = new (window.AudioContext || window.webkitAudioContext)(); frMasterGain = frAudioCtx.createGain(); frMasterGain.gain.value = document.getElementById('frMusicVolume').value/100; frMasterGain.connect(frAudioCtx.destination); }
      catch(e) { frShowToast('❌ 浏览器不支持Web Audio'); return; }
    }
    if (frAudioCtx.state === 'suspended') await frAudioCtx.resume();
    try { frRecordMicStream = await navigator.mediaDevices.getUserMedia({ audio:true, video:false }); }
    catch(e) { frShowToast('❌ 无法访问麦克风：' + (e.message||'权限被拒绝')); return; }
    frRecordChunks = []; frRecordBlob = null;
    if (frRecordObjectUrl) { URL.revokeObjectURL(frRecordObjectUrl); frRecordObjectUrl = null; }
    frRecordTimerSec = 0;
    document.getElementById('frRecordTimer').textContent = '00:00';
    document.getElementById('frRecordTimer').classList.add('active');
    document.getElementById('frRecordActions').style.display = 'none';
    var mixDest = frAudioCtx.createMediaStreamDestination();
    var micSource = frAudioCtx.createMediaStreamSource(frRecordMicStream);
    frRecordAnalyser = frAudioCtx.createAnalyser(); frRecordAnalyser.fftSize = 64;
    var micGain = frAudioCtx.createGain(); micGain.gain.value = 1.0;
    micSource.connect(frRecordAnalyser); micSource.connect(micGain); micGain.connect(mixDest);
    frRecordBgGainNode = null; frRecordBgStopFn = null;
    if (frRecordBgTrack && FR_TRACKS[frRecordBgTrack]) {
      frRecordBgGainNode = frAudioCtx.createGain();
      frRecordBgGainNode.gain.value = document.getElementById('frRecordBgVol').value / 100;
      frRecordBgGainNode.connect(mixDest); frRecordBgGainNode.connect(frMasterGain);
      var savedMake = frMakeMasterChain;
      var patchedChain = function(ctx, dest, preGain) {
        var pre=ctx.createGain();pre.gain.value=preGain||1.0;var comp=ctx.createDynamicsCompressor();comp.threshold.value=-20;comp.knee.value=10;comp.ratio.value=6;comp.attack.value=0.003;comp.release.value=0.3;var g=ctx.createGain();g.gain.value=0.65;pre.connect(comp);comp.connect(g);g.connect(frRecordBgGainNode);return pre;
      };
      window.frMakeMasterChain = patchedChain;
      var stopsBefore = frMusicStopFns.length;
      FR_TRACKS[frRecordBgTrack]();
      window.frMakeMasterChain = savedMake;
      var bgStops = frMusicStopFns.splice(stopsBefore);
      frRecordBgStopFn = function() { bgStops.forEach(function(fn){try{fn();}catch(_){}}); };
    }
    var mimeType = '';
    ['audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus','audio/ogg'].forEach(function(mt){if(!mimeType&&MediaRecorder.isTypeSupported(mt))mimeType=mt;});
    frMediaRecorder = mimeType ? new MediaRecorder(mixDest.stream,{mimeType:mimeType}) : new MediaRecorder(mixDest.stream);
    frMediaRecorder.ondataavailable = function(e){if(e.data.size>0)frRecordChunks.push(e.data);};
    frMediaRecorder.onstop = frOnRecordStop;
    frMediaRecorder.start(100);
    frRecordingActive = true;
    frRecordTimerInt = setInterval(frUpdateRecordTimer, 1000);
    frAnimateWaveform();
    var btn = document.getElementById('frRecordBtn');
    btn.classList.add('recording'); btn.textContent = '⏹';
    document.getElementById('frRecordStatus').textContent = frRecordBgTrack ? '录制中（含背景混音）… 再次点击停止' : '录制中… 再次点击停止';
  }
  function frStopRecord() {
    if (!frMediaRecorder || frMediaRecorder.state === 'inactive') return;
    frMediaRecorder.stop();
    if (frRecordMicStream) frRecordMicStream.getTracks().forEach(function(t){t.stop();});
    if (frRecordBgStopFn) { frRecordBgStopFn(); frRecordBgStopFn = null; }
    clearInterval(frRecordTimerInt); cancelAnimationFrame(frRecordAnimFrame);
    frRecordAnimFrame = null; frRecordingActive = false; frRecordBgGainNode = null;
    var btn = document.getElementById('frRecordBtn');
    btn.classList.remove('recording'); btn.textContent = '🎙️';
    document.getElementById('frRecordTimer').classList.remove('active');
    document.querySelectorAll('.fr-record-wave-bar').forEach(function(b){b.style.height='4px';b.style.background='rgba(100,180,255,0.3)';});
  }
  function frOnRecordStop() {
    var mimeType = frMediaRecorder.mimeType || 'audio/webm';
    frRecordBlob = new Blob(frRecordChunks, {type:mimeType});
    frRecordObjectUrl = URL.createObjectURL(frRecordBlob);
    document.getElementById('frRecordBtn').classList.add('has-recording');
    document.getElementById('frRecordStatus').textContent = '录制完成！可以试听或保存使用';
    document.getElementById('frRecordActions').style.display = 'flex';
  }
  window.frPlayRecording = function() {
    if (!frRecordObjectUrl) return;
    if (!frRecordPreviewEl) frRecordPreviewEl = new Audio();
    if (!frRecordPreviewEl.paused) { frRecordPreviewEl.pause(); frRecordPreviewEl.currentTime=0; return; }
    frRecordPreviewEl.src = frRecordObjectUrl;
    frRecordPreviewEl.play().catch(function(){});
  };
  window.frSaveRecording = function() {
    if (!frRecordObjectUrl) return;
    var id = 'rec-'+Date.now();
    var dur = String(Math.floor(frRecordTimerSec/60)).padStart(2,'0')+':'+String(frRecordTimerSec%60).padStart(2,'0');
    var name = '🎙️ 我的录音 ' + dur;
    frImportedTracks.push({id:id, name:name, src:frRecordObjectUrl});
    frSwitchMusicSource('import');
    frRenderImportedList();
    frSelectImportTrack(id);
    document.getElementById('frRecordBtn').classList.remove('has-recording');
    document.getElementById('frRecordActions').style.display = 'none';
    document.getElementById('frRecordStatus').textContent = '已保存，正在播放混音';
    document.getElementById('frRecordTimer').textContent = '00:00';
    frRecordTimerSec = 0;
    frShowToast('🎙️ 混音已保存并开始播放');
  };
  window.frDiscardRecording = function() {
    if (frRecordObjectUrl) { URL.revokeObjectURL(frRecordObjectUrl); frRecordObjectUrl = null; }
    frRecordBlob = null; frRecordChunks = [];
    document.getElementById('frRecordBtn').classList.remove('has-recording');
    document.getElementById('frRecordActions').style.display = 'none';
    document.getElementById('frRecordStatus').textContent = '选好背景后点击开始录制';
    document.getElementById('frRecordTimer').textContent = '00:00';
    frRecordTimerSec = 0;
  };

  // ── init volume slider ──
  setTimeout(function(){
    var s = document.getElementById('frMusicVolume');
    if (s) s.style.background = 'linear-gradient(to right,rgba(140,210,255,0.85) 0%,rgba(140,210,255,0.85) 50%,rgba(255,255,255,0.18) 50%)';
  }, 0);

  // ═══════════════════════════════════════════════════
  //  INIT — restore saved language state
  // ═══════════════════════════════════════════════════
  (function () {
    var saved = localStorage.getItem('fr-lang') || 'zh';
    frLang = saved;
    document.getElementById('frLangZh').classList.toggle('active', saved === 'zh');
    document.getElementById('frLangEn').classList.toggle('active', saved === 'en');
    document.getElementById('frCheckZh').style.opacity = saved === 'zh' ? '1' : '0';
    document.getElementById('frCheckEn').style.opacity = saved === 'en' ? '1' : '0';
    setTimeout(function () {
      document.dispatchEvent(new CustomEvent('fr-lang-change', { detail: saved }));
    }, 0);
  })();

})();
