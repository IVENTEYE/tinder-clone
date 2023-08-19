import { ICard } from '@/components/Card';
import FavoriteCard from '@/components/FavoriteCard';
import Navbar from '@/components/Navbar';
import useActions from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { NextPage } from 'next';
import { useEffect } from 'react';

const Favorite: NextPage = () => {
  const favoriteProfiles = useTypedSelector((state) => state.profiles.favoriteProfiles);
  // const { loadFavorites } = useActions();

  // useEffect(() => {
  //   const favoriteProfiles = JSON.parse(localStorage.getItem('favoriteProfiles') || '[]');

  //   if (favoriteProfiles) {
  //     loadFavorites(favoriteProfiles);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('favoriteProfiles', JSON.stringify(favoriteProfiles));
  // }, [favoriteProfiles]);

  return (
    <div className="px-[15px] mx-auto overflow-hidden h-[100dvh]">
      <div className="card-wrapper h-full flex flex-col relative my-4 max-w-[550px] mx-auto">
        <h1 className="font-bold text-3xl mb-7">Понравившееся</h1>
        <div className='flex flex-col flex-auto overflow-y-auto mb-2 px-[15px] mx-[-15px]'>
          {favoriteProfiles.map((favorite: any) => {
            return (
              <FavoriteCard
                key={favorite.id}
                id={favorite.id}
                name={favorite.first_name}
                image={favorite.photo_max_orig}
                city={favorite.city}
                screen_name={favorite.screen_name}
                bdate={favorite.bdate}
              />
            );
          })}
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default Favorite;
