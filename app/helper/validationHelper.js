const validationHelper = {
  required: value => value.trim() !== '' || 'This field is required',
  phone: value => /^[0-9]{10}$/.test(value),
  minLength: (value, length) =>
    value.length >= length || `Must be at least ${length} characters`,
  maxLength: (value, length) =>
    value.length <= length || `Must be less than ${length} characters`,
};

// Function to validate phone number
export const validatePhone = phone => {
  if (validationHelper.phone(phone)) {
    return false;
  }
  return true;
};
