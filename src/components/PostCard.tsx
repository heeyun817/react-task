import { Link } from "react-router-dom";
import type { PostResponse } from "../types/post";
import "./PostCard.css";

const PostCard = ({
  id,
  title,
  author,
  createdAt,
  commentCount,
  viewCount,
  likeCount,
  isNew,
}: PostResponse) => {
  return (
    <article className="post-card">
      <div className="post-card-title">
        {isNew && <span className="new-badge">NEW</span>}
        <Link to={`/post/${id}`}>{title}</Link>
      </div>
      <div className="post-card-meta">
        <p>{author}</p>
        <p>{createdAt}</p>
        <span>댓글 {commentCount}</span>
        <span>조회 {viewCount}</span>
        <span>좋아요 {likeCount}</span>
      </div>
    </article>
  );
};

export default PostCard;
