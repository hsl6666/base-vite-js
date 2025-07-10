<template>
    <div>
        vueuse--demo
        <el-button type="primary" @click="debouncedFn">按钮</el-button>
    </div>
</template>

<script setup>
import { useDebounceFn, useEventListener } from '@vueuse/core'

// 防抖 点击后3s后才触发一次
const debouncedFn = useDebounceFn(() => {
  // do something
  alert("111")
}, 3000)

useEventListener(window, 'resize', debouncedFn)
</script>

<style lang="scss" scoped>

</style>