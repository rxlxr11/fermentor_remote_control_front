<template>

  <el-container>
    <el-header class="header">发酵罐远程控制</el-header>
    <el-main>


      <el-select
          v-model="this.targetDevice"
          value-key="value"
          @change="targetChange"
          style="width: 150px"
      >
        <el-option
            v-for="item in option3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>


      <el-divider/>

      <el-select
          v-model="params.controlWay"
          value-key="value"
          @change="modeChange"

          style="width: 120px"
      >
        <el-option
            v-for="item in option1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>





      <el-select
          v-model="params.systemState"
          disabled
          style="width: 120px"
      >
        <el-option
            v-for="item in option2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <el-divider/>
      <el-col :gutter="24">
        <el-row :span="1"/>
        <el-row :span="10" :gutter="24">
          <el-col :span="1"/>
          <el-col :span="10" style="background-color: #f5f4f1" class="content">
            <line-echart ref="tempChart" :id=chartId1>
            </line-echart>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="10" style="background-color: #f5f4f1" class="content">
            <bar-echart ref="barChart" :id=chartId3>
            </bar-echart>
          </el-col>
          <el-col :span="1"/>
        </el-row>
        <el-row :span="2"/>
        <el-divider/>
        <el-row :span="10" :gutter="24">
          <el-col :span="1"/>
          <el-col :span="10" style="background-color: #f5f4f1" class="content">
            <line-echart ref="phChart" :id=chartId2></line-echart>
          </el-col>
          <el-col :span="2"/>

          <el-col :span="10" style="background-color: #f5f4f1" class="content">
            <el-row :gutter="35">
              <el-col :span="6">
                <control-input ref="heatSet" :url="url[0]" :disabled="isDisabled"></control-input>
              </el-col>
              <el-col :span="6">
                <control-input ref="frozeSet" :url="url[1]" :disabled="isDisabled"></control-input>
              </el-col>
              <el-col :span="6">
                <control-input ref="acidSet" :url="url[2]" :disabled="isDisabled"></control-input>
              </el-col>
              <el-col :span="6">
                <control-input ref="alkaliSet" :url="url[3]" :disabled="isDisabled"></control-input>
              </el-col>
              <el-col :span="6">
                <control-input ref="stirSet" :url="url[4]" :disabled="isDisabled"></control-input>
              </el-col>
              <el-col :span="1"/>

            </el-row>
          </el-col>
        </el-row>
        <el-row :span="1"/>
      </el-col>
    </el-main>
  </el-container>


</template>

<script>
// @ is an alias to /src


import LineEchart from "@/components/LineEchart.vue";
import BarEchart from "@/components/BarEchart.vue";
import ControlInput from "@/components/ControlInput.vue";
import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json';


