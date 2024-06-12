import React from 'react';
import Navbar from './assets/components/Navbar';
import Finder from './assets/components/Finder';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Recipedetails from './pages/Recipedetails';
const App = () => {
  <Link to={"/"}>Home</Link>
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Finder />} />
          <Route path="/recipedetails/:id" element={<Recipedetails />} />
          </Routes>
      </Router>
    </>
  );
};

export default App;
