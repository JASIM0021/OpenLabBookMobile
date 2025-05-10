import globalApiSlice from '../globalApiSlice';

const appointmentSlice = globalApiSlice.injectEndpoints({
  endpoints: builder => ({
    createAppointment: builder.mutation({
      query: data => ({
        url: 'appointments',
        method: 'POST',
        body: data,
      }),
    }),
    createDirectAppointment: builder.mutation({
      query: data => ({
        url: 'appointments/create-direct-appointment',
        method: 'POST',
        body: data,
      }),
    }),

    //appointments/my-appointments

    getMyAppointment: builder.query({
      query: ({ queryParams }) => {
        const searchparams = new URLSearchParams();

        let returnObject: any = {
          url: 'appointments/my-appointments',
          method: 'GET',
        };
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

        return returnObject;
      },
    }),

    //appointments/book from cart

    bookFromCart: builder.mutation({
      query: data => ({
        url: 'appointments/create-from-cart',
        method: 'POST',
        body: data,
      }),
    }),
    // cancellAppoinment: builder.mutation({
    //   query: data => ({
    //     url: `appointments/cancel/${data?.id}`,
    //     method: 'POST',
    //     // body: data,
    //   }),
    // }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetMyAppointmentQuery,
  useCreateDirectAppointmentMutation,
  useBookFromCartMutation,
} = appointmentSlice;
