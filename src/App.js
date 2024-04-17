import React from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./pages/Navbar";
import Cart from "./pages/Cart";
import Gallary from "./pages/Gallary";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import {useState} from "react";
import { Route,Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Producturl from "./pages/Producturl";
// import Accountpage from "./components/Accountpage";
import AddProductpage from "./pages/AddProductPage";
import io from "socket.io-client";
import OtpPage from "./pages/Otppage";
import ResetPass from "./pages/ResetPass";
import UpdatePass from "./pages/UpdatePass";
import Canvas from './pages/Accountcanvas';
import { useNavigate,useLocation } from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import CatProductpage from "./pages/CatProductPage";
import SellerPage from "./pages/SellerPage";
import SellerProduct from "./pages/SellerProduct";
import BecomeSeller from "./pages/BecomeSeller"
import Contact from "./pages/Contact"
import Cancellation from "./pages/Cancellation";
import Report from "./pages/Report";
import Security from "./pages/Security";
import Piracy from "./pages/Piracy";
import TermsOfUse from "./pages/TermsOfUse"
import MyProduct from "./pages/MyProduct";
import EditProfile from "./components/EditProfile";

const socket = io("http://localhost:4000");



const App = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const location = useLocation();




  useEffect(() => {
    const autoLogin = async () => {
      try {
        const token = localStorage.getItem("token");
   //     console.log(token);
       // commented below part after hiting url like share product it redirect 
        // if (!token) {
        //   console.log("token not");
        //   navigate("/login"); 
        //   return;
        // }

        const response = await axios.get(
          "http://localhost:4000/api/v1/auth/autoLogin",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
      
        if (response.data.success) {
          setUser(response.data.data);
          // socket.emit("login", {
          //   userId: response.data.data._id,
          //   socketId: socket.id,
          // });
    
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Axios request error in app.js:", error);
      }
    };

    autoLogin(); 
  }, []);
  

  useEffect(() => {
    try {
      if (user && Object.keys(user).length > 0) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch(err) {}
  }, [user]);



  return( 
    <div>
   <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}></Navbar>
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route
          path="/login"
          element={
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              socket={socket}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/reset" element={<ResetPass />} />
        <Route path="/update-password/:updateToken" element={<UpdatePass/>} />
        <Route
          path="/signup"
          element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />}
        />
        {
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Dashboard user={user}/>
              </PrivateRoute>
            }
          />
        }
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/myproduct" element={<MyProduct user={user} />} />
        <Route path="/gallary" element={<Gallary />} />
        <Route path="/about" element={<About />} />
        <Route path="/editprofile" element={<EditProfile user={user} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/report" element={<Report />} />
        <Route path="/term" element={<TermsOfUse />} />
        <Route path="/security" element={<Security />} />
        <Route path="/piracy" element={<Piracy />} />
        <Route path="/becomeseller" element={<BecomeSeller user={user} setUser={setUser}/>} />
        <Route path="/product/:productid" element={<Producturl user={user} />} />
        <Route path="/addproduct" element={<AddProductpage />} />
        <Route path="/sellerproduct" element={<SellerProduct user={user} />} />
        <Route path="/sellerpage" element={<SellerPage user={user} />} />
        <Route path="/accountType" element={<Canvas setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/catproduct" element={<CatProductpage setIsLoggedIn={setIsLoggedIn}/>}/>
      

          
      </Routes>

      
    </div>
    )
};

export default App;
