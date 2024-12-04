import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "../../utils/firebase-config";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setError } from "../../redux/slice/authSlice";

const Form = () => {
  const [typeOfLogin, setTypeOfLogin] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.error); // Access the global error state.
  
  // Determine whether to show login or signup based on the current route
  useEffect(() => {
    if(location.pathname === '/users/login'){
      setTypeOfLogin('login');
    }
    else if(location.pathname === '/users/signup'){
      setTypeOfLogin('signup');
    }
  },[location.pathname])
  const handleGoogleLogin = async () => {
    try{
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        const user = result.user;
        console.log("Google logged in user: ", user);
        dispatch(clearMessage());
        // Add any additional redirection
        navigate("/dashboard");
    }
    catch(error){
      console.error("Google Login Error: ",error);
      dispatch(setError("Google sign-in falied. Please try again."))
    }
  }

  return (
    <div className="bg-white w-[600px] h-auto shadow-lg rounded-lg flex flex-col justify-center items-center p-8">
      {!typeOfLogin && (
        <div className="flex flex-col justify-center items-center">
          <div className="text-4xl font-extrabold mb-2">Welcome</div>
          <div className="text-2xl font-light mb-4">Sign up to get started</div>
          <div className="mb-4">
            Are you here for{" "}
            <button className="text-blue-500 font-semibold" onClick={() => setTypeOfLogin("login")}>
              Login
            </button>{" "}
            or for{" "}
            <button className="text-blue-500 font-semibold" onClick={() => setTypeOfLogin("signup")}>
              SignUp
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col justify-center items-center">
        {/* Google Sign-In Button */}
        {!typeOfLogin && (
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
        )}
        {typeOfLogin === "login" && (
          <div className="mt-4">
            <Login />
          </div>
        )}
        {typeOfLogin === "signup" && (
          <div className="mt-4">
            <SignUp />
          </div>
        )}
      </div>
    </div>
  );
};
export default Form;