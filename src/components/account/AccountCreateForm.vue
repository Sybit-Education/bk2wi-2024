<script setup lang="ts">
import { ref } from 'vue'
import accountService from '@/services/account.service'

const email = ref('')
const password = ref('')
const name = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const emit = defineEmits(['submit-account'])

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  
  // Reset messages
  errorMessage.value = ''
  successMessage.value = ''

  // Emit the account creation event to the parent component
  emit('submit-account', {
    email: email.value,
    password: password.value,
    name: name.value
  })
}
</script>

<template>
  <form @submit="handleSubmit">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input 
        type="text" 
        class="form-control" 
        id="name" 
        v-model="name" 
        required
      >
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">E-Mail</label>
      <input 
        type="email" 
        class="form-control" 
        id="email" 
        v-model="email" 
        required
      >
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Passwort</label>
      <input 
        type="password" 
        class="form-control" 
        id="password" 
        v-model="password" 
        minlength="8"
        required
      >
      <small class="form-text text-muted">
        Passwort muss mindestens 8 Zeichen lang sein
      </small>
    </div>
    
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <button
      type="submit"
      class="btn btn-primary"
    >
      Account anlegen
    </button>
  </form>
</template>

<style scoped>
form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
