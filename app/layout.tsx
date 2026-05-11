import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DujiAPI - AI Token API 中转站 | 多模型聚合 · 智能路由 · 全球覆盖",
  description:
    "专业AI Token API中转服务，聚合OpenAI、Claude、Gemini等主流模型，智能路由节省成本，全球节点极速响应。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          src="https://cdn.tailwindcss.com"
          suppressHydrationWarning
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      heading: ['"PingFang SC"', '"SF Pro Display"', '-apple-system', 'sans-serif'],
                      body: ['"PingFang SC"', '-apple-system', 'sans-serif'],
                    },
                    borderRadius: {
                      DEFAULT: '9999px',
                    },
                  },
                },
              };
            `,
          }}
        />
        <script
          src="https://unpkg.com/react@18.3.1/umd/react.development.js"
          integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L"
          crossOrigin="anonymous"
          suppressHydrationWarning
        />
        <script
          src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"
          integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm"
          crossOrigin="anonymous"
          suppressHydrationWarning
        />
        <script
          src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"
          integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y"
          crossOrigin="anonymous"
          suppressHydrationWarning
        />
        <script
          src="https://unpkg.com/framer-motion@11.11.17/dist/framer-motion.js"
          suppressHydrationWarning
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.Motion = window.FramerMotion;`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .liquid-glass {
                background: rgba(255,255,255,0.08);
                background-blend-mode: luminosity;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: none;
                box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
                position: relative;
                overflow: hidden;
              }
              .liquid-glass::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: inherit;
                padding: 1.4px;
                background: linear-gradient(135deg,
                  rgba(255,255,255,0.45) 0%,
                  rgba(255,255,255,0.15) 20%,
                  rgba(255,255,255,0) 40%,
                  rgba(255,255,255,0) 60%,
                  rgba(255,255,255,0.15) 80%,
                  rgba(255,255,255,0.45) 100%);
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                pointer-events: none;
              }
              .liquid-glass-strong {
                background: rgba(255,255,255,0.06);
                background-blend-mode: luminosity;
                backdrop-filter: blur(24px);
                -webkit-backdrop-filter: blur(24px);
                border: none;
                box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
                position: relative;
                overflow: hidden;
              }
              .liquid-glass-strong::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: inherit;
                padding: 1.4px;
                background: linear-gradient(135deg,
                  rgba(255,255,255,0.5) 0%,
                  rgba(255,255,255,0.2) 20%,
                  rgba(255,255,255,0) 40%,
                  rgba(255,255,255,0) 60%,
                  rgba(255,255,255,0.2) 80%,
                  rgba(255,255,255,0.5) 100%);
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                pointer-events: none;
              }
              body {
                background: #000;
                margin: 0;
                padding: 0;
                overflow-x: hidden;
              }
              ::-webkit-scrollbar { width: 6px; }
              ::-webkit-scrollbar-track { background: #000; }
              ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
