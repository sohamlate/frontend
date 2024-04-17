import { react } from "react";
import {useState,useEffect} from "react";
import axios from "axios";
import  toast  from "react-hot-toast";

const EditProfile = ({user})=>{

    const [formData,setFormData] = useState({gender:"",dateOfBirth:new Date,about:"",contactNo:0,address:"",image:""});
    const [user1, setUser1] = useState({});
  console.log(user1);
    const [imageUrl, setImageUrl] = useState("");

    const userId = user._id;

    function changeHandler(event) {
        if (event.target.id === "image") {
            toast.success("check");
            const file = event.target.files[0];
     
          setFormData((prev) => ({
            ...prev,
            image : file, 
          }));
          const reader = new FileReader();
          reader.onload = () => {
            setImageUrl(reader.result);
          };
          reader.readAsDataURL(file);
        } else {

          setFormData((prev) => ({
            ...prev,
            [event.target.id]: event.target.value,
          }));
        }
      }


    
    useEffect(() => {
        const getdata = async () => {
            try {
            const response = await axios.post(
                "https://backend-tub9.onrender.com/api/v1/profile/getUserData",{userId}
            );

            console.log(response);
            if(response.data.userDetail != null){
            setUser1(response.data.userDetail)}
            console.log(user1);
            toast.success("")
           
            } catch (error) {
              toast.error(error.response.data.message); 
            }
        };
    
            getdata();
           
        }, []);

        useEffect(() => {
          if(user1.additionalDetail){
          formData.gender = user1.additionalDetail.gender;
          formData.address = user1.additionalDetail.address;
          formData.contactNo = user1.additionalDetail.contactNo;
          formData.about = user1.additionalDetail.about;
          formData.dateOfBirth = user1.additionalDetail.dateOfBirth;
          formData.image = user1.image;
          setImageUrl(formData.image);
          }
        }, [user1]);

  

        const submitHandler = async (e) => {
            e.preventDefault();
            try {

                const formDataToSend = new FormData();
                formDataToSend.append('gender', formData.gender);
                formDataToSend.append('contactNo', formData.contactNo);
                formDataToSend.append('address', formData.address);
                formDataToSend.append('about', formData.about);
                formDataToSend.append('dateOfBirth', formData.dateOfBirth);
                formDataToSend.append('image', formData.image);
                formDataToSend.append('userId', userId);
              const response = await axios.post(
                "https://backend-tub9.onrender.com/api/v1/profile/updateProfile",
                formDataToSend
              );

            toast.success("HHIHI");
            console.log(formDataToSend);
           
            } catch (error) {
              console.error("Error:", error);
              toast.error(error.response.data.message); 
            }
          };

      


 
          console.log(formData);

    return(
     
        <div className="h-full">
         <form onSubmit={submitHandler}>
          <div className="border-b-2 block md:flex">
        
            <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
              <div className="flex justify-between">
                <span className="text-xl font-semibold block">{user.accountType} Profile</span>
                
              </div>
        
              <span className="text-gray-600">This information is secret so be careful</span>
              <div className="w-[20rem] ml-[8rem] mt-[2rem] border-2 ">
                <input id="image" type="file" onChange={changeHandler} className="max-w-xs w-32 items-center border" />                          
                {imageUrl && (
                     <img className="" src={imageUrl} alt="Thumbnail" style={{ maxWidth: "100%", marginTop: "0rem" }} /> )}
                </div>

                <div>
                    <p className=" text-xl font-semibold text-center">{user.firstname} {user.lastname}</p>
                </div>
            </div>
            
            <div className="w-full md:w-2/5 p-8 bg-white lg:ml-4 shadow-md">
              <div className="rounded  shadow p-6">
                

                <div className="pb-6">
                  <label htmlFor="gender" className="font-semibold text-gray-700 block  pb-1">Gender</label>
                  <div className="flex">
                    <input  id="gender"   onChange={changeHandler} className="  rounded-r px-4 py-2 w-full border-2 border-slate-500" type="text" value={formData.gender} />
                  </div>
                </div>

                <div className="pb-6">
                  <label htmlFor="dateOfBirth" className="font-semibold text-gray-700 block pb-1">Date of Birth</label>
                  <div className="flex">
                    <input  id="dateOfBirth"   onChange={changeHandler} className="border-1  rounded-r px-4 py-2 w-full  border-2 border-slate-500" type="date" value={formData.dateOfBirth} />
                  </div>
                </div>

                <div className="pb-6">
                  <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">About</label>
                  <div className="flex">
                    <input  id="about"  onChange={changeHandler} className="border-1  rounded-r px-4 py-2 w-full  border-2 border-slate-500" type="text" value={formData.about} />
                  </div>
                </div>

                <div className="pb-6">
                  <label htmlFor="contactNo" className="font-semibold text-gray-700 block pb-1">contactNo</label>
                  <div className="flex">
                    <input  id="contactNo"  onChange={changeHandler} className="border-1  rounded-r px-4 py-2 w-full  border-2 border-slate-500" type="number" value={formData.contactNo} />
                  </div>
                </div>

                <div className="pb-6">
                  <label htmlFor="address" className="font-semibold text-gray-700 block pb-1">Address</label>
                  <div className="flex">
                    <textarea  id="address"  onChange={changeHandler} className="border-1  rounded-r px-4 py-2 w-full  border-2 border-slate-500" type="text" value={formData.address} />
                  </div>
                </div>

                <button  className=" border px-[7%] py-[1%] mt-5 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
                Edit
                </button>
              
              </div>
            </div>
        
          </div>
          </form>
         
        </div>
    )
}

export default EditProfile;