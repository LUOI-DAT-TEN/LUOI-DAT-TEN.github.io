(function () {
  document.addEventListener('keydown', function (e) {
    const ctrl = e.ctrlKey || e.metaKey;
    if (e.key === 'F12') {
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
    if (ctrl && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
    if (ctrl && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
    if (ctrl && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
    if (ctrl && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
  }, true);
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }, true);

})();
anime.timeline({ easing: 'easeOutExpo' })
  .add({
    targets: '.header-title',
    opacity: [0, 1],
    translateY: [-50, 0],
    scale: [0.7, 1],
    duration: 900
  })
  .add({
    targets: '.header-subtitle',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600
  }, '-=400')
  .add({
    targets: '.heart-row',
    opacity: [0, 1],
    scale: [0, 1],
    duration: 500,
    easing: 'easeOutBack(2)'
  }, '-=300')
  .add({
    targets: '.envelope-deco',
    opacity: [0, 0.6],
    translateX: [60, 0],
    rotate: [20, 0],
    duration: 700,
    easing: 'easeOutBack(2)'
  }, '-=500')
  .add({
    targets: '.hearts-deco',
    opacity: [0, 0.5],
    scale: [0, 1],
    delay: anime.stagger(120),
    duration: 500,
    easing: 'easeOutBack(2)'
  }, '-=400')
  .add({
    targets: 'nav',
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: 400
  }, '-=200');
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  anime({
    targets: scrollBar,
    width: (pct * 100) + '%',
    duration: 80,
    easing: 'linear'
  });
}, { passive: true });
anime.set('section',                       { opacity: 0, translateY: 50 });
anime.set('.card',                         { opacity: 0, translateY: 30, scale: 0.9 });
anime.set('.way-item',                     { opacity: 0, translateX: -35 });
anime.set('.summary-box, .greeting-box',   { opacity: 0, scale: 0.88 });
anime.set('footer',                        { opacity: 0, translateY: 30 });
anime.set('.section-title',                { opacity: 0, scale: 0.85 });
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    revealIO.unobserve(entry.target);
    const el = entry.target;

    if (el.tagName === 'SECTION') {
      anime({ targets: el, opacity: [0, 1], translateY: [50, 0], duration: 750, easing: 'easeOutExpo' });
      const cards = el.querySelectorAll('.card');
      if (cards.length) anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        delay: anime.stagger(130, { start: 200 }),
        duration: 600,
        easing: 'easeOutBack(1.4)'
      });

      const ways = el.querySelectorAll('.way-item');
      if (ways.length) anime({
        targets: ways,
        opacity: [0, 1],
        translateX: [-35, 0],
        delay: anime.stagger(110, { start: 200 }),
        duration: 580,
        easing: 'easeOutExpo'
      });
      const boxes = el.querySelectorAll('.summary-box, .greeting-box');
      if (boxes.length) anime({
        targets: boxes,
        opacity: [0, 1],
        scale: [0.88, 1],
        delay: 350,
        duration: 600,
        easing: 'easeOutBack(1.2)'
      });
    }

    if (el.tagName === 'FOOTER') {
      anime({ targets: el, opacity: [0, 1], translateY: [30, 0], duration: 600, easing: 'easeOutExpo' });
    }

  });
}, { threshold: 0.08 });
document.querySelectorAll('section').forEach(el => revealIO.observe(el));
document.querySelectorAll('footer').forEach(el  => revealIO.observe(el));
const titleIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    titleIO.unobserve(entry.target);
    anime({
      targets: entry.target,
      scale: [0.85, 1.05, 1],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutBack(2)'
    });
  });
}, { threshold: 0.5 });
document.querySelectorAll('.section-title').forEach(el => titleIO.observe(el));
const canvas = document.getElementById('petal-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });
const FLOWERS = ['🌸','🌺','🌷','💮','🌹','💗','🌼','🌻','🏵️'];
class Petal {

  constructor(scattered) {
    this.obj = { p: 0 };
    this.init(scattered);
    this.animate();
  }
  init(scattered = false) {
    this.startX = Math.random() * canvas.width;
    this.y0 = scattered ? Math.random() * canvas.height : -40;
    this.size   = 12 + Math.random() * 18;
    this.rot0   = Math.random() * 360;
    this.rotSpd = (Math.random() - 0.5) * 3;
    this.alpha  = 0.45 + Math.random() * 0.5;
    this.swAmp  = 20 + Math.random() * 35;
    this.swFq   = 0.4 + Math.random() * 0.8;
    this.swOff  = Math.random() * Math.PI * 2;
    this.dur    = 2500 + Math.random() * 4000;
    this.emoji  = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
    this.t0     = scattered ? Math.random() : 0;
    this.obj.p  = this.t0;
  }

  animate() {
    anime({
      targets: this.obj,
      p: [this.t0, 1],
      duration: this.dur * (1 - this.t0),
      easing: 'linear',
      complete: () => {
        this.init(false);
        this.animate();
      }
    });
  }

  draw() {
    const t = this.obj.p;

    const y = this.y0 + t * (canvas.height + 60);

    const x = this.startX + Math.sin(t * Math.PI * 2 * this.swFq + this.swOff) * this.swAmp;

    ctx.save();

    ctx.globalAlpha = this.alpha;

    ctx.font = `${this.size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", serif`;

    ctx.translate(x, y);

    ctx.rotate((this.rot0 + t * this.rotSpd * 360) * Math.PI / 180);

    ctx.fillText(this.emoji, -this.size / 2, this.size / 2);

    ctx.restore();
  }
}

const petals = Array.from({ length: 40 }, () => new Petal(true));

(function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach(p => p.draw());

  requestAnimationFrame(loop);
})();

