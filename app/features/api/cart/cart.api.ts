import globalApiSlice from '../globalApiSlice';

const cartSlice = globalApiSlice.injectEndpoints({
  endpoints: builder => ({
    addToCart: builder.mutation({
      query: data => ({
        url: 'cart/add-to-cart',
        method: 'POST',
        body: data,
      }),
    }),

    getAllCart: builder.mutation({
      query: data => ({
        url: 'cart/all-cart',
        method: 'GET',
        body: data,
      }),
    }),

    // remove-cart

    removeCartItem: builder.mutation({
      query: data => ({
        url: 'cart/remove-cart',
        method: 'POST',
        body: data,
      }),
    }),

    // cart/remove-all-cart

    removeAllCartItem: builder.mutation({
      query: data => ({
        url: 'cart/remove-all-cart',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveCartItemMutation,
  useRemoveAllCartItemMutation,
  useGetAllCartMutation,
} = cartSlice;
