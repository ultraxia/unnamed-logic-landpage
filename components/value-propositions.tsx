"use client"

import { useRef } from "react"
import { Shield, FileCheck, Zap, BarChart3, Users, CreditCard } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const capabilities = [
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
  {
    icon: CreditCard,
    tag: "财务审批闭环",
    title: "收款退费全程线上，账务零漏洞",
    description:
      "报名由咨询师提交、财务审批后生效；退费同样走审批流。所有流水自动归档，月底对账一键导出。",
  },
  {
    icon: BarChart3,
    tag: "续费预警引擎",
    title: "提前 30 天知道谁要流失",
    description:
      "系统自动识别课时消耗进度、出勤率、学情趋势，提前预警高流失风险学员，让续费从被动应对变为主动出击。",
  },
  {
    icon: Shield,
    tag: "多角色权限",
    title: "老师看课表，财务看账单，各司其职",
    description:
      "老师、咨询师、财务、管理员各自有专属工作台，今日待办一目了然，敏感数据互相隔离，权限精细可控。",
  },
  {
    icon: FileCheck,
    tag: "私有化部署",
    title: "数据留在你手里，不上任何公有云",
    description:
      "支持私有化部署，学员数据、财务数据完全在机构自己的服务器上。对数据安全有要求的机构的首选。",
  },
]

export function ValuePropositions() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="capabilities" ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-14 text-center transition-all duration-700 ${
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <div
                key={i}
                className={`group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-700 hover:border-primary/20 sm:p-8 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <span className="rounded-full border border-border bg-secondary px-3 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{cap.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
