import React from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import {useState,useEffect} from "react";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";



const LoginPage = (props) => {
    let setIsLoggedIn = props.setIsLoggedIn;
    const location = useLocation();
    const [formData,setFormData] = useState({email:"",password:""});
    const [visible,Setvisible] = useState(true);

    const navigate = useNavigate();

   

  

    function changeHandler(event){
      setFormData((pre)=>({...pre,[event.target.id]:event.target.value}))
    }

    function resethandler(){
      navigate("/reset");
    }

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://backend-1-9nhi.onrender.com/api/v1/auth/login",
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

       window.location.href = "https://backend-1-9nhi.onrender.com/api/v1/auth/google";
     
    
    //    localStorage.setItem('token', response.data.token);
    //    setIsLoggedIn(true);
    //   //  const response = await axios.get('https://backend-1-9nhi.onrender.com/api/v1/auth/google');
    // //    console.log('Google login response:', response.data);
    //     // Handle successful login response (if needed)
    //    toast.success('Logged in with Google');
      //  navigate('/gallary'); // Navigate to the gallery page after successful login
      }catch (error) {
        console.error('Error logging in with Google:', error);
        // Handle error (if needed) 
        toast.error('Failed to log in with Google');
      }
    };

  return (
    <div className="flex flex-col lg:max-w-[27%] h-[34rem] mt-[5rem] xs:mx-[5%] sm:mx-[30%]  md:mx-[30%] lg:mx-[32%] xl:mx-[35%] border-[0.2rem] bg-white rounded-md text-md pb-[18%] px-[1rem]">
      <h1 className="text-2xl text-slate-600 mt-[2rem] text-center  mr-2">Welcome to Huehub!</h1>
      <p className="font-thin mt-[0.3rem] text-center mr-2">Please Sign-in to your account</p>

      <form  onSubmit={submitHandler} className="flex flex-col m-3 mt-[0.5rem] gap-y-3">
        <label className="flex flex-col" htmlFor="email">
          <p className="text-left py-2">Email<sup>*</sup></p>
        </label>
          <input
            required
            id="email"
            className="rounded-[2%] text-black pl-[2%] h-[3rem] bg-gray-100 border focus:border-blue-600"
            type="email"
            placeholder=" Email"
            value={formData.email}
            onChange={changeHandler}
          />
          
        <label htmlFor="password">
          <p className="text-left py-2">Password<sup>*</sup></p>
        </label>
        <div  className="w-full rounded-md pl-[2%] h-[3rem]  bg-gray-100 ">
            <input className="w-[101%] ml-[-1%] h-[100%]  bg-gray-100 border-none focus:border-none"
                required
                id="password"
                type= {visible ? "text" : "password"}
                placeholder=" Password"
                value ={formData.password}
                onChange={changeHandler}
            />
            <div onClick={()=>{Setvisible(!visible)}} className="cursor-pointer  mt-[-2rem] xs:ml-[88%]" >
                {visible?   <FaRegEye />  : <FaRegEyeSlash />}
            </div>
        </div>

        <div className="form-link">
            <div  onClick={resethandler} className="forgot-pass hover:cursor-pointer hover:text-opacity-45">Forgot password?</div>
        </div>
        <button  className=" border  px-[5%] py-[3%] mt-5 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
          LOGIN
        </button>
      </form>
      <div className="form-link">
        <span>Don't have an account? <a href="/otp" className="link signup-link">Signup</a></span>
    </div>

    <hr className=" border-b-2 border-gray-300 mt-6 "></hr>
    
    <div className="flex mt-[1rem] justify-evenly">
    <button onClick={handleGoogleLogin}>
        <FaGoogle /> 
      </button>
    <FaInstagram />
    <FaFacebook />
    <FaTwitter />
    </div>


    </div>
  );
};

export default LoginPage;
