import React, { useState } from 'react';
import postUser from '../API/tasks/usersApi';

const Users = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sendUser = async () => {
    const response = await postUser(user);
    console.log(response);
  };

  return (
    <>
      <main>
        <h1>Cadastre-se</h1>
          <input name="name" type="text" placeholder="Digite seu nome" onChange={handleChange} />
          <input name="email" type="email" placeholder="Digite seu email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Digite sua senha" onChange={handleChange} />
          <input name="role" type="text" placeholder="Digite seu cargo" onChange={handleChange} />
          <button type="button" onClick={() => sendUser()} >Send</button>
      </main>
    </>
  )
}

export default Users
