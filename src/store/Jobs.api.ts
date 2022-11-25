import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerResponse } from '../models/models';
import { BASE_URL, URL } from '../utils/BaseURL';


export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: build => ({
    getJobs: build.query<ServerResponse[], string>({ 
      query: (token: string) => ({
        url: URL,
        params: {
          access_token: token,
        }
      })
    })
  })
});

export const { useGetJobsQuery } = jobsApi;
