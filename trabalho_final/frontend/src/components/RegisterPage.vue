<template>
  <div class="register-container">
    <h1 class="register-title">Crie sua conta</h1>
    <form @submit.prevent="register" class="register-form">
      <input v-model="username" placeholder="Login" required class="register-input" />
      <input v-model="email" placeholder="Email" required class="register-input" />
      <input v-model="password" type="password" placeholder="Senha" required class="register-input" />
      <button type="submit" class="register-button">Criar usuário</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.username,  username: this.username, email: this.email, password: this.password, role: 'user' }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        this.$router.push('/login');
      } else {
        alert(data.message);
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  padding: 2rem;
  border: 2px solid #B29A8C;
  border-radius: 8px;
  background-color: #33352B;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 30%;
  margin: 0 auto;
}

.register-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #B29A8C;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.register-input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #955925;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

.register-input:focus {
  outline: none;
  border-color: #735342;
}

.register-button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #955925;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #735342;
}
</style>
