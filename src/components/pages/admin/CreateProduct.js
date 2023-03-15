import React, { useState, useRef, useEffect } from "react";
import Header from "../../layouts/adminlte/Header";
import MenubarAdmin from "../../layouts/adminlte/MenubarAdmin";
import Footer from "../../layouts/adminlte/Footer";

//Redux
import { useSelector } from "react-redux";
//notify
import { toast } from "react-toastify";

//Ant Design

import { Spin, Avatar,Badge } from "antd";


//function
import { create_product } from "../../functions/EP_product";
import { list_category } from "../../functions/EP_category";

import FileUpload from "./FileUpload"

const init_state = {
    title: "",
    description: "",
    categories: [],
    category: "",
    price: "",
    quantity: "",
    images: [],
};


const CreateProduct = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setvalues] = useState(init_state);
    const [loading, setLoading] = useState(false);
    const [pictureload, setpictureload] = useState(false)
 

    const [validated, setValidated] = useState(false);
    const formRef = useRef(null);

    //============== useEffect ==========
    useEffect(() => {
        loadData(user.token);
    }, []);
    //=================Function ALL=================
    const loadData = (authtoken) => {
        list_category(authtoken)
            .then((res) => {
                console.log("Total:", res.data);
                setvalues({ ...values, categories: res.data });
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const ProductForm_Create = (e) => {
        console.log("Data_Product: ", values)

        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        create_product(user.token, values)
            .then((res) => {
                console.log(res.data);
                handleReset()
                toast.success("Create Product Success", { position: "top-center", autoClose: 2000 })
                setValidated(true);
                handleReset();


            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChange = (e) => {
        console.log(e);
        setvalues({ ...values, [e.target.name]: e.target.value });
    };
    const handleReset = () => {
        formRef.current.reset();
        setValidated(false);
    };

    console.log(values);
    return (
        <div>
            <Header />
            <MenubarAdmin />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                {
                                  pictureload    
                                  ?  <h1>Loading...<Spin /></h1> //ture
                                  :  <h1 className="m-0"> จัดการหมวดหมู่สินค้า:</h1>//false
                                }
                               
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <span>Admin_Home</span>
                                    </li>
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
                                        <h3 className="card-title  pt-2">
                                            {/* <i className="fas fa-address-card mr-2 mt-2" /> */}
                                            <i className="fas fa-users mr-2 ">  ตารางหมวดหมู่สินค้า</i>

                                        </h3>
                                        <div className="card-tools">
                                            <button
                                                type="button"
                                                className="btn btn-tool"
                                                data-card-widget="collapse"
                                            >
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* ============================================= */}
                                    <Spin spinning={loading}>
                                        <div className="card-body">



                                            <form ref={formRef} validated={validated.toString()} onSubmit={ProductForm_Create}>
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>title</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="title"
                                                                vlaue={values.title}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>description</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="description"
                                                                vlaue={values.description}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Category</label>

                                                            <select className="form-control select2" style={{ width: '100%' }}
                                                                name="category"
                                                                onChange={handleChange}

                                                            >
                                                                <option value="null">
                                                                    ------ กรุณาเลือก Category------
                                                                </option>
                                                                {values.categories.length > 0 &&
                                                                    values.categories.map((item, index) => (
                                                                        <option key={item._id} value={item._id}>{item.name}</option>
                                                                    ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Price</label>
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="price"
                                                                vlaue={values.title}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>quantity</label>
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="quantity"
                                                                vlaue={values.title}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        
                                                        <FileUpload 
                                                        pictureload={pictureload}
                                                        setpictureload={setpictureload}
                                                        values={values} 
                                                        setvalues={setvalues} 

                                                     
                                                        />

                                                    </div>
                                                </div>
                                                <button className="btn btn-primary">Submit</button>

                                            </form>

                                        </div>
                                    </Spin>

                                    {/* ============================================= */}

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
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* /============================= */}
                            {/* <Spin spinning={loading}>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <Card style={{ width: 700, marginTop: 1 }}>
                                            <Form
                                                name="normal_product"
                                                className="product-form"
                                                initialValues={{
                                                    remember: true,
                                                }}
                                                onFinish={ProductForm_Create}
                                                form={form}
                                            >
                                                <Form.Item
                                                    name={"title"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your title !",
                                                        },
                                                    ]}
                                                    style={{ marginTop: -10 }}
                                                >
                                                    <Input
                                                        style={{ marginTop: 50 }}
                                                        name="title"
                                                        prefix={
                                                            <MenuUnfoldOutlined className="site-form-item-icon" />
                                                        }
                                                        placeholder="New title"
                                                        size={"large"}
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    name={"description"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your description!",
                                                        },
                                                    ]}
                                                    style={{ marginTop: -50 }}
                                                >
                                                    <Input
                                                        style={{ marginTop: 50 }}
                                                        name="description"
                                                        prefix={
                                                            <MenuUnfoldOutlined className="site-form-item-icon" />
                                                        }
                                                        placeholder="New description"
                                                        size={"large"}
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                </Form.Item>
                                                <Form.Item name={"category"}>
                                                    <Select defaultValue="null">
                                                        <Option value="null">
                                                            ------ กรุณาเลือก Category------
                                                        </Option>
                                                        {values.categories.length > 0 &&
                                                            values.categories.map((item, index) => (
                                                                <Option key={item._id}>{item.name}</Option>
                                                            ))}
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item
                                                    name={"price"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your description!",
                                                        },
                                                    ]}
                                                    style={{ marginTop: -50 }}
                                                >
                                                    <Input
                                                        style={{ marginTop: 50 }}
                                                        name="price"
                                                        type="number"
                                                        prefix={
                                                            <MenuUnfoldOutlined className="site-form-item-icon" />
                                                        }
                                                        placeholder="New price"
                                                        size={"large"}
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    name={"quatity"}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your description!",
                                                        },
                                                    ]}
                                                    style={{ marginTop: -50 }}
                                                >
                                                    <Input
                                                        style={{ marginTop: 50 }}
                                                        type="number"
                                                        name="quatity"
                                                        prefix={
                                                            <MenuUnfoldOutlined className="site-form-item-icon" />
                                                        }
                                                        placeholder="New quatity"
                                                        size={"large"}
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                </Form.Item>

                                                <Space style={{ marginTop: 5 }}>
                                                    <Form.Item>
                                                        <Row>
                                                            <Col span={6}></Col>
                                                            <Space
                                                                direction="horizontal"
                                                                style={{ marginTop: -10 }}
                                                            >
                                                                <Button
                                                                    danger
                                                                    onClick={clearForm}
                                                                    block
                                                                    size={"large"}
                                                                >
                                                                    Clear
                                                                </Button>
                                                                <Button
                                                                    type="primary"
                                                                    ghost
                                                                    htmlType="submit"
                                                                    block
                                                                    size={"large"}
                                                                >
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
                            </Spin> */}
                            {/* ============================== */}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CreateProduct;
