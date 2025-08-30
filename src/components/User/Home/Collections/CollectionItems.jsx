import React from 'react'
const CollectionItems = ({name ,image ,link}) => {
  return (
    <div className='flex flex-col w-full gap-3 '>
      <div className='w-full'>
        <img className='w-full object-cover' src={image} alt="" />
      </div>
      <div className='text-center'>
        <h3 className='text-[18px] text-[#212529] py-5'>{name}</h3>
        <a className='underline' href="#">{link}</a>
      </div>
    </div>
  )
}

export default CollectionItems