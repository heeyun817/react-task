import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailPage.css";
import type { PostDetailResponse } from "../types/post";
import { getPost } from "../apis/post";
import Header from "../components/detail/Header";
import Stat from "../components/detail/Stat";
import Hashtag from "../components/detail/Hashtag";
import ButtonList from "../components/detail/ButtonList";
import Comment from "../components/comment/Comment";

const DetailPage = () => {
  const { id } = useParams();

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
        <Header {...data} />

        <Stat {...data} />

        {data.hashtags && data.hashtags.length > 0 && <Hashtag {...data} />}

        <section className="detail-content-section">
          <p className="detail-content">{data?.content}</p>
        </section>

        <ButtonList {...data} />
      </article>
      <section className="comment-section">
        <Comment postId={Number(id)} />
      </section>
    </main>
  );
};

export default DetailPage;
