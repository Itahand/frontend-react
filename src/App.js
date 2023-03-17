import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Buy from "./pages/Buy";
import CreatePiece from "./pages/CreatePiece";
import Listing from "./pages/Listing";
import Login from "./pages/Login";
import Menu from "./pages/Menu";

import Purchase from "./pages/Purchase";
import Pieces from "./pages/Pieces";
import Landing from "./pages/Landing"; 

function App() {


  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/createPiece" element={<CreatePiece />} />
        <Route path="/pieces" element={<Pieces />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/purchase" element={<Purchase/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
