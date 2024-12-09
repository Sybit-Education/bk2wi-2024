<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
import AccountCreateForm from '@/components/account/AccountCreateForm.vue'
import type Account from '@/models/Account'

const accountStore = useAccountStore()
const router = useRouter()

const errorMessage = ref('')
const isLoading = ref(false)

const handleAccountCreation = async (account: Partial<Account>) => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    // Check if email is already registered
    const isRegistered = await accountStore.isEmailRegistered(account.email)
    if (isRegistered) {
      errorMessage.value = 'Diese E-Mail ist bereits registriert.'
      isLoading.value = false
      return
    }

    // Attempt to create account
    const success = await accountStore.createAccount(account)
    
    if (success) {
      // Redirect to profile page to complete account setup
      router.push('/account/profile')
    } else {
      errorMessage.value = 'Fehler bei der Kontoerstellung. Bitte versuchen Sie es erneut.'
    }
  } catch (error) {
    console.error('Account creation error:', error)
    errorMessage.value = 'Ein unerwarteter Fehler ist aufgetreten.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="account-create container mt-4">
    <h1>Account anlegen</h1>
    
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Wird geladen...</span>
      </div>
    </div>
    
    <div v-else>
      <AccountCreateForm 
        @submit-account="handleAccountCreation"
      />
      
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-create {
  max-width: 800px;
  margin: 0 auto;
}
</style>
