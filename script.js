/* =====================================================
   SCRIPT.JS — Hiệu ứng anime.js cho trang Ngày 8/3
   Yêu cầu: anime.js phải được load TRƯỚC file này
   (đặt <script src="anime.min.js"> trước <script src="script.js">)
===================================================== */


/* ═══════════════════════════════════════════════════════
   1. HEADER ENTRANCE — Chuỗi animation khi trang tải xong
   anime.timeline() tạo các animation chạy NỐI TIẾP nhau.
═══════════════════════════════════════════════════════ */
anime.timeline({ easing: 'easeOutExpo' })
/* easing: 'easeOutExpo' → chuyển động nhanh lúc đầu, chậm dần về cuối.
   Giống vật lý thực: thả vật → tăng tốc → phanh lại. Tự nhiên hơn linear. */

  .add({
    targets: '.header-title',   /* Phần tử nào sẽ animate: tiêu đề lớn. */
    opacity: [0, 1],            /* Từ trong suốt (0) → hiện hoàn toàn (1). */
    translateY: [-50, 0],       /* Từ -50px (trên) → 0px (vị trí gốc): rơi xuống. */
    scale: [0.7, 1],            /* Phóng to từ 70% → 100%: xuất hiện "nảy lên". */
    duration: 900               /* Kéo dài 900ms = 0.9 giây. */
  })

  .add({
    targets: '.header-subtitle',
    opacity: [0, 1],
    translateY: [20, 0],        /* Từ dưới 20px lên → xuất hiện từ dưới lên. */
    duration: 600
  }, '-=400')
  /* '-=400': bắt đầu animation này SỚM HƠN 400ms so với kết thúc animation trước.
     Các phần tử xuất hiện chồng lên nhau → timeline mượt mà, không phải chờ từng cái. */

  .add({
    targets: '.heart-row',
    opacity: [0, 1],
    scale: [0, 1],              /* Từ 0% → 100%: tim "nảy ra" từ điểm. */
    duration: 500,
    easing: 'easeOutBack(2)'
    /* easeOutBack(2): chuyển động vượt qua đích (scale>1) rồi lùi về.
       Số 2 là cường độ nảy — càng lớn càng vượt nhiều. Tạo hiệu ứng "bật ra". */
  }, '-=300')

  .add({
    targets: '.envelope-deco',
    opacity: [0, 0.6],          /* Chỉ hiện đến 60% (opacity:0.6 là bình thường của nó). */
    translateX: [60, 0],        /* Trượt từ phải 60px vào. */
    rotate: [20, 0],            /* Xoay từ 20° → 0° khi vào. */
    duration: 700,
    easing: 'easeOutBack(2)'
  }, '-=500')

  .add({
    targets: '.hearts-deco',
    opacity: [0, 0.5],          /* Hiện đến 50% (opacity:0.5 là bình thường của nó). */
    scale: [0, 1],
    delay: anime.stagger(120),
    /* anime.stagger(120): mỗi .hearts-deco bị trễ thêm 120ms so với cái trước.
       4 trái tim xuất hiện lần lượt thay vì cùng lúc. */
    duration: 500,
    easing: 'easeOutBack(2)'
  }, '-=400')

  .add({
    targets: 'nav',
    opacity: [0, 1],
    translateY: [-20, 0],       /* Nav rơi xuống từ trên. */
    duration: 400
  }, '-=200');


/* ═══════════════════════════════════════════════════════
   2. SCROLL PROGRESS BAR — Thanh tiến trình đọc bài
═══════════════════════════════════════════════════════ */

const scrollBar = document.getElementById('scroll-bar');
/* Lấy phần tử thanh tiến trình từ HTML bằng id. */

