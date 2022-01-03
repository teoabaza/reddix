import "./LoadMore.css";

const LoadMore = ({loadMorePosts}) => {

  const handleClick = () => {
    loadMorePosts();
  }

  return (
    <div className="button-container">
        <button className="LoadMoreButton" onClick={handleClick}>Load More</button>
    </div>
  );
};

export default LoadMore;