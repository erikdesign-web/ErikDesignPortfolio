<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-left">
        <p>&copy; {{ currentYear }} Erik Design. Todos los derechos reservados.</p>
        <p>Desarrollado por Erik Agudo</p>
      </div>
      <div class="footer-right">
        <div class="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
        </div>
        <div class="footer-email">
          <a href="mailto:erik@ejemplo.com">erikagudo.design@gmail.com</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: $color-bg;
  color: $color-primary;
  padding: 60px 80px;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid $color-acent;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; 
  }

  .footer-left {
    text-align: left;
  }

  .footer-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
    gap: 1rem;
  }

  .footer-socials {
    display: flex;
    gap: 1.5rem;

    a {
      color: $color-acent;
      text-decoration: none;
      font-weight: 400;
      font-size: 0.9rem;
      transition: color 0.3s ease;

      &:hover {
        color: lighten($color-acent, 10%);
      }
    }
  }

  .footer-email a {
    font-weight: 400; 
    color: $color-acent;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: lighten($color-acent, 10%);
    }
  }

  p {
    margin: 5px 0;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;

    .container {
      flex-direction: column;
      gap: 2rem;
    }
    .footer-left, .footer-right {
      text-align: center;
      align-items: center;
    }
  }
}
</style>