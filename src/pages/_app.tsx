// pages/_app.tsx
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/sonner"; // ✅ Import Toaster

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noLayoutPages = ["/auth/login"];
  const isDashboardRoute = router.pathname.startsWith("/dashboard");
  const isNoLayout = noLayoutPages.includes(router.pathname) || isDashboardRoute;

  if (isNoLayout) {
    return (
      <Providers>
        {/* ✅ Toaster must be above everything */}
        <Toaster richColors closeButton expand />
        <Component {...pageProps} />
      </Providers>
    );
  }

  return (
    <Providers>
      {/* ✅ Toaster visible for all pages */}
      <Toaster richColors closeButton expand />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
