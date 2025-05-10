import { Endpoints } from '../../../services/endpoint';
import globalApiSlice from '../globalApiSlice';

const userInfo = globalApiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOTp: builder.mutation({
      query: data => ({
        url: 'auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation, useVerifyOTpMutation } = userInfo;
