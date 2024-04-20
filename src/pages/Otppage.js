import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../assests/bg3.jpg";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

const SignUpPage = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "" });
  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((pre) => ({ ...pre, [event.target.id]: event.target.value }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/auth/sendOTP",
        formData
      );
      navigate("/signup");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative w-screen h-screen top-0 flex flex-wrap gap-x-20 justify-center items-center">
      <img src={logo} className="absolute top-0 w-full h-full " />
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="z-30 max-w-96"
      >
        <p className="text-white lg:text-5xl md:text-4xl mx-[1rem]  xs:text-3xl  block">
          "Experience the{" "}
          <ReactTyped
            strings={["HueHub"]}
            typeSpeed={200}
            backSpeed={200}
            loop
            className="text-[#f8ea4f]"
          ></ReactTyped>{" "}
          difference – where creativity thrives, inspiration blooms, and
          masterpieces begin."
        </p>
      </motion.div>

      <motion.div // Apply animation to the form
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className=""
      >
        <div className=" mx-[0.4rem]  xs:w-[22rem] md:h-[19rem] backdrop-filter backdrop-blur-lg  bg-transparent rounded-md   xs:h-[17rem] lg:h-[17rem] border text-white border-black text-md pb-[18%] px-[1rem]">
          <h1 className="text-2xl mt-[2rem] text-center  mr-2">
            Welcome to Huehub!
          </h1>
          <p className="font-thin mt-[0.3rem] text-center  mr-2">
            Please enter your details
          </p>
          <form
            className="flex flex-col mx-3 mt-[0.5rem] gap-y-3"
            onSubmit={submitHandler}
          >
            <label className="flex flex-col" htmlFor="email">
              <p className="text-left pt-1">Email<sup>*</sup></p>
            </label>
            <input
              required
              id="email"
              className="rounded-[2%] text-black pl-[2%]  h-[3rem] bg-gray-100 border focus:border-blue-600"
              type="email"
              placeholder=" Email"
              value={formData.email}
              onChange={changeHandler}
            />

            <button className=" border  px-[5%] py-[3%] mt-2 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
              Generate Otp
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
