import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { RootState } from '../../store'
import { getProductsByCategoryId } from '../../store/reducers/products'
import ProductItem from '../../components/ProductItem'
import './category.css'

export default function CategoryPage() {
    const params: any = useParams()
    const {categoryId} = params
    const productsReducer = useSelector((state: RootState) => {
        return state.products;
    })
	const categoryReducer = useSelector((state: RootState) => {
		return state.category;
	})
	const currentCategory: any = (categoryReducer.categories.find(({id}) => id == categoryId) || {})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsByCategoryId(Number(categoryId)))
    }, [categoryId])


    return (
				<>
					<Row className='category-header'>
						<Col span={16} offset={4}>
							<h4>{currentCategory.name || 'Sample'}</h4>
							<Link to={`/category/${categoryId}`}>
									Home / Shop /
							</Link>
						</Col>
					</Row>
					<Row style={{marginTop: '50px'}}>
						<Col span={16} offset={4}>
							<Row>
								<Col span={6}>
										<h3>CATEGORIES</h3>
										<ul className='category-list'>
											{categoryReducer.categories.map(({id, name}) => (
												<li key={id}>
													<Link to={`/category/${id}`}>
														{name}
													</Link>
												</li>
											))}
										</ul>
								</Col>
								<Col span={18}>
									<div className='product-list'>
										{productsReducer.products.map((product, index) => (
											<ProductItem  key={index} product={product}/>
										))}
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</>
    )
}
