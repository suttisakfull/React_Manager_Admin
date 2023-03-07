import axios from 'axios'


export const list_users = async (authtoken) =>  
 await axios.get(process.env.REACT_APP_API+'/users/list',
    {
      headers: {
        authtoken
      }
    });

export const changeStatus_users = async (authtoken,value) =>  
 await axios.post(process.env.REACT_APP_API+'/users/change-status',value,
    {
      headers: {
        authtoken
      }
    });

export const changeRoles_users = async (authtoken,value) =>  
 await axios.post(process.env.REACT_APP_API+'/users/change-roles',value,
    {
      headers: {
        authtoken
      }
    });

export const remove_users = async (authtoken,id) =>  
 await axios.delete(process.env.REACT_APP_API+'/users/remove/'+id,
    {
      headers: {
        authtoken
      }
    });

export const resetPassword_users = async (authtoken,id,values) =>  
 await axios.put(process.env.REACT_APP_API+'/users/resetPassword/'+id,values,
    {
      headers: {
        authtoken
      }
    });

export const paginate_users = async (authtoken,pages,limit) =>  
 await axios.get(process.env.REACT_APP_API+`/users/pages/${pages}/${limit}`,
    {
      headers: {
        authtoken
      }
    });


   


