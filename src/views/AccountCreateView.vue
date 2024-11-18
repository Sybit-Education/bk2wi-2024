<script setup lang="ts">
import AccountCreateForm from '@/components/account/AccountCreateForm.vue'
</script>

<template>
  <div class="account-create container mt-4">
    <h1>Account anlegen</h1>
    <AccountCreateForm />
  </div>
</template>

<style scoped>
.account-create {
  max-width: 800px;
  margin: 0 auto;
}
</style>
