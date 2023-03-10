import axios from 'axios'

export const create_product = async ( authtoken,value) =>
  await axios.post(process.env.REACT_APP_API + "/product/create", value,
  {
    headers: {
      authtoken
    }
  });
