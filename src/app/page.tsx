"use client";

import { Button } from "@/shared/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "accessToken=; path=/; max-age=0";
    toast.success("You have been logged out.");
    router.push("/signin");
  };

  const handleExplore = () => {
    toast.info("Explore feature coming soon...");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">MyApp</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome</h2>

          <p className="text-gray-600 mb-6">
            You are successfully logged in. This is your protected homepage.
          </p>

          <Button
            type="button"
            onClick={handleExplore}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Explore
          </Button>
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}
