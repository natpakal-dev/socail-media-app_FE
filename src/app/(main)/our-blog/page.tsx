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
import InputSearch from "@/app/components/search";
export default function page() {
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFilter, setPostsFilter] = useState<Post[]>(posts);
  const [postsEdit, setPostsEdit] = useState<Post[]>([]);
  const [titlePost, setTitlePost] = useState("");
  const [modalEditModal, setEditModal] = useState(false);
  const [searchValueCommunity, setSearchValueCommunity] = useState("");

  const router = useRouter();

  const handleModal = (modal: boolean, titlePost: string, post?: Post[]) => {
    setTitlePost(titlePost);
    setPostsEdit(post ?? []);
    setModal(modal);
    if (titlePost === "Create Post") {
      setEditModal(false);
    } else {
      setEditModal(true);
    }
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
      setPostsFilter(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onPostClick = (id: string) => {
    router.push(`/post/${id}`);
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
      setModal(false);
      fetchPosts();
    } catch (error: any) {
      Swal.fire({
        title: error.message,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };
  const SearchPost = (title: string, community: string) => {
    const hasTitle = !!title;
    const selectedCommunity = community || searchValueCommunity;
    const hasCommunity = !!selectedCommunity;

    if (!hasTitle && !hasCommunity) {
      setPostsFilter(posts);
      return;
    }
    const filtered = posts.filter((post) => {
      const matchesTitle = hasTitle
        ? post.title.toLowerCase().includes(title.toLowerCase())
        : true;
      let matchesCommunity;
      if (selectedCommunity !== "All") {
        matchesCommunity = hasCommunity
          ? post.community.toLowerCase() === selectedCommunity.toLowerCase()
          : true;
      } else {
        matchesCommunity = true;
      }
      return matchesTitle && matchesCommunity;
    });

    if (community) {
      setSearchValueCommunity(community);
    }
    if (selectedCommunity === "All" && !hasTitle) {
      setPostsFilter(posts);
      return;
    }
    setPostsFilter(filtered);
  };

  return (
    <div className="min-h-screen max-w-3xl mt-5">
      <div className="flex items-center mb-4">
        <div className="flex-grow">
          <div className="relative">
            <InputSearch SearchPost={SearchPost} />
          </div>
        </div>
        <div className="ml-3">
          <select
            className="p-2 h-full focus:outline-none"
            onChange={(e) => SearchPost("", e.target.value)}
          >
            <option value="All">Community</option>
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
        posts={postsFilter}
        onPostClick={onPostClick}
        editModal={true}
        handleDelete={handleDelete}
        handleModal={handleModal}
      />
      {modal && (
        <Modal
          titlePost={titlePost}
          showModal={modal}
          setModal={setModal}
          handleSubmit={handleSubmit}
          editModal={modalEditModal}
          postsEdit={postsEdit}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
}
