import { Space_Grotesk, JetBrains_Mono, Chivo_Mono } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "debateX — Multi-LLM Deliberation & Truth Engine",
  description: "debateX is an open-source, self-hosted multi-LLM deliberation engine that passes queries through an anonymized 5-round debate council to eliminate single-model hallucinations and bias.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${GeistPixelSquare.variable} ${chivoMono.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚖️</text></svg>" />
      </head>
      <body>
        <div className="scanlines"></div>
        {children}
      </body>
    </html>
  );
}
