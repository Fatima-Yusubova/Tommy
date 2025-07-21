import React from 'react'
import Menu from './Menu';
import Social from './Social';
import Copyright from './Copyright';

const Footer = () => {
 const menuItems = [
   {
     name: "Help & Support",
     list: [
       { name: "Customer Service", link: "/" },
       { name: "Order Status", link: "/" },
       { name: "Shipping", link: "/" },
       { name: "Returns", link: "/" },
       { name: "Klarna", link: "/" },
       { name: "Cash App Afterpay", link: "/" },
       { name: "Promotions & Discounts", link: "/" },
       { name: "Group Discounts", link: "/" },
       { name: "E-Gift Cards", link: "/" },
       { name: "Store Directory", link: "/" },
     ],
   },
   {
     name: "About Tommy Hilfiger",
     list: [
       { name: "Tommy Stories", link: "/" },
       { name: "People's Place Program", link: "/" },
       { name: "Sustainability", link: "/" },
       { name: "Press", link: "/" },
       { name: "Tommy Trade In", link: "/" },
     ],
   },
   {
     name: "Join Us",
     list: [
       { name: "The Hilfiger Club", link: "/" },
       { name: "Newsletter Signup", link: "/" },
       { name: "Careers", link: "/" },
       { name: "Affiliate Program", link: "/" },
     ],
   },
   {
     name: "Contact Us",
     list: [
       { name: "Store Locator", link: "/" },
       { name: "Chat", link: "/" },
     ],
   },
 ];

  return (
    <div className="max-w-[95%] m-auto">
      <footer className=" border-0 border-t-black md:border-t-1 pt-10">
        <div className="md:flex md:justify-between md:flex-row ">
          <div><Menu title={menuItems[0].name} list={menuItems[0].list}  /></div>
          <div><Menu title={menuItems[1].name} list={menuItems[1].list} /></div>
          <div><Menu title={menuItems[2].name} list={menuItems[2].list} /></div>
          <div>
            <Menu title={menuItems[3].name} list={menuItems[3].list}  />
            <Social/>
          </div>
        </div>
        <Copyright/>
      </footer>
    </div>
  );
}

export default Footer