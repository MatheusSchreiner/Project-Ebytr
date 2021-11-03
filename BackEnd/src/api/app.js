const express = require('express');
const erro = require('../middlewares/erro');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(erro);

app.listen(PORT, console.log(`conectado na porta: ${PORT}`));
