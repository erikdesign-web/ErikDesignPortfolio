<script setup>
const handleSubmit = () => {
  alert('¡Gracias! Mensaje enviado (esto es una simulación).');
};
</script>

<template>
  <section id="contacto" class="section">
    <div class="container contact-container">
      <div class="contact-header">
        <h1>Contacto<span class="dot">.</span></h1>
        <p>¿Quieres trabajar conmigo? Adelante!</p>
      </div>
      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <input type="text" placeholder="Nombre" required />
        </div>
        <div class="form-group">
          <input type="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <textarea placeholder="Mensaje" rows="5" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Enviar mensaje</button>
      </form>
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

.contact-container {
  max-width: 600px;
  width: 100%;
}

.contact-header {
  margin-bottom: 40px;

  h1 {
    .dot {
      color: $color-acent;
    }
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px 0;
  font-family: $font-body;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease;
  color: #fff;
}

.form-group input:focus,
.form-group textarea:focus {
  border-bottom-color: $color-primary;
}

.submit-btn {
  align-self: flex-start;
  margin-top: 20px;
  padding: 12px 40px;
  font-family: $font-body;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
  background-color: $color-acent;
  color: #000;
  border: 1px solid $color-acent;
  border-radius: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: transparent;
  color: $color-acent;
}
</style>