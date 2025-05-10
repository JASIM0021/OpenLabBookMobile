import * as Yup from 'yup';
const productValidationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    price: Yup.string().required('Price is required'),
    brand: Yup.string().required('Brand is required'),
  });
  const authValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
     // Validate password
  };
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  

  export default {productValidationSchema,authValidation , validateEmail,strongPasswordRegex}