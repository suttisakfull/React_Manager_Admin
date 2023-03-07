import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate  } from 'react-router-dom'
// import { message }from 'antd';

const Header = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [name, setname] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{

        setname(user)

    },[user])
    
    // const delay = ms => new Promise(
    //     resolve => setTimeout(resolve, ms)
    // );

    const logout = () => {
        //  await delay(500);
        // message.info('Logout Success:')
        // await delay(500);
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
       
       
        navigate('/logout')

   
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">

            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <span className="nav-link" data-widget="pushmenu"  role="button"><i className="fas fa-bars" /></span>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    {/* <a href="index3.html" className="nav-link">Home</a> */}
                    <Link to="/home-user" className="nav-link">
                        <i className="fas fa-home mr-2" />
                        HOME
                    </Link>
                </li>
            </ul>


            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <span className="nav-link"  >
                       <i className="fa fa-user mr-2" />
                       {/* <i className="fas fa-sign-out-alt" /> */}
                       {/* {user.username} */}
                       {name.username}
                    </span>

                </li>


                {/* fullscreen */}

                <li className="nav-item">
                    <span className="nav-link" data-widget="fullscreen" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                        {/* <i class="fas fa-times"></i> */}
                    </span>
                </li>



                {/* Dropdown Menu */}
                <li className="nav-item dropdown">
                    <span className="nav-link" data-toggle="dropdown" >
                        <i className="fas fa-th-large" />
                    </span>
                    {!user && (
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">Menu:</span>
                            <div className="dropdown-divider" />
                            {/* <a href="#" className="dropdown-item">
                                <i className="fa fa-user mr-2" />Login:
                            </a> */}
                            <Link to="/login" className="dropdown-item">
                                <i className="fa fa-user mr-2" />Login:
                            </Link>
                            <div className="dropdown-divider" />
                            <Link to="/register" className="dropdown-item">
                                <i className="fas fa-user mr-2" />Register:
                            </Link>
                           
                        </div>
                    )}
                    {user && (


                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">Menu:</span>
                            <div className="dropdown-divider" />

                            <div className="dropdown-item">
                                <i className="fas fa-sign-out-alt mr-2" />
                                <span onClick={logout}>Logout:</span>
                            </div>

                        </div>

                    )}

                </li>


            </ul>
        </nav>

    )
}

export default Header
