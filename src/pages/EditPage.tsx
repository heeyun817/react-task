import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/form/PostForm";
import type { PostCreateRequest, PostDetailResponse } from "../types/post";
import "./EditPage.css";
import { getPost, updatePost } from "../apis/post";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>();
  const [data, setData] = useState<PostDetailResponse>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getPost(Number(id))
      .then(setData)
      .catch(() => setError("게시글을 불러오지 못했습니다."));
  }, [id]);

  const handleSubmit = async (payload: PostCreateRequest) => {
    try {
      const postId = await updatePost(payload, Number(id));
      navigate(`/post/${postId}`);
    } catch {
      setSubmitError("게시글 수정에 실패했습니다.");
    }
  };

  if (!data) {
    return (
      <main className="detail-page">
        <section className="detail-state-section">
          <p className="detail-state-text">
            {error && <p className="posts-error">{error}</p>}
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="update-page">
      <h1>게시글 수정</h1>
      <PostForm
        defaultValues={{
          ...data,
          hashtags: data.hashtags?.join(", ") ?? "",
        }}
        onSubmit={handleSubmit}
        serverError={submitError}
        isEdit={true}
      />
    </main>
  );
};

export default EditPage;
