"use client"

import { useRef } from "react"
import { Shield, FileCheck, Zap, BarChart3, Users, CreditCard } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const primary = [
  {
    icon: Zap,
    tag: "AI 作文批改",
    title: "10 秒出报告，老师时间还给教学",
    description:
      "单篇 10 秒，批改、范文、8 维诊断一次给齐。全班统考当天交付，老师的时间，终于可以还给真正的教学。",
  },
  {
    icon: Users,
    tag: "招生漏斗管理",
    title: "每条商机，都有迹可循",
    description:
      "从录入到成交，每一步都有记录。逾期未跟进，系统主动提醒。转化率，不再是一个模糊的感受。",
  },
  {
    icon: BarChart3,
    tag: "续费预警引擎",
    title: "流失之前，你已经知道了",
    description:
      "课时、出勤、学情综合评分，高风险学员自动标红。提前 30 天，留住一个学员的成本，远低于失去之后再找回来。",
  },
]

const secondary = [
  {
    icon: CreditCard,
    tag: "财务审批闭环",
    title: "收款退费，全程留痕",
    description: "每一笔收款、每一次退费，都走审批流，都有记录。月底对账，一键导出，账务不再是噩梦。",
  },
  {
    icon: Shield,
    tag: "多角色权限",
    title: "权限清晰，数据归位",
    description: "每个角色只看自己该看的，敏感数据不越权，工作台开箱即用。",
  },
  {
    icon: FileCheck,
    tag: "私有化部署",
    title: "你的数据，只在你这里",
    description: "私有化部署，学员档案和财务数据存在你自己的服务器上，不经过任何第三方。",
  },
]

export function ValuePropositions() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="capabilities" ref={sectionRef} className="overflow-x-hidden px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-14 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="section-label mb-2 text-xs font-semibold uppercase tracking-widest">
            Capabilities
          </p>
          <h2 className="section-title text-balance text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            {"能力不停留在演示里。"}
          </h2>
        </div>

        {/* 主要能力：三列大卡片 */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
