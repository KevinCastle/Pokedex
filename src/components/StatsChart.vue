<template>
  <div>
    <Radar :data="chartConfig.data" :options="chartConfig.options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default defineComponent({
  components: {
    Radar
  },
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const data = {
      labels: ['HP', 'Attack', 'Defense', 'Sp Attack', 'Sp Defense', 'Speed'],
      datasets: [
        {
          label: 'Stats',
          backgroundColor: 'rgba(248,113,113,0.3)',
          borderColor: '#991b1b',
          pointBackgroundColor: '#b91c1c',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: props.chartData as number[]
        }
      ]
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          ticks: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }

    const chartConfigData = {
      data,
      options
    }
    const chartConfig = ref(chartConfigData)

    return {
      chartConfig
    }
  }
})
</script>

<style scoped></style>
