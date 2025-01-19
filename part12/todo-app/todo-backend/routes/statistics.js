const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

router.get('/', async (req, res) => {
  const todoCounter = (await getAsync('added_todos')) || 0;
  res.json({ 'added_todos': parseInt(todoCounter) })
})



module.exports = router;
