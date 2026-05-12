import type {
  PasswordVerifyRequest,
  PostCreateRequest,
  PostDetailResponse,
  PostListParams,
  PostListResponse,
  PostUpdateRequest,
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

// 수정 전 비밀번호 확인
export async function verifyPassword(
  request: PasswordVerifyRequest,
  postId: number,
): Promise<number> {
  const { data } = await axiosInstance.post<number>(
    `/api/posts/${postId}/verify-password`,
    request,
  );
  return data;
}

// 수정
export async function updatePost(
  request: PostUpdateRequest,
  postId: number,
): Promise<number> {
  const { data } = await axiosInstance.put<number>(
    `/api/posts/${postId}`,
    request,
  );
  return data;
}
