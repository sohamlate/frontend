import React from "react";
import { useEffect,useState } from "react";
import Products from "../components/Products";
import Spinner from "../components/Spinner";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const CatProductPage = ()=>{
   // const API_URL = "https://fakestoreapi.com/products"; 
    const [loading ,setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location || {};
//    const statedata = location.state || {};
    const item = state.item;
 //   console.log("in product",state);
    async function fetchProductData(){
        setLoading(true); 
        try{
            setPosts(state.item1);
            console.log("6+2651265165151",posts);
        }
        catch(error){
            console.log("error in gallary");
            setPosts([]);

        }
        setLoading(false);
    }

    
 

    useEffect(()=>{
        
        fetchProductData();
    },[])
 
  //  console.log("fdscvdsv",posts);

    return (
        <div className="">

            <h1 className="font-bold text-xl ml-[44%] my-[2rem] ">Category : {item.name}</h1>

            <div className="flex flex-row rounded-3xl border-2 justify-center mx-[25%] mb-[3rem] py-[0.5rem] boder-2 border-black">
                <input 
                className="w-[90%] py-[0.3rem] border-none focus:border-none focus:outline-none" 
                type="text" 
                placeholder="Explore your passion: Search for your favorite art style or artist here..."
                // value=""
                ></input>
                <div className="pt-2 text-xl">
                <  CiSearch  />
                </div>

            </div>
          
            {
                loading ? <Spinner/>:
                posts.length>0  ?
                
                 (   <div className="flex flex-row justify-center item-center px-[15rem]  w-full h-[100vh] flex-wrap gap-x-5 gap-y-9">
                    {  
                         posts.map((item)=>(
                            <Products key={item.id} item={item}></Products>
                        ))
                    }
                 </div>):
                 <div>
                    <p className="font-semibold text-xl ml-[44%] mt-[20%]">No Product found</p>
                 </div>

            }    
            
           
        </div>
    );

};

export default CatProductPage;