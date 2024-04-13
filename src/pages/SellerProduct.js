import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const SellerProduct = ({ user }) => {
  const location = useLocation();
  const { item } = location.state || {};
  console.log("item", item);
  console.log(item.category);
  console.log(user);
  const deleteHandler = async () => {
    try {
      const response = await axios.post(
        "https://backend-1-9nhi.onrender.com/api/v1/product/deleteproduct",
        {
          productId: item._id,
          userId: user._id,
          categoryId: item.category,
        }
      );
      toast.success("Product Deleted Successfully");
      console.log("response of deletion", response);
    } catch (error) {
      console.log("Error in delting product", error);
      toast.error(error.response.data.message); 
    }
  };
  return (
    <div className="flex flex-row gap-x-[10rem]">
      <div className="h-[50rem] w-[20rem] ml-[5rem] mt-[2rem]">
        <img src={item.thumbnail}></img>
      </div>
      <div className="w-[40%]">
        <p className="font-bold text-2xl">{item.productName}</p>
        <p className="mt-[3rem]  ">{item.productDescription}</p>
        <p className="mt-[1rem] font-semibold">{item.price}</p>
        <div className="flex mt-[2rem] gap-x-3">
          <button
            onClick={deleteHandler}
            className=" border  px-[5%]   h-[2.5rem] mx-[1rem] w-[10rem] rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white"
          >
            Delete Item{" "}
          </button>
          <button className=" border  px-[5%]   h-[2.5rem] mx-[1rem] w-[10rem] rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
            Edit Item{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProduct;
