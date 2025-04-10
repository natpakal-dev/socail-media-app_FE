import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const inputSearch = ({SearchPost}:{ SearchPost:(title:string, community:string)=> void}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        <FontAwesomeIcon icon={faMagnifyingGlass} width={20} />
      </div>
      <input
        type="search"
        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
        placeholder="Search Mockups, Logos..."
        onChange={(e) => SearchPost(e.target.value,'')}
      />
    </div>
  );
};

export default inputSearch;
