"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import ButtonCreate from "../components/buttonCreate";
import Modal from "../components/modal";
import Swal from "sweetalert2";
import { createPost, getAllPosts } from "@/features/post/api";
import Table from "../components/table";
import { Post } from "@/features/post/types";
import { useRouter } from "next/navigation";

const homepage = () => {
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  
  const handleModal = (modal: boolean) => {
    setModal(modal);
  };

  const handleSubmit = async ( {
    community,
    title,
    content,
  }: {
    community: string;
    title: string;
    content: string;
  }) => {
    try {
      const result = await createPost({ community, title, content });
      console.log('results',result);
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 2500,
      });
      fetchPosts();
    } catch (error: any) {
      Swal.fire({
        title: error.message,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };
  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      setPosts(response.data);
      console.log('res',response.data);
    } catch (error) {
      console.log(error);
    }
  };
   useEffect(() => {
      fetchPosts();
    }, []);

  const onPostClick =(id:string)=>{
    console.log('clicked',id);
    router.push(`/posts/${id}`);
  }
  return (
    <div className="min-h-screen w-full bg-[#bcc1c0]">
      <div className="grid grid-cols-8 gap-2 ">
        <div className="col-span-2 ml-5 mt-5">
          <ul>
            <li>
              <FontAwesomeIcon icon={faHouse} className="mr-2" />
              Home
            </li>
            <li className="mt-5">
              <FontAwesomeIcon icon={faPenToSquare} className="mr-2" /> Our Blog
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center col-span-5">
          <div className="w-full flex items-center">
            <div className="flex-grow">
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
            <div className="h-10 ml-3">
              <select className="p-1 h-full focus:outline-none">
                <option value="Community">Community</option>
                <option value="Music">Music</option>
                <option value="Foods">Foods</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div className="ml-3">
              <ButtonCreate title="Create+" handleModal={handleModal} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-2 ">
        <div className="col-span-2 ml-5 mt-5"></div>
        <div className="col-span-5">
          <Table posts={posts} onPostClick={onPostClick}/>
        </div>
      </div>
      {modal && (
        <Modal
          showModal={modal}
          setModal={setModal}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default homepage;
