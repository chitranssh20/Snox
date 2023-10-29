import React from 'react'
import "./TopBanner.css"

const TopBanner = () => {
  return (
    <>
      <div id="topbanner">
        <h1 id="topbanner-h1--logo">SNOX</h1>
        <ul id="topbanner-ul">
          <li className="topbanner-ul-li">LogIn</li>
          <li className="topbanner-ul-li">LogOut</li>
        </ul>
      </div>
    </>
  )
}

export default TopBanner