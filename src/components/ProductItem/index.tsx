import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { changeCartQuantity, getCart } from '../../store/reducers/cart'
import { RootState } from '../../store'
import './product-item.css'

interface ProductItemProps {
    product: ProductType
}

type ImageType = {
    id: number,
    path: string
}

type ProductType = {
    id: number,
    name: string,
    images: ImageType[],
    price: number
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})


const ProductItem: FC<ProductItemProps> = ({product}): JSX.Element => {
    const dispatch = useDispatch()
    const cartReducer = useSelector((state: RootState) => {
        return state.cart
      })
    let myCart = {...cartReducer.cart}
    const handleAddToCart = (product: ProductType) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        let id = '' + product.id
        event.preventDefault()
        if (!(myCart as any)[id]) {
            myCart = {
                    ...myCart,
                [id]: {
                    ...product,
                    quantity: 1
                }
            }
            localStorage.setItem('cart', JSON.stringify(myCart))
            dispatch(getCart())
        } else {
            let quantity = (myCart as any)[id].quantity
            dispatch(changeCartQuantity({key: id, quantity: quantity + 1}))
        }
    }

    return <Link to={`/product/${product.id}`}>
        {product.images.length && <div className='product-image' style={{
            backgroundImage: `url(${(product.images[0] || {}).path})`
        }}>
            <span>New</span>
            <Tooltip title="Add to cart">
                <span onClick={handleAddToCart(product)}>
                    <ShoppingCartOutlined />
                </span>
            </Tooltip>
        </div>}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span>{product.name}</span>
            <span style={{fontSize:'20px', fontWeight: '600'}}>{formatter.format(product.price)}</span>
        </div>
    </Link>
}

export default ProductItem
