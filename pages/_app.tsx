import { DarkModeProvider } from "../components/context/DarkModeContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <Component {...pageProps} />;
    </DarkModeProvider>
  );
}

export default MyApp;