export default {
  name: 'HomeView',
  components: {
    ControlInput,
    BarEchart,
    LineEchart,

  },
  data() {
    return {
      option1: [
        {
          value: '远程控制',
          label: '远程控制',
        },
        {
          value: '本地控制',
          label: '本地控制',
        },
      ],

      option2: [
        {
          value: '开机',
          label: '开机',
        },
        {
          value: '关机',
          label: '关机',
        },
      ],

      option3: [
        {
          value: 'fermentor_01',
          label: 'fermentor_01',
        },
        {
          value: 'fermentor_02',
          label: 'fermentor_02',
        },
      ],

      targetDevice: "fermentor_01",
      payload:
          {
            way: " ",
            sourceDevice: "remote01",
            targetDevice: this.targetDevice,
            prop: 0
          },
      isDisabled: true,
      chartId1: "tempChart",
      chartId2: "phChart",
      chartId3: "barChart",
      url: ["heatSet", "frozeSet", "acidSet", "alkaliSet", "stirSet"],
      params: {
        temp: 5.0,
        oxygen: 5.0,
        ph: 7.0,
        bubble: 50.0,
        controlWay: '本地控制',
        systemState: '关机',
        heatSet: 0,
        acidSet: 0,
        frozeSet: 0,
        stirSet: 0,
        alkaliSet: 0
      }
    }
  },
  mounted() {
    this.$refs.heatSet.tag = "加热";
    this.$refs.frozeSet.tag = "冷却";
    this.$refs.acidSet.tag = "加酸";
    this.$refs.alkaliSet.tag = "加碱";
    this.$refs.stirSet.tag = "搅拌";
    this.$refs.phChart.option.title.text = "PH值随时间变化曲线";
    this.$refs.tempChart.option.title.text = "温度随时间变化曲线";
    setInterval(() => {
      this.getData();
    }, 20000);
  },
  methods: {


    init() {
      this.$refs.heatSet.params.prop = this.params.heatSet;
      this.$refs.frozeSet.params.prop = this.params.frozeSet;
      this.$refs.acidSet.params.prop = this.params.acidSet;
      this.$refs.alkaliSet.params.prop = this.params.alkaliSet;
      this.$refs.stirSet.params.prop = this.params.stirSet;
      this.upDateTemp();
      this.upDatePh();
      this.upDateBar();
      // this.$refs.heatSet.value = this.data.params.heatSet;
      // this.$refs.heatSet.value = this.data.params.heatSet;
      // this.$refs.heatSet.value = this.data.params.heatSet;
      // this.$refs.heatSet.value = this.data.params.heatSet;
    },

    getData() {
      axios.get("http://localhost:8079/home",{params: {targetDevice: this.targetDevice}})
          .then((result) => {
        this.params = result.data.value;
        this.init();
        this.loading = false;
      });
    },

    targetChange() {
      this.$refs.tempChart.option.series[0].data = [0,0,0 ,0,0,0,0,0,0,0];
      this.$refs.phChart.option.series[0].data = [0,0,0 ,0,0,0,0,0,0,0];
      this.$refs.heatSet.params.targetDevice = this.targetDevice;
      this.$refs.frozeSet.params.targetDevice = this.targetDevice;
      this.$refs.acidSet.params.targetDevice = this.targetDevice;
      this.$refs.alkaliSet.params.targetDevice = this.targetDevice;
      this.$refs.stirSet.params.targetDevice = this.targetDevice;
      this.getData();
    },

    modeChange() {
      this.payload.way = 'controlWay';
      this.payload.prop = this.params.controlWay;
      this.payload.targetDevice = this.targetDevice;
      axios.post('http://localhost:8079/controlWay', this.payload)
          .then(response => {
            // 请求成功处理
            console.log(response.data.message);
            alert(response.data.message);
          })
          .catch(error => {
            // 请求失败处理
            console.error(error);
            alert("error");
          });

      if (this.params.controlWay === "远程控制") {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },


    upDateTemp() {
      //this.$refs.tempChart.option.title.text = "温度变化曲线";
      const newData = Array.from({length: 1}, () => Math.floor(this.params.temp));
      // 更新数据
      this.$refs.tempChart.option.series[0].data = [...this.$refs.tempChart.option.series[0].data.slice(-9), ...newData]; // 只保留最新的数据;

    },
    upDatePh() {
      //this.$refs.phChart.option.title.text = "PH变化曲线";
      const newData = Array.from({length: 1}, () => Math.floor(this.params.ph));
      // 更新数据
      this.$refs.phChart.option.series[0].data = [...this.$refs.phChart.option.series[0].data.slice(-9), ...newData]; // 只保留最新的数据;

    },
    upDateBar() {
      // 更新数据
      this.$refs.barChart.option.series[0].data[0].value = this.params.bubble;
      this.$refs.barChart.option.series[0].data[1].value = this.params.oxygen;

    }
  }
}
</script>

<style lang="css">
body {
  margin: 0;
  background-color: #fffefb;
}

.content {
  border-radius: 25px;
}

.header {
  background-color: #d4eaf7;
}

</style>
