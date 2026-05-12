import type { CommentCreateRequest } from "../types/comment";
import { axiosInstance } from "./axios";

// 생성
export async function createComment(
  request: CommentCreateRequest,
  postId: number,
): Promise<number> {
  const { data } = await axiosInstance.post<number>(
    `/api/posts/${postId}`,
    request,
  );
  return data;
}
