import { createMemoryHistory, createWebHashHistory,createRouter } from 'vue-router'

import HomeView from '../views/index.vue'
import Echarts from "../views/echars/index.vue";
import VUeUse from "../views/vueuse/index.vue";
import Egtable from "../views/egtable/index.vue";
import EcharsGl from "../views/echarsGl/index.vue";

const routes = [
  { path: '/', component: HomeView },
  { path: '/echarts', component: Echarts },
  { path: '/vueuse', component: VUeUse },
  { path: '/egtable', component: Egtable },
  { path: '/echarsGl', component: EcharsGl },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;