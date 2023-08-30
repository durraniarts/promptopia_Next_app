"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const toCheck = (post, searchText) => {
  const {
    prompt,
    creator: { username: username },
    tag,
  } = post;

  return (
    prompt.toLowerCase().includes(searchText) ||
    username.toLowerCase().includes(searchText) ||
    tag.toLowerCase().includes(searchText)
  );
};

const PromptCardList = ({ data, handleTagClick, searchText }) => {
  const toShow = () => {
    if (searchText === "") {
      return data.map((post, index) => (
        <PromptCard key={index} post={post} handleTagClick={handleTagClick} />
      ));
    }
    if (searchText !== "") {
      return data.map(
        (post, index) =>
          toCheck(post, searchText) && (
            <PromptCard
              key={index}
              post={post}
              handleTagClick={handleTagClick}
            />
          )
      );
    }
  };

  return <div className="mt-16 prompt_layout">{toShow()}</div>;
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className=" relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
        searchText={searchText.toLowerCase()}
      />
    </section>
  );
};

export default Feed;
