# MSN Web Application

## Overview

This project is a web application built using Next.js with the App Router, React, Tailwind CSS, and NextAuth.js for authentication. The application provides functionalities for user registration, login, search, and viewing news articles. It also supports multi-language localization and user notifications preferences.

## Design

The design of the application is based on a modern, clean, and responsive layout. The main components include:

- **Header**: Contains the logo, search bar, user profile icon, and language selection.
- **Search Page**: Displays the search results, including the total number of results, categories, and news articles.
- **Registration Page**: Allows users to register with detailed information including name, surname, email, password, country, and city.
- **Login Page**: Allows users to log in using their email and password or Google account.
- **User Notifications**: Users can toggle notifications on or off, which is stored in both the database and session.

## Data Model

The primary data model includes the following entities:

### User
- `name`: String
- `surname`: String
- `email`: String
- `password`: String (hashed)
- `profileImage`: String (URL to profile image)
- `country`: String
- `city`: String
- `notifications`: Boolean (indicates whether the user wants notifications)

### Category
- `name`: String

### Language
- `name`: String
- `code`: String

### News
- `title`: String
- `content`: String
- `category`: String
- `source`: String
- `imgSrc`: String (URL to news image)

### Session
- Stores user authentication state and preferences (e.g., notifications)

## Assumptions

- Users will have unique email addresses.
- The news articles are stored in a MongoDB database.
- User passwords are securely hashed before being stored.
- The application uses JWT for handling sessions and authentication.
- The language preferences and translations are managed using `next-i18next`.

## Problems Encountered

- **Localization Issues**: Initially, there were issues with setting up and managing multi-language support using `next-i18next`. Ensuring the translations loaded correctly and were applied dynamically was challenging.
- **Session Management**: Integrating session management with NextAuth.js while maintaining user preferences (such as notification settings) required careful handling to ensure data consistency.
- **Search Functionality**: Implementing a robust search functionality that accurately retrieves and displays results based on user queries, including handling of categories and result counts.
- **API Rate Limiting**: Ensuring the application handles API rate limits gracefully, especially during heavy search operations.
- **Responsive Design**: Making sure the application is fully responsive and works well across different devices and screen sizes.

## Setup and Installation

To set up and run the project locally:

1. Clone the repository:

  ```
  git clone https://github.com/krycnylmz/msn-web-slimmed-version.git
  cd msn-web-slimmed-version
  ```

2. Install dependencies:
  ```
  npm install
  ```

3. Create a .env file and add the necessary environment variables:

  ```
  NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret
  JWT_SECRET=your-jwt-secret
  MONGODB_URI=your-mongodb-connection-string
  ```


4. Run the development server:

  ```
  npm run dev
  ```