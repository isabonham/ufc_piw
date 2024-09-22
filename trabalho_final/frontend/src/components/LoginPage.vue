<template>
  <div class="login-container">
    <h1 class="login-title">B & I CDs</h1>
    <form @submit.prevent="login" class="login-form">
      <input v-model="username" placeholder="Login" required class="login-input" />
      <input v-model="password" type="password" placeholder="Senha" required class="login-input" />
      <button type="submit" class="login-button">Entrar</button>
    </form>
    <button @click="goToRegister" class="register-button">Ainda não tem login? Cadastre-se</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'; 
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations(['setUserId']), 

    async login() {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const token = data.token;
        const decode = jwtDecode(token);
        this.setUserId(decode.id, decode.role);
        if(decode.role === 'user'){
          this.$router.push('/cds');
        }else{
          this.$router.push('/admin/cds');
        }
      } else {
        alert(data.message);
      }
    },

    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.login-container {
  padding: 2rem;
  border: 2px solid #B29A8C;
  border-radius: 8px;
  background-color: #33352B;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 30%;
  display: flex;
  flex-direction: column;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #B29A8C;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #955925;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

.login-input:focus {
  outline: none;
  border-color: #735342;
}

.login-button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #955925;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #735342;
}


.register-button {
  margin-top: 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  color: #B29A8C;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s;
}

.register-button:hover {
  color: #955925;
}
</style>
