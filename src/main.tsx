import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './app/App'
import ApplyPage from './app/ApplyPage'
import BookACallPage from './app/BookACallPage'
import ThankYouPage from './app/ThankYouPage'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/book-a-call" element={<BookACallPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
