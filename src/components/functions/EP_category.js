import axios from 'axios'

export const create_category = async ( value) =>
  await axios.post(process.env.REACT_APP_API + "/category/create", value);

  
export const paginate_category = async (authtoken,pages,limit) =>  
await axios.get(process.env.REACT_APP_API+`/category/pages/${pages}/${limit}`,
{
  headers: {
    authtoken
  }
});

export const remove_category = async (authtoken,id) =>  
 await axios.delete(process.env.REACT_APP_API+'/category/remove/'+id,
    {
      headers: {
        authtoken
      }
});

export const update_category = async (authtoken,id,values) =>  
 await axios.put(process.env.REACT_APP_API+'/category/update/'+id,values,
    {
      headers: {
        authtoken
      }
    });


   
