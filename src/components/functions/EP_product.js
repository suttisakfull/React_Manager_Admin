import axios from 'axios'

export const create_product = async ( authtoken,value) =>
  await axios.post(process.env.REACT_APP_API + "/product/create", value,
  {
    headers: {
      authtoken
    }
  });

  export const list_product = async (authtoken,count) =>  
  await axios.get(process.env.REACT_APP_API+'/product/list/'+count,
     {
       headers: {
         authtoken
       }
     });


 