"use client"

import { useRef } from "react"
import { Fingerprint, TrendingUp, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const points = [
  {
    icon: Fingerprint,
    title: "你的标准，AI 来执行",
    description: "跟进节奏、批改口径、续费策略，全部沉淀进系统。AI 用的是你的方法论，不是一套通用模板套所有机构。",
  },
  {
    icon: TrendingUp,
    title: "每个角色，都有自己的主场",
    description: "咨询师有商机看板，财务有审批流水，老师有批改中心，校长有全局数据。各司其职，不靠人盯人，不靠微信群协调。",
  },
  {
    icon: Sparkles,
    title: "用得越久，优势越大",
    description: "每一次跟进、每一笔收款、每一份批改，都在沉淀数据。系统越了解你的机构，给出的判断就越准，这是时间买不来的壁垒。",
  },
]

export function AmplifierSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="amplifier" ref={sectionRef} className="overflow-x-hidden px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="section-label mb-2 text-xs font-semibold uppercase tracking-widest">Operating System</p>
          <h2 className="section-title text-balance text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            {"不只是工具，是你的运营 OS。"}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {"有没有 AI 不是问题。AI 有没有在执行你的业务逻辑，才是。"}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {points.map((item, index) => {
            const Icon = item.icon
            return (
              <article
                key={item.title}
                className={`rounded-xl border border-border bg-card p-6 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${180 + index * 120}ms` }}
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/8">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
