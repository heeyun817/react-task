import { useNavigate } from "react-router-dom";
import type { PostDetailResponse } from "../../types/post";
import PasswordModal from "./PasswordModal";
import { useState } from "react";
import { deletePost, verifyPassword } from "../../apis/post";

const ButtonList = ({ id, isLiked, likeCount }: PostDetailResponse) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"edit" | "delete" | null>(null);

  const handleConfirm = async (password: string) => {
    if (mode === "edit") {
      await verifyPassword({ password }, id);
      navigate(`/post/${id}/update`);
    } else if (mode === "delete") {
      await deletePost({ password }, id);
      navigate("/");
    }
  };

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
          onClick={() => (mode === "edit" ? setMode(null) : setMode("edit"))}
        >
          수정
        </button>

        <button
          type="button"
          className="danger-btn"
          onClick={() =>
            mode === "delete" ? setMode(null) : setMode("delete")
          }
        >
          삭제
        </button>
      </nav>
      <PasswordModal
        isOpen={mode !== null}
        onClose={() => setMode(null)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ButtonList;