window.addEventListener('scroll', () => {
  /* Lắng nghe sự kiện cuộn trang. Mỗi lần cuộn → chạy hàm bên trong. */

  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  /* window.scrollY: số pixel đã cuộn từ đầu trang xuống.
     scrollHeight: tổng chiều cao trang (kể cả phần không thấy).
     innerHeight:  chiều cao cửa sổ trình duyệt.
     scrollHeight - innerHeight = phần có thể cuộn được.
     pct = tỉ lệ 0→1 (đã cuộn được bao nhiêu phần trăm). */

  anime({
    targets: scrollBar,
    width: (pct * 100) + '%', /* Cập nhật chiều rộng thanh theo %. */
    duration: 80,             /* Transition 80ms mượt giữa các lần update. */
    easing: 'linear'          /* Tốc độ đều, không ease — phản ánh đúng vị trí cuộn. */
  });

}, { passive: true });
/* passive: true: báo trình duyệt hàm này không gọi preventDefault().
   Cho phép trình duyệt cuộn ngay lập tức, không chờ JS → cuộn mượt hơn. */


/* ═══════════════════════════════════════════════════════
   3. SCROLL REVEAL — Phần tử hiện ra khi cuộn đến
   Dùng IntersectionObserver API của trình duyệt.
═══════════════════════════════════════════════════════ */

/* Ẩn tất cả phần tử ngay khi trang load để chuẩn bị cho reveal animation.
   anime.set() đặt giá trị NGAY LẬP TỨC (không animate). */
anime.set('section',                       { opacity: 0, translateY: 50 });
/* Section: ẩn + dịch xuống 50px. */
anime.set('.card',                         { opacity: 0, translateY: 30, scale: 0.9 });
/* Card: ẩn + dịch xuống + thu nhỏ 90%. */
anime.set('.way-item',                     { opacity: 0, translateX: -35 });
/* Way-item: ẩn + dịch sang trái 35px. */
anime.set('.summary-box, .greeting-box',   { opacity: 0, scale: 0.88 });
/* Summary/greeting: ẩn + thu nhỏ 88%. */
anime.set('footer',                        { opacity: 0, translateY: 30 });
anime.set('.section-title',                { opacity: 0, scale: 0.85 });

/* Tạo Observer quan sát khi phần tử đi vào vùng nhìn thấy */
const revealIO = new IntersectionObserver((entries) => {
  /* entries: mảng các phần tử đang được quan sát, vừa thay đổi trạng thái. */

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;
    /* isIntersecting: true nếu phần tử đang trong viewport.
       Nếu false (cuộn ra khỏi viewport) → bỏ qua, không làm gì. */

    revealIO.unobserve(entry.target);
    /* Ngừng quan sát phần tử này sau khi đã animate.
       Tránh animate lại khi cuộn lên cuộn xuống. Chỉ hiện 1 lần. */

    const el = entry.target;

    if (el.tagName === 'SECTION') {
      /* Animation cho toàn bộ section */
      anime({ targets: el, opacity: [0, 1], translateY: [50, 0], duration: 750, easing: 'easeOutExpo' });

      /* Animation cho các card bên trong section (nếu có) */
      const cards = el.querySelectorAll('.card');
      if (cards.length) anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        delay: anime.stagger(130, { start: 200 }),
        /* start:200 → card đầu tiên đợi 200ms. Mỗi card tiếp theo thêm 130ms.
           Card 1: delay 200ms, card 2: delay 330ms, card 3: delay 460ms.
           Tạo hiệu ứng "đổ bài" từ trái sang phải. */
        duration: 600,
        easing: 'easeOutBack(1.4)'
      });

      /* Animation cho way-item (cách kỷ niệm) */
      const ways = el.querySelectorAll('.way-item');
      if (ways.length) anime({
        targets: ways,
        opacity: [0, 1],
        translateX: [-35, 0], /* Trượt từ trái vào. */
        delay: anime.stagger(110, { start: 200 }),
        duration: 580,
        easing: 'easeOutExpo'
      });

      /* Animation cho summary-box và greeting-box */
      const boxes = el.querySelectorAll('.summary-box, .greeting-box');
      if (boxes.length) anime({
        targets: boxes,
        opacity: [0, 1],
        scale: [0.88, 1],
        delay: 350,     /* Chờ 350ms sau khi section animate — xuất hiện sau cùng. */
        duration: 600,
        easing: 'easeOutBack(1.2)'
      });
    }

    if (el.tagName === 'FOOTER') {
      anime({ targets: el, opacity: [0, 1], translateY: [30, 0], duration: 600, easing: 'easeOutExpo' });
    }

  });
}, { threshold: 0.08 });
/* threshold: 0.08 → kích hoạt khi 8% phần tử xuất hiện trong viewport.
   Không cần cuộn đến giữa mới hiện — chỉ cần nhìn thấy 1 chút là animate. */

