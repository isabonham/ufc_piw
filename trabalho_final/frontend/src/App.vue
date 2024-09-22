<template>
  <div id="app">
    <HeaderPage />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import HeaderPage from './components/HeaderPage.vue'; 

export default {
  name: 'App',
  components: {
    HeaderPage,
  },
};
</script>

<style>
html, body {
  margin: 0; 
  padding: 0; 
  height: 100%; 
}

#app {
  background-color: #33352B; 
  min-height: 100vh; 
}

main {
  padding: 2rem;
  box-sizing: border-box; 
  display: flex;
  justify-content: center;
}
</style>
