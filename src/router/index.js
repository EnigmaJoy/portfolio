import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutMe from '@/views/AboutMe.vue'
import WelcomeAll from "@/views/WelcomeAll.vue";
import PersonalProjects from "@/views/PersonalProjects.vue";
import ContactMe from "@/views/ContactMe.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: WelcomeAll,
    },
    {
        path: '/about',
        name: 'about',
        component: AboutMe,
    },
    {
        path: '/projects',
        name: 'projects',
        component: PersonalProjects,
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactMe,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
