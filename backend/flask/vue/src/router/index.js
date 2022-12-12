import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    // createWebHistory -> used to go back and forth with arrows in browser 
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/artists',
            name: 'artists',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/ArtistsView.vue')
        },
        {
            path: '/albums',
            name: 'albums',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/AlbumsView.vue')
        },
        {
            path: '/tracks',
            name: 'tracks',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/TracksView.vue')
        },
        {
            path: '/search',
            name: 'search',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/SearchView.vue')
        }
    ]
})

export default router