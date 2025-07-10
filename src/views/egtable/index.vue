<template>
  <div>
    <searchFrom :formFields="formData" @formSubmitted="handleSumbit" />
    <CustomTable :tableData="tableData" v-loading="loading" class="mt-[10px]">
          <template #empty>暂无数据</template>
          <CustomColumn :table-headers="tableHeaderMapper">
            <template #default-num="scope">
              <div>{{ scope.$index }}</div>
            </template>

            <template #default-options="scope">
              <div>
                <span class="is-span" @click="handleEditGuige(scope.row)"> 编辑</span>
                <span class="is-span" @click="handleDeleteGuige(scope.row)"> 删除</span>
              </div>
            </template>
          </CustomColumn>
        </CustomTable>
  </div>
</template>

<script setup>
import searchFrom from "@/components/form.vue"
import CustomColumn from "@/components/custom-column/index.vue"
import CustomTable from "@/components/custom-table/index.vue"
import { formData, tableHeaderMapper } from "./index"
import { onMounted, ref } from "vue";
const tableData=ref([])
const loading=ref(false)
const handleSumbit=(e)=>{
console.log("🚀 ~ handleSumbit ~ e:", e)
}
</script>

<style lang="scss" scoped>

</style>