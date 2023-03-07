import React from 'react'

import Header from '../../layouts/adminlte/Header'
import Menu from '../../layouts/adminlte/Menu'
import Footer  from '../../layouts/adminlte/Footer'
import 'bootstrap/dist/css/bootstrap.css';

const home = () => {
  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <h1>Home User:</h1>
      </div>
      <Footer />
    </div>
  )
}

export default home
