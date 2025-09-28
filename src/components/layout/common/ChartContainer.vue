<template>
  <div class="card">
    <div class="card__top">
      <h2>{{ props.title }}</h2>
      <Select
        :style="{
          '--widthSelect': '90px',
          '--select-span-fontSize': '9px',
          '--select-span-color': '#A8A8AA',
        }"
        :context="contextSelect()"
        @user-select="userSelect($event)"
      />
    </div>

    <component
      :is="props.contentComponent"
      :expense="props.componentData.expense"
      :income="props.componentData.income"
      :month="props.componentData.actualRangeMonth"
    />
  </div>
</template>

<script lang="ts" setup>
import { ListContextSelect } from '@/types/enum/selectContext'
import type { ChartContainerProps } from '@/types/interfaces/chartContainerProps'
import type { UserFilter } from '@/types/interfaces/userFilter'
import { ref } from 'vue'
import Select from './Select.vue'

const actualRangeMonth = ref<string[]>([])
const $emit = defineEmits<{ (event: 'userSelect', payload: UserFilter): void }>()

const props = defineProps<ChartContainerProps>()

function contextSelect() {
  const contextSelects: [string, number][] = Object.entries(ListContextSelect).filter(
    (item): item is [string, number] => {
      return !isNaN(Number(item[1]))
    },
  )

  return contextSelects.map(([span, key]) => {
    return { span, key }
  })
}

function userSelect(data: number) {
  $emit('userSelect', { filter: data, id: props.id })
}
</script>

<style lang="scss" scoped>
@use '../../../assets/mixins' as m;
@use '../../../assets/function' as f;

.card {
  width: var(--width, 100%);
  background-color: #fff;
  padding: f.rem(18);

  &__top {
    @include m.flex($justify: space-between);
  }
}
</style>
