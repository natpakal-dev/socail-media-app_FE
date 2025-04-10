"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { getPost } from "@/features/post/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faCircleUser,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Post } from "@/features/post/types";
const listPost = () => {
  const params = useParams();
  const [posts, setPosts] = React.useState<Post>({} as Post);
  const { slug } = params;
  const fetchPost = async () => {
    try {
      const response = await getPost(`${slug}`);
      setPosts(response.data);
      console.log("res", response);
    } catch (error) {}
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="min-h-screen bg-[white] -mt-2">
      <div className="w-3/4 mx-auto">
        <FontAwesomeIcon
          icon={faBackward}
          className="p-3 bg-[#d6e9e4] rounded-4xl mt-6 cursor-pointer"
          onClick={() => window.history.back()}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-7">
            <FontAwesomeIcon icon={faCircleUser} size="2xl" color="green" />
            <p className="ml-2 text-sm">Natpakal</p>
          </div>
        </div>
        <div className="p-1 bg-[#f3f3f3] w-fit text-sm rounded-md text-[#9e9e9e] mt-2 mb-2 ">
          {posts.community}
        </div>
        <div className="font-bold text-4xl mt-5 mb-5">{posts.title}</div>
        <div className="text-md">{posts.content}</div>
        <div className="flex items-center mt-6 mb-6">
          <FontAwesomeIcon icon={faComment} color="gray" />
          <p className="ml-2 text-[#9e9e9e]">0 comments</p>
        </div>
        <div>
          <button className="p-3 bg-[white] border border-[#4aa56a]  text-[#4aa56a] font-bold py-2 px-4 rounded-md text-sm mt-2 mb-2">Add Comments</button>
        </div>
      </div>
    </div>
  );
};

export default listPost;
