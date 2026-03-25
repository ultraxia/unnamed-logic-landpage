"use client"

import { useRef } from "react"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import logoImage from "@/image.png"

const credentials = [
  "创始团队来自世界 500 强 AI 研发一线",
  "具备工业级系统架构与大规模稳定性交付经验",
  "国内最早将 AI 落地到教培运营全流程的团队之一",
]

export function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="founder" ref={sectionRef} className="overflow-x-hidden px-6 py-20 md:py-28">
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
                <div className="relative size-16 overflow-hidden rounded-xl border border-border bg-card md:size-20">
                  <Image src={logoImage} alt="原点智能 Logo" fill className="object-contain p-1.5 md:p-2" />
                </div>
              </div>

              <div className="flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  {"About Origin Intelligence"}
                </p>
                <h3 className="mb-1 text-xl font-bold text-foreground">
                  {"关于"}
                  <span className="ml-1 text-primary">{"原点智能"}</span>
                </h3>
                <p className="mb-5 text-sm text-muted-foreground">{"教培机构 AI 运营系统专家"}</p>

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

                <div className="rounded-lg border border-border bg-secondary/40 p-5">
                  <p className="text-lg leading-relaxed text-foreground">
                    <span className="font-semibold text-primary">{"原点智能"}</span>{" "}
                    {
                      "认为，教培机构的下一个效率红利，在运营数字化、智能化。我们将世界级 AI 工程能力深度嵌入招生、教学、财务、运营四个核心场景，让机构从经验驱动走向数据智能驱动。"
                    }
                  </p>
                </div>

                <div className="mt-4 rounded-lg border-l-4 border-primary bg-primary/5 p-4 sm:p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary/90">Window</p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {
                      "先动的机构，先建壁垒。越晚越贵。"
                    }
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
