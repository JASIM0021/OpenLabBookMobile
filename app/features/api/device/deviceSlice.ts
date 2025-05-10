import globalApiSlice from "../globalApiSlice";

const deviceInfo = globalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveDeviceToDb: builder.mutation({
      query: (data) => {
        console.log("whensaving", data);
        return {
          url: `/devices/register`,
          method: "POST",
          body: data,
        };
      },
    }),
    getAllDevices: builder.mutation({
      query: (data) => ({
        url: `/devices/${data}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useSaveDeviceToDbMutation, useGetAllDevicesMutation } =
  deviceInfo;
