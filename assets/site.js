// Builds a mobile hamburger menu from the existing nav links, on every page.
// Progressive enhancement: if this never runs, the brand + Start free still work.
(function () {
  function init() {
    var header = document.querySelector('header.nav') || document.querySelector('nav.bar');
    if (!header) return;
    var linkbox = header.querySelector('.menu') || header.querySelector('.navlinks');
    if (!linkbox || header.querySelector('.burger')) return;

    var links = [].slice.call(linkbox.querySelectorAll('a'));
    var signin = header.querySelector('.si'); // homepage "Sign in"
    var startBtn = header.querySelector('.btn'); // the "Start free" CTA

    var burger = document.createElement('button');
    burger.className = 'burger';
    burger.setAttribute('aria-label', 'Menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';

    var panel = document.createElement('div');
    panel.className = 'mobnav';
    links.concat(signin ? [signin] : []).forEach(function (a) {
      if (!a) return;
      var c = a.cloneNode(true);
      c.removeAttribute('class');
      panel.appendChild(c);
    });
    // move the CTA into the menu and hide the crowded top-bar copy on mobile
    if (startBtn) {
      var sb = startBtn.cloneNode(true);
      sb.classList.add('mobcta');
      panel.appendChild(sb);
      startBtn.classList.add('nav-hide-m');
    }

    var host = header.querySelector('.navcta') || header.querySelector('.row');
    host.appendChild(burger);
    header.appendChild(panel);

    function close() {
      panel.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
    burger.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    var css = ''
      + '.burger{display:none;flex-direction:column;gap:4px;width:42px;height:42px;align-items:center;justify-content:center;background:transparent;border:1px solid var(--line,#e7e3da);border-radius:11px;cursor:pointer;padding:0;margin-left:6px;-webkit-tap-highlight-color:transparent}'
      + '.burger span{display:block;width:18px;height:2px;background:var(--ink,#171511);border-radius:2px;transition:transform .2s,opacity .2s}'
      + '.burger.open span:nth-child(1){transform:translateY(6px) rotate(45deg)}'
      + '.burger.open span:nth-child(2){opacity:0}'
      + '.burger.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}'
      + '.mobnav{display:none;flex-direction:column;position:absolute;left:0;right:0;top:100%;background:var(--paper,#f6f5f1);border-bottom:1px solid var(--line,#e7e3da);padding:6px 24px 16px;box-shadow:0 26px 44px -26px rgba(40,30,15,.45)}'
      + '.mobnav.open{display:flex}'
      + '.mobnav a{padding:13px 2px;font-size:16px;font-weight:500;color:var(--ink2,#605c53);border-bottom:1px solid var(--line,#e7e3da)}'
      + '.mobnav a:last-child{border-bottom:0}'
      + '.mobnav a:hover{color:var(--ink,#171511)}'
      + '.mobnav .mobcta{display:flex;justify-content:center;margin-top:12px;padding:13px;border-bottom:0;border-radius:11px;background:var(--accent,#e2502c);color:#fff;font-weight:600}'
      + '.mobnav .mobcta:hover{background:var(--accent-d,#bd3c1d)}'
      + '@media(max-width:880px){.burger{display:inline-flex}.nav-hide-m{display:none}}'
      + '@media(min-width:881px){.mobnav{display:none !important}}';
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
