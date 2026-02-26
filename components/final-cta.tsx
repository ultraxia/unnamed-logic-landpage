"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, ShieldCheck } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function FinalCta() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card p-8 text-center shadow-sm sm:p-12">
            <div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1">
              <span className="text-[11px] font-semibold text-primary-foreground">{"限额开放"}</span>
            </div>

            <div className="mb-2 flex items-center justify-center gap-2">
              <Lock className="size-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {"审核制"}
              </span>
            </div>

            <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {"本季度仅开放 3 家机构深度共建"}
            </h2>

            <p className="mx-auto mb-6 max-w-xl text-sm text-muted-foreground">
              {"先试点再全面上线：用真实教学结果决定是否推进，不让团队承担试错成本。"}
            </p>

            <div className="mb-7 grid gap-2 rounded-lg border border-border bg-background p-4 text-left">
              <div className="flex items-start gap-2 text-sm text-foreground">
                <ShieldCheck className="mt-0.5 size-4 text-primary" />
                <span>{"14 天小范围试点，先在一个年级验证结果"}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-foreground">
                <ShieldCheck className="mt-0.5 size-4 text-primary" />
                <span>{"不达成预设目标可退出，不绑定长期合同"}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-foreground">
                <ShieldCheck className="mt-0.5 size-4 text-primary" />
                <span>{"配套上线顾问与教研同训，保障团队可落地"}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="w-full px-8 text-base sm:w-auto">
                {"获取机构 ROI 测算"}
              </Button>
              <Button size="lg" variant="outline" className="w-full px-8 text-base sm:w-auto">
                {"预约 30 分钟决策演示"}
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">{"提交后 24 小时内回复排期"}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
