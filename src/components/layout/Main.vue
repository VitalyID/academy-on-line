<template>
  <div class="wrap">
    <div class="container">
      <Aside />
      <main class="main">
        <div class="main__total">
          <TotalCard
            v-for="card in fromEnumsTotalCard()"
            :logo="card.logo"
            :amount="card.amount"
            :title="card.title"
            :bg-color="card.bgColor"
          />
        </div>

        <div class="main__graphs">
          <!-- <Revenue :expense="expense" :income="income" :month="actualRangeMonth" />
          <p>Здесь будет график</p> -->
          <ChartContainer :style="{ '--width': '50%' }" />
          <ChartContainer :style="{ '--width': '50%' }" />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ListMonth } from '@/types/enum/listMonth'
import { BackgroundTotalCard, LogoTotalCard } from '@/types/enum/totalCard'
import type { CardConfig } from '@/types/interfaces/totalCardConfig'
import Aside from './Aside.vue'
import ChartContainer from './common/ChartContainer.vue'
import TotalCard from './common/TotalCard.vue'

function fromEnumsTotalCard(): CardConfig[] {
  const totalCardConfig = Object.entries(BackgroundTotalCard).map(([title, bgColor]) => {
    const logo = 'src/assets/images/' + LogoTotalCard[title as keyof typeof LogoTotalCard]
    console.log({ logo, amount: 0, title, bgColor })

    return { logo, amount: 0, title, bgColor }
  })
  return totalCardConfig
}

// NOTE: test
// const expense: number[] = [2000, 3500, 1850, 5500, 9500, 3400, 2250, 7200]
// const income: number[] = [4000, 4600, 9000, 2000, 6900, 4530, 3950, 8400]

// const dataRange = new Date()
// const firstData = dataRange.setMonth(dataRange.getMonth() - 6)

// const actualRangeMonth = createListMonth(new Date(firstData).getMonth(), new Date().getMonth())

// function createListMonth(startMonth: number, endMonth: number): string[] {
//   // NOTE: create arr number in range from selector-filter
//   const listNumberMonth = Array.from(
//     { length: endMonth - startMonth + 1 },
//     (item, i) => startMonth + i,
//   )

//   const months = Object.entries(ListMonth).filter((month) => {
//     return typeof month[1] === 'number'
//   })

//   // NOTE: intersection between arrays
//   const actualListMonth = months.filter(([month, number]) => {
//     return listNumberMonth.includes(number as number)
//   })

//   // NOTE:get name of month
//   return actualListMonth.map(([month]) => month)
// }
//
</script>

<style lang="scss" scoped>
@use '../../assets/mixins' as m;
@use '../../assets/function' as f;
@use '../../assets/variables' as v;

.main {
  width: 1220px;
  height: 100vh;
  background-color: v.$bg-main-color;
  padding: var(--main-padding);

  &__total {
    @include m.flex($gap: var(--main-gap));
    margin-bottom: f.rem(19);
  }

  &__graphs {
    @include m.flex($gap: var(--main-gap));
  }
}
</style>
