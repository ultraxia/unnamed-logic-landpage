"use client"

import { useRef } from "react"
import { Shield, FileCheck, Zap, BarChart3, Users, CreditCard } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const primary = [
  {
    icon: Zap,
    tag: "AI 作文批改",
    title: "2s 出报告，老师从批改中解放",
    description:
      "单篇 2 秒完成批改、满分范文、8 维学情诊断。并发处理下全班统考当天交付，老师精力回归教学本身。",
  },
  {
    icon: Users,
    tag: "招生漏斗管理",
    title: "每条商机都有跟进记录可查",
    description:
      "商机录入、试听安排、AI 话术辅助一体化。系统自动提醒逾期跟进，转化率从经验数字变成可追踪指标。",
  },
]

const secondary = [
  {
    icon: CreditCard,
    tag: "财务审批闭环",
    title: "收款退费全程线上",
    description: "报名、退费全走审批流，账务自动归档，月底对账一键导出。",
  },
  {
    icon: BarChart3,
    tag: "续费预警引擎",
    title: "提前 30 天知道谁要流失",
    description: "综合课时、出勤、学情自动评分，高风险学员提前标红。",
  },
  {
    icon: Shield,
    tag: "多角色权限",
    title: "各司其职，数据隔离",
    description: "老师、咨询师、财务各自的工作台，敏感数据互相隔离。",
  },
  {
    icon: FileCheck,
    tag: "私有化部署",
    title: "数据留在你手里",
    description: "支持私有化部署，学员和财务数据不上任何公有云。",
  },
]

export function ValuePropositions() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="capabilities" ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-14 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Capabilities
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"每一项能力，都直接对应商业结果"}
          </h2>
        </div>

        {/* 主要能力：两列大卡片 */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          {primary.map((cap, i) => {
            const Icon = cap.icon
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-700 hover:border-primary/30 hover:shadow-md ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                {/* 背景装饰 */}
                <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/8" />

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <span className="rounded-full border border-border bg-secondary px-3 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">{cap.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
              </div>
            )
          })}
        </div>

        {/* 次要能力：横向 tag 行，hover 展开描述 */}
        <div className="flex flex-wrap gap-3">
          {secondary.map((cap, i) => {
            const Icon = cap.icon
            return (
              <div
                key={i}
                className={`group relative cursor-default transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${440 + i * 80}ms` }}
              >
                {/* Tag 默认态 */}
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5">
                  <Icon className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground whitespace-nowrap">
                    {cap.title}
                  </span>
                </div>

                {/* Hover 展开浮层 */}
                <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-56 rounded-xl border border-border bg-card p-4 shadow-lg opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="size-4 text-primary shrink-0" />
                    <span className="text-[11px] font-semibold text-primary">{cap.tag}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{cap.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
