"use client"

import { useRef } from "react"
import { Fingerprint, TrendingUp, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const points = [
  {
    icon: Fingerprint,
    title: "先固化 SOP，再规模化执行",
    description: "把你机构最有效的跟进节奏、批改标准、续费策略固化进系统。AI 照着你的方法干活，不是用一套通用模板应付所有机构。",
  },
  {
    icon: TrendingUp,
    title: "每个角色都有专属放大器",
    description: "咨询师不漏跟进，财务不漏单，老师不堆批改，校长随时看全局。一套系统，四个角色各自高效，不靠人盯人。",
  },
  {
    icon: Sparkles,
    title: "机构越用越聪明",
    description: "每一次跟进、每一笔收款、每一份批改都在积累。系统对你机构的了解越来越深，给出的建议越来越准，先用的机构先建立壁垒。",
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
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Operating System</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"不只是工具。是你的运营 OS。"}
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
