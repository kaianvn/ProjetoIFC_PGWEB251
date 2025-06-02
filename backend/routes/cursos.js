const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const cursos = require('../public/cursos.json');
  res.json(cursos);
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('POST request to /cursos: ' + req.body.nomeCurso);
});

router.put('/', (req, res) => {
  console.log(req.body);
  res.send('PUT request to /cursos: ' + req.body.id);
});

router.delete('/', (req, res) => {
  console.log(req.body);
  res.send('DELETE request to /cursos: ' + req.body.id);
});

module.exports = router;