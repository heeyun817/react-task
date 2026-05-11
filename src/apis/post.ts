import type {
  PostCreateRequest,
  PostListParams,
  PostListResponse,
} from "../types/post";
import { axiosInstance } from "./axios";

export async function createPost(request: PostCreateRequest): Promise<number> {
  const { data } = await axiosInstance.post<number>("/api/posts", request);
  return data;
}

export async function getPostList(
  params: PostListParams,
): Promise<PostListResponse> {
  const { data } = await axiosInstance.get<PostListResponse>("/api/posts", {
    params,
  });
  return data;
}
