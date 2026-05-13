<script setup>
import { computed } from 'vue';

const props = defineProps({
  project: Object,
  show: Boolean
});

const emit = defineEmits(['close', 'zoom']);
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-container">
        <div class="modal-left">
          <button class="close-btn close-modal" @click="emit('close')">
            <span></span><span></span><span></span>
          </button>
          <div class="modal-images-grid">
            <img
              v-for="(img, index) in project?.gallery"
              :key="index"
              :src="img"
              alt="Detalle proyecto"
              loading="lazy"
              decoding="async"
              @click="emit('zoom', img)"
              class="zoomable-image"
            />
          </div>
        </div>

        <div class="modal-right">
          <div class="modal-text-content">
            <h2 class="modal-title">{{ project?.title }}</h2>
            <p class="modal-date">Enero 2025</p>
            <p class="modal-description">{{ project?.fullDesc }}</p>
            
            <div v-if="project?.links?.length" class="modal-links">
              <a 
                v-for="link in project.links" 
                :key="link.label" 
                :href="link.url" 
                target="_blank"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $color-bg;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

.close-btn {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.close-btn span {
  display: block;
  width: 30px;
  height: 2px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.close-btn span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.close-btn span:nth-child(2) { opacity: 0; }
.close-btn span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

.close-btn:hover { transform: scale(1.1); }

.close-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.modal-left {
  flex: 1.2;
  padding: 40px 40px 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  max-height: 100vh;

  scrollbar-width: none; 
  -ms-overflow-style: none;  
  &::-webkit-scrollbar {
    display: none; 
  }
}

.modal-images-grid {
  column-count: 2;
  column-gap: 20px;
  width: 100%;
  max-width: 1159px;
}

.modal-images-grid img {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 20px;
  break-inside: avoid;
  border-radius: 20px; 
  transition: transform 0.4s ease;
  cursor: pointer;
}

.modal-images-grid img:hover {
  transform: scale(1.03);
}

.modal-images-grid img:nth-child(1),
.modal-images-grid img:nth-child(3),
.modal-images-grid img:nth-child(6),
.modal-images-grid img:nth-child(8) {
  aspect-ratio: 4/5;
  object-fit: cover;
}

.modal-images-grid img:nth-child(2),
.modal-images-grid img:nth-child(4),
.modal-images-grid img:nth-child(5),
.modal-images-grid img:nth-child(7) {
  aspect-ratio: 3/2;
  object-fit: cover;
}

.modal-right {
  flex: 0.8;
  display: flex;
  align-items: flex-end;
  padding: 2rem 2rem 2rem 1rem;
  text-align: left;
}

.modal-title {
  font-size: 20pt;
  font-weight: 700;
  margin-bottom: -0.7rem;
  color: $color-primary;
}
.modal-date {
  font-weight: 400;
  font-size: 1rem;
  color: $color-acent;
  margin-bottom: 0;
}
.modal-description {
  font-size: 12pt;
  line-height: 1.2;
  color: $color-primary;
}

.modal-links {
  display: flex;
  gap: 20px;
  margin-top: 2rem;

  a {
    color: $color-acent;
    text-decoration: none;
    font-size: 11pt;
    font-weight: 400;
    transition: opacity 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

@media (max-width: $bp-mobile) {
  .modal-container {
    flex-direction: column;
    overflow-y: auto;
  }
  .modal-left {
    padding: 60px 20px 20px;
  }
  .modal-images-grid {
    column-count: 1;
  }
  .modal-right {
    padding: 20px;
    align-items: center;
    text-align: center;
  }
  .modal-title {
    font-size: 2rem;
  }
}
</style>