import React,{ useState, useEffect} from 'react'

import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin} from '../../functions/EP_auth';

const AdminRoute = ({ children}) => {
    const { user } = useSelector((state) => ({...state}));
    const [ok ,setOk] = useState(false)

    useEffect(() =>{
        if(user && user.token){
            currentAdmin(user.token)
            .then(res => {
                setOk(true)
                console.log('Admin Route ok', res)
            }).catch(err =>{
                setOk(false)
                console.log('Admin Route err', err)
            })
        }
    },[user])
  return  ok
       ? children
       : <LoadingToRedirect/>
}

export default AdminRoute
