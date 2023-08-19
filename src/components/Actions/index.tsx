import React from 'react'
import Button from '../Button'
import { IoIosClose } from 'react-icons/io'
import { AiFillHeart } from 'react-icons/ai'

interface IAction {
  onSwipe: () => void;
  cardStatus: (status: string) => void;
  actionElement?: HTMLDivElement;
}

const Actions: React.FC<IAction> = ({ onSwipe, cardStatus, actionElement }) => {
  return (
    <div className='flex mt-14 gap-16 justify-center mb-20'>
        <Button style="red" action={onSwipe} setCardStatus={cardStatus} actionElement={actionElement}>
            <IoIosClose size={60} fill='#E41E1E'/>
        </Button>
        <Button style="green" action={onSwipe} setCardStatus={cardStatus} actionElement={actionElement}>
            <AiFillHeart size={40} fill='#35E667'/>
        </Button>
    </div>
  )
}

export default Actions