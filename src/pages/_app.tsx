// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/sonner";

import Layout from "@/components/Layout"; // 🌍 Public layout

import WithAuth from "@/components/dashboard/withAuth"; // 🔐 Auth protection
import DashboardRootLayout from "@/components/dashboard/DashboardLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const path = router.pathname;
  const isDashboard = path.startsWith("/dashboard");
  const isAuthPage = path.startsWith("/auth");

  return (
    <Providers>
      {/* 🔔 Global toaster */}
      <Toaster richColors closeButton expand />

      {isAuthPage ? (
        // 🟣 Auth pages → no layout
        <Component {...pageProps} />
      ) : isDashboard ? (
        // 🔵 Dashboard → WithAuth + DashboardRootLayout
        <WithAuth>
          <DashboardRootLayout>
            <Component {...pageProps} />
          </DashboardRootLayout>
        </WithAuth>
      ) : (
        // 🟢 Public pages → normal Layout
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Providers>
  );
}
