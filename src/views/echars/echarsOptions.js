import { reactive, ref } from "vue";
// 1
import * as echarts from "echarts";
const charts = {
  unit: ' ',
  names: ["线上审查覆盖率", "线下审查占比"],
  lineX: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
  value: [
    [23, 45, 67, 12, 89, 34, 56, 78, 91, 3, 25, 50],
    [7, 32, 58, 14, 76, 90, 41, 22, 85, 63, 18, 99]
  ]

}
const color = ['rgba(255, 191, 91, 1)', 'rgba(105, 251, 170, 1)']
const lineY = []
for (let i = 0; i < charts.names.length; i++) {
  let x = i
  if (x > color.length - 1) {
      x = color.length - 1
  }
  const data = {
      name: charts.names[i],
      type: 'line',
      color: color[x],
      smooth: true,
      areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                      offset: 0,
                      color: color[x].replace('1)', '0.3)')
                  },
                  {
                      offset: 0.8,
                      color: color[x].replace('1)', '0)')
                  }
              ]),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10,
      },
      symbol: 'circle',
      symbolSize: 5,
      data: charts.value[i]
  }
  lineY.push(data)
}


export const coverageData= ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["漏报阈值", "漏报率"],
    top: 0,
    // right: 80,
    left: 0,
    textStyle: {
      fontSize: 16,
      color: "#fff",
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["季度一", "季度二", "季度三", "季度四"],
    },
  ],
  yAxis: [
    {
      type: "value",
      splitLine: {
        lineStyle: {
          type: 'dashed', // 设置为虚线
          color: 'rgba(128, 164, 229, 0.4)', // 可设置颜色
          width: 1 // 可设置宽度
        }
      }
    },
  ],
  series: [
    {
      name: "漏报阈值",
      data: [23, 23, 23, 23],
      type: "line",
      color: "#FFBF5B",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
    },
    {
      name: "漏报率",
      data: [23, 80, 72, 69],
      type: "line",
      color: "#406EA9",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
    },
  ],
});

export const coverageData2 = ref({
  legend: {
    data: ["按资质等级", "项目达标率"],
    top: 0,
    // right: 80,
    left: 0,
    textStyle: {
      fontSize: 16,
      color: "#fff",
    },
  },
  grid: {
    left: "5%",
    // right: '10%',
    bottom: "10%",
  },
  xAxis: {
    type: "category",
    data: ['企业1', '企业2', '企业3', '企业4', '企业5','企业6'],
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        type: 'dashed', // 设置为虚线
        color: 'rgba(128, 164, 229, 0.4)', // 可设置颜色
        width: 1 // 可设置宽度
      }
    }
  },

  series: [
    {
      name: "按资质等级",
      data: [80, 74, 65, 99, 78, 90],
      type: "bar",
      color: "#406EA9",
      stack: "Total",
      areaStyle: {},
      smooth: false,
      showSymbol: false,
      itemStyle: {
          borderRadius: 5 // 设置柱子的圆角
      },
      barWidth: '30%'
    },
    {
      name: "项目达标率",
      data: [53, 62, 71, 84, 90, 80],
      type: "line",
      color: "#FFBF5B",
    },
  ],
});

export const coverageData3= {
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ["线上审查覆盖率", "线下审查占比"],
      textStyle: {
          fontSize: 12,
          color: '#fff'
      },
      right: '4%'
  },
  grid: {
      top: '14%',
      left: '4%',
      right: '4%',
      bottom: '12%',
      containLabel: true
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      axisLabel: {
          textStyle: {
              color: '#fff'
          },
          formatter: function(params) {
              return params.split(' ')[0] 
          }
      }
  },
  yAxis: {
      name: charts.unit,
      type: 'value',
      axisLabel: {
          formatter: '{value}%',
          textStyle: {
              color: '#fff'
          }
      },
      splitLine: {
          lineStyle: {
              color: 'rgba(128, 164, 229, 0.2)',
              type: 'dashed'
          }
      },
      axisLine: {
          lineStyle: {
              color: 'rgb(0,253,255,0.6)'
          }
      }
  },
  series: lineY
}


