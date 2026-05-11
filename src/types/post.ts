export type PostCreateRequest = {
  title: string;
  content: string;
  author: string;
  password: string;
  hashtags?: string[];
};

export type PostSearchType = "TITLE" | "AUTHOR" | "CONTENT" | "HASHTAG";

export type PostSearchCondition = {
  postSearchType?: PostSearchType | "";
  keyword?: string;
  startDate?: string;
  endDate?: string;
};

export type PostListParams = PostSearchCondition & {
  page?: number;
  size?: number;
};

export type PostResponse = {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  commentCount: number;
  viewCount: number;
  likeCount: number;
  isNew: boolean;
};

export type PostListResponse = {
  postResponse: PostResponse[];
  totalPostCount: number;
  totalCommentCount: number;
  page: number;
  size: number;
};
