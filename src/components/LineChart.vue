<template>
  <canvas id="myChart" style="height: 75vh; width:100vw"></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
  data() {
    return {
    labelTimeOptions : {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric'               
    }
    }
  },
  props: {
    label: {
      type: String,
    },
    chartdata: {
      type: Array,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    }, 
  },
  mounted() { 
    const dates = this.chartdata.map(
                  (d) => new Intl.DateTimeFormat('es-PE',this.labelTimeOptions)
                    .format(new Date(d.date))
                  );
    const pricesList = this.chartdata.map((d) => d.priceUsd);
    const ctx = document.getElementById("myChart").getContext("2d");

    return new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Prices USD",
            data: pricesList,
            borderColor: [
              "#A2E9FF",
            ],
            borderWidth: 5,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Prices usd in the last 24 h",
          fontSize: 23,
          padding: 30,
          fontColor: "#1E1F1E"
        },
        elements: {
          line: {
            borderWidth: 1,
            fill: false
          },
          point: {
            radius: 1,
            borderWidth: 1,
            borderColor: '#60bad6',
            backgroundColor: '#60bad6',
            hoverRadius: 5,
            hoverBorderWidth: 2
          },
        },
        responsive: true,
      },
    });
  }
};
</script>

<style>
canvas {
  width: 100vh;
}
</style>
