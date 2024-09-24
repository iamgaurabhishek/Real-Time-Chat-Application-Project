import { useState } from "react";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";

const Form = () => {
  const [typeOfLogin, setTypeOfLogin] = useState(null);

  return (
    <div className="bg-white w-[600px] h-auto shadow-lg rounded-lg flex flex-col justify-center items-center p-8">
      {!typeOfLogin &&(
      <div className="flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold mb-2">Welcome</div>
        <div className="text-2xl font-light mb-4">Sign up to get started</div>
        <div className="mb-4">
            Are you here for{" "}
            <button
            className="text-blue-500 font-semibold"
            onClick={() => setTypeOfLogin("login")}
            >
            Login
            </button>{" "}
            or for{" "}
            <button
            className="text-blue-500 font-semibold"
            onClick={() => setTypeOfLogin("signup")}
            >
            SignUp
            </button>
        </div>
      </div>
      )}
      <div className="w-full flex justify-center items-center">
        {typeOfLogin === "login" && (
          <div className="mt-4">
            <Login />
          </div>
        )}  {/* Conditionally render Login */}
        {typeOfLogin === "signup" && (
          <div className="mt-4">
            <SignUp />
          </div>
        )}  {/* Conditionally render SignUp */}
      </div>
    </div>
  );
};

export default Form;
