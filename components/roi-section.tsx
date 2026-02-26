"use client"

import { useRef } from "react"
import { ArrowRight, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const roiCases = [
  {
    type: "单校区机构",
    scale: "8 个班 / 月均 1,200 篇作文",
    labor: "约 3.6 万元/月",
    saved: "预计节省 1.8-2.2 万元/月",
    payback: "预计 1-2 个月回本",
  },
  {
    type: "区域连锁机构",
    scale: "35 个班 / 月均 5,000 篇作文",
    labor: "约 15 万元/月",
    saved: "预计节省 7.5-9.0 万元/月",
    payback: "预计 1 个月内回本",
  },
  {
    type: "城市级品牌机构",
    scale: "80 个班 / 月均 12,000 篇作文",
    labor: "约 36 万元/月",
    saved: "预计节省 18-21 万元/月",
    payback: "预计 2-4 周进入正收益",
  },
]

export function RoiSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="roi" ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">ROI</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"不是讲故事，先看投入产出"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {"按传统人工批改成本 50 元/篇测算，机构规模越大，降本与回本速度越明显。"}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {roiCases.map((item, index) => (
            <article
              key={item.type}
              className={`rounded-xl border border-border bg-card p-6 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 140}ms` }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">{item.type}</p>
              <p className="mt-2 text-sm font-medium text-foreground">{item.scale}</p>

              <div className="mt-5 space-y-3 text-sm">
                <div className="rounded-lg bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">当前人工成本</p>
                  <p className="mt-1 font-semibold text-foreground">{item.labor}</p>
                </div>
                <div className="rounded-lg bg-primary/8 p-3">
                  <p className="text-xs text-muted-foreground">预计每月可释放成本</p>
                  <p className="mt-1 font-semibold text-foreground">{item.saved}</p>
                </div>
                <div className="rounded-lg border border-primary/20 p-3">
                  <p className="text-xs text-muted-foreground">预计回本周期</p>
                  <p className="mt-1 font-semibold text-primary">{item.payback}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`mt-8 flex flex-col items-center justify-center gap-3 transition-all duration-700 delay-500 sm:flex-row ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Button size="lg" className="w-full sm:w-auto">
            <Calculator className="size-4" />
            {"获取机构 ROI 测算表"}
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            {"预约 30 分钟决策演示"}
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          {"* 测算口径可按您机构的班级数、作文量与教师配置单独校准。"}
        </p>
      </div>
    </section>
  )
}
