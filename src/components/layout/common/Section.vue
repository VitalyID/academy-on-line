<script setup>
import Icon from './Icon.vue'
defineProps({
  icon: { type: String, default: null },
  text: { type: String, required: true },
})
</script>
<template>
  <div class="section">
    <Icon v-if="icon" :iconID="icon" />
    <span>{{ text }}</span>
  </div>
</template>
