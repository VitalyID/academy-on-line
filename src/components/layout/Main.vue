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
          <ChartContainer
            :contentComponent="dataRevenue.contentComponent"
            :componentData="dataRevenue.componentData"
            :id="dataRevenue.id"
            :title="dataRevenue.title"
            :style="{ '--width': '50%' }"
            @user-select="UpdateDataComponent($event)"
          />
          <ChartContainer
            :contentComponent="dataEnrollment.contentComponent"
            :componentData="dataEnrollment.componentData"
            :id="dataEnrollment.id"
            :title="dataEnrollment.title"
            :style="{ '--width': '50%' }"
            @user-select="UpdateDataComponent($event)"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ListMonth } from '@/types/enum/listMonth'
import { BackgroundTotalCard, LogoTotalCard } from '@/types/enum/totalCard'
import type { ChartContainerProps } from '@/types/interfaces/chartContainerProps'
import type { CardConfig } from '@/types/interfaces/totalCardConfig'
import type { UserFilter } from '@/types/interfaces/userFilter'
import { ref } from 'vue'
import Aside from './Aside.vue'
import ChartContainer from './common/ChartContainer.vue'
import EnrollmentsChart from './common/EnrollmentsChart.vue'
import Revenue from './common/Revenue.vue'
import TotalCard from './common/TotalCard.vue'

const actualRangeMonth = ref<string[]>([])

const dataRevenue = ref<ChartContainerProps>({
  contentComponent: Revenue,
  componentData: {
    expense: [2000, 3500, 1850, 5500, 9500, 3400, 2250, 7200, 9500, 1547, 8745, 3654],
    income: [4000, 4600, 9000, 2000, 6900, 4530, 3950, 8400, 5412, 6250, 5470, 2400],
    actualRangeMonth: renderCharts(3),
  },
  id: 'revenue',
  title: 'Revenue',
})

const dataEnrollment = ref<ChartContainerProps>({
  contentComponent: EnrollmentsChart,
  componentData: {
    expense: [2000, 3500, 1850, 5500, 9500, 3400, 2250, 7200, 9500, 1547, 8745, 3654],
    income: [4000, 4600, 9000, 2000, 6900, 4530, 3950, 8400, 5412, 6250, 5470, 2400],
    actualRangeMonth: renderCharts(3),
  },
  id: 'enrollment',
  title: 'Enrollment',
})

function UpdateDataComponent(data: UserFilter) {
  if (data.id === 'revenue') {
    dataRevenue.value = {
      ...dataRevenue.value,
      componentData: {
        ...dataRevenue.value.componentData,
        actualRangeMonth: renderCharts(data.filter),
      },
    }
  }

  if (data.id === 'enrollment') {
    dataEnrollment.value = {
      ...dataEnrollment.value,
      componentData: {
        ...dataEnrollment.value.componentData,
        actualRangeMonth: renderCharts(data.filter),
      },
    }
  }
}

function renderCharts(rangeStart: number): string[] {
  const dataRange = new Date()
  const firstData = dataRange.setMonth(dataRange.getMonth() - rangeStart)

  return (actualRangeMonth.value = createListMonth(
    new Date(firstData).getMonth(),
    new Date().getMonth(),
  ))
}

function createListMonth(startMonth: number, endMonth: number): string[] {
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

  return actualListMonth.map(([month]) => month)
}

function fromEnumsTotalCard(): CardConfig[] {
  const totalCardConfig = Object.entries(BackgroundTotalCard).map(([title, bgColor]) => {
    const logo = 'src/assets/images/' + LogoTotalCard[title as keyof typeof LogoTotalCard]
    console.log({ logo, amount: 0, title, bgColor })

    return { logo, amount: 0, title, bgColor }
  })
  return totalCardConfig
}
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
