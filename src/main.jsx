import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Header/>
    {/* <Footer/> */}
    
  </StrictMode>,
);