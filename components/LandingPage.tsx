"use client";

import { useEffect, useRef, useState } from "react";
import FadingVideo from "./FadingVideo";

const CONSOLE_ERROR_FILTER = (original: typeof console.error) =>
  function (...args: Parameters<typeof console.error>) {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Framer Motion") ||
        args[0].includes("list of React children") ||
        args[0].includes("key prop"))
    ) {
      return;
    }
    original.apply(console, args);
  };

if (typeof window !== "undefined") {
  console.error = CONSOLE_ERROR_FILTER(console.error.bind(console));
}

const HERO_VIDEO = "/bg.mov";
const CAPABILITIES_VIDEO = "/capabilities.mp4";

const NAV_LINKS = [
  { text: "首页", href: "https://token.macosabc.com/" },
  { text: "控制台", href: "https://token.macosabc.com/dashboard/overview" },
  { text: "模型广场", href: "https://token.macosabc.com/pricing" },
  { text: "文档", href: "https://token.macosabc.com/rankings" },
];

const PARTNERS = ["Aeon", "Vela", "Apex", "Orbit", "Zeno"];

interface FeatureCard {
  title: string;
  iconPath: string;
  tags: string[];
  body: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "多模型聚合",
    iconPath:
      "M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z",
    tags: ["OpenAI", "Claude", "Gemini", "国产大模型"],
    body: "一个接口调用全部主流AI模型，无需分别对接各平台，简化集成复杂度。",
  },
  {
    title: "智能路由",
    iconPath:
      "M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z",
    tags: ["自动选择", "负载均衡", "故障转移", "成本优化"],
    body: "自动选择最优模型与节点，支持高并发与故障自动切换，确保服务稳定。",
  },
  {
    title: "用量可视化",
    iconPath:
      "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z",
    tags: ["实时监控", "成本分析", "使用报表", "异常告警"],
    body: "实时监控Token消耗与API调用，提供详细报表与成本分析，支出透明可控。",
  },
];

// ─── AI Models Data ──────────────────────────────────────────────────────────

interface ModelCard {
  name: string;
  version: string;
  logo: string;
  accentColor: string;
}

interface ModelRow {
  brand: string;
  brandLabel: string;
  models: ModelCard[];
}

const AI_MODEL_ROWS: ModelRow[] = [
  {
    brand: "anthropic",
    brandLabel: "Anthropic",
    models: [
      { name: "Claude Opus 4", version: "v4.7", logo: "A", accentColor: "#D4A574" },
      { name: "Claude Sonnet 4", version: "v4.7", logo: "A", accentColor: "#D4A574" },
      { name: "Claude Haiku 4", version: "v4.7", logo: "A", accentColor: "#D4A574" },
    ],
  },
  {
    brand: "openai",
    brandLabel: "OpenAI",
    models: [
      { name: "GPT-5 Turbo", version: "v5.5", logo: "G", accentColor: "#74A9FF" },
      { name: "GPT-5 Pro", version: "v5.5", logo: "G", accentColor: "#74A9FF" },
      { name: "GPT-4o", version: "v5.5", logo: "G", accentColor: "#74A9FF" },
      { name: "lm2 Ultra", version: "lm2", logo: "L", accentColor: "#74D4C0" },
      { name: "lm2 Pro", version: "lm2", logo: "L", accentColor: "#74D4C0" },
    ],
  },
  {
    brand: "google",
    brandLabel: "Google",
    models: [
      { name: "Gemini 2.5 Pro", version: "latest", logo: "G", accentColor: "#A8E6A3" },
      { name: "Gemini 2.5 Flash", version: "latest", logo: "G", accentColor: "#A8E6A3" },
      { name: "Gemini 2.0 Ultra", version: "latest", logo: "G", accentColor: "#A8E6A3" },
    ],
  },
  {
    brand: "deepseek",
    brandLabel: "DeepSeek",
    models: [
      { name: "DeepSeek V3", version: "latest", logo: "D", accentColor: "#B8A9E8" },
      { name: "DeepSeek R1", version: "latest", logo: "D", accentColor: "#B8A9E8" },
      { name: "DeepSeek Coder", version: "latest", logo: "D", accentColor: "#B8A9E8" },
    ],
  },
  {
    brand: "zhipuai",
    brandLabel: "Z.ai",
    models: [
      { name: "GLM-4 Plus", version: "latest", logo: "Z", accentColor: "#FF9F7A" },
      { name: "GLM-4V Plus", version: "latest", logo: "Z", accentColor: "#FF9F7A" },
      { name: "GLM-3 Turbo", version: "latest", logo: "Z", accentColor: "#FF9F7A" },
    ],
  },
  {
    brand: "minmax",
    brandLabel: "MinMax",
    models: [
      { name: "abab 7", version: "latest", logo: "M", accentColor: "#FFD166" },
      { name: "abab 6.5S", version: "latest", logo: "M", accentColor: "#FFD166" },
      { name: "abab 6", version: "latest", logo: "M", accentColor: "#FFD166" },
    ],
  },
  {
    brand: "moonshot",
    brandLabel: "Kimi",
    models: [
      { name: " moonshot-v1-128K", version: "latest", logo: "K", accentColor: "#7AE8FF" },
      { name: " moonshot-v1-32K", version: "latest", logo: "K", accentColor: "#7AE8FF" },
      { name: " moonshot-v1-8K", version: "latest", logo: "K", accentColor: "#7AE8FF" },
    ],
  },
  {
    brand: "xiaomi",
    brandLabel: "Xiaomi",
    models: [
      { name: "MiMo-72B", version: "latest", logo: "X", accentColor: "#FF8FA3" },
      { name: "MiMo-8B", version: "latest", logo: "X", accentColor: "#FF8FA3" },
      { name: "MiMo-1.8B", version: "latest", logo: "X", accentColor: "#FF8FA3" },
    ],
  },
];

