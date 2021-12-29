import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
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
    let myCart = JSON.parse(localStorage.getItem('cart') || '{}') || {}
    const handleAddToCart = (product: ProductType) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault()
        if (!myCart[product.id]) {
					myCart = {
							...myCart,
						[product.id]: {
							...product,
							quality: 1
						}
					}
        } else {
					myCart[product.id].quality++
				}
				localStorage.setItem('cart', JSON.stringify(myCart))
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
