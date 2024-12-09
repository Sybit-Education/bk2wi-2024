<template>
  <div class="account-profile container mt-4">
    <h1>Mein Profil</h1>
    
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Wird geladen...</span>
      </div>
    </div>
    
    <div v-else-if="currentAccount" class="row">
      <div class="col-md-4">
        <img 
          :src="currentAccount.profileImageUrl || '/default-avatar.png'" 
          class="img-fluid rounded-circle mb-3" 
          alt="Profilbild"
        >
        <ProfileImageUpload 
          :current-image-url="currentAccount.profileImageUrl"
          @image-uploaded="handleProfileImageUpload"
        />
      </div>
      
      <div class="col-md-8">
        <form @submit.prevent="updateProfile">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input 
              type="text" 
              class="form-control" 
              id="name" 
              v-model="editableAccount.name" 
              required
            >
          </div>
          
          <div class="mb-3">
            <label for="about" class="form-label">Über mich</label>
            <textarea 
              class="form-control" 
              id="about" 
              v-model="editableAccount.about" 
              rows="4"
            ></textarea>
          </div>
          
          <div class="mb-3">
            <label for="gender" class="form-label">Geschlecht</label>
            <select 
              class="form-select" 
              id="gender" 
              v-model="editableAccount.gender"
            >
              <option value="">Nicht angegeben</option>
              <option value="male">Männlich</option>
              <option value="female">Weiblich</option>
              <option value="other">Divers</option>
              <option value="prefer_not_to_say">Möchte ich nicht angeben</option>
            </select>
          </div>
          
          <div class="mb-3">
            <label for="birthday" class="form-label">Geburtstag</label>
            <input 
              type="date" 
              class="form-control" 
              id="birthday" 
              v-model="formattedBirthday"
            >
          </div>
          
          <button type="submit" class="btn btn-primary">Profil aktualisieren</button>
        </form>
      </div>
    </div>
    
    <div v-else class="alert alert-warning">
      Bitte melden Sie sich an, um Ihr Profil zu sehen.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
import type Account from '@/models/Account'
import ProfileImageUpload from '@/components/account/ProfileImageUpload.vue'

const accountStore = useAccountStore()
const router = useRouter()

const isLoading = ref(true)
const currentAccount = ref<Account | null>(null)
const editableAccount = ref<Partial<Account>>({})

const formattedBirthday = computed({
  get: () => {
    if (currentAccount.value?.birthday) {
      return new Date(currentAccount.value.birthday).toISOString().split('T')[0]
    }
    return ''
  },
  set: (value: string) => {
    if (editableAccount.value) {
      editableAccount.value.birthday = new Date(value)
    }
  }
})

onMounted(async () => {
  try {
    currentAccount.value = await accountStore.getCurrentAccount()
    if (currentAccount.value) {
      editableAccount.value = { ...currentAccount.value }
    } else {
      router.push('/account/create')
    }
  } catch (error) {
    console.error('Error loading account', error)
    router.push('/account/create')
  } finally {
    isLoading.value = false
  }
})

const handleProfileImageUpload = async (file: File) => {
  try {
    const imageUrl = await accountStore.uploadProfileImage(file)
    if (editableAccount.value) {
      editableAccount.value.profileImageUrl = imageUrl
    }
  } catch (error) {
    console.error('Image upload failed', error)
  }
}

const updateProfile = async () => {
  try {
    await accountStore.updateAccount(editableAccount.value as Account)
    // Optionally show a success message
  } catch (error) {
    console.error('Profile update failed', error)
    // Optionally show an error message
  }
}
</script>

<style scoped>
.account-profile {
  max-width: 800px;
}
</style>
