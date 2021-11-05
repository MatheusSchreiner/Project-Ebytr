const express = require('express');
const cors = require('cors');
require('dotenv').config();

const err = require('../middlewares/err');
const users = require('../routes/users');
const login = require('../routes/login');
const tasks = require('../routes/tasks');

const app = express();

const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use('/users', users);
app.use('/login', login);
app.use('/tasks', tasks);
app.use(err);

app.listen(PORT, console.log(`conectado na porta: ${PORT}`));
