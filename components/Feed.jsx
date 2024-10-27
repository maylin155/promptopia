"use client"
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);

    if (searchTerm) {
      const filtered = posts.filter(post =>
        post.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.prompt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.creator.username?.includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const filtered = posts.filter(post => post.tag?.toLowerCase().includes(tagName.toLowerCase()));
    setFilteredPosts(filtered);

  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
         const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
              data={filteredPosts}
              handleTagClick={handleTagClick}
            />
      ) : (
        <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed;
