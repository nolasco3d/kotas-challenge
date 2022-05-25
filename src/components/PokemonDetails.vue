<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const kotas = computed(() => {
    return store.state.kotas
})
</script>

<template>
    <h1>Pokemon Details</h1>
</template>