/* Đăng ký quan sát tất cả section và footer */
document.querySelectorAll('section').forEach(el => revealIO.observe(el));
document.querySelectorAll('footer').forEach(el  => revealIO.observe(el));

/* Observer riêng cho section-title (threshold cao hơn vì element nhỏ) */
const titleIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    titleIO.unobserve(entry.target);
    anime({
      targets: entry.target,
      scale: [0.85, 1.05, 1],  /* Thu → vượt → về: hiệu ứng "nảy" nhẹ. */
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutBack(2)'
    });
  });
}, { threshold: 0.5 }); /* 50% tiêu đề phải thấy thì mới animate. */

document.querySelectorAll('.section-title').forEach(el => titleIO.observe(el));


/* ═══════════════════════════════════════════════════════
   4. HOA RƠI — Canvas 2D + anime.js
   Nguyên lý: anime.js không vẽ trực tiếp lên canvas.
   Thay vào đó, anime.js animate biến số (progress 0→1),
   còn Canvas API dùng biến đó để tính và vẽ tọa độ hoa.
═══════════════════════════════════════════════════════ */

const canvas = document.getElementById('petal-canvas');
/* Lấy phần tử canvas từ HTML. */

const ctx = canvas.getContext('2d');
/* Lấy "ngữ cảnh vẽ 2D". ctx là đối tượng chứa mọi phương thức vẽ:
   fillText, translate, rotate, save, restore... */

/* Đặt canvas kích thước bằng cửa sổ trình duyệt */
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  /* LƯU Ý: thay đổi width/height tự động XÓA toàn bộ canvas.
     Không cần clearRect trước khi resize. */
}
resizeCanvas(); /* Gọi ngay khi tải trang. */
window.addEventListener('resize', resizeCanvas, { passive: true });
/* Gọi lại khi người dùng thay đổi kích thước cửa sổ. */

/* Danh sách emoji hoa để chọn ngẫu nhiên */
const FLOWERS = ['🌸','🌺','🌷','💮','🌹','💗','🌼','🌻','🏵️'];

/* Lớp Petal — Mỗi đối tượng đại diện cho một bông hoa đang rơi */
class Petal {

  constructor(scattered) {
    this.obj = { p: 0 };
    /* this.obj.p = "progress" (tiến độ rơi từ 0 đến 1).
       anime.js sẽ animate số này, không animate canvas trực tiếp. */
    this.init(scattered);
    this.animate();
  }

  /* Khởi tạo / reset thông số ngẫu nhiên cho bông hoa */
  init(scattered = false) {
    this.startX = Math.random() * canvas.width;
    /* Vị trí ngang ngẫu nhiên trong chiều rộng canvas. */

    this.y0 = scattered ? Math.random() * canvas.height : -40;
    /* scattered=true (lần đầu): bắt đầu ở vị trí ngẫu nhiên trên trang.
       scattered=false (hoa mới): bắt đầu từ -40px (trên canvas, chưa thấy). */

    this.size   = 12 + Math.random() * 18;       /* Kích thước: 12px đến 30px. */
    this.rot0   = Math.random() * 360;            /* Góc xoay ban đầu ngẫu nhiên. */
    this.rotSpd = (Math.random() - 0.5) * 3;     /* Tốc độ xoay: âm hoặc dương (xoay 2 chiều). */
    this.alpha  = 0.45 + Math.random() * 0.5;    /* Độ trong suốt: 45% đến 95%. */
    this.swAmp  = 20 + Math.random() * 35;        /* Biên độ lắc ngang: 20px đến 55px. */
    this.swFq   = 0.4 + Math.random() * 0.8;     /* Tần số lắc: nhanh/chậm. */
    this.swOff  = Math.random() * Math.PI * 2;   /* Lệch pha: hoa không lắc cùng nhịp. */
    this.dur    = 2500 + Math.random() * 4000;   /* Thời gian rơi: 2.5s đến 6.5s. */
    this.emoji  = FLOWERS[Math.floor(Math.random() * FLOWERS.length)]; /* Emoji ngẫu nhiên. */
    this.t0     = scattered ? Math.random() : 0; /* Tiến độ ban đầu: nếu scattered thì giữa chừng. */
    this.obj.p  = this.t0;
  }

