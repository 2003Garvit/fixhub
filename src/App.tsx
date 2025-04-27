import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BrowseRepairersPage from './pages/BrowseRepairersPage';
import AddRepairerPage from './pages/AddRepairerPage';
import BrowseRequestsPage from './pages/BrowseRequestsPage';
import AddRequestPage from './pages/AddRequestPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { RepairProvider } from './context/RepairContext';

// Import the PrivateRoute component to protect certain routes
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <RepairProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/repairers" element={<BrowseRepairersPage />} />
              <Route path="/requests" element={<BrowseRequestsPage />} />

              {/* Protect the 'Add Repairer' and 'Add Request' pages with PrivateRoute */}
              <Route element={<PrivateRoute />}>
                <Route path="/repairers/add" element={<AddRepairerPage />} />
                <Route path="/requests/add" element={<AddRequestPage />} />
              </Route>

              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </RepairProvider>
  );
}

export default App;
