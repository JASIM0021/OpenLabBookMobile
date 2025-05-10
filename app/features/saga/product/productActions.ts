// productActions.ts
import { createAction } from 'typesafe-actions';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';


export const DELETE_PRODUCTS_REQUEST = 'product/delete_products_request';
export const DELETE_PRODUCTS_SUCCESS = 'product/delete_products_success';
export const DELETE_PRODUCTS_FAILURE = 'product/delete_products_failure';

export const UPDATE_PRODUCT_REQUEST = 'product/update_request';
export const UPDATE_PRODUCT_SUCCESS = 'product/update_success';
export const UPDATE_PRODUCT_FAILURE = 'product/update_failure';


export const deleteProductsRequest = createAction(DELETE_PRODUCTS_REQUEST)<{ productIds: string[] }>();
export const deleteProductsSuccess = createAction(DELETE_PRODUCTS_SUCCESS)<string[]>();
export const deleteProductsFailure = createAction(DELETE_PRODUCTS_FAILURE)<string>();

export const addProductRequest = createAction(ADD_PRODUCT_REQUEST)<{ product: any }>();
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS)<any>();
export const addProductFailure = createAction(ADD_PRODUCT_FAILURE)<string>();

export const fetchProductsRequest = createAction(FETCH_PRODUCTS_REQUEST)();
export const fetchProductsSuccess = createAction(FETCH_PRODUCTS_SUCCESS)<any[]>();
export const fetchProductsFailure = createAction(FETCH_PRODUCTS_FAILURE)<string>();






export const updateProductRequest = createAction(UPDATE_PRODUCT_REQUEST)<{ id: string; product: any }>();
export const updateProductSuccess = createAction(UPDATE_PRODUCT_SUCCESS)<any>();
export const updateProductFailure = createAction(UPDATE_PRODUCT_FAILURE)<string>();
