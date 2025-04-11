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
import InputSearch from "@/app/components/search";
export default function HomePage() {
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFilter, setPostsFilter] = useState<Post[]>(posts);
  const [searchValueCommunity, setSearchValueCommunity] = useState("");
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
      setPostsFilter(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onPostClick = (id: string) => {
    router.push(`/post/${id}`);
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
      <Table posts={postsFilter} onPostClick={onPostClick} editModal={false} />
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
