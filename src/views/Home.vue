<template>
  <section class="page-container">
    <search-input></search-input>

    <h2 class="title">Pokemons</h2>
    <div class="loader" v-show="isLoading">
      <span>Loading...</span>
    </div>
    <div class="list-container" v-if="allPokemons" ref="scrollComponent">
      <template v-for="(pokemon, index) in allPokemons" :key="index">
        <card :pokemon="pokemon" />
      </template>
    </div>
  </section>
</template>

<script>
import Card from '../components/Card.vue'
import SearchInput from '../components/SearchInput.vue'
export default {
  components: { SearchInput, Card },
  data() {
    return {
      pokemons: [],
      innerHeight: null,
      scrollTop:null,
      offsetHeight:null,
      limit: 24,
      offset: 0,
      requests: 0,
      isLoading: false
    }
  },
  
  computed: {
    endofPage () {
      return this.scrollTop + this.innerHeight === this.offsetHeight
    },
    allPokemons () {
      return this.pokemons
    },
    innerH () {
      return this.innerHeight
    },
    scrollT () {
      return this.scrollTop
    },
    offsetH() {
      return this.offsetHeight
    }
  },
  methods: {
    async getPokemon(promise) {
      return this.$axios.get(promise)
    },
    toggleLoadingStatus () {
      this.isLoading = !this.isLoading
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
    injectPokemons (data) {
      this.pokemons = this.pokemons.concat(data)
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
      Promise.all(promises.map((p) => this.getPokemon(p)))
      .then(results => this.filterPokemon(results))
      .then(res => this.injectPokemons(res))
      .finally(() => this.incrementRequest())
    },
    incrementRequest () {
      this.requests++
      this.offset =+ this.limit
      this.isLoading = false
    },
    async checkEndPage () {
      this.scrollTop = document.documentElement.scrollTop
      this.innerHeight = window.innerHeight
      this.offsetHeight = document.documentElement.offsetHeight
      
      if (this.endofPage) {
        this.isLoading = true
        const morePokemons = this.preparePromise(this.limit, this.offset)
        await this.sendPromises(morePokemons)
        
        // Promise.all(morePokemons.map(p => this.getPokemon(p)))
        // .then(results => this.filterPokemon(results))
        // .then(data => this.injectPomons(data))
        // .finally(() => this.incrementRequest())
      }
    },
    debounce(func, timeout = 300){
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
    }
  },
  async mounted() {
    const pokemons = this.preparePromise(this.limit)
    await this.sendPromises(pokemons)
    // Promise.all(pokemons.map((p) => this.getPokemon(p)))
    // .then( results => this.filterPokemon(results))
    // .then(res => this.injectPomons(res))
    // .finally(() => this.incrementRequest())
    window.addEventListener("scroll", this.debounce(() => this.checkEndPage()))
  }

}
</script>

<style lang="scss">
.title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  margin: 40px 0;
}



.page {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &-container {
    @apply container mx-auto;
  }
}
.list-container {
  /* max-width: 825px; */
  /* border: solid 1px blue; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
  margin: 0 auto;

  @media screen and (min-width: 720px ) and (max-width: 1279px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
  }


}
.loader {
  background: red;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 8px 10px;
  border-radius: 6px;
}

</style>
