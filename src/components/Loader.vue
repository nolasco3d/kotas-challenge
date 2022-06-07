<template>
  <div class="loader" v-show="showLoader">
    <span>Loading...</span>
  </div>
</template>

<script>
export default {
  props: {
    showLoader: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
.loader {
  background: gray;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 8px 10px;
  border-radius: 6px;
}
</style>