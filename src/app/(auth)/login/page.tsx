"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";

const login = () => {
  const router = useRouter();

  const login = () => {
    router.push("/home-page");
  };
  return (
    <div className="grid grid-cols-3 gap4 bg-white">
      <div className="col-span-2 grid place-items-center">
        <div>
          <p className="text-6xl text-black font-bold text-center">
            Login to Your Account
          </p>
          <p className="text-md text-[#888b8a] text-center m-3">
            Login using social networks
          </p>
          <div className="flex space-x-3 justify-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 cursor-pointer">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-white h-5 w-5"
              />
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-500 cursor-pointer">
              <FontAwesomeIcon icon={faGoogle} className="text-white h-5 w-5" />
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-700 cursor-pointer">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="text-white h-5 w-5"
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            {/* เส้น OR */}
            <div className="flex items-center justify-center w-full max-w-md mt-5 mb-2 font-bold">
              <hr className="w-full border-t border-gray-300" />
              <h2 className="text-xs text-[#aaa9ac]">OR</h2>
              <hr className="w-full border-t border-gray-300" />
            </div>

            {/* Form Input */}
            <div className="w-full max-w-md">
              <div className="mb-4">
                <input
                  className="shadow appearance-none border-0 w-full py-2 px-3
          text-gray-700 leading-tight focus:outline-none
          focus:shadow-outline rounded-xl bg-gray-50"
                  id="username"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <input
                  className="shadow appearance-none border-0 rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              className="bg-[#25b498] cursor-pointer text-white font-bold rounded-3xl  pr-18 pl-18 pt-3 pb-3"
              onClick={login}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="relative min-h-screen bg-[#25b498] flex flex-col justify-center text-center px-6 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white opacity-10 rounded-lg rotate-45"></div>
        <p className="text-white text-5xl font-bold tracking-wide">New Here?</p>
        <div className="w-full flex justify-center">
          <p className="text-white text-2xl tracking-wide mt-9 max-w-xs">
            Sign Up and discover a great amount of new opportunities!
          </p>
        </div>
        <div className="text-center">
          <button className="bg-white cursor-pointer text-black font-bold rounded-3xl px-8 py-3 mt-8">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default login;
