/**
 * i18n.js · 全站中英文切换（English-first 默认）
 * ============================================
 * 严格白名单配对，不做动态包装（避免 <br> 与裸文本造成的错配）：
 *   块配对：<h3>中文</h3><div class="en">English</div>  → 互换 innerHTML
 *   内联配对：<h1>中文<span class="en">English</span></h1> → 父元素内容整体重排
 *   其余结构（父级是混排容器）→ 跳过，保持原样，不做任何破坏性操作
 *
 * 切换方式：写入 localStorage 后 reload，保证状态始终一致（绝无"半英文"）。
 */
(function () {
  var BLOCK_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'P', 'DIV', 'LI', 'DT', 'DD', 'TD', 'TH', 'B', 'STRONG', 'EM', 'I', 'SMALL'];
  var INLINE_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'P'];  // 标题/段落内联（中文+span.en）
  var pairs = [];

  function esc(s) { return s; }

  function collect() {
    document.querySelectorAll('.en').forEach(function (sec) {
      if (sec.dataset.i18nBound) return;
      var par = sec.parentElement;
      if (!par) return;

      // 1) 内联配对：父元素是标题/段落，且 .en 是它的子元素（如 <p>中文<br><span class="en">EN</span></p>）
      if (INLINE_TAGS.indexOf(par.tagName) >= 0 && !par.dataset.i18nBound) {
        // 用 cloneNode 保留完整文本节点（不拼接字符串，避免丢字/截断）
        var cnClone = par.cloneNode(true);
        var enInClone = cnClone.querySelector('.en');
        if (enInClone) enInClone.parentNode.removeChild(enInClone);
        // 去掉结尾多余的 <br>，避免英文与中文挤在一行
        var brs = cnClone.querySelectorAll('br');
        if (brs.length) brs[brs.length - 1].remove();
        pairs.push({
          type: 'inline', par: par,
          cnHTML: cnClone.innerHTML,
          enHTML: sec.innerHTML
        });
        par.dataset.i18nBound = '1';
        return;
      }

      // 2) 块配对：紧邻前一个兄弟是常见文本块
      var pri = sec.previousElementSibling;
      if (pri && pri !== sec && !pri.classList.contains('en') &&
          BLOCK_TAGS.indexOf(pri.tagName) >= 0 && !pri.dataset.i18nBound) {
        // 品牌名不参与语言互换（Fideight 不翻译）
        if (pri.classList.contains('brand')) { sec.dataset.i18nBound = '1'; return; }
        pairs.push({
          type: 'block', pri: pri, sec: sec,
          cnHTML: pri.innerHTML, enHTML: sec.innerHTML
        });
        pri.dataset.i18nBound = '1'; sec.dataset.i18nBound = '1';
      }
      // 3) 其他（混排容器）→ 不处理
    });
  }

  function apply(lang) {
    var en = lang === 'en';
    pairs.forEach(function (p) {
      if (p.type === 'block') {
        p.pri.innerHTML = en ? p.enHTML : p.cnHTML;
        p.sec.innerHTML = en ? p.cnHTML : p.enHTML;
        p.pri.classList.toggle('i18n-primary-en', en);
        p.sec.classList.toggle('i18n-sub-cn', en);
      } else {
        p.par.innerHTML = en
          ? esc(p.enHTML) + '<span class="en i18n-sub-cn">' + p.cnHTML + '</span>'
          : p.cnHTML + '<span class="en">' + p.enHTML + '</span>';
      }
    });
    document.body.classList.toggle('lang-en', en);
    document.documentElement.lang = en ? 'en' : 'zh-CN';
    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = en ? '中文' : 'EN';
  }

  window.toggleLang = function () {
    var cur = document.body.classList.contains('lang-en') ? 'cn' : 'en';
    try { localStorage.setItem('lang', cur); } catch (e) {}
    location.reload();
  };

  function init() {
    collect();
    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) {}
    apply(saved || 'zh');
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
