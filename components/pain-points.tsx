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
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Pain Points
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"当机构规模增长，问题也在放大"}
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {pains.map((pain, i) => {
            const Icon = pain.icon
            return (
              <div
                key={i}
                className={`group flex gap-6 border-t border-border py-8 transition-all duration-700 last:border-b ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 150}ms` }}
              >
                {/* 左侧序号 */}
                <div className="shrink-0 pt-1">
                  <span className="text-4xl font-black tabular-nums text-border group-hover:text-primary/20 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* 中间图标 */}
                <div className="shrink-0 mt-1 flex size-10 items-center justify-center rounded-lg bg-destructive/8">
                  <Icon className="size-5 text-destructive" />
                </div>

                {/* 右侧文字 */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{pain.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
                    {pain.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
