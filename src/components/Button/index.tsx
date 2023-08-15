import React, { ReactNode } from 'react'
import cl from 'clsx'
import useActions from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface IButton {
    children: ReactNode;
    style: string;
    action: () => void;
}

const Button: React.FC<IButton> = ( {children, style, action} ) => {
  const { setIndex } = useActions();
  let cardIndex: number = useTypedSelector(state => state.profiles.cardIndex);

  return (
    <button 
      onClick={() => {
        action();
        // setIndex(cardIndex + 1);
      }}
      className={cl('w-[4.9375rem] h-[4.9375rem] rounded-full flex items-center justify-center', style === 'red' ? 'red' : 'green')}
    >
        {children}
    </button>
  )
}

export default Button