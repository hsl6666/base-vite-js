<template>
  <div>
    <el-table
      row-key="id"
      class="table-box"
      @selection-change="select"
      :style="{ height: props.height }"
      :data="props.tableData"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]>
        <slot :name="slot" />
      </template>
    </el-table>
    <!-- 分页条 -->
    <div class="flex justify-end">
      <el-pagination
        background
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.total"
        @size-change="pagination"
        @current-change="currentChange"
        class="mt-10 mr-10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
const emits = defineEmits(["select", "pagination", "currentChange"])
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const total = ref(0)
const pagination = (val) => {
  console.log("条数", val)
  emits("pagination", val)
}

const currentChange = (val) => {
  console.log("野马", val)
  emits("currentChange", val)
}

const props = defineProps({
  tableData: {
    type: Array,
    default: null
  },
  height: {
    type: String,
    default: "100%"
  },
  total: {
    type: Number,
    default: 0
  }
})

const select = (e) => {
  emits("select", e)
  console.log("table选中", e)
}
onMounted(() => {
  total.value = props.tableData.length
  console.log("表格", props.tableData)
})
</script>
<style lang="scss" scoped>
:deep(.el-table__body tr:nth-child(odd)) {
  background-color: rgb(248, 251, 255); /* 自定义奇数行背景色 */
}
:deep(.el-table__body tr:nth-child(even)) {
  background-color: #fff; /* 自定义奇数行背景色 */
}
:deep(.el-table__row) {
  height: 50px;
  font-size: 12px;
}
:deep(.el-table__header) {
  font-size: 12px;
}

.table-box {
  width: calc(100% - 20px);
}
</style>
