function initScrollReveal() {
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('v');
        } else {
          e.target.classList.remove('v');
        }
      });
    }, { threshold: 0.05, rootMargin: '30px 0px 30px 0px' });
    document.querySelectorAll('#pg-overview .fi, #pg-overview .fi-left, #pg-overview .fi-right').forEach(function(el) {
      obs.observe(el);
    });
  } else {
    document.querySelectorAll('#pg-overview .fi, #pg-overview .fi-left, #pg-overview .fi-right').forEach(function(el) {
      el.classList.add('v');
    });
  }
}

function showPg(id) {
  var already = document.getElementById(id) && document.getElementById(id).classList.contains('active');
  document.querySelectorAll('.pg').forEach(function(p) { p.classList.remove('active'); });
  var t = document.getElementById(id);
  if (t) {
    t.classList.add('active');
    if (!already) window.scrollTo({ top: 0, behavior: 'instant' });
    if (id === 'pg-overview') {
      initScrollReveal();
    }
  }
}

function navTo(s) {
  var onOv = document.getElementById('pg-overview').classList.contains('active');
  if (!onOv) {
    showPg('pg-overview');
    setTimeout(function() {
      var el = document.getElementById(s);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  } else {
    var el = document.getElementById(s);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function openModal() { document.getElementById('ctModal').classList.add('open'); }
function closeModal() { document.getElementById('ctModal').classList.remove('open'); }

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

var root = document.documentElement;
var tbtn = document.getElementById('themeBtn');

function setTheme(t) {
  root.setAttribute('data-theme', t);
  tbtn.textContent = t === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  try {
    localStorage.setItem('rp-theme', t);
  } catch (e) {}
}

tbtn.addEventListener('click', function() {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

try {
  setTheme(localStorage.getItem('rp-theme') || 'dark');
} catch (e) {
  setTheme('dark');
}

setTimeout(function() {
  var b = document.getElementById('barB');
  var a = document.getElementById('barA');
  if (b) {
    b.style.width = '100%';
    b.classList.add('animated');
  }
  if (a) {
    a.style.width = '3.4%';
    a.style.minWidth = '76px';
    a.classList.add('animated');
  }
}, 400);

initScrollReveal();

// Scroll spy
var sections = ['s-workflow', 's-tools', 's-skills', 's-exp'];
var navAs = document.querySelectorAll('.nav-links a');
var spyObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    var id = e.target.id;
    navAs.forEach(function(a) {
      if (a.getAttribute('onclick') && a.getAttribute('onclick').includes(id)) {
        a.classList.toggle('active', e.isIntersecting);
      }
    });
  });
}, { threshold: 0.3, rootMargin: '-58px 0px 0px 0px' });

sections.forEach(function(id) {
  var el = document.getElementById(id);
  if (el) spyObs.observe(el);
});

// Hamburger drawer
function openDrawer() { document.getElementById('navDrawer').classList.add('open'); }
function closeDrawer() { document.getElementById('navDrawer').classList.remove('open'); }

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
    closeDrawer();
    closeResModal();
  }
});

// Hardware-accelerated 3D card tilt effect (desktop only)
if (window.innerWidth > 768) {
  document.querySelectorAll('.stagger-card, .tc, .ec, .edu').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var xc = rect.width / 2;
      var yc = rect.height / 2;
      var dx = x - xc;
      var dy = y - yc;
      
      // Calculate rotation angles (max 6 degrees tilt)
      var rx = -(dy / yc) * 6;
      var ry = (dx / xc) * 6;
      
      card.style.transition = 'none'; // Prevent transition lag during active mousemove
      card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale3d(1.02, 1.02, 1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transition = ''; // Restore default CSS transition for smooth return
      card.style.transform = '';
    });
  });
}

// 3D Parallax tilt specifically for the Hero Dashboard
if (window.innerWidth > 768) {
  var dash = document.querySelector('.hero-dash');
  var rightSec = document.querySelector('.hero-right');
  if (dash && rightSec) {
    rightSec.addEventListener('mousemove', function(e) {
      var rect = rightSec.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var xc = rect.width / 2;
      var yc = rect.height / 2;
      var dx = x - xc;
      var dy = y - yc;
      
      // Gentle 4 degrees max tilt
      var rx = -(dy / yc) * 4;
      var ry = (dx / xc) * 4;
      
      dash.style.animation = 'none'; // Pause floating animation on hover
      dash.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale3d(1.01, 1.01, 1.01)';
    });
    
    rightSec.addEventListener('mouseleave', function() {
      dash.style.transform = '';
      dash.style.animation = ''; // Resume CSS float automatically
    });
  }
}

function openResModal() { document.getElementById('resModal').classList.add('open'); }
function closeResModal() { document.getElementById('resModal').classList.remove('open'); }
