<script setup>
import { ref } from 'vue';
import AppCursor from './components/AppCursor.vue';
import AppNavbar from './components/AppNavbar.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import ProjectModal from './components/ProjectModal.vue';
import ImageZoomModal from './components/ImageZoomModal.vue';
import AppFooter from './components/AppFooter.vue';
import ContactSection from './components/ContactSection.vue';

const isMenuOpen = ref(false);
const selectedProject = ref(null);
const isModalOpen = ref(false);
const isImageZoomed = ref(false);
const zoomedImageUrl = ref('');

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const openModal = (i) => {
  selectedProject.value = i;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = '';
};

const zoomImage = (url) => {
  zoomedImageUrl.value = url;
  isImageZoomed.value = true;
};

const closeZoom = () => {
  isImageZoomed.value = false;
};
</script>

<template>
  <AppCursor />
  <AppNavbar :isMenuOpen="isMenuOpen" @toggle="toggleMenu" />

  <main>
    <HeroSection />
    <AboutSection />
    <ProjectsSection
      @open-modal="openModal"
      @zoom-image="zoomImage"
    />
    <ContactSection />
    <AppFooter />
  </main>

  <ProjectModal
    :project="selectedProject"
    :show="isModalOpen"
    @close="closeModal"
    @zoom="zoomImage"
  />
  <ImageZoomModal
    :imageUrl="zoomedImageUrl"
    :show="isImageZoomed"
    @close="closeZoom"
  />
</template>