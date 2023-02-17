import {createRouter, createWebHistory} from 'vue-router';
import Homepage from '../views/Homepage.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];



const router = createRouter ({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (store.state.user.token && to.name === 'Login') {
      next({ name: "Homepage" });
    } else {
      next();
    }
});
  

export default router