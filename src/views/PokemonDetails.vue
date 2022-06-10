<template>
  <div class="page-container">
    <template v-if="pokemon">
      <div class="card mb-8">
        <img 
          class="thumb"
          width="96" 
          height="96" 
          :src="pokemon.sprites['front_default']" 
          :alt="`${pokemon.name} picture`">
        
        <p class="title">{{ pokemon.name }}</p>
        
        <div class="types-container" >
          <div 
            v-for="(row, index) in pokemon.types" 
            :key="index"
            class="types-item" 
            :class="row.type.name">{{ row.type.name }}</div>
        </div>
        
      </div>

      <div class="card details mb-8">
        <h3 class="title">Habilidades</h3>
        <ul class="list-container" >
          <li class="list-item"
            v-for="(row, index) in pokemon.abilities" :key="index">
            {{ row.ability.name }}
          </li>
        </ul>
      </div>

      <div class="card mb-8">
        <h3 class="title">Evolutions</h3>
        <div class="evolution-container">
          <span class="evolution-item" v-for="(evo, index) in pokemon.evoChain" :key="index">{{evo.species_name}}</span>
        </div>
        <pre>{{pokemon.evolves}}</pre>
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
    
    let evoData = await this.$axios.get(`/evolution-chain/${this.pokemon.id}`).then(res => res.data.chain )
    const evoChain = []
    do {
      evoChain.push({
        'species_name': evoData.species.name,
        "url": evoData.species.url
      })
      evoData = evoData['evolves_to'][0]
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'))

    this.pokemon.evoChain = evoChain
    
  }
}
</script>

<style lang="scss"></style>
