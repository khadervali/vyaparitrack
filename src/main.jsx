import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Check for saved theme preference or use device preference
const getThemePreference = () => {
  const savedTheme = localStorage.getItem('vyaparitrack-theme');
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme class to document
const theme = getThemePreference();
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)