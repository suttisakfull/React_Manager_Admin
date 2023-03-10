// import logo from './logo.svg';
// import './App.css';
import React, { useEffect } from 'react'
//Page
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Logout from "./components/pages/auth/Logout";
import Home from "./components/pages/Home";
import Admin from "./components/pages/admin/Home";
import User from "./components/pages/user/Home";

import ManageAdmin from "./components/pages/admin/ManageAdmin"
import CategoryAdmin from "./components/pages/admin/CreateCategory"
import ProductAdmin  from "./components/pages/admin/CreateProduct"
import BranchAmdin from "./components/pages/admin/CreateBranch"



//Router V6
import { Routes, Route } from 'react-router-dom';
//function
import { currentUser } from './components/functions/EP_auth'
//redux
import { useDispatch } from 'react-redux';

//Routes
import UserRoute from './components/layouts/routes/UserRoute';
import AdminRoute from './components/layouts/routes/AdminRoute';

// Toast
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const idtoken = localStorage.token;
    if (idtoken) {

      currentUser(idtoken)
        .then((res) => {
          console.log(res.data)
          dispatch({
            type: 'LOGIN',
            payload: {
              token: idtoken,
              username: res.data.username,
              roles: res.data.roles
            }
          })

        })
        .catch((err) => {

        });
    }
  }, [dispatch])

  return (
    <div className="App">
      {/* <h1>Hello React</h1> */}
      {/* <Register/> */}
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<Home />} />

        <Route path="/admin" element={     //dashboard

          <AdminRoute>
            <Admin />
          </AdminRoute>
        } />

        <Route path="/ManageAdmin" element={
          <AdminRoute>
            <ManageAdmin />
          </AdminRoute>
        } />

        <Route path="/CategoryAdmin" element={
          <AdminRoute>
            <CategoryAdmin />
          </AdminRoute>
        } />
        {/* ProductAdmin */}
        <Route path="/ProductAdmin" element={
          <AdminRoute>
            <ProductAdmin/>
          </AdminRoute>
        } />
        {/* BranchAmdin  */}
        <Route path="/BranchAmdin" element={
          <AdminRoute>
            <BranchAmdin/>
          </AdminRoute>
        } />


        <Route path="/user" element={
          <UserRoute>
            <User />
          </UserRoute>
        } />



      </Routes>
    </div>
  );
}

export default App;
