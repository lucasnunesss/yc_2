import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { auth, signIn, signOut } from '@/auth'

const Navbar = async() => {
  const session = await auth()



  return (
    <nav className='nav_bar border-b-2 border-black'>
      <Image src="/logo.png" width={200} height={100} alt='logo' />


{session && session?.user ? (
  <>
      <button className='border-none mr-20
      pr-2 pl-2 mt-2 mb-1 font-bold hover:bg-gray-300 rounded-sm'>
          Logado
      </button>

      <form action={async () => {
    "use server"

    await signOut()
  }}>
    <button type="submit">Logout</button>
  </form>
  </> 
) : (
  <form action={async () => {
    "use server"

    await signIn("github")
  }}>
    <button type="submit">Login</button>
  </form>
)}



    </nav>
  )
}

export default Navbar