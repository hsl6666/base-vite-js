<template>
  <div class="w-[100%] h-[1080px]  relative flex flex-wrap overflow-auto">
    <!-- <Bim /> -->
    <!-- 五色图 -->
    <!-- <mapCom1
          ref="mapWms"
          style="width: 100%; height: 100%"
          @handleEmitTuban="handleTuban"
        ></mapCom1> -->
    <div class="w-[800px] h-[400px]">
      <p class="text-[#fff] text-[30px]">折线图</p>
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
      <p class="text-[#fff] text-[30px]">3D饼图</p>
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

    <!-- 排名 -->
  </div>
</template>

<script setup>
import {ref} from "vue"
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import Bim from "../../components/map/Bim.vue"
import mapCom1 from "@/components/map/citySupplyHeat3D-new.vue";
import { coverageData, coverageData2, coverageData3,option,option2 } from "./echarsOptions.js";
import xuanzhaun from "./xuanzhaun.vue";
const pieWrapper=ref(null)
const handleTuban = () => {
  dialogRef2.value.diaShown = true;
};

import { onMounted } from "vue"
import autofit from "autofit.js";



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
