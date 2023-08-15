import React from 'react';
import Image from 'next/image';
import { IoIosClose } from 'react-icons/io';
import { AiFillHeart } from 'react-icons/ai';
import clsx from 'clsx';

interface ICard {
  image: string;
  name: string;
  city: {title: string};
  bdate: string;
  cardRef: React.RefObject<HTMLDivElement>;
  status: string;
}

const Card: React.FC<ICard> = ({ image, name, city, bdate, cardRef, status }) => {
  const yearBirth: string | null = bdate ? bdate.split('.')[2] : null;
  const age = yearBirth ? new Date().getFullYear() - Number(yearBirth) : '';
  return (
    // mt-[6.69rem]
    <div className="card absolute w-full z-10">
      <div
        ref={cardRef}
        className={clsx("card__image overflow-y-hidden w-full bg-[#D9D9D9] rounded-[1.9375rem] p-[0.81rem] min-h-[29rem] relative transition-all duration-500 ease-out", status === 'like' ? 'like' : status === 'skip' ? 'skip' : null )}>
        <img
          src={image}
          alt={image}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-[1.9375rem] z-0"
        />
        <div className="info flex items-start justify-between z-10 absolute w-full left-0 bottom-[2.62rem] px-[0.83rem] text-white">
          <div className="info__about">
            <h1 className="text-[1.75rem] font-bold leading-[1.75rem]">{name}</h1>
            <p className="text-[#e8e7e7]">{city && city.title}</p>
          </div>
          <p className="text-[1.75rem] font-bold leading-[1.75rem]">{age}</p>
        </div>
        {status.length > 0 && (
          <div
            className={clsx(
              'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-20 h-20 rounded-full flex justify-center items-center',
              status === 'like' ? 'bg-[#88ffa98a]' : 'bg-[#f6727275]',
            )}>
            {status !== '' ? (
              status === 'like' ? (
                <AiFillHeart size={40} fill="#35E667" />
              ) : (
                <IoIosClose size={60} fill="#E41E1E" />
              )
            ) : null}
          </div>
        )}
        <div className="status__overlay"></div>
      </div>
    </div>
  );
};

export default Card;
