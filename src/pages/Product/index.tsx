import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Collapse } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { RootState } from '../../store'
import Layout from '../../components/Layout'
import ProductItem from '../../components/ProductItem'
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

	useEffect(() => {
		setCurrentImage(0)
		setQuantity(1)
	}, [productId])

	const productReducer = useSelector((state: RootState) => {
			return state.product;
	})
	const categoryReducer = useSelector((state: RootState) => {
		return state.category;
	})
	const currentProduct: any = (productReducer.products.find(({id}) => id == productId) || {})
	const currentCategory: any = !currentProduct.id ? 'Sample' : categoryReducer.categories.find(({id}) => id == currentProduct.category_id)

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

	return (
		<Layout>
				<>
					<Row className='category-header'>
							<Col span={16} offset={4}>
									<h4>{currentCategory.name || 'Sample'}</h4>
									<Link to={`${currentCategory.id ?  '#' : '/category/' + currentCategory.id}`}>
													Home / Shop /
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
										backgroundImage: `url(${currentProduct.images[currentImage].path})`
									}} className='product-main-image'>
									</div>
									<div className='product-image-list'>
										{currentProduct.images.map((image: any, index: number) => {
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
									<h4>{currentProduct.name}</h4>
									<span style={{fontSize:'20px', fontWeight: '600'}}>{formatter.format(currentProduct.price)}</span>
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
									<Button type="primary" danger>Add to cart</Button>
									<br />
									<Collapse defaultActiveKey={['1']} style={{marginTop: '20px'}} bordered={false}>
										<Panel header="Description" key="1">
											<p>{currentProduct.description}</p>
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
							<div className='related-products'>
								{productReducer.products.filter(({id}) => id != currentProduct.id)
									.map((product: any, index: number) => <ProductItem key={product.id} product={product} />)}
							</div>
						</Col>
					</Row>
				</>
		</Layout>
	)
}
