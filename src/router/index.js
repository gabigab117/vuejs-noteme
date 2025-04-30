import { createRouter, createWebHashHistory } from 'vue-router'

import NotesView from '@/views/NotesView.vue'
import StatsView from '@/views/StatsView.vue'


const routes = [        {
            path: "/",
            name: "notes",
            component: NotesView,
        },
        {
            path: "/stats",
            name: "stats",
            component: StatsView,
        },
    ]


const router = createRouter({
    history: createWebHashHistory(),
    routes /* Quand le param a le mm nom que la variable, on met juste une fois le nom */
});


export default router;