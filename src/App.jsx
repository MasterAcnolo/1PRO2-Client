import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home.jsx";
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>

    </>
  );
}

export default App;