  /* Bắt đầu anime.js animate obj.p từ t0 đến 1 */
  animate() {
    anime({
      targets: this.obj,         /* Animate đối tượng JS thay vì DOM element. */
      p: [this.t0, 1],           /* Tăng p từ t0 lên 1. */
      duration: this.dur * (1 - this.t0),
      /* Hoa scattered đã đi được (t0) phần rồi → thời gian còn lại ngắn hơn.
         Đảm bảo hoa không kết thúc cùng lúc → tạo cảm giác liên tục. */
      easing: 'linear',          /* Rơi đều, không easing — tự nhiên như trọng lực. */
      complete: () => {
        /* Khi rơi đến đáy (p=1): reset và rơi lại từ đầu. */
        this.init(false);        /* false: bắt đầu từ đỉnh màn hình. */
        this.animate();
      }
    });
  }

  /* Vẽ bông hoa lên canvas tại vị trí tính theo p hiện tại */
  draw() {
    const t = this.obj.p; /* Tiến độ hiện tại (0→1). */

    const y = this.y0 + t * (canvas.height + 60);
    /* Y tuyến tính: từ y0 đến (canvas.height + 60). +60 để hoa đi khuất dưới màn hình. */

    const x = this.startX + Math.sin(t * Math.PI * 2 * this.swFq + this.swOff) * this.swAmp;
    /* X hình sin: lắc qua lại như chiếc lá rơi trong gió.
       Math.sin trả về giá trị -1 đến 1, nhân swAmp để có biên độ thực tế. */

    ctx.save();
    /* Lưu trạng thái canvas (transform, alpha...) trước khi vẽ hoa này.
       Mỗi hoa có rotation riêng — save/restore đảm bảo không ảnh hưởng hoa khác. */

    ctx.globalAlpha = this.alpha;
    /* Đặt độ trong suốt cho hoa này. */

    ctx.font = `${this.size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", serif`;
    /* Dùng font stack emoji đa nền tảng:
       "Segoe UI Emoji"    → Windows
       "Apple Color Emoji" → macOS / iOS
       "Noto Color Emoji"  → Android / Linux
       Tránh lỗi GitHub Pages: chỉ dùng "serif" khiến một số hệ thống vẽ
       ký tự ASCII thay vì emoji màu vì serif không có glyph emoji. */

    ctx.translate(x, y);
    /* Dịch chuyển gốc tọa độ canvas đến vị trí hoa.
       Sau đó rotate sẽ xoay xung quanh vị trí hoa, không phải góc canvas. */

    ctx.rotate((this.rot0 + t * this.rotSpd * 360) * Math.PI / 180);
    /* Xoay canvas theo góc (độ → radian = độ * π/180).
       rot0: góc ban đầu. t*rotSpd*360: góc tăng dần theo tiến độ rơi. */

    ctx.fillText(this.emoji, -this.size / 2, this.size / 2);
    /* Vẽ emoji ở tọa độ (-size/2, size/2) so với gốc mới (vị trí hoa).
       Trừ size/2 để emoji được căn giữa quanh điểm translate. */

    ctx.restore();
    /* Khôi phục trạng thái canvas về trước save(). */
  }
}

