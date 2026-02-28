// React
import { Routes, Route, useLocation, Navigate  } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Toast from './components/toast/toast.jsx';

// Pages
import Home from "./routes/Home.jsx";

import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import Account from './routes/Account.jsx';

import Board from "./routes/Board.jsx";
import BoardList from "./routes/BoardList.jsx";

import Contact from "./routes/Contact.jsx";

import Legal from './routes/Legal.jsx';
import Data from './routes/Data.jsx';
import Sitemap from './routes/Sitemap.jsx';

import Forbidden from "./routes/error/403.jsx";
import NotFound from "./routes/error/404.jsx";
import UnknownError from "./routes/error/Unknown.jsx";

// Wrapper qui va permettre de nous faire avoir l'animation, on envoie la page en props
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{ minHeight: "100vh"}}
    >
      {children}
    </motion.div>
  );
}

function App() {

  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <Header />

      <Toast />

      <main>
        <AnimatePresence mode="wait">

          <Routes location={location} key={location.pathname}> 
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/account" element={<PageWrapper><Account /></PageWrapper>} />

            <Route path="/board/:id" element={<PageWrapper><Board /></PageWrapper>} />
            <Route path="/board" element={<PageWrapper><BoardList /></PageWrapper>} />

            <Route path="/f" element={<PageWrapper><Forbidden/></PageWrapper>} />
            <Route path="/n" element={<PageWrapper><NotFound/></PageWrapper>} />
            <Route path="/u" element={<PageWrapper><UnknownError/></PageWrapper>} />

            <Route path="/mentions-legales" element={<PageWrapper><Legal /></PageWrapper>} />
            <Route path="/vos-donnees" element={<PageWrapper><Data /></PageWrapper>} />
            <Route path="/plan-du-site" element={<PageWrapper><Sitemap /></PageWrapper>} />

            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />

            <Route path="*" element={<Navigate to="/n" replace />} /> {/* Replace supprime la dernière entrée de l'historique (évite d'y retourner)*/}
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

    </>
  );
}

export default App;