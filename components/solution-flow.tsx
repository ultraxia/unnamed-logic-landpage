"use client"

import { useRef } from "react"
import { Upload, FileCheck, BarChart3, TrendingUp, ArrowRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "招生跟进",
    description: "商机录入、试听安排、AI 话术辅助，转化数据实时可见，再也不漏跟进。",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "报名收款",
    description: "咨询师提交订单，财务线上审批，收款记录自动归档。退费也走审批流，账务清晰。",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "教学管理",
    description: "排课、点名、AI 作文批改一体化，学情数据自动沉淀，老师从重复劳动中解放。",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "续费决策",
    description: "续费预警提前介入，学情报告替代话术，用数据说服家长，续费率可量化提升。",
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
            {"从招生到续费，四步闭环"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {"每一个环节都有数据支撑，让机构运营从经验驱动变成数据驱动。"}
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