/* Tạo 40 bông hoa ban đầu, tất cả scattered=true (xuất hiện ngẫu nhiên ngay) */
const petals = Array.from({ length: 40 }, () => new Petal(true));

/* Vòng lặp vẽ liên tục ~60 lần/giây (60fps) */
(function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  /* Xóa toàn bộ canvas mỗi frame. Nếu không xóa → hoa vẽ chồng lên nhau thành vết. */

  petals.forEach(p => p.draw());
  /* Vẽ lại tất cả 40 hoa ở vị trí mới (p đã được anime.js cập nhật). */

  requestAnimationFrame(loop);
  /* Gọi loop() trong frame tiếp theo. requestAnimationFrame đồng bộ với
     refresh rate màn hình (thường 60fps) và tự dừng khi tab bị ẩn → tiết kiệm CPU. */
})();
/* IIFE: Immediately Invoked Function Expression — hàm tự gọi ngay sau khi định nghĩa. */


/* ═══════════════════════════════════════════════════════
   5. TULIP LẮC LƯ + PULSE NÚT — Animation vô hạn
═══════════════════════════════════════════════════════ */

/* Hoa tulip lắc lư như đang đu đưa trong gió */
anime({
  targets: '.tulip-deco',
  translateY: [-6, 6],  /* Lên 6px rồi xuống 6px. */
  rotate: [-12, -5],    /* Nghiêng từ -12° đến -5° (luôn nghiêng trái, không thẳng). */
  duration: 2200,
  direction: 'alternate',
  /* alternate: chạy xuôi (lên/nghiêng 1) rồi ngược (xuống/nghiêng 2), rồi lại xuôi...
     Kết hợp loop:true → lắc lư liên tục mà không cần khai báo @keyframes. */
  loop: true,
  easing: 'easeInOutSine'
  /* easeInOutSine: chậm đầu, nhanh giữa, chậm cuối — mềm mại như chuyển động thực. */
});

/* Pulse (sóng lan ra) cho nút — target là .btn (con), KHÔNG phải #btn-spinner (cha).
   Lý do: anime.js có thể kill animation cũ nếu 2 animation cùng target 1 phần tử.
   .btn pulse boxShadow, #btn-spinner rotate → 2 target khác nhau → không xung đột. */
anime({
  targets: '.btn',
  boxShadow: [
    '0 0 0 0px rgba(233,30,140,0.35)',  /* Bắt đầu: bóng nhỏ đậm. */
    '0 0 0 10px rgba(233,30,140,0)',    /* Kết thúc: bóng to trong suốt. */
  ],
  /* Bóng đổ "nở ra" từ 0px → 10px, màu từ đậm → trong suốt → tạo sóng lan ra. */
  duration: 1800,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine'
});


/* ═══════════════════════════════════════════════════════
   6. LỜI CHÚC MỚI — Hàm changeGreeting()
   Kỹ thuật counter-rotation (xoay ngược chiều):
   • #btn-spinner (div cha) xoay THUẬN +360°
   • .btn (button con) xoay NGƯỢC -360°
   Kết quả: hai rotation triệt tiêu nhau → chữ đứng yên,
   nhưng vẫn thấy hiệu ứng co/giãn (scale) của nút.
═══════════════════════════════════════════════════════ */

const greetings = [
  '" Kính chúc các Cô ngày 8/3 luôn mạnh khỏe, hạnh phúc và mãi là người truyền cảm hứng tận tâm cho các thế hệ học trò."',
  '" Chúc mừng ngày Quốc tế Phụ nữ! Cảm ơn vì những yêu thương và hy sinh mà các Cô đã dành trọn."',
  '" Nhân ngày 8/3, kính chúc các Cô luôn rạng rỡ, tràn đầy năng lượng và nhận được thật nhiều yêu thương!"',
  '" Chúc những người phụ nữ tuyệt vời luôn mạnh mẽ, tự tin và tỏa sáng theo cách riêng của mình!"',
  '" Gửi đến những người phụ nữ đặc biệt lời chúc sức khỏe dồi dào, hạnh phúc viên mãn và thành công trên mọi con đường!"',
];
/* Mảng các lời chúc. Sẽ hiện lần lượt mỗi khi bấm nút. */

