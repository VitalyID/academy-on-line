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
import type { DateNumber } from '@/types/interfaces/dateNumber'
import type { CardConfig } from '@/types/interfaces/totalCardConfig'
import type { UserFilter } from '@/types/interfaces/userFilter'
import { markRaw, onMounted, ref } from 'vue'
import Aside from './Aside.vue'
import ChartContainer from './common/ChartContainer.vue'
import EnrollmentsChart from './common/EnrollmentsChart.vue'
import Revenue from './common/Revenue.vue'
import TotalCard from './common/TotalCard.vue'

const listExpense: DateNumber[] = [
  { date: '2024-06-15T00:00:00.000Z', value: 3247 },
  { date: '2024-07-15T00:00:00.000Z', value: 5871 },
  { date: '2024-08-15T00:00:00.000Z', value: 912 },
  { date: '2024-09-15T00:00:00.000Z', value: 4563 },
  { date: '2024-10-15T00:00:00.000Z', value: 7892 },
  { date: '2024-11-15T00:00:00.000Z', value: 1345 },
  { date: '2024-12-15T00:00:00.000Z', value: 6723 },
  { date: '2025-01-15T00:00:00.000Z', value: 2987 },
  { date: '2025-02-15T00:00:00.000Z', value: 8456 },
  { date: '2025-03-15T00:00:00.000Z', value: 512 },
  { date: '2025-04-15T00:00:00.000Z', value: 6934 },
  { date: '2025-05-15T00:00:00.000Z', value: 1789 },
  { date: '2025-06-15T00:00:00.000Z', value: 4210 },
  { date: '2025-07-15T00:00:00.000Z', value: 8567 },
  { date: '2025-08-15T00:00:00.000Z', value: 2341 },
  { date: '2025-09-15T00:00:00.000Z', value: 7654 },
  { date: '2025-10-15T00:00:00.000Z', value: 1987 },
  { date: '2025-11-15T00:00:00.000Z', value: 5432 },
]

const listIncome: DateNumber[] = [
  { date: '2024-06-15T00:00:00.000Z', value: 2156 },
  { date: '2024-07-15T00:00:00.000Z', value: 4789 },
  { date: '2024-08-15T00:00:00.000Z', value: 893 },
  { date: '2024-09-15T00:00:00.000Z', value: 6321 },
  { date: '2024-10-15T00:00:00.000Z', value: 1247 },
  { date: '2024-11-15T00:00:00.000Z', value: 7563 },
  { date: '2024-12-15T00:00:00.000Z', value: 3891 },
  { date: '2025-01-15T00:00:00.000Z', value: 9124 },
  { date: '2025-02-15T00:00:00.000Z', value: 567 },
  { date: '2025-03-15T00:00:00.000Z', value: 8345 },
  { date: '2025-04-15T00:00:00.000Z', value: 2678 },
  { date: '2025-05-15T00:00:00.000Z', value: 6912 },
  { date: '2025-06-15T00:00:00.000Z', value: 1435 },
  { date: '2025-07-15T00:00:00.000Z', value: 8723 },
  { date: '2025-08-15T00:00:00.000Z', value: 3256 },
  { date: '2025-09-15T00:00:00.000Z', value: 7890 },
  { date: '2025-10-15T00:00:00.000Z', value: 4512 },
  { date: '2025-11-15T00:00:00.000Z', value: 9786 },
]

