import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import App from './app/App'
import ApplyPage from './app/ApplyPage'
import BookACallPage from './app/BookACallPage'
import BookACallBetaPage from './app/BookACallBetaPage'
import BookACallAusPage from './app/BookACallAusPage'
import BookACallEuPage from './app/BookACallEuPage'
import ThankYouPage from './app/ThankYouPage'
import ApplicationReceivedPage from './app/ApplicationReceivedPage'
import NotFoundPage from './app/NotFoundPage'
import PrivacyPage from './app/PrivacyPage'
import TermsPage from './app/TermsPage'
import GlobalNav from './components/GlobalNav'
import './styles/index.css'

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ minHeight: '100vh' }}
      >
        <Routes location={location}>
          <Route path="/" element={<App />} />
          <Route path="/submit-form" element={<ApplyPage />} />
          <Route path="/book-a-call" element={<BookACallPage />} />
          <Route path="/book-a-call-beta" element={<BookACallBetaPage />} />
          <Route path="/book-a-call-aus" element={<BookACallAusPage />} />
          <Route path="/book-a-call-eu" element={<BookACallEuPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/application-received" element={<ApplicationReceivedPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalNav />
      <AnimatedRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
