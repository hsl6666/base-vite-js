<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import autofit from "autofit.js";
onMounted(()=>{
  autofit.init({
        dh: 1080,
        dw: 1920,
        el:"#body",
        resize: true
    })
})
</script>

<template>
  <div id="body">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
