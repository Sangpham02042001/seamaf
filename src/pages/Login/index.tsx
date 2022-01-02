import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {Row, Col, Input, message} from 'antd'
import { MailOutlined, KeyOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import { getUserInfo } from '../../store/reducers/user'
import { axiosInstance } from '../../utils'
import './login.css'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let response = await axiosInstance.post('/login', {
            username: email,
            password
        })
        if (response.status == 401) {
            message.warning('Email and Password not match')
        } else {
            localStorage.setItem('access_token', response.data.access_token)
            message.success('Sign in success')
            history.push('/')
            dispatch(getUserInfo())
        }
    }

    return (
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
    )
}
