import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Tag, Space, message } from 'antd';
import { RootState } from '../../../store'
import { getProducts } from '../../../store/reducers/admin/products'

export default function Products() {
    const adminProducts = useSelector((state: RootState) => {
        return state.adminProducts
    })
    const dispatch = useDispatch()

    useEffect(() => {
        if (!adminProducts.loaded) {
            dispatch(getProducts())
        }
    }, [adminProducts.loaded])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Product Code',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'code'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: 'Top Product',
            dataIndex: 'is_top',
            key: 'topProduct'
        },
        {
            title: 'Sale Product',
            dataIndex: 'on_sale',
            key: 'saleProduct'
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at'
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <span>Edit</span>
                    <span>Delete</span>
                </Space>
            )
        }
    ]

    return (
        <>
            <Table columns={columns} dataSource={adminProducts.products.map((p: any) => ({
                ...p,
                key: p.id,
                categoryName: p.category.name
            }))} />
        </>
    )
}
