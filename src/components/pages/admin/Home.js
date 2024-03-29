import { useState, useEffect } from 'react'

import Header from '../../layouts/adminlte/Header'
import MenubarAdmin from '../../layouts/adminlte/MenubarAdmin';
import Footer from '../../layouts/adminlte/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSelector } from 'react-redux';


//function

import {list_product} from '../../functions/EP_product'

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const [product, setProduct] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() =>{
    loadData(user.token,3)
  },[])

  const loadData= (authtoken,count) =>{
    list_product(authtoken,count)
    .then(res=>{
       console.log(res.data)
    }).catch(err =>{
      console.log(err)

    })
  }
  return (
    <div>
      <Header />
      <MenubarAdmin />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0"> Dashboard:</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><span>Home</span></li>
                  <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>
            </div>
            <hr></hr>
            {/* ====================================== */}

           
            {/* ===================================== */}



          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default Home
