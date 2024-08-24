import { Router} from "express";
import { User } from "../entity/User"

const router = Router() 
  
const users: User[] = [];
  
//API post (cadastrar usuário)
router.post('/users', (req, res) => {
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
router.get('/users', (req, res) => {
    res.json ({
        data: users
    })
})
  
//API get (listar usuário pelo ID)
router.get('/users/:id', (req, res) => {
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
router.delete('/users/:id', (req, res) => {
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
router.put('/users/:id', (req, res) => {
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

export default router