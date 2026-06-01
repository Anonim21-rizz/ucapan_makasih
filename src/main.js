// ============================================================
//  THANKS FOR BEING MY FRIEND — Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── DOM References ──────────────────────────────────────────
  const introScreen   = document.getElementById('intro-screen');
  const mainContent   = document.getElementById('main-content');
  const startBtn      = document.getElementById('start-btn');
  const audio         = document.getElementById('bg-music');
  const playPauseBtn  = document.getElementById('play-pause-btn');
  const playIcon      = document.getElementById('play-icon');
  const pauseIcon     = document.getElementById('pause-icon');
  const muteBtn       = document.getElementById('mute-btn');
  const unmuteIcon    = document.getElementById('unmute-icon');
  const muteIcon      = document.getElementById('mute-icon');
  const volumeSlider  = document.getElementById('volume-slider');
  const heartBtn      = document.getElementById('heart-btn');
  const popupOverlay  = document.getElementById('popup-overlay');
  const popupClose    = document.getElementById('popup-close');
  const daysCount     = document.getElementById('days-count');
  const monthsCount   = document.getElementById('months-count');
  const letterText    = document.getElementById('letter-text');
  const memoryGallery = document.getElementById('memory-gallery');
  const heroCanvas    = document.getElementById('hero-canvas');
  const nightCanvas   = document.getElementById('night-canvas');
  const endingCanvas  = document.getElementById('ending-canvas');

  let isPlaying       = false;
  let counterAnimated = false;
  let letterStarted   = false;

  // ── Intro Particles ─────────────────────────────────────────
  function createIntroParticles() {
    const container = document.getElementById('intro-particles');
    for (let i = 0; i < 80; i++) {
      const p = document.createElement('div');
      p.className = 'intro-particle';
      p.style.cssText = `
        left:  ${Math.random() * 100}%;
        top:   ${Math.random() * 100}%;
        --dur:   ${2 + Math.random() * 4}s;
        --delay: ${Math.random() * 4}s;
        width:  ${1 + Math.random() * 3}px;
        height: ${1 + Math.random() * 3}px;
      `;
      container.appendChild(p);
    }
  }
  createIntroParticles();

  // ── Start Button → Transition ────────────────────────────────
  startBtn.addEventListener('click', () => {
    // Start music
    audio.volume = parseFloat(volumeSlider.value);
    audio.play().then(() => {
      isPlaying = true;
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
    }).catch(() => {});

    // Fade out intro
    introScreen.classList.add('fade-out');
    setTimeout(() => {
      introScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
      initHeroCanvas();
      initScrollAnimations();
      populateMemoryGallery();
      initFriendshipCounter();
    }, 1000);
  });

  // ── Music Controller ─────────────────────────────────────────
  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
    } else {
      audio.play();
      isPlaying = true;
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
    }
  });

  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    unmuteIcon.classList.toggle('hidden', audio.muted);
    muteIcon.classList.toggle('hidden', !audio.muted);
  });

  volumeSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volumeSlider.value);
    if (audio.muted && audio.volume > 0) {
      audio.muted = false;
      unmuteIcon.classList.remove('hidden');
      muteIcon.classList.add('hidden');
    }
  });

  // ── Hero Canvas — Sunset Sky ─────────────────────────────────
  function initHeroCanvas() {
    if (!heroCanvas) return;
    const ctx = heroCanvas.getContext('2d');
    let stars = [];
    let clouds = [];
    let animFrame;

    function resize() {
      heroCanvas.width  = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
    }

    function createStars(n) {
      stars = [];
      for (let i = 0; i < n; i++) {
        stars.push({
          x:     Math.random() * heroCanvas.width,
          y:     Math.random() * heroCanvas.height * 0.6,
          r:     0.5 + Math.random() * 1.5,
          alpha: Math.random(),
          speed: 0.005 + Math.random() * 0.015,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function createClouds() {
      clouds = [];
      for (let i = 0; i < 4; i++) {
        clouds.push({
          x:     Math.random() * heroCanvas.width * 1.5 - heroCanvas.width * 0.25,
          y:     heroCanvas.height * (0.2 + Math.random() * 0.4),
          w:     120 + Math.random() * 160,
          h:     30 + Math.random() * 40,
          speed: 0.15 + Math.random() * 0.25,
          alpha: 0.06 + Math.random() * 0.1,
        });
      }
    }

    function drawSunsetGradient() {
      const grad = ctx.createLinearGradient(0, 0, 0, heroCanvas.height);
      grad.addColorStop(0,   '#1a0030');
      grad.addColorStop(0.25,'#4a1060');
      grad.addColorStop(0.5, '#c04020');
      grad.addColorStop(0.72,'#e87030');
      grad.addColorStop(0.88,'#f0a050');
      grad.addColorStop(1,   '#a05030');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);
    }

    function drawHorizonGlow() {
      const y = heroCanvas.height * 0.72;
      const grad = ctx.createRadialGradient(
        heroCanvas.width / 2, y, 0,
        heroCanvas.width / 2, y, heroCanvas.width * 0.6
      );
      grad.addColorStop(0,   'rgba(255,200,100,0.5)');
      grad.addColorStop(0.3, 'rgba(255,150,60,0.2)');
      grad.addColorStop(1,   'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);
    }

    function drawSun() {
      const x = heroCanvas.width * 0.55;
      const y = heroCanvas.height * 0.70;
      // Glow
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 90);
      glow.addColorStop(0,   'rgba(255,230,100,0.6)');
      glow.addColorStop(0.4, 'rgba(255,180,60,0.3)');
      glow.addColorStop(1,   'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(x, y, 90, 0, Math.PI * 2); ctx.fill();
      // Core
      ctx.fillStyle = '#ffe066';
      ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2); ctx.fill();
    }

    function drawCloud(c) {
      ctx.save();
      ctx.globalAlpha = c.alpha;
      ctx.fillStyle = 'rgba(255,200,150,1)';
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w, c.h, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawStar(s, t) {
      const a = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed * 60));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#fff8e7';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    let lastTime = 0;
    function animate(ts) {
      const t = ts / 1000;
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      drawSunsetGradient();
      drawHorizonGlow();
      drawSun();
      clouds.forEach(c => {
        c.x += c.speed;
        if (c.x - c.w > heroCanvas.width) c.x = -c.w;
        drawCloud(c);
      });
      stars.forEach(s => drawStar(s, t));
      animFrame = requestAnimationFrame(animate);
    }

    resize();
    createStars(60);
    createClouds();
    animFrame = requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
      resize();
      createStars(60);
      createClouds();
    });
  }

  // ── Night Canvas — Starry Night ───────────────────────────────
  function initNightCanvas(canvas, starCount = 120) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      createStars();
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x:     Math.random() * canvas.width,
          y:     Math.random() * canvas.height,
          r:     0.5 + Math.random() * 2,
          alpha: 0.2 + Math.random() * 0.8,
          phase: Math.random() * Math.PI * 2,
          speed: 0.008 + Math.random() * 0.02,
        });
      }
    }

    function drawNightGrad() {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0,   '#060614');
      grad.addColorStop(0.4, '#0d0d28');
      grad.addColorStop(0.8, '#1a1240');
      grad.addColorStop(1,   '#0a0820');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawMoon() {
      const x = canvas.width * 0.15;
      const y = canvas.height * 0.18;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 70);
      glow.addColorStop(0,   'rgba(230,210,170,0.35)');
      glow.addColorStop(1,   'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(x, y, 70, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f5e6c8';
      ctx.beginPath(); ctx.arc(x, y, 24, 0, Math.PI * 2); ctx.fill();
      // Crescent
      ctx.fillStyle = '#0d0d28';
      ctx.beginPath(); ctx.arc(x + 10, y - 5, 18, 0, Math.PI * 2); ctx.fill();
    }

    function animate(ts) {
      const t = ts / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNightGrad();
      drawMoon();
      stars.forEach(s => {
        const a = s.alpha * (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed * 60)));
        ctx.save();
        ctx.globalAlpha = a;
        // Add occasional cross sparkle for bright stars
        if (s.r > 1.5) {
          ctx.strokeStyle = '#fff8e7';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - s.r * 2, s.y);
          ctx.lineTo(s.x + s.r * 2, s.y);
          ctx.moveTo(s.x, s.y - s.r * 2);
          ctx.lineTo(s.x, s.y + s.r * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#fff8e7';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(animate);
    }

    resize();
    requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
  }

  // ── Intersection Observer — Scroll Animations ─────────────────
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger children with data-delay
          const delay = entry.target.dataset.delay
            ? parseInt(entry.target.dataset.delay)
            : 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          // Trigger section-specific actions
          const section = entry.target.closest('section');
          if (section) {
            if (section.id === 'final' && !section.dataset.nightInit) {
              section.dataset.nightInit = '1';
              initNightCanvas(nightCanvas, 160);
            }
            if (section.id === 'ending' && !section.dataset.endingInit) {
              section.dataset.endingInit = '1';
              initNightCanvas(endingCanvas, 200);
            }
            if (section.id === 'counter' && !counterAnimated && entry.target.classList.contains('counter-display')) {
              counterAnimated = true;
              animateCounter();
            }
            if (section.id === 'letter' && !letterStarted && entry.target.classList.contains('letter-paper')) {
              letterStarted = true;
              setTimeout(startTyping, 400);
            }
          }
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-element').forEach(el => observer.observe(el));
  }

  // ── Memory Gallery Population ─────────────────────────────────
  function populateMemoryGallery() {
    if (!memoryGallery || !FRIEND_DATA.memories) return;
    FRIEND_DATA.memories.forEach((mem, i) => {
      const item = document.createElement('div');
      item.className = 'memory-item fade-in-element';
      item.dataset.delay = (i * 100).toString();

      const img = document.createElement('img');
      img.src = mem.src;
      img.alt = mem.caption;
      img.loading = 'lazy';
      img.onerror = () => {
        // Fallback placeholder
        img.style.display = 'none';
        item.style.minHeight = '160px';
        item.style.background = `linear-gradient(135deg, #e6ccb2 0%, #ddb892 100%)`;
        item.innerHTML += `<div style="padding:2rem;color:#7f5539;font-family:'Lora',serif;font-style:italic;text-align:center;">${mem.caption}</div>`;
      };

      const caption = document.createElement('div');
      caption.className = 'memory-caption';
      caption.textContent = mem.caption;

      item.appendChild(img);
      item.appendChild(caption);
      memoryGallery.appendChild(item);
    });

    // Re-observe new elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), parseInt(e.target.dataset.delay || 0));
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.memory-item').forEach(el => observer.observe(el));
  }

  // ── Friendship Counter Animation ──────────────────────────────
  function initFriendshipCounter() {
    // Calculated on call — ensures correct value at time of viewing
  }

  function animateCounter() {
    const [dd, mm, yyyy] = FRIEND_DATA.startDate.split('/').map(Number);
    const start = new Date(yyyy, mm - 1, dd);
    const now   = new Date();
    const totalDays   = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const totalMonths = (now.getFullYear() - start.getFullYear()) * 12
                        + (now.getMonth() - start.getMonth());

    animateNumber(daysCount,   totalDays,   1600);
    animateNumber(monthsCount, totalMonths, 1200);
  }

  function animateNumber(el, target, duration) {
    const start = performance.now();
    function step(ts) {
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(ease * target).toLocaleString('id-ID');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── Letter Typing Animation ───────────────────────────────────
  function startTyping() {
    if (!letterText || !FRIEND_DATA.letter) return;
    const lines = FRIEND_DATA.letter;
    const fullText = lines.join('\n');
    let idx = 0;

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    letterText.appendChild(cursor);

    function type() {
      if (idx < fullText.length) {
        cursor.insertAdjacentText('beforebegin', fullText[idx]);
        idx++;
        const delay = fullText[idx - 1] === '\n' ? 120
                    : fullText[idx - 1] === '.' ? 200
                    : 30 + Math.random() * 25;
        setTimeout(type, delay);
      } else {
        // Remove cursor blink after done, keep for a moment then fade
        setTimeout(() => cursor.style.opacity = '0', 2000);
      }
    }
    type();
  }

  // ── Heart Button Popup ────────────────────────────────────────
  heartBtn?.addEventListener('click', () => {
    popupOverlay.classList.add('active');
  });

  popupClose?.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
  });

  popupOverlay?.addEventListener('click', (e) => {
    if (e.target === popupOverlay) popupOverlay.classList.remove('active');
  });

  // ── Keyboard Escape for Popup ─────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') popupOverlay?.classList.remove('active');
  });

});
