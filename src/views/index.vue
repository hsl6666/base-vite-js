<template>
  <div>
    <el-button type="primary" size="default" @click="router.push('/echarts')">echars</el-button>
    <el-button type="primary" size="default" @click="router.push('/vueuse')">vueuse</el-button>
    <el-button type="primary" size="default" @click="router.push('/egtable')">egtable</el-button>
    <el-button type="primary" size="default" @click="router.push('/echarsGl')">echarsGL</el-button>

  </div>

</template>

<script setup>

import $Test from "@/api"
import { useRouter } from "vue-router"
const router=useRouter()
const getTestInfo = async () => {
  const res = await $Test.getTestInfo()
  console.log("请求", res)
}
getTestInfo()

</script>