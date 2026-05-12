import type { PostDetailResponse } from "../../types/post";

const Stat = ({ viewCount, likeCount, commentCount }: PostDetailResponse) => {
  return (
    <section className="detail-stat-section">
      <ul className="detail-stat-list">
        <li>조회수 {viewCount}</li>
        <li>좋아요 {likeCount}</li>
        <li>댓글 {commentCount}</li>
      </ul>
    </section>
  );
};

export default Stat;
