import axiosInstance from "./axiosInstance";

export const signupUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const signinUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/signin", data);
  return res.data;
};

export const googleSignin = async (data: { token: string }) => {
  const res = await axiosInstance.post("/auth/google", data);
  return res.data;
};
