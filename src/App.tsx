import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { GigPage } from './pages/GigPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateGigPage } from './pages/CreateGigPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { useState } from 'react';
import { Toast } from './components/Feedback';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gig/:id" element={<GigPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-gig" element={<CreateGigPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />

        <AnimatePresence>
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}
