<template>
  <svg class="icon">
    <use :xlink:href="`src/assets/icons/sprite.svg#${iconID}`"></use>
  </svg>
</template>

<script lang="ts" setup>
defineProps({ iconID: { type: String, required: true } })
</script>

<style lang="scss" scoped>
.icon {
  width: var(--iconWidth, 24px);
  height: var(--iconHeight, 24px);
  fill: var(--iconFill);
}
</style>
