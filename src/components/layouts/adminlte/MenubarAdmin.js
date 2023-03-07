import React from 'react'

import { Link } from 'react-router-dom';
const MenubarAdmin = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <span className="brand-link  bg-info ">
                <img src="dist/img/avatar5.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
                <span className="brand-text font-weight-light">Admin Manage</span>
            </span>

            <div className='sidebar '>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item menu-open">
                            <ul className="nav nav-treeview">
                                <li className="nav-item ">
                                    <Link to="/admin" className="nav-link active bg-info">
                                        <i className="far fa-circle nav-icon" />
                                        <p>แดชบอร์ด:</p>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/ManageAdmin" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>จัดการผู้ใช้งาน:</p>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default MenubarAdmin
