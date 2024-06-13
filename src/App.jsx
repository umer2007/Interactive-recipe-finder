import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/components/Navbar';
import Finder from './assets/components/Finder';
import Footer from './assets/components/Footer';
import Recipedetails from './pages/Recipedetails';
import Favorites from './pages/Favorites';
import backgroundImage from '../public/images/pexels-chanwalrus-958545.jpg';

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (meal) => {
    // Check if meal with idMeal already exists in favorites
    if (!favorites.some((favorite) => favorite.idMeal === meal.idMeal)) {
      setFavorites((prevFavorites) => [...prevFavorites, meal]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Finder addToFavorites={addToFavorites} />} />
            <Route path="/recipedetails/:id" element={<Recipedetails />} />
            <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