// ─── Pricing Data ─────────────────────────────────────────────────────────────

interface PricingTier {
  name: string;
  nameLabel: string;
  points: string;
  frequency: string;
  features: string[];
  highlight: boolean;
  highlightLabel?: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    nameLabel: "免费版",
    points: "100",
    frequency: "每周",
    features: [
      "每周 100 点额度",
      "仅限部分模型",
      "基础路由策略",
      "每日 50 次请求上限",
      "社区支持",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    nameLabel: "Pro 付费版",
    points: "1000",
    frequency: "每天",
    features: [
      "每天 1000 点额度",
      "全部模型可用",
      "智能路由策略",
      "每日 5000 次请求",
      "优先响应支持",
    ],
    highlight: true,
    highlightLabel: "推荐",
  },
  {
    name: "Max",
    nameLabel: "Max 付费版",
    points: "5000",
    frequency: "每天",
    features: [
      "每天 5000 点额度",
      "全部模型可用",
      "企业级路由策略",
      "每日 50000 次请求",
      "专属技术支持",
    ],
    highlight: false,
  },
  {
    name: "Ultra",
    nameLabel: "Ultra 付费版",
    points: "∞",
    frequency: "每天",
    features: [
      "无限点额度",
      "全部模型可用",
      "企业级路由策略",
      "无限请求次数",
      "7×24 专属客服",
    ],
    highlight: false,
  },
];

// ─── BlurText ────────────────────────────────────────────────────────────────

