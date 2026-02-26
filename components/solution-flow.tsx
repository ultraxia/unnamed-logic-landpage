"use client"

import { useRef } from "react"
import { Upload, FileCheck, BarChart3, TrendingUp, ArrowRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "上传作业",
    description: "拍照或扫描上传，支持多种格式批量导入。",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "AI 批改 + 满分范文",
    description: "单篇约 1 分钟完成批改与改写，并发处理下 100 篇仍保持分钟级交付。",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "自动学情画像",
    description: "精准捕捉学生弱点分布，生成结构化进步趋势分析。",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "续费支持报告",
    description: "可视化教学成果，为家长提供数据化续费依据。",
  },
]

export function SolutionFlow() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="solution" ref={sectionRef} className="border-y border-border bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-14 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Solution
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"从上传到续费，四步闭环"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {"替代旧流程，让每一个环节都为机构创造可量化的商业价值。"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                className={`relative transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/8">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-border">{s.step}</span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="size-4 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
