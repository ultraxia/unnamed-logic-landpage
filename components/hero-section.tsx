"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [activeWord, setActiveWord] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const ticker = window.setInterval(() => {
      setActiveWord((prev) => (prev + 1) % rotatingWords.length)
    }, 2800)
    return () => window.clearInterval(ticker)
  }, [mounted])

  return (
    <section className="relative flex min-h-[96svh] items-center justify-center overflow-hidden px-6 pt-20">
      {/* Apple 风格多层光晕背景 */}
      <div className="hero-ambient" aria-hidden />
      <div className="hero-orb-1" aria-hidden />
      <div className="hero-orb-2" aria-hidden />
      <div className="hero-orb-3" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge — 毛玻璃胶囊 */}
        <div
          className={`mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          {"招生 · 教学 · 财务 · 运营"}
        </div>

        {/* 超大标题 */}
        <h1
          className={`text-balance font-bold tracking-tight text-foreground transition-all duration-700 delay-100
            text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.05] ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {"教培机构的"}
          <br />
          <span className="hero-gradient-text">{"AI 运营系统"}</span>
        </h1>

        {/* 旋转词副标题 */}
        <div
          className={`mt-4 transition-all duration-700 delay-200 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-lg text-muted-foreground sm:text-xl md:text-2xl">
            让机构实现&nbsp;
          </span>
          <span className="inline-flex min-w-32 items-center justify-start text-lg font-semibold text-primary sm:text-xl md:text-2xl">
            <span key={rotatingWords[activeWord]} className="inline-block animate-word-fade">
              {rotatingWords[activeWord]}
            </span>
          </span>
        </div>

        {/* 三个指标 */}
        <div
          className={`mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-10 transition-all duration-700 delay-300 sm:gap-16 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {[
            { value: 10, suffix: "s", label: "AI 批改单篇作文", decimals: 0 },
            { value: 100, suffix: "%", label: "审批流程线上化", decimals: 0 },
            { value: 100, suffix: "%", label: "商机跟进及时率", decimals: 0 },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-black tabular-nums text-foreground sm:text-4xl">
                <CountUpNumber
                  end={stat.value}
                  delay={400 + i * 180}
                  duration={1800}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  start={mounted}
                />
              </span>
              <span className="text-[11px] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 flex flex-col items-center gap-3 transition-all duration-700 delay-[450ms] sm:flex-row sm:justify-center ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="hero-cta-btn w-full px-10 text-base font-semibold sm:w-auto"
          >
            <a
              href="https://my.feishu.cn/share/base/form/shrcnDKtWPa43T6FS869Nvb1k7x"
              target="_blank"
              rel="noreferrer"
            >
              {"申请机构演示资格"}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="w-full text-muted-foreground sm:w-auto">
            <a href="#roi">{"查看 ROI 测算 →"}</a>
          </Button>
        </div>

        {/* 待办看板 — 毛玻璃卡片 */}
        <div
          className={`mx-auto mt-16 w-full max-w-lg overflow-hidden transition-all duration-1000 delay-[600ms] ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <TodoDashboardPreview show={mounted} />
        </div>
      </div>
    </section>
  )
}

const rotatingWords = ["招生转化翻倍", "财务零延误", "学情一目了然", "续费有据可依"] as const

function CountUpNumber({
  end, delay, duration, decimals, suffix, start,
}: {
  end: number; delay: number; duration: number; decimals: number; suffix: string; start: boolean
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frameId = 0
    let timeoutId = 0
    let animationStart = 0

    timeoutId = window.setTimeout(() => {
      if (prefersReducedMotion) { setValue(end); return }
      const tick = (timestamp: number) => {
        if (!animationStart) animationStart = timestamp
        const elapsed = timestamp - animationStart
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(end * eased)
        if (progress < 1) frameId = window.requestAnimationFrame(tick)
      }
      frameId = window.requestAnimationFrame(tick)
    }, delay)

    return () => { window.clearTimeout(timeoutId); window.cancelAnimationFrame(frameId) }
  }, [delay, duration, end, start])

  return <>{value.toFixed(decimals)}{suffix}</>
}

function TodoDashboardPreview({ show }: { show: boolean }) {
  const todoItems = [
    { label: "待跟进商机", count: "12 条", color: "text-emerald-600", bgColor: "bg-emerald-500/10", dotColor: "bg-emerald-500", delay: 900 },
    { label: "待审批报名", count: "5 条", color: "text-orange-500", bgColor: "bg-orange-500/10", dotColor: "bg-orange-500", delay: 1100 },
    { label: "流失预警学员", count: "8 人", color: "text-red-500", bgColor: "bg-red-500/10", dotColor: "bg-red-500", delay: 1300 },
    { label: "待审批退费", count: "2 条", color: "text-yellow-600", bgColor: "bg-yellow-500/10", dotColor: "bg-yellow-500", delay: 1500 },
  ]

  return (
    <div className="hero-card overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-foreground">{"今日待办"}</span>
        </div>
        <span className="text-[11px] text-muted-foreground">{"喻校长 · 管理员"}</span>
      </div>

      {/* Items */}
      <div className="px-5 py-2">
        {todoItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-white/5 py-3 last:border-0"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateX(0)" : "translateX(-16px)",
              transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transitionDelay: `${item.delay}ms`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className={`size-1.5 shrink-0 rounded-full ${item.dotColor}`} />
              <span className="text-sm text-foreground/80">{item.label}</span>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.color} ${item.bgColor}`}>
              {item.count}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 px-5 py-2.5">
        <span className="text-[11px] text-muted-foreground/70">{"点击任意条目直接跳转处理 →"}</span>
      </div>
    </div>
  )
}
