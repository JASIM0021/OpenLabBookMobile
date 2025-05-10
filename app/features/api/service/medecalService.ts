import { Endpoints } from '../../../services/endpoint';
import globalApiSlice from '../globalApiSlice';

const userInfo = globalApiSlice.injectEndpoints({
  endpoints: builder => ({
    getServiceResult: builder.query({
      query: ({ queryParams }) => {
        console.log('queryParams', queryParams);
        const searchparams = new URLSearchParams();

        let returnObject: any = {
          url: 'services',
          method: 'GET',
        };

        //

        if (queryParams && queryParams?.length > 0) {
          queryParams.forEach(element => {
            const valueString = Array.isArray(element.value)
              ? JSON.stringify(element.value)
              : String(element.value);
            if (valueString) {
              searchparams.append(element.name, valueString);
            }
          });

          returnObject.params = searchparams;
        }
        console.log('returnObject', returnObject);
        return returnObject;
        // return {
        //   url: 'organizations',
        //   method: 'GET',
        // };
      },
    }),

    getTestbyQuery: builder.query({
      query: ({ queryParams }) => {
        console.log('queryParams', queryParams);
        const searchparams = new URLSearchParams();

        let returnObject: any = {
          url: 'medical-tests',
          method: 'GET',
        };

        //

        if (queryParams && queryParams?.length > 0) {
          queryParams.forEach(element => {
            const valueString = Array.isArray(element.value)
              ? JSON.stringify(element.value)
              : String(element.value);
            if (valueString) {
              searchparams.append(element.name, valueString);
            }
          });

          returnObject.params = searchparams;
        }
        console.log('returnObject', returnObject);
        return returnObject;
        // return {
        //   url: 'organizations',
        //   method: 'GET',
        // };
      },
    }),

    gettestMutation: builder.mutation({
      query: ({ queryParams }) => {
        console.log('queryParams', queryParams);
        const searchparams = new URLSearchParams();

        let returnObject: any = {
          url: 'medical-tests',
          method: 'GET',
        };

        //

        if (queryParams && queryParams?.length > 0) {
          queryParams.forEach(element => {
            const valueString = Array.isArray(element.value)
              ? JSON.stringify(element.value)
              : String(element.value);
            if (valueString) {
              searchparams.append(element.name, valueString);
            }
          });

          returnObject.params = searchparams;
        }
        console.log('returnObject', returnObject);
        return returnObject;
        // return {
        //   url: 'organizations',
        //   method: 'GET',
        // };
      },
    }),
  }),
});
export const {
  useGetServiceResultQuery,
  useGetTestbyQueryQuery,
  useGettestMutationMutation,
} = userInfo;
