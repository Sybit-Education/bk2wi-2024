<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default defineComponent({
  name: 'MarkdownRenderer',
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const renderedMarkdown = computed(() => {
      if (!props.markdown) return ''
      const htmlContent = marked(props.markdown)
      return DOMPurify.sanitize(htmlContent)
    })

    return { renderedMarkdown }
  }
})
</script>

<style scoped>
div :deep(h1) { font-size: 1.5rem; }
div :deep(h2) { font-size: 1.3rem; }
div :deep(h3) { font-size: 1.2rem; }
div :deep(p) { margin-bottom: 0.5rem; }
div :deep(ul), div :deep(ol) { margin-bottom: 0.5rem; }
</style>
