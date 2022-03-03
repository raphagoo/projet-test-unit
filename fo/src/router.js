import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Basket from "./views/Basket.vue";
import Login from "./views/Login.vue";
import User from "./views/User.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/basket',
            name: 'basket',
            component: Basket
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '*',
            redirect: '/',
        },
    ]
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register', '/', '/basket', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) {
    return next('/login');
    }

    next();
});

