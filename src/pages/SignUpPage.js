import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";



const SignUpPage = ({setIsLoggedIn})=>{
    const [formData,setFormData] = useState({ firstname:"", lastname:"",email:"", password:"", confirmPassword:"",otp:"",contactNumber:""});
    const [visible,Setvisible] = useState(true);
    const [visible1,Setvisible1] = useState(true);
    const [accountType,setAccountType] = useState("Customer");

    const navigate = useNavigate();

    

    function changeHandler(event){
        setFormData((pre)=>({...pre,[event.target.id]:event.target.value}))
      }

      const submitHandler= async(e)=>{
        e.preventDefault();
        try {
            const formDataWithAccountType = {...formData, accountType};
            console.log(formDataWithAccountType);
          const response = await axios.post('https://backend-1-9nhi.onrender.com/api/v1/auth/signup', formDataWithAccountType);
          localStorage.setItem('token', response.data.token);
          setIsLoggedIn(true);
          navigate('/gallary');
          toast.success("Logged In ")
        } catch (error) {
          console.error('Error:', error);
          toast.error(error.response.data.message); 
        }
      }



    return (
        <div className="flex flex-col max-w-[24rem] h-[40rem]  mt-[3rem] mb-[5rem]  border-[0.2rem] bg-white rounded-md text-md pb-[18%] px-[1rem]  xl:mx-[34%] lg:mx-[30%] md:mx-[28%] sm:mx-[25%] xs:mx-[5%] xs1:mx-[12%]">
        <h1 className="text-2xl text-slate-600 mt-[1rem] text-center  mr-2">Welcome to Huehub!</h1>
        <p className="font-thin mt-[0.3rem] text-center  mr-2">Please enter your details</p>

        <div className="flex flex-row w-fit  justify-between text-1xl font-semibold mt-[0.5rem]  px-1 bg-blue-600 rounded-full  text-white xl:mx-[23%] lg:mx-[18%] xs:ml-[17%]">
            <button  onClick={()=>{setAccountType("Customer")}}  className={`${accountType==="Customer" ? "bg-blue-500 text-slate-150":"" }  py-3 px-7 rounded-full transition-all duration-500`} >User</button>
            <button onClick={()=>{setAccountType("Seller")}} className={`${accountType==="Seller" ? "bg-blue-500 text-slate-150 ":"" }  py-3 px-7 rounded-full transition-all duration-500`} >Seller</button>
        </div>
  
        <form className="flex flex-col mx-2 mt-[0.5rem] gap-y-2" onSubmit={submitHandler}>
            <div className="flex flex-row  gap-3 justify-between">
              <div className="flex flex-col xl:mr-[0.5rem] ">
                <label htmlFor="firstname">
                    <p className="text-left py-1 ">Firstname<sup>*</sup></p>
                </label>
                <div  className="w-full rounded-md pl-[2%]  h-[2.5rem]  bg-gray-100 ">
                    <input
                    required
                    id="firstname"
                    className="w-[106%] ml-[-1%] h-[100%]  bg-gray-100 border-none focus:border-none"
                    type="text"
                    placeholder=" Firstname"
                    value={formData.firstname}
                    onChange={changeHandler}
                    />
                </div>
                </div>
                <div className="flex flex-col">
                <label  htmlFor="lastname">
                    <p className="text-left py-1">Lastname<sup>*</sup></p>
                </label>
                <div  className="w-full rounded-md pl-[2%] h-[2.5rem]  bg-gray-100 ">
                    <input
                    required
                    id="lastname"
                    className="w-[106%] ml-[-1%] h-[100%]  bg-gray-100 border-none focus:border-none"
                    type="text  "
                    placeholder=" Lastname"
                    value={formData.lastname}
                    onChange={changeHandler}
                    />
                </div>
                </div>
            </div>


          <label className="flex flex-col" htmlFor="email">
            <p className="text-left ">Email<sup>*</sup></p>
          </label>
            <input
              required
              id="email"
              className="rounded-[2%] text-black pl-[2%] h-[2.5rem] bg-gray-100 border focus:border-blue-600"
              type="email"
              placeholder=" Email"
              value={formData.email}
              onChange={changeHandler}
            />
         
         <div className="flex flex-row gap-3 justify-between">
             <div className="flex flex-col xl:mr-[0.5rem] ">
                <label htmlFor="password">
                    <p className="text-left py-1">Create Password<sup>*</sup></p>
                </label>
                <div  className="w-full rounded-md pl-[2%] h-[2.5rem]  bg-gray-100 ">
                    <input className="w-[106%] ml-[-1%] h-[100%]  bg-gray-100 border-none focus:border-none"
                        required
                        id="password"
                        type= {visible ? "text" : "password"}
                        placeholder=" Create Password"
                        value ={ formData.password}
                        onChange={changeHandler}
                    />
                    <div onClick={()=>{Setvisible(!visible)}} className="cursor-pointer absolute mt-[-1.6rem] ml-[8rem] " >
                        {visible?   <FaRegEye />  : <FaRegEyeSlash />}
                    </div>
                </div>
            </div>

            <div className="flex flex-col ">
            <label htmlFor="con-password" className="">
                <p className="text-left py-1 ">Conform Password<sup>*</sup></p>
            </label>
            <div  className="w-full rounded-md pl-[2%] h-[2.5rem]  bg-gray-100 ">
                <input className="w-[106%] ml-[-1%] h-[100%]  bg-gray-100 border-none focus:border-none"
                    required
                    id="confirmPassword"
                    type= {visible1 ? "text" : "password"}
                    placeholder=" Conform Password"
                    value ={ formData.confirmPassword}
                    onChange={changeHandler}
                />
                <div onClick={()=>{Setvisible1(!visible1)}} className="cursor-pointer absolute mt-[-1.6rem] lg:ml-[8rem] xl:ml-[9.5rem] " >
                    {visible1?   <FaRegEye />  : <FaRegEyeSlash />}
                </div>
            </div>
            </div>
            
        </div>

        <label className="flex flex-col" htmlFor="contactNumber">
            <p className="text-left py-1 ">ContactNumber<sup>*</sup></p>
        </label>
            <input
            required
            id="contactNumber"
            className="rounded-[2%] text-black  h-[2.5rem] bg-gray-100 border focus:border-blue-600"
            type="text"
            placeholder=" Contact no"
            value={formData.contactNumber}
            onChange={changeHandler}
            />

        <label className="flex flex-col" htmlFor="OTP">
            <p className="text-left ">OTP<sup>*</sup></p>
          </label>
            <input
              required
              id="otp"
              className="rounded-[2%] text-black pl-[2%] h-[2.5rem] bg-gray-100 border focus:border-blue-600"
              type="text"
              placeholder="OTP"
              value={formData.otp}
              onChange={changeHandler}
            />

  

  
          <button className=" border  px-[5%] py-[3%] mt-3 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
            Sign Up
          </button>
        </form>
        

      
  
      </div>
    )
}

export default SignUpPage;  