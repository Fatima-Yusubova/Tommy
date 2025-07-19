import React from 'react'
import Header from '../components/User/Header/Header'
import { Outlet } from 'react-router'
import Footer from '../components/User/Footer/Footer'
import NewsLetter from '../components/User/NewsLetter/NewsLetter'

const User = () => {
  return (
   <>
   <Header/>
   <Outlet/>
   <NewsLetter/>
   <Footer/>
   </>
  )
}

export default User