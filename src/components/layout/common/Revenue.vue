<template>
  <div class="revenue">
    <Line :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { computed, ref, type PropType } from 'vue'
import { Line } from 'vue-chartjs'

const props = defineProps({
  expense: {
    type: Array as PropType<number[]>,
    required: true,
  },
  income: {
    type: Array as PropType<number[]>,
    required: true,
  },

  actualRangeMonth: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

console.log(props)

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
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
      label: 'Income',
      data: props.income,
      borderColor: 'rgb(59, 130, 246)',
      borderDash: [],
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 3,
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      tension: 0.4,
    },
    {
      label: 'Expense',
      data: props.expense,
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderDash: [5, 5],
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 3,
      tension: 0.4,
    },
  ],
}))

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
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
