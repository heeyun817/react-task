import { axiosInstance } from "./axios";

// 접속 유저 카운트
export async function getUserCount(): Promise<number> {
  const { data } = await axiosInstance.get<number>("/api/users", {});
  console.log(data);
  return data;
}
