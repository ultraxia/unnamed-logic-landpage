"use client"

import { useRef } from "react"
import { Upload, FileCheck, BarChart3, TrendingUp } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "招生跟进",
    description: "从录入到试听，每一步都有记录，AI 辅助生成跟进话术，转化数据实时可见。",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    line: "bg-blue-500/30",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "报名收款",
    description: "咨询师提单，财务审批，收款归档，退费有流水。每一笔账都有据可查，不再靠截图说话。",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    line: "bg-violet-500/30",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "教学管理",
    description: "排课、点名、AI 批改一体化，学情自动沉淀。优秀老师的方法论，可以在全校区复制。",
    color: "text-primary",
    bg: "bg-primary/10",
    line: "bg-primary/30",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "续费决策",
    description: "提前 30 天识别流失风险，学情报告替代话术，让家长用数据决定续费，而不是靠感情。",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    line: "bg-emerald-500/30",
  },
]

export function SolutionFlow() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="solution" ref={sectionRef} className="overflow-x-hidden border-y border-border bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="section-label mb-2 text-xs font-semibold uppercase tracking-widest">
            Solution
          </p>
          <h2 className="section-title text-balance text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            {"从招生到续费，四步闭环"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {"每一步，都有数据接管"}
          </p>
        </div>

        {/* 桌面端：横向流程线 */}
        <div className="hidden lg:block">
          {/* 连接线 */}
          <div className="relative mb-8 flex items-center justify-between px-8">
            <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-border" />
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  className={`relative z-10 flex size-14 items-center justify-center rounded-full border-2 border-border bg-card transition-all duration-700 ${
                    isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + i * 150}ms` }}
                >
                  <div className={`flex size-10 items-center justify-center rounded-full ${s.bg}`}>
                    <Icon className={`size-5 ${s.color}`} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* 文字部分 */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + i * 150}ms` }}
              >
                <div className={`mb-1 text-xs font-bold tabular-nums ${s.color}`}>{s.step}</div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 移动端：竖向时间轴 */}
        <div className="flex flex-col gap-0 lg:hidden">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                className={`relative flex gap-5 pb-8 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                {/* 左侧轴线 */}
                <div className="flex flex-col items-center">
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${s.bg}`}>
                    <Icon className={`size-5 ${s.color}`} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`mt-2 w-px flex-1 ${s.line}`} />
                  )}
                </div>
                {/* 右侧内容 */}
                <div className="pb-2">
                  <div className={`mb-0.5 text-xs font-bold ${s.color}`}>{s.step}</div>
                  <h3 className="mb-1 text-base font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
