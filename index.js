const express = require('express');

const app = express();


app.use(express.json());

app.get('/',(req,res) => {
  res.send('<h1>Desde el servidor</h1>');
})

app.post('/',(req,res) => {
  const usuario = "jose@email.com";
  const password = "123456";

  if(req.body.username !== usuario) {
    return res.send('Usuario no encontrado')
  }

  if(req.body.password !== password) {
    return res.send('Password incorrecto')
  }

  res.send('Usuario Logueado');
})

// http://localhost:4000/user
// send --> "Usuario Actualizado"
app.put('/user/:id',(req,res) => {
  let nombre = "Jose";
  let apellido = "Velasque";

  nombre = req.body.name
  apellido = req.body.apelllidos

  res.send(`Usuario: ${nombre} ${apellido}`);
})

app.delete('/user/:id',(req,res) => {
  const user = [
    {
      id: "1",
      name: "Jose",
      passwor: "123"
    },
    {
      id: "2",
      name: "Fernando",
      passwor: "abc"
    },
  ]

  const userElminado = user.filter(u => u.id !== req.params.id)

  res.send(userElminado)
})

app.listen(4000,() => {
  console.log('Servidor escuchando el puerto 4000');
})

// http://localhost:4000
// http://localhost:4000/user
// http://localhost:4000/categoria

/* 
  TAREA:
  1. Crear una API REST con Express
  2. Crear AUTENTICACION
  3. GET --> LISTENME LOS USUARIOS
  4. POST --> CREAR UN USUARIO
  5. PUT --> ACTUALIZAR UN USUARIO
  6. DELETE --> ELIMINAR UN USUARIO
*/