<script setup>
defineProps({
  imageUrl: String,
  show: Boolean
});

const emit = defineEmits(['close']);
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="zoom-overlay" @click="emit('close')">
      <button class="close-btn close-zoom" @click="emit('close')">
        <span></span><span></span><span></span>
      </button>
      <div class="zoom-content">
        <img :src="imageUrl" class="zoomed-image" />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>

.zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($color-bg, 0.95);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoomed-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
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
  z-index: 3100;
  transition: transform 0.3s ease;
}

.close-btn span {
  display: block;
  width: 30px;
  height: 2px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.close-btn span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.close-btn span:nth-child(2) {
  opacity: 0;
}
.close-btn span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.close-btn:hover {
  transform: scale(1.1);
}

.close-zoom {
  position: absolute;
  top: 30px;
  right: 40px;
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
</style>