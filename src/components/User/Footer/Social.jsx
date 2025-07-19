import React from 'react'
import { FaFacebookF, FaPinterest, FaYoutube } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";



const Social = () => {
  return (
    <div className='mt-10'>
        <ul className='flex items-center gap-5'>
            <li><a href=""><FaXTwitter size={20}/></a></li>
            <li><a href=""><FaFacebookF size={20}/></a></li>
            <li><a href=""><FaInstagram size={20}/></a></li>
            <li><a href=""><FaPinterest size={20}/></a></li>
            <li><a href=""><FaYoutube size={20}/></a></li>
        </ul>
    </div>
  )
}

export default Social