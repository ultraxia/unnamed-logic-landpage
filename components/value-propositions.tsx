"use client"

import { useRef } from "react"
import { Shield, FileCheck, Zap, BarChart3 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const capabilities = [
  {
    icon: Shield,
    tag: "8 维 Schema 诊断",
    title: "让家长看到结构性改进建议",
    description:
      "不是笼统的评分，而是内容、结构、逻辑、语法等 8 个维度的精准拆解。每一份报告都让家长清晰看到孩子的进步路径，强化教学品牌信任。",
  },
  {
    icon: FileCheck,
    tag: "满分范文硬约束",
    title: "学生拿到手就能改、能练",
    description:
      "系统强制生成与题目高度契合的高质量满分范文，不是泛泛的模板，而是精准的修改路径。学生有标杆可对照，教学闭环真正落地。",
  },
  {
    icon: Zap,
    tag: "高并发异步集群",
    title: "大型统考当天零延迟",
    description:
      "基于工业级调度架构，单篇约 1 分钟处理；全校统考并发提交时，整体交付时长不再随篇数线性增加。",
  },
  {
    icon: BarChart3,
    tag: "学情数据引擎",
    title: "续费不靠话术，靠数据",
    description:
      "自动沉淀每位学生的进步曲线与弱点分布。续费面谈时，一张数据报告胜过一百句承诺。",
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

        <div className="grid gap-5 sm:grid-cols-2">
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
