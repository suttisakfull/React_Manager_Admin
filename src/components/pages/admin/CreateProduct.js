import React, { useState, useEffect } from 'react'
import Header from '../../layouts/adminlte/Header'
import MenubarAdmin from '../../layouts/adminlte/MenubarAdmin';
import Footer from '../../layouts/adminlte/Footer'

//Redux
import { useSelector } from 'react-redux';
//notify
import { toast } from 'react-toastify';




//Ant Design
import { MenuUnfoldOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Spin, Button, Space, Row, Col } from 'antd';
import { Form, Input, Card, Popconfirm } from 'antd';

//function
import {create_product} from "../../functions/EP_product";

const init_state ={
    title: "",
    description: "",
    category: "",
    price: "",
    quatity: "",
    images: []
};


const CreateProduct = () => {

    const { user } = useSelector((state) => ({ ...state }))
    const [values, setvalues] = useState(init_state)
    const [loading, setLoading] = useState(false);
    

    const [form] = Form.useForm();
    const ProductForm_Create = (values) =>{
        // console.log("Data_Product: ",values)
        create_product(user.token,values)
        .then(res =>{
           console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })

    }
    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    const clearForm = () => {
        form.setFieldsValue({
            title: "",
            description: "",
            price: "",
            quatity: "",
        });
    }

    console.log(values)
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
                                            ตารางหมวดหมู่สินค้า
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
                                                <span className="page-link mt-3" style={{ fontSize: '16px', marginLeft: 1 }}>count: ...</span>
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

                                                    + เพิ่มหมวดหมู่สินค้า
                                                </button>

                                            </ol>
                                        </div>
                                    </div>



                                </div>
                            </section>
                        </div>
                    </div>
                </section>        


               
               
            </div>
             {/* =================== Bootstrap create===============  */}
             <div className="modal fade" id="modal-create">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header  bg-info">

                            <h4 className="modal-title">เพิ่ม Product:</h4>
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
                                                name="normal_product"
                                                className="product-form"
                                                initialValues={{
                                                    remember: true,
                                                }}
                                                onFinish={ProductForm_Create }
                                                form={form}
                                            >

                                                <Form.Item
                                                    name={"title"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your title !',
                                                        },
                                                    ]}
                                                    style={{marginTop: -10 }}
                                                >
                                                    <Input style={{ marginTop: 50 }}
                                                        name="title"
                                                        prefix={<MenuUnfoldOutlined className="site-form-item-icon" />}
                                                        placeholder="New product"
                                                        size={'large'}
                                                        onChange={e => handleChange(e)}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    name={"description"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your description!',
                                                        },
                                                    ]}
                                                    style={{marginTop: -50 }}
                                                >
                                                    <Input style={{ marginTop: 50 }}
                                                        name="description"
                                                        prefix={<MenuUnfoldOutlined className="site-form-item-icon" />}
                                                        placeholder="New description"
                                                        size={'large'}
                                                        onChange={e => handleChange(e)}
                                                    />
                                                </Form.Item>

                                                {/* <Form.Item
                                                    name={"category"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your description!',
                                                        },
                                                    ]}
                                                    style={{marginTop: -50 }}
                                                >
                                                    <Input style={{ marginTop: 50 }}
                                                        name="category"
                                                        prefix={<MenuUnfoldOutlined className="site-form-item-icon" />}
                                                        placeholder="New category"
                                                        size={'large'}
                                                        onChange={e => handleChange(e)}
                                                    />
                                                </Form.Item> */}

                                                <Form.Item
                                                    name={"price"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your description!',
                                                        },
                                                    ]}
                                                    style={{marginTop: -50 }}
                                                >
                                                    <Input style={{ marginTop: 50 }}
                                                        name="price"
                                                        type="number"
                                                        prefix={<MenuUnfoldOutlined className="site-form-item-icon" />}
                                                        placeholder="New price"
                                                        size={'large'}
                                                        onChange={e => handleChange(e)}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    name={"quatity"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your description!',
                                                        },
                                                    ]}
                                                    style={{marginTop: -50 }}
                                                >
                                                    <Input style={{ marginTop: 50 }}
                                                        type="number"
                                                        name="quatity"
                                                        prefix={<MenuUnfoldOutlined className="site-form-item-icon" />}
                                                        placeholder="New quatity"
                                                        size={'large'}
                                                        onChange={e => handleChange(e)}
                                                    />
                                                </Form.Item>
                                              




                                                <Space style={{ marginTop: 5 }}>
                                                    <Form.Item>
                                                        <Row>
                                                            <Col span={6}>

                                                            </Col>
                                                            <Space direction='horizontal' style={{ marginTop: -10 }}>
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

export default CreateProduct
