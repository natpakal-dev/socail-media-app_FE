"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Sidebar() {
  const [activePath, setActivePath] = useState("");
  useEffect(() => {
    const path = window.location.pathname;
    setActivePath(path);
  }, []);

  const getLinkClassName = (path: string) => {
    if (activePath === path) {
      return "font-bold";
    }
    return "text-gray-600";
  };
  return (
    <div className="h-full pt-5 pl-5">
      <ul>
        <li>
          <Link
            href="/home-page"
            className={`${getLinkClassName("/home-page")}`}
            onClick={() => setActivePath("/home-page")}
          >
            <FontAwesomeIcon icon={faHouse} className="mr-2" />
            Home
          </Link>
        </li>
        <li className="mt-5">
          <Link
            href="/our-blog"
            className={`${getLinkClassName("/our-blog")}`}
            onClick={() => setActivePath("/our-blog")}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="mr-2" /> Our Blog
          </Link>
        </li>
      </ul>
    </div>
  );
}
