import express from 'express'

const app = express ()
const port = 3000

app.get('/', (req, res) => {
    res.send('<html> <center> <h1> Loja de CDs <h1> <h3>Este projeto é uma loja destinada a venda de CDs de artistas de vários ritmos e estilos musicais.<h3> <h2> Dupla: Isabela e Bianca <h2></center></html>');
  });

app.listen(port, () => {
    console.log(`Servidor executando na port ${port} em http://localhost:${port}`)
}) 