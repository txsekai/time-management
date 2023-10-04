import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "../view/Home.vue";

Vue.use(VueRouter)

const routes = [
    // 主路由
    {
        path: '/',
        component: Home,
        redirect: '/home',
        children: [
            //  子路由
            { path: 'home', component: Home },
        ]
    },
]

const router = new VueRouter({
    mode: "history",
    routes // (缩写) 相当于 routes: routes
})

export default router