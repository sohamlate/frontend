import { Navigate } from "react-router-dom";
const PrivateRoute = ({isLoggedIn,children})=>{
    console.log(isLoggedIn);
    if(isLoggedIn){
        return children;
    }
    else{

        return <Navigate to={"/login"}></Navigate>
    }
}

export default PrivateRoute;