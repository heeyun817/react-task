import { useState } from "react";
import type {
  CommentResponses,
  CommentUpdateRequest,
} from "../../types/comment";
import "./CommentCard.css";
import { updateComment } from "../../apis/comment";

const CommentCard = ({ id, content, author, createdAt }: CommentResponses) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [password, setPassword] = useState("");
  const [newContent, setNewContent] = useState(content);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: CommentUpdateRequest = { content: newContent, password };
    try {
      await updateComment(payload, Number(id));
      window.location.reload();
    } catch {
      setError("댓글 수정에 실패했습니다.");
    }
  };

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
          onClick={() => (isOpen == true ? setIsOpen(false) : setIsOpen(true))}
        >
          수정
        </button>
        <button type="button" className="comment-danger-btn">
          삭제
        </button>
      </section>
      {isOpen && (
        <div className="comment-edit-modal">
          <form onSubmit={handleSubmit}>
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
              <button type="button" onClick={() => setIsOpen(true)}>
                취소
              </button>
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
