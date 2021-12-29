import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Row, Col, Input, Select, Menu, Dropdown } from "antd";
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import "./navbar.css";
import { RootState } from '../../store';
import { getCategories } from '../../store/reducers/categories'

const {Option } = Select

export default function Navbar() {
  const categoryReducer = useSelector((state: RootState) => {
    return state.category;
  });
  const dispatch = useDispatch()

  useEffect(() => {
    if (!categoryReducer.loaded) {
      dispatch(getCategories())
    }
  }, [categoryReducer.loaded])

  const menu = (
    <Menu>
      {categoryReducer.categories.map(({id, name}) => (
        <Menu.Item key={id}>
          <Link to={`/category/${id}`}>
            <p style={{fontSize: '16px'}}>{name}</p>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Row>
        <Col span={16} offset={4} className="navbar-above">
          <Link to='/' className="page-logo">RVM SeaMaf</Link>
          <Input size="large" placeholder="Search on RVM SeaMaf" 
            className="navbar-search" prefix={<SearchOutlined />} />
          <Select defaultValue="USD" style={{ width: 120 }}>
            <Option value="USD">U.S. Dollar</Option>
            <Option value="RTGS">RTGS Dollar</Option>
            <Option value="SA">
              SA Rand
            </Option>
          </Select>
          <span>
            <HeartOutlined />
            Wishlist
          </span>
          <Link to='/cart'>
            <ShoppingCartOutlined />
            Carts
          </Link>
        </Col>
      </Row>
      <Row className="navbar-below">
        <Col span={16} offset={4}>
          <Link to="/" style={{paddingLeft: '0px'}}>Home</Link>
          <Dropdown overlay={menu}>
            <a>
              Our shop
            </a>
          </Dropdown>
          <Link to="/">On sale</Link>
          <Link to="/">Our services</Link>
          <Link to="/">Blog</Link>
          <Link to="/">Content</Link>
          <Link to="/">Sign in</Link>
          <Link to="/">Sign up</Link>
        </Col>
      </Row>
    </>
  );
}
