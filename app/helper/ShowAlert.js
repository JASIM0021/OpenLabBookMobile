import { showMessage, hideMessage } from "react-native-flash-message";

const showError = (message) => {
  showMessage({
    message,
    type: "danger",
    icon: "danger",
  });
};
const showSuccess = (message) => {
  showMessage({
    message,
    type: "success",
    icon: "success",
  });
};
const showWarn = (message) => {
  showMessage({
    message,
    type: "info",
    icon: "info",
  });
};


export const ShowAlertMsg = { showError, showSuccess ,showWarn};