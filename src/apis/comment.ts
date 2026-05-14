import type {
  CommentCreateRequest,
  CommentListParams,
  CommentListResponse,
  CommentUpdateRequest,
} from "../types/comment";
import { axiosInstance } from "./axios";

// 생성
export async function createComment(
  request: CommentCreateRequest,
  postId: number,
): Promise<number> {
  const { data } = await axiosInstance.post<number>(
    `/api/comments/${postId}`,
    request,
  );
  return data;
}

// 조회
export async function getCommentList(
  postId: number,
  params: CommentListParams,
): Promise<CommentListResponse> {
  const { data } = await axiosInstance.get<CommentListResponse>(
    `/api/comments/${postId}`,
    { params },
  );
  return data;
}

// 수정
export async function updateComment(
  request: CommentUpdateRequest,
  postId: number,
): Promise<number> {
  const { data } = await axiosInstance.put<number>(
    `/api/comments/${postId}`,
    request,
  );
  return data;
}
