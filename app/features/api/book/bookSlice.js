import { Endpoints } from "../../../services/endpoint";
import globalApiSlice from "../globalApiSlice";

const bookInfo = globalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (data) => ({
        url:'admin/data',
        method:'GET'
      }),
    })
  }),
});
export const { useGetAllBooksQuery } = bookInfo;
