import { Router} from "express";
import { AppDataSource } from "../DataSource";
import { User } from "../entity/User"
import { Role } from "../entity/Role";

const router = Router() 
  
const users: User[] = [];
  
//API post (cadastrar usuário) --- já integrada ao BD
router.post('/users', async (req, res) => {
    const {name, username, email, password, role} = req.body
  
    if (!name || !username || !email || !password || !role) {
        return res.status(400).json ({
            error: {
                status: 400,
                name: 'Validation error',
                message: 'Você não preencheu um campo obrigatório'
            }
        })
    }
  
    const userRepository = AppDataSource.getRepository(User)
    const roleRepository = AppDataSource.getRepository(Role)

    let roleInDB = await roleRepository.findOne( { where: { name: role}})

    if (!roleInDB) {
        roleInDB = roleRepository.create({ name: role })
        await roleRepository.save(roleInDB)
    }

    const newUser: User = userRepository. create({
        name,
        username,
        email,
        password,
        role: roleInDB
    })
  
    await userRepository.save(newUser)
    res.status(200).json({
        data: newUser
    })
})
  
//API get (listar usuários) --- já integrada ao BD
router.get('/users', async (req, res) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find({ relations: ['role'] })
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