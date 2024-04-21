import React from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import Products from "../components/Products";
import Logo from "../assests/logo.png";
import { useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
const Producturl = ({ user }) => {
  const location = useLocation();
  const [item, setitem] = useState({ item: "" });
  console.log("156468468946", item);
  const productId = location.pathname.split("/")[2];
  const userID = user._id;
  const [posts, setPosts] = useState([]);
  const [cart, setcart] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const fetchitem = async (e) => {
    try {
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/product/getproductdetail",
        { productId }
      );
      setitem(response.data.productDetails[0]);
      console.log(item);
      if (response.data.productDetails[0].category) {
        setPosts(response.data.productDetails[0].category.products);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  const showCart = async (e) => {
    try {
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/product/displayCartItem",
        { userID }
      );
      setcart(response.data.cartItem.cartProduct);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  async function removefromcart() {
    try {
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/product/removeFromCart",
        { productId, userID }
      );
      showCart();
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  }
  async function addtocart() {
    try {
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/product/addToCart",
        { productId, userID }
      );
      showCart();
      toast.success("Added to cart");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  }
  const product_id = productId;
  const userId = userID;

  async function verifyStatus(response) {
    try {
      const R_id = response.razorpay_payment_id;
      const R_order = response.razorpay_order_id;
      const R_sign = response.razorpay_signature;
      const res = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/payment/verifySignature",
        { R_id, R_order, R_sign, product_id, userId }
      );
      toast.success("payment successful");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  }

  async function buyHandler() {
    try {
      const {
        data: { key },
      } = await axios.get(
        "https://backend-tub9.onrender.com/api/v1/payment/key"
      );
      const response = await axios.post(
        "https://backend-tub9.onrender.com/api/v1/payment/capturePayment",
        { product_id, userId, token }
      );
      console.log(key, "printing key");
      console.log(response.data);
      toast.success("order id created");
      var options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Huehub",
        description: "Thank you Purchasing",
        image: Logo,
        order_id: response.data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          // sentmail();
          verifyStatus(response);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.additionalDetail.contactNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchitem();
    if (user._id) {
      showCart();
    }
  }, []);



  
  return (
    <div className="bg-sky-200 ">
      <div className=" flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-center items-start gap-x-10 mt-[2rem]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="lg:max-w-[30rem] sm:max-w-[25rem] xs:max-w-[21rem] rounded-md bg-sky-100 p-1 mt-5 aspect-square flex flex-col items-center justify-center object-cover">
              <p className="font-bold text-3xl font-poppins mb-[2rem] bg-blue-900 text-white p-2 rounded-md">
                {item.productName}
              </p>
              <img className="max-h-full max-w-full px-[1rem]" src={item.thumbnail}></img>
              <div>
            </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="w-fit mt-9 relative flex flex-col sm:max-w-[25rem] xs:max-w-[21rem] px-[2rem] gap-y-5 justify-center items-center font-poppins py-[2rem] bg-sky-50 rounded-2xl "
          >
            <div className="absolute right-0 -top-8">
              <p className="mt-[1rem] text-xl font-semibold bg-green-500 text-white p-2 rounded-full">
                ₹ {item.price}
              </p>
            </div>
            <div>
              <p className="font-bold text-3xl font-poppins mt-3 px-[2rem] bg-purple-600 text-white p-2 rounded-md">
                {item.productName}
              </p>
            </div>
            <div className="text-lg font-semibold bg-violet-800 text-white p-[0.5rem] rounded-full">
              {item && item.category && <p>Category : {item.category.name}</p>}
            </div>
            <div>
              <p className="text-wrap">{item.productDescription}</p>
            </div>
            <div className="flex mt-[2rem]">
              {cart.some((p) => p._id === item._id) ? (
                <button
                  className=" border  px-[5%] remove  h-[2.5rem] mx-[1rem] w-[11rem] rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white"
                  onClick={removefromcart}
                >
                  Remove Item{" "}
                </button>
              ) : (
                <button
                  className=" border  px-[5%]   h-[2.5rem] mx-[1rem] w-[10rem] rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white"
                  onClick={addtocart}
                >
                  Add to Cart
                </button>
              )}

              <button
                onClick={buyHandler}
                className=" border  px-[5%]   h-[2.5rem] mx-[1rem] w-[10rem] rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="bg-sky-50 mt-5 p-4 border-white shadow-md rounded-md"
          >
            <div>
              <h2 className="text-xl font-bold  bg-pink-400 text-white p-1 rounded-xl w-fit">
                Delivery and Return Policy
              </h2>
              <div>
                <li className="my-[1rem]">
                  Order today to get in next two working days{" "}
                </li>
                <li className="my-[1rem]">
                  Returns & exchanges accepted within 30 days
                </li>
                <li className="my-[1rem]">Free Delivery</li>
              </div>
            </div>
            {item.seller && (
              <div className="mt-[rem] ">
                <h1 className="text-md font-bold bg-pink-400 text-white p-2 rounded-xl w-fit">
                  Meet Seller
                </h1>
                <div className="flex mt-1">
                  <div className="h-[5rem] w-[5rem] ">
                    <img
                      src={item.seller.image}
                      className="h-[50%] w-[50%] rounded-full"
                    ></img>
                  </div>
                  <h2 className="font-semibold text-semibold text-[1.2rem]">
                    {item.seller.firstname} {item.seller.lastname}
                  </h2>
                </div>
                <p className="font-semibold mt-[-1.5rem]">
                  Owner of : {item.productName}
                </p>
                <button className=" border  px-[5%] py-[3%] mt-5 h-[3rem] w-[17rem] rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
                  <a href={`https://wa.me/${item.seller.additionalDetail.contactNo}`}>
                    {" "}
                    Message Seller{" "}
                  </a>
                </button>
              </div>
            )}
          </motion.div>
          <div className="ml-[3rem] mt-[6rem] flex flex-col justify-center items-center">
            <div className="flex justify-center">
              <ReactTyped
                strings={["Similar Category Product"]}
                typeSpeed={200}
                backSpeed={50}
                loop
                className=" text-3xl text-center bg-black text-white p-1 px-2 rounded-md font-poppins"
              ></ReactTyped>
            </div>
            <div className="mt-3  w-fit sm:px-2 py-4 ">
              {posts.length > 0 ? (
                <div className="flex flex-row justify-center item-center sm:px-[3rem]  w-full  flex-wrap gap-x-8 gap-y-9">
                  {posts.map((item) => (
                    <Products key={item.id} item={item}></Products>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-xl ml-[45%] my-[10%]">
                    No Product found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-[80%]">
          <Rating user={user} />
        </div>
      </div>
    </div>
  );
};

export default Producturl;
