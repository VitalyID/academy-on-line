<template>
  <div class="revenue">
    <Bar :data="data" :options="options" :plugins="plugin" />
  </div>
</template>

<script lang="ts" setup>
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
  type ChartOptions,
} from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels'
import { computed, ref, type PropType } from 'vue'
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

const options = ref<ChartOptions<'bar'>>({
  responsive: true,
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
      formatter: Math.round,
      font: {
        weight: 400,
        size: 9,
        family: 'Inter',
      },
      backgroundColor: '#D8E6FE',
      borderColor: '#E8F0FF',
      borderWidth: 2,
      borderRadius: 8,
      padding: {
        top: 2,
        bottom: 2,
        left: 8,
        right: 8,
      },
      color: '#C5A9BF',
    },
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

const plugin = [ChartDataLabels]

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
