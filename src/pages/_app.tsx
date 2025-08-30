// pages/_app.tsx
import Layout from "@/components/Layout";
import Navigation from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Define which routes should NOT use Layout
  const noLayoutPages = ["/auth/login"];

  const isNoLayout = noLayoutPages.includes(router.pathname);

  if (isNoLayout) {
    // Render page without Layout + Navbar
    return <Component {...pageProps} />;
  }

  // Default: Render page with Layout + Navbar
  return (
    <Layout>
      <Navigation />
      <Component {...pageProps} />
    </Layout>
  );
}
