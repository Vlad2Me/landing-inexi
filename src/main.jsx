import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { setupScrollReveal } from './reveal.js'

window.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
