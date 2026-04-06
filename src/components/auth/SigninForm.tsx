"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signinUser } from "@/services/auth.services";
import { Button } from "@/shared/Button";
import Input from "@/shared/Input";
import { signInSchema } from "@/validation/auth.schema";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthLayout from "./AuthLayout";
import AuthTabs from "./AuthTabs";
import SocialLogin from "./SocialLogin";

type FormData = z.infer<typeof signInSchema>;

const SigninForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const res = await signinUser(data);
      toast.success("Sign in successful");

      if (res?.data?.accessToken) {
        document.cookie = `accessToken=${res.data.accessToken}; path=/; max-age=86400`;
      } else {
        throw new Error("Token not received");
      }

      router.push("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err?.response?.data?.message || "Sign in failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "email", placeholder: "Email *" },
    {
      name: "password",
      placeholder: "Password *",
      type: "password",
      icon: true,
    },
  ] as const;

  return (
    <AuthLayout>
      <AuthTabs />

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-semibold text-black text-center mb-2">
          Welcome back
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Please login to continue
        </p>

        {fields.map((field) => (
          <Input
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={"type" in field ? field.type : undefined}
            register={register}
            error={errors[field.name]}
            icon={"icon" in field ? field.icon : undefined}
          />
        ))}

        <div className="text-right text-sm text-gray-500 mb-4 cursor-pointer">
          Forgot password?
        </div>

        <div className="flex justify-center mb-8">
          <Button
            type="submit"
            className="!w-40 bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>

        <SocialLogin />
      </form>
    </AuthLayout>
  );
};

export default SigninForm;
