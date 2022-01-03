import "./Post.css";
import moment from "moment";

const Post = ({ post }) => {
  const getDate = (date) => {
    const dateTime = new Date(date * 1000);
    return moment(dateTime).fromNow();
  };

  const formatNumber = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "k";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num <= 999) {
      return num;
    }
  };

  const linkFlairStyles = {
    fontSize: "0.9rem",
    background: post.link_flair_background_color,
    color: post.link_flair_text_color === "light" ? "white" : "black",
    padding: "0.15em 0.5em",
    borderRadius: "15px 15px",
  };

  return (
    <div className="post">
      <div className="first">
        <p className="subredditName">{post.subreddit_name_prefixed} </p>
        <p>Posted by: {post.author}</p>
        <p>{getDate(post.created_utc)}</p>
      </div>

      <div className="second">
        <p className="text">
          {post.title}{" "}
          <span style={linkFlairStyles}>{post.link_flair_text}</span>
        </p>
        {post.thumbnail !== "self" ? <img src={post.thumbnail} alt="" /> : ""}
      </div>

      <div className="third">
        <p className="numberOfComments">
          {formatNumber(post.num_comments)} Comments
        </p>
        <p className="numberOfUpvotes"> {formatNumber(post.ups)} Upvotes</p>
        <p className="numberOfAwards"> {post.total_awards_received} Awards</p>
      </div>
    </div>
  );
};

export default Post;
