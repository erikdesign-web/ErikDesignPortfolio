<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/projects.json';

gsap.registerPlugin(ScrollTrigger);

const emit = defineEmits(['open-modal', 'zoom-image']);

function handleMouseMove(e) {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const x = e.clientX - box.left;
  const y = e.clientY - box.top;
  const centerX = box.width / 2;
  const centerY = box.height / 2;
  const rotateX = (y - centerY) / 8;
  const rotateY = (centerX - x) / 8;

  gsap.to(card.querySelector('.project-content'), {
    duration: 0.5,
    rotateX,
    rotateY,
    ease: 'power2.out'
  });
}

function handleMouseLeave(e) {
  gsap.to(e.currentTarget.querySelector('.project-content'), {
    duration: 0.8,
    rotateX: 0,
    rotateY: 0,
    ease: 'elastic.out(1, 0.5)'
  });
}

let ctx;
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.project-item', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  });
});
onUnmounted(() => ctx?.revert());

const projects = ref(projectsData);
</script>

<template>
  <section id="proyectos" class="section">
    <div class="container projects-container">
      <h1 class="section-title">Proyectos<span class="dot">.</span></h1>
      <div class="projects-grid">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :class="['project-item', (index + 1) % 2 !== 0 ? 'left-col' : 'right-col']"
          @click="emit('open-modal', project)"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
        >
          <div class="project-content">
            <div class="project-text">
              <h3>{{ project.title }}</h3>
              <p>{{ project.shortDesc }}</p>
            </div>
            <div class="project-image">
              <img 
                :src="project.mainImage" 
                :alt="project.title" 
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 1px;
    background-color: $color-acent;
  }
}

.section-title {
  margin-bottom: 60px;

  .dot {
    color: $color-acent;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.project-item {
  display: flex;
  align-items: center;
  perspective: 700px;
}

.project-content {
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
}

.left-col { justify-content: flex-end; padding-right: 20px; }
.left-col .project-content { flex-direction: row; text-align: right; }

.right-col { justify-content: flex-start; padding-left: 20px; }
.right-col .project-content { flex-direction: row-reverse; text-align: left; }

.project-image img {
  width: 350px;
  height: 450px;
  object-fit: cover;
  border-radius: 20px;
  filter: grayscale(100%);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform: translateZ(40px);
}

.project-text {
  opacity: 0;
  transition: all 0.5s ease;
  min-width: 180px;
  transform: translateZ(110px);

  h3 {
    margin: 0;
    line-height: 1.1;
    color: $color-acent;
  }

  p {
    margin: 0;
    line-height: 1.3;
  }
}

.project-item:hover .project-image img {
  filter: grayscale(0%);
  transform: scale(1.02);
}

.project-item:hover .project-text {
  opacity: 1;
  transform: translateX(-10px);
}
.right-col .project-item:hover .project-text {
  transform: translateX(10px);
}

@media (max-width: $bp-mobile) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 10px;
  }
  .project-item {
    justify-content: center !important;
    padding: 0 !important;
  }
  .project-content {
    flex-direction: column !important;
    gap: 15px;
    text-align: center !important;
  }
  .project-text {
    opacity: 1;
    transform: none !important;
    order: 2;
  }
  .project-image { order: 1; }
  .project-image img {
    width: 100%;
    height: 300px;
    filter: grayscale(0%);
  }
}
</style>