import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useRef, useEffect } from "react";
import axios from "axios";


const Profile = ({ user, setIsLoggedIn, setUser, isLoggedIn, setIsClick }) => {
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

  const editProfileHandler = async() => {
    navigate("/editprofile");
  };

  const dropdownRef = useRef();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClick(false);
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
      className="bg-white p-2 rounded-md border shadow-lg max-w-72 transition-all duration-1000 select-none"
    >

          <div className="flex justify-center items-center gap-x-3 transition-all duration-1000">
            <div className="w-10">
              <img src={user.image} className=" w-10 rounded-full " />
            </div>
            <div className="flex flex-col">
              <div>
                <span className="left-0 font-bold text-xl">
                  {user.firstname} {user.lastname}
                </span>
              </div>
              <div>
                <span className=" overflow-x-clip overflow-ellipsis overflow-hidden whitespace-nowrap text-sm">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-3 transition-all duration-1000">
            <div
              onClick={myProductHandler}
              className="bg-blue-500 cursor-pointer p-1 text-center w-[70%] text-white rounded-md  mt-3 hover:scale-105 hover:bg-blue-600  hover:shadow-md hover:shadow-sky-400 transition-all duration-500"
            >
              <div className="flex justify-center items-center gap-x-2">
                <LuLayoutDashboard />
                <p>My Product</p>
              </div>
            </div>
            <div className="bg-blue-500 cursor-pointer p-1 text-center w-[70%] text-white rounded-md hover:shadow-md hover:shadow-sky-400  hover:scale-105 hover:bg-blue-600 transition-all duration-500">
              <div onClick={editProfileHandler} className="flex justify-center items-center gap-x-2">
                <FaUserEdit />
                <p>Edit Profle</p>
              </div>
            </div>
            <div
              onClick={() => logOutHandler()}
              className=" bg-red-500 cursor-pointer p-1 text-center w-[70%] text-white rounded-md hover:shadow-md hover:shadow-red-400 hover:scale-105 hover:bg-red-600 transition-all duration-500"
            >
            <div className="flex justify-center items-center gap-x-2">
            <IoMdLogOut />
              <p>LogOut</p>
            </div>
            </div>
          </div>

     
    </div>
  );
};

export default Profile;