let greetingIdx = 0;
/* Chỉ số lời chúc hiện tại. Ban đầu là 0 (lời chúc đầu tiên). */

window.changeGreeting = function () {
/* Đặt vào window để hàm có thể gọi từ onclick="changeGreeting()" trong HTML.
   Nếu không đặt vào window, hàm chỉ tồn tại trong scope của file JS. */

  greetingIdx = (greetingIdx + 1) % greetings.length;
  /* Tăng chỉ số lên 1. Toán tử % (modulo): khi đến cuối mảng thì quay về 0.
     Ví dụ: 4 % 5 = 4, 5 % 5 = 0 → tạo vòng lặp 0,1,2,3,4,0,1,2... */

  const textEl  = document.getElementById('greeting-text');
  const spinner = document.getElementById('btn-spinner');  /* div wrapper. */
  const btn     = spinner.querySelector('.btn');           /* button con. */

  /* === Animation 1: Wrapper xoay THUẬN +360° === */
  anime({
    targets:  spinner,
    rotate:   '+=360',
    /* '+=360': TƯƠNG ĐỐI — cộng thêm 360° từ góc hiện tại.
       Khác [0, 360] là TUYỆT ĐỐI: nếu bấm nhanh 2 lần, lần 2 bắt đầu từ giữa chừng.
       Dùng '+=' đảm bảo luôn xoay đúng 1 vòng dù bấm bất cứ lúc nào. */
    scale:    [1, 0.85, 1.12, 1],
    /* 4 keyframe scale: bình thường → co nhỏ → to hơn → bình thường.
       Tạo cảm giác nút bị nhấn rồi nảy ra như lò xo. */
    duration: 650,
    easing:   'easeOutBack(1.6)',
    complete() {
      anime.set(spinner, { rotate: 0 });
      /* Reset góc xoay về 0 sau khi hoàn thành.
         Nếu không reset: sau nhiều lần bấm, góc tích lũy thành 360°, 720°, 1080°...
         → transform matrix phức tạp → có thể gây jank. */
    }
  });

  /* === Animation 2: Button con xoay NGƯỢC -360° === */
  anime({
    targets:  btn,
    rotate:   '-=360',  /* Ngược chiều: bù trừ rotation của wrapper → text đứng yên. */
    scale:    [1, 1.18, 0.9, 1],
    /* Scale button ngược pha với wrapper: to → nhỏ → bình thường (trong khi wrapper co → to). */
    duration: 650,
    easing:   'easeOutBack(1.6)',
    complete() {
      anime.set(btn, { rotate: 0 }); /* Reset tương tự. */
    }
  });

  /* === Animation 3: Text flip 3D như lật trang sách === */
  anime({
    targets:  textEl,
    rotateX:  [0, 90],  /* Lật ra phía sau 90° (mặt chữ quay vào trong). */
    opacity:  [1, 0],   /* Đồng thời mờ dần. */
    duration: 260,
    easing:   'easeInSine',
    complete() {
      /* Khi đã ẩn hoàn toàn: đổi nội dung, rồi lật ngược lại hiện text mới. */
      textEl.textContent = greetings[greetingIdx];
      /* Gán nội dung lời chúc mới vào đoạn text. */
      anime({
        targets:  textEl,
        rotateX:  [-90, 0], /* Lật từ phía trước ra: -90° → 0°. */
        opacity:  [0, 1],
        duration: 360,
        easing:   'easeOutBack(1.4)'
      });
    }
  });

  /* === Animation 4: Tulip nhảy lên mừng === */
  anime({
    targets:  '.tulip-deco',
    translateY: [0, -22, 0], /* Nhảy lên 22px rồi về. */
    scale:      [1, 1.35, 1],/* To ra rồi về — như nhảy phồng lên. */
    duration:   620,
    easing:     'easeOutBounce'
    /* easeOutBounce: nảy lên xuống như quả bóng khi chạm đất — thú vị! */
  });
};


