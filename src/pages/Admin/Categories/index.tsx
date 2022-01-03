import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Tag, Space, message } from 'antd';
import { RootState } from '../../../store'
import { getCategories } from '../../../store/reducers/categories';

export default function Categories() {
    const adminCategories = useSelector((state: RootState) => {
        return state.category
    })
    const dispatch = useDispatch()

    useEffect(() => {
        if (!adminCategories.loaded) {
            dispatch(getCategories())
        }
    }, [adminCategories.loaded])

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
            <Table columns={columns} dataSource={adminCategories.categories.map((c: any) => ({
                ...c,
                key: c.id
            }))} />
        </>
    )
}
