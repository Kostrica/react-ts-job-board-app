import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetJobsQuery } from '../store/Jobs.api';
import { ServerResponse, IContent } from '../models/models';
import { ReactComponent as LeftArrowIcon } from '../assets/img/left_icon.svg';
import { ReactComponent as BookmarkIcon } from '../assets/img/bookmark.svg';
import { ReactComponent as ShareIcon } from '../assets/img/share.svg';
import { ReactComponent as PlacePointIcon } from '../assets/img/place-point.svg';
import { API_TOKEN } from '../utils/BaseURL';
import LocationJob from '../components/LocationJob/LocationJob';

const JobDetailed = () => {
  const { id, page } = useParams();
  const { isLoading, isError, data } = useGetJobsQuery(API_TOKEN);
  const [ job, setJob ] = useState<ServerResponse | null | undefined>(null);
  const [ content, setContent ] = useState<IContent | null>(null);
  const [ salary, setSalary ] = useState<string | null>(null);
  const [ numberOfDays, setNumberOfDays ] = useState<string | null>(null);

  useEffect(() => {
    if (data && id) {
      setJob(data.find((job: any) => job.id === id));
    }
  }, [data, id]);

  useEffect(() => {
    if (job) {
      const { description, createdAt } = job;
      const arr: string[] = [];
      const text = description.split('Responsopilities:');
      const content = arr.concat(text[0], text[1].split('Compensation & Benefits:'));
      const firstText = content[0];
      const responsopilities = content[1];
      const compensationUndBenefits = content[2];

      const salary = job.salary.split('-').map(elem => `${elem.split('k').join('')} 000`).join('-');

      const numberOfDays = ((new Date().valueOf() - Date.parse(`${createdAt}`)) / 86400000).toFixed(0);

      setContent({firstText, responsopilities, compensationUndBenefits});
      setSalary(salary);
      setNumberOfDays(numberOfDays);
    }
  }, [job]);

  return (
    <div className='flex flex-col justify-items-center items-center pt-[24px] lg:pt-[56px] px-[5%] mx-auto min-h-screen min-w-screen'>
      { isError && <p className='text-center text-red-600'>Something went wrong...</p> }
      {job &&
        <div className='flex flex-col lg:flex-row w-full'>
          {isLoading && <p className='text-center'>Loading...</p>}
          <div className='w-[100%] lg:w-[65%] mr-[5%]'>
            <div className='flex justify-between'>
              <h1 className='text-[28px] font-bold text-[#3A4562] leading-[34px]'>
                Job Details
              </h1>
              <div className='hidden lg:flex items-center'>
                <BookmarkIcon className='mr-[16px]' />
                <span className='mr-[31px] not-italic text-[18px] font-normal text-[#3A4562] leading-[24px] tracking-[-0.56px]'>
                  Save to my list
                </span>
                <ShareIcon className='mr-[15px]' />
                <span className='not-italic text-[18px] font-normal text-[#3A4562] leading-[24px] tracking-[-0.56px]'>
                  Share
                </span>
              </div>
            </div>
            <hr className='bg-[#3A4562] mt-[12px] lg:mt-[9px] mb-[24px] lg:mb-[7px]' />
            <div className='flex lg:hidden items-center mt-[24px] mb-[32px]'>
                <BookmarkIcon className='mr-[16px]' />
                <span className='mr-[31px] not-italic text-[16px] font-normal text-[#3A4562] leading-[23px] tracking-[-0.56px]'>
                  Save to my list
                </span>
                <ShareIcon className='mr-[15px]' />
                <span className='not-italic text-[16px] font-normal text-[#3A4562] leading-[23px] tracking-[-0.56px]'>
                  Share
                </span>
              </div>
            <button className='hidden lg:inline-block not-italic rounded-lg bg-[#384564] py-[18px] px-[30px] my-[32px] text-[12px] font-semibold leading-[16px] text-[#FFFFFF] box-border uppercase'>
              Apply now
            </button>
            <div className='flex flex-row justify-between mb-[7px]'>
              <div className='w-[100%] lg:w-[70%]'>
                <h2 className='text-[24px] font-bold text-[#3A4562] leading-[30px] mb-[7px]'>
                  {job.title}
                </h2>
                <div className='flex flex-row justify-between items-center pb-[14px]'>
                  <span className='not-italic text-[13px] lg:text-[18px] font-normal text-[#38415d99] lg:text-[#38405c36] leading-[24px] mb-[7px] tracking-[-0.56px]'>
                    Posted {numberOfDays} days ago
                  </span>
                  <div className='flex lg:hidden flex-col'>
                    <span className='not-italic text-[18px] font-normal  text-[#3A4562] leading-[24px] pb-[4px] text-right'>
                      Brutto, per year
                    </span>
                    <span className='text-[20px] font-bold text-[#3A4562] leading-[25px]'>
                      &#8364; {salary}
                    </span>
                  </div>
                </div>
              </div>
              <div className='hidden lg:flex flex-col'>
                <span className='text-[20px] font-bold text-[#3A4562] leading-[25px]'>
                  &#8364; {salary}
                </span>
                <span className='not-italic text-[18px] font-normal text-[#3A4562] leading-[24px]'>
                  Brutto, per year
                </span>
              </div>
            </div>
            <div>
              <p className='not-italic text-[18px] font-normal text-[#3A4562] leading-[24px] mb-[30px]'>
                {content?.firstText}
              </p>
              <h3 className='text-[20px] font-bold text-[#3A4562] leading-[25px] my-[15px]'>
                Responsopilities
              </h3>
              <p className='not-italic text-[18px] font-normal text-[#3A4562] leading-[24px] mb-[30px]'>
                {content?.responsopilities}
              </p>
              <h3 className='text-[20px] font-bold text-[#3A4562] leading-[25px] my-[15px]'>
                Compensation & Benefits:
              </h3>
              <p className='not-italic text-[18px] font-normal text-[#3A4562] leading-[24px] mb-[30px]'>
                {content?.compensationUndBenefits}
              </p>
            </div>
            <button className='inline-block not-italic rounded-lg bg-[#384564] py-[18px] px-[30px] mt-[32px] mb-[81px] lg:my-[32px] mx-[30%] md:mx-0 text-[12px] font-semibold leading-[16px] text-[#FFFFFF] box-border uppercase'>
              Apply now
            </button>
            <div className='flex flex-col'>
              <div className='order-2 lg:order-1'>
                <h3 className='text-[28px] font-bold text-[#3A4562] leading-[34px] mt-[54px]'>
                  Additional info
                </h3>
                <hr className='bg-[#3A4562] mt-[9px] mb-[7px]' />
                <h4 className='not-italic text-[18px] font-normal text-[#3A4562] leading-[24px] mt-[8px] mb-[10px]'>
                  Employment type
                </h4>
                <ul className='flex flex-wrap'>
                  {job.employment_type.map((elem, index) => (
                    <li key={index}>
                      <span className='flex justify-center items-center w-[222px] h-[49px] mr-[8px] mb-[8px] bg-[#a1b0dc30] rounded-lg border-[1px] border-[#53679f30] not-italic text-[16px] font-bold text-[#55699E] leading-[16px]'>
                        {elem}
                      </span>
                    </li>
                  ))}
                </ul>
                <h4 className='not-italic text-[18px] font-normal text-[#3A4562] leading-[24px] mt-[8px] mb-[10px]'>
                  Benefits
                </h4>
                <ul className='flex flex-wrap'>
                  {job.benefits.map((elem, index) => (
                    <li key={index}>
                      <span className='flex justify-center items-center w-[222px] h-[49px] mr-[8px] mb-[8px] bg-[#ffd00015] rounded-lg border-[1px] border-[#FFCF00] not-italic text-[16px] font-bold text-[#988B49] leading-[16px]'>
                        {elem}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='order-1 lg:order-2'>
                <h3 className='text-[28px] font-bold text-[#3A4562] leading-[34px] mt-[79px]'>
                  Attached images
                </h3>
                <hr className='bg-[#3A4562] mt-[9px] mb-[7px]' />
                <ul className='flex flex-wrap justify-center sm:justify-start pt-[12px] pb-[2px]'>
                  {job.pictures.map((picture, index) => (
                    <li key={index}>
                      <img
                        className='w-[200px] h-[120px] rounded-lg mr-[10px] mt-[10px]'
                        src={picture}
                        alt=''
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='block lg:hidden'>
            <h3 className='text-[28px] font-bold text-[#3A4562] leading-[34px] mt-[79px] '>
            Contacts
            </h3>
            <hr className='bg-[#3A4562] mt-[10px] mb-[21px]' />
          </div>
          <div className='w-[100%] lg:w-[35%] max-w-[400px] h-[436px] bg-[#2A3047] lg:ml-[5%] relative overflow-hidden rounded-lg'>
            <div className='w-[260px] h-[260px] bg-[#202336] relative top-[-10px] left-[-60px] rounded-full'></div>
            <div className='absolute top-[0] left-[0] pt-[31px] px-[16%] w-[100%] flex flex-col'>
              <span className='not-italic text-[16px] lg:text-[20px] font-bold leading-[19px] lg:leading-[25px] text-[#E7EAF0] mb-[8px] tracking-[-0.63px]'>
                Department name.
                <br/>
                {job.name}.
              </span>
              <span className='flex not-italic text-[16px] lg:text-[18px] font-normal leading-[23px] lg:leading-[24px] text-[#E8EBF3] mb-[7px] tracking-[-0.56px]'>
                <PlacePointIcon className='mr-[8px]' />
                {job.address}
              </span>
              <span className='not-italic text-[16px] lg:text-[18px] font-normal leading-[23px] lg:leading-[24px] text-[#E8EBF3] mb-[7px] tracking-[-0.56px]'>
                {job.phone},
                <br/>
                {job.email}
              </span>
            </div>
            <div className='absolute top-[50%] left-[0] w-[100%] h-[50%]'>
              <LocationJob location={job.location} />
            </div>
          </div>
        </div>
      }
      <div className='flex items-start w-full relative'>
        <Link
          to={`/${page}`}
          className='flex items-center rounded-lg bg-slate-300 py-[16px] px-[26px] my-[89px] text-[12px] font-semibold leading-[16px] text-[#3A4562] box-border relative left-[-4%]'
        >
          <LeftArrowIcon className='mr-[19px]'/>
          RETURN TO JOB BOARD
        </Link>
      </div>
    </div>
  );
};

export default React.memo(JobDetailed);
