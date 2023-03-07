import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Spin, Row } from 'antd';



const Logout = () => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(3);
  
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() =>{
            setCount((currentCount) => --currentCount);
         },1000)
         setLoading(true);

        count === 0 && navigate('/');
        return () => clearInterval(interval)  
 
    },[count,navigate]);


  
    return (
        <div style={{ marginTop: '150px' }}>
            <Row justify="center">
                <Spin size="large" tip="Close:" spinning={loading}>
                   
                </Spin>
            </Row>
        </div>
    )
}


export default Logout
