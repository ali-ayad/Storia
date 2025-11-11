"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/auth/login"); // redirect to your login page
      }
    };

    verifySession();

    // 🔁 Listen for sign-in/sign-out changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        router.replace("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return {
    isAuthenticated,
    isLoading: isAuthenticated === null,
  };
}
