<template>
    <div ref="mainRef" class="w-[100%] h-[100%]"></div>
</template>

<script setup>
import { ref, onMounted, watch,defineProps } from "vue";
import * as echarts from "echarts";

// Define a prop to receive data
const props = defineProps({
    chartData: {
        type: Object,
        required: true
    }
});

const mainRef = ref(null);
let myChart = null;

onMounted(() => {
    myChart = echarts.init(mainRef.value);
    myChart.setOption(props.chartData);
});

// Watch for changes in chartData and update the chart
watch(() => props.chartData, (newData) => {
    if (myChart) {
        myChart.setOption(newData, true);
    }
}, { deep: true });
</script>

<style lang="scss" scoped></style>