import axiosInstance from "./axiosInstance";

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const signinUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/signin", data);
  return res.data;
};
