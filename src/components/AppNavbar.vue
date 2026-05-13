<script setup>
defineProps({ isMenuOpen: Boolean });
const emit = defineEmits(['toggle']);
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <button class="menu-toggle" :class="{ 'is-active': isMenuOpen }" @click="emit('toggle')">
        <span></span><span></span><span></span>
      </button>
      <ul :class="{ 'is-open': isMenuOpen }">
        <li><a href="#inicio" @click="emit('toggle')">Inicio</a></li>
        <li><a href="#sobre-mi" @click="emit('toggle')">Sobre mí</a></li>
        <li><a href="#proyectos" @click="emit('toggle')">Proyectos</a></li>
        <li><a href="#contacto" @click="emit('toggle')">Contacto</a></li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 20px 0;
  background: rgba($color-bg, 0.9);
  backdrop-filter: blur(10px);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  z-index: 1100;
}

.menu-toggle span {
  display: block;
  width: 30px;
  height: 2px;
  background-color: $color-primary;
  transition: all 0.3s ease;
}

.navbar ul {
  display: flex;
  justify-content: center;
  gap: 7rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar a {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 13px;
  text-decoration: none;
  color: $color-primary;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  padding: 5px 0;
}

.navbar a:hover {
  color: $color-acent;
}

@media (max-width: $bp-mobile) {
  .menu-toggle { display: flex; }
  .menu-toggle.is-active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .menu-toggle.is-active span:nth-child(2) { opacity: 0; }
  .menu-toggle.is-active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

  .navbar ul {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100vh;
    background: $color-bg;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
    gap: 30px;
    transform: translateX(100%);
    transition: transform 0.4s ease;
  }
  .navbar ul.is-open { transform: translateX(0); }
  .navbar a { font-size: 20px; }
}
</style>