// 3d饼图

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {

    // 计算
    let midRatio = (startRatio + endRatio) / 2;

    let startRadian = startRatio * Math.PI * 2;
    let endRadian = endRatio * Math.PI * 2;
    let midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
    }

    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== 'undefined' ? k : 1 / 3;

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    let hoverRate = isHovered ? 1.05 : 1;

    // 返回曲面参数方程
    return {

        u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32
        },

        v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20
        },

        x: function(u, v) {
            if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y: function(u, v) {
            if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z: function(u, v) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u) * h * .1;
            }
            return Math.sin(v) > 0 ? 1 * h * .1 : -1;
        }
    };
}
// 生成模拟 3D 饼图的配置项
function getPie3D(pieData, internalDiameterRatio) {
    let series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    let legendData = [];
    let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;
    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        let seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k: k
            }
        };

        if (typeof pieData[i].itemStyle != 'undefined') {

            let itemStyle = {};

            typeof pieData[i].itemStyle.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
            typeof pieData[i].itemStyle.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;

            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;

        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k, series[i].pieData.value);

        startValue = endValue;

        legendData.push(series[i].name);
    }

    // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
    series.push({
        name: 'mouseoutSeries',
        type: 'surface',
        parametric: true,
        wireframe: {
            show: false
        },
        itemStyle: {
            opacity: 0
        },
        parametricEquation: {
            u: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 80
            },
            v: {
                min: 0,
                max: Math.PI,
                step: Math.PI / 80
            },
            x: function(u, v) {
                return Math.sin(v) * Math.sin(u) + Math.sin(u);
            },
            y: function(u, v) {
                return Math.sin(v) * Math.cos(u) + Math.cos(u);
            },
            z: function(u, v) {
                return Math.cos(v) > 0 ? 0.1 : -0.1;
            }
        }
    });

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    let option = {
        animation: false,
        legend: {
            data: legendData
        },
        tooltip: {
            formatter: params => {
                if (params.seriesName !== 'mouseoutSeries') {
                    return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}`;
                }
            }
        },
        xAxis3D: {
            min: -1,
            max: 1
        },
        yAxis3D: {
            min: -1,
            max: 1
        },
        zAxis3D: {
            min: -1,
            max: 1
        },
        grid3D: {
            show: false,
            boxHeight: 5,
            viewControl: {//3d效果可以放大、旋转等，请自己去查看官方配置
                alpha: 20,
                // beta: 40,
                rotateSensitivity: 0,
                zoomSensitivity: 0,
                panSensitivity: 0,
                autoRotate: false
            },
            //后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
            postEffect: {//配置这项会出现锯齿，请自己去查看官方配置有办法解决 
                enable: true,
                bloom: {
                    enable: true,
                    bloomIntensity: 0.1
                },
                SSAO: {
                    enable: true,
                    quality: 'medium',
                    radius: 2
                }
            }
        },
        series: series
    };
    return option;
}

// 传入数据生成 option
export const option = getPie3D([{
    name: '作业人员',
    value: 62,
    itemStyle: {
        color: '#00D7E9'
    }
}, {
    name: '管理人员',
    value: 89,
    itemStyle: {
        color: '#58D2A4',
    }
}, {
    name: '市管项目人员',
    value: 60,
    itemStyle: {
        color: '#11AEFE'
    }
}], 0.6);
console.log("🚀 ~ option:", option)


// 排行图

// import echarts from 'echarts'
var charts2 = { // 按顺序排列从大到小
  cityList: ['38号点（1）', '38号点（2）', '15号点', '16号点', '24号点'],
  cityData: [7500, 6200, 5700, 4200, 3500]
}
var top10CityList = charts2.cityList
var top10CityData = charts2.cityData
var color2 = ['rgba(248,195,248', 'rgba(100,255,249', 'rgba(135,183,255', 'rgba(248,195,248', 'rgba(100,255,249']

let lineY2 = []
for (var i = 0; i < charts2.cityList.length; i++) {
  var x = i
  if (x > color2.length - 1) {
    x = color2.length - 1
  }
  var data = {
    name: charts2.cityList[i],
    color2: color[x] + ')',
    value: top10CityData[i],
    itemStyle: {
      show: true,
        color:  new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: color2[x] + ', 0.3)'
        }, {
          offset: 1,
          color: color2[x] + ', 1)'
        }], false),
        barBorderRadius: 10,
      emphasis: {
        shadowBlur: 15,
        shadowColor: 'rgba(0, 0, 0, 0.1)'
      }
    }
  }
  lineY2.push(data)
}

console.log(lineY2)
export const option2= {
    backgroundColor:'#000',
  title: {
    show: false
  },
  tooltip: {
    trigger: 'item'
  },
  grid: {
    borderWidth: 0,
    top: '10%',
    left: '5%',
    right: '15%',
    bottom: '3%'
  },
  color: color,
  yAxis: [{
    type: 'category',
    inverse: true,
    axisTick: {
      show: false
    },
    axisLine: {
      show: true
    },
    axisLabel: {
      show: false,
      inside: false
    },
    data: top10CityList
  }, {
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      inside: false,
      textStyle: {
        color: '#b3ccf8',
        fontSize: '14',
        fontFamily: 'PingFangSC-Regular'
      },
      formatter: function (val) {
        return `${val}份`
      }
    },
    splitArea: {
      show: false
    },
    splitLine: {
      show: false
    },
    data: top10CityData
  }],
  xAxis: {
    type: 'value',
    axisTick: {
      show: true
    },
    axisLine: {
      show: true
    },
    splitLine: {
      show: true
    },
    axisLabel: {
      show: true
    }
  },
  series: [{
    name: '',
    type: 'bar',
    zlevel: 2,
    barWidth: '10px',
    data: lineY2,
    animationDuration: 1500,
    label: {
      color: '#b3ccf8',
        show: true,
        position: [0, '-24px'],
        textStyle: {
          fontSize: 16
        },
        formatter: function (a, b) {
          return a.name
        }
    }
  }],
  animationEasing: 'cubicOut'
}


// 双柱状图
export const zhuzhuangData = ref({
  grid: {
    top: "20%",
    bottom: "10%"
  },
  title: {
    left: "5%",
    text: '',
    subtext: '亿元'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    right: "0%",
    show: true,
    data: ['2024年', '2025年'],
  },
  toolbox: {
    show: false,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#fff' // 设置 x 轴颜色为红色
        }
      },
      // prettier-ignore
      data: ['一季度', '二季度', '三季度', '四季度']
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff' // 设置 x 轴颜色为红色
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed', // 设置为虚线
          color: 'rgba(128, 164, 229, 0.4)', // 可设置颜色
          width: 1 // 可设置宽度
        }
      },
    }
  ],
  series: [
    {
      name: '2024年',
      type: 'bar',
      data: [
        2134, 2134, 2134, 2134
      ],
      barWidth: "20px",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [  // 反转渐变方向
          { offset: 1, color: 'rgba(19,37,67,0.08)' },   // 顶部颜色
          { offset: 0, color: '#3caab7' } // 底部颜色
        ])
      },
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      }
    },
    {
      name: '2025年',
      type: 'bar',
      barWidth: "20px",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [  // 反转渐变方向
          { offset: 1, color: 'rgba(19, 37, 67, 0.08)' },   // 顶部颜色
          { offset: 0, color: '#00aeff' } // 底部颜色
        ])
      },
      data: [
        1879, 1879, 1879, 1879
      ],
      markPoint: {
        data: [
          { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
          { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
        ]
      }
    }
  ]
})

