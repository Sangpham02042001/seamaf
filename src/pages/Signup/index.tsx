import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import {Row, Col, Input, message, Modal, Button} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { MailOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons'
import { axiosInstance } from '../../utils'
import { getUserInfo } from '../../store/reducers/user'


export default function SignupPage() {
    const userReducer = useSelector((state: RootState) => {
        return state.user
    })
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (!userReducer.loaded) {
            dispatch(getUserInfo())
        } else {
            if (userReducer.user.name) {
                history.push('/')
            }
        }
    }, [userReducer.loaded])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(name, email, password, confirmPassword)
        if (password.length < 6) {
            message.warning('Password must has at least 6 characters!')
        }
        if (password !== confirmPassword) {
            message.warning('Confirm password not match')
            return
        }
        try {
            let response = await axiosInstance.post('/signup', {
                name, email, password
            })
            if (response.status == 201) {
                message.info('Sign up successfully')
                setModalVisible(true)
                setEmail('')
                setName('')
                setPassword('')
                setConfirmPassword('')
            }
        } catch (error: any) {
            console.log(error.response.data)
            let key = Object.keys(error.response.data)[0]
            let _error = error.response.data[key]
            message.error(_error)
        }   
    }

    const cancelLogin = () => {
        setModalVisible(false)
    }

    const confirmLogin = () => {
        history.push('/login')
    }

    return (
            <>
                <Row>
                    <Col span={18} offset={3} className='login-page'>
                        <div className='login-image'>
                        </div>
                        <div className='login-form-container'>
                            <h2>Create new account</h2>
                            <form style={{width: '100%'}} onSubmit={handleSubmit}>
                                <Input size='large' prefix={<UserOutlined style={{color: 'var(--red-color)'}} />} 
                                    placeholder='Your name' required
                                    onChange={e => {
                                        e.preventDefault()
                                        setName(e.target.value)
                                    }} /> <br /> <br />
                                <Input size='large' prefix={<MailOutlined style={{color: 'var(--red-color)'}} />} 
                                    placeholder='Email Address' type='email' required
                                    onChange={e => {
                                        e.preventDefault()
                                        setEmail(e.target.value)
                                    }} /> <br /> <br />
                                <Input size='large' prefix={<KeyOutlined style={{color: 'var(--red-color)'}} />} 
                                    placeholder='Password' type='password' required
                                    onChange={e => {
                                        e.preventDefault()
                                        setPassword(e.target.value)
                                    }} /> <br /> <br />
                                <Input size='large' prefix={<KeyOutlined style={{color: 'var(--red-color)'}} />} 
                                    placeholder='Confirm Password' type='password' required
                                    onChange={e => {
                                        e.preventDefault()
                                        setConfirmPassword(e.target.value)
                                    }} /> <br /> <br />
                                <button className='login-button' type='submit'>Signup</button>
                            </form> <br /> 
                            <h3>Have account ?
                                <Link to="/login" style={{
                                    color: 'blue'
                                }}>Sign in here</Link>
                            </h3>
                        </div>
                    </Col>
                </Row>
                <Modal title="Sign up successfully. Login now ?"
                    visible={modalVisible}
                    onOk={confirmLogin}
                    onCancel={cancelLogin}
                    footer={[
                        <Button key="back" onClick={cancelLogin}>
                            No
                        </Button>,
                        <Button type="primary" onClick={confirmLogin}>
                            Yes
                      </Button>,
                    ]}
                >
                    
                </Modal>
            </>
    )
}
