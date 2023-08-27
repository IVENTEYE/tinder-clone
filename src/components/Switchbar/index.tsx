import useActions from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import cl from 'clsx';
import React, { useEffect } from 'react';
import { IoIosMan, IoIosWoman } from 'react-icons/io';

interface IProfile {
  sex: number;
}

const Switchbar: React.FC = () => {
  const gender = useTypedSelector((state) => state.gender.gender);
  const profiles = useTypedSelector((state) => state.profiles.profiles);
  const { setGender, setFilter } = useActions();

  const mooveBar = (e: any) => {
    const item = e.target.closest('button');
    const itemParent = item.parentNode;
    const mooveBar = itemParent.querySelector('.indicator');
    const itemPosition = item.offsetLeft;
    console.log(itemPosition);
    mooveBar.style.left = itemPosition - 10 + 'px';
  };

  const filterProfiles = (value: number) => {
    setFilter(profiles.filter((profile: IProfile) => profile.sex === value));
  };

  return (
    <div className="mt-5 mb-7 rounded-[25px] bg-[#D9D9D9] w-[6.4375rem] mx-auto">
      <div className="buttons py-[0.21rem] px-[0.38rem] flex justify-around relative">
        <button
          type="button"
          className="z-10"
          onClick={(e) => {
            mooveBar(e);
            setGender('male');
            filterProfiles(2);
            // setIndex(0);
          }}>
          <IoIosMan size={31} />
        </button>
        <button
          type="button"
          className="z-10"
          onClick={(e) => {
            mooveBar(e);
            setGender('female');
            filterProfiles(1);
            // setIndex(0);
          }}>
          <IoIosWoman size={31} />
        </button>
        <div
          className={cl(
            'indicator w-[3.1875rem] h-8 bg-white rounded-[10.5625rem] transition-left duration-300 absolute top-[50%] translate-y-[-50%] z-0',
            gender === 'male' ? 'left-[3px]' : 'left-[49px]',
          )}></div>
      </div>
    </div>
  );
};

export default Switchbar;
