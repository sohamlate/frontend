import React from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assests/bg3.jpg";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
const LoginPage = (props) => {
  let setIsLoggedIn = props.setIsLoggedIn;
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [visible, Setvisible] = useState(true);

  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((pre) => ({ ...pre, [event.target.id]: event.target.value }));
  }

  function resethandler() {
    navigate("/reset");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("hiii");
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      props.setUser(response.data.user);
      toast.success("Logged In ");
      props.socket.emit("login", {
        userId: response.data.user._id,
        socketId: props.socket.id,
      });
      navigate("/gallary");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "https://backend-tub9.onrender.com/api/v1/auth/google";
    } catch (error) {
      console.error("Error logging in with Google:", error);
      toast.error("Failed to log in with Google");
    }
  };

  return (
    <div className=" relative w-[screen] h-[100vh] text-white">
      <img src={logo} className="absolute top-0 w-full h-full " />
      <div className="flex flex-wrap justify-center items-center gap-x-20 w-full">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="z-30 max-w-96"
        >
          <p className="text-white text-5xl">
            "Experience the{" "}
            <ReactTyped
              strings={[
                "HueHub",
              ]}
              typeSpeed={40}
              backSpeed={50}
              className="text-[#f8ea4f]"
            >
            </ReactTyped>{" "}
            difference – where creativity thrives, inspiration blooms, and
            masterpieces begin."
          </p>
        </motion.div>
        <motion.div // Apply animation to the form
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center mt-5"
        >
          <div className=" w-[30vw]  min-w-[280px]">
            <div className="flex flex-col  backdrop-filter backdrop-blur-lg bg-transparent rounded-md text-md p-2 border border-black">
              <h1 className="text-2xl  mt-[2rem] text-center mr-2 text-">
                Welcome to Huehub!
              </h1>
              <p className="font-thin text-xl mt-[0.3rem] text-center mr-2">
                Please Sign-in to your account
              </p>

              <form
                onSubmit={submitHandler}
                className="flex flex-col  m-3 mt-[0.5rem] gap-y-2"
              >
                <label className="flex flex-col" htmlFor="email">
                  <p className="text-left text-xl font-semibold py-2">
                    Email<sup>*</sup>
                  </p>
                </label>
                <input
                  required
                  id="email"
                  className=" text-black px-2 rounded-md h-[3rem] bg-gray-100 border border-none"
                  type="email"
                  placeholder=" Email"
                  value={formData.email}
                  onChange={changeHandler}
                />

                <label htmlFor="password">
                  <p className="text-left text-xl font-semibold py-2">
                    Password<sup>*</sup>
                  </p>
                </label>
                <div className="w-full rounded-md  h-[3rem] bg-gray-100 relative">
                  <input
                    className=" text-black px-2 rounded-md h-[3rem] bg-gray-100 border border-none w-full"
                    required
                    id="password"
                    type={visible ? "text" : "password"}
                    placeholder=" Password"
                    value={formData.password}
                    onChange={changeHandler}
                  />
                  <div
                    onClick={() => {
                      Setvisible(!visible);
                    }}
                    className="cursor-pointer absolute right-2 top-5"
                  >
                    {visible ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                </div>

                <div className="form-link">
                  <div
                    onClick={resethandler}
                    className="forgot-pass hover:cursor-pointer text-red-600 font-bold"
                  >
                    Forgot password?
                  </div>
                </div>

                <button  className=" border text-center px-2  py-[3%] mt-5 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
                  LOGIN
                </button>
              </form>
              <div className="form-link">
                <span className="ml-4 blink">
                  Don't have an account?{" "}
                  <a href="/otp" className="link signup-link">
                    Signup
                  </a>
                </span>
              </div>

              <hr className=" border-b-2 border-gray-300 mt-6 "></hr>

              <div className="flex mt-[1rem] justify-evenly text-white">
                <button onClick={handleGoogleLogin}>
                  <FaGoogle />
                </button>
                <FaInstagram />
                <FaFacebook />
                <FaTwitter />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
