const express = require('express');

const userData = require('./data')

const app = express();


app.use(express.json());

app.get('/users',(req, res) => {
  res.json(userData)
})

app.get('/users/:id',(req,res) => {
  const { id } = req.params;
  const userFound = userData.find(user => user.id === id )
  if(!userFound) return res.json({msg: `El usuario con id ${id} no existe`})
  res.json({
    msg: 'Usuario encontrado',
    user: userFound
  })
})

app.post('/users/register',(req, res) => {
  const id = String(userData.length + 1)
  const newUser = {id,...req.body}
  userData.push(newUser)
  res.json(userData)
})

app.post('/users/login',(req, res) => {
  const { email, password } = req.body
  const userFound = userData.find(user => user.email === email )
  if(!userFound) return res.json({msg:`El usuario con el email ${email} no existe`})
  if(password !== userFound.password)  return res.json({msg:'El password es incorrecto' })

  res.json({msg: "Usuario Logueado"})
})

app.put('/users/:id',(req, res) => {
  const {id} = req.params
  const {name, password, apellidos,email} = req.body
  const userFound = userData.find(user => user.id === id )
  if(!userFound) return res.json({msg: `El usuario con id ${id} no existe`})

  userFound.name = name || userFound.name
  userFound.password = password || userFound.password 
  userFound.apellidos = apellidos || userFound.apellidos
  userFound.email = email || userFound.email

  res.json({msg: "Usuario actualizado",user:userFound})
})

app.delete('/users/:id',(req, res) => {
  const { id } = req.params
  const userFound = userData.find(user => user.id === id )
  if(!userFound) return res.json({msg: `El usuario con id ${id} no existe`})

  const listUsersUpdated = userData.filter(user => user.id !== id)

  res.json({
    msg:`Usuario ${userFound.email} ha sido eliminado`,
    users: listUsersUpdated
  })
})


app.listen(4000,() => {
  console.log('Servidor escuchando el puerto 4000');
})