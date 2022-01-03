import "./SearchBar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectRedditPosts } from "../../features/posts/postsSlice";
import Filter from "../filter/Filter";

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const redditPosts = useSelector(selectRedditPosts);
  const dispatch = useDispatch();

 
  const apiAddress = `https://www.reddit.com/search.json?q=${input}&limit=10`;


  const handleChange = (e) => setInput(e.target.value);

  const handleSearch = (e) => {
    if (!input) return;
    e.preventDefault();
    dispatch(fetchPosts(apiAddress));
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="SearchBar">
        <input
          type="search"
          placeholder="Search here..."
          value={input}
          onChange={handleChange}
          required
        />
        <button type="submit" className="SearchButton">
          Search
        </button>
      </form>
      {redditPosts.children && redditPosts.children.length > 0 && (<Filter input={input} num={props.num}/>)}
    </div>
  );
};

export default SearchBar;
