export type CommentCreateRequest = {
  content: string;
  author: string;
  password: string;
};

export type CommentResponse = {
  id: number;
  content: string;
  author: string;
  createdAt: string;
};

export type CommentListResponse = {
  commentResponse: CommentResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};
