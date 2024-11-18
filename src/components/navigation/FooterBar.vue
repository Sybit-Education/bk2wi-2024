<script lang="ts" setup></script>

<template>
  <div class="footer-bar">
    <div class="footer-content">
      <div class="footer-copyright">
        &copy; 2024 - BK2WI 2024 - BSZ Radolfzell in Kooperation mit
        <a href="https://sybit.education">Sybit GmbH</a>.
      </div>
      <div class="footer-links">
        <router-link to="/impressum" class="footer-link">Impressum</router-link>
        <router-link to="/datenschutz" class="footer-link">Datenschutz</router-link>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.footer-bar {
  background-color: #333;
  color: white;
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-links {
  display: flex;
  gap: 15px;
}

.footer-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #007bff;
}

.footer-copyright a {
  color: white;
  text-decoration: underline;
}
</style>
