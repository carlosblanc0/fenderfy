import React from 'react'
import svg from './icons/svg.svg'

function Header() {
  return (
    <div className="logo">
      <img src={svg} alt="React Logo" />
    </div>
  )
}

export default Header;