"use client";

import { signupUser } from "@/services/auth.services";
import { Button } from "@/shared/Button";
import Input from "@/shared/Input";
import { signUpSchema } from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import AuthLayout from "./AuthLayout";
import AuthTabs from "./AuthTabs";
import SocialLogin from "./SocialLogin";

type FormData = z.infer<typeof signUpSchema>;

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const payload = {
        username: data.name,
        email: data.email,
        password: data.password,
      };
      await signupUser(payload);

      toast.success("Account created successfully");
      router.push("/signin");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err?.response?.data?.message || "Signup failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", placeholder: "Full Name *" },
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
          Create account
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Start your journey with us
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
              "Sign up"
            )}
          </Button>
        </div>

        <SocialLogin />
      </form>
    </AuthLayout>
  );
};

export default SignupForm;
