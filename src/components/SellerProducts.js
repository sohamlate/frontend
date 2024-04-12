import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"
import {add,remove} from "../redux/Slices/CartSlice";
import {  useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
  
const SellerProducts = ({item})=>{
    let text = item.productDescription;
    let head = item.productName;
    const [displayText, setDisplayText] = useState(text);
    const navigate = useNavigate();

    useEffect(() => {
      if (text.length > 100) {
        setDisplayText(text.slice(0, 100) + '...');
      } else {
        setDisplayText(text);
      }
    }, [text]);

    const [displayHead, setDisplayHead] = useState(head);

    useEffect(() => {
      if (head.length > 40) {
        setDisplayHead(head.slice(0, 40) + '...');
      } else {
        setDisplayHead(head);
      }
    }, [head]);



  function handleClick() {
    navigate("/sellerproduct", { state: { item } });
  }


    return (
      
        <div onClick={handleClick}  className=" mt-[1rem] item-center border-2 w-[18rem] h-[20rem] hover:scale-110 transition-all duration-200 p-5">
            <div className="font-semibold">
                <p>{displayHead}</p>
            </div>
            <div className="flex justify-center my-[1rem] h-[9rem]">
                <img  className="flex" src={item.thumbnail}/>
            </div>
            <div className="">
                <p>{displayText}</p>
            </div>
            <div className="flex font-medium justify-center py-2 ">
                <p>₹ {item.price}</p>
            </div>
          
        </div>
   
    )
}

export default SellerProducts;