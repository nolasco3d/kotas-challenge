<template>
  <div class="input-wrapper">
    <input 
      class="search-bar"
      @keyup.enter="searchPokemon"
      placeholder="Pesquise por nome ou código"
      type="text" 
      v-model="search">
      <button class="clear">X</button>
    <pre>{{result}}</pre>
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
      const res = await this.$axios.get(`/pokemon/${this.search}`)
      this.result = res.data
    }
  }
}
</script>

<style lang="scss">
.search-bar {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: solid 1px rgba(225, 225, 225, 1);
  padding: 20px;
}
.clear{
  position: absolute;
  right: 0;
  height: 50px;
  background: transparent;
  width: 50px;
  font-weight: 700;
  border-radius: 25px;
  /* border-top-right-radius: 25px;
  border-bottom-right-radius: 25px; */
  &:hover{
    background: rgb(238, 238, 238);
  }
}
.input-wrapper{
  position: relative;

}
</style>