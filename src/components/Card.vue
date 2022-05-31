<template>
  <div class="card">
    <img 
      width="96" height="96"
      :src="pokemon.image" 
      :alt="`Image ${pokemon.name}`  " />
    <h4>{{ pokemon.name }}</h4>
    <small>Cod: {{ pokemon.id }}</small>
    <div class="types-container" v-if="pokemon.types && pokemon.types.length > 0">
      <span v-for="(type, id) in pokemon.types" :key="id"
        class="types-item" :class="type.name">{{ type.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {}
  }
}
</script>

<style lang="scss">
.card {
  height: 190px;
  min-width: 150px;
  background: white;
  padding: 5px;
  
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  
  text-align: center;
  box-shadow: 0px 4px 20px 0px rgba(225, 225, 225, 1);
  border-radius: 8px;

  .thumb {
    margin: 0 auto;
  }

  .types {
    &-container {
      display: flex;
      justify-content: center;
      gap: 5px;
    }

    &-item {
      border-radius: 15px;
      padding:4px 6px;
      color: white;
      background: rgba(14, 14, 14, 1);
      text-transform: uppercase;

      &.grass{
        background: rgba(8, 254, 195, 1);
      }
      &.poison{
        background: rgba(175, 8, 254, 1);
      }
      &.water{
        background: rgba(0, 163, 255, 1);
      }
      &.fire{
        background: rgba(254, 8, 8, 1);
      }
      &.electric{
        background: rgba(255, 184, 0, 1);
      }
      &.ground{
        background: rgba(133, 130, 110, 1);
      }
      &.fairy{
        background: rgba(251, 161, 236, 1);
      }
      &.normal{
        background: rgba(196, 196, 196, 1);
      }
      &.flying{
        background: rgba(83, 23, 252, 1);
      }
      &.default{
        background: rgba(14, 14, 14, 1);
      }
    }
  }
}
</style>