// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';
import Post from './pages/Post';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;