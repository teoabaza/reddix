import "./Filter.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../features/posts/postsSlice";

const Filter = ({ input, num}) => {
  const [filterPosts, setFilterPosts] = useState("relevance");
  const [filterTime, setFilterTime] = useState("all");
  const [address, setAddress] = useState(`https://www.reddit.com/search.json?q=${input}&limit=${num}`);

  const dispatch = useDispatch();

  const handleFilter = ({ target }) => {

    if (target.className === "sort") {
      setFilterPosts(target.id);
    } else {
      setFilterTime(target.id);
    }
  };

  useEffect(() => {
    
    setAddress(`https://www.reddit.com/search.json?q=${input}&limit=${num}&sort=${filterPosts}&t=${filterTime}`);

    dispatch(fetchPosts(address));

}, [filterPosts, filterTime, input, address, dispatch, num]);

const handleRemove = (e) => {
  if(e.target.id==="filterPostsButton"){
    setFilterPosts("relevance");
  } else {
    setFilterTime("all");
  }
}

  return (
    <div className="Filter">
      <div>
      <div className="dropdown">
        <button className="sortButton">Sort &#127912;</button>
        <div className="dropdown-content">
          <p className="sort" id="relevance" onClick={handleFilter}>
            Relevance
          </p>
          <p className="sort" id="top" onClick={handleFilter}>
            Top
          </p>
          <p className="sort" id="new" onClick={handleFilter}>
            New
          </p>
          <p className="sort" id="most-comments" onClick={handleFilter}>
            Most comments
          </p>
        </div>
      </div>

      <div className="dropdown">
        <button className="timeButton">Time &#128338;</button>
        <div className="dropdown-content">
          <p className="time" id="all" onClick={handleFilter}>
            All Time
          </p>
          <p className="time" id="year" onClick={handleFilter}>
            Past Year
          </p>
          <p className="time" id="month" onClick={handleFilter}>
            Past Month
          </p>
          <p className="time" id="week" onClick={handleFilter}>
            Past Week
          </p>
          <p className="time" id="day" onClick={handleFilter}>
            Past 24 Hours
          </p>
          <p className="time" id="hour" onClick={handleFilter}>
            Past Hour
          </p>
        </div>
      </div>
    </div>

     {(filterTime!=='all' || filterPosts!=='relevance') && (<div className="currentFilters">
        <p>Current filters: </p>
        {filterPosts!=='relevance' && (<div className="currentFilter1">
          <p>{filterPosts}</p>
          <button id="filterPostsButton" onClick={handleRemove}> &#10060; </button>
        </div>)}
        {filterTime!=='all' && (<div className="currentFilter2">
          <p>{filterTime}</p>
          <button id="filterTimeButton" onClick={handleRemove}> &#10060; </button>
        </div>)}
      </div>)}

    </div>
  );
};

export default Filter;
