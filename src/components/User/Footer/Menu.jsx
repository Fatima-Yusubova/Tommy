import React from 'react'

const Menu = ({title ,list}) => {
  return (
    <div className="mb-4 md:mb-0">
      <h5 className="text-sm font-bold whitespace-nowrap">{title}</h5>
      <ul className='mt-2 md:block block'>
        {list.map((item, i) => (
          <li key={i} className="py-2 text-sm font-medium whitespace-nowrap">
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu