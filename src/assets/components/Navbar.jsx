import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <header className='flex justify-center bg-indigo-500 item'>
      <Link to={"/"}></Link>
      <img src="public\icons8-recipe-50.png" style={{width:"40px"}} alt="" />
            <h1 className='font-poppins text-2xl font-bold text-white'>Find Recipes</h1>
    </header>
    </>
  )
}

export default Navbar