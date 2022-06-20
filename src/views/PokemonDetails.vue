<template>
  <div class="page-container">
    <template v-if="pokemon">
      <div class="card mb-8">
        <img 
          v-if="pokemon.sprites"
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

      <div class="card mb-8">
        <h3 class="title">Detalhes</h3>
        <ul class="list-container">
          <li>
            <strong>Peso:</strong> <span>{{ pokemon.weight }}</span>
          </li>
          <li>
            <strong>Altura:</strong> <span>{{ pokemon.height }}</span>
          </li>
          <li>
            <strong>Código:</strong> <span>{{ pokemon.id }}</span>
          </li>
        </ul>
      </div>

      <div class="card details mb-8">
        <h3 class="title">Habilidades</h3>
        <ul class="list-container" >
          <li v-for="(row, index) in pokemon.abilities"
            class="list-item" :key="index">
            <p class="font-bold capitalize">{{ row.name }}</p>
            <p>{{ row.description }}</p>
          </li>
        </ul>
      </div>

      <div class="card mb-8">
        <h3 class="title">Evolutions</h3>
        <div class="evolution-container">
          <template v-for="(evo, index) in pokemon.evoChain" :key="index">
            <button 
              @click="goToPokemon(evo.species_name)"
              class="evolution-item types-item">
              {{evo.species_name}} 
            </button>
            
            <span v-if="index < pokemon.evoChain.length -1" class="material-symbols-outlined">
              chevron_right
            </span>
          </template>
        </div>
        <pre>{{pokemon.evolves}}</pre>
      </div>



      <button class="return" @click="$router.go(-1)">Voltar</button>

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
    await this.loadPokemon()
    
  },
  methods: {
    goToPokemon (pokemonName) {
      this.$router.push({
        name: 'PokemonDetail',
        params: {
          name: pokemonName
        }
      })
    },
    async loadPokemon (pokeName) {
      const name = pokeName || this.$route.params.name || ''
      this.pokemon = await this.$axios.get(`/pokemon/${name}`).then(res => res.data)
      
      if (!this.pokemon && !this.pokemon.species && !this.pokemon.species.url) return

      if (!this.pokemon || !this.pokemon.abilities) return
      
      const allAbilities = this.pokemon.abilities.map(row => row.ability.url)
      const fullAbilities = await Promise.all(allAbilities.map(promise => this.$axios.get(promise)))
      .then(results => {
        return results.map( result => {
          return {
            name: result.data.name,
            description: result.data.effect_entries[0].effect,
            short_description: result.data.effect_entries[0].short_effect
          }
        })
      })
      .finally(res => this.pokemon.abilities = res)
      
      if (!fullAbilities) return
      
      this.pokemon.abilities = fullAbilities

      const getEvos = await this.$axios.get(`${this.pokemon.species.url}`)
        .then(res => {
          if(res.data){
            return {
              evolves_from_species:  res.data.evolves_from_species,
              evolution_chain: res.data.evolution_chain.url
            }
          }
        })

      let evoData = await this.$axios.get(`${getEvos.evolution_chain}`)
        .then(res => res.data.chain)
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
  },
  watch: {
    '$route.params.name': {
      async handler () {
        await this.loadPokemon()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss"></style>
