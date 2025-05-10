# OpenLabBookMobile (Health)

## Overview

**OpenLabBookMobile (Health)** is a React Native application designed to provide various health-related functionalities. This project leverages the Expo framework and integrates various libraries for state management, navigation, and UI components.

## Features

- **Navigation**: Built with `react-navigation` for a smooth user experience.
- **State Management**: Utilizes `redux` and `redux-saga` for managing application state and handling side effects.
- **Forms**: `formik` and `yup` are used for handling form state and validation.
- **UI Components**: `react-native-paper` and `react-native-vector-icons` are used for styling and icons.
- **Image Handling**: Includes `expo-image-picker` for selecting images and `react-native-reanimated-carousel` for creating carousels.
- **Location Services**: Integrated with `expo-location` for location-based features.
- **Offline Storage**: Uses `@react-native-async-storage/async-storage` for local data storage.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- Yarn (>= 4.x) or npm

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/OpenLabBookMobile.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd OpenLabBookMobile
   ```

3. **Install dependencies**:

   ```bash
   yarn install
   ```

   or

   ```bash
   npm install
   ```

### Running the Application

To start the development server and run the app on different platforms, use the following commands:

- **Start the project**:

  ```bash
  yarn start
  ```

  or

  ```bash
  npm start
  ```

- **Run on Android**:

  ```bash
  yarn android
  ```

  or

  ```bash
  npm run android
  ```

- **Run on iOS**:

  ```bash
  yarn ios
  ```

  or

  ```bash
  npm run ios
  ```

- **Run on Web**:

  ```bash
  yarn web
  ```

  or

  ```bash
  npm run web
  ```

## Folder Structure

- **`/src`**: Contains the source code for the application.
  - **`/components`**: Reusable components.
  - **`/screens`**: Different screens or pages of the application.
  - **`/redux`**: Redux-related files (actions, reducers, sagas).
  - **`/styles`**: Global styles and themes.
  - **`/utils`**: Utility functions and constants.
- **`/assets`**: Contains images, icons, and other static resources.

## Technologies Used

- **React Native**: 0.73.6
- **Expo**: 50.0.14
- **React Navigation**: 6.1.7
- **Redux**: 9.1.0
- **Redux Saga**: 1.3.0
- **Formik**: 2.4.5
- **Yup**: 1.4.0
- **React Native Reanimated**: 3.6.2
- **React Native Reanimated Carousel**: 3.5.1

## Contributing

If you want to contribute to the project, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make your changes**.
4. **Commit your changes**:

   ```bash
   git commit -am 'Add some feature'
   ```

5. **Push to the branch**:

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Create a new Pull Request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact:

- **Email**: skjasimuddin9153@example.com
- **GitHub**: [your-username](https://github.com/jasim0021)
