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
      if (text.length > 30) {
        setDisplayText(text.slice(0, 30) + '...');
      } else {
        setDisplayText(text);
      }
    }, [text]);

    const [displayHead, setDisplayHead] = useState(head);

    useEffect(() => {
      if (head.length > 10) {
        setDisplayHead(head.slice(0, 10) + '...');
      } else {
        setDisplayHead(head);
      }
    }, [head]);



  function handleClick() {
    navigate("/sellerproduct", { state: { item } });
  }


    return (
      
      <div
      onClick={handleClick}
      className="min-w-[280px]  stripe item-center  border-2 border-black bg-sky-50  hover:scale-110 transition-all duration-500 p-5 rounded-md"
    >
      <div className="flex justify-center my-[1rem] w-[15rem] h-[9rem]">
        <img className="flex  rounded-md" src={item.thumbnail} />
      </div>
      <div className="bg-[#00246B] w-full h-1 my-2"></div>
      <div className="flex justify-between items-center text-xl ">
        <div className=" font-roboto font-bold text-[#00246B]">
          <p>{displayHead}</p>
        </div>
        <div className="flex  justify-center  bg-[#00246B] text-white rounded-full p-2">
          <p>₹ {item.price}</p>
        </div>
      </div>
      <div className="text-center text-md font-poppins">
        <p>{displayText}</p>
      </div>
    </div>
   
    )
}

export default SellerProducts;