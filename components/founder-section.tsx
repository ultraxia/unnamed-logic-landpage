"use client"

import { useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const credentials = [
  "创始团队来自世界 500 强 Lenovo 工程体系",
  "具备工业级分布式系统架构与稳定性交付经验",
  "参与新加坡 AI 公司 Novita.AI 早期创业实践",
  "国内较早一批深度实践 GenAI 落地的团队",
]

export function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="founder" ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="flex size-16 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground md:size-20">
                  UF
                </div>
              </div>

              <div className="flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  {"About Unnamed Logic"}
                </p>
                <h3 className="mb-1 text-xl font-bold text-foreground">{"关于未名逻辑"}</h3>
                <p className="mb-5 text-sm text-muted-foreground">{"企业级 AI 教培基础设施团队"}</p>

                <div className="mb-6 grid gap-2 sm:grid-cols-2">
                  {credentials.map((c, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 transition-all duration-500 ${
                        isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                      }`}
                      style={{ transitionDelay: `${400 + i * 100}ms` }}
                    >
                      <div className="size-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{c}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-sm leading-relaxed text-secondary-foreground">
                    {
                      "未名逻辑认为，AI 对传统教学交付的重构已经开始，差异不在于“要不要用 AI”，而在于“何时完成可运营的 AI 升级”。我们把世界级工程方法、分布式系统能力与教研场景深度结合，帮助机构把 AI 从演示能力变成可规模化、可持续复用的业务能力。"
                    }
                  </p>
                </div>

                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm leading-relaxed text-foreground">
                    {
                      "窗口期正在快速收窄：先完成 AI 升级的机构，会先建立交付效率、家长感知和数据资产优势；观望越久，后续的组织改造与获客成本越高。"
                    }
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-4">
                  {["Lenovo", "Novita.AI", "GenAI", "Distributed Systems"].map((name) => (
                    <span key={name} className="text-xs tracking-wider text-muted-foreground/50">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
