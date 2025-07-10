<template>
  <div class="w-[100%] px-[20px] box-border" id="app">
     <!-- 地图 -->
     <div class="map-container  flex flex-col items-center">
        <div class="text-[#128644] text-[30px] mb-[10px] font-bold flex justify-center">责任规划师一张图</div>
        <div class="map-chart relative ">
          <div id="chongqingMap" class="w-[1250px] h-[700px] "></div>
          <button v-if="currentMap === 'district'" @click="backToChongqing"
            style="position:absolute;top:10px;right:10px;z-index:10;background:#128644;color:#fff;padding:6px 16px;border:none;border-radius:4px;cursor:pointer;">返回重庆市</button>
        </div>
      </div>
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted, reactive, toRefs } from "vue";
import * as echarts from "echarts";
import "echarts-gl";
import chongqing from "./cq.json";
import autofit from 'autofit.js'
import $Test from "@/api"

let chartInstance = null;
let currentMap = ref('chongqing');
let chongqingGeoJson = null;
let currentDistrict = '';
const distance=ref(125)
const initChart = async (mapName = 'chongqing', districtName = '') => {
  const chartDom = document.getElementById("chongqingMap");
  if (!chartDom) return;

  chartInstance = echarts.init(chartDom);

  let geoJson;
  if (mapName === 'chongqing') {
    distance.value=125
    // const response = await fetch(
    //   "https://geo.datav.aliyun.com/areas_v3/bound/500000_full.json"
    //   // "http://lc-F59ERqoe.cn-n1.lcfile.com/2HSeD9E5ptJAomuNT9zlH3GwWnJ2hVQF/2025%E9%87%8D%E5%BA%86%E4%B9%A1%E9%95%87.json"
    // );
    geoJson = chongqing;
    chongqingGeoJson = geoJson;
    currentMap.value = 'chongqing';
    currentDistrict = '';
  } else if (mapName === 'district' && districtName) {
    distance.value=160
    // 请求区县的详细JSON数据
    const url = '/YiZhangTu/GeoJson/' + encodeURIComponent('重庆_' + districtName) + '.json';
    const response = await fetch(url);
    geoJson = await response.json();
    chongqingGeoJson = geoJson;
    currentMap.value = 'district';
    currentDistrict = districtName;
  }
  echarts.registerMap(mapName, geoJson);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return (
          (params.data && params.data.name ? params.data.name : params.name) +
          "<br/>" +
          "首席规划师：" + (params.data && params.data.villageCount ? params.data.villageCount : '-') +
          "<br/>" +
          "社区规划师：" + (params.data && params.data.communityCount ? params.data.communityCount : '-') +
          "<br/>" +
          "乡村规划师：" + (params.data && params.data.villageCount ? params.data.villageCount : '-')
        );
      },
    },
    series: [
      {
        name: mapName === 'chongqing' ? "重庆" : districtName,
        type: "map3D",
        map: mapName,
        roam: true,
        top: '-20%',
        bottom: "0%",
        left: 0,
        label: {
          show: true,
          color: "#fff",
          fontSize: 14,
          distance: 100
        },
        itemStyle: {
          color: "#3CC07F",
          // #3CC07F
          borderColor: "#3CC07F",
          borderWidth: 1,
        },
        regionHeight: 4,
        emphasis: {
          label: {
            color: "#fff",
          },
          itemStyle: {
            color: "#128644",

            // color: "#3CC07F",
          },
        },
        viewControl: {
          zoom: 1,
          minZoom: 0.5,
          maxZoom: 3,
          pitch: 0,
          alpha:50,
          distance: distance.value
        },
        shading: 'realistic',
        realisticMaterial: {
          detailTexture: '/grass.jpg',
          roughness: 0.1,
          metalness: 0,
          // textureTiling: 10,
          textureIntensity: 1
        }
      },
    ],
  };

  chartInstance.setOption(option);

  chartInstance.off("click"); // 先解绑，防止多次绑定
  chartInstance.on("click", function (params) {
    if (currentMap.value === 'chongqing' && params.name) {
      // 下钻到区
      chartInstance.dispose();
      initChart('district', params.name);
    }
  });
};

onMounted(() => {
  autofit.init({
    designHeight: 1080,
    designWidth: 1920,
    renderDom: "#app",
    resize: true
  }, false)
  initChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  window.removeEventListener("resize", handleResize);
});

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

function backToChongqing() {
  if (chartInstance) {
    chartInstance.dispose();
  }
  initChart('chongqing');
}
</script>

<style lang="scss" scoped>
.map-container {

  position: relative;

  .map-title {
    position: absolute;
    top: 20px;
    left: 20px;
    color: #fff;
    font-size: 24px;
  }

  .map-chart {
    width: 1250px;  
    height: 700px;
    background: url("../assets/bg.png") no-repeat center center;
    background-size: 100% 100%;
  }
}

.is-left-bg {
  background: url("@/assets/icon1.png") no-repeat center center;
  background-size: 100% 100%;
}
</style>