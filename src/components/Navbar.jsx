import React from 'react';
import LogoImage from '../assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link, NavLink } from 'react-router';
const Navbar = () => {

  const getNavLinkClass = ({ isActive }) => {
    const baseClass = "text-black font-medium transition duration-200 hover:text-[#632EE3]";
    const activeClass = "text-[#632EE3] font-bold underline underline-offset-4";

    return isActive ? activeClass : baseClass;
  };


  return (

    <div className="navbar bg-base-100 shadow-sm  max-w-7xl mx-auto">
      <div className="navbar-start flex items-center gap-2 ">
        <div className=''>
          <img src={LogoImage} alt="HERO.IO Logo" className='w-10 h-10 ' />
        </div>
        <div>
          <Link to='/'><h1 className=" text-[#632EE3] font-bold">HERO.IO</h1></Link>
        </div>
      </div>
      <div className="navbar-center  lg:flex">
        <ul className="menu menu-horizontal px-1 text-black font-medium space-x-8">
          <NavLink to='/' className={getNavLinkClass}>Home</NavLink>
          <NavLink to='/apps' className={getNavLinkClass}>Apps</NavLink>
          <NavLink to='/installation' className={getNavLinkClass}>Installation</NavLink>
        </ul>
      </div>
      <div className="navbar-end ">
        <NavLink to='/apps'
          className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white flex items-center space-x-2 rounded-lg"
          onClick={() => window.open('https://github.com/JannatunNayeemAnika')}
        >
          {/* <FontAwesomeIcon icon={faGithub} className="text-lg" /> */}
          <span>Contribute</span>
        </NavLink>
      </div>
    </div>

  );
};

export default Navbar;