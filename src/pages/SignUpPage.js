import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../assests/bg3.jpg";
import signImage from "../assests/artists.jpg";
const SignUpPage = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    contactNumber: "",
  });
  const [visible, Setvisible] = useState(true);
  const [visible1, Setvisible1] = useState(true);
  const [accountType, setAccountType] = useState("Customer");

  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((pre) => ({ ...pre, [event.target.id]: event.target.value }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formDataWithAccountType = { ...formData, accountType };
      console.log(formDataWithAccountType);
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/auth/signup",
        formDataWithAccountType
      );
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      navigate("/gallary");
      toast.success("Logged In ");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative w-[screen] h-[100vh]">
      <img src={logo} className="absolute top-0 w-full h-full " />
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[280px] absolute  top-10 border-[0.2rem] backdrop-filter backdrop-blur-lg bg-transparent rounded-md text-md ">
          <h1 className="text-2xl text-black mt-[1rem] text-center  mr-2">
            Welcome to Huehub!
          </h1>
          <p className="font-thin mt-[0.3rem] text-center text-black mr-2">
            Please enter your details
          </p>

          <div className="flex justify-center items-center w-fit mt-[0.5rem]  px-1 bg-blue-600 rounded-full  text-white">
            <button
              onClick={() => {
                setAccountType("Customer");
              }}
              className={`${
                accountType === "Customer" ? "bg-blue-500 text-slate-150" : ""
              }  py-3 px-7 rounded-full transition-all duration-500`}
            >
              User
            </button>
            <button
              onClick={() => {
                setAccountType("Seller");
              }}
              className={`${
                accountType === "Seller" ? "bg-blue-500 text-slate-150 " : ""
              }  py-3 px-7 rounded-full transition-all duration-500`}
            >
              Seller
            </button>
          </div>

          <form
            className="flex flex-col mx-2 mt-[0.5rem] gap-y-2 w-full"
            onSubmit={submitHandler}
          >
            <div className="flex justify-center items-center gap-x-2 w-full px-2">
              <div className="flex flex-col w-[50%]">
                <label htmlFor="firstname">
                  <p className="text-left py-1 ">
                    Firstname<sup>*</sup>
                  </p>
                </label>
                <input
                  required
                  id="firstname"
                  className=" text-black h-[2.5rem] bg-gray-100 focus:border-none  rounded-md px-1"
                  type="text"
                  placeholder=" Firstname"
                  value={formData.firstname}
                  onChange={changeHandler}
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <label htmlFor="lastname">
                  <p className="text-left py-1">
                    Lastname<sup>*</sup>
                  </p>
                </label>
                <input
                  required
                  id="lastname"
                  className="text-black h-[2.5rem] bg-gray-100 focus:border-none  rounded-md px-1"
                  type="text"
                  placeholder=" Lastname"
                  value={formData.lastname}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="w-full px-2">
              <label className="flex flex-col " htmlFor="email">
                <p className="text-left ml-2 ">
                  Email<sup>*</sup>
                </p>
              </label>
              <input
                required
                id="email"
                className="rounded-md text-black w-full px-2 h-[2.5rem] bg-gray-100 border focus:border-blue-600"
                type="email"
                placeholder=" Email"
                value={formData.email}
                onChange={changeHandler}
              />
            </div>

            <div className="flex gap-x-2 px-2 ">
              <div className="flex flex-col w-[50%]">
                <label htmlFor="password">
                  <p className="text-left py-1">
                    Create Password<sup>*</sup>
                  </p>
                </label>
                <div className="w-full relative rounded-md  h-[2.5rem]  bg-gray-100 ">
                  <input
                    className="w-full h-[100%] rounded-md bg-gray-100 border-none focus:border-none"
                    required
                    id="password"
                    type={visible ? "text" : "password"}
                    placeholder=" Create Password"
                    value={formData.password}
                    onChange={changeHandler}
                  />
                  <div
                    onClick={() => {
                      Setvisible(!visible);
                    }}
                    className="cursor-pointer absolute right-1 -mt-7 ml-[9rem] "
                  >
                    {visible ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-[50%]">
                <label htmlFor="con-password" className="">
                  <p className="text-left py-1 ">
                    Conform Password<sup>*</sup>
                  </p>
                </label>
                <div className="w-full relative rounded-md  h-[2.5rem]  bg-gray-100 ">
                  <input
                    className="w-full h-[100%] rounded-md bg-gray-100 border-none focus:border-none"
                    required
                    id="confirmPassword"
                    type={visible1 ? "text" : "password"}
                    placeholder=" Conform Password"
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                  />
                  <div
                    onClick={() => {
                      Setvisible1(!visible1);
                    }}
                    className="cursor-pointer absolute right-1 -mt-7 "
                  >
                    {visible1 ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2 w-full">
              <label className="flex flex-col" htmlFor="contactNumber">
                <p className="text-left py-1 ">
                  contactNumber<sup>*</sup>
                </p>
              </label>
              <input
                required
                id="contactNumber"
                className="rounded-md w-full text-black  h-[2.5rem] bg-gray-100 border focus:border-blue-600"
                type="text"
                placeholder=" Contact no"
                value={formData.contactNumber}
                onChange={changeHandler}
              />
            </div>
            <div className="px-2 w-full">
              <label className="flex flex-col" htmlFor="OTP">
                <p className="text-left ">
                  OTP<sup>*</sup>
                </p>
              </label>
              <input
                required
                id="otp"
                className="rounded-md w-full text-black pl-[2%] h-[2.5rem] bg-gray-100 border focus:border-blue-600"
                type="text"
                placeholder="OTP"
                value={formData.otp}
                onChange={changeHandler}
              />
            </div>

            <button className=" border m-3 py-[3%] mt-3 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
