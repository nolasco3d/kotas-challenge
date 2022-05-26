<template>
  <h2>Pokemons</h2>
  <template v-if="pokemons">
    <div class="" v-for="(pokemon, index) in pokemons" :key="index">
      <img :src="pokemon.image" alt="Thumb " />
      <h4>{{ pokemon.name }}</h4>
      <small>Cod: {{ pokemon.id }}</small>
      <ul v-for="(type, id) in pokemon.types" :key="id">
        <li>
          {{ type.name }}
        </li>
      </ul>
    </div>
  </template>
</template>

<script>
export default {
  data() {
    return {
      pokemons: [],
      limit: 24,
    }
  },
  async mounted() {
    const promises = []
    for (let i = 1; i <= this.limit; i++) {
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${i}`
      promises.push(endpoint)
    }

    Promise.all(promises.map((p) => this.getPoke(p))).then((results) => {
      this.pokemons = results.map((result) => {
        return {
          name: result.data.name,
          id: result.data.id,
          image: result.data.sprites['front_default'],
          types: [...result.data.types],
        }
      })
    })
  },
  methods: {
    async getPoke(promise) {
      return this.$axios.get(promise)
    },
  },
}
</script>

<style lang="scss"></style>
