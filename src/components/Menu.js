import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useRef, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";


const Menu = ({ user, setIsLoggedIn, setUser, isLoggedIn, setismenu }) => {
  console.log(user);
  const userId = user._id;
  const navigate = useNavigate();


  const logOutHandler = () => {
    setUser("");
    setIsLoggedIn(!isLoggedIn);
    localStorage.clear();
    toast.success("Logged Out Successfully");
  };


  const myProductHandler = async() => {
    navigate("/myproduct");
  };

  const dropdownRef = useRef();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setismenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);



  return (
    <div
      ref={dropdownRef}
      className=" p-2 rounded-md border shadow-lg w-[18rem] bg-slate-400 max-w-72 transition-all duration-1000 select-none"
    >

         {user && <div className="flex justify-center text-white items-center gap-x-3 transition-all duration-1000">
            <div className="w-10">
              <img src={user.image} className=" w-10 rounded-full " />
            </div>
            <div className="flex flex-col">
              <div>
                <span className="left-0 font-bold text-xl">
                  {user.firstname} {user.lastname}
                </span>
              </div>
              
            </div>
         
          </div>}
        
        
          <div className="flex flex-col justify-center items-center gap-y-3 transition-all duration-1000">
            {user && <div
              onClick={myProductHandler}
              className="bg-blue-500 cursor-pointer p-1 text-center w-[95%] text-white rounded-md  mt-3 hover:scale-105 hover:bg-blue-600  hover:shadow-md hover:shadow-sky-400 transition-all duration-500"
            >
              <div className="flex justify-center items-center gap-x-2">
                <LuLayoutDashboard />
                <p>My Product</p>
              </div>
            </div>}
            <div className="bg-blue-500 cursor-pointer p-1 text-center w-[95%] text-white rounded-md hover:shadow-md hover:shadow-sky-400  hover:scale-105 hover:bg-blue-600 transition-all duration-500">
              <div className="flex justify-center items-center gap-x-2">
                <FaUserEdit />
                <p>Edit Profle</p>
              </div>
            </div>
           { isLoggedIn &&  <div
                onClick={() => logOutHandler()}
                className=" bg-red-500 cursor-pointer p-1 text-center w-[95%] text-white rounded-md hover:shadow-md hover:shadow-red-400 hover:scale-105 hover:bg-red-600 transition-all duration-500"
              >
              <div className="flex justify-center items-center gap-x-2">
              <IoMdLogOut />
                <p>LogOut</p>
              </div>
              </div>}
          </div>

          <div className=" ">
            <p  className="mt-[3rem] text-white">MENU</p>
              <li>
              <NavLink to="/" href="#" className="block py-2 px-3 text-white bg-blue-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</NavLink>
              </li>
              <li>
              <NavLink to="/gallary" href="#" className="block py-2 px-3 text-white bg-blue-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gallery</NavLink>
              </li>
              <li>
              <NavLink to="/about" href="#" className="block py-2 px-3 text-white bg-blue-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</NavLink>
              </li>
              <li>
              <NavLink to="/contact" href="#" className="block py-2 px-3 text-white bg-blue-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</NavLink>
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

          <div className="flex ml-[2.5rem] mt-[1rem]">

          {!isLoggedIn && (
          <li className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
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
        </div>

          </div>

     
    </div>
  );
};

export default Menu;

