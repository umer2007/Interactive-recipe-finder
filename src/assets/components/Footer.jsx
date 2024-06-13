import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold font-poppins">Made By Umer Alam</div>
        <ul>
            <li>
  <p>Email: <a href="mailto:umaralamlhr@gmail.com" target="_blank" className='font-poppins'>umaralamlhr@gmail.com</a></p>
</li>

            <li><p>GitHub: <Link to={"https://github.com/umer2007?tab=repositories"}target='_blank' className='font-poppins'>Muhammad Umer Alam</Link></p></li>
        </ul>
        
      </div>
    </footer>
  );
};

export default Footer;
