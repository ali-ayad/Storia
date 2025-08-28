// pages/_app.tsx
import Layout from "@/components/Layout";
import Navigation from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Navigation />
      <Component {...pageProps} />
    </Layout>
  );
}
