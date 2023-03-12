import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import {  useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined, WindowsOutlined } from '@ant-design/icons';
import { Button,Col, Form, Input, Row, Spin, Card, Space, message } from 'antd';

//=========== Function EP ========
import {register} from "../../functions/EP_auth"
const Register = () => {

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({
        username:"",
        password:"",
        password_:""    });

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    //============== Function===========//

    const Redirect = async(data) =>{
        await delay(500);
        message.success(data)
        await delay(1000);
        navigate('/login')
    }
    const onFinish = (values) => {
        setLoading(true);
        setTimeout(() => {
            form.resetFields();
            setLoading(false);
        }, 2000);
       
        console.log("P1: ",values.password)
        console.log("P2: ",values.password_)

        if(values.password !== values.password_){
            setTimeout(() => {
                message.error('Password not match !!!')
            }, 3000)
        }else{
            //============ todo ===========
            register(value)
            .then(res=>{
                console.log(res.data);
                // alert(res.data)
              
                Redirect(res.data);
            })
            .catch(err=>{
                console.log(err.response.data)
                // alert(err.response.data)
                setTimeout(() => {
                    message.error(err.response.data)
                }, 3000)
            })
        }
    };
    const clearForm = () => {
        // console.log("======Clear Form======")
        form.setFieldsValue({
            username: "",
            password: "",
            password_: "",
        });
    }
    const handleChange = (e) =>{
        // console.log(e.target.name) 
        // console.log(e.target.value)
        setValue({...value,[e.target.name]: e.target.value})

    }

    const singinForm = async () => {
        //  console.log("=========Sinup=======")
        setLoading(true);
        setTimeout(() => {
            form.resetFields();
            setLoading(false);
        }, 2000);
        await delay(1000);
        navigate('/login')
    }
    // console.log(value)
    return (
        <div style={{ marginTop: '150px' }}>
            <Row justify="center">
                <Spin spinning={loading}>
                    <Card
                        title={["User Register"]}
                         extra={<WindowsOutlined style={{ fontSize: '26px', color: "black", marginLeft: '-405px' }} />}
                        bordered={true}
                        // actions={[<WindowsOutlined />]}
                        type="info"
                        style={{ width: 450, marginTop: '5px' }}
                        headStyle={{ backgroundColor: '#0dcaf0', color: 'black', paddingLeft: "180px", fontSize: '18px' }}
                        // headStyle={{ backgroundColor: '#ffd375', color: 'black' }}                    
                        bodyStyle={{ height: 280, backgroundColor: '#fafafa' }}
                    >
                        <Form
                            name="normal_register"
                            className="register-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
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
                                         {/* <Link to="/login"> */}
                                             <Button ghost onClick={singinForm} block size={'large'} style={{ borderColor: "green", color: "black" }}>
                                                 Login
                                             </Button>
                                         {/* </Link> */}
                                     </Col>
                                        <Space direction='horizontal' style={{ paddingLeft: 240, marginTop: -40 }}>
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
                </Spin>

            </Row>

        </div>
    )
}

export default Register
