import MainPage from '@/pages/MainPage'
import EditorPage from '@/pages/EditorPage'
import UniqueArticlePage from '@/pages/UniqueArticlePage'
import RegisterPage from '@/pages/RegisterPage'
import {createRouter, createWebHistory, } from 'vue-router'

const routes = [
    {path: '/', component: MainPage},
    {path: '/editor', component: EditorPage},
    {path: '/articles/article/:id', component: UniqueArticlePage, beforeRouteUpdate (to) {
            console.log(to.params.id)
            console.log('warning')
        }
    },
    {path: '/regis', component: RegisterPage}
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
