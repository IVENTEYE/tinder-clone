import React from 'react'
import Button from '../Button'
import { IoIosClose } from 'react-icons/io'
import { AiFillHeart } from 'react-icons/ai'

interface IAction {
  onSwipe: () => void;
}

const Actions: React.FC<IAction> = ({ onSwipe }) => {
  return (
    <div className='flex mt-14 gap-16 justify-center'>
        <Button style="red" action={onSwipe}>
            <IoIosClose size={60} fill='#E41E1E'/>
        </Button>
        <Button style="green" action={onSwipe}>
            <AiFillHeart size={40} fill='#35E667'/>
        </Button>
    </div>
  )
}

export default Actions