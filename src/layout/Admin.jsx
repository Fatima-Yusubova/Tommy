import React from 'react'
import Sidebar from '../components/Admin/Sidebar'
import { Outlet } from 'react-router'

const Admin = () => {
  return (
    <div className='flex gap-5'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default Admin