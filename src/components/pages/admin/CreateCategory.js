import React, { useState, useEffect } from 'react'
import Header from '../../layouts/adminlte/Header'
import MenubarAdmin from '../../layouts/adminlte/MenubarAdmin';
import Footer from '../../layouts/adminlte/Footer'


import { MenuUnfoldOutlined } from '@ant-design/icons';   
import { Spin, Button, Space, Row, Col } from 'antd';
import { Form, Input, Card } from 'antd';
const CreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [values, setvalues] = useState({
        name: "",

    })

    //===============Modal===============
    const [form] = Form.useForm();


    // ===============Model bootstrap====================
    const handleChange = (e) => {
        // console.log(e.target.name) 
        // console.log(e.target.value)
        setvalues({ ...values, [e.target.name]: e.target.value })

    }

    //==========================================

    const CategoryForm = (values) => {

    }
    const clearForm = () => {
        // console.log("======Clear Form======")
        form.setFieldsValue({
            name: "",

        });
    }

    console.log(":::", values)
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
                                            ตารางหมวดหมู่สินค้าทั้งหมด
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
                                                <button type="button" className="btn btn-block bg-info  mt-3  " data-toggle="modal" data-target="#modal-lg">
                                                    {/* <i className='fa-list-alt'></i> */}
                                                    {/* <i className="fa-solid fa-list"></i> */}
                                                    {/* <i className="fa-thin fa-list" /> */}
                                                    + เพิ่มหมวดหมู่สินค้า
                                                </button>
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="card-body " style={{ marginTop: -25 }}>

                                     
                                        <Spin spinning={loading}>
                                            <table className="table table-light table-striped " >
                                                <thead style={{ fontSize: '14px' }}>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </Spin>
                                    </div>
                                </div>

                              
                            </section>
                        </div>

                    </div>
                </section>


            </div>
              {/* =================== Bootstrap ===============  */}

              <div className="modal fade" id="modal-lg">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header  bg-info">

                                                <h4 className="modal-title">เพิ่มรายการ Category:</h4>
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
                                                                    onFinish={CategoryForm}
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
                                                                        <Input style={{marginTop: 50}}
                                                                            name="name"
                                                                            prefix={<MenuUnfoldOutlined  className="site-form-item-icon" />}
                                                                            placeholder="Name CateGory"
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

                                {/* ============================================== */}



            <Footer />
        </div>
    )
}

export default CreateCategory
