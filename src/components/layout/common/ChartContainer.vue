<template>
  <div class="card">
    <div class="card__top">
      <h2>Revenue</h2>
      <Select
        :style="{
          '--widthSelect': '70px',
          '--select-span-fontSize': '9px',
          '--select-span-color': '#A8A8AA',
        }"
        :context="contextSelect()"
        @user-select="userSelect($event)"
      />
    </div>

    <Revenue :expense="expense" :income="income" :month="actualRangeMonth" />
  </div>
</template>

<script lang="ts" setup>
import { ListMonth } from '@/types/enum/listMonth'
import { ListContextSelect } from '@/types/enum/selectContext'
import { onMounted, ref } from 'vue'
import Revenue from './Revenue.vue'
import Select from './Select.vue'

const actualRangeMonth = ref<string[]>([])

onMounted(() => {
  userSelect(5)
})

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
  renderCharts(data)
}

function renderCharts(rangeStart: number) {
  const dataRange = new Date()
  const firstData = dataRange.setMonth(dataRange.getMonth() - rangeStart)

  actualRangeMonth.value = createListMonth(new Date(firstData).getMonth(), new Date().getMonth())

  function createListMonth(startMonth: number, endMonth: number): string[] {
    console.log(111)

    // NOTE: create arr number in range from selector-filter
    const listNumberMonth = Array.from(
      { length: endMonth - startMonth + 1 },
      (item, i) => startMonth + i,
    )

    const months = Object.entries(ListMonth).filter((month) => {
      return typeof month[1] === 'number'
    })

    // NOTE: intersection between arrays
    const actualListMonth = months.filter(([month, number]) => {
      return listNumberMonth.includes(number as number)
    })

    // NOTE:get name of month
    console.log(actualListMonth.map(([month]) => month))

    return actualListMonth.map(([month]) => month)
  }
}

// NOTE: test
const expense: number[] = [2000, 3500, 1850, 5500, 9500, 3400, 2250, 7200, 9500, 1547, 8745, 3654]
const income: number[] = [4000, 4600, 9000, 2000, 6900, 4530, 3950, 8400, 5412, 6250, 5470, 2400]
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
