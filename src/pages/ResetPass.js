
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";



const ResetPass = ()=>{
    const [formData,setFormData] = useState({email:""});

    function changeHandler(event){
        setFormData((pre)=>({...pre,[event.target.id]:event.target.value}))
      }

    const submitHandler= async(e)=>{
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:4000/api/v1/auth/resetPassword', formData);
        toast.success("please check your email");
  
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.response.data.message); 
      }
    }



    return (
        <div className="flex flex-col w-[27%] mt-5 h-[13rem] ml-[40%] border-[0.2rem] bg-white rounded-md text-md pb-[18%] px-[1rem]">
        <h1 className="text-2xl text-slate-600 mt-[2rem] text-center  mr-2">Welcome to Huehub!</h1>
        <p className="font-thin mt-[0.3rem] text-center  mr-2">Please enter your details</p>

        <form className="flex flex-col mx-3 mt-[0.5rem] gap-y-3" onSubmit={submitHandler}>
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
            Send Link
          </button>
        </form>
        

      
  
      </div>
    )
}

export default ResetPass;