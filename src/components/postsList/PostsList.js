import LoadMore from "../loadMore/LoadMore";
import "./PostsList.css";
import React from "react";
import {
  selectRedditPosts,
  selectPostsAreLoading,
  selectPostsHaveError,
} from "../../features/posts/postsSlice";
import { useSelector } from "react-redux";
import Post from "../../features/posts/Post";
import Loading from "../loading/Loading";
import Error from "../error/Error";

const PostsList = ({loadMorePosts}) => {
  const redditPosts = useSelector(selectRedditPosts);
  const postsAreLoading = useSelector(selectPostsAreLoading);
  const postsHaveError = useSelector(selectPostsHaveError);

  if (postsAreLoading) return <Loading />;

  if (postsHaveError) {
    return <Error />;
  } else if (redditPosts.children && !redditPosts.children.length) {
    return <Error />;
  }

  return (
    <div className="PostsList">
      {!redditPosts.children
        ? ""
        : redditPosts.children.map((post) => (
            <Post post={post.data} key={post.data.id}/>
          ))}
      {redditPosts.children && <LoadMore loadMorePosts={loadMorePosts}/>}
    </div>
  );
};

export default PostsList;
