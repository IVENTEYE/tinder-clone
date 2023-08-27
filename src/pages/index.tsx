import Actions from '@/components/Actions';
import Card, { ICard } from '@/components/Card';
import Switchbar from '@/components/Switchbar';
import React, { useEffect, useRef, useState, FC, Dispatch } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import useActions from '@/hooks/useActions';
import Navbar from '@/components/Navbar';
import { useDispatch } from 'react-redux';
import { fetchProfiles } from '@/redux/slices/profilesSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TypeRootState } from '@/redux/store';
export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<TypeRootState, null, AnyAction> 

const App: FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const gender = useTypedSelector((state) => state.gender.gender);
  const profiles = useTypedSelector((state) => state.profiles.profiles);
  const cardIndex = useTypedSelector((state) => state.profiles.cardIndex);
  const filterCity = useTypedSelector((state) => state.filters.city);
  const filterAge = useTypedSelector((state) => state.filters.age);
  const { setGender, setFilter, setIndex, setFavorites } = useActions();

  const [cardStatus, setCardStatus] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRed = useRef<HTMLDivElement>(null);

  const renderCard = (data: any) => {
    return (
      <Card
        key={data.id}
        image={data.photo_max_orig}
        name={data.first_name}
        city={data.city}
        bdate={data.bdate}
        cardRef={cardRef}
        status={cardStatus}
      />
    );
  };

  useEffect(() => {
    const storageGender = localStorage.getItem('gender');
    const offset = Number(localStorage.getItem('offset'));

    if (storageGender) {
      setGender(String(storageGender));
    }

    if (offset) {
      setIndex(offset);
    }

    dispatch(fetchProfiles(offset));

    // setItems(response.sort(() => Math.random() - 0.5));
  }, []);

  const filteredProfiles = useTypedSelector((state) => state.profiles.filtredProfiles);

  useEffect(() => {
    if (gender === 'male') {
      setFilter(profiles.filter((profile: any) => profile.sex === 2));
    } else {
      setFilter(profiles.filter((profile: any) => profile.sex === 1));
    }
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('gender', gender);
  }, [gender]);

  useEffect(() => {
    if (cardStatus === 'like') {
      setFavorites(filteredProfiles[cardIndex]);
    }
  }, [cardStatus]);

  useEffect(() => {
    localStorage.setItem('offset', cardIndex);
  }, [cardIndex]);

  let swipeX: number = 0;
  let swipeY: number = 0;

  const handleTouchStart = (e: any) => {
    const firstTouch = e.touches[0];
    swipeX = firstTouch.clientX;
    swipeY = firstTouch.clientY;
  };

  const cardDismiss = () => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);

    if (cardRef.current) {
      setTimeout(() => {
        setIndex(cardIndex + 1);
        setCardStatus('');
      }, 350);
    }
  };

  const handleTouchMove = (e: any) => {
    if (swipeX === 0 || swipeY === 0) {
      return false;
    }

    let swipeXMove = e.touches[0].clientX,
      swipeYMove = e.touches[0].clientY,
      xDiff = swipeXMove - swipeX,
      yDiff = swipeYMove - swipeY;

    const rotate = xDiff * 0.8;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // Движение вправо/влево
      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${xDiff * 5}%, 0) rotate(${rotate}deg)`;
        xDiff > 0 ? setCardStatus('like') : setCardStatus('skip');
      }
    }

    if (cardRef.current) {
      if (Math.abs(xDiff) > cardRef.current.clientWidth * 0.01) {
        cardDismiss();
      }
    }

    swipeX = 0;
    swipeY = 0;
  };

  if (typeof window !== 'undefined') {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
  }

  // const cardProfiles = filteredProfiles.filter((profile) =>
  //   profile.city?.title.toLowerCase() === filterCity && filterAge > 0
  //     ? ageCalc(profile.bdate) === filterAge
  //     : null,
  // );
  // console.log(cardProfiles);

  // useEffect(() => {
  //   setFilter(filteredProfiles.filter((item, index) => index !== cardIndex));
  // }, [cardIndex]);

  return (
    <div className="px-[15px] mx-auto max-w-[485px] overflow-x-hidden">
      <Switchbar />
      <div ref={wrapperRed} className="card-wrapper min-h-[464px] relative">
        {filteredProfiles.map((profile: any, index: number) => {
          if (index === cardIndex) {
            return renderCard(profile);
          }
        })}
      </div>
      <Actions
        onSwipe={cardDismiss}
        cardStatus={setCardStatus}
        actionElement={cardRef.current ? cardRef.current : undefined}
      />
      <Navbar />
    </div>
  );
};

export default App;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await fetch(
//     `https://api.vk.com/method/groups.getMembers?group_id=91050183&fields=sex,city,photo_max_orig,screen_name,bdate&access_token=${process.env.API_TOKEN}&v=5.84`,
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       return data.response.items;
//     });

//   return {
//     props: {
//       response: response,
//     },
//   };
// };
