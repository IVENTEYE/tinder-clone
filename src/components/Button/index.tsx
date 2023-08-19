import React, { ReactNode } from 'react'
import cl from 'clsx'
import useActions from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface IButton {
    children: ReactNode;
    style: string;
    action: () => void;
    setCardStatus: (status: string) => void;
    actionElement?: HTMLDivElement;
}

const Button: React.FC<IButton> = ( {children, style, action, setCardStatus, actionElement} ) => {
  const filteredProfiles = useTypedSelector((state) => state.profiles.filtredProfiles);
  const cardIndex = useTypedSelector((state) => state.profiles.cardIndex);
  const { setCheck, setFavorites } = useActions();

  return (
    <button 
      onClick={() => {
        if (style === 'green') {
          setCardStatus('like');
          if (actionElement) {
            actionElement.style.transform = `translate(300px, 0) rotate(35deg)`;
          }
        } else {
          setCardStatus('skip');
          if (actionElement) {
            actionElement.style.transform = `translate(-300px, 0) rotate(-35deg)`;
          }
        }
        setCheck(filteredProfiles[cardIndex].id);
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