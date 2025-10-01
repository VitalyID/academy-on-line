<template>
  <svg class="icon">
    <use :xlink:href="`#${iconID}`"></use>
  </svg>
</template>

<script lang="ts" setup>
defineProps({ iconID: { type: String, required: true } })
</script>

<style lang="scss" scoped>
.icon {
  width: var(--iconWidth);
  height: var(--iconHeight);
  fill: var(--iconFill);
}
</style>
