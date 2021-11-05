import axios from 'axios';

// const URL = 'http://localhost:3001/users';
const URL = 'https://backend-ebytr.herokuapp.com/users';

const postUser = async ({ name, email, password, role }) => {
  try {
    const data = await axios.post(URL, { name, email, password, role });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default postUser;
