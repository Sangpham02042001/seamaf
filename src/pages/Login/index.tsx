import React, {useState} from 'react'
import {Row, Col, Input, Button} from 'antd'
import { MailOutlined, KeyOutlined } from '@ant-design/icons'
import Layout from '../../components/Layout'
import './login.css'
import { Link } from 'react-router-dom'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <Layout>
            <Row>
                <Col span={18} offset={3} className='login-page'>
                    <div className='login-image'>
                    </div>
                    <div className='login-form-container'>
                        <h2>Login to your account</h2>
                        <form style={{width: '100%'}} onSubmit={handleSubmit}>
                            <Input size='large' prefix={<MailOutlined style={{color: 'var(--red-color)'}} />} 
                                placeholder='Email Address' required type='email'
                                onChange={e => {
                                    e.preventDefault()
                                    setEmail(e.target.value)
                                }} /> <br /> <br />
                            <Input size='large' prefix={<KeyOutlined style={{color: 'var(--red-color)'}} />} 
                                placeholder='Password' required type='password'
                                onChange={e => {
                                    e.preventDefault()
                                    setPassword(e.target.value)
                                }} /> <br /> <br />
                            <button className='login-button'>Login</button>
                        </form> <br /> 
                        <h3>Don't have account ?
                            <Link to="/signup" style={{
                                color: 'blue'
                            }}>Register here</Link>
                        </h3>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}
