"use client"

import { useMemo, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function RoiSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)
  const [teacherSalary, setTeacherSalary] = useState(8000)
  const [studentCount, setStudentCount] = useState(300)
  const [essaysPerStudent, setEssaysPerStudent] = useState(4)
  const [showSystemCost, setShowSystemCost] = useState(false)

  const jiangsuEmployerRate = 0.375
  const fixedEssayMinutes = 20
  const fixedMonthlyHours = 176

  const calculated = useMemo(() => {
    const safeHours = fixedMonthlyHours > 0 ? fixedMonthlyHours : 1
    const safeMinutes = fixedEssayMinutes > 0 ? fixedEssayMinutes : 1
    const safeStudents = studentCount > 0 ? studentCount : 0
    const safeEssaysPerStudent = essaysPerStudent > 0 ? essaysPerStudent : 0
    const monthlyEssayCount = safeStudents * safeEssaysPerStudent
    const employerCost = teacherSalary * (1 + jiangsuEmployerRate)
    const hourlyCost = employerCost / safeHours
    const singleEssayCost = hourlyCost * (safeMinutes / 60)
    const monthlyTotalCost = singleEssayCost * monthlyEssayCount
    const employerRounded = Math.round(employerCost * 10) / 10
    const hourlyRounded = Math.round(hourlyCost * 10) / 10
    const essayRounded = Math.round(singleEssayCost * 10) / 10
    const monthlyRounded = Math.round(monthlyTotalCost * 10) / 10

    const annualManualCost = monthlyTotalCost * 12
    const billableStudents = Math.max(studentCount, 300)
    const systemAnnualCost = 100000 + 60000 + billableStudents * 100
    const systemMonthlyCost = systemAnnualCost / 12
    const annualSaved = annualManualCost - systemAnnualCost

    return {
      monthlyEssayCount,
      employerCost: employerRounded,
      hourlyCost: hourlyRounded,
      singleEssayCost: essayRounded,
      monthlyTotalCost: monthlyRounded,
      systemAnnualCost: Math.round(systemAnnualCost * 10) / 10,
      systemMonthlyCost: Math.round(systemMonthlyCost * 10) / 10,
      annualSaved: Math.round(annualSaved * 10) / 10,
      billableStudents,
    }
  }, [teacherSalary, studentCount, essaysPerStudent])

  return (
    <section id="roi" ref={sectionRef} className="scroll-mt-24 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">ROI</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"不讲故事，直接看投入产出"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {"先按当前人工批改成本测算，再一键查看系统上线后的总成本对比。"}
          </p>
        </div>

        <div
          className={`mb-8 rounded-2xl border border-primary/20 bg-card p-5 transition-all duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="space-y-2">
              <p className="text-xs text-muted-foreground">老师月薪（元）</p>
              <Input
                type="number"
                min={0}
                value={teacherSalary}
                onChange={(event) => setTeacherSalary(Number(event.target.value) || 0)}
              />
            </label>
            <label className="space-y-2">
              <p className="text-xs text-muted-foreground">在读学生数（人）</p>
              <Input
                type="number"
                min={0}
                value={studentCount}
                onChange={(event) => setStudentCount(Number(event.target.value) || 0)}
              />
            </label>
            <label className="space-y-2">
              <p className="text-xs text-muted-foreground">学生人均月作文数（篇）</p>
              <Input
                type="number"
                min={0}
                value={essaysPerStudent}
                onChange={(event) => setEssaysPerStudent(Number(event.target.value) || 0)}
              />
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-xs text-muted-foreground">企业用工总成本</p>
              <p className="mt-1 text-2xl font-bold text-foreground">约 {calculated.employerCost} 元/月</p>
            </div>
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-xs text-muted-foreground">老师时薪（按企业总成本）</p>
              <p className="mt-1 text-2xl font-bold text-foreground">约 {calculated.hourlyCost} 元/小时</p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/8 p-4">
              <p className="text-xs text-muted-foreground">单篇人工批改成本</p>
              <p className="mt-1 text-2xl font-bold text-primary">约 {calculated.singleEssayCost} 元/篇</p>
            </div>
            <div className="rounded-xl border border-primary/20 p-4">
              <p className="text-xs text-muted-foreground">月人工批改总成本</p>
              <p className="mt-1 text-2xl font-bold text-foreground">约 {calculated.monthlyTotalCost} 元</p>
              <p className="mt-1 text-xs text-muted-foreground">
                月作文量约 {calculated.monthlyEssayCount.toLocaleString("zh-CN")} 篇
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <Button
              size="lg"
              className="w-full px-8 text-base sm:w-auto"
              onClick={() => setShowSystemCost((prev) => !prev)}
            >
              {showSystemCost ? "收起系统成本" : "查看使用系统后成本"}
            </Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            {`计算逻辑：企业成本 = 月薪 × (1 + 企业五险一金比例 ${Math.round(jiangsuEmployerRate * 1000) / 10}%）；时薪 = 企业成本 ÷ ${fixedMonthlyHours} 小时；单篇成本 = 时薪 × (${fixedEssayMinutes} ÷ 60)；月作文量 = 在读学生数 × 人均月作文数；月总成本 = 单篇成本 × 月作文量。`}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {"系统成本测算已包含平台授权、年度服务与规模计费，并按最低计费规模自动处理。页面仅展示汇总结果，不展示计费单项。"}
          </p>

          <div
            aria-hidden={!showSystemCost}
            className={`overflow-hidden transition-all duration-300 ease-out ${
              showSystemCost ? "mt-4 max-h-80 opacity-100" : "mt-0 max-h-0 opacity-0"
            }`}
          >
            <div
              className={`grid gap-3 transition-all duration-300 ease-out sm:grid-cols-2 lg:grid-cols-3 ${
                showSystemCost ? "translate-y-0" : "-translate-y-2"
              }`}
            >
              <div className="rounded-xl border border-primary/30 bg-primary/8 p-4">
                <p className="text-xs text-muted-foreground">使用系统后月均总成本</p>
                <p className="mt-1 text-2xl font-bold text-primary">
                  约 {calculated.systemMonthlyCost.toLocaleString("zh-CN")} 元
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  当前按 {calculated.billableStudents.toLocaleString("zh-CN")} 人规模计费
                </p>
              </div>
              <div className="rounded-xl bg-secondary p-4">
                <p className="text-xs text-muted-foreground">使用系统后年度总成本</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  约 {calculated.systemAnnualCost.toLocaleString("zh-CN")} 元
                </p>
              </div>
              <div className="rounded-xl border border-primary/20 p-4">
                <div
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    calculated.annualSaved >= 0
                      ? "bg-emerald-500/15 text-emerald-700"
                      : "bg-orange-500/15 text-orange-700"
                  }`}
                >
                  {calculated.annualSaved >= 0 ? "系统上线后可优化" : "系统上线后将增加"}
                </div>
                <p
                  className={`mt-2 text-3xl font-extrabold tracking-tight ${
                    calculated.annualSaved >= 0 ? "text-emerald-700" : "text-orange-700"
                  }`}
                >
                  {Math.abs(calculated.annualSaved).toLocaleString("zh-CN")} 元
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {calculated.annualSaved >= 0 ? "预计年度节省" : "预计年度增加"}
                </p>
              </div>
            </div>
          </div>

        </div>

        <div
          className={`mt-8 flex items-center justify-center transition-all duration-700 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
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

        <p className="mt-3 text-center text-xs text-muted-foreground">
          {"* 测算口径可按您机构的班级数、作文量与教师配置单独校准。"}
        </p>
      </div>
    </section>
  )
}
