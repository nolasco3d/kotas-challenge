<template>
  <div class="search-wrapper">
    <input 
      class="search-bar"
      @keyup.enter="searchPokemon"
      placeholder="Pesquise por nome ou código"
      type="text" 
      v-model="search">
      <!-- <button class="clear">X</button> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      search:'',
      result: []
    }
  },
  methods: {
    async searchPokemon () {
      try {
        const search = await this.$axios.get(`/pokemon/${this.search}`)
        this.$emit('searchResult', search)
      } catch (e) {
        alert('Nenhum pokemon encontrado!')
        this.$emit('clearSearch')
      } 
      finally {
        this.search = ''
      }
    }
  }
}
</script>

<style lang="scss"></style>