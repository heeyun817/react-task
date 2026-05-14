export type CommentCreateRequest = {
  content: string;
  author: string;
  password: string;
};

export type CommentResponses = {
  id: number;
  content: string;
  author: string;
  createdAt: string;
};

export type CommentListResponse = {
  commentResponses: CommentResponses[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

export type CommentListParams = {
  page?: number;
  size?: number;
};

export type CommentUpdateRequest = {
  content: string;
  password: string;
};
