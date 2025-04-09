"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Modal from "@/app/components/modal";
import Swal from "sweetalert2";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "@/features/post/api";
import Table from "@/app/components/table";
import { Post } from "@/features/post/types";
import { useRouter } from "next/navigation";
import ButtonCreate from "@/app/components/buttonCreate";

export default function page() {
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsEdit, setPostsEdit] = useState<Post[]>([]);
  const [editModal, setEditModal] = useState(true);
  const [titlePost, setTitlePost] = useState("");
  const router = useRouter();

  const handleModal = (modal: boolean, titlePost: string, post?: Post[]) => {
    setTitlePost(titlePost);
    setPostsEdit(post ?? []);
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

  const handleDelete = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          await deletePost(id);
          await fetchPosts();
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (
    {
      community,
      title,
      content,
    }: {
      community: string;
      title: string;
      content: string;
    },
    id: string
  ) => {
    try {
      await updatePost({ community, title, content }, id);
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 2500,
      });
      setModal(false)
      fetchPosts();
    } catch (error: any) {
      Swal.fire({
        title: error.message,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };
  return (
    <div className="min-h-screen max-w-3xl">
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
      <Table
        posts={posts}
        onPostClick={onPostClick}
        editModal={editModal}
        handleDelete={handleDelete}
        handleModal={handleModal}
      />
      {modal && (
        <Modal
          titlePost={titlePost}
          showModal={modal}
          setModal={setModal}
          handleSubmit={handleSubmit}
          editModal={editModal}
          postsEdit={postsEdit}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
}
