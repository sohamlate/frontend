import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import axios from "axios";
import Logo from "../assests/logo.png";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const Cart = ({user})=>{

    const [cart,setcart] = useState([]);
    const [totalAmount,setTotalAmount] = useState(0);
    const [loading ,setLoading] = useState(false);


    const userID = user._id;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(()=>{
        if(cart)
        setTotalAmount(cart.reduce((acc,curr)=>acc+curr.price,0));
    },[cart]);





    
    const showCart = async (e) => {
        try {
          const response = await axios.post(
            "https://backend-tub9.onrender.com/api/v1/product/displayCartItem",{userID}
          );
          console.log(response);
          setcart(response.data.cartItem.cartProduct);
          console.log("displayingg cart item",cart);
        } catch (error) {
          console.error("Error:", error);
        }
      };

    
      const userId = userID;
      
      async function verifyStatus(response){
        try{
         const R_id = response.razorpay_payment_id;
         const R_order = response.razorpay_order_id;
         const R_sign = response.razorpay_signature;
          const res = await axios.post('https://backend-tub9.onrender.com/api/v1/payment/manyVerifySignature', {R_id,R_order,R_sign,userId});
          toast.success("payment successful");
          navigate("/");
        }catch (error) {
          console.error("Error:", error);
          toast.error(error.message); 
        }
      }
      
      async function buyHandler(){
        try{
         const {data:{key}} = await axios.get('https://backend-tub9.onrender.com/api/v1/payment/key');
        const response = await axios.post('https://backend-tub9.onrender.com/api/v1/payment/manyCapturePayment', {totalAmount,userId,token});
        console.log(key,"printing key");
        console.log(response.data);
        toast.success("order id created");
        var options = {
           "key": key, // Enter the Key ID generated from the Dashboard
          "amount": response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Huehub",
          "description": "Thank you Purchasing",
          "image": Logo,
          "order_id": response.data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": function (response){
            // sentmail();
            verifyStatus(response);
          },
          "prefill": {
              "name": user.name,
              "email": user.email,
              "contact": user.additionalDetail.contactNumber
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
        };
        
        var razor = new window.Razorpay(options);
          razor.open();
         
      
      }catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.message); 
        
      }
      }
      

    useEffect(()=>{showCart();},[])
   

    return (
      <div className="bg-gradient-to-br from-sky-200 to-white">
          <h1 className="ml-[3.5rem] mt-[2rem] mb-[1rem] font-bold text-xl">Your Shopping Basket</h1>
        <div className="ml-[3rem] flex">


           {
            cart && cart.length>0 ? 
            (<div className="flex items-center justify-center ">
                <div className="flex flex-wrap gap-4 w-[72rem] ">

                {
                    cart.map((item,index)=>{
                        return <CartItem item={item} key={item.id} itemIndex ={index} userID={userID} showCart={showCart}/>
                    })
                }
                </div>

                <div className="border-2 h-auto max-h-[17rem] w-[20rem] flex flex-col p-4">
                    <div className="text-center font-bold pb-[2.5rem]">Your Cart</div>
                    <div className="font-semibold pb-[1rem]">Summary</div>
                    <p>
                        <span className="">Total Item : {cart.length}</span>
                    </p>

                    <div>
                        <p>
                            Total Amount : ₹ {totalAmount}
                        </p>
                    </div>

                    <button onClick={buyHandler} className=" border  mx-[2rem] px-[5%] py-[3%] mt-5  w-[12rem] rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white">
                    Check Out
                    </button>

                </div>
            </div>) :
                (
                <div className="font-bold h-[100vh] flex flex-col gap-6 justify-center item-center">
                    <h1>Cart Empty</h1>
                    <Link to="/gallary">
                        <botton>Shop Now </botton>
                    </Link>
                    
                </div>
                )
           } 
           
        </div>


      
        </div>
    )
}

export default Cart;