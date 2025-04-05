"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import ButtonCreate from "../components/buttonCreate";
import Modal from "../components/modal";

const page = () => {
  const [modal, setModal] = useState(false);

  const handleModal =(modal: boolean)=> {
    setModal(modal);
  }

  const handleSubmit =(e: React.FormEvent)=>{
    e.preventDefault();
    console.log('e',e);
    console.log('Form submitted from page component');
  }
  return (
    <div className="min-h-screen w-full bg-[#bcc1c0]">
      <div className="grid grid-cols-8 gap-2 ">
        <div className="col-span-2 ml-5 mt-5">
          <ul>
            <li>Home</li>
            <li className="mt-5">Our Blog</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center col-span-5">
          <form className="w-full flex items-center" onSubmit={handleSubmit}>
            <div className="flex-grow">
              <label className="mb-2 text-sm font-medium dark:text-white">
                Search
              </label>
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none dark:text-gray-400">
                  <FontAwesomeIcon icon={faMagnifyingGlass} width={20} />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                  placeholder="Search Mockups, Logos..."
                />
              </div>
            </div>
            <div className="h-10 mt-5 ml-3">
              <select className="p-1 h-full focus:outline-none">
                <option value="Community">Community</option>
                <option value="Music">Music</option>
                <option value="Foods">Foods</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div className="mt-5 ml-3">
              <ButtonCreate title="Create+" handleModal={handleModal}/>
            </div>
          </form>
        </div>
      </div>
      {modal && <Modal showModal={modal} setModal={setModal} handleSubmit={handleSubmit}/>}
    </div>
  );
};

export default page;