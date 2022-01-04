import React, {useState, useEffect} from 'react'
import { Row, Col, Menu } from 'antd'
import {
	UserOutlined,
  DesktopOutlined,
  ContainerOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Switch, Route, Link } from 'react-router-dom'
import Users from './Users'
import Products from './Products'
import Categories from './Categories'
import Carts from './Carts'
import './admin-page.css'

export default function AdminPage() {

	return (
		<Row className='admin-page'>
			<Col offset={1} span={4}>
				<Menu mode="inline">
					<Menu.Item key={1} icon={<UserOutlined />}>
						<Link to='/admin/users'>Users</Link>
					</Menu.Item>
					<Menu.Item key={2} icon={<DesktopOutlined />}>
						<Link to='/admin/products'>Products</Link>
					</Menu.Item>
					<Menu.Item key={3} icon={<ContainerOutlined />}>
						<Link to='/admin/categories'>Categories</Link>
					</Menu.Item>
					<Menu.Item key={4} icon={<ShoppingCartOutlined />}>
						<Link to='/admin/carts'>Carts</Link> 
					</Menu.Item>
				</Menu>
			</Col>
			<Col offset={1} span={17}>
				<Switch>
					<Route path={'/admin/users'}>
						<Users />
					</Route>
					<Route path={'/admin/products'}>
						<Products />
					</Route>
				</Switch>
				<Route path={'/admin/categories'}>
					<Categories />
				</Route>
				<Route path={'/admin/carts'}>
					<Carts />
				</Route>
			</Col>
		</Row>
	)
}
