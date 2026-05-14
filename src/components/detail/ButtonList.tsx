import { useNavigate } from "react-router-dom";
import type { PostDetailResponse } from "../../types/post";
import PasswordModal from "./PasswordModal";
import { useState } from "react";
import { deletePost, toggleLike, verifyPassword } from "../../apis/post";

const ButtonList = ({ id, isLiked, likeCount }: PostDetailResponse) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"edit" | "delete" | null>(null);
  const [like, setLike] = useState<boolean>(isLiked);
  const [count, setCount] = useState<number>(likeCount);

  const handleConfirm = async (password: string) => {
    if (mode === "edit") {
      await verifyPassword({ password }, id);
      navigate(`/post/${id}/update`);
    } else if (mode === "delete") {
      await deletePost({ password }, id);
      navigate("/");
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const data = await toggleLike(postId);
      setLike(data.isLiked);
      setCount(data.likeCount);
    } catch {
      throw new Error("좋아요에 실패했습니다.");
    }
  };

  return (
    <>
      <nav className="button-list">
        <button
          type="button"
          className={`like-button ${like ? "liked" : ""}`}
          onClick={() => handleLike(id)}
        >
          ♥ {count}
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
