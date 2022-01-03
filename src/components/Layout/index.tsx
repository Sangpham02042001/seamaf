import React, {useEffect} from 'react'
import { RootState } from '../../store'
import Footer from '../Footer'
import Navbar from '../Navbar'
import './layout.css'

type Props = {
    children?: JSX.Element 
}

export default function Layout({children}: Props) {

    return (
        <div>
            <Navbar />
            <div className='main-body'>
                {children}
            </div>
            <Footer />
        </div>
    )
}
