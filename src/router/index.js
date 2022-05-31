import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import PokemonDetails from '/src/views/PokemonDetails.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/pokemon/:id',
        name: 'PokemonDetail',
        component: PokemonDetails,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
