const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const professores = require('../public/professores.json');
  res.json(professores);
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('POST request to /professores: ' + req.body.nomeProf);
});

router.put('/', (req, res) => {
  console.log(req.body);
  res.send('PUT request to /professores: ' + req.body.id);
});

router.delete('/', (req, res) => {
  console.log(req.body);
  res.send('DELETE request to /professores: ' + req.body.id);
});

module.exports = router;