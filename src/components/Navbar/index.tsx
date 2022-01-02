import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { Row, Col, Input, Select, Menu, 
  Dropdown, Spin, Tooltip, Badge } from "antd";
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined, 
  LoadingOutlined, CloseOutlined, UserOutlined, 
  LogoutOutlined, ToolOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import _ from 'lodash';
import { axiosInstance } from '../../utils';
import "./navbar.css";
import { RootState } from '../../store';
import { getCategories } from '../../store/reducers/categories'
import { getUserInfo, logout } from '../../store/reducers/user';
import { getCart } from '../../store/reducers/cart';

const {Option } = Select
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />

export default function Navbar() {
  const [text,setText] = useState<string>('')
  const [searchProducts, setSearchProducts] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  const categoryReducer = useSelector((state: RootState) => {
    return state.category;
  });
  const cartReducer = useSelector((state: RootState) => {
    return state.cart
  });
  const userReducer = useSelector((state: RootState) => {
    return state.user
  });
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCart())
    if (!userReducer.loaded) {
      dispatch(getUserInfo())
    }
  }, [])

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

  const handleLogout = () => {
    dispatch(logout())
    // window.location.reload()
  }

  const userMenu = (
    <Menu style={{minWidth: '100px'}}>
      {userReducer.user.role === 'admin' && <Menu.Item key="admin">
        <Link to="/admin">
         <ToolOutlined /> Manage
        </Link>
      </Menu.Item>}
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    event.target.value && searchDebounce(event.target.value)
    setSearchLoading(true)
    if (!event.target.value) {
      setSearchProducts([])
    }
  }

  const searchDebounce = useCallback(_.debounce(async (searchUserName) => {
    if (searchUserName !== '') {
      setSearchLoading(true)
      try {
        let response = await axiosInstance.get(`/products/search?text=${searchUserName}`)
        setSearchLoading(false)
        setSearchProducts(response.data)
      } catch (error) {
        console.log(error)
        setSearchLoading(false)
      }
    }
  }, 500), [])

  const clear = () => {
    setText('')
    setSearchLoading(false)
    setSearchProducts([])
  }

  return (
    <>
      <Row style={{position: 'relative'}}>
        <Col span={16} offset={4} className="navbar-above">
          <Link to='/' className="page-logo">RVM SeaMaf</Link>
          <div className='navbar-search-container'>
            <Input size="large" placeholder="Search on RVM SeaMaf" 
              className="navbar-search" prefix={<SearchOutlined />} 
              value={text} onChange={handleChange}>
            </Input>
            {text && <Tooltip title='Clear'>
              <span onClick={clear}>
                <CloseOutlined />
              </span>
            </Tooltip>}
          </div>
          {text && <div className='search-product-container'>
            {searchLoading ? <Spin indicator={antIcon} /> 
              : searchProducts.length == 0 ? <h3>Not match product</h3> 
              : searchProducts.map((product: any) => (
                <div key={product.id} >
                  <Link to={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </div>
              ))}
          </div>}
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
            <Badge count={Object.keys(cartReducer.cart).length}>
              <ShoppingCartOutlined />
              Carts
            </Badge>
          </Link>
          {userReducer.user.name && <Dropdown overlay={userMenu}>
            <span>
              <UserOutlined />
              {userReducer.user.name}
            </span>
          </Dropdown>}
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
          {!userReducer.user.name && <>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>}
        </Col>
      </Row>
    </>
  );
}
