import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Route, Redirect, useHistory} from 'react-router-dom'
import { getUserInfo } from '../../store/reducers/user'
import { RootState } from '../../store'

const AdminRoute = (props: any) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userReducer = useSelector((state: RootState) => {
        return state.user
    });

    useEffect(() => {
        if (!userReducer.loaded) {
            dispatch(getUserInfo())
        } else {
            console.log('fadsfasdf')
            if (userReducer.user.role !== 'admin') {
                history.push('/')
            }
        }
    }, [userReducer.loaded])

    return (
        <>
            {
            	userReducer.loaded && 
							(userReducer.user.role === 'admin' ?
								<Route {...props} component={props.component} render={undefined} />
								: <Redirect to='/' />
							)
            }
        </>
    )
}

export default AdminRoute