function BlurText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const container = el.parentElement as HTMLElement;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered.current) {
            triggered.current = true;
            observer.disconnect();
            const motionEls = container.querySelectorAll<HTMLElement>("[data-word]");
            motionEls.forEach((motionEl, i) => {
              const delay = (i * 100) / 1000;
              motionEl.style.filter = "blur(10px)";
              motionEl.style.opacity = "0";
              motionEl.style.transform = "translateY(50px)";
              setTimeout(() => {
                motionEl.style.transition =
                  "filter 0.35s ease-out, opacity 0.35s ease-out, transform 0.35s ease-out";
                motionEl.style.filter = "blur(5px)";
                motionEl.style.opacity = "0.5";
                motionEl.style.transform = "translateY(-5px)";
                setTimeout(() => {
                  motionEl.style.filter = "blur(0px)";
                  motionEl.style.opacity = "1";
                  motionEl.style.transform = "translateY(0)";
                }, 350);
              }, delay);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  const words = text.split("");

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {words.map((char, i) => (
        <span
          key={i}
          data-word={i}
          style={{
            display: "inline-block",
            marginRight: char === "·" ? "0.3em" : "0.05em",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// ─── Model Card ───────────────────────────────────────────────────────────────

function ModelCardItem({ card }: { card: ModelCard }) {
  return (
    <div
      className="liquid-glass rounded-[1rem] p-4 flex-shrink-0 w-[180px] flex flex-col gap-3 cursor-pointer hover:scale-105 transition-transform duration-300"
      style={{ border: `1px solid ${card.accentColor}33` }}
    >
      {/* Logo circle */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-white text-sm"
        style={{ background: `${card.accentColor}33`, border: `1px solid ${card.accentColor}66` }}
      >
        {card.logo}
      </div>
      {/* Name */}
      <div>
        <div className="font-body font-semibold text-white text-sm leading-tight truncate">
          {card.name}
        </div>
        <div
          className="font-body font-normal text-xs mt-1"
          style={{ color: card.accentColor }}
        >
          {card.version}
        </div>
      </div>
    </div>
  );
}

// ─── JS Infinite Carousel Row ─────────────────────────────────────────────────

function CarouselRow({
  row,
  reverse,
}: {
  row: (typeof AI_MODEL_ROWS)[number];
  reverse: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    // 等待DOM渲染完成
    const timer = setTimeout(() => {
      if (isInitialized.current) return; // 防止重复初始化
      isInitialized.current = true;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const track = trackRef.current!;
      const first = track.querySelector<HTMLElement>("[data-card]");
      if (!first) return;
      
      // 计算卡片尺寸
      const cardWidth = first.offsetWidth + 16; // 16px = gap-4
      const totalCards = row.models.length;
      const singleSetWidth = cardWidth * totalCards; // 一组卡片的宽度
      
      // 3组卡片的总宽度
      const totalWidth = singleSetWidth * 3;

      // 初始化位置 - 根据滚动方向设置
      if (reverse) {
        // 从右到左：初始位置在 singleSetWidth（让最后一组卡片在视口右侧）
        // 视觉上看起来是从右边开始向左移动
        posRef.current = singleSetWidth;
        track.style.transform = `translateX(${-singleSetWidth}px)`;
      } else {
        // 从左到右：初始位置在0（第一组卡片在视口左侧）
        posRef.current = 0;
        track.style.transform = `translateX(0px)`;
      }

      let lastTime: number | null = null;
      const speed = 0.1; // px per ms

      function tick(time: number) {
        if (lastTime === null) lastTime = time;
        const delta = time - lastTime;
        lastTime = time;

        if (reverse) {
          // 从右到左：position递增（transform负值向0移动）
          // 从 -singleSetWidth 向 0 移动，内容从右向左
          posRef.current += delta * speed;
          
          // 无缝循环：当position >= singleSetWidth时，重置到 -singleSetWidth
          if (posRef.current >= singleSetWidth) {
            posRef.current -= singleSetWidth * 2;
          }
          
          // transform为负值，内容从右向左移动
          track.style.transform = `translateX(${posRef.current}px)`;
        } else {
          // 从左到右：position递增（轨道向左移动）
          posRef.current += delta * speed;
          
          // 无缝循环：当position >= 一组卡片宽度时，重置到0
          if (posRef.current >= singleSetWidth) {
            posRef.current -= singleSetWidth;
          }
          
          // transform为负值，轨道向左移动，内容从左向右
          track.style.transform = `translateX(${-posRef.current}px)`;
        }

        rafRef.current = requestAnimationFrame(tick);
      }

      rafRef.current = requestAnimationFrame(tick);
    }, 150); // 延迟150ms确保DOM完全渲染

    return () => {
      clearTimeout(timer);
      isInitialized.current = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [row, reverse]);

  // 创建3组卡片用于无缝循环
  const items = [...row.models, ...row.models, ...row.models];

  return (
    <div ref={trackRef} className="flex gap-4" style={{ width: "max-content" }}>
      {items.map((card, i) => (
        <div key={`${row.brand}-${i}`} data-card>
          <ModelCardItem card={card} />
        </div>
      ))}
    </div>
  );
}

// ─── Models Section ───────────────────────────────────────────────────────────

function ModelsSection() {
  return (
    <section
      className="relative py-16 md:py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Background video */}
      <FadingVideo
        src="/models-bg.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top fade gradient */}
      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "25%", background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }}
      />

      {/* Bottom fade gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "25%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
      />

      {/* Section header */}
      <div className="relative z-10 px-8 md:px-16 lg:px-20 mb-12 text-center">
        <h2
          className="font-heading font-bold text-white leading-[0.9] tracking-[-2px] whitespace-nowrap inline-block"
          style={{ 
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          主流大模型 · 一站接入
        </h2>
      </div>

      {/* Left fade - 覆盖整个 section 高度匹配视频 */}
      <div
        className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none"
        style={{ 
          width: "20%",
          minWidth: "200px",
          background: "linear-gradient(to right, #000 0%, #000 30%, rgba(0,0,0,0.7) 60%, transparent 100%)",
        }}
      />
      {/* Right fade - 覆盖整个 section 高度匹配视频 */}
      <div
        className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none"
        style={{ 
          width: "20%",
          minWidth: "200px",
          background: "linear-gradient(to left, #000 0%, #000 30%, rgba(0,0,0,0.7) 60%, transparent 100%)",
        }}
      />

      {/* Carousel rows */}
      <div className="relative z-10">

        {/* 合并成三行轮播 */}
        {[0, 1, 2].map((lineIndex) => {
          // 将8个品牌分成3行：第1行取0-3，第2行取3-6，第3行取6-8
          const startIdx = lineIndex === 0 ? 0 : lineIndex === 1 ? 3 : 6;
          const endIdx = lineIndex === 0 ? 3 : lineIndex === 1 ? 6 : 8;
          const modelsForLine = AI_MODEL_ROWS.slice(startIdx, endIdx).flatMap(row => row.models);
          
          // 创建新的row对象
          const lineRow = {
            brand: `line-${lineIndex}`,
            brandLabel: "",
            models: modelsForLine
          };

          return (
            <div key={`line-${lineIndex}`} className="mb-6 overflow-hidden">
              {/* JS-driven carousel */}
              <CarouselRow row={lineRow} reverse={lineIndex % 2 === 0} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Pricing Section ─────────────────────────────────────────────────────────

function PricingSection() {
  return (
    <section
      className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16"
      style={{ background: "#000" }}
    >
      {/* Section header */}
      <div className="mb-8 md:mb-16 text-center">
        <p className="liquid-glass rounded-full px-4 py-2 text-sm font-body text-white/90 mb-6 inline-block">
          订阅方案
        </p>
        <h2
          className="font-heading font-bold text-white leading-[0.9] tracking-[-2px] whitespace-nowrap"
          style={{ 
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          灵活订阅 · 按需选择
        </h2>
        <p className="mt-6 text-sm text-white/60 font-body font-light max-w-xl mx-auto leading-relaxed">
          无论您是个人开发者还是企业团队，都能找到适合的方案。
          所有方案均支持全部模型接入。
        </p>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-2">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.name}
            className="relative group"
          >
            <div
              className={`liquid-glass rounded-[1.25rem] p-5 md:p-6 flex flex-col transition-transform duration-300 ease-out group-hover:scale-105 md:group-hover:scale-110 ${
                tier.highlight ? "ring-1 ring-white/30" : ""
              }`}
            >
              {/* Tier name row */}
              <div className="flex items-center justify-between mb-4">
                <div className="font-body font-semibold text-white text-lg">
                  {tier.nameLabel}
                </div>
                {/* Highlight badge */}
                {tier.highlightLabel && (
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold font-body"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    {tier.highlightLabel}
                  </div>
                )}
              </div>

            {/* Points display */}
            <div className="mb-6 flex items-end gap-2">
              <span
                className="font-heading font-bold text-white leading-none"
                style={{ fontSize: "3rem" }}
              >
                {tier.points}
              </span>
              <span className="font-body text-white/60 text-sm mb-1.5">
                点 / {tier.frequency}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-6" />

            {/* Features */}
            <ul className="flex flex-col gap-3 flex-1">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 font-body text-sm text-white/80 font-light leading-snug"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: tier.highlight ? "#fff" : "rgba(255,255,255,0.6)" }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="https://token.macosabc.com/wallet"
              className="mt-4 md:mt-6 rounded-full px-4 md:px-5 py-2 md:py-2.5 text-sm font-semibold font-body flex items-center justify-center gap-2 transition-opacity hover:opacity-80 liquid-glass text-white"
            >
              {tier.name === "Free" ? "免费开始" : "立即订阅"}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function staggerProps(delay: number) {
    return {
      initial: { filter: "blur(10px)", opacity: 0, y: 20 },
      animate: { filter: "blur(0px)", opacity: 1, y: 0 },
      transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
    } as const;
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
      style={{ background: "#000" }}
    >
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "30%", background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "30%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
      />

      <nav
        className="fixed top-4 px-4 md:px-8 lg:px-16 z-50 w-full"
        style={{ maxWidth: "1200px", left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="liquid-glass rounded-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="liquid-glass rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#ai-ac-clip)">
                <path d="M8.53003 21.9601C8.12003 21.9601 7.78003 21.6201 7.78003 21.2101V19.2101C7.78003 18.8001 8.12003 18.4601 8.53003 18.4601C8.94003 18.4601 9.28003 18.8001 9.28003 19.2101V21.2101C9.28003 21.6201 8.94003 21.9601 8.53003 21.9601Z" fill="white"/>
                <path d="M12.53 21.9601C12.12 21.9601 11.78 21.6201 11.78 21.2101V19.2101C11.78 18.8001 12.12 18.4601 12.53 18.4601C12.94 18.4601 13.28 18.8001 13.28 19.2101V21.2101C13.28 21.6201 12.94 21.9601 12.53 21.9601Z" fill="white"/>
                <path d="M16.53 21.9601C16.12 21.9601 15.78 21.6201 15.78 21.2101V19.2101C15.78 18.8001 16.12 18.4601 16.53 18.4601C16.94 18.4601 17.28 18.8001 17.28 19.2101V21.2101C17.28 21.6201 16.94 21.9601 16.53 21.9601Z" fill="white"/>
                <path opacity="0.4" d="M22.53 7.71008V12.7101C22.53 14.3701 21.53 15.7101 19.53 15.7101H5.53003C3.53003 15.7101 2.53003 14.3701 2.53003 12.7101V7.71008C2.53003 7.52008 2.55003 7.34008 2.57003 7.16008C2.98003 7.33008 3.30003 7.67008 3.42003 8.11008L3.68003 9.08008C3.84003 9.68008 4.34003 10.0601 4.95003 10.0601C5.56003 10.0601 6.06003 9.68008 6.22003 9.09008L6.48003 8.13008C6.62003 7.62008 6.99003 7.25008 7.50003 7.11008L8.49003 6.84008C9.04121 6.66656 9.44003 6.17271 9.44003 5.59008C9.44003 5.25008 9.32003 4.95008 9.11003 4.71008H19.53C21.53 4.71008 22.53 6.05008 22.53 7.71008Z" fill="white"/>
                <path d="M17.78 12.7101C17.78 13.1201 17.44 13.4601 17.03 13.4601H8.03003C7.62003 13.4601 7.28003 13.1201 7.28003 12.7101C7.28003 12.3001 7.62003 11.9601 8.03003 11.9601H17.03C17.44 11.9601 17.78 12.3001 17.78 12.7101Z" fill="white"/>
                <path d="M18.28 8.21008C18.28 8.62008 17.94 8.96008 17.53 8.96008H15.53C15.12 8.96008 14.78 8.62008 14.78 8.21008C14.78 7.80008 15.12 7.46008 15.53 7.46008H17.53C17.94 7.46008 18.28 7.80008 18.28 8.21008Z" fill="white"/>
                <path d="M8.45997 5.57004C8.45997 5.64004 8.41997 5.80004 8.22997 5.86004L7.24997 6.13004C6.39997 6.36004 5.75997 7.00004 5.52997 7.85004L5.26997 8.81004C5.20997 9.03004 5.03997 9.05004 4.95997 9.05004C4.87997 9.05004 4.70997 9.03004 4.64997 8.81004L4.38997 7.84004C4.15997 7.00004 3.50997 6.36004 2.66997 6.13004L1.69997 5.87004C1.48997 5.81004 1.46997 5.63004 1.46997 5.56004C1.46997 5.48004 1.48997 5.30004 1.69997 5.24004L2.67997 4.98004C3.51997 4.74004 4.15997 4.10004 4.38997 3.26004L4.66997 2.24004C4.73997 2.07004 4.89997 2.04004 4.95997 2.04004C5.01997 2.04004 5.18997 2.06004 5.24997 2.22004L5.52997 3.25004C5.75997 4.09004 6.40997 4.73004 7.24997 4.97004L8.24997 5.25004C8.44997 5.33004 8.45997 5.51004 8.45997 5.57004Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="ai-ac-clip">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <div className="liquid-glass rounded-full px-1.5 py-1.5 flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-white/90 font-body rounded-full hover:text-white transition-colors"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {link.text}
                </a>
              ))}
              <a
                href="https://token.macosabc.com/sign-in"
                className="bg-white text-black rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap hover:bg-white/90 transition-colors font-body"
              >
                免费试用
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="菜单"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-2 liquid-glass rounded-2xl p-4">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-white/90 font-body rounded-full hover:bg-white/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}
              <a
                href="https://token.macosabc.com/sign-in"
                className="bg-white text-black rounded-full px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                免费试用
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </nav>

      <div className="relative z-10 flex flex-col items-center flex-1 justify-center pt-24 md:pt-36 px-4 md:px-6 w-full">
        <div
          {...staggerProps(0.4)}
          className="liquid-glass rounded-full px-1.5 py-1.5 flex items-center gap-2 mb-14"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body">
            新功能
          </span>
          <span className="text-sm text-white/90 font-body pr-3">
            Claude 4 & Gemini 2.0 已支持 · 2025
          </span>
        </div>

        <div {...staggerProps(0.6)} className="text-center w-full">
          <p
            className="font-heading font-bold text-white leading-[0.9] tracking-[-2px] whitespace-nowrap inline-block"
            style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <BlurText text="AI Token API · 一站中转" />
          </p>
        </div>

        <p
          {...staggerProps(0.8)}
          className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-relaxed text-center"
        >
          一个API接口，畅连OpenAI、Claude、Gemini等主流大模型。
          智能路由自动选择最优路径，成本直降70%。
        </p>

        <div {...staggerProps(1.1)} className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mt-6">
          <a
            href="#"
            className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2 hover:opacity-90 transition-opacity font-body"
          >
            立即接入
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
          <a
            href="#"
            className="text-sm text-white/80 font-body font-medium flex items-center gap-2 hover:text-white transition-colors"
          >
            查看文档
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          </a>
        </div>

        <div {...staggerProps(1.3)} className="flex flex-col sm:flex-row items-stretch gap-4 mt-8 w-full max-w-md sm:max-w-none">
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              number: "99.9%",
              label: "服务可用性",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              ),
              number: "50亿+",
              label: "日均Token处理量",
            },
          ].map((stat, i) => (
            <div key={i} className="liquid-glass rounded-[1.25rem] p-4 md:p-5 flex flex-col flex-1">
              <div className="mb-3">{stat.icon}</div>
              <div className="font-heading font-bold text-white text-4xl tracking-[-1px] leading-none">
                {stat.number}
              </div>
              <div className="text-xs text-white font-body font-light mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div {...staggerProps(1.4)} className="relative z-10 flex flex-col items-center gap-4 pb-8">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mt-4">
          已接入全球主流AI服务提供商
        </div>
        <div className="flex items-center gap-8 md:gap-16">
          {PARTNERS.map((partner) => (
            <span
              key={partner}
              className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Capabilities Section ────────────────────────────────────────────────────

function CapabilitiesSection() {
  function staggerProps(delay: number) {
    return {
      initial: { filter: "blur(10px)", opacity: 0, y: 20 },
      animate: { filter: "blur(0px)", opacity: 1, y: 0 },
      transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
    } as const;
  }

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#000" }}
    >
      <FadingVideo
        src={CAPABILITIES_VIDEO}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ width: "100%", height: "100%" }}
      />

      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "30%", background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "30%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
      />

      <div className="relative z-10 px-4 md:px-8 lg:px-16 pt-16 md:pt-24 pb-8 md:pb-10 flex flex-col min-h-[80vh] md:min-h-screen">
        <div className="mb-auto">
          <h2
            {...staggerProps(0.2)}
            className="font-heading font-bold text-white leading-[0.9] tracking-[-2px] whitespace-nowrap"
            style={{ 
              fontSize: "clamp(3rem, 8vw, 6rem)",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            为什么选择我们
          </h2>
        </div>

        <div {...staggerProps(0.6)} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.title}
              className="liquid-glass rounded-[1.25rem] p-5 md:p-6 min-h-[280px] md:min-h-[360px] flex flex-col"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="liquid-glass rounded-[0.75rem] w-11 h-11 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d={card.iconPath} />
                  </svg>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1" />
              <div className="mt-6">
                <h3 className="font-heading font-semibold text-white text-3xl md:text-4xl tracking-[-1px] leading-none">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main style={{ background: "#000" }}>
      <HeroSection />
      <CapabilitiesSection />
      <ModelsSection />
      <PricingSection />
    </main>
  );
}
