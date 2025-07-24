# Blog Application

A modern blog application built with React and Firebase, featuring user authentication, post management, and a responsive design. This project includes a home page to display posts, a detailed post view, an admin panel for creating posts, and fixed navigation and footer components.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features
- **User Authentication**: Login and signup functionality using Firebase Authentication.
- **Post Management**: Create and view posts in an admin panel with Firestore integration.
- **Responsive Design**: Fully responsive layout using Bootstrap and custom CSS.
- **Fixed Navigation and Footer**: Persistent navbar and footer with smooth animations.
- **Loading States**: Loading spinners during authentication and data fetching.
- **Post Details**: View individual post details with a "Read More" link from the home page.

## Demo
[Insert demo link here] *(Update this with a live demo URL if deployed, e.g., on Vercel or Netlify)*

## Installation

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)
- Firebase account for Authentication and Firestore

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-app.git
   cd blog-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication (Email/Password) and Firestore.
   - Copy your Firebase configuration and create a `src/firebase.ts` file with the following content:
     ```tsx
     import { initializeApp } from 'firebase/app';
     import { getAuth } from 'firebase/auth';
     import { getFirestore } from 'firebase/firestore';

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const db = getFirestore(app);
     ```
     Replace the placeholders with your Firebase config values.
4. Set Firestore Rules (in Firebase Console):
   ```json
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /posts/{postId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
5. Start the development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage
- **Home Page (`/`)**: View a list of all posts with a "Read More" link for details.
- **Post Page (`/post/:id`)**: View the full content of a selected post.
- **Login (`/login`)**: Log in with your email and password.
- **Sign Up (`/signup`)**: Create a new account.
- **Admin Panel (`/admin`)**: Create new posts (requires login).
- Navigate using the fixed navbar and footer links.

## File Structure
```
blog-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LogoutButton.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── Home.tsx
│   │   └── Post.tsx
│   ├── routes/
│   │   └── PrivateRoute.tsx
│   ├── firebase.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used
- **React**: Frontend framework.
- **Firebase**: Authentication and Firestore for data storage.
- **Bootstrap**: Responsive design framework.
- **CSS**: Custom styling with animations.
- **TypeScript**: Type safety for React components.

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.

## Acknowledgments
- Inspired by modern blog application designs.
- Thanks to the xAI community for support and ideas.
