<template>
  <div class="aside">
    <div class="aside__top">
      <img src="@/assets/images/logo.png" alt="logo" />
      <span>Coursify</span>
    </div>
    <Section
      v-for="[key, value, bold] in listSectionImage"
      :text="key"
      :png="value"
      :bold="bold"
      type="png"
    />
  </div>
</template>

<script lang="ts" setup>
import { SectionConfig } from '@/types/enum/sectionList'
import Section from './common/Section.vue'

const listSectionImage = Object.entries(SectionConfig).map((element, index) => {
  return [...element, index === 1 || index === 3 ? 400 : 700]
})
console.log(listSectionImage)
</script>

<style lang="scss" scoped>
@use '../../assets/mixins' as m;
@use '../../assets/variables' as v;
@use '../../assets/function' as f;

.aside {
  background-color: v.$bg-aside-color;

  &__top {
    @include m.flex($gap: 10px, $justify: start);
    margin-bottom: 34px;
    padding: #{f.rem(13)} #{f.rem(15)};

    & span {
      @include m.font($weight: 700, $size: 22px, $color: #5d6063);
    }
  }

  & .section {
    --justifySection: start;
    --gapSection: #{f.rem(15)};
    --iconWidth: #{f.rem(16)};
    --iconHeight: #{f.rem(16)};
  }
}
</style>
