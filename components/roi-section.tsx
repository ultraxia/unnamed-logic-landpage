"use client"

import { useMemo, useRef, useState } from "react"
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function RoiSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  // 用户填写：两个核心变量（用字符串避免开头 0 的问题）
  const [studentCountStr, setStudentCountStr] = useState("1500")
  const [pricePerClassStr, setPricePerClassStr] = useState("150")
  const studentCount = Number(studentCountStr) || 0
  const pricePerClass = Number(pricePerClassStr) || 0

  // 保留：批改人工成本计算
  const [teacherSalaryStr, setTeacherSalaryStr] = useState("8000")
  const [essaysPerStudentStr, setEssaysPerStudentStr] = useState("4")
  const teacherSalary = Number(teacherSalaryStr) || 0
  const essaysPerStudent = Number(essaysPerStudentStr) || 0
  const [showDetail, setShowDetail] = useState(false)

  // 固定假设
  const jiangsuEmployerRate = 0.375
  const fixedEssayMinutes = 20
  const fixedMonthlyHours = 176
  const classesPerQuarter = 20        // 每季度课次
  const conversionRate = 0.25         // 当前招生转化率
  const conversionLift = 0.15         // 系统介入后转化率提升（相对值）
  const renewalRate = 0.60            // 当前续费率
  const renewalLift = 0.05            // 续费率提升（绝对值）

  const calculated = useMemo(() => {
    const safeStudents = studentCount > 0 ? studentCount : 0
    const safePrice = pricePerClass > 0 ? pricePerClass : 0
    const safeSalary = teacherSalary > 0 ? teacherSalary : 0
    const safeEssays = essaysPerStudent > 0 ? essaysPerStudent : 0

    // ── 客单价 ──
    const quarterlyRevenue = classesPerQuarter * safePrice           // 单学生单季度收入
    const annualRevenuePerStudent = quarterlyRevenue * 3             // 按 3 个季度算

    // ── 招生增收 ──
    const monthlyLeads = Math.round(safeStudents / 10)               // 假设月商机数 = 学生数 / 10
    const monthlyNewStudents = monthlyLeads * conversionRate
    const monthlyNewAfter = monthlyLeads * conversionRate * (1 + conversionLift)
    const monthlyExtraStudents = monthlyNewAfter - monthlyNewStudents
    const annualEnrollGain = Math.round(monthlyExtraStudents * 12 * annualRevenuePerStudent)

    // ── 续费增收 ──
    const renewedBefore = safeStudents * renewalRate
    const renewedAfter = safeStudents * (renewalRate + renewalLift)
    const extraRenewed = renewedAfter - renewedBefore
    const annualRenewalGain = Math.round(extraRenewed * quarterlyRevenue)

    // ── 人工批改节省 ──
    const employerCost = safeSalary * (1 + jiangsuEmployerRate)
    const hourlyCost = employerCost / fixedMonthlyHours
    const singleEssayCost = hourlyCost * (fixedEssayMinutes / 60)
    const monthlyEssayCount = safeStudents * safeEssays
    const monthlyManualCost = singleEssayCost * monthlyEssayCount
    const annualManualCost = monthlyManualCost * 12

    const billableStudents = Math.max(safeStudents, 300)
    const systemAnnualCost = billableStudents * 15 * 12

    // ── 师资扩张容量（不计入 ROI，仅展示） ──
    const teacherCount = Math.round(safeStudents / 50)               // 每位老师带50学生
    const extraCapacity = teacherCount * 10                          // 每位老师可多带10学生

    // ── 综合 ROI ──
    const totalAnnualGain = annualEnrollGain + annualRenewalGain
    const roiMultiple = systemAnnualCost > 0
      ? Math.round((totalAnnualGain / systemAnnualCost) * 10) / 10
      : 0

    return {
      // 招生
      monthlyLeads,
      monthlyExtraStudents: Math.round(monthlyExtraStudents * 10) / 10,
      annualEnrollGain,
      // 续费
      extraRenewed: Math.round(extraRenewed),
      annualRenewalGain,
      // 师资扩张容量
      teacherCount,
      extraCapacity,
      systemAnnualCost,
      // 汇总
      totalAnnualGain,
      roiMultiple,
      // 明细（展开用）
      employerCost: Math.round(employerCost),
      hourlyCost: Math.round(hourlyCost * 10) / 10,
      singleEssayCost: Math.round(singleEssayCost * 10) / 10,
      monthlyEssayCount,
      monthlyManualCost: Math.round(monthlyManualCost),
      annualManualCost: Math.round(annualManualCost),
      quarterlyRevenue,
      annualRevenuePerStudent,
    }
  }, [studentCount, pricePerClass, teacherSalary, essaysPerStudent])

  const fmt = (n: number) => n.toLocaleString("zh-CN")

  return (
    <section id="roi" ref={sectionRef} className="overflow-x-hidden scroll-mt-24 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="section-label mb-2 text-xs font-semibold uppercase tracking-widest">ROI</p>
          <h2 className="section-title text-balance text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            {"数字不会说谎"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {"两个数字，看清一年的回报"}
          </p>
        </div>

        <div
          className={`rounded-2xl border border-primary/20 bg-card p-5 transition-all duration-700 sm:p-8 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* 两个核心输入 */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <p className="text-sm font-medium text-foreground">在读学生数（人）</p>
              <Input
                type="text"
                inputMode="numeric"
                value={studentCountStr}
                onChange={(e) => setStudentCountStr(e.target.value.replace(/[^0-9]/g, ""))}
                className="text-lg h-12"
              />
            </label>
            <label className="space-y-2">
              <p className="text-sm font-medium text-foreground">单课时价格（元）</p>
              <Input
                type="text"
                inputMode="numeric"
                value={pricePerClassStr}
                onChange={(e) => setPricePerClassStr(e.target.value.replace(/[^0-9]/g, ""))}
                className="text-lg h-12"
              />
              <p className="text-xs text-muted-foreground">
                单季度 {fmt(calculated.quarterlyRevenue)} 元/生，约 {fmt(calculated.annualRevenuePerStudent)} 元/生/年
              </p>
            </label>
          </div>

          {/* 三维增益 */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-secondary p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10">
                  <Users className="size-4 text-blue-500" />
                </div>
                <p className="text-xs font-semibold text-muted-foreground">招生增收</p>
              </div>
              <p className="text-2xl font-bold text-foreground">¥{fmt(calculated.annualEnrollGain)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                转化率提升 15%，月多成交约 {calculated.monthlyExtraStudents} 人
              </p>
            </div>

            <div className="rounded-xl bg-secondary p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <TrendingUp className="size-4 text-emerald-500" />
                </div>
                <p className="text-xs font-semibold text-muted-foreground">续费增收</p>
              </div>
              <p className="text-2xl font-bold text-foreground">¥{fmt(calculated.annualRenewalGain)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                续费率提升 5%，每季度多留约 {calculated.extraRenewed} 人
              </p>
            </div>

            <div className="rounded-xl bg-secondary p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="size-4 text-primary" />
                </div>
                <p className="text-xs font-semibold text-muted-foreground">师资扩张容量</p>
              </div>
              <p className="text-2xl font-bold text-foreground">+{fmt(calculated.extraCapacity)} 人</p>
              <p className="mt-1 text-xs text-muted-foreground">
                现有 {calculated.teacherCount} 位老师可多承接约 {calculated.extraCapacity} 名学生，无需增招
              </p>
            </div>
          </div>

          {/* 综合 ROI 汇总 */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
            <p className="mb-1 text-sm text-muted-foreground">年度综合增益</p>
            <p className="text-4xl font-black tracking-tight text-emerald-600">
              ¥{fmt(calculated.totalAnnualGain)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              投资回报约{" "}
              <span className="font-bold text-emerald-600">{calculated.roiMultiple}x</span>
              ，系统年费以实际规模单独报价
            </p>
          </div>

          {/* 展开详细计算 */}
          <div className="mt-5">
            <button
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              onClick={() => setShowDetail((p) => !p)}
            >
              {showDetail ? "收起计算明细" : "查看计算逻辑与假设"}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                showDetail ? "mt-4 max-h-[600px] opacity-100" : "mt-0 max-h-0 opacity-0"
              }`}
            >
              <div className="rounded-xl border border-border bg-secondary/50 p-5 text-xs text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground mb-3">计算假设与逻辑</p>
                <p>· 单季度课次固定 20 节，年度按 3 个季度（36 周）计算</p>
                <p>· 月商机数 = 学生规模 ÷ 10（月均来访/咨询量估算）</p>
                <p>· 当前招生转化率假设 25%，系统介入后提升 15%（相对值）；新生平均留存 3 个季度，按年度收入计算增益</p>
                <p>· 当前续费率假设 60%，系统介入后提升 5 个百分点</p>
                <p>· 假设每位老师带 50 名学生，AI 批改介入后每位老师可多承接 10 名学生</p>
                <p>· 师资扩张容量 = 老师数（{calculated.teacherCount} 人）× 10，仅作参考，不计入 ROI</p>
                <p>· 系统年度成本含平台授权与服务费，按学生规模计算</p>
                <div className="mt-3 pt-3 border-t border-border flex gap-4">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">老师月薪</p>
                    <Input
                      type="number"
                      min={0}
                      value={teacherSalaryStr}
                      onChange={(e) => setTeacherSalaryStr(e.target.value.replace(/[^0-9]/g, ""))}
                      className="h-8 w-32 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">人均月作文数</p>
                    <Input
                      type="number"
                      min={0}
                      value={essaysPerStudentStr}
                      onChange={(e) => setEssaysPerStudentStr(e.target.value.replace(/[^0-9]/g, ""))}
                      className="h-8 w-32 text-xs"
                    />
                  </div>
                </div>
                <p className="pt-2 italic">* 以上均为保守估算，实际效果因机构运营水平存在差异。</p>
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
          {"* 测算结果仅供参考，可预约演示获取针对您机构的精准测算。"}
        </p>
      </div>
    </section>
  )
}
