import react from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CategoriesProducts = ({item})=>{
   // console.log(item);

    const navigate = useNavigate();
    const [formData,setFormData] = useState();

    const categoryHandler = async(item)=>{
       
        try {
           const itemID = item._id;
   //         console.log("hwqeqwewqeweqwew",formData);
          const response = await axios.post('http://localhost:4000/api/v1/product/getCategoryPageDetail', {itemID});
          const item1 = response.data.data.selectedCategory.products
     //     console.log('Response:',item1);
          const statedata= {
            item1 : item1,
            item :item,
          }
         navigate("/catproduct", { state: statedata });
        } catch (error) {
          console.log('Error:', error);
        }
     
        //navigate(`/category/${id}`);
    }
    return (
        <div className="flex justify-center">
                 <div   onClick={()=> categoryHandler(item)} className="shadow mb-[3rem] p-2 rounded-[9%] hover:scale-105 transition-all duration-300 hover:shadow-slate-400 w-[15rem] h-[19rem]"> 
                
                <img className="w-[18rem] h-[16rem] rounded-[9%]" src={item.image} alt="prints"></img>
                <p className="text-center mt-[0.5rem]">{item.name}</p>
                
                </div>
           
        </div>
    )
}

export default CategoriesProducts;