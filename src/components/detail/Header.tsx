import type { PostDetailResponse } from "../../types/post";
import "./Header.css";

const Header = ({ title, author, createdAt }: PostDetailResponse) => {
  return (
    <header className="detail-header">
      <h1 className="detail-title">{title}</h1>

      <div className="detail-meta">
        <div className="detail-author">작성자 : {author}</div>

        <div>{createdAt}</div>
      </div>
    </header>
  );
};

export default Header;
