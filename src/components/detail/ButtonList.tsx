import { useNavigate } from "react-router-dom";
import type { PostDetailResponse } from "../../types/post";

const ButtonList = ({ isLiked, likeCount }: PostDetailResponse) => {
  const navigate = useNavigate();
  return (
    <nav className="button-list">
      <button type="button" className={`like-button ${isLiked ? "liked" : ""}`}>
        ♥ {likeCount}
      </button>
      <button
        type="button"
        className="outline-btn"
        onClick={() => navigate("/")}
      >
        목록
      </button>

      <button type="button" className="outline-btn">
        수정
      </button>

      <button type="button" className="danger-btn">
        삭제
      </button>
    </nav>
  );
};

export default ButtonList;
