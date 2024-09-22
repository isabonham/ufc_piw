import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import Orders from '../components/OrderList.vue';
import CDListAdmin from '@/components/CDListAdmin.vue';
import CDList from '../components/CDList.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/cds', component: CDList, meta: { requiresAuth: true } },
    { path: '/admin/cds', component: CDListAdmin, meta: { requiresAuth: true}},
    { path: '/orders', component: Orders, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Protegendo rotas
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});


export default router;
