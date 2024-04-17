import {useState} from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Accountpage = ({setIsLoggedIn})=>{
    const [formData,setFormData] = useState({email:""});
    const [accountType,setAccountType] = useState("Customer");
    const navigate = useNavigate();
    const submitHandler = async(e)=>{
        e.preventDefault();
        try{
            const formDataWithAccountType = {...formData, accountType};
            console.log(formDataWithAccountType);
              const response = await axios.post('https://backend-tub9.onrender.com/api/v1/auth/addAccountType', formDataWithAccountType);
              console.log('Response:', response.data);
              localStorage.setItem('token', response.data.token);
              setIsLoggedIn(true);
              navigate('/gallary');
              toast.success("Logged In ")
        }
        catch(err){
            console.error('Error:', err);
        }
    }

    function changeHandler(event){
        setFormData((pre)=>({...pre,[event.target.id]:event.target.value}))
      }
    return (
        <div className="flex justify-center items-center mt-[15%]">
            <div className="flex flex-row w-fit  justify-between text-1xl font-semibold mt-[0.5rem]  px-1 bg-blue-600 rounded-full  text-white mx-20 ">
                <button  onClick={()=>{setAccountType("Customer")}}  className={`${accountType==="Customer" ? "bg-blue-500 text-slate-150":"" }  py-3 px-7 rounded-full transition-all duration-500`} >User</button>
                <button onClick={()=>{setAccountType("Seller")}} className={`${accountType==="Seller" ? "bg-blue-500 text-slate-150 ":"" }  py-3 px-7 rounded-full transition-all duration-500`} >Seller</button>
            </div>

            <form className="flex flex-col mx-2 mt-[0.5rem] gap-y-2" onChange={changeHandler} onSubmit={submitHandler}>

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

                <button className=" border  px-[5%] py-[3%] mt-3 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
                Lets Explore
                </button>
        </form>
            
           
        </div>
    )
}

export default Accountpage;