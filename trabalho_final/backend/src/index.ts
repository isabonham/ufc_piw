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

//API get (listar usuários)
app.get('/users', (req, res) => {
  res.json ({
    data: users
  })
})

//API get (listar usuário pelo ID)
app.get('/users/:id', (req, res) => {
  const {id} = req.params
  const user = users.find(u=> u.id === parseInt(id))

  if (!user) {
    return res.status(400).json({
      error: {
        status: 400,
        name: 'NotFound',
        message: 'Usuário não encontrado'
      }
    })
  }

  res.json({
    data: user
  })
})

//API delete (deletar usuário)
app.delete('/users/:id', (req, res) => {
  const{id} = req.params
  const userIndex = users.findIndex(u => u.id === parseInt(id))

  if (userIndex === -1) {
    return res.status(404).json ({
      error: {
        status: 404,
        name: 'NotFound',
        message: 'Usuário não encontrado'
      }
    })
  }

  const deletedUser = users.splice(userIndex, 1) [0]
  res.status(200).json({
    data: deletedUser
  })
})

// API update user
app.put('/users/:id', (req, res) => {
  const { id } = req.params
  const {name, username, email, password, role} = req.body
  const userIndex = users.findIndex(u => u.id === parseInt(id))

  if (userIndex === -1) {
      return res.status(404).json({
          error: {
              status: 404,
              name: 'NotFound',
              message: 'Usuário não encontrado'
          }
      })
  }

  const updateUser = {
      id: parseInt(id),
      name: name || users[userIndex].name,
      username : username || users[userIndex].username,
      email : email || users[userIndex].email,
      password : password || users[userIndex].password,
      role : role || users[userIndex].role,
  }

  users[userIndex] = updateUser
  res.status(200).json({
      data: updateUser
  })
})

app.listen(port, () => {
    console.log(`Servidor executando na port ${port} em http://localhost:${port}`)
}) 