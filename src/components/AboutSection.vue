<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx;
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to('.parallax-img', {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
});
onUnmounted(() => ctx?.revert());

const skills = ref([
  { name: 'Adobe Photoshop', level: 4 },
  { name: 'Adobe Illustrator', level: 4 },
  { name: 'Adobe InDesign', level: 3 },
  { name: 'Adobe After Effects', level: 4 },
  { name: 'Adobe Lightroom', level: 3 },
  { name: 'Adobe Premiere Pro', level: 3 },
  { name: 'Blender', level: 2 },
  { name: 'Resolume Arena', level: 3 },
  { name: 'Figma', level: 4 },
  { name: 'Canva', level: 4 },
  { name: 'Inteligencia Artificial', level: 4 },
  { name: 'Affinity', level: 4 },
  { name: 'Touch Designer', level: 2 }

]);
</script>

<template>
  <section id="sobre-mi" class="section bg-alt">
    <div class="container about-container">
      <div class="about-main">
        <div class="about-image overflow-hidden">
          <img src="/logoAmarillo.png" alt="Sobre mí" class="parallax-img" />
        </div>
        <div class="about-info">
          <h1>Sobre mí<span class="dot">.</span></h1>
          <p>Diseño desde la observación y la síntesis. Sin ruido, sin ocurrencias gratuitas. Me importa el detalle, la fusión de lo orgánico con lo geométrico, y esa elegancia callada que hace que las cosas simplemente funcionen.</p>
          <div class="about-socials">
            <a href="https://www.instagram.com/erikk.design/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.linkedin.com/in/erik-agudo-a5a9b33aa/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>
      </div>

      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <span class="skill-name">{{ skill.name }}</span>
          <div class="skill-dots">
            <span 
              v-for="i in 5" 
              :key="i" 
              :class="['skill-dot', { filled: i <= skill.level }]"
            ></span>
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
}

.bg-alt {
  background-color: $color-bg;
}

.about-container {
  display: flex;
  flex-direction: column;
  gap: 80px;
  max-width: 1100px;
  margin: 0 auto;
}

.overflow-hidden {
  overflow: hidden;
  border-radius: 20px;
}

.about-image img {
  max-width: 400px;
  width: 100%;
  aspect-ratio: 4 / 5; 
  object-fit: cover;
  border-radius: 20px;
}

.about-main {
  display: flex;
  align-items: center;
  gap: 60px;
  text-align: left;
}

.about-info {
  flex: 1;
  transform: translateY(-2rem);

  h1 {
    line-height: .1;
    font-size: 20pt;
    font-weight: 700;
    
    .dot {
      color: $color-acent;
    }
  }

  p {
    line-height: 1.2;
    font-size: 12pt;
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 80px;
  width: 100%;
  text-align: left;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: 10pt;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.skill-dots {
  display: flex;
  gap: 6px;
}

.skill-dot {
  width: 10px;
  height: 10px;
  border: 1px solid $color-acent;
  border-radius: 50%;

  &.filled {
    background-color: $color-acent;
  }
}

.about-socials {
  display: flex;
  gap: 20px;
  margin-top: 2rem;

  a {
    color: $color-acent;
    text-decoration: none;
    font-weight: 400;
    font-size: 10pt;
    transition: opacity 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: $bp-mobile) {
  .about-main {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
  .about-info {
    transform: none;
  }
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .about-container img {
    max-width: 100%;
  }
  .about-socials {
    justify-content: center;
  }
  .skill-item {
    margin: 0;
  }
}
</style>