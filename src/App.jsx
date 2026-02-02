  import { Routes, Route, useLocation } from "react-router-dom";
  import { motion , AnimatePresence} from "framer-motion"

  // Components
  import Header from './components/header/header.jsx';
  import Footer from './components/footer/footer.jsx';

  // Pages
  import Home from "./routes/Home.jsx";
  import Login from './routes/Login.jsx';
  import Register from './routes/Register.jsx';

  import Board from "./routes/Board.jsx";
  import BoardList from "./routes/BoardList.jsx";

  function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
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

        <Header />

      <AnimatePresence mode="wait">

        <Routes location={location} key={location.pathname}> 
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />

          <Route path="/login" element={<PageWrapper><Login /></PageWrapper> } />
          <Route path="/register" element={<PageWrapper> <Register /> </PageWrapper> } />

          <Route path="/account" element={<PageWrapper></PageWrapper>} />

          <Route path="/board/:id" element={<PageWrapper><Board /></PageWrapper>} />
          <Route path="/board" element={<PageWrapper><BoardList /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

        <Footer />

      </>
    );
  }

  export default App;
