import Vue from 'vue'
import App from './App.vue'
import Element from "element-ui";
import echarts from "echarts";
import router from "./router/index";
import 'element-ui/lib/theme-chalk/index.css';
import './assets/index.css'

Vue.config.productionTip = false
Vue.use(Element);
Vue.prototype.echarts = echarts;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
