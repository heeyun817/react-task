import { useState } from "react";
import type {
  CommentDeleteRequest,
  CommentResponses,
  CommentUpdateRequest,
} from "../../types/comment";
import "./CommentCard.css";
import { deleteComment, updateComment } from "../../apis/comment";

const CommentCard = ({ id, content, author, createdAt }: CommentResponses) => {
  const [mode, setMode] = useState<"edit" | "delete" | null>(null);
  const [error, setError] = useState<string>();
  const [password, setPassword] = useState("");
  const [newContent, setNewContent] = useState(content);

  const handleEdit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: CommentUpdateRequest = { content: newContent, password };
    try {
      await updateComment(payload, Number(id));
      window.location.reload();
    } catch {
      setError("댓글 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: CommentDeleteRequest = { password };
    try {
      await deleteComment(payload, Number(id));
      window.location.reload();
    } catch {
      setError("댓글 삭제에 실패했습니다.");
    }
  };

  if (!content) {
    return (
      <main className="comment-card">
        <div className="comment-card-meta">
          <p>작성자</p>
          <p>작성일</p>
        </div>
        <div className="comment-card-content">
          <p>{content}</p>
        </div>
        <p>삭제된 댓글입니다.</p>
      </main>
    );
  }

  return (
    <article className="comment-card">
      <div className="comment-card-meta">
        <p>{author}</p>
        <p>{createdAt}</p>
      </div>
      <div className="comment-card-content">
        <p>{content}</p>
      </div>
      <section className="comment-button-section">
        <button
          type="button"
          className="comment-outline-btn"
          onClick={() => (mode === "edit" ? setMode(null) : setMode("edit"))}
        >
          수정
        </button>
        <button
          type="button"
          className="comment-danger-btn"
          onClick={() =>
            mode === "delete" ? setMode(null) : setMode("delete")
          }
        >
          삭제
        </button>
      </section>
      {mode == "edit" && (
        <div className="comment-edit-modal">
          <form onSubmit={handleEdit}>
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="내용 수정"
              autoFocus
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              autoFocus
            />
            {error && <p className="modal-error">{error}</p>}
            <div className="modal-buttons">
              <button type="button" onClick={() => setMode(null)}>
                취소
              </button>
              <button type="submit" disabled={!newContent && !password}>
                확인
              </button>
            </div>
          </form>
        </div>
      )}
      {mode == "delete" && (
        <div className="comment-edit-modal">
          <form onSubmit={handleDelete}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              autoFocus
            />
            {error && <p className="modal-error">{error}</p>}
            <div className="modal-buttons">
              <button type="submit" disabled={!password}>
                확인
              </button>
            </div>
          </form>
        </div>
      )}
    </article>
  );
};

export default CommentCard;
