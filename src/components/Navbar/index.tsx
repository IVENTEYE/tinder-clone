import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { BsSearchHeart } from 'react-icons/bs'

const Navbar = () => {
    const router = useRouter();
  return (
    <nav className='mb-5 w-full shadow-violet flex pt-2 pb-2 px-2 bg-white rounded-2xl items-center max-w-[180px] shadow-[0px 5px 10px 2px rgba(106 54 237 0.2)] mx-auto'>
        <button 
            className='flex-1 items-center justify-center flex'
            onClick={() => router.push('/')}
        >
            <BsSearchHeart size={30} fill='rgba(106, 54, 237, 0.9)'/>
        </button>
        <button 
            className='flex-1 items-center justify-center flex'
            onClick={() => router.push('/favorite')}
        >
            <AiFillHeart size={30} fill='rgba(106, 54, 237, 0.9)'/>
        </button>
    </nav>
  )
}

export default Navbar