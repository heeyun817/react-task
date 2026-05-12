import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailPage.css";
import type { PostDetailResponse } from "../types/post";
import { getPost } from "../apis/post";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<PostDetailResponse>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getPost(Number(id))
      .then(setData)
      .catch(() => setError("게시글을 불러오지 못했습니다."));
  }, [id]);

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
    <main className="detail-page">
      <article className="detail-article">
        <header className="detail-header">
          <h1 className="detail-title">{data?.title}</h1>

          <div className="detail-meta">
            <div className="detail-author">작성자 {data?.author}</div>

            <div>{data?.createdAt}</div>
          </div>
        </header>

        <section className="detail-stat-section">
          <ul className="detail-stat-list">
            <li>조회수 {data?.viewCount}</li>
            <li>좋아요 {data?.likeCount}</li>
            <li>댓글 {data?.commentCount}</li>
          </ul>
        </section>

        {data?.hashtags && data.hashtags.length > 0 && (
          <section className="detail-tag-section">
            <ul className="detail-tag-list">
              {data.hashtags.map((tag) => (
                <li key={tag} className="detail-tag-item">
                  #{tag}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="detail-content-section">
          <p className="detail-content">{data?.content}</p>
        </section>

        <section className="detail-like-section">
          <button
            type="button"
            className={`like-button ${data?.isLiked ? "liked" : ""}`}
          >
            ♥ {data?.likeCount}
          </button>
        </section>

        <nav className="detail-action-nav">
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
      </article>
    </main>
  );
};

export default DetailPage;
