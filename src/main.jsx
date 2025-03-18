import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from '@react-oauth/google'; 

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <GoogleOAuthProvider clientId="http://93470150540-lbg03r6jfctm48l3nn6p5flmhniru635.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    </ThemeProvider>
)
