import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    // createWebHistory -> used to go back and forth with arrows in browser 
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            // Lazy loading
            component: () =>
                import ('../views/HomeView.vue')
        },
        {
            path: '/artists',
            name: 'artists',
            component: () =>
                import ('../views/artists/ArtistsView.vue')
        },
        {
            path: '/artists/:id',
            name: 'artistsInfo',
            // to pass id as prop to the view
            props: true,
            component: () =>
                import ('../views/artists/ArtistsInfoView.vue')
        },
        {
            path: '/albums',
            name: 'albums',
            component: () =>
                import ('../views/albums/AlbumsView.vue')
        },
        {
            path: '/albums/:id',
            name: 'albumTracks',
            props: true,
            component: () =>
                import ('../views/albums/AlbumTracksView.vue')
        },
        {
            path: '/tracks',
            name: 'tracks',
            component: () =>
                import ('../views/TracksView.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () =>
                import ('../views/SearchView.vue')
        },
        // redirect
        {
            path: '/artist',
            redirect: '/artists'
        },
        {
            path: '/album',
            redirect: '/albums'
        },
        // catch-all
        {
            path: '/:catchAll(.*)',
            name: 'notFound',
            component: () =>
                import ('../views/404View.vue')

        }
    ]
})

export default router