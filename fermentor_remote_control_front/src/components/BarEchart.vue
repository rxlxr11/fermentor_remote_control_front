//在Echarts.vue文件中
<template>
  <div class="Echarts">
    <div :style="{ height: height, width: width }" :id="id" v-loading="loading"></div>
  </div>
</template>

<script>
//import axios from "axios";

let echarts = require("echarts/lib/echarts");
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "BarEchart",
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
      default: "demo2",
    },
  },
  data() {
    return {
      loading: true,
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

        tooltip: {},
        legend: {},
        xAxis: {
          type: 'category',
          data: ['泡沫', '溶氧']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {value: 50},
              {
                value: 100,
                itemStyle: {
                  color: '#a90000'
                }
              }
            ],
            type: 'bar'
          }
        ]
      }

    };
  },
  mounted() {
    //axios.get("http://yapi.smart-xwork.cn/mock/264565/views/PerAndCon/echarts").then((result) => {
    // axios.get("http://localhost:8080/perception").then((result) => {
    //     this.chartData.categories = result.data.categories;
    //     //this.chartData.categories = result.data.result.categories;
    //     this.chartData.temp = result.data.temp;
    //     //this.chartData.temp = result.data.result.series[0].data;
    //     this.chartData.setting_temp = result.data.setting_temp;
    //     //this.chartData.setting_temp = result.data.result.series[1].data;
    //     this.drawLine(this.chartData);
    //     this.loading = false
    //   });
    let myChart = echarts.init(document.getElementById(this.id));
    this.drawBar(myChart);
    this.loading = false
    setInterval(() => {
      this.drawBar(myChart);
    }, 2000);

  },
  methods: {
    drawBar(myChart) {
      // 绘制图表
      myChart.setOption(this.option);
    },
  },
};
</script>


<style>
. {

  height: 600px;
  width: 600px;
  border: black;
  border-radius: 100px;
}
</style>