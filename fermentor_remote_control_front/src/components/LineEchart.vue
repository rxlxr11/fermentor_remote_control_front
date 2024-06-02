//在Echarts.vue文件中
<template>
  <div class="Echarts">
    <div :style="{ height: height, width: width }" :id="id" v-loading="loading"></div>
  </div>
</template>



<script>
let echarts = require("echarts/lib/echarts");

export default {
  name: "LineEchart",
  props: {
    height: {
      type: String,
      default: "400px",
    },
    width: {
      type: String,
      default: "500px",
    },
    id: {
      type: String,
      default: "demo",
    },
  },
  data() {
    return {
      loading: true,
      // 定义用于存储图表数据的数组
      option: {
        title: {

        },
        backgroundColor: {
          colorStops: [
            {
              offset: 0,
              color: '#f5f4f1'
            },
            {
              offset: 1,
              color: '#f5f4f1'
            }
          ],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {},
        xAxis: {
          type: 'category',
          data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [0, 0, 0, 0, 0, 0,0,0,0,0], // 使用动态数据
            type: 'line',
            smooth: true
          }
        ]
      },
    };
  },
  mounted() {
    let myChart = echarts.init(document.getElementById(this.id))
    this.drawLine(myChart);
    this.loading = false
    // 每隔一段时间更新图表数据
    setInterval(() => {
      this.drawLine(myChart);
    }, 2000);
  },
  methods: {
    drawLine(myChart) {

      myChart.setOption(this.option);
    },
  }
    // 更新图表数据的方法
  //   updateLineData(myChart) {
  //     // 生成新的随机数据
  //     const newData = Array.from({ length: 1 }, () => Math.floor(this.option.series[0].data[9]+1));
  //     // 更新数据
  //     this.option.series[0].data = [...this.option.series[0].data.slice(-9), ...newData]; // 只保留最新的数据
  //     myChart.setOption(this.option)
  //
  //   },
  // },
};

</script>



<style>

</style>