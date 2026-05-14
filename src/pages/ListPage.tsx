import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostList } from "../apis/post";
import PostCard from "../components/list/PostCard";
import PostSearchBar from "../components/list/PostSearchBar";
import "./ListPage.css";
import type {
  PostListResponse,
  PostResponse,
  PostSearchCondition,
} from "../types/post";
import { PAGE_SIZE } from "../constants/post";
import { getUserCount } from "../apis/user";
import Pagination from "../components/common/Pagination";

const ListPage = () => {
  const [data, setData] = useState<PostListResponse>();
  const [page, setPage] = useState(0);
  const [condition, setCondition] = useState<PostSearchCondition>({});
  const [error, setError] = useState<string>("");
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    getPostList({ ...condition, page, size: PAGE_SIZE })
      .then(setData)
      .catch(() => setError("게시글을 불러오지 못했습니다."));
  }, [condition, page]);

  useEffect(() => {
    getUserCount()
      .then(setUserCount)
      .catch(() => setError("유저수를 불러오지 못했습니다."));
  }, []);

  const handleSearch = (condition: PostSearchCondition) => {
    setCondition(condition);
    setPage(0);
  };

  const totalPages = data
    ? Math.max(1, Math.ceil(data.totalPostCount / PAGE_SIZE))
    : 1;

  return (
    <main className="posts-container">
      <h1>게시글 목록</h1>

      <div className="posts-summary">
        <span>
          접속 유저 수: <strong>{userCount ?? 0}</strong>명
        </span>
        <span>
          전체 게시글: <strong>{data?.totalPostCount ?? 0}</strong>개
        </span>
        <span>
          전체 댓글: <strong>{data?.totalCommentCount ?? 0}</strong>개
        </span>
      </div>

      <Link className="posts-create-btn" to="/create">
        글 작성
      </Link>

      <PostSearchBar onSearch={handleSearch} />

      {error && <p className="posts-error">{error}</p>}

      <section className="post-list">
        {data?.postResponse.length === 0 && <p>게시글이 없습니다.</p>}
        {data?.postResponse.map(
          ({
            id,
            title,
            author,
            createdAt,
            commentCount,
            viewCount,
            likeCount,
            isNew,
          }: PostResponse) => (
            <PostCard
              key={id}
              id={id}
              title={title}
              author={author}
              createdAt={createdAt}
              commentCount={commentCount}
              viewCount={viewCount}
              likeCount={likeCount}
              isNew={isNew}
            />
          ),
        )}
      </section>

      {data && data.totalPostCount > 0 && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </main>
  );
};

export default ListPage;
