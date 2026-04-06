"use client";

import { auth, googleProvider } from "@/lib/firebase";
import { googleSignin } from "@/services/auth.services";
import { Button } from "@/shared/Button";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function SocialButtons() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      const res = await googleSignin({ token });
      document.cookie = `accessToken=${res.accessToken}; path=/; max-age=86400`;
      toast.success("Google login successful");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        icon={<FcGoogle size={20} />}
        onClick={handleGoogleLogin}
        className="bg-white text-black hover:bg-gray-100"
      >
        Continue with Google
      </Button>

      <Button
        icon={<FaApple size={20} />}
        className="bg-black text-white hover:bg-gray-800"
      >
        Continue with Apple
      </Button>
    </div>
  );
}
