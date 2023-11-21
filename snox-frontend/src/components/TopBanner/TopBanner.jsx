import React from 'react'
import Bag from '../Assets/bag.png'
import "./TopBanner.css"
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const TopBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showCart = () => {
    dispatch({"type": "showCart"})
  }
  const fname = Cookies.get('fname');
  return (
    <>
      <div id="topbanner">
        <h1 id="topbanner-h1--logo">SNOX</h1>
        <ul id="topbanner-ul">
          
            {
              fname != null || fname != undefined ?
              <li className="topbanner-ul-li">{fname}</li>
               : 
               <li className="topbanner-ul-li" onClick={(e) => {navigate('/login')}} >LogIn</li>
            }
          <li className="topbanner-ul-li">
            <img onClick={(e) => {showCart()}} src={Bag} alt="Shopping Bag" width={'20px'} height={'20px'} />
          </li>
        </ul>
      </div>
    </>
  )
}

export default TopBanner