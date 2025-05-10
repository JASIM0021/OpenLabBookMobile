import { Endpoints } from '../../../services/endpoint';
import globalApiSlice from '../globalApiSlice';

const bannerInfo = globalApiSlice.injectEndpoints({
  endpoints: builder => ({
    getBanners: builder.query({
      query: data => ({
        url: 'banners',
        method: 'GET',
        body: data,
      }),
    }),

    //patients/6740c11e4f8a960793ff6ce3
  }),
});
export const { useGetBannersQuery } = bannerInfo;
