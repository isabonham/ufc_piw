import express from 'express'

const app = express ()
const port = 3000

app.get('/', (req, res) => {
    res.send('<html> <center> <h1> Loja de CDs <h1> <h3>Este projeto é uma loja destinada a venda de CDs de artistas de vários ritmos e estilos musicais.<h3> <h2> Dupla: Isabela e Bianca <h2></center></html>');
});

app.use(express.json())

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const users: User[] = [];


//API post (cadastrar usuário)
app.post('/users', (req, res) => {
  const {name, username, email, password, role} = req.body

  if (!name || !username || !email || !password || !role) {
    return res.status(400).json ({
      status: 400,
      name: 'Validation error',
      message: 'Você não preencheu um campo obrigatório'
    })
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    username,
    email,
    password,
    role
  }

  users.push(newUser)
  res.status(200).json({
    data: users
  })
})

app.listen(port, () => {
    console.log(`Servidor executando na port ${port} em http://localhost:${port}`)
}) 