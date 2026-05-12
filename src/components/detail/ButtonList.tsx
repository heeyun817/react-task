import { useNavigate } from "react-router-dom";
import type { PostDetailResponse } from "../../types/post";
import PasswordModal from "./PasswordModal";
import { useState } from "react";

const ButtonList = ({ id, isLiked, likeCount }: PostDetailResponse) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="button-list">
        <button
          type="button"
          className={`like-button ${isLiked ? "liked" : ""}`}
        >
          ♥ {likeCount}
        </button>
        <button
          type="button"
          className="outline-btn"
          onClick={() => navigate("/")}
        >
          목록
        </button>

        <button
          type="button"
          className="outline-btn"
          onClick={() => setIsModalOpen(true)}
        >
          수정
        </button>

        <button type="button" className="danger-btn">
          삭제
        </button>
      </nav>
      <PasswordModal
        postId={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ButtonList;
