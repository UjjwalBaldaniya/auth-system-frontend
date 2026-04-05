"use client";

import { usePathname, useRouter } from "next/navigation";

export default function AuthTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const isSignin = pathname.includes("signin");

  return (
    <div className="flex bg-white border border-gray-300 rounded-full p-2 mb-6">
      <button
        onClick={() => router.push("/signin")}
        className={`w-1/2 py-3 rounded-full text-sm font-medium transition ${
          isSignin ? "bg-blue-500 text-white" : "text-gray-500"
        }`}
      >
        Sign in
      </button>

      <button
        onClick={() => router.push("/signup")}
        className={`w-1/2 py-3 rounded-full text-sm font-medium transition ${
          !isSignin ? "bg-blue-500 text-white" : "text-gray-500"
        }`}
      >
        Sign up
      </button>
    </div>
  );
}
