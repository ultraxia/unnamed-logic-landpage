"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [activeWord, setActiveWord] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return

    const ticker = window.setInterval(() => {
      setActiveWord((prev) => (prev + 1) % rotatingWords.length)
    }, 2600)

    return () => window.clearInterval(ticker)
  }, [mounted])

  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden px-6 pt-20">
      <div className="hero-ambient" aria-hidden />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div
          className={`mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground shadow-sm transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Shield className="size-3.5 text-primary" />
          {"覆盖招生 · 教学 · 财务全流程"}
        </div>

        {/* Heading */}
        <h1
          className={`text-balance text-3xl font-bold leading-tight tracking-tight text-foreground transition-all duration-700 delay-100 sm:text-4xl md:text-5xl lg:text-[3.5rem] md:leading-tight ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {"教培机构的 AI 运营系统"}
          <br />
          <span className="inline-flex min-h-12 items-center justify-center text-primary sm:min-h-14">
            <span
              key={rotatingWords[activeWord]}
              className="inline-block animate-word-fade"
            >
              {rotatingWords[activeWord]}
            </span>
          </span>
        </h1>

        {/* Key metrics */}
        <div
          className={`mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-8 transition-all duration-700 delay-300 sm:gap-12 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {[
            { value: 10, suffix: "s", label: "AI 批改单篇作文", decimals: 0, plus: false },
            { value: 100, suffix: "%", label: "审批流程线上化", decimals: 0, plus: false },
            { value: 100, suffix: "%", label: "商机跟进及时率", decimals: 0, plus: false },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-foreground sm:text-3xl">
                <CountUpNumber
                  end={stat.value}
                  delay={350 + i * 200}
                  duration={2000}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  showPlus={stat.plus}
                  start={mounted}
                />
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-10 flex flex-col items-center gap-3 transition-all duration-700 delay-[400ms] sm:flex-row sm:justify-center ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Button asChild size="lg" className="w-full px-8 text-base sm:w-auto">
            <a
              href="https://my.feishu.cn/share/base/form/shrcnDKtWPa43T6FS869Nvb1k7x"
              target="_blank"
              rel="noreferrer"
            >
              {"申请机构演示资格"}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>

        {/* 今日待办看板预览 */}
        <div
          className={`mx-auto mt-16 w-full max-w-2xl overflow-hidden transition-all duration-1000 delay-600 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <TodoDashboardPreview show={mounted} />
        </div>
      </div>
    </section>
  )
}

const rotatingWords = ["招生转化翻倍", "财务零延误", "学情一目了然"] as const

function CountUpNumber({
  end,
  delay,
  duration,
  decimals,
  suffix,
  showPlus,
  start,
}: {
  end: number
  delay: number
  duration: number
  decimals: number
  suffix: string
  showPlus?: boolean
  start: boolean
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frameId = 0
    let timeoutId = 0
    let animationStart = 0

    timeoutId = window.setTimeout(() => {
      if (prefersReducedMotion) {
        setValue(end)
        return
      }

      const tick = (timestamp: number) => {
        if (!animationStart) animationStart = timestamp
        const elapsed = timestamp - animationStart
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(end * eased)

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick)
        }
      }

      frameId = window.requestAnimationFrame(tick)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      window.cancelAnimationFrame(frameId)
    }
  }, [delay, duration, end, start])

  const formatted = value.toFixed(decimals)
  return (
    <>
      {formatted}
      {showPlus ? "+" : ""}
      {suffix}
    </>
  )
}

function TodoDashboardPreview({ show }: { show: boolean }) {
  const todoItems = [
    { label: "待跟进商机", count: "12 条", color: "text-orange-500", bgColor: "bg-orange-500/10", delay: 900, urgent: true },
    { label: "待审批报名", count: "5 条", color: "text-red-500", bgColor: "bg-red-500/10", delay: 1100, urgent: true },
    { label: "流失预警学员", count: "8 人", color: "text-destructive", bgColor: "bg-destructive/10", delay: 1300, urgent: true },
    { label: "待审批退费", count: "2 条", color: "text-chart-3", bgColor: "bg-chart-3/10", delay: 1500, urgent: true },
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary" />
          <span className="text-xs font-medium text-foreground">{"今日待办"}</span>
        </div>
        <span className="text-[11px] text-muted-foreground">{"喻校长 · 管理员"}</span>
      </div>

      {/* Todo items with staggered reveal */}
      <div className="p-5">
        {todoItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-border/40 py-3 last:border-0"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transitionDelay: `${item.delay}ms`,
            }}
          >
            <div className="flex items-center gap-2">
              {item.urgent && (
                <span className={`size-1.5 rounded-full ${item.color.replace("text-", "bg-")}`} />
              )}
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.color} ${item.bgColor}`}>
              {item.count}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border/40 bg-secondary/30 px-5 py-2.5">
        <span className="text-[11px] text-muted-foreground">{"点击任意条目直接跳转处理 →"}</span>
      </div>
    </div>
  )
}
