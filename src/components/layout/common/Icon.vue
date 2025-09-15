<script setup>
defineProps({ iconID: { type: String, required: true } })
</script>

<template>
  <svg class="icon">
    <use :xlink:href="`#${iconID}`"></use>
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  width: var(--iconWidth);
  height: var(--iconHeight);
  fill: var(--iconFill);
}
</style>
