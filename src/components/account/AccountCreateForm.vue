<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Form data
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const username = ref('')

// Validation states
const emailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

const passwordValid = computed(() => password.value.length >= 8)
const passwordsMatch = computed(() => password.value === confirmPassword.value)
const usernameValid = computed(() => username.value.length >= 3)

const formValid = computed(() => 
  emailValid.value && 
  passwordValid.value && 
  passwordsMatch.value && 
  usernameValid.value
)

const router = useRouter()

const createAccount = async () => {
  if (!formValid.value) {
    return
  }

  try {
    // TODO: Implement actual account creation logic
    console.log('Creating account', { email: email.value, username: username.value })
    
    // Simulated success - replace with actual account creation
    alert('Account created successfully!')
    router.push('/')
  } catch (error) {
    console.error('Account creation failed', error)
    alert('Account creation failed. Please try again.')
  }
}
</script>

<template>
  <form @submit.prevent="createAccount" class="needs-validation" novalidate>
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <input 
        v-model="username" 
        type="text" 
        class="form-control" 
        :class="{ 'is-invalid': username.length > 0 && !usernameValid }"
        id="username" 
        placeholder="Choose a username" 
        required
      >
      <div class="invalid-feedback" v-if="username.length > 0 && !usernameValid">
        Username must be at least 3 characters long
      </div>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input 
        v-model="email" 
        type="email" 
        class="form-control" 
        :class="{ 'is-invalid': email.length > 0 && !emailValid }"
        id="email" 
        placeholder="Enter email" 
        required
      >
      <div class="invalid-feedback" v-if="email.length > 0 && !emailValid">
        Please enter a valid email address
      </div>
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input 
        v-model="password" 
        type="password" 
        class="form-control" 
        :class="{ 'is-invalid': password.length > 0 && !passwordValid }"
        id="password" 
        placeholder="Password" 
        required
      >
      <div class="invalid-feedback" v-if="password.length > 0 && !passwordValid">
        Password must be at least 8 characters long
      </div>
    </div>

    <div class="mb-3">
      <label for="confirm-password" class="form-label">Confirm Password</label>
      <input 
        v-model="confirmPassword" 
        type="password" 
        class="form-control" 
        :class="{ 'is-invalid': confirmPassword.length > 0 && !passwordsMatch }"
        id="confirm-password" 
        placeholder="Confirm Password" 
        required
      >
      <div class="invalid-feedback" v-if="confirmPassword.length > 0 && !passwordsMatch">
        Passwords do not match
      </div>
    </div>

    <button 
      type="submit" 
      class="btn btn-primary" 
      :disabled="!formValid"
    >
      Create Account
    </button>
  </form>
</template>

<style scoped>
form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
