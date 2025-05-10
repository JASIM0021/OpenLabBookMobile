import { Endpoints } from '../../../services/endpoint';
import globalApiSlice from '../globalApiSlice';

const userInfo = globalApiSlice.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation({
      query: data => ({
        url: 'user/create-user',
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: data => ({
        url: Endpoints.login.url,
        method: 'POST',
        body: data,
      }),
    }),

    getProfileInfo: builder.query({
      query: data => ({
        url: 'users/me',
        method: 'GET',
        body: data,
      }),
    }),
    updatePatientProfile: builder.mutation({
      query: data => {
        console.log('Updating patient profile with data:', data);

        return {
          url: `patients/${data?.id}`,
          method: 'POST',
          body: data?.formData,
        };
      },
    }),

    //patients/6740c11e4f8a960793ff6ce3
  }),
});
export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdatePatientProfileMutation,
  useGetProfileInfoQuery,
} = userInfo;
