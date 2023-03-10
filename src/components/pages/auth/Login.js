import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined, WindowsOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Spin, Card, Space, Col, message } from 'antd';

//=========== Function EP ========
import { login } from "../../functions/EP_auth"
const Login = () => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({
        username: "",
        password: "",
    });

    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //============== Function===========//

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const roleBaseRedirect = async (roles) => {
        if (roles === 'ADMIN') {
            // setShowAlert(true)
            await delay(500);
            message.success('Login Success:')
            await delay(2000);
            navigate('/admin')
        } else {
            await delay(500);
            message.success('Login Success:')
            await delay(2000);
            navigate('/user')
        }
    }

    const onFinish = (values) => {
        setLoading(true);
        setTimeout(() => {
            form.resetFields();
            setLoading(false);
        }, 2000);

        console.log("username: ", values.username)
        console.log("password: ", values.password)

        login(values)
            .then((res) => {
                console.log(res.data)
                console.log("=================")
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        token: res.data.token,
                        username: res.data.payload.user.username,
                        roles: res.data.payload.user.roles
                    }
                })
                localStorage.setItem('token', res.data.token)
                roleBaseRedirect(res.data.payload.user.roles)

            })
            .catch((err) => {
                // console.log("-------", err.response.data, "--------")
                // console.log(err.response.status)
                setTimeout(() => {
                    message.error(err.response.data)
                }, 2000)

            });
    };
    const clearForm = () => {
        // console.log("======Clear Form======")
        form.setFieldsValue({
            username: "",
            password: ""
        });
    }
    const singupForm = async () => {
        //  console.log("=========Sinup=======")
        setLoading(true);
        setTimeout(() => {
            form.resetFields();
            setLoading(false);
        }, 2000);
        await delay(1000);
        navigate('/register')
    }
    const handleChange = (e) => {
        // console.log(e.target.name) 
        // console.log(e.target.value)
        setValue({ ...value, [e.target.name]: e.target.value })

    }
    // console.log(value)
    return (
        <div style={{ marginTop: '150px' }}>
            <Row justify="center">
                <Spin spinning={loading}>
                    {/* <DollarOutlined /> */}
                    <Card
                        title={["User Login"]}
                        extra={<WindowsOutlined style={{ fontSize: '26px', color: "black", marginLeft: '-405px' }} />}
                        bordered={true}
                        // actions={[<WindowsOutlined />]}
                        type="info"
                        style={{ width: 450, marginTop: '5px' }}
                        headStyle={{ backgroundColor: '#11DFFF', color: 'black', paddingLeft: "180px", fontSize: '18px' }}
                        // headStyle={{ backgroundColor: '#ffd375', color: 'black' }}                    
                        bodyStyle={{ height: 220, backgroundColor: '#fafafa' }}
                    >
                        <Form
                            name="normal_login"
                            className="login-form"
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
                            <Space style={{ marginTop: 15 }}>
                                <Form.Item>
                                    <Row>
                                        {/* <Col flex="10px"> </Col> */}
                                        <Col span={6}>

                                            {/* <Link to="/register"> */}
                                            <Button ghost onClick={singupForm} block size={'large'} style={{ borderColor: "green", color: "black" }}>
                                                Sign up
                                            </Button>

                                            {/* </Link> */}
                                        </Col>

                                        <Space direction='horizontal' style={{ paddingLeft: 240, marginTop: -40 }}>
                                            <Button danger onClick={clearForm} block size={'large'}>
                                                Clear
                                            </Button>

                                            <Button type="primary" ghost htmlType="submit" block size={'large'}>
                                                Sign in
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

export default Login
