import React, { useState, useEffect } from 'react'
import Header from '../../layouts/adminlte/Header'
import MenubarAdmin from '../../layouts/adminlte/MenubarAdmin';
import Footer from '../../layouts/adminlte/Footer'

import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { toast } from 'react-toastify';
//Ant Design
import { MenuUnfoldOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Spin, Button, Space, Row, Col } from 'antd';
import { Form, Input, Card, Popconfirm } from 'antd';
// Bootstrap
import { Modal } from 'react-bootstrap'

//function
import { create_category, paginate_category, remove_category, update_category } from "../../functions/EP_category";

const CreateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [loading, setLoading] = useState(false);
    const [values, setvalues] = useState({ name: "", })
    //================  paginate ===========
    const [data, setData] = useState([]);
    const [total, settotal] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    //=============== Edit model=================
    const [ViewEdit, setEditShow] = useState(false)
    const handleEditShow = () => { setEditShow(true) }
    const handleEditClose = () => { setEditShow(false) }
    //Define local state
    const [Editname, setEditname] = useState({ name: "" })
    // id for update
    const [Editid, setEditId] = useState("");
    const [DataEdit, setDataEdit] = useState([])


    //===============Modal===============
    const [form] = Form.useForm();
    //========== params paginate ========
    let page_num = 1;
    const page_one = 1;
    const limit = 10;
    //============== useEffect ==========
    useEffect(() => {
        loadData(user.token)

    }, [])

    //=============== loadData ============
    const loadData = (authtoken) => {

        paginate_category(authtoken, page_one, limit)
            .then(res => {
                console.log("Total:", res.data)

                settotal(res.data.total)
                setData(res.data.category)
                setpageCount(Math.ceil(res.data.total / limit))
                localStorage.setItem('Page_Category', page_num)


            }).catch(err => {
                console.log(err.response.data)
            })


    }
    // =============== Function Page_paginate ==========
    const page_paginate = (authtoken, Page_Category, limit) => {
        paginate_category(authtoken, Page_Category, limit)
            .then(res => {
                console.log("page_limit::", res.data.category)
                console.log("Total:", res.data.total)
                setData(res.data.category)
                setpageCount(Math.ceil(res.data.total / limit))
            }).catch(err => {
                console.log(err.response.data)
                // message.error(err.response.data)
            })
    }
    // ===============Model bootstrap====================
    const handleChange = (e) => {
        // console.log(e.target.name) 
        // console.log(e.target.value)
        setvalues({ ...values, [e.target.name]: e.target.value })

    }
    const handleEditChange = (e) => {
        setEditname({ ...Editname, [e.target.name]: e.target.value })

    }
    //=============== Remove_Category====================
    const handleRemove_category = (id) => {
        console.log("Remove::", id)
        remove_category(user.token, id)
            .then(res => {
                // console.log(res.data)
                page_num = localStorage.getItem('Page_Category')
                // console.log("=============================================================");
                // console.log("Page_num: ", page_num)
                // console.log("Page_limit: ", limit)
                page_paginate(user.token, page_num, limit)
                //========== todo =======//
            }).catch(err => {
                console.log(err.response.data)
            })

    }
    const handlePageClick = (e) => {
        console.log("Clicked:", e)
        let Page_Category = e.selected + 1
        page_num = Page_Category
        console.log("Page_Category: ", page_num)
        localStorage.setItem('Page_Category', page_num)
        page_paginate(user.token, page_num, limit)
        // setconpage(e.selected)
        // console.log("conpage: ",conpage)


    }

    const CategoryForm_Create = (values) => {

        // console.log("Category_Create:: ", values)

        setLoading(true);
        setTimeout(() => {
            form.resetFields();
            setLoading(false);
        }, 1000);
        create_category(values)
            .then(res => {
                console.log(res.data);
                toast.success(res.data, { position: "top-center", autoClose: 2000 })
                page_num = localStorage.getItem('Page_Category')
                // console.log("=============================================================");
                // console.log("Page_num: ", page_num)
                // console.log("Page_limit: ", limit)
                page_paginate(user.token, page_num, limit)

                // alert(res.data)
                // clearForm()
            }).catch(err => {
                console.log(err.response.data)
                // alert(err.response.data)
                toast.error(err.response.data, { position: "top-center" })
            })

    }

    const clearForm = () => {
        // console.log("======Clear Form======")
        form.setFieldsValue({
            name: "",
        });
    }
    const handleEdit = () => {
        // console.log("Category_Edit: ", Editname)
        // console.log("edit_id:",Editid)
         setLoading(true);
        setTimeout(() => {
            form.resetFields();
            setLoading(false);
        }, 1000);

        update_category(user.token, Editid, Editname)
            .then(res => {
                console.log(res.data)
                page_num = localStorage.getItem('Page_Category')
                // console.log("=============================================================");
                // console.log("Page_num: ", page_num)
                // console.log("Page_limit: ", limit)
                page_paginate(user.token, page_num, limit)


            }).catch(err => {
                console.log(err.response.data)
            })

    }


    // console.log("Category_create:", values)
    // console.log("Editname: ",Editname)
    return (
        <div>
            <Header />
            <MenubarAdmin />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0"> จัดการหมวดหมู่สินค้า:</h1>
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
                                            <i className="fas fa-users mr-2 mt-1 mb-1"></i>
                                            ตารางหมวดหมู่อุปกรณ์ทั้งหมด
                                        </h3>
                                        <div className="card-tools">

                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>

                                    </div>
                                    <div className="row mt-1 ml-2">
                                        <div className="col-sm-6 ">
                                            <ul className="pagination">
                                                <span className="page-link mt-3" style={{ fontSize: '16px', marginLeft: 1 }}>count: {total}</span>
                                            </ul>
                                        </div>
                                        <div className="col-sm-6 ">
                                            <ol className="breadcrumb float-sm-right mr-3">
                                                {/* <button type="button" className="btn btn-block bg-info  mt-3  " onClick={() =>{handleAddShow()}}>
                                            + เพิ่มหมวดหมู่อุปกรณ์ 
                                            </button> */}
                                                <button type="button" className="btn btn-block bg-info  mt-3  " data-toggle="modal" data-target="#modal-create">
                                                    {/* <i className='fa-list-alt'></i>
                                                    <i className="fa-solid fa-list"></i> */}
                                                    {/* <i className="fa-thin fa-list" /> */}

                                                    + เพิ่มหมวดหมู่อุปกรณ์
                                                </button>

                                            </ol>
                                        </div>
                                    </div>


                                    <div className="card-body " style={{ margin: 'auto', marginTop: -30, width: '60%' }}>


                                        <Spin spinning={loading}>

                                            <table className="table table-light table-striped " >
                                                <thead style={{ fontSize: '14px' }}>
                                                    <tr>
                                                        <th scope="col" style={{ textAlign: "center" }}>Name</th>
                                                        <th scope="col" style={{ textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((item, index) => (
                                                        <tr key={index}>
                                                            <td style={{ textAlign: "center" }}>{item.name}</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                {/* <EditOutlined style={{ fontSize: '20px', color: "blue", }}/> */}
                                                                <a>
                                                                
                                                                    {/* <i className="fas fa-edit " style={{ fontSize: '20px', color: "blue", }} onClick={() => { handleEditShow(setDataEdit(item), setEditId(item._id)) }} ></i> */}
                                                                    <i   onClick={() => { handleEditShow(setDataEdit(item), setEditId(item._id)) }} ><EditOutlined style={{ fontSize: '20px', color: "blue", }}/></i>

                                                                </a>
                                                                <span> | </span>
                                                                <Popconfirm title="Are you sure to Remove"
                                                                    onConfirm={() => {
                                                                        handleRemove_category(item._id)
                                                                    }}
                                                                >
                                                                    {/* <DeleteOutlined style={{ fontSize: '20px', color: "red", }} /> */}
                                                                    <a>
                                                                        {/* <i className="fas fa-trash-alt" style={{ fontSize: '20px', color: "red", }}></i> */}
                                                                        <i> <DeleteOutlined style={{ fontSize: '20px', color: "red", }} /></i>
                                                                    </a>
                                                                </Popconfirm>
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




                            </section>
                        </div>

                    </div>
                </section>


            </div>
            {/* ==================== React-bootstrap Model edit ================ */}
            <div className="model-box-edit">
                <Modal
                    show={ViewEdit}
                    onHide={handleEditClose}
                    backdrop='static'
                    keyboard={false}
                >
                    <Modal.Header closeButton className="card-header bg-info">
                        <Modal.Title>Edit Category:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Spin spinning={loading}>

                            <div>
                                <div className="form-group mt-3">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className='form-control'
                                        onChange={e => handleEditChange(e)}
                                        placeholder="Please enter Name"
                                        defaultValue={DataEdit.name} />
                                </div>
                                <Button type='submit' className='btn btn-success mt-4' onClick={handleEdit}>Edit</Button>

                            </div>
                        </Spin>



                    </Modal.Body>
                    <Modal.Footer>
                        {/* <span className="page-link mt-3" style={{ fontSize: '16px', marginLeft: 1 }}>count: {id}</span> */}
                        <Button variant='secondary' onClick={handleEditClose}>Close</Button>

                    </Modal.Footer>

                </Modal>
            </div>


            {/* =================== Bootstrap create===============  */}
            <div className="modal fade" id="modal-create">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header  bg-info">

                            <h4 className="modal-title">เพิ่ม Category=</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>

                        </div>
                        <div className="modal-body">

                            <Spin spinning={loading}>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <Card style={{ width: 700, marginTop: 1 }}>
                                            <Form
                                                name="normal_category"
                                                className="category-form"
                                                initialValues={{
                                                    remember: true,
                                                }}
                                                onFinish={CategoryForm_Create}
                                                form={form}
                                            >
                                                <Form.Item
                                                    name={"name"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your Category!',
                                                        },
                                                    ]}
                                                >
                                                    <Input style={{ marginTop: 50 }}
                                                        name="name"
                                                        prefix={<MenuUnfoldOutlined className="site-form-item-icon" />}
                                                        placeholder="New CateGory"
                                                        size={'large'}
                                                        onChange={e => handleChange(e)}
                                                    />
                                                </Form.Item>



                                                <Space style={{ marginTop: 5 }}>
                                                    <Form.Item>
                                                        <Row>
                                                            <Col span={6}>

                                                            </Col>
                                                            <Space direction='horizontal' style={{ paddingLeft: 490, marginTop: -10 }}>
                                                                <Button danger onClick={clearForm} block size={'large'}>
                                                                    Clear
                                                                </Button>
                                                                <Button type="primary" ghost htmlType="submit" block size={'large'}>
                                                                    OK
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

                        </div>

                    </div>

                </div>

            </div>


       






            <Footer />
        </div>
    )
}

export default CreateCategory
