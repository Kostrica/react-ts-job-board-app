import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetJobsQuery } from '../store/Jobs.api';
import { ServerResponse } from '../models/models';
import CardTheJob from '../components/CardTheJob/CardTheJob';
import { API_TOKEN } from '../utils/BaseURL';
import Pagination from '../components/Pagination/Pagination';

const numberOfElements = 6;

const JobBoard = () => {
  const { page }: any = useParams();
  const { isLoading, isError, data } = useGetJobsQuery(API_TOKEN);

  const [ jobs, setJobs ] = useState<ServerResponse[] | null | undefined>(null);
  const [ pageCount, setPageCount ] = useState<number>(1);

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.length / numberOfElements));
    }
  }, [data]);

  useMemo(() => {
    const lastJob = page * numberOfElements;

    setJobs(data?.slice(lastJob - numberOfElements, lastJob));
  }, [data, page]);

  return (
    <div>
      { isError && <p className='text-center text-red-600'>Something went wrong...</p> }
      {jobs && <div className='flex flex-col justify-items-center items-center pt-[16px] px-[5%] mx-auto min-h-screen min-w-screen bg-[#E6E9F2] lg:bg-[#F5F5F5]'>
        <ul className='list-none'>
          {isLoading && <p className='text-center'>Loading...</p>}
          {jobs.map(({ id, title, pictures, name, createdAt }) => (
            <CardTheJob
              key={id}
              id={id}
              title={title}
              pictures={pictures}
              name={name}
              createdAt={createdAt}
            />
          ))}
        </ul>
        <Pagination
          pageCount={pageCount}
          openedPage={page}
        />
      </div>}
    </div>
  );
};

export default React.memo(JobBoard);
