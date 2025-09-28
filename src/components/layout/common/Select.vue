<!-- NOTE: for display this component, need get props context: string[] from parent -->

<template>
  <div class="select">
    <div class="select__user">
      <div class="select__actual" @click="openSelector">
        <span>{{ actualFilter }}</span>
      </div>
      <div class="select__hidden" :class="{ open }">
        <span @click="userRange(span)" v-for="span in context">{{ span.span }}</span>
      </div>
    </div>

    <Icon
      iconID="icon-arrow-bottom"
      :style="{ '--iconWidth': '8px', '--iconHeight': '5px' }"
      @click="openSelector"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Icon from './Icon.vue'
import type { SelectItem, SelectPropsConfig } from '@/types/interfaces/selectProps'

const props = defineProps<SelectPropsConfig>()
const $emit = defineEmits(['userSelect'])

const open = ref(false)
const actualFilter = ref(props.context[3].span)

function openSelector() {
  open.value = true
}

function userRange(span: SelectItem) {
  actualFilter.value = span.span
  $emit('userSelect', span.key)
  open.value = false
}
</script>

<style lang="scss" scoped>
@use '../../../assets/function' as f;
@use '../../../assets/mixins' as m;

.select {
  @include m.flex($justify: space-between);
  width: var(--widthSelect);
  padding: var(--main-padding-select);
  position: relative;

  &__user {
    width: 100%;
  }

  &__actual {
    width: 100%;
    cursor: pointer;
  }

  &__hidden {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 0 var(--main-padding-select);
    max-height: 0;
    transition: all 1s;
    transform-origin: top;
    overflow: auto;
    border-bottom-left-radius: f.rem(10);
    border-bottom-right-radius: f.rem(10);
  }

  &__hidden.open {
    background-color: #fff;
    padding: var(--main-padding-select);
    max-height: f.rem(100);
    transition: all 1s;
    transform-origin: top;
    overflow: auto;
  }

  & span {
    display: block;
    text-align: center;
    cursor: pointer;
    @include m.font($size: var(--select-span-fontSize), $color: var(--select-span-color));
  }

  & svg {
    cursor: pointer;
  }
}
</style>
