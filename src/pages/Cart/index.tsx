import React from 'react'
import {Row, Col} from 'antd'
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store';
import Layout from '../../components/Layout'
import './cart.css'
import { Link } from 'react-router-dom';
import { deleteCartItem, changeCartQuantity } from '../../store/reducers/cart'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})


export default function CartPage() {
    const cartReducer = useSelector((state: RootState) => {
        return state.cart
      });
    const dispatch = useDispatch()

    const increaseQuantity = (key: any, quantity: number) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault()
        dispatch(changeCartQuantity({key, quantity: Number(quantity + 1)}))
    }

    const decreaseQuantity = (key: any, quantity: number) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault()
        if (quantity === 1) {
            return;
        }
        dispatch(changeCartQuantity({key, quantity: Number(quantity - 1)}))
    }

    const handleQuantityChange = (key: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            dispatch(changeCartQuantity({key, quantity: Number(event.target.value)}))
        }
    }

    const handleDelete = (key: any) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        dispatch(deleteCartItem({key}))
    }

    const totalPrice = Object.keys(cartReducer.cart).reduce((current: number, key: any) => {
        let cart = cartReducer.cart[key]
        return current + Number(cart.price) * Number(cart.quantity)
    }, 0)

    return (
        <Layout>
            <Row>
                <Col span={16} offset={4} style={{display: 'flex', flexDirection: 'column'}}>
                    <div className='cart-container'>
                        {Object.keys(cartReducer.cart).length == 0 
                            && <h2 style={{textAlign: 'center'}}>No item in car</h2>
                        }
                        {Object.keys(cartReducer.cart).map(key => {
                            let cart = cartReducer.cart[key]
                            return <div className='cart-item' key={key}>
                                <div>
                                    <div style={{
                                        backgroundImage: `url(${cart.images[0].path})`
                                    }}></div>
                                    <Link to={`/product/${cart.id}`} style={{textDecoration: 'underline'}}>
                                        {cart.name}
                                    </Link>
                                </div>
                                <div>
                                    {formatter.format(cart.price)}
                                </div>
                                <div className='action-list'>
                                    <span>
                                        <span>
                                            <MinusOutlined onClick={decreaseQuantity(key, cart.quantity)} />
                                        </span>
                                        <input type="number" value={cart.quantity} onChange={handleQuantityChange(key)}></input>
                                        <span >
                                            <PlusOutlined onClick={increaseQuantity(key, cart.quantity)}/>
                                        </span>
                                    </span>
                                    <span>
                                        <DeleteOutlined style={{color: 'red'}} onClick={handleDelete(key)}/>
                                    </span>
                                </div>
                        </div>
                })}
                    </div>
                    {Object.keys(cartReducer.cart).length != 0 && <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid black', paddingTop: '20px'}}>
                        <h2>Total: </h2>
                        <h2>{formatter.format(totalPrice)}</h2>
                    </div>}
                </Col>
            </Row>
        </Layout>
    )
}
