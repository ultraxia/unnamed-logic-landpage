"use client"

import { useRef } from "react"
import { Clock, DollarSign, Target } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const pains = [
  {
    icon: Target,
    title: "招生靠手感，转化无数据",
    description: "商机跟进全靠咨询师记忆，漏跟进、超时跟进无从追踪。每个月流失多少潜在学员，没人说得清。",
  },
  {
    icon: DollarSign,
    title: "财务对账靠 Excel，漏单常有",
    description: "收款、退费、延转散落在微信群和表格里，月底对账费时费力，错单漏单时有发生，校长心里没底。",
  },
  {
    icon: Clock,
    title: "老师批改过载，家长感知不到价值",
    description: "30 篇作文精改耗时 8 小时，结果只有分数和简评。家长看不到孩子的进步，续费凭感觉而非数据。",
  },
]

export function PainPoints() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-14 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Pain Points
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"当机构规模增长，问题也在放大"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {"每一次扩张，都在放大这些未被解决的结构性问题。"}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {pains.map((pain, i) => {
            const Icon = pain.icon
            return (
              <div
                key={i}
                className={`rounded-xl border border-border bg-card p-6 transition-all duration-700 sm:p-8 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-destructive/10">
                  <Icon className="size-5 text-destructive" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {pain.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pain.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
