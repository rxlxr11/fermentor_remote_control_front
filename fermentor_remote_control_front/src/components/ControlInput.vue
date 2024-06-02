<template>
  <el-col style="width: 200px; height: auto">
    <el-row>
      <el-slider v-model="params.prop" :disabled="disabled" vertical height="100px"  show-input size="small" debounce="500"/>
    </el-row>

    <el-row>
      <el-tag type="primary">{{ tag }}</el-tag>
      <el-button type="primary" @click="confirmControl" :disabled="disabled">确认</el-button>
    </el-row>
  </el-col>

</template>

<script>
import axios from "axios";
axios.defaults.headers.common['Content-Type'] = 'application/json';
export default {
  name: "ControlInput",

  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: " ",
    }
  },
  data() {
    return {
      params: {
        way: this.url,
        targetDevice: "fermentor_01",
        sourceDevice: "remote01",
        prop: 0
      },
      disable: true,
      tag: " ",
    }
  },
  methods: {

    confirmControl(){

      // 发送 PUT 请求给后端
      //http://localhost:8080/setCompressor http://yapi.smart-xwork.cn/mock/264565/SetDrawer
      axios.post('http://localhost:8079/' + this.url, this.params)
          .then(response => {
            // 请求成功处理
            console.log(response.data.message);
          })
          .catch(error => {
            // 请求失败处理
            console.error(error);
            alert("error");
          });

    },
  }
}
</script>

<style scoped>

</style>