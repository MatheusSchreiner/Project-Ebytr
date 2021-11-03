const express = require('express');
const err = require('../middlewares/err');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(err);

app.listen(PORT, console.log(`conectado na porta: ${PORT}`));
