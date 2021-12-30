import {useState, useEffect} from 'react'
import {Row, Col} from 'antd'
import { axiosInstance } from "../../utils"
import Layout from "../../components/Layout"
import ProductItem from '../../components/ProductItem'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function Home() {

    const [topProducts, setTopProducts] = useState([])
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        (async () => {
            try {
                let response = await axiosInstance.get('/products/top')
                setTopProducts(response.data)
                response = await axiosInstance.get('/products/latest')
                setLatestProducts(response.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <Layout>
            <Row style={{marginTop: '30px'}}>
                <Col span={16} offset={4}> 
                    <h2>Top Products</h2>
                    <Swiper slidesPerView={3} spaceBetween={30} slidesPerGroup={1} loop={true}
                        autoplay={{
                            "delay": 1000,
                            "disableOnInteraction": false
                        }} pagination={{
                            "clickable": true
                          }}>
                        {topProducts.map((product, key) => (<SwiperSlide key={key}>
                            <ProductItem product={product} />
                        </SwiperSlide>))}
                    </Swiper>
                    <h2 style={{marginTop: '40px'}}>Latest Products</h2>
                    <Swiper slidesPerView={3} spaceBetween={30} slidesPerGroup={1} loop={true}
                        autoplay={{
                            "delay": 1000,
                            "disableOnInteraction": false
                        }} pagination={{
                            "clickable": true
                          }}>
                        {latestProducts.map((product, key) => (<SwiperSlide key={key}>
                            <ProductItem product={product} />
                        </SwiperSlide>))}
                    </Swiper>
                </Col>
            </Row>
        </Layout>
    )
}