anime({
  targets: '.tulip-deco',
  translateY: [-6, 6],
  rotate: [-12, -5],
  duration: 2200,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine'
});

anime({
  targets: '.btn',
  boxShadow: [
    '0 0 0 0px rgba(233,30,140,0.35)',
    '0 0 0 10px rgba(233,30,140,0)',
  ],
  duration: 1800,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine'
});

const greetings = [
  '" Kính chúc các Cô ngày 8/3 luôn mạnh khỏe, hạnh phúc và mãi là người truyền cảm hứng tận tâm cho các thế hệ học trò."',
  '" Chúc mừng ngày Quốc tế Phụ nữ! Cảm ơn vì những yêu thương và hy sinh mà các Cô đã dành trọn."',
  '" Nhân ngày 8/3, kính chúc các Cô luôn rạng rỡ, tràn đầy năng lượng và nhận được thật nhiều yêu thương!"',
  '" Chúc những người phụ nữ tuyệt vời luôn mạnh mẽ, tự tin và tỏa sáng theo cách riêng của mình!"',
  '" Gửi đến những người phụ nữ đặc biệt lời chúc sức khỏe dồi dào, hạnh phúc viên mãn và thành công trên mọi con đường!"',
];

let greetingIdx = 0;

window.changeGreeting = function () {
  greetingIdx = (greetingIdx + 1) % greetings.length;

  const textEl  = document.getElementById('greeting-text');
  const spinner = document.getElementById('btn-spinner');
  const btn     = spinner.querySelector('.btn');

  anime({
    targets:  spinner,
    rotate:   '+=360',
    scale:    [1, 0.85, 1.12, 1],
    duration: 650,
    easing:   'easeOutBack(1.6)',
    complete() {
      anime.set(spinner, { rotate: 0 });
    }
  });

  anime({
    targets:  btn,
    rotate:   '-=360',
    scale:    [1, 1.18, 0.9, 1],
    duration: 650,
    easing:   'easeOutBack(1.6)',
    complete() {
      anime.set(btn, { rotate: 0 });
    }
  });

  anime({
    targets:  textEl,
    rotateX:  [0, 90],
    opacity:  [1, 0],
    duration: 260,
    easing:   'easeInSine',
    complete() {
      textEl.textContent = greetings[greetingIdx];
      anime({
        targets:  textEl,
        rotateX:  [-90, 0],
        opacity:  [0, 1],
        duration: 360,
        easing:   'easeOutBack(1.4)'
      });
    }
  });

  anime({
    targets:  '.tulip-deco',
    translateY: [0, -22, 0],
    scale:      [1, 1.35, 1],
    duration:   620,
    easing:     'easeOutBounce'
  });
};
(function () {
  const wrap     = document.querySelector('.member-trigger-wrap');
  const dropdown = document.getElementById('member-dropdown');
  if (!wrap || !dropdown) return;
  wrap.addEventListener('mouseenter', () => {
    anime.set(dropdown.querySelectorAll('.member-item'), { opacity: 0, translateX: -10 });
    anime({
      targets:    dropdown.querySelectorAll('.member-item'),
      opacity:    [0, 1],
      translateX: [-10, 0],
      delay:      anime.stagger(50),
      duration:   280,
      easing:     'easeOutQuad'
    });
  });
})();
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    anime({
      targets: card,
      translateY: -9,
      scale:     1.04,
      boxShadow: [
        '0 2px 10px rgba(233,30,140,0.08)',
        '0 14px 32px rgba(233,30,140,0.22)'
      ],
      duration: 240,
      easing:   'easeOutQuad'
    });
    anime({
      targets:  card.querySelector('.card-icon'),
      scale:    [1, 1.4, 1.2],
      duration: 420,
      easing:   'easeOutElastic(1, .5)'
    });
  });
  card.addEventListener('mouseleave', () => {
    anime({
      targets:    card,
      translateY: 0,
      scale:      1,
      duration:   240,
      easing:     'easeOutQuad'
    });
  });
});
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', function () {
    anime({
      targets: this,
      scale:   [1, 0.82, 1.12, 1],
      duration: 440,
      easing:   'easeOutElastic(1, .5)'
    });
  });
});
const CLICK_ICONS = ['💗','💕','🌸','💖','🌷','✨','🌺'];
document.addEventListener('click', e => {
  if (e.target.closest('a, button')) return;
  for (let i = 0; i < 3; i++) {
    const el = document.createElement('span');
    el.textContent = CLICK_ICONS[Math.floor(Math.random() * CLICK_ICONS.length)];
    el.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      font-size: ${16 + Math.random() * 14}px;
      user-select: none;
      left: ${e.clientX - 12}px;
      top:  ${e.clientY - 12}px;
    `;
    document.body.appendChild(el);
    anime({
      targets:    el,
      translateY: [0, -(60 + Math.random() * 80)],
      translateX: [(Math.random() - 0.5) * 80],
      scale:   [0.2, 1.4, 0.8, 0],
      opacity: [1, 1, 0],
      rotate:  [(Math.random() - 0.5) * 60],
      duration: 700 + Math.random() * 400,
      delay: i * 55,
      easing:   'easeOutExpo',
      complete: () => el.remove()
    });
  }
});
