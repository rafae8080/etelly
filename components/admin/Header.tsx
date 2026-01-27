"use client";

import { Bell, Search, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* space */}
        <div className="flex-1 max-w-md"></div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* User */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{userEmail || "Admin User"}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            log out
          </button>
        </div>
      </div>
    </header>
  );
}
