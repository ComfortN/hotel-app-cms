import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import AdminDashboard from './components/AdminDashboard';
import AccommodationForm from './components/AccommodationForm'
import ReservationManager from './components/reservationManager';
import UserManagement from './components/UserManager';
import Sidebar from './components/Sidebar';
import AccommodationManager from './components/AccommodationManager';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import AdminPage from './pages/AdminPage';
import GalleryManage from './pages/GalleryManage';
import ReviewsManager from './components/ReviewsManager';

function App() {
  return (
    <Router>
        <Container maxWidth="lg">
            
            <Routes>
              <Route path='/' element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
            <Route path='/admin/accommodations' element={<Layout><AccommodationManager /></Layout>} />
            <Route path='/admin/accommodations/new' element={<Layout><AccommodationForm /></Layout>} />
            <Route path="/admin/accommodations/edit/:id" element={<Layout><AccommodationForm /></Layout>} />
            <Route path="/admin/reservations" element={<Layout><ReservationManager /></Layout>} />
            <Route path="/admin/users" element={<Layout><UserManagement /></Layout>} />
            <Route path="/admin/profile" element={<Layout><AdminPage /></Layout>} />
            <Route path="/admin/gallery" element={<Layout><GalleryManage /></Layout>} />
            <Route path='/admin/reviews' element={<Layout><ReviewsManager /></Layout>} />
            
            </Routes>
        </Container>
        </Router>
  );
}

export default App;
