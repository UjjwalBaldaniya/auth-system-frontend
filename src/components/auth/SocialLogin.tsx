"use client";

import { Button } from "@/shared/Button";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        icon={<FcGoogle size={20} />}
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
