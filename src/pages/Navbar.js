import React from "react";
import Logo from "../assests/logo.png";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";
import { useState ,useEffect} from "react";
import Profile from "../components/Profile";
import Menu from "../components/Menu";

const Navbar = ({ user, setUser, isLoggedIn, setIsLoggedIn }) => {
  const [isclick, setIsClick] = useState(false);
  const [ismenu, setismenu] = useState(false);
  //const [isseller,setIsSeller] = useState(false);
 // console.log("plls",user);




    
  return (
    <nav className=" border-gray-200 bg-blue-800">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 ">

    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://res.cloudinary.com/dsy3ebkqc/image/upload/v1712813661/image-removebg-preview_2_z62obq.png" className="h-[3.5rem] w-[13rem] my-[-0.7rem] " alt="Huehub Logo" />
        {/* <NavLink className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</NavLink> */}
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg onClick={() => setismenu(!ismenu)} className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
        <div className="absolute left-1  z-50 mt-[34rem] text-center">
              {ismenu && (
                <Menu
                  user={user}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn ={isLoggedIn}
                  setismenu={setismenu}
                  ismenu={ismenu}
                />
              )}
            </div>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-blue-600 md:dark:bg-blue-800 dark:border-gray-700">
        <li>
          <NavLink to="/" href="#" className="block py-2 px-3 text-blue-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</NavLink>
        </li>
        <li>
          <NavLink  to="/gallary" href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gallery</NavLink>
        </li>
        <li>
          <NavLink href="#" to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</NavLink>
        </li>
       
    
        <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {
            user._id && user?.accountType==="Seller" && 
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            <NavLink to="/sellerpage">Sell</NavLink>
          </li>
          }
          {
            user._id &&  user?.accountType !=="Seller" && 
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            <NavLink to="/becomeseller">Become a Seller</NavLink>
          </li>
          }

          </ul>
          </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-blue-600 md:dark:bg-blue-800 dark:border-gray-700">

        {!isLoggedIn && (
          <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
             <NavLink to="/login">
                Login
              </NavLink>
          </li>
         
        )}
        {!isLoggedIn && (
           <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          <NavLink to="/otp">
            <button>Sign Up</button>
          </NavLink>
          </li>
        )}

        
        {  <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          <NavLink to="/cart">
            <FaCartShopping className="text-[1.5rem]" />
          </NavLink>
          </li>
        
          
        }

        {isLoggedIn && (
          
          <div className="relative ">
            <img  onClick={() => setIsClick(!isclick)} className="w-[2rem] rounded-full " src={user.image}></img>
            <div className="absolute right-0  z-50">
              {isclick && (
                <Profile
                  user={user}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn ={isLoggedIn}
                  setIsClick={setIsClick}
                  isclick={isclick}
                />
              )}
            </div>
          </div>
        )}

        
      
      </ul>
        
    </div>
  </div>
</nav>


  );
};

export default Navbar;

