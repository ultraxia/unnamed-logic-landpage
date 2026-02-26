"use client"

import { useRef } from "react"
import { Fingerprint, GraduationCap, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const points = [
  {
    icon: Fingerprint,
    title: "先学你的标准，再批每一篇",
    description: "先对齐机构评分口径、评语边界和改写风格，再输出结果。AI 执行的是你的方法论，不是通用模板。",
  },
  {
    icon: GraduationCap,
    title: "放大名师经验，不依赖名师在场",
    description: "优秀教师的批改逻辑可以被沉淀并复制到全校区，减少“同题不同判”的体验波动。",
  },
  {
    icon: Sparkles,
    title: "统一质量，释放老师时间",
    description: "把老师从重复劳动中释放出来，聚焦讲评、答疑和提分策略，让教学价值出现在最关键的环节。",
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
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Teaching DNA</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"AI 不是模板机，而是机构教学能力放大器"}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {"真正的差异，不在“有没有 AI”，而在“AI 是否执行你自己的教学标准”。先固化机构方法，再规模化交付。"}
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
