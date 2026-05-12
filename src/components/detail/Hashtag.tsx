import type { PostDetailResponse } from "../../types/post";

const Hashtag = ({ hashtags }: PostDetailResponse) => {
  return (
    <section className="detail-tag-section">
      <ul className="detail-tag-list">
        {hashtags?.map((tag) => (
          <li key={tag} className="detail-tag-item">
            #{tag}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Hashtag;
