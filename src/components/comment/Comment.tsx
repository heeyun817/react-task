import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { createComment, getCommentList } from "../../apis/comment";
import type {
  CommentCreateRequest,
  CommentListResponse,
  CommentResponses,
} from "../../types/comment";
import CommnetCard from "./CommnetCard";
import "./Comment.css";
import { PAGE_SIZE } from "../../constants/comment";

interface CommentProps {
  postId: number;
}

const Comment = ({ postId }: CommentProps) => {
  const [serverError, setServerError] = useState<string>("");
  const [comment, setComment] = useState<CommentListResponse>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    getCommentList(postId, { page, size: PAGE_SIZE })
      .then(setComment)
      .catch(() => setServerError("게시글을 불러오지 못했습니다."));
  }, [page]);

  const handleCreate = async (payload: CommentCreateRequest) => {
    try {
      await createComment(payload, postId);
    } catch {
      setServerError("댓글 등록에 실패했습니다.");
      throw new Error("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <>
      <CommentForm onSubmit={handleCreate} serverError={serverError} />
      <section className="comment-list">
        <h1 className="comment-list-title">
          댓글 (<strong>{comment?.totalElements ?? 0}</strong>개)
        </h1>
        {comment?.commentResponses.length === 0 && <p>댓글이 없습니다.</p>}
        {comment?.commentResponses.map(
          ({ id, content, author, createdAt }: CommentResponses) => (
            <CommnetCard
              key={id}
              id={id}
              content={content}
              author={author}
              createdAt={createdAt}
            />
          ),
        )}
      </section>
      {comment && comment.totalElements > 0 && (
        <nav className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            ←
          </button>
          <span>
            {page + 1} / {comment.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page + 1 >= comment.totalPages}
          >
            →
          </button>
        </nav>
      )}
    </>
  );
};

export default Comment;
