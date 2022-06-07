<template>
  <section class="page-container">
    <loader :showLoader="isLoading" />
    <search-input 
      @searchResult="handleSearchResult" 
      @clearSearch="() => search = []"/>

    <h2 class="title">Pokemons</h2>

    <div class="grid-container" v-if="searchResult">
      <card 
        :key="index"
        :pokemon="pokemon"
        v-for="(pokemon, index) in filterPokemon(search)" />
    </div>
    
    <div class="grid-container" v-else>
      <card 
        :key="index" 
        :pokemon="pokemon"
        v-for="(pokemon, index) in allPokemons"/>
    </div>
  </section>
</template>

<script>
import Card from '../components/Card.vue'
import SearchInput from '../components/SearchInput.vue'
import { mapMutations, mapState } from 'vuex'
import Loader from '../components/Loader.vue'
import { debounce } from '../main'

export default {
  components: { SearchInput, Card, Loader },
  data() {
    return {
      search: [],
      innerHeight: null,
      scrollTop:null,
      offsetHeight:null,
      isLoading: false
    }
  },
  computed: {
    ...mapState({ 
      allPokemons: (state) => state.kotas.pokemons,
      limit: (state) => state.kotas.limit,
      offset: (state) => state.kotas.offset,
     }),
    endOfPage () {
      return this.scrollTop + this.innerHeight === this.offsetHeight
    },
    searchResult() {
      return !!(this.search.length && this.search.length > 0)
    }
  },
  methods: {
    debounce,
    ...mapMutations({ 
      pushPokemons: 'kotas/pushPokemons',
      incrementLimit : 'kotas/incrementLimit',
      incrementOffset : 'kotas/incrementOffset'
     }),
    async getPokemon(promise) {
      return this.$axios.get(promise)
    },
    handleSearchResult (result) {
      this.search.push(result)
    },
    filterPokemon (rows) {
      return rows.map((pokemon) => {
        return {
          name: pokemon.data.name,
          id: pokemon.data.id,
          image: pokemon.data.sprites['front_default'],
          types: pokemon.data.types.map(pokeType => {
            return {
              ...pokeType.type
            }
          }),
        }
      })
    },
    preparePromise (limiter=1, offset=0) {
      const promises = []
      for (let i = 1; i <= limiter; i++ ) {
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${i + offset}`
        promises.push(endpoint)
      }
      return promises

    },
    async sendPromises (promises) {
      Promise.all(promises.map((p) => this.$axios.get(p)))
      .then(results => this.filterPokemon(results))
      .then(res => this.pushPokemons(res))
      .finally(() => this.incrementRequest())
    },
    incrementRequest () {
      this.incrementOffset()
      this.incrementLimit()
      this.isLoading = false
    },
    async checkEndPage () {
      this.scrollTop = document.documentElement.scrollTop
      this.innerHeight = window.innerHeight
      this.offsetHeight = document.documentElement.offsetHeight
      
      if (this.endOfPage) {
        this.isLoading = true
        const morePokemons = this.preparePromise(this.limit, this.offset)
        await this.sendPromises(morePokemons)
      }
    }
  },
  async mounted() {
    if (this.allPokemons.length < 1) {
      const pokemons = this.preparePromise(this.limit)
      await this.sendPromises(pokemons)
    }
    window.addEventListener("scroll", debounce(() => this.checkEndPage()))
  }
}
</script>

<style lang="scss"></style>
