import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import RoomRentals from './pages/RoomRentals';
import RoomDetail from './pages/RoomDetail';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alquiler-salas" element={<RoomRentals />} />
          <Route path="/alquiler-salas/:roomId" element={<RoomDetail />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
