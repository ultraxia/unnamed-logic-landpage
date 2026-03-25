"use client"

import { useRef } from "react"
import { Fingerprint, TrendingUp, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const points = [
  {
    icon: Fingerprint,
    title: "先固化 SOP，再规模化执行",
    description: "把机构最佳实践——批改标准、跟进节奏、续费话术——沉淀到系统里，AI 执行你的 SOP，不是通用模板。",
  },
  {
    icon: TrendingUp,
    title: "每个角色都有专属放大器",
    description: "咨询师有商机跟进提醒和 AI 话术，财务有审批流水线，老师有 AI 批改，校长有全局数据看板。每个人的效率都被放大。",
  },
  {
    icon: Sparkles,
    title: "机构越用越聪明",
    description: "招生数据、课销数据、学情数据持续沉淀。系统掌握的机构运营规律越来越深，每一次决策都比上次更准。",
  },
]

export function AmplifierSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="amplifier" ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Operating System</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"不是工具，是机构的 AI 运营 OS"}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {"真正的差异，不在有没有 AI，而在 AI 是否在执行你自己的业务逻辑。先固化机构方法，再规模化交付。"}
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