/* ═══════════════════════════════════════════════════════
   7. MEMBER DROPDOWN — Stagger animation khi hover
   CSS xử lý ẩn/hiện, JS chỉ thêm animation xuất hiện đẹp.
═══════════════════════════════════════════════════════ */
(function () {
/* IIFE — đóng gói code, tránh biến bị leak ra global scope. */

  const wrap     = document.querySelector('.member-trigger-wrap');
  const dropdown = document.getElementById('member-dropdown');
  if (!wrap || !dropdown) return;
  /* Guard clause: nếu không tìm thấy phần tử → thoát ngay, tránh lỗi. */

  wrap.addEventListener('mouseenter', () => {
  /* mouseenter: kích hoạt khi chuột VÀO wrap. Khác mouseover: không bubble lên cha. */

    /* Reset tất cả item về ẩn trước khi animate.
       Quan trọng khi hover nhanh nhiều lần: đảm bảo luôn thấy animation đầy đủ. */
    anime.set(dropdown.querySelectorAll('.member-item'), { opacity: 0, translateX: -10 });

    anime({
      targets:    dropdown.querySelectorAll('.member-item'),
      /* querySelector trả về NodeList — anime.js nhận NodeList trực tiếp. */
      opacity:    [0, 1],
      translateX: [-10, 0], /* Trượt từ trái -10px → 0 (vị trí gốc). */
      delay:      anime.stagger(50),
      /* stagger(50): item 1 delay 0ms, item 2 delay 50ms, ... item 8 delay 350ms.
         8 thành viên xuất hiện lần lượt từ trên xuống — không cùng lúc. */
      duration:   280,
      easing:     'easeOutQuad'
      /* easeOutQuad: nhanh đầu, chậm cuối — trượt vào và dừng nhẹ nhàng. */
    });
  });

})();


/* ═══════════════════════════════════════════════════════
   8. CARD HOVER — Nâng card khi di chuột vào
═══════════════════════════════════════════════════════ */
document.querySelectorAll('.card').forEach(card => {

  card.addEventListener('mouseenter', () => {
    /* === Nâng toàn bộ card === */
    anime({
      targets: card,
      translateY: -9,  /* Nâng lên 9px. */
      scale:     1.04, /* Phóng to 4%. */
      boxShadow: [
        '0 2px 10px rgba(233,30,140,0.08)',   /* Bóng nhỏ ban đầu. */
        '0 14px 32px rgba(233,30,140,0.22)'   /* Bóng to hơn, đậm hơn khi nâng. */
      ],
      /* Bóng đổ to hơn + sâu hơn → tăng cảm giác "nổi". */
      duration: 240,
      easing:   'easeOutQuad'
    });

    /* === Icon nhảy to === */
    anime({
      targets:  card.querySelector('.card-icon'), /* Icon emoji trong card đang hover. */
      scale:    [1, 1.4, 1.2],
      /* 1 → 1.4 (to vọt) → 1.2 (về ổn định) — "đập" một cái rồi lắng. */
      duration: 420,
      easing:   'easeOutElastic(1, .5)'
      /* easeOutElastic: dao động như lò xo nhiều lần trước khi dừng.
         (1): độ đàn hồi. (.5): độ dao động — càng nhỏ càng rung nhiều. */
    });
  });

  card.addEventListener('mouseleave', () => {
    /* Khi chuột rời đi: trả card về vị trí ban đầu. */
    anime({
      targets:    card,
      translateY: 0,
      scale:      1,
      duration:   240,
      easing:     'easeOutQuad'
    });
    /* boxShadow tự reset vì không khai báo ở đây → anime giữ giá trị cuối cùng.
       Nếu muốn reset bóng: thêm boxShadow: '0 2px 10px rgba(233,30,140,0.08)'. */
  });
});


