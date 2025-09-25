<template>
  <aside class="aside">
    <div class="aside__top">
      <img src="@/assets/images/logo.png" alt="logo" />
      <span>Coursify</span>
    </div>
    <NavigationItem
      v-for="section in listSectionImage"
      :text="section.text"
      :png="section.png"
      type="png"
      @click="handNavigate(section.text)"
    />
  </aside>
</template>

<script lang="ts" setup>
import { SectionConfig } from '@/types/enum/sectionList'
import type { SectionProps } from '@/types/interfaces/sectionSetting'
import { computed, type ComputedRef } from 'vue'
import NavigationItem from './common/NavigationItem.vue'

const handNavigate = (section: string) => {
  console.log('Navigate to', section)
}

const listSectionImage: ComputedRef<SectionProps[]> = computed(() => {
  return Object.entries(SectionConfig).map(([text, png]) => {
    return { png, text }
  })
})
</script>

<style lang="scss" scoped>
@use '../../assets/mixins' as m;
@use '../../assets/variables' as v;
@use '../../assets/function' as f;

.aside {
  width: 220px;
  height: 100vh;

  padding: var(--aside-padding);
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
