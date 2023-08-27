import Navbar from '@/components/Navbar';
import useActions from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import React, { useState } from 'react';
import { Range } from 'react-range';
import { getTrackBackground } from 'react-range/lib/utils';

const Filters = () => {
  const [age, setAge] = useState([16]);
  const cityValue = useTypedSelector(state => state.filters.city);

  const { setCity, setFilterAge } = useActions();

  const rangeMin: number = 16;
  const rangeMax: number = 100;


  return (
    <div className="px-[15px] mx-auto overflow-hidden h-[100dvh]">
      <div className="card-wrapper h-full flex flex-col relative my-4 max-w-[550px] mx-auto">
        <h1 className="font-bold text-3xl mb-7">Настройка фильтров</h1>
        <div className="flex flex-col flex-auto overflow-y-auto mb-2 px-[15px] mx-[-15px]">
          <div className='flex items-center mb-7 font-bold text-2xl'>
            <h2 className='mr-2'>Город:</h2>
            <input 
              className='w-full p-1 placeholder:text-[19px] placeholder:font-normal capitalize outline-none' 
              value={cityValue} 
              type="text" 
              placeholder="Введите название города"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <h2 className='font-bold text-2xl mb-7'>Возраст: <span className='ml-1 font-medium'>{age}</span></h2>
          <div>
            <Range
              step={1}
              min={rangeMin}
              max={rangeMax}
              values={age}
              onChange={(values) => {
                setAge(values);
                setFilterAge(values);
              }}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    borderRadius: '10px',
                    background: getTrackBackground({
                      values: age,
                      colors: ['#794AEF', '#ccc'],
                      min: rangeMin,
                      max: rangeMax,
                    }),
                  }}>
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#794AEF',
                  }}
                />
              )}
            />
            <div className='flex justify-between items-center mt-2 text-xl'>
              <p>{rangeMin}</p>
              <p>{rangeMax}</p>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Filters;
