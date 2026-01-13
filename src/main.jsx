import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from '../components/header/header.jsx';

createRoot(document.getElementById('body')).render(
  <StrictMode>

    <Header/>

    
  </StrictMode>,
);