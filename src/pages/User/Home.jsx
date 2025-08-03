import React from 'react'
import HeroBanner from '../../components/User/Home/HeroBanner/HeroBanner'
import Category from '../../components/User/Home/Category'
import Collections from '../../components/User/Home/Collections'
import SaleBanner from '../../components/User/Header/SaleBanner'

const Home = () => {
  return (
    <>
    <SaleBanner/>
    <HeroBanner/>
    <Category/>
    <Collections/>
    </>
  )
}

export default Home