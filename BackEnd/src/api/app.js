const express = require('express');
const err = require('../middlewares/err');
const users = require('../routes/users');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/users', users);
app.use(err);

app.listen(PORT, console.log(`conectado na porta: ${PORT}`));
