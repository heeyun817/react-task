import { useState } from "react";
import CommentForm from "./CommentForm";
import { createComment } from "../../apis/comment";
import type { CommentCreateRequest } from "../../types/comment";

interface CommentProps {
  postId: number;
}

const Comment = ({ postId }: CommentProps) => {
  const [serverError, setServerError] = useState<string>("");

  const handleCreate = async (payload: CommentCreateRequest) => {
    setServerError("");
    try {
      return await createComment(payload, postId);
    } catch {
      setServerError("댓글 등록에 실패했습니다.");
      throw new Error("createComment failed");
    }
  };

  return (
    <CommentForm onSubmit={handleCreate} serverError={serverError} />
  );
};

export default Comment;