const listEnrollment: DateNumber[] = [
  { date: '2024-06-15T00:00:00.000Z', value: 7432 },
  { date: '2024-07-15T00:00:00.000Z', value: 1589 },
  { date: '2024-08-15T00:00:00.000Z', value: 5267 },
  { date: '2024-09-15T00:00:00.000Z', value: 8923 },
  { date: '2024-10-15T00:00:00.000Z', value: 3145 },
  { date: '2024-11-15T00:00:00.000Z', value: 6678 },
  { date: '2024-12-15T00:00:00.000Z', value: 1290 },
  { date: '2025-01-15T00:00:00.000Z', value: 4856 },
  { date: '2025-02-15T00:00:00.000Z', value: 8234 },
  { date: '2025-03-15T00:00:00.000Z', value: 267 },
  { date: '2025-04-15T00:00:00.000Z', value: 7198 },
  { date: '2025-05-15T00:00:00.000Z', value: 3541 },
  { date: '2025-06-15T00:00:00.000Z', value: 9067 },
  { date: '2025-07-15T00:00:00.000Z', value: 1823 },
  { date: '2025-08-15T00:00:00.000Z', value: 6390 },
  { date: '2025-09-15T00:00:00.000Z', value: 2745 },
  { date: '2025-10-15T00:00:00.000Z', value: 7812 },
  { date: '2025-11-15T00:00:00.000Z', value: 4236 },
]

const actualEnrollment = {
  January: 4000,
  February: 4600,
  March: 9000,
  April: 2000,
  May: 6900,
  June: 4530,
  July: 3950,
  August: 8400,
  September: 5412,
  October: 6250,
  November: 5470,
  December: 2400,
}

const dataRevenue = ref<ChartContainerProps>({
  contentComponent: markRaw(Revenue),
  componentData: {
    expense: updatedValueCharts(0, listExpense).map((item) => {
      return item.value
    }),
    income: updatedValueCharts(0, listIncome).map((item) => {
      return item.value
    }),
    actualRangeMonth: updatedValueCharts(0, listEnrollment).map((item) => {
      return item.date
    }),
  },
  id: 'revenue',
  title: 'Revenue',
})

const dataEnrollment = ref<ChartContainerProps>({
  contentComponent: markRaw(EnrollmentsChart),
  componentData: {
    enrollment: updatedValueCharts(0, listEnrollment).map((item) => {
      return item.value
    }),
    actualRangeMonth: updatedValueCharts(0, listEnrollment).map((item) => {
      return item.date
    }),
  },
  id: 'enrollment',
  title: 'Enrollment Trends',
})

onMounted(() => {
  UpdateDataComponent({ filter: 6, id: 'revenue' })
  UpdateDataComponent({ filter: 6, id: 'enrollment' })
})

function updatedValueCharts(range: number, list: DateNumber[]): DateNumber[] {
  const currentData = new Date()
  const startRange = new Date(currentData)
  startRange.setMonth(currentData.getMonth() - range)

  const actualRange = list.filter((unit) => {
    return new Date(unit.date) <= currentData && new Date(unit.date) >= startRange
  })

  return actualRange.map((data) => {
    return { ...data, date: new Date(data.date).toLocaleDateString('en-US', { month: 'long' }) }
  })
}

function UpdateDataComponent(data: UserFilter) {
  if (data.id === 'revenue') {
    dataRevenue.value = {
      ...dataRevenue.value,
      componentData: {
        expense: updatedValueCharts(data.filter, listExpense).map((item) => {
          return item.value
        }),
        income: updatedValueCharts(data.filter, listIncome).map((item) => {
          return item.value
        }),
        actualRangeMonth: updatedValueCharts(data.filter, listEnrollment).map((item) => {
          return item.date
        }),
      },
    }
  }

  if (data.id === 'enrollment') {
    dataEnrollment.value = {
      ...dataEnrollment.value,
      componentData: {
        enrollment: updatedValueCharts(data.filter, listEnrollment).map((item) => {
          return item.value
        }),
        actualRangeMonth: updatedValueCharts(data.filter, listEnrollment).map((item) => {
          return item.date
        }),
      },
    }
  }
}

function fromEnumsTotalCard(): CardConfig[] {
  const totalCardConfig = Object.entries(BackgroundTotalCard).map(([title, bgColor]) => {
    const logo = 'src/assets/images/' + LogoTotalCard[title as keyof typeof LogoTotalCard]

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
