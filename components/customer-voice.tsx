"use client"

import { useRef } from "react"
import { Quote } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const highlights = [
  {
    title: "批改效率",
    value: "30 人同批时，平均等待约 2s / 篇",
    detail: "单篇约 1 分钟，利用并发后班级交付保持分钟级。",
  },
  {
    title: "精改 + 改写",
    value: "老师 20-60 分钟的工作，现在 1 分钟完成",
    detail: "过去精改约 20 分钟，叠加满分改写可达 1 小时。",
  },
  {
    title: "成本与资产",
    value: "人工 50 元/篇成本下降，数据资产持续沉淀",
    detail: "老师把时间转向讲评与教学干预，系统自动记录进步轨迹。",
  },
]

export function CustomerVoice() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
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
              {"“以前一篇作文精改常要 20 分钟，做一对一满分改写甚至接近 1 小时。现在批改+满分改写约 1 分钟完成；500 篇并发也保持分钟级交付，课堂反馈效率完全不同，家长看到数据支撑，续费意愿也变强了。”"}
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              {"上海某 K12 语文辅导机构 · 教研负责人"}
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
