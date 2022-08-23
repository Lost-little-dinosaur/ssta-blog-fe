import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import( '@/views/index.vue')
    // component: () => import( '@/views/articles/edit.vue')
  },
  // {
  //   path: '/',
  //   name: 'articles',
  //   children:[
  //     {
  //       path:"/edit",
  //       name:"edit",
  //       component: () => import( '@/views/articles/edit.vue')
  //     }
  //   ]

  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
