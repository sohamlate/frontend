import react from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import {useState,useEffect} from "react";
import toast from "react-hot-toast";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";


const BecomeSeller = ({setIsLoggedIn,user,setUser})=>{


    const location = useLocation();
    const [formData,setFormData] = useState({email:"",password:""});
    const [visible,Setvisible] = useState(true);

    const navigate = useNavigate();

    function changeHandler(event){
        setFormData((pre)=>({...pre,[event.target.id]:event.target.value}))
      }
  
  

      const submitHandler = async (e) => {
        e.preventDefault();
        try {
           // console.log(formData);
          const response = await axios.post(
            "https://backend-1-9nhi.onrender.com/api/v1/auth/changeAccountType",
            formData
          );
          console.log(response);
          setUser(response.data.newuser);
          toast.success("Account type change successfully");
          navigate("/");
      
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response.data.message); 
        }
      };
  


    return(
        <div className="flex flex-col w-[27%] h-[34rem] mt-[1rem] ml-[40%] border-[0.2rem] bg-white rounded-md text-md pb-[18%] px-[1rem]">
        <h1 className="text-2xl text-slate-600 mt-[2rem] text-center  mr-2">Welcome to Huehub Artist Community!</h1>
        <p className="font-thin mt-[0.5rem] text-center mr-2 px-[1rem]">Please enter your login credentials details to ensure it's you</p>
  
        <form onSubmit={submitHandler}   className="flex flex-col m-3 mt-[0.5rem] gap-y-3">
          <label className="  flex flex-col" htmlFor="email">
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
              <input className="w-[101%] pl-[2%] ml-[-1%] h-[100%]  bg-gray-100 border-none focus:border-none"
                  required
                  id="password"
                  type= {visible ? "text" : "password"}
                  placeholder=" Password"
                  value ={formData.password}
                  onChange={changeHandler}
              />
              <div onClick={()=>{Setvisible(!visible)}} className="cursor-pointer  mt-[-2rem] ml-[19rem] " >
                  {visible?   <FaRegEye />  : <FaRegEyeSlash />}
              </div>
          </div>

          <div className="mt-[0.5rem] text-red-600">
            Note: You are changing your account type to seller
          </div>
  
         
          
          <button  className=" border  px-[5%] py-[3%] mt-3 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
            Change Account Type
          </button>

        </form>
      </div>
    )
}

export default BecomeSeller;

