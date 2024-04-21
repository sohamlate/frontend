import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation } from 'react-router-dom';



const ResetPass = ()=>{
    const [formData,setFormData] = useState({password:"",confirmPassword:""});
    const [visible,Setvisible] = useState(true);
    const [visible1,Setvisible1] = useState(true);
   
    const navigate = useNavigate();

    function changeHandler(event){
        setFormData((pre)=>({...pre,[event.target.id]:event.target.value}))
      }
  

      const location = useLocation();
      const token = location.pathname.split('/')[2]; 

    const submitHandler= async(e)=>{
      e.preventDefault();
      try {
        const formDataWithtoken = {...formData, token};
        const response = await axios.post('https://backend-tub9.onrender.com/api/v1/auth/resetPasswordToken', formDataWithtoken);
        console.log('Response:', response.data);
        navigate('/login');
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.response.data.message); 
      }
    }



    return (
        <div className="flex flex-col w-[27%] mt-5 h-[25rem] ml-[40%] border-[0.2rem] bg-gradient-to-br from-sky-200 to-white rounded-md text-md pb-[18%] px-[1rem]">
        <h1 className="text-2xl text-slate-600 mt-[2rem] text-center  mr-2">Welcome to Huehub!</h1>
        <p className="font-thin mt-[0.3rem] text-center  mr-2">Please enter your details</p>

        <form className="flex flex-col mx-3 mt-[0.5rem] gap-y-3" onSubmit={submitHandler}>
        <div className="flex flex-col ">
                <label htmlFor="password">
                    <p className="text-left py-1">Create Password<sup>*</sup></p>
                </label>
                <div  className="w-full rounded-md pl-[2%] h-[2.5rem]  bg-gray-100 ">
                    <input className="w-[101%] ml-[-1%] h-[100%]  bg-gray-100 border-none focus:border-none"
                        required
                        id="password"
                        type= {visible ? "text" : "password"}
                        placeholder=" Create Password"
                        value ={ formData.password}
                        onChange={changeHandler}
                    />
                    <div onClick={()=>{Setvisible(!visible)}} className="cursor-pointer absolute mt-[-1.75rem] ml-[19rem] " >
                        {visible?   <FaRegEye />  : <FaRegEyeSlash />}
                    </div>
                </div>
            </div>

            <div className="flex flex-col ">
            <label htmlFor="con-password" className="">
                <p className="text-left py-1 ">Conform Password<sup>*</sup></p>
            </label>
            <div  className="w-full rounded-md pl-[2%] h-[2.5rem]  bg-gray-100 ">
                <input className="w-[101%] ml-[-1%] h-[100%]  bg-gray-100 border-none focus:border-none"
                    required
                    id="confirmPassword"
                    type= {visible1 ? "text" : "password"}
                    placeholder=" Conform Password"
                    value ={ formData.confirmPassword}
                    onChange={changeHandler}
                />
                <div onClick={()=>{Setvisible1(!visible1)}} className="cursor-pointer absolute mt-[-1.75rem] ml-[19rem] " >
                    {visible1?   <FaRegEye />  : <FaRegEyeSlash />}
                </div>
            </div>
            </div>
    

        
  
          <button className=" border  px-[5%] py-[3%] mt-2 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
            Create
          </button>
        </form>
        

      
  
      </div>
    )
}

export default ResetPass;