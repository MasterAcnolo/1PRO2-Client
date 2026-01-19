import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home.jsx";
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';

import Board from "./routes/Board.jsx";
import BoardList from "./routes/BoardList.jsx";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/board/1" element={<Board />} /> {/* Le Chemin ici est temporaire. Il doit être remplacer plus tard par un meilleur chemin */}
        <Route path="/board" element={<BoardList />} />


      </Routes>

    </>
  );
}

export default App;
