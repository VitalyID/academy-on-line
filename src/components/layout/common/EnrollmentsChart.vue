<template>
  <div class="revenue">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { ListMonth } from '@/types/enum/listMonth'
import type { GraphConfig } from '@/types/interfaces/graphConfig'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineController,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { computed, ref, watch, type PropType } from 'vue'
import { Bar } from 'vue-chartjs'

const props = defineProps({
  enrollment: {
    type: Array as PropType<number[]>,
    required: true,
  },

  actualRangeMonth: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

// console.log(props)

// import { computed, ref } from 'vue'
// import { Bar } from 'vue-chartjs'

// const props = defineProps<GraphConfig>()

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  Filler,
)

const data = computed(() => ({
  labels: props.actualRangeMonth,

  datasets: [
    {
      label: 'Enrollment',
      data: props.enrollment,
      // borderColor: 'rgb(34, 197, 94)',
      // backgroundColor: 'rgba(34, 197, 94, 0.8)',

      // label: 'Expense',
      // data: props.enrollment as number[],
      borderColor: getArrayColumnColor(props),
      backgroundColor: getArrayColumnColor(props),

      borderDash: [5, 5],
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 3,
      borderRadius: 10,
      tension: 0.4,
    },
  ],
}))

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
      align: 'start' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        boxHeight: 8,
        padding: 20,
        color: '#374151',
        font: {
          size: 13,
          weight: 'bold' as const,
          family: "'Inter', sans-serif",
        },
        generateLabels: function (chart: any) {
          const original = ChartJS.defaults.plugins.legend.labels.generateLabels
          const labels = original.call(this, chart)
          labels.forEach((label) => {
            label.fillStyle = label.strokeStyle
            label.lineWidth = 0
          })
          return labels
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
})

function getArrayColumnColor(props: GraphConfig): string[] {
  if (!props.enrollment?.length) return ['']
  const maxValue = Math.max(...props.enrollment)

  const colorArr: string[] = []

  props.enrollment?.forEach((item) => {
    item === maxValue ? colorArr.push('orange') : colorArr.push('rgb(251, 174, 228)')
  })

  return colorArr
}
</script>

<style lang="scss" scoped>
@use '../../../assets/mixins' as m;
@use '../../../assets/function' as f;

.revenue {
  background: #fefefe;
  border-radius: 10px;
  width: 100%;
  padding: f.rem(16);
  margin-bottom: f.rem(20);

  h2 {
    @include m.font($weight: 700, $size: 14px, $color: #76787b);
    line-height: 17px;
  }

  span {
    @include m.font($size: 9px, $color: #a8a8aa);

    line-height: 11px;
  }
}
</style>
