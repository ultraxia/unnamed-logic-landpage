"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, ShieldCheck } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function FinalCta() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="overflow-x-hidden px-6 py-20 md:py-28">
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
              {"本季度限额开放 10 家机构深度共建"}
            </h2>

            <p className="mx-auto mb-8 max-w-xl text-sm text-muted-foreground">
              {"先试点再全面上线：2 周完成系统部署与团队培训，用真实运营结果决定是否推进。"}
            </p>

            <div className="mb-8 inline-flex flex-col gap-3 text-left">
              {[
                "2 周完成系统部署，团队当天可上手操作",
                "不达成预设目标可退出，不绑定长期合同",
                "专人对接上线全程，招生/财务/教学角色分别培训",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <ShieldCheck className="size-4 shrink-0 text-primary" />
                  <p className="text-sm text-foreground">{text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="outline" className="w-full px-8 text-base sm:w-auto">
                <a href="#roi">{"获取机构 ROI 测算"}</a>
              </Button>
              <Button asChild size="lg" className="w-full px-8 text-base sm:w-auto">
                <a
                  href="https://my.feishu.cn/share/base/form/shrcnDKtWPa43T6FS869Nvb1k7x"
                  target="_blank"
                  rel="noreferrer"
                >
                  {"预约试用"}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">{"提交后 24 小时内回复排期"}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
