import { reactive, ref } from "vue"
// form
export const formData = reactive({
  formData: {
    goodsName: "",
    serviceArea: "",
  },
  config: [
    {
      label: "商品名称",
      prop: "goodsName",
      type: "input",
      placeholder: "请输入商品名称"
    },
    {
      label: "销售区域",
      prop: "serviceArea",
      type: "select",
      placeholder: "请输入",
      options: [
        { label: "重庆", value: "重庆" },
        { label: "四川", value: "四川" }
      ]
    },
    // {
    //   label: "状态选项",
    //   prop: "goodsStatus",
    //   type: "select",
    //   placeholder: "请选择",
    //   options: [
    //     { label: "已上架", value: "已上架" },
    //     { label: "待上架", value: "待上架" }
    //   ]
    // },
    // {
    //   label: "创建时间",
    //   prop: "createTime",
    //   dateType: "date",
    //   type: "date",
    //   placeholder: "选择日期时间"
    // },
    // {
    //   label: "上架时间",
    //   prop: "listingTime",
    //   dateType: "date",
    //   type: "date",
    //   placeholder: "选择日期时间"
    // },
    // {
    //   label: "更新时间",
    //   prop: "updateTime",
    //   dateType: "date",
    //   type: "date",
    //   placeholder: "选择日期时间"
    // }
    // {
    //   label: "创建时间",
    //   prop: "date",
    //   dateType: "date",
    //   starKey: "starTime",
    //   endKey: "endTime",
    //   type: "daterange",
    //   starPlace: "开始时间",
    //   endPlace: "开始时间"
    // }
  ],
  rules: []
})

// table
export const tableHeaderMapper = ref({
  num: {
    label: "复选框",
    type: "selection",
    width: "55",
    isShown: true
  },
  id: {
    label: "编号",
    width: "auto",
    isShown: true
  },
  goodsName: {
    label: "商品名称",
    width: "auto",
    isShown: true
  },
  goodsCategory: {
    label: "商品分类",
    width: "auto",
    isShown: true
  },
  goodsStatus: {
    label: "商品状态",
    width: "auto",
    isShown: true
  },
  serviceArea: {
    label: "销售区域",
    width: "auto",
    isShown: true
  },
  listingTime: {
    label: "上架时间",
    width: "auto",
    isShown: true
  },
  contacts: {
    label: "联系人",
    width: "auto",
    isShown: true
  },
  contactPhone: {
    label: "联系电话",
    width: "auto",
    isShown: true
  },
  createTime: {
    label: "创建时间",
    width: "auto",
    isShown: true
  },
  options: {
    label: "操作",
    width: "auto",
    isShown: true,
    fixed: "right",
    minWidth: "120"
  }
})
