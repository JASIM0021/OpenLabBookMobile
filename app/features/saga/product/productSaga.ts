// productSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
// import firestore from '@react-native-firebase/firestore';
import { ActionType } from 'typesafe-actions';
import { ADD_PRODUCT_REQUEST, DELETE_PRODUCTS_REQUEST, FETCH_PRODUCTS_REQUEST, UPDATE_PRODUCT_REQUEST, addProductFailure, addProductRequest, addProductSuccess, deleteProductsFailure, deleteProductsRequest, deleteProductsSuccess, fetchProductsFailure, fetchProductsSuccess, updateProductFailure, updateProductRequest, updateProductSuccess } from './productActions';
import { productFetchSuccess, startLoading, stopLoading } from '../../slice/GlobalSlice';

function* addProduct(action: ActionType<typeof addProductRequest>) {
  put(startLoading())
  try {
    const { product } = action.payload;
    console.log('product', product)
    // yield call([firestore().collection('products'), 'add'], product);
    yield put(addProductSuccess(product));
  } catch (error) {
    yield put(addProductFailure(error.message));
  }
}
function* updateProduct(action: ActionType<typeof updateProductRequest>) {
  yield put(startLoading());
  try {
    const { id, product } = action.payload;
    // console.log('product, id', product, id);
    // const snapshot = yield firestore()
    // .collection('products')
    // .doc(id)
    // .update({
    //   name:product?.name,
    //   brand:product?.brand,
    //   price:product?.price,
    //   imageUri:product?.imageUri
    // })

    
    // const updatedProduct = yield firestore()
    //   .collection('products')
    //   .doc(id)
    //   .update(product);
    console.log('product', product)
    // const batch = firestore().batch();
    // const productRef = firestore().collection('products').doc(id);
    // batch.update(productRef,product)
    // yield batch.commit();
    yield put(updateProductSuccess(product));
    yield put(stopLoading());
  } catch (error) {
    yield put(updateProductFailure(error.message));
    yield put(stopLoading());
  }
}

function* fetchProducts() {
  console.log("called")
  put(startLoading())
  try {
    // // const snapshot = yield call([firestore().collection('products'), 'get']);
    // console.log('snapshort', snapshot)
    // const products = snapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    // yield put(productFetchSuccess(products));
  } catch (error) {
    console.log('error', error)
    yield put(fetchProductsFailure(error.message));
  }
}

function* deleteProducts(action: ActionType<typeof deleteProductsRequest>) {
  put(startLoading())
  try {
    const { productIds } = action.payload;
    // const batch = firestore().batch();

    // productIds.forEach(productId => {
    //   const productRef = firestore().collection('products').doc(productId);
    //   batch.delete(productRef);
    // });

    // yield batch.commit(); // Commit batch deletion
    yield put(deleteProductsSuccess(productIds)); // Dispatch success action with deleted product IDs
  } catch (error) {
    yield put(deleteProductsFailure(error.message)); // Dispatch failure action
  }
}

export function* watchProduct() {
  yield takeLatest(DELETE_PRODUCTS_REQUEST, deleteProducts);
  yield takeLatest(ADD_PRODUCT_REQUEST, addProduct);
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProducts);
  yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProduct);

  



}


