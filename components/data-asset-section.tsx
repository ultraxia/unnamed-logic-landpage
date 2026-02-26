"use client"

import { useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function DataAssetSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="data-asset" ref={sectionRef} className="border-y border-border bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-14 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Data Asset
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"每次批改都在沉淀数据资产"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {"不只是工具，更是您机构的教研数据中台。"}
          </p>
        </div>

        {/* Dashboard mockups */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Progress Trend Chart Mockup */}
          <div
            className={`rounded-xl border border-border bg-card p-5 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{"学生进步趋势"}</h4>
              <span className="text-[11px] text-muted-foreground">{"近 12 周"}</span>
            </div>
            <ProgressChart show={isVisible} />
            <p className="mt-3 text-xs text-muted-foreground">
              {"自动追踪每位学生各维度得分变化，用数据证明教学效果。"}
            </p>
          </div>

          {/* Radar Chart Mockup */}
          <div
            className={`rounded-xl border border-border bg-card p-5 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{"弱点雷达图"}</h4>
              <span className="text-[11px] text-muted-foreground">{"张明辉"}</span>
            </div>
            <RadarMockup show={isVisible} />
            <p className="mt-3 text-xs text-muted-foreground">
              {"精准定位高频弱点分布，让辅导方向一目了然。"}
            </p>
          </div>

          {/* Report Card Mockup */}
          <div
            className={`rounded-xl border border-border bg-card p-5 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{"教研分析报告"}</h4>
              <span className="text-[11px] text-muted-foreground">{"本月"}</span>
            </div>
            <ReportMockup show={isVisible} />
            <p className="mt-3 text-xs text-muted-foreground">
              {"班级级别的教研洞察，辅助教学决策与师资评估。"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgressChart({ show }: { show: boolean }) {
  const bars = [35, 42, 48, 45, 55, 52, 60, 58, 65, 70, 68, 78]
  return (
    <div className="flex h-28 items-end gap-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-primary/80"
          style={{
            height: show ? `${h}%` : "0%",
            transition: "height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: `${600 + i * 80}ms`,
          }}
        />
      ))}
    </div>
  )
}

function RadarMockup({ show }: { show: boolean }) {
  const dims = [
    { label: "内容", value: 0.7 },
    { label: "结构", value: 0.85 },
    { label: "逻辑", value: 0.6 },
    { label: "语法", value: 0.75 },
    { label: "词汇", value: 0.5 },
  ]
  return (
    <div className="flex h-28 items-center justify-center">
      <div className="grid grid-cols-5 gap-2 w-full">
        {dims.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="relative h-20 w-full flex items-end justify-center">
              <div
                className="w-full max-w-[24px] rounded-t bg-chart-2"
                style={{
                  height: show ? `${d.value * 100}%` : "0%",
                  transition: "height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transitionDelay: `${700 + i * 100}ms`,
                }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReportMockup({ show }: { show: boolean }) {
  const items = [
    { label: "班级平均提升", value: "+12.3%" },
    { label: "高频弱点", value: "逻辑连贯" },
    { label: "优秀率", value: "34.2%" },
    { label: "待关注学生", value: "5 人" },
  ]
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.5s ease",
            transitionDelay: `${800 + i * 120}ms`,
          }}
        >
          <span className="text-xs text-muted-foreground">{item.label}</span>
          <span className="text-xs font-semibold text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  )
}
