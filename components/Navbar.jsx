import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className='nav_bar border-b-2 border-black'>
      <Image src="/logo.png" width={200} height={100} alt='logo' />

      <button className='border-none mr-20
      pr-2 pl-2 mt-2 mb-1 font-bold hover:bg-gray-300 rounded-sm'>Login</button>
    </nav>
  )
}

export default Navbar