import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='flex justify-between items-center bg-indigo-500 py-4 px-6'>
      <div className="flex items-center">
        <Link to={"/"} className="text-white font-bold text-lg font-poppins mr-4">Home</Link>
        <Link to={"/favorites"} className="text-white font-bold text-lg font-poppins">Favourites</Link>
      </div>
      <div className="flex items-center">
        <img src="public\icons8-recipe-50.png" style={{width:"40px"}} />
        <h1 className='font-poppins text-2xl font-bold text-white ml-4'>Find Recipes</h1>
      </div>
    </header>
  );
};

export default Navbar;
