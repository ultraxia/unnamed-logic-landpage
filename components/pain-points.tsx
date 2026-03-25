"use client"

import { useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const pains = [
  {
    title: "招生靠手感，转化无数据",
    description: "每条商机的跟进情况，只存在咨询师的脑子里。漏跟进了多少，流失了多少，没人能说清。",
  },
  {
    title: "财务对账靠 Excel，漏单常有",
    description: "收款截图散在微信群，退费申请写在备忘录。月底对账，总有几笔账对不上，总有一笔说不清。",
  },
  {
    title: "老师批改过载，家长看不到价值",
    description: "30 篇精改，一个老师要花整整一天。交出去的，只有分数和几行点评，家长不知道孩子进步在哪。",
  },
]

export function PainPoints() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="overflow-x-hidden px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="section-label mb-2 text-xs font-semibold uppercase tracking-widest">
            Pain Points
          </p>
          <h2 className="section-title text-balance text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            {"规模越大，问题越贵"}
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {pains.map((pain, i) => (
            <div
              key={i}
              className={`group flex gap-8 border-t border-border py-8 transition-all duration-700 last:border-b ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
              }`}
              style={{ transitionDelay: `${150 + i * 150}ms` }}
            >
              <div className="shrink-0 pt-1">
                <span className="text-4xl font-black tabular-nums text-border group-hover:text-primary/20 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-2">{pain.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
                  {pain.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
