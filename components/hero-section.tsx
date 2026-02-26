"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden px-6 pt-20">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div
          className={`mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground shadow-sm transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Shield className="size-3.5 text-primary" />
          {"500+ 班级真实运行 · 99.9% 可用性"}
        </div>

        {/* Heading */}
        <h1
          className={`text-balance text-3xl font-bold leading-tight tracking-tight text-foreground transition-all duration-700 delay-100 sm:text-4xl md:text-5xl lg:text-[3.5rem] md:leading-tight ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {"班级平均等待约 2s / 篇"}
          <br />
          <span className="text-primary">{"批改 + 满分改写"}</span>
        </h1>

        {/* Sub heading */}
        <p
          className={`mx-auto mt-6 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground transition-all duration-700 delay-200 sm:text-base md:text-lg ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {"单篇完整批改+改写约 1 分钟；按 30 人同批提交测算，班级平均等待约 2 秒 / 篇。"}
        </p>

        {/* Key metrics */}
        <div
          className={`mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-8 transition-all duration-700 delay-300 sm:gap-12 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {[
            { value: "2s", label: "30 人班级平均 / 篇" },
            { value: "1 min", label: "单篇批改+改写" },
            { value: "100 篇", label: "并发分钟级交付" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</span>
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
          <Button size="lg" className="w-full px-8 text-base sm:w-auto">
            {"申请机构演示资格"}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        <p
          className={`mt-3 text-xs text-muted-foreground transition-all duration-700 delay-500 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {"* 2s 为平均口径：按 30 篇同批提交、总耗时约 60s 折算；实际受网络、字数和并发负载影响。"}
        </p>

        {/* AI grading report - healing line-by-line animation */}
        <div
          className={`mx-auto mt-16 max-w-2xl transition-all duration-1000 delay-600 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <GradingReportPreview show={mounted} />
        </div>
      </div>
    </section>
  )
}

function GradingReportPreview({ show }: { show: boolean }) {
  const reportLines = [
    { label: "内容深度", score: 8.5, delay: 900 },
    { label: "结构完整", score: 7.0, delay: 1100 },
    { label: "逻辑连贯", score: 9.0, delay: 1300 },
    { label: "语法准确", score: 6.5, delay: 1500 },
    { label: "综合评分", score: 7.8, delay: 1700 },
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-chart-3" />
          <span className="text-xs font-medium text-foreground">{"AI 批改报告"}</span>
        </div>
        <span className="text-[11px] text-muted-foreground">{"学生: 张明辉 · 议论文"}</span>
      </div>

      {/* Report lines with staggered reveal */}
      <div className="p-5">
        {reportLines.map((line, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-border/40 py-3 last:border-0"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transitionDelay: `${line.delay}ms`,
            }}
          >
            <span className="text-sm text-muted-foreground">{line.label}</span>
            <div className="flex items-center gap-3">
              <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary sm:w-36">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: show ? `${line.score * 10}%` : "0%",
                    transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: `${line.delay + 200}ms`,
                  }}
                />
              </div>
              <span className={`w-12 text-right text-sm font-semibold ${
                i === reportLines.length - 1 ? "text-primary" : "text-foreground"
              }`}>
                {line.score.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
