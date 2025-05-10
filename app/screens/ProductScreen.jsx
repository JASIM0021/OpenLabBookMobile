import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
  Text,
  RefreshControl,
  Alert,
} from 'react-native';
import { List, FAB, Button, Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductRequest,
  deleteProductsRequest,
  fetchProductsRequest,
  updateProductRequest,
} from '../features/saga/product/productActions';
import { Appbar } from 'react-native-paper';
import { IconButton, MD3Colors } from 'react-native-paper';
import { Formik } from 'formik';
import validations from '../validations';
import * as ImagePicker from 'expo-image-picker';
// import storage from '@react-native-firebase/storage'
import { startLoading, stopLoading } from '../features/slice/GlobalSlice';

const ProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loader } = useSelector(state => state.globalReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editModel, setEditModel] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    brand: '',
    imageUri: selectedImage,
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, []);

  const addProduct = (values, { resetForm }) => {
    dispatch(startLoading());
    if (editModel) {
      console.log('Product updating');
      dispatch(
        updateProductRequest({
          id: newProduct?.id,
          product: { ...values, imageUri: newProduct?.imageUri },
        }),
      );
      setEditModel(false);
      resetForm();
    } else {
      dispatch(
        addProductRequest({ product: { ...values, imageUri: selectedImage } }),
      );
      resetForm();
      setModalVisible(false);
      setNewProduct({
        id: '',
        name: '',
        price: '',
        brand: '',
        imageUri: '',
      });
    }
    dispatch(fetchProductsRequest());
  };

  const uploadImage = async image => {
    dispatch(startLoading());
    try {
      console.log('image', image?.assets[0]?.uri);
      // const reference = storage().ref('image');
      // const response = await fetch(image.assets[0].uri);
      // const blob = await response.blob();
      // await reference.put(blob);
      dispatch(stopLoading());
      return reference.getDownloadURL();
    } catch (error) {
      console.log('error', error);
      Alert.alert('Image upload faild check your connection');
      dispatch(stopLoading());
    }
  };

  const selectImage = async () => {
    console.log('image');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    try {
      const downloadUrl = await uploadImage(result);
      console.log('downloadUrl', downloadUrl);
      setNewProduct({ ...newProduct, imageUri: downloadUrl });
      setSelectedImage(downloadUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const toggleProductSelection = productId => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const deleteSelectedProducts = () => {
    dispatch(deleteProductsRequest({ productIds: selectedProducts }));
    setSelectedProducts([]);
    dispatch(fetchProductsRequest());
  };

  const logout = () => {
    // auth().signOut()
    navigation.navigate('Login');
  };

  const updateProduct = item => {
    setEditModel(true);
    setNewProduct(item);
    console.log('item', item);
  };

  const renderItem = ({ item }) => {
    // const urlParts = item?.imageUri?.split('.');
    // const extension = urlParts?.[urlParts?.length - 1]?.toLowerCase();

    // // Check if the extension is png or jpg
    // const isValidExtension = extension === 'png' || extension === 'jpg' || extension === 'jpeg';
    return (
      <List.Item
        key={item?.id}
        title={item.name}
        description={`Price: ${item.price}, Brand: ${item.brand}`}
        left={() => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={
                selectedProducts.includes(item.id) ? 'checked' : 'unchecked'
              }
              onPress={() => toggleProductSelection(item.id)}
            />
            <Image
              source={{ uri: item.imageUri }}
              style={styles.image}
              defaultSource={require('../../assets/noimage.png')}
            />
          </View>
        )}
        onPress={() => updateProduct(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {products?.length == 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>No Product found please add one </Text>
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={() => dispatch(fetchProductsRequest())}
            />
          }
          refreshing={loader}
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      {selectedProducts.length > 0 && (
        <Appbar.Header>
          <Appbar.Content
            title={`Selected ${selectedProducts.length} Product(s)`}
          />
          <Appbar.Action icon="delete" onPress={deleteSelectedProducts} />
        </Appbar.Header>
      )}
      <IconButton
        icon="logout"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => logout()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          setModalVisible(true);
          setNewProduct({});
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible || editModel}
        onRequestClose={() => {
          setModalVisible(false);
          setEditModel(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Formik
              initialValues={newProduct}
              onSubmit={addProduct}
              validationSchema={validations.productValidationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Product Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Price"
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price}
                    keyboardType="numeric"
                  />
                  {touched.price && errors.price && (
                    <Text style={styles.error}>{errors.price}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Brand"
                    onChangeText={handleChange('brand')}
                    onBlur={handleBlur('brand')}
                    value={values.brand}
                  />
                  {touched.brand && errors.brand && (
                    <Text style={styles.error}>{errors.brand}</Text>
                  )}
                  <View>
                    <Button onPress={selectImage}>Select Image</Button>
                    {newProduct?.imageUri && (
                      <Image
                        source={{ uri: newProduct?.imageUri }}
                        style={{ width: 200, height: 200 }}
                      />
                    )}
                  </View>
                  {touched.imageUri && errors.imageUri && (
                    <Text style={styles.error}>{errors.imageUri}</Text>
                  )}
                  <Button
                    mode="contained"
                    loading={loader}
                    style={{ marginBottom: 10 }}
                    onPress={handleSubmit}
                  >
                    {editModel ? 'Update' : 'Add'}
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => {
                      setModalVisible(false);
                      setEditModel(false);
                    }}
                  >
                    Cancel
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});

export default ProductScreen;
