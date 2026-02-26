"use client"

import { useRef } from "react"
import { Quote } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const highlights = [
  {
    title: "批改效率",
    value: "30 人同批时，平均等待约 2s / 篇",
    detail: "单篇约 1 分钟，利用并发后班级交付保持分钟级。",
  },
  {
    title: "精改 + 改写",
    value: "老师 20-60 分钟的工作，现在约 1 分钟完成",
    detail: "过去精改约 20 分钟，叠加满分改写可达 1 小时。",
  },
  {
    title: "成本与资产",
    value: "人工 50 元/篇成本下降，数据资产持续沉淀",
    detail: "老师把时间转向讲评与教学干预，系统自动记录进步轨迹。",
  },
]

const cases = [
  {
    org: "华东语文连锁 A（12 校区）",
    period: "上线 6 周",
    before: "月均约 4,800 篇作文，助教排班长期加班",
    after: "批改交付从 2-3 天缩短到当日完成，续费沟通以数据报告为主",
  },
  {
    org: "华北 K12 机构 B（3 校区）",
    period: "上线 1 个月",
    before: "教研主管每周大量时间用于批改抽检",
    after: "教研时间转向课堂干预，家长会使用个体进步曲线",
  },
  {
    org: "西南作文品牌 C（单校区）",
    period: "试点 14 天",
    before: "高峰周末作文积压，反馈延迟影响家长体验",
    after: "周末高峰仍可当天回传，试点后直接进入正式采购流程",
  },
]

export function CustomerVoice() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`rounded-xl border border-border bg-card p-6 transition-all duration-700 sm:p-8 md:p-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-7 flex items-center gap-2 text-primary">
            <Quote className="size-4" />
            <p className="text-xs font-semibold uppercase tracking-widest">Customer Voice</p>
          </div>

          <blockquote className="border-l-2 border-primary pl-4 sm:pl-5">
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              {"“以前一篇作文精改常要 20 分钟，做一对一满分改写甚至接近 1 小时。现在批改+满分改写约 1 分钟完成；高峰期仍维持分钟级交付，课堂反馈节奏完全不同，家长对续费沟通的接受度明显提高。”"}
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              {"华东某 K12 机构 · 教研负责人"}
            </footer>
          </blockquote>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-lg border border-border bg-background p-4 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                <p className="text-xs font-semibold text-muted-foreground">{item.title}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-foreground">{item.value}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cases.map((item, index) => (
            <article
              key={item.org}
              className={`rounded-xl border border-border bg-background p-5 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${480 + index * 140}ms` }}
            >
              <p className="text-sm font-semibold text-foreground">{item.org}</p>
              <p className="mt-1 text-xs text-primary">{item.period}</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{item.before}</p>
              <p className="mt-2 text-xs leading-5 text-foreground">{item.after}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
