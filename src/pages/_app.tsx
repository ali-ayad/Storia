// pages/_app.tsx
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Providers } from "@/providers"; // <- import your Redux Provider wrapper

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Define which routes should NOT use Layout
  const noLayoutPages = ["/auth/login"];
  
  // Check if current route is a dashboard route
  const isDashboardRoute = router.pathname.startsWith("/dashboard");

  const isNoLayout = noLayoutPages.includes(router.pathname) || isDashboardRoute;

  if (isNoLayout) {
    // Render page without Layout + Navbar, but still wrap with Providers
    return (
      <Providers>
        <Component {...pageProps} />
      </Providers>
    );
  }

  // Default: Render page within global Layout, wrapped in Providers
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
