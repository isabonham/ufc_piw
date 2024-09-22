<template>
    <header v-if="!isLoginRoute" class="header">
      <h1>B & I CDs</h1>
      <button @click="logout" class="logout-button">Sair</button>
    </header>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'HeaderPage',
    setup() {
      const route = useRoute();
      const isLoginRoute = computed(() => route.path === '/login');
  
      const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      };
  
      return { isLoginRoute, logout };
    },
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #955925;
    color: #F0E2E7;
    height: 50px;
  }
  
  .logout-button {
    background-color: #db2323;
    color: #F0E2E7;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .logout-button:hover {
    background-color: #735342;
  }
  </style>
  