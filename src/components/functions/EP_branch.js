import axios from 'axios'

export const create_branch = async ( authtoken,value) =>
  await axios.post(process.env.REACT_APP_API + "/branch/create", value,
  {
    headers: {
      authtoken
    }
  });

export const paginate_branch = async (authtoken,pages,limit) =>  
await axios.get(process.env.REACT_APP_API+`/branch/pages/${pages}/${limit}`,
{
  headers: {
    authtoken
  }
});

export const update_branch = async (authtoken,id,values) =>  
 await axios.put(process.env.REACT_APP_API+'/branch/update/'+id,values,
    {
      headers: {
        authtoken
      }
    });
    
export const remove_branch = async (authtoken,id) =>  
 await axios.delete(process.env.REACT_APP_API+'/branch/remove/'+id,
    {
      headers: {
        authtoken
      }
});