import React from "react";
import { Post } from "@/features/post/types";
import {
  faCircleUser,
  faComment,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Table = ({
  posts,
  onPostClick,
  editModal,
  handleDelete,
  handleModal
}: {
  posts: Post[];
  onPostClick: (id: string) => void;
  editModal: boolean;
  handleDelete?: (id: string) => void;
  handleModal?: (modal: boolean, titlePost: string, post: Post[]) => void
}) => {
  return (
    <div>
      <div>
        {posts.map((post, index) => (
          <div key={index}>
            {editModal ? (
              <div
                className="p-5 bg-white shadow m-1 rounded-tl rounded-tr cursor-pointer"
                key={index}
                onClick={() => onPostClick(post._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCircleUser} size="2xl" color="green"/>
                    <p className="ml-2  text-sm">Natpakal</p>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faPenToSquare} className="mr-3" onClick={(e)=>{
                      e.stopPropagation();
                      handleModal?.(true,'Edit Post',[post])
                    }} color="#4aa56a"/>
                    <FontAwesomeIcon icon={faTrash} onClick={(e)=>{
                      e.stopPropagation();
                      handleDelete?.(post._id)}
                      } color="#4aa56a"/>
                  </div>
                </div>
                <div className="p-1 bg-[#f3f3f3] w-fit text-sm rounded-md text-[#9e9e9e] mt-2 mb-2 ">
                  {post.community}
                </div>
                <div className="font-bold text-1xl">{post.title}</div>
                <div className="text-sm">{post.content}</div>
                <div className="flex items-center mt-2">
                  <FontAwesomeIcon icon={faComment} color="gray" />
                  <p className="ml-2 text-[#9e9e9e]">0 comments</p>
                </div>
              </div>
            ) : (
              <div
                className="p-5 bg-white shadow m-1 rounded-tl rounded-tr cursor-pointer"
                key={index}
                onClick={() => onPostClick(post._id)}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCircleUser} size="2xl" color="green" />
                  <p className="ml-2 text-sm">Natpakal</p>
                </div>
                <div className="p-1 bg-[#f3f3f3] w-fit text-sm rounded-md text-[#9e9e9e] mt-2 mb-2 ">
                  {post.community}
                </div>
                <div className="font-bold text-1xl">{post.title}</div>
                <div className="text-sm">{post.content}</div>
                <div className="flex items-center mt-2">
                  <FontAwesomeIcon icon={faComment} color="gray" />
                  <p className="ml-2 text-[#9e9e9e]">0 comments</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
