const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware para analisar JSON no corpo das requisições

app.use(cors(
    {
        origin: '*', // Permite requisições de qualquer origem
    }
));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/sobre', (req, res) => {
  res.send('About Page');
});

app.use('/', require('./routes'));

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});