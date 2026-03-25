"use client"

import { useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function DataAssetSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="data-asset" ref={sectionRef} className="border-y border-border bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-14 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            AI Intelligence
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"AI 主动出击，不等问题发生"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {"系统实时分析招生漏斗和学员状态，在关键时机自动触发 AI 介入。"}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 overflow-hidden">
          {/* AI 催单助攻 */}
          <div
            className={`rounded-xl border border-border bg-card p-5 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{"AI 催单助攻"}</h4>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {"实时生成"}
              </span>
            </div>
            <AiScriptMockup show={isVisible} />
            <p className="mt-3 text-xs text-muted-foreground">
              {"试听结束后自动生成定制话术，根据学生学情和家长关注点精准组织说辞。"}
            </p>
          </div>

          {/* 流失预警 */}
          <div
            className={`rounded-xl border border-border bg-card p-5 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{"续费预警雷达"}</h4>
              <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                {"提前 30 天"}
              </span>
            </div>
            <ChurnRadarMockup show={isVisible} />
            <p className="mt-3 text-xs text-muted-foreground">
              {"综合课时消耗、出勤率、互动频率自动评分，高风险学员提前标红预警。"}
            </p>
          </div>

          {/* 学情报告 */}
          <div
            className={`rounded-xl border border-border bg-card p-5 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{"学情进步曲线"}</h4>
              <span className="text-[11px] text-muted-foreground">{"近 12 周"}</span>
            </div>
            <ProgressChart show={isVisible} />
            <p className="mt-3 text-xs text-muted-foreground">
              {"自动追踪学生各维度得分变化，续费面谈时用数据说话，胜过一切话术。"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AiScriptMockup({ show }: { show: boolean }) {
  const lines = [
    { role: "sys", text: "分析试听学员：李同学，8岁，逻辑思维强，注意力集中度高", delay: 600 },
    { role: "ai", text: "根据学情生成话术...", delay: 900, typing: true },
    { role: "ai", text: "「李同学今天试听表现非常活跃，逻辑推理能力在同龄中属于上游。我们有一个专门针对这类孩子的强化班...」", delay: 1300 },
    { role: "tag", text: "✓ 转化成功率 +34%", delay: 1800 },
  ]

  return (
    <div className="flex h-36 flex-col gap-2 overflow-hidden rounded-lg bg-background p-3">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`flex items-start gap-2 ${line.role === "tag" ? "mt-auto" : ""}`}
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(6px)",
            transition: "all 0.5s ease",
            transitionDelay: `${line.delay}ms`,
          }}
        >
          {line.role === "sys" && (
            <span className="mt-0.5 shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
              SYS
            </span>
          )}
          {line.role === "ai" && (
            <span className="mt-0.5 shrink-0 rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-medium text-primary">
              AI
            </span>
          )}
          {line.role === "tag" ? (
            <span className="w-full rounded-md bg-emerald-500/10 px-2 py-1 text-center text-[10px] font-semibold text-emerald-600">
              {line.text}
            </span>
          ) : (
            <p className="text-[10px] leading-relaxed text-muted-foreground">{line.text}</p>
          )}
        </div>
      ))}
    </div>
  )
}

function ChurnRadarMockup({ show }: { show: boolean }) {
  const students = [
    { name: "王小明", risk: 92, color: "bg-destructive", label: "高风险" },
    { name: "李思雨", risk: 67, color: "bg-orange-400", label: "中风险" },
    { name: "张浩然", risk: 41, color: "bg-yellow-400", label: "观察中" },
    { name: "陈欣然", risk: 18, color: "bg-emerald-500", label: "健康" },
  ]

  return (
    <div className="flex h-36 flex-col gap-2 justify-center">
      {students.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-2"
          style={{
            opacity: show ? 1 : 0,
            transition: "opacity 0.5s ease",
            transitionDelay: `${700 + i * 150}ms`,
          }}
        >
          <span className="w-12 shrink-0 text-[10px] text-muted-foreground truncate">{s.name}</span>
          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full ${s.color}`}
              style={{
                width: show ? `${s.risk}%` : "0%",
                transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: `${800 + i * 150}ms`,
              }}
            />
          </div>
          <span
            className={`shrink-0 text-[9px] font-semibold ${
              s.risk >= 80 ? "text-destructive" : s.risk >= 60 ? "text-orange-500" : s.risk >= 40 ? "text-yellow-600" : "text-emerald-600"
            }`}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function ProgressChart({ show }: { show: boolean }) {
  const bars = [35, 42, 48, 45, 55, 52, 60, 58, 65, 70, 68, 78]
  return (
    <div className="flex h-36 items-end gap-1.5 pt-4">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t ${i >= 9 ? "bg-primary" : "bg-primary/40"}`}
          style={{
            height: show ? `${h}%` : "0%",
            transition: "height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: `${600 + i * 80}ms`,
          }}
        />
      ))}
    </div>
  )
}
