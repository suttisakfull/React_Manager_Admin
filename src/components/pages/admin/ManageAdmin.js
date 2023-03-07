import React, { useState, useEffect } from 'react'
import Header from '../../layouts/adminlte/Header'
import MenubarAdmin from '../../layouts/adminlte/MenubarAdmin';
import Footer from '../../layouts/adminlte/Footer'
import ReactPaginate from 'react-paginate';
import { WindowsOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
//ant design
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Switch, Spin, message, Select, Tag, Modal, Button, Space, Row, Col } from 'antd';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Card } from 'antd';

// import Register from '../auth/Register'

// day/mount/year
import moment from 'moment/min/moment-with-locales'

// functions list_users,
import { changeStatus_users, changeRoles_users, remove_users, resetPassword_users, paginate_users } from "../../functions/EP_users"
import { register } from "../../functions/EP_auth"
const ManageAdmin = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [values, setvalues] = useState({
        id: "",
        password: "",
    })
    // const [items,setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [total, settotal] = useState([]);
    const [value_reg, setvalue_reg] = useState({
        username: "",
        password: "",
        password_: ""
    });




    //===============Modal===============
    const [form] = Form.useForm();

    //====================================

    let page_num = 1;

    const page_one = 1;
    const limit = 10;


    useEffect(() => {
        loadData(user.token)
        // const getComments = async() =>{
        //     const res = await fetch(
        //         `http://192.168.150.227:9000/v1/users/pages/${pages}/${limit}`
        //     );
        //     const data = await res.json();
        //     setItems(data)
        // }
        // getComments();
    }, [user])


    //================Modal================
    const showModal = (id) => {
        setIsModalOpen(true);
        setvalues({ ...values, id: id })
    };
    const handleOk = () => {
        setIsModalOpen(false);
        // console.log("handleOK: ",values)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        resetPassword_users(user.token, values.id, { values })
            .then(res => {
                // console.log(res)
                // loadData(user.token)
                page_num = localStorage.getItem('currentPage')
                console.log("=============================================================");
                console.log("Page_num: ", page_num)
                console.log("Page_limit: ", limit)
                page_paginate(user.token, page_num, limit)

            }).catch(err => {
                console.log(err.response)
            })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChangePassword = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setvalues({ ...values, [e.target.name]: e.target.value });
    }
    //======================================

    const loadData = (authtoken) => {

        // list_users(authtoken)
        //     .then(res => {
        //          console.log("list_user:",res.data)
        //         setData(res.data)
        //         // let newArr = res.data.users.map((item) => {
        //         //     return {
        //         //       "status": item.status,
        //         //       "date": item.date,
        //         //       "roles": item.roles,
        //         //       "username": item.username,
        //         //       "verified": item.verified

        //         //     }
        //         //   })
        //         //   setData(newArr)
        //         //   console.log("map:",newArr)
        //     }).catch(err => {
        //         console.log(err.response.data)
        //         message.error(err.response.data)

        //     })


        paginate_users(authtoken, page_one, limit)
            .then(res => {
                // console.log("page_limit:",res.data.users)
                console.log("Total:", res.data.total)
                settotal(res.data.total)
                setData(res.data.users)
                setpageCount(Math.ceil(res.data.total / limit))
                localStorage.setItem('currentPage', page_num)
                //  console.log("Math: ",Math.ceil(res.data.total/5))
            }).catch(err => {
                console.log(err.response.data)
                message.error(err.response.data)
            })
    };
    const page_paginate = (authtoken, currentPage, limit) => {
        paginate_users(authtoken, currentPage, limit)
            .then(res => {
                console.log("page_limit:", res.data.users)
                console.log("Total:", res.data.total)
                setData(res.data.users)
                setpageCount(Math.ceil(res.data.total / limit))
                //  console.log("Math: ",Math.ceil(res.data.total/5))
            }).catch(err => {
                console.log(err.response.data)
                message.error(err.response.data)
            })
    }
    const handleOnchange_sw = (e, id) => {
        console.log(e, id)
        const value = {
            id: id,
            status: e
        }
        //    console.log(value)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        changeStatus_users(user.token, value)
            .then(res => {
                console.log("res: ", res.data)
                //  loadData(user.token)
                // page_paginate(user.token,currentPage,limit)
                // alert(" Update success   user: "+ res.data.user)
                page_num = localStorage.getItem('currentPage')
                console.log("=============================================================");
                console.log("Page_num: ", page_num)
                console.log("Page_limit: ", limit)
                page_paginate(user.token, page_num, limit)

                // localStorage.removeItem('currentPage')
            }).catch(err => {
                console.log(err.response.data)
            })
    }
    const handleOnchange_roles = (e, id) => {
        const value = {
            id: id,
            roles: e
        }
        //  console.log(value)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        changeRoles_users(user.token, value)
            .then(res => {
                console.log(res)
                // loadData(user.token)
                page_num = localStorage.getItem('currentPage')
                console.log("=============================================================");
                console.log("Page_num: ", page_num)
                console.log("Page_limit: ", limit)
                page_paginate(user.token, page_num, limit)

            }).catch(err => {
                console.log(err.response.data)
            })

    }
    const handleRemove_user = (id) => {
        console.log(id)
        if (window.confirm("Are you Sure Delete !")) {
            remove_users(user.token, id)
                .then(res => {
                    // loadData(user.token)
                    page_num = localStorage.getItem('currentPage')
                    console.log("=============================================================");
                    console.log("Page_num: ", page_num)
                    console.log("Page_limit: ", limit)
                    page_paginate(user.token, page_num, limit)
                }).catch(err => {
                    console.log(err.response.data)
                })
        }
    }
    const handlePageClick = (e) => {
        console.log("Clicked:", e)
        let currentPage = e.selected + 1
        page_num = currentPage
        console.log("currentPage: ", page_num)
        localStorage.setItem('currentPage', page_num)
        page_paginate(user.token, page_num, limit)
        // setconpage(e.selected)
        // console.log("conpage: ",conpage)


    }

    //=============== registerForm =============//
    const registerForm = (values) => {
        console.log("registerForm::")
        setLoading(true);
        setTimeout(() => {
            form.resetFields();
            setLoading(false);
        }, 2000);

        console.log("P1: ", values.password)
        console.log("P2: ", values.password_)

        if(values.password !== values.password_){
            setTimeout(() => {
                // message.error('Password not match !!!')
                alert('Password not match !!!')
            }, 3000)
        }else{
            register(values)
            .then(res=>{
                console.log(res.data);
                alert(res.data)
                loadData(user.token)

                // Redirect(res.data);
            })
            .catch(err=>{
                // console.log(err.response.data)
                 alert(err.response.data)
                setTimeout(() => {
                    // message.error(err.response.data)
                }, 3000)
            })


        }
        //============ todo ===========
    }
    const clearForm = () => {
        // console.log("======Clear Form======")
        form.setFieldsValue({
            username: "",
            password: "",
            password_: "",
        });
    }

    // ===============Model bootstrap====================
    const handleChange = (e) => {
        // console.log(e.target.name) 
        // console.log(e.target.value)
        setvalue_reg({ ...value_reg, [e.target.name]: e.target.value })

    }
   
    //==========================================
    const roleData = ['ADMIN', 'USER']
    console.log(value_reg)

    return (
        <div>
            <Header />
            <MenubarAdmin />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0"> จัดการผู้ใช้งาน:</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><span>Admin_Home</span></li>
                                    <li className="breadcrumb-item active">Dashboard v1</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <section className="col-lg-12 connectedSortable">
                                <div className="card">
                                    <div className="card-header bg-info">
                                        <h3 className="card-title">
                                            {/* <i className="fas fa-address-card mr-2 mt-2" /> */}
                                            <i class="fas fa-users mr-2 mt-1 mb-1"></i>
                                            ตารางผู้ใช้งานทั้งหมด
                                        </h3>
                                        <div className="card-tools">

                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                        <div>

                                        </div>
                                    </div>


                                    <div className="row mt-1 ml-2">
                                        <div className="col-sm-6 ">
                                            <ul className="pagination">
                                                <span className="page-link mt-3" style={{ fontSize: '16px', marginLeft: 1 }}>count:  {total}</span>
                                            </ul>
                                        </div>
                                        <div className="col-sm-6 ">
                                            <ol className="breadcrumb float-sm-right mr-3">
                                                <button type="button" className="btn btn-block bg-info  mt-3  " data-toggle="modal" data-target="#modal-lg">
                                                    <i class="fas fa-user"></i>
                                                    + register
                                                </button>
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="card-body " style={{ marginTop: -25 }}>

                                        <Spin spinning={loading}>

                                            <table className="table table-light table-striped " >
                                                <thead style={{ fontSize: '14px' }}>
                                                    <tr>
                                                        {/* <th scope="col">id:</th> */}
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Roles</th>
                                                        <th scope="col">Status</th>
                                                        {/* <th scope="col">Time</th> */}
                                                        <th scope="col">Created</th>
                                                        <th scope="col">Updated</th>
                                                        <th scope="col">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((item, index) => (
                                                        <tr key={index}>
                                                            {/* <td>{index+1}</td> */}
                                                            <td>{item.username}</td>
                                                            <td>
                                                                {/* {item.roles} */}
                                                                <Select style={{ width: '50%' }}
                                                                    value={item.roles}
                                                                    onChange={(e) => handleOnchange_roles(e, item._id)}
                                                                >
                                                                    {roleData.map((item, index) =>
                                                                        <Select.Option
                                                                            value={item}
                                                                            key={index}>
                                                                            {item === "ADMIN"
                                                                                ? <Tag color="green">{item}</Tag>
                                                                                : <Tag color="red">{item}</Tag>
                                                                            }
                                                                        </Select.Option>
                                                                    )}
                                                                </Select>
                                                            </td>
                                                            <td>
                                                                <Switch
                                                                    defaultChecked
                                                                    checked={item.status}
                                                                    onChange={(e) => handleOnchange_sw(e, item._id)}
                                                                />
                                                            </td>
                                                            {/* <td>
                                                                
                                                                {moment(item.date).format('h:mm:ss')}
                                                            </td> */}
                                                            <td>
                                                                {/* {item.createdAt} */}
                                                                {/* {moment(item.createdAt).locale('th').format('ll')} */}
                                                                {moment(item.createdAt).locale('th').format('DD/MM/YYYY, h:mm:ss')}
                                                            </td>
                                                            <td>
                                                                {/* {item.updatedAt} */}
                                                                {/* {moment(item.updatedAt).format('DD/MM/YYYY, h:mm:ss')} */}
                                                                {moment(item.updatedAt).locale('th').startOf(item.updatedAt).fromNow()}
                                                            </td>
                                                            <td>
                                                                <EditOutlined style={{ fontSize: '20px', color: "blue", }} onClick={() => showModal(item._id)} />
                                                                <span> | </span>
                                                                <DeleteOutlined style={{ fontSize: '20px', color: "red", }} onClick={() => handleRemove_user(item._id)} />
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>



                                        </Spin>

                                    </div>


                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            // padding: 10,
                                            boxSizing: 'border-box',
                                            width: '100%',
                                            height: '100%',
                                            // border: '1px solid red'
                                        }}
                                    >
                                        <ReactPaginate

                                            style={{ paddingTop: '100px' }}
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={3}
                                            pageRangeDisplayed={6}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination justify-content-center'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'page-item'}
                                            nextLinkClassName={'page-link'}
                                            breakLinkClassName={'page-link'}
                                            activeClassName={'active'}

                                        ></ReactPaginate>
                                    </div>

                                </div>


                                {/* ==================  Ant desing ======================== */}
                                <Modal
                                    title="ChangPassword:"
                                    extra={<WindowsOutlined style={{ fontSize: '26px', color: "black", marginLeft: '-405px' }} />}
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}

                                    type="info"
                                    style={{ width: 450, marginTop: '5px' }}
                                    bodyStyle={{ height: 220, backgroundColor: '#fafafa' }}
                                    headStyle={{ backgroundColor: '#81D4FA', color: 'black', paddingLeft: "180px", fontSize: '18px' }}
                                >
                                    <p>New Password :</p>
                                    <input
                                        onChange={handleChangePassword}
                                        type="password"
                                        name="password"
                                    />
                                </Modal>
                                {/* =================== Bootstrap ===============  */}

                                <div className="modal fade" id="modal-lg">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header  bg-info">

                                                <h4 className="modal-title">Register:</h4>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>

                                            </div>
                                            <div className="modal-body">

                                                <Spin spinning={loading}>
                                                    <div class="container">
                                                        <div class="row justify-content-center">
                                                            <Card style={{ width: 500 , marginTop: 15}}>
                                                                <Form
                                                                    name="normal_register"
                                                                    className="register-form"
                                                                    initialValues={{
                                                                        remember: true,
                                                                    }}
                                                                    onFinish={registerForm}
                                                                    form={form}
                                                                >
                                                                    <Form.Item
                                                                        name={"username"}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: 'Please input your Username!',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input
                                                                            name="username"
                                                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                                                            placeholder="Username"
                                                                            size={'large'}
                                                                            onChange={e => handleChange(e)}
                                                                        />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        name={"password"}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: 'Please input your Password!',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input
                                                                            name="password"
                                                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                                                            type="password"
                                                                            placeholder="Password"
                                                                            size={'large'}
                                                                            onChange={e => handleChange(e)}
                                                                        />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        name={"password_"}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: 'Please input your Password!',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input
                                                                            name="password_"
                                                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                                                            type="password"
                                                                            placeholder="Password"
                                                                            size={'large'}
                                                                            onChange={e => handleChange(e)}
                                                                        />
                                                                    </Form.Item>



                                                                    <Space style={{ marginTop: 15 }}>
                                                                        <Form.Item>
                                                                            <Row>
                                                                                <Col span={6}>

                                                                                </Col>
                                                                                <Space direction='horizontal' style={{ paddingLeft: 240, marginTop: 10 }}>
                                                                                    <Button danger onClick={clearForm} block size={'large'}>
                                                                                        Clear
                                                                                    </Button>
                                                                                    <Button type="primary" ghost htmlType="submit" block size={'large'}>
                                                                                        Register
                                                                                    </Button>
                                                                                </Space>
                                                                            </Row>
                                                                        </Form.Item>
                                                                    </Space>

                                                                </Form>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </Spin>

                                                {/* <p>One fine body&hellip;</p> */}
                                            </div>
                                            {/* <div className="modal-footer justify-conte">
                                                <button type="button" onClick={registerClear} className="btn btn-default" data-dismiss="modal">Close</button>
                                                <button type="button" onClick={registerForm} className="btn btn-primary">register:</button>

                                            </div> */}
                                        </div>

                                    </div>

                                </div>

                                {/* ============================================== */}

                            </section>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ManageAdmin
