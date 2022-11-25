import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ICardTheJob } from '../../models/models';
import { ReactComponent as BookmarkIcon } from '../../assets/img/bookmark.svg';
import { ReactComponent as PlacePointIcon } from '../../assets/img/place-point.svg';
import { ReactComponent as StarIcon } from '../../assets/img/star.svg';

const CardTheJob = ({ id, title, pictures, name, createdAt }: ICardTheJob) => {
  const { page } = useParams();
  const numberOfDays = useMemo(() => {
    return ((new Date().valueOf() - Date.parse(`${createdAt}`)) / 86400000).toFixed(0);
  }, [createdAt]);

  return (
    <li
      className='flex flex-col lg:flex-row justify-between w-full my-2 px-[16px] py-[24px] rounded-lg bg-[#EFF0F5] lg:bg-white shadow-3xl'
    >
      <div className='flex w-[100%] lg:w-[70%] order-2 lg:order-1'>
        <img
          className='w-[85px] h-[85px] rounded-full'
          src={pictures[0]}
          alt='Avatar'
        />
        <div className='flex flex-col w-[67%] lg:w-[85%] ml-[19px] lg:ml-[26px]'>
          <Link to={`/${page}/detailed/${id}`}>
            <h2 className='not-italic font-bold text-[18px] lg:text-[20px] leading-[24px] lg:leading-[25px] text-[#3A4562]'>{title}</h2>
          </Link>
          <span className='not-italic font-normal text-[16px] leading-[25px] text-[#878D9D] my-[8px]'>
            Department name - {name}
          </span>
          <span className='flex items-center not-italic text-[16px] font-normal text-[#878D9D] leading-[25px] tracking-[-0.24px]'>
            <PlacePointIcon className='mr-[8px]' />
            Kyiv, Ukraine
          </span>
        </div>
      </div>
      <div className='flex flex-row justify-between w-[100%] lg:w-[27%] xl:w-[25%] pl-[105px] lg:pl-0 pb-[17px] lg:pb-0 order-1 lg:order-2'>
        <div className='flex flex-row items-center min-w-[100px]'>
          {new Array(5).fill('').map((_, index) => (
            <StarIcon
              key={index}
              className='h-[10px] lg:h-[18px]'
            />
          ))}
        </div>
        <div className='flex flex-col items-end justify-between lg:min-h-[80px]'>
          <BookmarkIcon className='hidden lg:block'/>
          <span className='not-italic text-[14px] lg:text-[16px] font-normal text-[#878D9D] leading-[17px] lg:leading-[25px] lg:mb-[7px] tracking-[-0.24px]'>
            Posted {numberOfDays} days ago
          </span>
        </div>
      </div>
    </li>
  );
};

export default React.memo(CardTheJob);
