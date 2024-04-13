import React from "react";
import artists from "../assests/artists.jpg";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import Spinner from "../components/Spinner";
import {useState,useEffect} from "react";
import  CategoriesProducts  from "../components/CategoriesProducts";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import artis from "../assests/artis.gif"



const Home = ({user})=>{

    const [loading ,setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    function explorehandler(){
        navigate('/gallary');
    }

    function sellHandler(){
    if(user._id && user?.accountType==="Seller")
      navigate('/sellerpage');
    else if(user._id &&  user?.accountType !=="Seller" )
      navigate('/becomeseller');
  }

    const scrollToTop = ()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth",
        })
    }
 
    async function catProductData(){
        setLoading(true); 
        try{
            const res = await axios.get('https://backend-1-9nhi.onrender.com/api/v1/product/getCategoryDetail');  
          //  console.log(res.data.allCategory);  
        //    const products = Object.values(res.data.data);
           setPosts(res.data.allCategory);
         //   console.log("6+2651265165151",posts);
        }
        catch(error){
            console.log("error in categorise data");
            setPosts([]);

        }
        setLoading(false);
    }

    useEffect(()=>{catProductData();},[])

 
  
    return (
        <div className="h-[100vh] pt-[3rem]  ">


            {/* <div className="flex p-2 items-center text-2xl  border border-black w-fit ml-96 rounded-md shadow-xl shadow-blue-100 mb-[5rem] ">
                Discover Art You Love From the World's Leading Online Gallery
            </div> */}
            <div className="flex flex-row rounded-3xl border-2 justify-center md:mx-[25%] xs:mx-[20%] mb-[3rem] py-[0.5rem] boder-2 border-black">
                <input 
                className="w-[90%]  py-[0.3rem] border-none focus:border-none focus:outline-none" 
                type="text" 
                placeholder="Explore your passion: Search for your favorite art style or artist here..."
                // value=""
                ></input>
                <div className="pt-2 text-xl">
                <  CiSearch  />
                </div>

            </div>

            <div className="sm:ml-[80%] md:mt-[28rem] xs:mt-[25rem] lg:ml-[85%] lg:mt-[25rem] xs:ml-[12rem]  z-10  text-2xl flex flex-row gap-4 text-center bg-green-400 fixed font-semibold px-[1rem] py-[0.5rem] rounded-md">
                    <a
                        href="https://wa.me/7420889804"
                        class="whatsapp_float"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <FaWhatsapp />
                    </a>
                    <div className="md:text-xl xs:text-lg">
                        <h5>Any Query</h5>
                    </div>

            </div>
            
            <div className="flex flex-row flex-wrap  justify-center items-center">
                <div className="w-[50%] md:p-[4rem] ">
                    <h1 className="">
                        <span className="md:text-6xl xs:text-3xl block">Transform</span>
                        <span className="md:text-4xl xs:text-2xl text-blue-500 block">your home into a gallery </span>
                        <span className="md:text-4xl xs:text-2xl block"> of personal expression with </span>
                        <span className="md:text-4xl xs:text-2xl text-blue-500">our curated collection </span>
                    </h1>
                    <button onClick={explorehandler} className="text-2xl xs:text-xl px-[2rem] py-[0.4rem] text-white bg-blue-600 border-1 rounded-md mt-[2rem] hover:bg-blue-500">Explore Now</button>
                </div>
                <div className="relative">
                   <img src={artists} className=" w-[35rem] xs:h-[20rem] sm:h-[25rem] xs:mt-[4rem] xs:p-[2rem] sm:p-[0rem] sm:mt-[0rem] opacity-80 shadow-xl shadow-blue-200 relative"></img>
                </div>
            </div>

         

            

            <div className="flex flex-row xs:flex-wrap-reverse  justify-center items-center  mt-[3rem] ">
              <div className=" md:w-[50%]">
                   <img src="https://res.cloudinary.com/dsy3ebkqc/image/upload/v1712808673/top-view-attractive-woman-hands-drawing-amazing-picture-canvas-modern-cozy-art-workshop-min_igkc5j.jpg" className=" xs:px-[2rem] sm:px-[0rem] xs:h-[17rem] md:h-[25rem] opacity-80 shadow-xl shadow-blue-200 relative md:mr-[10rem] my-[8rem] "></img>

                </div>
                

                {/* <div className="w-[35rem] sm:pl-[6rem] xs:px-[20%] mt-[5rem] ">
                    <h1 className="">
                        <span className="md:text-6xl xs:text-3xl block">Creativity 🎨✨ </span>
                        <span className="md:text-4xl  xs:text-2xl text-blue-500 block"> is the bridge between imagination </span>
                        <span className="md:text-4xl  xs:text-2xl block"> and reality. paint your world  </span>
                        <span className="md:text-4xl  xs:text-2xl text-blue-500">with the colors of your dreams. </span>
                    </h1>
                    <button onClick={sellHandler} className="text-2xl px-[2rem] py-[0.4rem] text-white bg-blue-600 border-1 rounded-md mt-[2rem] hover:bg-blue-500">Lets Sell</button>
                </div> */}
                 <div className="w-[35rem] md:p-[4rem] xs:px-[5rem] sm:px-[0rem]">
                    <h1 className="">
                        <span className="md:text-6xl xs:text-3xl block">Creativity 🎨✨ </span>
                        <span className="md:text-4xl xs:text-2xl text-blue-500 block"> is the bridge between imagination  </span>
                        <span className="md:text-4xl xs:text-2xl block">and reality. paint your world   </span>
                        <span className="md:text-4xl xs:text-2xl text-blue-500">with the colors of your dreams. </span>
                    </h1>
                    <button onClick={sellHandler} className="text-2xl xs:text-xl px-[2rem] py-[0.4rem] text-white bg-blue-600 border-1 rounded-md mt-[2rem] hover:bg-blue-500">Lets Sell</button>
                </div>

                </div>
            

          

            <h1 className="text-center mt-[1rem] text-2xl font-semibold">Shop By Category</h1>

            <div className="flex flex-wrap  px-[5rem] mt-[2.5rem] gap-x-[5rem] text-black p-3 font-poppins justify-center">


            <div className="block logos mx-[10rem]">
                {
                    loading ? <Spinner/>:
                    posts  ?
                    
                    (   <div className=" flex flex-row justify-center item-center logos-slide  w-full   gap-x-[3rem] ">
                        {    
                            posts.map((item)=>(
                                <CategoriesProducts key={item._id} item={item}></CategoriesProducts>
                            ))
                        }
                    </div>):
                    <div>
                        <p>No Product found</p>
                    </div>

                }       
            </div>
            </div>

            <div className="bg-gradient-to-r from-blue-300 to-purple-300 py-8 px-4 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="col-span-1">
            <div>
              <h2 className="text-xl font-bold mb-4">Get to know us</h2>
              <Link to="/contact" className="block text-blue-700 hover:underline">Contact us</Link>
              <Link to="/about" className="block text-blue-700 hover:underline">About us</Link>
            </div>
          </div>
          {/* Column 2 */}
          <div className="col-span-1">
            <div>
              <h2 className="text-xl font-bold mb-4">Let Us Help You</h2>
              <Link to="/cancellation" className="block text-blue-700 hover:underline">Cancellation and returns</Link>
              <Link to="/report" className="block text-blue-700 hover:underline">Report Infringement</Link>
              <Link to="/faq" className="block text-blue-700 hover:underline">FAQ</Link>
            </div>
          </div>
          {/* Column 3 */}
          <div className="col-span-1">
            <div>
              <h2 className="text-xl font-bold mb-4">Consumer Policy</h2>
              <Link to="/term" className="block text-blue-700 hover:underline">Term of use</Link>
              <Link to="/security" className="block text-blue-700 hover:underline">Security</Link>
              <Link to="/privacy" className="block text-blue-700 hover:underline">Privacy</Link>
            </div>
          </div>
          {/* Column 4 */}
          <div className="col-span-1">
            <div>
              <h2 className="text-xl font-bold mb-4">Connect with us</h2>
              <a href="https://wa.me/7420889804" className="block text-blue-700 hover:underline">WhatsApp</a>
              <a href="https://www.instagram.com/sohamlate24" className="block text-blue-700 hover:underline">Instagram</a>
              <a href="https://www.facebook.com" className="block text-blue-700 hover:underline">Facebook</a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg font-semibold">Not a seller? Join the Huehub artist community</p>
          {user._id && user?.accountType !== "Seller" && (
            <NavLink to="/becomeseller" className="text-blue-700 hover:underline">Become a Seller</NavLink>
          )}
        </div>
      </div>
    
            
        </div>
    )
}

export default Home;