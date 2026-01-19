import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import PageLoader from "./helpers/loader/loader.jsx"

// Components
import Header from './components/layout/header/header.jsx';
import Footer from './components/layout/footer/footer.jsx';

// Pages
import Home from "./routes/Home.jsx";
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';

import Board from "./routes/Board.jsx";
import BoardList from "./routes/BoardList.jsx";


import { isLogged } from '../script/auth.js';

function App() {

  const navigate = useNavigate();

    useEffect(() => {
      // Check Login (If user connected)
            async function checkLogin() {
                const user = await isLogged(); // récupère l'utilisateur si connecté
                if (user) {
                    navigate("/"); // déjà connecté -> redirection
                }
            }
            // checkLogin();
      }, [navigate]);

  return (
    <>

      {/* <PageLoader /> */}

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/board/1" element={<Board />} /> {/* Le Chemin ici est temporaire. Il doit être remplacer plus tard par un meilleur chemin */}
        <Route path="/board" element={<BoardList />} />

      </Routes>

      <Footer />

    </>
  );
}

export default App;
