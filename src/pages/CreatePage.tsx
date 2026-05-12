import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../apis/post";
import PostForm from "../components/post/PostForm";
import type { PostCreateRequest } from "../types/post";
import "./CreatePage.css";

const CreatePage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>();

  const handleSubmit = async (payload: PostCreateRequest) => {
    try {
      const postId = await createPost(payload);
      navigate(`/post/${postId}`);
    } catch {
      setSubmitError("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <main className="create-page">
      <h1>게시글 작성</h1>
      <PostForm onSubmit={handleSubmit} serverError={submitError} />
    </main>
  );
};

export default CreatePage;
