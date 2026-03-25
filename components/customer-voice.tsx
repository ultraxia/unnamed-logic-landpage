"use client"

import { useRef } from "react"
import { Quote } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const highlights = [
  {
    title: "招生转化",
    value: "商机跟进及时率提升，漏跟进降至零",
    detail: "系统自动提醒逾期跟进，每条商机都有完整跟进记录可追溯。",
  },
  {
    title: "财务效率",
    value: "月底对账从半天缩短到 10 分钟",
    detail: "收款、退费全走线上审批流，报表一键导出，账务零漏洞。",
  },
  {
    title: "续费表现",
    value: "续费率提升，家长主动问续费",
    detail: "学情报告替代话术，数据让家长看到孩子的结构性进步。",
  },
]

const cases: { org: string; period: string; before: string; after: string }[] = []

export function CustomerVoice() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`rounded-xl border border-border bg-card p-6 transition-all duration-700 sm:p-8 md:p-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-7 flex items-center gap-2 text-primary">
            <Quote className="size-4" />
            <p className="text-xs font-semibold uppercase tracking-widest">Customer Voice</p>
          </div>

          <blockquote className="border-l-2 border-primary pl-4 sm:pl-5">
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              {"以前招生靠咨询师记性，财务靠微信截图，续费靠感情维系。现在系统把这三件事全接住了——商机有记录、账务有流水、续费有数据。校长终于能看清楚每个月到底赚了多少、从哪赚的。"}
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              {"江苏某 K12 辅导机构 · 校长"}
            </footer>
          </blockquote>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-lg border border-border bg-background p-4 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                <p className="text-xs font-semibold text-muted-foreground">{item.title}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-foreground">{item.value}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}
