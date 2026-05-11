import type {
  PostCreateRequest,
  PostDetailResponse,
  PostListParams,
  PostListResponse,
} from "../types/post";
import { axiosInstance } from "./axios";

// 생성
export async function createPost(request: PostCreateRequest): Promise<number> {
  const { data } = await axiosInstance.post<number>("/api/posts", request);
  return data;
}

// 목록
export async function getPostList(
  params: PostListParams,
): Promise<PostListResponse> {
  const { data } = await axiosInstance.get<PostListResponse>("/api/posts", {
    params,
  });
  return data;
}

// 상세 조회
export async function getPost(postId: number): Promise<PostDetailResponse> {
  const { data } = await axiosInstance.get<PostDetailResponse>(
    `/api/posts/${postId}`,
  );
  return data;
}
