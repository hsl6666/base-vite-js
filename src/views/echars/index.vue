<template>
  <div
    class="p-[50px] box-border w-[100%] h-[100vh] bg-[#0C2A62]  flex justify-between flex-wrap overflow-auto text-[40px] text-[#fff] space-x-[50px] space-y-[50px]">
    <div class="w-[800px] h-[400px]">
      <p class="text-[#fff] text-[30px] ">折线图</p>
      <EcharsWrapper :chartData="coverageData3"></EcharsWrapper>
    </div>
    <div class="w-[800px] h-[400px]">
      <p class="text-[#fff] text-[30px]">圆柱加折线图</p>
      <EcharsWrapper :chartData="coverageData2"></EcharsWrapper>
    </div>
    <div class="w-[800px] h-[400px]">
      <p class="text-[#fff] text-[30px]">面图</p>
      <EcharsWrapper :chartData="coverageData"></EcharsWrapper>
    </div>
    <div class="w-[800px] h-[400px]">
      <p class="text-[#fff] text-[30px]">静态3D饼图</p>
      <EcharsWrapper :chartData="option" ref="pieWrapper"></EcharsWrapper>
    </div>
    <div class="w-[800px] h-[400px]">
      <p class="text-[#fff] text-[30px]">排行图</p>
      <EcharsWrapper :chartData="option2"></EcharsWrapper>
    </div>
    <div class="m-[50px] flex">
      <xuanzhaun></xuanzhaun>
      <div class="flex flex-col">
        <div class="flex items-center bg-[rgba(18,68,101,0.38)] px-[16px] py-[8px] rounded-[2px]">
          <div class="is-rounded"></div>
          <span class="text-[14px] ml-[10px]">人员：未戴安全帽、违规动火</span>
        </div>
        <div class="flex items-center bg-[rgba(18,68,101,0.38)] mt-[13px] px-[16px] py-[8px] rounded-[2px]">
          <div class="is-rounded2"></div>
          <span class="text-[14px] ml-[10px]">设备：塔吊超载</span>
        </div>
        <div class="flex items-center bg-[rgba(18,68,101,0.38)] mt-[13px] px-[16px] py-[8px] rounded-[2px]">
          <div class="is-rounded3"></div>
          <span class="text-[14px] ml-[10px]">环境：粉尘超标、噪音超标</span>
        </div>
        <div class="flex items-center bg-[rgba(18,68,101,0.38)] mt-[13px] px-[16px] py-[8px] rounded-[2px]">
          <div class="is-rounded4"></div>
          <span class="text-[14px] ml-[10px]">危大工程：深基坑位移</span>
        </div>
      </div>
    </div>
    <div class="w-[400px] h-[400px] ">
      <p>旋转3D饼图 </p>
      <xuanzhaun :config="xzConfigData2"></xuanzhaun>
    </div>

    <div class="w-[400px] h-[400px] ">
      <p>双柱状图 </p>
      <EcharsWrapper :chartData="localChartData"></EcharsWrapper>
    </div>
    <!-- 排名 -->
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue"
// import EcharsWrapper from "@/components/EcharsWrapper.vue";
import EcharsWrapper from "../../components/EcharsWrapper.vue"
import { coverageData, coverageData2, coverageData3, option, option2, zhuzhuangData } from "./echarsOptions.js";
import xuanzhaun from "./xuanzhaun.vue";
// import $Test from "@/api/index.ts"
import autofit from "autofit.js";
// echars的赋值---->一定要克隆一层！！！！
const localChartData = ref({
  ...zhuzhuangData.value
});
const tsetRequest = async () => {
  // const res = await $Test.getTestInfo()
  // console.log(res,zhuzhuangData.value)
  // 此处测试接口没有数据 模拟的假数据赋值
  const sjl = [111, 222, 333, 444];//事件量
  const rpjs = [111, 222, 333, 444];//日平均数

  // 正确的方式更新图表数据
  localChartData.value = {
    ...localChartData.value,
    series: [
      {
        ...localChartData.value.series[0],
        data: sjl
      },
      {
        ...localChartData.value.series[1],
        data: rpjs
      }
    ]
  };
  console.log(".......", localChartData.value.series[0].data)
}
tsetRequest()
const pieWrapper = ref(null)
const handleTuban = () => {
  dialogRef2.value.diaShown = true;
};
const xzConfigData2 = ref({
  data: [
    { name: "其他", value: 59.4, },
    { name: "施工用电", value: 8.85, },
    { name: "脚手架", value: 12.02, },
    { name: "基坑", value: 5.3, },
    { name: "临边及洞口防护", value: 14.41, },
  ],
  globColor: ["#00ADEF", "#00D7E9", '#D382F6', '#87F1C5', '#E1C76B'],
  ratio: 0.6,
  boxHeight: 30,
  width: 400,
  height: 400,
  alpha: 20,
  autoRotate: true
})
</script>

<style lang="scss" scoped>
.is-rounded {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 5px solid #6bb6ed;
}

.is-rounded2 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 5px solid #1EA59D;
}

.is-rounded3 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 5px solid #FFBF5B;
}

.is-rounded4 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 5px solid #FF855B;
}
</style>
