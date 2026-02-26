"use client"

import { useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const credentials = [
  "世界 500 强企业工程标准",
  "GenAI 架构与 Schema 建模专家",
  "工业级分布式系统设计经验",
  "硅谷 AI 创业一线实战背景",
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
                  {"系统架构与教研逻辑设计者"}
                </p>
                <h3 className="mb-1 text-xl font-bold text-foreground">Ultra Fu</h3>
                <p className="mb-5 text-sm text-muted-foreground">{"未名逻辑 创始人 & 首席架构师"}</p>

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
                    {"系统底层架构经过严格的工程验证，确保每一次批改输出都符合机构教研标准。选择未名逻辑，意味着选择了经过世界级工程实践检验的技术合作伙伴。"}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-4">
                  {["Lenovo", "novita.ai", "Silicon Valley"].map((name) => (
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
