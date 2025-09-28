import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PrimeReactProvider } from 'primereact/api';
// import './styles/theme.css';
import "primereact/resources/themes/md-light-deeppurple/theme.css";
import 'primereact/resources/primereact.min.css';
// /primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
// import "primeflex/primeflex.css"; //flex

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
  </StrictMode>,
)
