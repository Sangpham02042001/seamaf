import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Tag, Space, message, Button, 
    Modal, Input, Checkbox } from 'antd';
import { RootState } from '../../../store'
import { createUser, getUsers, deleteUser,
    updateUser } from '../../../store/reducers/admin/users'

export default function Users() {
    const adminUsers = useSelector((state: RootState) => {
        return state.adminUsers
    })
    const dispatch = useDispatch()
    const [newUserModal, setNewUserModal] = useState(false)
    const [newUserName, setNewUserName] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('')
    const [newAdmin, setNewAdmin] = useState(false)
    const [editUserModal, setEditUserModal] = useState(false)
    const [currentUserId, setCurrentUserId] = useState<number>(0)
    const [currentUserName, setCurrentUserName] = useState<string>('')
    const [currentUserEmail, setCurrentUserEmail] = useState<string>('')
    const [currentUserAdmin, setCurrentUserAdmin] = useState<boolean>(false)

    const handleDeleteUser = (userId: any) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault()
        dispatch(deleteUser(userId))
    }

    const handleEditUser = (userId: any) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditUserModal(true)
        setCurrentUserId(userId)
        let user = adminUsers.users.find((u: any) => u.id == userId)
        setCurrentUserName(user.name)
        setCurrentUserEmail(user.email)
        setCurrentUserAdmin(user.role === 'admin')
    }

    const cancelEditUser = () => {
        setEditUserModal(false)
    }

    const confirmEditUser = () => {
        dispatch(updateUser({
            userId: currentUserId,
            name: currentUserName,
            email: currentUserEmail,
            role: currentUserAdmin ? 'admin' : 'user'
        }))
        setEditUserModal(false)
    }

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
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role'
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
                    <span onClick={handleEditUser(record.id)} className='admin-edit-btn'>Edit</span>
                    <span onClick={handleDeleteUser(record.id)} className='admin-delete-btn'>Delete</span>
                </Space>
            )
        }
    ]

    useEffect(() => {
        if (!adminUsers.loaded) {
            dispatch(getUsers())
        }
    }, [adminUsers.loaded])

    useEffect(() => {
        if (adminUsers.users.length && newUserModal) {
            setNewUserModal(false)
            setNewUserName('')
            setNewUserEmail('')
            setNewUserPassword('')
            setNewUserConfirmPassword('')
            setNewAdmin(false)
        }
    }, [adminUsers.users.length])

    useEffect(() => {
        if (adminUsers.error) {
            message.warning(adminUsers.error)
        }
    }, [adminUsers.error])

    const confirmCreate = () => {
        // setNewUserModal(false)
        if (!newUserName || !newUserEmail) {
            message.warning('Name and Email must be filled')
            return
        }
        if (newUserPassword.length < 6) {
            message.warning('Password must has at least 6 characters!')
            return
        }
        if (newUserPassword !== newUserConfirmPassword) {
            message.warning('Password not match')
            return
        }
        dispatch(createUser({
            name: newUserName,
            email: newUserEmail,
            password: newUserPassword,
            role: newAdmin ? 'admin' : 'user'
        }))
    }

    const cancelCreate = () => {
        setNewUserModal(false)
    }

    return (
        <>
            <div style={{textAlign: 'right', marginBottom: '20px'}}>
                <Button type="link" onClick={e => {
                    e.preventDefault()
                    setNewUserModal(true)
                }}>New User</Button>
            </div>

            <Table columns={columns} key={adminUsers.users.length} dataSource={adminUsers.users.map((user: any, idx: number) => ({
                ...user,
                key: user.id + ' ' + idx
            }))} />

            <Modal title="Create User" visible={newUserModal} onOk={confirmCreate} onCancel={cancelCreate}>
                <label htmlFor='new-user-name'>User Name</label>
                <Input type="text" id='new-user-name' value={newUserName} onChange={e => {
                    setNewUserName(e.target.value)
                }} placeholder='User name' required />
                <br /> <br />
                <label htmlFor='new-user-email'>User Email</label>
                <Input type="text" id='new-user-email' value={newUserEmail} onChange={e => {
                    setNewUserEmail(e.target.value)
                }} placeholder='User email' required />

                <br /> <br />
                <label htmlFor='new-user-password'>User Password</label>
                <Input type="password" id='new-user-password' value={newUserPassword} onChange={e => {
                    setNewUserPassword(e.target.value)
                }} placeholder='Password' required />

                <br /> <br />
                <label htmlFor='new-user-cf-password'>Confirm Password</label>
                <Input type="password" id='new-user-cf-password' value={newUserConfirmPassword} onChange={e => {
                    setNewUserConfirmPassword(e.target.value)
                }} placeholder='Confirm Password' required />

                <br /> <br />
                <Checkbox checked={newAdmin} onChange={e => setNewAdmin(e.target.checked)}>Is Admin</Checkbox>
            </Modal>

            <Modal title="Edit User" visible={editUserModal} onOk={confirmEditUser} onCancel={cancelEditUser}>
                <label htmlFor='new-user-name'>User Name</label>
                <Input type="text" id='new-user-name' value={currentUserName} onChange={e => {
                    setCurrentUserName(e.target.value)
                }} placeholder='User name' required />
                <br /> <br />
                <label htmlFor='new-user-email'>User Email</label>
                <Input type="text" id='new-user-email' value={currentUserEmail} onChange={e => {
                    setCurrentUserEmail(e.target.value)
                }} placeholder='User email' required />
                <br /> <br />
                <Checkbox checked={currentUserAdmin} onChange={e => setCurrentUserAdmin(e.target.checked)}>Is Admin</Checkbox>
            </Modal>
        </>
    )
}
