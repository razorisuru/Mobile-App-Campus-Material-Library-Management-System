# Campus Material Library Mobile App

A React Native mobile application for the Campus Material Library Management System, providing students with easy access to educational resources, books, and PDFs.

## Features

- **User Authentication**
  - Login and Registration
  - Profile Management
  - Secure Token-based Authentication

- **Book Management**
  - Browse Books by Categories
  - Search Books by Title or Author
  - Sort Books by Title, Author, or Date
  - Detailed Book Information View

- **PDF Services**
  - Access to Study Materials and PDFs
  - Category-based PDF Organization

- **Chat Assistant**
  - AI-powered Library Assistant
  - Book Recommendations
  - Study Material Help

- **UI Features**
  - Modern and Intuitive Interface
  - Category Filtering
  - Search Functionality
  - Pull-to-Refresh Updates
  - Bottom Navigation

## Prerequisites

- Node.js (14.0 or higher)
- npm or yarn
- Expo CLI
- Backend API Server ([Campus-Material-Library-Management-System](https://github.com/razorisuru/Campus-Material-Library-Management-System))

## Installation

1. Clone both the backend API and this mobile project:
    ```powershell
    # Clone the mobile app
    git clone https://github.com/razorisuru/Mobile-App-Campus-Material-Library-Management-System
    ```

2. Install dependencies:
    ```powershell
    # Using npm
    npm install

    # OR using yarn
    yarn install
    ```

3. Configure the environment:
   - Make sure your backend API is running
   - Update the API endpoint in `src/utils/axios.js` if needed

4. Start the development server:
    ```powershell
    npm start
    # OR
    yarn start
    ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── icons/         # Custom icons
├── screens/       # Application screens
├── services/      # Authentication and API services
└── utils/         # Utility functions and configurations
```

## Tech Stack

- React Native
- Expo
- Axios for API requests
- React Navigation
- Laravel Backend API
- Context API for state management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the Campus Material Library Management System.

## Related Projects

- [Campus-Material-Library-Management-System](https://github.com/razorisuru/Campus-Material-Library-Management-System) - Backend API and Web Interface
