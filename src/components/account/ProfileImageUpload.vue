<template>
  <div class="profile-image-upload">
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      class="form-control"
      accept="image/jpeg,image/png,image/gif"
      style="display: none;"
    >
    <div class="image-preview-container">
      <img
        :src="previewImageUrl || defaultImageUrl"
        @click="triggerFileInput"
        class="img-fluid rounded-circle profile-image-preview"
        alt="Profile Image"
      >
      <button
        @click="triggerFileInput"
        class="btn btn-secondary btn-sm upload-button"
      >
        {{ previewImageUrl ? 'Change Image' : 'Upload Image' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'

const props = defineProps({
  profileImages: {
    type: Array as () => string[],
    default: () => []
  }
})

const emit = defineEmits(['image-uploaded'])

const fileInput = ref<HTMLInputElement | null>(null)
const previewImageUrl = ref<string | null>(null)
const defaultImageUrl = '/default-avatar.png'

// Watch for changes in profileImages and set the first image
watch(() => props.profileImages, (newImages) => {
  previewImageUrl.value = newImages && newImages.length > 0
    ? newImages[0]
    : defaultImageUrl
}, { immediate: true })

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (JPEG, PNG, or GIF)')
      return
    }

    if (file.size > maxSize) {
      alert('Image size should be less than 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImageUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(file)

    // Emit file for upload
    emit('image-uploaded', file)
  }
}
</script>

<style scoped>
.profile-image-preview {
  width: 200px;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.3s;
}

.profile-image-preview:hover {
  opacity: 0.7;
}

.image-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.upload-button {
  margin-top: 10px;
}
</style>
