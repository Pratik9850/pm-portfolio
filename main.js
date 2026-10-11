(function () {
  // Mobile nav
  var btn = document.getElementById('menu-btn');
  var mnav = document.getElementById('mobile-nav');
  btn.addEventListener('click', function () {
    var open = mnav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mnav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mnav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Active nav link
  var links = document.querySelectorAll('.nav-links a');
  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var cur = '';
    sections.forEach(function (s) { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
    links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
  }, { passive: true });

  // Case study tabs
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    try { history.replaceState(null, '', '#' + tab.id.replace('tab-', 'case-')); } catch (e) {}
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); n.focus(); selectTab(n); }
    });
  });
  if (location.hash === '#case-aml') selectTab(document.getElementById('tab-aml'));

  // Toolkit filter
  var chips = document.querySelectorAll('.chip');
  var rows = document.querySelectorAll('.tk-row');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var f = c.getAttribute('data-f');
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      rows.forEach(function (r) { r.hidden = !(f === 'all' || r.getAttribute('data-cat') === f); });
    });
  });
})();
