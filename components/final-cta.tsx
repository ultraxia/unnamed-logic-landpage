"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function FinalCta() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Strong scarcity CTA card with "审核制" feel */}
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card p-8 text-center shadow-sm sm:p-12">
            {/* Corner badge */}
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
              {"本季度仅开放 10 家机构深度共建"}
            </h2>

            <p className="mb-8 text-sm text-muted-foreground">
              {"需创始人或教研主管参与演示评审，确保合作深度与效果。"}
            </p>

            <Button size="lg" className="px-10 text-base">
              {"申请演示资格"}
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              {"提交后 24 小时内回复审核结果"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
