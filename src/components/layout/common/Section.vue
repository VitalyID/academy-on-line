<script setup>
import Icon from './Icon.vue'
defineProps({
  icon: { type: String, default: null },
  png: { type: String, default: null },
  type: { type: String, validator: (value) => ['svg', 'png'].includes(value), default: null },
  text: { type: String, required: true },
  bold: { type: Number, default: null },
})

const getImageUrl = (name) => {
  return new URL(`../../../assets/images/${name}`, import.meta.url).href
}
</script>

<template>
  <div class="section">
    <div class="section__img" v-if="type">
      <Icon v-if="type === 'svg' && icon" :iconID="icon" />
      <img v-if="type === 'png' && png" :src="getImageUrl(png)" alt="iconAsideSection" />
    </div>
    <span :style="{ fontWeight: bold }">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/mixins' as m;
@use '../../../assets/function' as f;

.section {
  @include m.flex($gap: var(--gapSection), $justify: var(--justifySection));
  --iconWidth: var(--iconWidthSection, 24px);
  --iconHeight: var(--iconHeightSection, 24px);
  padding: #{f.rem(13)} #{f.rem(15)};

  & span {
    @include m.font($size: 12.6px, $color: #adaeb0, $weight: var(--weightSpanSection));
  }
}
</style>
