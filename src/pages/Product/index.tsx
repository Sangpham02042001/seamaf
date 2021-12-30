import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Collapse } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { RootState } from '../../store'
import Layout from '../../components/Layout'
import ProductItem from '../../components/ProductItem'
import { getCategories } from '../../store/reducers/categories'
import {getProductsByCategoryId} from '../../store/reducers/products'
import product, { getProduct } from '../../store/reducers/product'
import { changeCartQuantity, getCart } from '../../store/reducers/cart'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import './product.css'

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
})

const { Panel } = Collapse;

export default function ProductPage() {
	const [currentImage, setCurrentImage] = useState<number>(0)
	const [quantity, setQuantity] = useState<number>(1)
 	const params: any = useParams()
	const {productId} = params
	const dispatch = useDispatch()
	const cartReducer = useSelector((state: RootState) => {
    	return state.cart
    })
	let myCart = {...cartReducer.cart}

	const productsReducer = useSelector((state: RootState) => {
		return state.products;
	})
	const categoryReducer = useSelector((state: RootState) => {
		return state.category;
	})
	const productReducer = useSelector((state: RootState) => {
		return state.product;
	})

	const currentCategory: any = !productReducer.product.id ? 'Sample' : categoryReducer.categories.find(({id}) => id == productReducer.product.category_id)


	useEffect(() => {
		if (!categoryReducer.loaded) {
			dispatch(getCategories())
		}
		if(productReducer.product.category_id) {
			dispatch(getProductsByCategoryId(Number(productReducer.product.category_id)))
		}
	}, [categoryReducer.loaded, productReducer.product.category_id])

	// useEffect(() => {
	// 	if (!productsReducer.loaded && categoryReducer.loaded && productReducer.loaded) {
	// 		console.log('fdsafdsaf')
	// 		dispatch(getProductsByCategoryId(Number(productReducer.product.category_id)))
	// 	}
	// }, [productId, categoryReducer.loaded, productReducer.loaded])

	useEffect(() => {
		setCurrentImage(0)
		setQuantity(1)
		dispatch(getProduct(Number(productId)))
	}, [productId])

	const handleChangeImage = (index: number) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		event.preventDefault()
		if (index !== currentImage) {
			setCurrentImage(index)
		}
	}

	const increaseQuantity = () => {
		console.log('fdafas')
		setQuantity(quantity + 1)
	}

	const decreaseQuantity = () => {
		if (quantity === 1) {
			return
		}
		setQuantity(quantity - 1)
	}

	const handleAddToCart = (product: any) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		event.preventDefault()
		let id = '' + product.id
		if (!myCart[product.id]) {
            myCart = {
                    ...myCart,
                [product.id]: {
                    ...product,
                    quantity: quantity
                }
            }
			localStorage.setItem('cart', JSON.stringify(myCart))
            dispatch(getCart())
        } else {
            let _quantity = (myCart as any)[id].quantity
            dispatch(changeCartQuantity({key: id, quantity: quantity + _quantity}))
        }
	}

	return (
		<Layout>
				<div>
				{productReducer.product.id && <>
					<Row className='category-header'>
							<Col span={16} offset={4}>
									<h4>{currentCategory.name || 'Sample'}</h4>
									<Link to={`${!currentCategory.id ?  '#' : '/category/' + currentCategory.id}`}>
										Home / {currentCategory.name} / {productReducer.product.name}
									</Link>
							</Col>
					</Row>
					<Row style={{margin: '15px 0'}}>
						<Col span={16} offset={4}>
							<Link to={'#'}>&lt;&lt;&lt; Back to categories</Link>
						</Col>
					</Row>
					<Row>
						<Col span={16} offset={4}>
							<Row>
								<Col span={12}>
									<div style={{
										backgroundImage: `url(${productReducer.product.images[currentImage].path})`
									}} className='product-main-image'>
									</div>
									<div className='product-image-list'>
										{productReducer.product.images.map((image: any, index: number) => {
											return <div key={index} className={index === currentImage ? 'product-selected-image' : ''} 
												style={{
													backgroundImage: `url(${image.path})`
												}}
												onClick={handleChangeImage(index)}>													
											</div>
										})}
									</div>
								</Col>
								<Col span={11} offset={1}>
									<h4>{productReducer.product.name}</h4>
									<span style={{fontSize:'20px', fontWeight: '600'}}>{formatter.format(productReducer.product.price)}</span>
									<div className='product-quantity-container'>
										<h4>QUANTITY</h4>
										<span>
											<span onClick={decreaseQuantity}>
												<MinusOutlined />
											</span>
											<span>{quantity}</span>
											<span onClick={increaseQuantity}>
												<PlusOutlined />
											</span>
										</span>
									</div>
									<Button type="primary" danger onClick={handleAddToCart(productReducer.product)}>Add to cart</Button>
									<br />
									<Collapse defaultActiveKey={['1']} style={{marginTop: '20px'}} bordered={false}>
										<Panel header="Description" key="1">
											<p>{productReducer.product.description}</p>
										</Panel>
										<Panel header="Shipping & Returns" key="2">
											<p>7 Days Returns</p>
											<p>Cash on Delivery Available</p>
										</Panel>
									</Collapse>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col span={16} offset={4}>
							<h2 style={{fontWeight: '600', textAlign: 'center'}}>RELATED PRODUCTS</h2>
							{/* <div className='related-products'>
								{productsReducer.products.filter(({id}) => id != productReducer.product.id)
									.map((product: any, index: number) => <ProductItem key={product.id} product={product} />)}
							</div> */}
							<Swiper slidesPerView={4} spaceBetween={30} slidesPerGroup={1} loop={true}
								autoplay={{
									"delay": 1000,
									"disableOnInteraction": false
								}} pagination={{
									"clickable": true
								}}>
								{productsReducer.products.map((product, key) => (<SwiperSlide key={key}>
									<ProductItem product={product} />
								</SwiperSlide>))}
							</Swiper>
							<br />
						</Col>
					</Row>
				</>}
				</div>
		</Layout>
	)
}
