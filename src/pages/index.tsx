import Actions from '@/components/Actions';
import Card, { ICard } from '@/components/Card';
import Switchbar from '@/components/Switchbar';
import { useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState, FC } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import useActions from '@/hooks/useActions';
import { GetServerSideProps, GetStaticProps } from 'next';
import Navbar from '@/components/Navbar';

const App: FC<any> = ({ response }) => {

  const gender = useTypedSelector((state) => state.gender.gender);
  const profiles = useTypedSelector((state) => state.profiles.profiles);
  const cardIndex = useTypedSelector((state) => state.profiles.cardIndex);
  const checkedProfiles = useTypedSelector((state) => state.profiles.checkedProfiles);
  const { setGender, setFilter, setIndex, setItems, setCheck, setFavorites } = useActions();

  const [cardStatus, setCardStatus] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRed = useRef<HTMLDivElement>(null);

  const filteredProfiles = useTypedSelector((state) => state.profiles.filtredProfiles);

  const renderCard = (data: any) => {
    // setCheck(data.id);
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
    const checkedProfiles = JSON.parse(localStorage.getItem('checkedProfiles') || '[]');

    if (storageGender) {
      setGender(String(storageGender));
    }

    if (checkedProfiles) {
      checkedProfiles.map((item: number) => setCheck(item));
    }

    setItems(response.sort(() => Math.random() - 0.5));
  }, []);

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
    localStorage.setItem('checkedProfiles', JSON.stringify(checkedProfiles));
  }, [checkedProfiles]);

  useEffect(() => {
    if (cardStatus === 'like') {
      setFavorites(filteredProfiles[cardIndex]);
    }
  }, [cardStatus]);

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

  // useEffect(() => {
  //   setFilter(filteredProfiles.filter((item, index) => index !== cardIndex));
  // }, [cardIndex]);

  return (
    <div className="px-[15px] mx-auto overflow-x-hidden">
      <Switchbar />
      <div ref={wrapperRed} className="card-wrapper min-h-[464px] relative">
        {filteredProfiles.map((profile: any, index: number) => {
          if (index === cardIndex) {
            return renderCard(profile);
          }
        })}
      </div>
      <Actions onSwipe={cardDismiss} cardStatus={setCardStatus} actionElement={cardRef.current ? cardRef.current : undefined}/>
      <Navbar />
    </div>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`https://api.vk.com/method/groups.getMembers?group_id=91050183&count=100&fields=sex,city,photo_max_orig,screen_name,bdate&access_token=${process.env.API_TOKEN}&v=5.84`)
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      return data.response.items;
  });

  return {
    props: {
      response: response,
    }
  }
  
}