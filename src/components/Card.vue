<template>
    <router-link class="card" :to="{ name: 'PokemonDetail', params: {name: `${pokemon.name}`} }">
      <img  class="thumb" 
            width="96" height="96"
            :src="pokemon.image" 
            :alt="`Image ${pokemon.name}`" />
            
      <h4 class="title">{{ pokemon.name }}</h4>

      <p class="text">Cod: {{ pokemon.id }}</p>

      <div class="types-container" 
        v-if="pokemon.types && pokemon.types.length > 0">
          <span 
            v-for="(type, id) in pokemon.types" :key="id"
            class="types-item" 
            :class="type.name">
              {{ type.name }}
          </span>
      </div>
    </router-link>
</template>

<script>
export default {
  props: {
    pokemon: {}
  }
}
</script>

<style lang="scss"></style>