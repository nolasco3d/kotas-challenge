<template>
  <div class="page-container">
    <template v-if="pokemon">
      <div class="card details mb-8">
        <img 
          class="thumb"
          width="96" 
          height="96" 
          :src="pokemon.sprites['front_default']" 
          :alt="`${pokemon.name} picture`">
        
        <p class="title">{{ pokemon.name }}</p>
        
        <div v-for="(type, index) in pokemon.types" :key="index">
          <div>{{ type }}</div>
        </div>
        
      </div>

      <div class="card details">
        <h3>Habilidades</h3>
        <ul v-for="(row, index) in pokemon.abilities" :key="index">
          <li>{{ row.ability.name }}</li>
        </ul>
      </div>

      <router-link to="/">Voltar</router-link>

      <!-- <div class="card" v-if="pokemon.species.length > 0">
        <h3>Evoluções</h3>
        <ul v-for="(row, index) in pokemon.species" :key="index">
          <li>{{ row.ability.name }}</li>
        </ul>
      </div> -->
    </template>
    <div v-else>
      <p>Não foi possível carregar os dados do pokemon. </p>
      <router-link to="/">Voltar</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pokemon: null
    }
  },
  async mounted () {
    const name = this.$route.params.name || ''
    this.pokemon = await this.$axios.get(`/pokemon/${name}`).then(res => res.data)
    
    const evolves = await this.$axios.get(`/evolution-chain/${this.pokemon.id}`).then(res => res.data )
    this.pokemon.evolves = evolves.chain
    
  }
}
</script>

<style lang="scss"></style>
