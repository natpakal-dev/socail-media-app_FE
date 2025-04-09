"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { getPost } from "@/features/post/api";

const listPost = () => {
  const params = useParams();
  const [post, setPost] = React.useState<any>(null);
  const { slug } = params;
  const fetchPost = async () => {
    try {
      const response = await getPost(`${slug}`);
      setPost(response.data);
      console.log("res", response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="min-h-screen">
      <h1>Hello, Blog Post Page! ID: {slug}</h1>
    </div>
  );
};

export default listPost;
