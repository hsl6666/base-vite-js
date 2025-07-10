<template>
  <div>
    <el-form
      :model="formFields.formData"
      ref="dynamicForm"
      label-width="auto"
      :rules="formFields.rules"
      :inline="props.inline"
    >
      <div>
        <el-form-item
          v-for="(field, index) in formFields.config"
          :key="index"
          :label="field.label"
          :rules="field.rules"
          :prop="field.prop"
        >
          <div v-if="field.type === 'title'" class="text-[#092C4D] text-[14px] is-title mb-[20px]">
            {{ formData[field.prop] }}
          </div>
          <div v-if="field.type === 'text'" class="text-[#092C4D] text-[14px] is-title">
            <div v-if="field.text == '账号信息'" class="is-gray">{{ field.text }}</div>
            <span v-else>{{ field.text }}</span>
          </div>
          <el-input
            :style="{ width: props.width + 'px' }"
            v-if="field.type === 'input'"
            v-model="formFields.formData[field.prop]"
            :disabled="field.disabled"
            :placeholder="field.placeholder"
          />
          <el-input
            :style="{ width: props.width + 'px' }"
            type="textarea"
            v-if="field.type === 'textarea'"
            v-model="formFields.formData[field.prop]"
            :placeholder="field.placeholder"
          />
          <el-select
            :style="{ width: props.width + 'px' }"
            v-if="field.type === 'select'"
            v-model="formFields.formData[field.prop]"
            :placeholder="field.placeholder"
          >
            <el-option
              v-for="(option, optionIndex) in field.options"
              :key="optionIndex"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <!-- 数据池单选框 -->
          <el-select
            :style="{ width: props.width + 'px' }"
            v-if="field.type === 'datapool'"
            v-model="formData[field.prop]"
            :placeholder="field.placeholder"
            @change="handleSelectChange($event, field.options)"
          >
            <el-option
              v-for="(option, optionIndex) in field.options"
              :key="optionIndex"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <!-- 其他类型的表单字段 -->
          <!-- 日期范围 -->
          <el-date-picker
            v-if="field.type === 'daterange'"
            :style="{ width: props.width + 'px' }"
            v-model="dateValue"
            :type="field.dateType"
            range-separator="至"
            :start-placeholder="field.starPlace"
            :end-placeholder="field.endPlace"
            @change="handleChangeDateRange"
            value-format="YYYY-MM-DD"
          />

          <!-- 单选日期 -->
          <el-date-picker
            v-if="field.type === 'date'"
            :style="{ width: props.width + 'px' }"
            v-model="dateValue"
            :type="field.dateType"
            @change="handleChangeDate"
            format="YYYY-MM-DD"
            :placeholder="field.placeholder"
          />
          <el-radio-group v-if="field.type === 'radio'" v-model="formData[field.prop]">
            <el-radio
              v-for="(option, optionIndex) in field.options"
              :key="optionIndex"
              :label="option.label"
              :value="option.value"
            />
          </el-radio-group>
          <!-- 级联选择框 -->
          <!-- <el-cascader
            v-if="field.type === 'address'"
            style="min-width: 300px"
            v-model="areaClassValue"
            :options="areaOptions"
            :props="areaprops"
            @change="handleCascaderArea"
            clearable
          /> -->
          <el-cascader
            v-if="field.type === 'address'"
            style="min-width: 300px"
            v-model="formFields.formData[field.prop]"
            :options="areaOptions"
            :props="areaprops"
            @change="handleCascaderArea"
            clearable
          />
          <!-- 多选框 -->
          <el-select
            v-if="field.type === 'selectMultiple'"
            v-model="multipleValue"
            :style="{ width: props.width + 'px' }"
            multiple
            collapse-tags
            :placeholder="field.placeholder"
            @change="handleMultipleChange($event, field.options)"
          >
            <el-option
              v-for="(option, optionIndex) in field.options"
              :key="optionIndex"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="props.showBtn">
          <el-button type="primary"  @click="submitForm" :icon="Search">搜索</el-button>
          <el-button type="default"  @click="resetForm(dynamicForm)" :icon="RefreshLeft">重置</el-button>
          <slot name="default" />
        </el-form-item>
      </div>

      <!-- 级联地址 -->
    </el-form>
  </div>
</template>

