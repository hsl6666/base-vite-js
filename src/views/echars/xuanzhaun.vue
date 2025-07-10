<template>
  <div class="" :style="{
    width: props.config.width + 'px',
    height: props.config.height + 'px',
  }">
    <EcharsWrapper :chartData="options"></EcharsWrapper>
  </div>
</template>

<script setup>

import { ref, onMounted, watch } from "vue";
import EcharsWrapper from "@/components/EcharsWrapper.vue";
import { roseData } from "./data.js";
const props = defineProps({
  config: {
    type: Object,
    default: {
      data:
        [
          {
            name: "今日考勤人数",
            value: 23301,
          },
          {
            name: "管理人员",
            value: 5889,
          },
          {
            name: "作业人员",
            value: 6028,
          },
          { name: "市管项目人员", value: 6028, }
        ],
      globColor: ["#00D7E9", "#DEA026", "#11AEFE",'#11AEFE'],//数据颜色
      ratio: 0.6,//中间半径
      boxHeight: 100,
      width: 100,
      height: 100,
      alpha:20,
      autoRotate:false,//是否自动旋转
      autoRotateSpeed:30//旋转速度
    }
  }
  //  const globColor = [
  //   "#00D7E9",
  //   "#DEA026",
  //   "#11AEFE"
  // ];
})
// 生成扇形的曲面参数方程（通用函数）
function getParametricEquation(options) {
  let { startRatio, endRatio, isSelected, isHovered, k, h } = options;
  // 计算
  const midRatio = (startRatio + endRatio) / 2;

  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  // 	if (startRatio === 0 && endRatio === 1) {
  // 		isSelected = false
  // 	}
  isSelected = false;

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x(u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y(u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z(u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      // 当前图形的高度是 Z 根据 h（每个 value 的值决定的）
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}

// 生成 3D 饼图的配置项
// 第一个参数饼图数据，第二个是饼图内环直径
function getPie3D(pieData, internalDiameterRatio) {
  let series = [];
  // 总和
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
  //  const globColor = [
  //   "#00D7E9",
  //   "#DEA026",
  //   "#11AEFE"
  // ];
  const globColor = props.config.globColor

  const k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    // 构建每个 seriesItem
    const seriesItem = {
      name: pieData[i].name ?? `series${i}`,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k,
      },
    };

    if (pieData[i]?.itemStyle) {
      const itemStyle = {
        color: pieData[i].itemStyle?.color ?? undefined,
        opacity: pieData[i].itemStyle?.opacity ?? undefined,
      };
      seriesItem.itemStyle = itemStyle;
    }

    series.push(seriesItem);
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。

  const linesSeries = [];
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;

    const opt = {
      startRatio: series[i].pieData.startRatio,
      endRatio: series[i].pieData.endRatio,
      isSelected: false,
      isHovered: false,
      k,
      h: series[i].pieData.value, // 防止有的数据太大，使饼图高度超出容器要 / 4
    };
    series[i].parametricEquation = getParametricEquation(opt);

    startValue = endValue;

    // 这里构建 linesSeries
    const midRadian =
      (series[i].pieData.endRatio + series[i].pieData.startRatio) * Math.PI;
    const posX = Math.cos(midRadian) * (1 + Math.cos(Math.PI / 2));
    const posY = Math.sin(midRadian) * (1 + Math.cos(Math.PI / 2));
    // 7在上边，0.1在下面
    const posZ = Math.log(Math.abs(series[i].pieData.value + 1)) * 0.1;
    const endPosArr = [posX * 1.8, posY * 1.8, posZ * 2];
    // console.log('xxxxxxx', posX, posY, posZ)
    // 如果 data 里配置了 itemStyle 的 color 就取里面的，没有的话就取这个全局色盘
    const color = pieData[i]?.itemStyle?.color ?? globColor[i];

    linesSeries.push(
      {
        type: "line3D",
        show: false,
        lineStyle: {
          color,
        },
        data: [[posX, posY, posZ], endPosArr],
      },
      {
        type: "scatter3D",
        label: {
          show: true,
          color,
          backgroundColor: "transparent",
          formatter: "{b}",
        },
        symbolSize: 0,
        data: [
          {
            name: series[i].pieData.value,
            value: endPosArr,
          },
        ],
      }
    );

    legendData.push(series[i].name);
  }

  // 周边伸出来的的线条
  // series = series.concat(linesSeries);

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    // backgroundColor: "#000",
    color: globColor,
    animation: true,
    legend: {
      show: false,
      orient: "vertical",
      icon: "rect",
      textStyle: {
        color: "#FFF",
      },
      right: "10",
      top: "10",
      data: legendData,
    },
    tooltip: {
      show: true,
      formatter: (params) => {
        // 只对饼图显示 tooltip
        if (params.seriesType === "surface") {
          const seriesName = params.seriesName;
          const color = params.color;
          const value = option.series[params.seriesIndex].pieData.value;
          return `${seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>${value}`;
        }
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      // 			min: -1,
      // 			max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: props.config.boxHeight,
      // 调整位置(常用)
      // top: "10%", // 组件的视图离容器上侧的距离
      // left: "10%",
      //  bottom:0,
      // 组件的视图宽度。
      width: '100%',
      height: '100%',
      viewControl: {
        autoRotate: props.config.autoRotate, // 是否自动旋转
        autoRotateAfterStill: 1, // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。
        alpha: props.config.alpha, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。
        beta: 0, // 视角绕 y 轴，即左右旋转的角度。
        distance: 290, // 默认视角距离主体的距离(常用，越大越远就越小)
        autoRotateSpeed: props.config.autoRotateSpeed, // 物体自转的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
        zoomSensitivity: 5, // 缩放操作的灵敏度，值越大越灵敏。默认为1。设置为 0 后无法缩放。
        rotateSensitivity: 8, // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1。设置为 0 后无法旋转。
      },

      // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
      // https://echarts.apache.org/zh/option-gl.html#globe.postEffect
      postEffect: {
        // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
        enable: false,
        bloom: {
          enable: true,
          bloomIntensity: 0.1,
        },
        // https://echarts.apache.org/zh/option-gl.html#globe.postEffect.SSAO
        SSAO: {
          enable: true,
          quality: "medium",
          radius: 15, // 环境光遮蔽的采样半径。半径越大效果越自然，但是需要设置较高的'quality'。
        },
        // 分帧超采样 https://echarts.apache.org/zh/option-gl.html#globe.temporalSuperSampling
        temporalSuperSampling: {
          enable: true,
        },
      },
    },
    series,
  };
  return option;
}

// 传入数据生成 option
const options = ref(null)
options.value = getPie3D(
  props.config.data, props.config.ratio
)
console.log("🚀 ~ option:", options.value)
</script>

<style lang="scss" scoped></style>
