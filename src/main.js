import Vue from 'vue'
import App from './App.vue'
import '../src/assets/font/fontawesome-5.15.1/css/all.min.css'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'



Vue.config.productionTip = false

import './style/checkbox.css'
import './style/radio_button.css'
import './style/table.css'



Vue.use(Vuelidate)
Vue.use(VueRouter)

import EmployeeList from './components/view/employee/employeeList.vue'
import GeneralTest from './components/view/general/generalTest.vue'
import QuyTrinh from './components/view/TienMat/quyTrinh.vue'
import ThuChiTien from './components/view/TienMat/thuChiTien.vue'
import NCCList from './components/view/NhaCungCap/nccList.vue'

const routes =[
  {path:  '/employee', component: EmployeeList},
  {path: '/generaltest', component: GeneralTest},
  {path: '/quytrinh', component: QuyTrinh},
  {path: '/thuchitien', component: ThuChiTien},
  {path: '/nhacungcap', component: NCCList},
]

const router = new VueRouter({
  routes
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
