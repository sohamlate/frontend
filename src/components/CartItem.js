import React from "react";
import toast from "react-hot-toast"
import axios from "axios";
import { useEffect ,useState} from "react";


const CartItem = ({item,itemIndex,userID,showCart})=>{
    const [cart,setcart] = useState([]);
    const productId = item._id;
    // const {cart} = useSelector((state)=>state.cart);
    // const dispatch = useDispatch();

    // function removefromcart(){
    //     dispatch(remove(item.id));
    //     toast.success("Removed from cart");
    //   }
    console.log(item);

    async function removefromcart(){
        try{
        const response = await axios.post('http://localhost:4000/api/v1/product/removeFromCart', {productId,userID});
        console.log("remove to cart",response);
        showCart();
        toast.success("Removed from cart");
        }catch (error) {
          console.error("Error:", error);
    
        }
      }

    // const showCart = async (e) => {
    // try {
    //     const response = await axios.post(
    //     "http://localhost:4000/api/v1/product/displayCartItem",{userID}
    //     );
    //     console.log(response);
    //     setcart(response.data.cartItem.cartProduct);
    //     console.log("displayingg cart item",cart);
    // } catch (error) {
    //     console.error("Error:", error);
    // }
    // };
  
    return (
        <div className="w-[17rem] p-5 border-2 my-6 flex flex-wrap hover:scale-105">
            <div>
                <div className="flex justify-center my-[1rem] h-[9rem] ">
                    <img src={item.thumbnail}></img>
                </div>
                <div>
                    <h1 className="font-semibold">{item.productName}</h1>
                    <h1>{item.productDescription}</h1>
                    <div className="flex font-medium justify-center py-2 ">
                        <p>₹{item.price}</p>
                    </div>
                    <div  className="flex justify-center items-center">
                        <button onClick={removefromcart} className=" border  mx-[1rem] px-[5%] py-[3%] mt-1 w-[12rem] rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600 hover:shadow-white" >Remove from cart</button>
                        {/* <button className=" text-white font-bold bg-blue-500 py-[0.4rem] px-[3rem]" onClick={removefromcart}>Delete</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;