<script setup>
import { Search, RefreshLeft } from "@element-plus/icons-vue"
import { ref, onMounted, defineExpose, toRefs } from "vue"
import { areaOptions } from "@/utils/area.js"
import { ElMessage } from "element-plus";
// 地址级联选择
// 区域props
const areaprops = {
  multiple: false,
  checkStrictly: true,
  value: "name", // 指定值字段
  label: "name", // 指定标签字段
  children: "children" // 指定子节点字段
}
const handleCascaderArea = (e) => {
  const findObj = formFields.value.config.find((item) => item.type == "address")
  formFields.value.formData[findObj.prop] = JSON.stringify(e)
  console.log("地址",JSON.stringify(e))
  findObj[findObj.prop]=e[0]
}
const areaClassValue = ref("")
const multipleValue = ref([])
onMounted(() => {
  console.log(props.formFields)
})
const props = defineProps({
  formFields: {
    type: Object,
    required: true
  },
  showBtn: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: ""
  },
  height: {
    type: String,
    default: ""
  },
  inline: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  labelPosition: {
    type: String,
    default: ""
  }
})
const {formFields} =toRefs(props)
const dateValue = ref("")
const formData = ref({})
const dynamicForm = ref()

// daterange日期赋值
const handleChangeDateRange = (e) => {
  console.log("时间范围", e)
  const findObj = props.formFields.config.find((item) => item.type == "daterange")
  formFields.value.formData[findObj.starKey] = e[0]
  formFields.value.formData[findObj.endKey] = e[1]
}
//date
const handleChangeDate = (e) => {
  const findObj = props.formFields.config.find((item) => item.type == "date")
  formFields.value.formData[findObj.prop] = e
  // formFields.value.formData[findObj.endKey] = e[1]
}
// 多选框
const handleMultipleChange = (event, options) => {
  const findObj = props.formFields.config.find((item) => item.type == "selectMultiple")
  const newArr = []
  event.forEach((element) => {
    newArr.push(options.find((item) => item.value == element))
  })
  const resultArr = newArr.map((item) => item.label).join(",")
  formFields.value.formData[findObj.propName] = resultArr
  formFields.value.formData[findObj.prop] = event.join(",")
}

// 数据池单选框
const handleSelectChange = (event, options) => {
  const findObj = props.formFields.config.find((item) => item.type == "datapool")
  const label = options.find((item) => item.value == event).label
  console.log("数据池", event, label)
  formFields.value.formData[findObj.propName] = label
  formFields.value.formData[findObj.prop] = event
}

const emit = defineEmits(["formSubmitted","reset"])

const submitForm = () => {
  dynamicForm.value.validate((valid) => {
    if (valid) {
      emit("formSubmitted", formFields.value.formData)
      console.log("Form submitted:", formFields.value.formData)
    } else {
      // 使用 Element Plus 的 ElMessage 组件替代 this.$message
      console.log("表单",formFields.value.formData)
      ElMessage.error("表单验证失败，请检查输入！")
    }
  })
}
const resetForm = () => {
  dateValue.value = ""
  formFields.value.formData = {}
  areaClassValue.value = ""
  multipleValue.value = []
  emit("reset", formFields.value.formData)
}

defineExpose({
  submitForm,
  resetForm
})
</script>

<style lang="scss" scoped>
:deep(.el-select) {
  width: 200px;
}
:deep(.el-input__wrapper) {
  width: 200px;
}

.is-title {
  padding-left: 10px;
  position: relative;
  line-height: 14px;
  font-weight: 600;
}
.is-title::after {
  display: block;
  content: "";
  width: 3px;
  height: 100%;
  // margin-top: calc(50% - 2px);
  position: absolute;
  background: var(--main-color);
  border-radius: 8px;
  left: 0;
  top: 0;
}

.is-gray {
  // padding-top: 20px;
  margin-top: 40px;
  position: relative;
  // width: 600px;
}
.is-gray::after {
  position: absolute;
  top: -20px;
  left: -30px;
  display: block;
  content: "";
  height: 20px;
  width: 550px;
  z-index: 999;
  background: #fff;
}
.is-gray::before {
  position: absolute;
  top: -40px;
  left: -30px;
  display: block;
  content: "";
  height: 20px;
  width: 678px;
  z-index: 999;
  background: #f6f7f8;
}
</style>
