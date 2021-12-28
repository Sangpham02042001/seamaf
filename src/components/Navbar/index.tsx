import { Row, Col, Input, Select } from "antd";
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import "./navbar.css";

const {Option } = Select

export default function Navbar() {
  return (
    <>
      <Row>
        <Col span={16} offset={4} className="navbar-above">
          <Link to='/' className="page-logo">RVM SeaMaf</Link>
          <Input size="large" placeholder="Search o RVM SeaMaf" 
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
          <Link to="/">Our shop</Link>
          <Link to="/">On sale</Link>
          <Link to="/">Our services</Link>
          <Link to="/">Blog</Link>
          <Link to="/">Content</Link>
          <Link to="/">Sign in</Link>
        </Col>
      </Row>
    </>
  );
}
