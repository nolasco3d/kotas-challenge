<template>
  <div class="navbar">
    <img src="" alt="logo">
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700&display=swap');
#app {
  background: rgba(241, 244, 245, 1);
  font-family: 'Mulish', sans-serif;
  min-height: 100vh;
}
* {
  padding: 0;
  margin: 0;
  outline: none;
  box-sizing: border-box;
}
.navbar {
  height: 48px;
  background: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0px 1px 1px #E1E1E1;
}
</style>
