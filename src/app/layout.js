import { Space_Grotesk, JetBrains_Mono, Chivo_Mono, Source_Serif_4, Outfit } from "next/font/google";
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

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "debateX — Self-Hosted Multi-LLM Deliberation & Truth Engine",
  description: "debateX is a self-hosted, open-source multi-LLM deliberation engine that passes queries through an anonymized 5-round debate council to eliminate single-model hallucinations and bias.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${GeistPixelSquare.variable} ${chivoMono.variable} ${sourceSerif.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/debateX.svg" type="image/svg+xml" />
      </head>
      <body>
        {/* Animated background effects */}
        <div className="bg-effects">
          <div className="bg-orb bg-orb-1"></div>
          <div className="bg-orb bg-orb-2"></div>
          <div className="bg-orb bg-orb-3"></div>
        </div>
        <div className="dot-grid"></div>
        <div className="grain-overlay"></div>
        <div className="scanlines"></div>
        {children}
      </body>
    </html>
  );
}
