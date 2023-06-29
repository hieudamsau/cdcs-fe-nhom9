import React from "react";
import { Link } from "react-router-dom";

const AuthenticationPage = ({ children, className = "" }) => {
  return (
    <div
      className={`max-w-[1000px] w-full bg-white mx-auto mt-5 rounded-xl ${className}`}
    >
      <Link to="/">
        <div className="w-[150px] h-[150px] mx-auto">
          <img
            src="/images/logo-act.png"
            alt=""
            className=" w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="text-center">
        <div className="text-4xl font-bold text-[#ff7023]">
          Welcome to ACT.VN
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthenticationPage;
