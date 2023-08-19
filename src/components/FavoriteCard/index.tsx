import { MdDelete } from 'react-icons/md';
import { GoLinkExternal } from 'react-icons/go';
import React from 'react';
import { ICard } from '../Card';
import useActions from '@/hooks/useActions';
import { ageCalc } from '../ageCalc';

const FavoriteCard: React.FC<ICard> = ({ id, image, name, city, screen_name, bdate }) => {
  const { filterFavorites } = useActions();

  let age;
  if (bdate) age = ageCalc(bdate);

  return (
    <a
      href={`https://vk.com/${screen_name}`}
      target="_blank"
      className="flex items-center bg-white shadow-bl rounded-xl p-2 mb-3">
      <img className="w-20 h-20 mr-4 rounded-lg object-cover" src={image} alt={name} />
      <div className="flex-1">
        <h2 className="font-bold text-2xl">
          {name}
          {age && <span className="text-xl">, {age}</span>}
        </h2>
        <p className="mt-[-3px] text-gray-500">{city?.title}</p>
      </div>
      <MdDelete 
        className='mr-3' size={20}
        onClick={(e) => {
          e.preventDefault();
          filterFavorites(id)
        }}
      />
      <GoLinkExternal size={20}/>
    </a>
  );
};

export default FavoriteCard;
