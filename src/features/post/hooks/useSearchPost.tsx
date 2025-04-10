import { useEffect, useState } from "react";
import { Post } from "@/features/post/types";

export function useSearchPost(posts: Post[]) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [searchValueCommunity, setSearchValueCommunity] = useState("");

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);
  
  const SearchPost = (title: string, community: string) => {
    const hasTitle = !!title;
    const selectedCommunity = community || searchValueCommunity;
    const hasCommunity = !!selectedCommunity;

    if (!hasTitle && !hasCommunity) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter((post) => {
      const matchesTitle = hasTitle
        ? post.title.toLowerCase().includes(title.toLowerCase())
        : true;

      const matchesCommunity =
        selectedCommunity !== "All"
          ? hasCommunity &&
            post.community.toLowerCase() === selectedCommunity.toLowerCase()
          : true;

      return matchesTitle && matchesCommunity;
    });

    if (community) {
      setSearchValueCommunity(community);
    }

    if (selectedCommunity === "All" && !hasTitle) {
      setFilteredPosts(posts);
      return;
    }

    setFilteredPosts(filtered);
  };

  return {
    SearchPost,
    filteredPosts,
    setSearchValueCommunity,
  };
}
