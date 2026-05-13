<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const cursor = ref(null);

function onMouseMove(e) {
  if (cursor.value) {
    gsap.to(cursor.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: 'power3.out'
    });
  }
}

onMounted(() => window.addEventListener('mousemove', onMouseMove));
onUnmounted(() => window.removeEventListener('mousemove', onMouseMove));
</script>

<template>
  <div ref="cursor" class="custom-cursor"></div>
</template>

<style lang="scss" scoped>

.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: $color-acent;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
}
</style>