/* ═══════════════════════════════════════════════════════
   9. NAV LINK BOUNCE — Nút nav nảy khi click
═══════════════════════════════════════════════════════ */
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', function () {
  /* Dùng function() thay arrow function để 'this' trỏ đúng đến phần tử <a> được click. */

    anime({
      targets: this,             /* 'this' = phần tử <a> vừa được click. */
      scale:   [1, 0.82, 1.12, 1],
      /* Co nhỏ → to hơn → bình thường: cảm giác nút bị nhấn rồi nảy ra. */
      duration: 440,
      easing:   'easeOutElastic(1, .5)'
    });
  });
});


/* ═══════════════════════════════════════════════════════
   10. CLICK SPAWN TIM — Tim bay ra khi click vào trang
═══════════════════════════════════════════════════════ */
const CLICK_ICONS = ['💗','💕','🌸','💖','🌷','✨','🌺'];
/* Emoji ngẫu nhiên bay ra khi click. */

document.addEventListener('click', e => {
  /* Lắng nghe click ở cấp document — bắt tất cả click trên trang. */

  if (e.target.closest('a, button')) return;
  /* closest('a, button'): kiểm tra nếu click vào link hoặc nút.
     Nếu đúng → return, không spawn tim. Tránh spam tim khi bấm nút/link. */

  for (let i = 0; i < 3; i++) {
  /* Mỗi click tạo 3 tim (i = 0, 1, 2). */

    const el = document.createElement('span');
    /* Tạo phần tử span mới, không có trong HTML — hoàn toàn động. */

    el.textContent = CLICK_ICONS[Math.floor(Math.random() * CLICK_ICONS.length)];
    /* Gán emoji ngẫu nhiên từ mảng CLICK_ICONS. */

    el.style.cssText = `
      position: fixed;            /* Cố định theo viewport, không dịch chuyển khi scroll. */
      pointer-events: none;       /* Tim không bắt sự kiện — không chặn click tiếp theo. */
      z-index: 99999;             /* Hiện trên tất cả mọi thứ. */
      font-size: ${16 + Math.random() * 14}px;  /* Kích thước: 16px đến 30px. */
      user-select: none;          /* Không cho chọn emoji. */
      left: ${e.clientX - 12}px; /* Vị trí ngang: ngay chỗ click (trừ 12 để căn giữa). */
      top:  ${e.clientY - 12}px; /* Vị trí dọc: ngay chỗ click. */
    `;

    document.body.appendChild(el);
    /* Thêm tim vào trang để nó hiển thị. */

    anime({
      targets:    el,
      translateY: [0, -(60 + Math.random() * 80)],
      /* Bay lên từ 60px đến 140px. Âm = lên trên. */

      translateX: [(Math.random() - 0.5) * 80],
      /* Lệch ngang ngẫu nhiên: -40px đến +40px. Mỗi tim bay hướng hơi khác. */

      scale:   [0.2, 1.4, 0.8, 0],
      /* Xuất hiện nhỏ → to vọt → co → biến mất. Không về 0 từ từ — biến mất đột ngột. */

      opacity: [1, 1, 0],
      /* Ở 1 rồi đột ngột về 0 cuối cùng — biến mất nhanh. */

      rotate:  [(Math.random() - 0.5) * 60],
      /* Xoay ngẫu nhiên: -30° đến +30°. Mỗi tim xoay hướng khác. */

      duration: 700 + Math.random() * 400,
      /* Thời gian: 700ms đến 1100ms. 3 tim không kết thúc cùng lúc. */

      delay: i * 55,
      /* Tim 1: không delay, tim 2: delay 55ms, tim 3: delay 110ms.
         Tỏa ra lần lượt → hiệu ứng pháo bông nhỏ xinh. */

      easing:   'easeOutExpo',
      /* Nhanh lúc đầu, chậm dần — giống vật bay lên rồi chậm lại vì trọng lực. */

      complete: () => el.remove()
      /* Khi animation xong: XÓA phần tử khỏi DOM.
         Nếu không xóa: sau nhiều lần click trang chứa hàng nghìn span → lag. */
    });

  }
});