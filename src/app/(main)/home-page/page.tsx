"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Modal from "@/app/components/modal";
import Swal from "sweetalert2";
import { createPost, getAllPosts } from "@/features/post/api";
import Table from "@/app/components/table";
import { Post } from "@/features/post/types";
import { useRouter } from "next/navigation";
import ButtonCreate from "@/app/components/buttonCreate";

export default function HomePage() {
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editModal, setEditModal] = useState(false);
  const router = useRouter();

  const handleModal = (modal: boolean) => {
    setModal(modal);
  };

  const handleSubmit = async ({
    community,
    title,
    content,
  }: {
    community: string;
    title: string;
    content: string;
  }) => {
    try {
      await createPost({ community, title, content });
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onPostClick = (id: string) => {
    router.push(`/posts/${id}`);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center mb-4">
        <div className="flex-grow">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} width={20} />
            </div>
            <input
              type="search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
              placeholder="Search Mockups, Logos..."
            />
          </div>
        </div>
        <div className="ml-3">
          <select className="p-2 h-full focus:outline-none">
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
      <Table posts={posts} onPostClick={onPostClick} editModal={editModal} />
      {modal && (
        <Modal
          titlePost="Create Post"
          showModal={modal}
          setModal={setModal}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
