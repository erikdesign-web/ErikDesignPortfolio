<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';

const canvasRef = ref(null);
let ctx;
let animationFrame;
let mouse = { x: -1000, y: -1000 };
let lines = [];

const initLines = () => {
  if (!canvasRef.value) return;
  const canvas = canvasRef.value;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  lines = [];
  const lineCount = 25; // numero de líneas horizontales
  const pointsPerLine = 40; // resolucion de cada línea

  for (let i = 0; i < lineCount; i++) {
    let points = [];
    let baseY = (canvas.height / (lineCount + 1)) * (i + 1);
    for (let j = 0; j < pointsPerLine; j++) {
      points.push({
        x: (canvas.width / (pointsPerLine - 1)) * j,
        y: baseY,
        ox: (canvas.width / (pointsPerLine - 1)) * j, // posicion original X
        oy: baseY // posicion original Y
      });
    }
    lines.push(points);
  }
};

const animate = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const c = canvas.getContext('2d');
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = getComputedStyle(canvas).color; 
  c.lineWidth = 1.2;
  c.globalAlpha = 0.3;

  lines.forEach(points => {
    c.beginPath();
    points.forEach((p, j) => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 200; 

      if (dist < radius) {
        const force = (radius - dist) / radius;
        p.y = p.oy + (mouse.y - p.oy) * force * 0.7;
        p.x = p.ox + (mouse.x - p.ox) * force * 0.3;
      } else {
        
        p.y += (p.oy - p.y) * 0.1;
        p.x += (p.ox - p.x) * 0.1;
      }

      if (j === 0) c.moveTo(p.x, p.y);
      else {
        const prev = points[j - 1];
        const xc = (prev.x + p.x) / 2;
        const yc = (prev.y + p.y) / 2;
        c.quadraticCurveTo(prev.x, prev.y, xc, yc);
      }
    });
    c.stroke();
  });
  animationFrame = requestAnimationFrame(animate);
};

const onMouseMove = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.timeline()
      .from('.brand', { y: 100, opacity: 0, duration: 1.2, ease: 'power4.out' })
      .from('.subtitle', { opacity: 0, y: 20, duration: 1 }, '-=0.8');
  });

  initLines();
  animate();
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', initLines);
});

onUnmounted(() => {
  ctx?.revert();
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', initLines);
  cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <section id="inicio" class="section presentation">
    
    <div class="hero-visuals">
      <canvas ref="canvasRef"></canvas>
    </div>
    
    <div class="container hero-content">
      <h1 class="brand">ERIK DESIGN<span class="dot">.</span></h1>
      <p class="subtitle">Diseñador grafico y creativo</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 160px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.presentation {
  background: $color-bg;
}

.hero-visuals {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  color: $color-acent; 
}

.hero-visuals canvas {
  width: 100%;
  height: 100%;
}

.hero-content {
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 260%; 
    height: 160%;
    background: radial-gradient(
      circle,
      rgba($color-bg, 0.9) 20%, // Opaco en el centro
      transparent 85% // Se difumina hacia afuera
    );
    transform: translate(-50%, -50%);
    z-index: -1; 
    filter: blur(40px);
    pointer-events: none;
  }
}

.brand {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 900;
  margin: 0;
  color: $color-primary;

  .dot {
    color: $color-acent;
  }
}

.subtitle {
  color: $color-acent;
}
</style>