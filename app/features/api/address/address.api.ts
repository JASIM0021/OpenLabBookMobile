import { Endpoints } from '../../../services/endpoint';
import globalApiSlice from '../globalApiSlice';

const addressSlice = globalApiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllAddress: builder.query({
      query: data => ({
        url: 'covered-address',
        method: 'GET',
      }),
    }),
  }),
});
export const { useGetAllAddressQuery } = addressSlice;
