import React from "react";
import { Post } from "@/features/post/types";
import { faCircleUser, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Table = ({ posts, onPostClick }: { posts: Post[], onPostClick: (id:string) => void }) => {
  return (
    <div>
      <div>
        {posts.map((post,index) => (
          <div
            className="p-5 bg-white shadow m-1 rounded-tl rounded-tr cursor-pointer"
            key={index}
            onClick={() => onPostClick(post._id)}
          >
            <div className="flex items-center">
                <FontAwesomeIcon icon={faCircleUser} size="2xl"/>
                <p className="ml-2">Natpakal</p>
            </div>
            <div className="p-1 bg-[#f3f3f3] w-fit text-sm rounded-md text-[#9e9e9e] mt-2 mb-2 ">
              {post.community}
            </div>
            <div className="font-bold text-1xl">{post.title}</div>
            <div className="text-sm">{post.content}</div>
            <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faComment} color="gray"/>
                <p className="ml-2 text-[#9e9e9e]">4 comments</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
