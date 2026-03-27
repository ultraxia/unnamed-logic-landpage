"use client"

import { useMemo, useRef, useState } from "react"
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

type ScenarioKey = "conservative" | "neutral" | "aggressive"

type ScenarioPreset = {
  label: string
  description: string
  leadRatePct: string
  conversionRatePct: string
  conversionLiftPct: string
  renewalRatePct: string
  renewalLiftPct: string
  classesPerQuarter: string
  systemCostPerStudent: string
  minBillableStudents: string
}

const scenarioPresets: Record<ScenarioKey, ScenarioPreset> = {
  conservative: {
    label: "保守",
    description: "低增幅+高成本",
    leadRatePct: "8",
    conversionRatePct: "22",
    conversionLiftPct: "8",
    renewalRatePct: "58",
    renewalLiftPct: "3",
    classesPerQuarter: "18",
    systemCostPerStudent: "18",
    minBillableStudents: "300",
  },
  neutral: {
    label: "中性",
    description: "默认推荐",
    leadRatePct: "10",
    conversionRatePct: "25",
    conversionLiftPct: "15",
    renewalRatePct: "60",
    renewalLiftPct: "5",
    classesPerQuarter: "20",
    systemCostPerStudent: "15",
    minBillableStudents: "300",
  },
  aggressive: {
    label: "激进",
    description: "高增幅+规模效应",
    leadRatePct: "12",
    conversionRatePct: "28",
    conversionLiftPct: "22",
    renewalRatePct: "65",
    renewalLiftPct: "8",
    classesPerQuarter: "22",
    systemCostPerStudent: "13",
    minBillableStudents: "500",
  },
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const sanitizeInteger = (value: string) => value.replace(/[^0-9]/g, "")

const sanitizeDecimal = (value: string) =>
  value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1")

const toNumber = (value: string) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function RoiSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  const [scenario, setScenario] = useState<ScenarioKey>("neutral")

  // 用户填写：两个核心业务变量
  const [studentCountStr, setStudentCountStr] = useState("1500")
  const [pricePerClassStr, setPricePerClassStr] = useState("150")

  // 核心可编辑假设
  const [leadRatePctStr, setLeadRatePctStr] = useState(scenarioPresets.neutral.leadRatePct)
  const [conversionRatePctStr, setConversionRatePctStr] = useState(scenarioPresets.neutral.conversionRatePct)
  const [conversionLiftPctStr, setConversionLiftPctStr] = useState(scenarioPresets.neutral.conversionLiftPct)
  const [renewalRatePctStr, setRenewalRatePctStr] = useState(scenarioPresets.neutral.renewalRatePct)
  const [renewalLiftPctStr, setRenewalLiftPctStr] = useState(scenarioPresets.neutral.renewalLiftPct)
  const [classesPerQuarterStr, setClassesPerQuarterStr] = useState(scenarioPresets.neutral.classesPerQuarter)
  const [systemCostPerStudentStr, setSystemCostPerStudentStr] = useState(scenarioPresets.neutral.systemCostPerStudent)
  const [minBillableStudentsStr, setMinBillableStudentsStr] = useState(scenarioPresets.neutral.minBillableStudents)

  // 产能/人工明细（进阶）
  const [teacherStudentRatioStr, setTeacherStudentRatioStr] = useState("50")
  const [extraCapacityPerTeacherStr, setExtraCapacityPerTeacherStr] = useState("10")
  const [teacherSalaryStr, setTeacherSalaryStr] = useState("8000")
  const [essaysPerStudentStr, setEssaysPerStudentStr] = useState("4")

  const [showDetail, setShowDetail] = useState(false)

  const applyScenario = (nextScenario: ScenarioKey) => {
    const preset = scenarioPresets[nextScenario]
    setScenario(nextScenario)
    setLeadRatePctStr(preset.leadRatePct)
    setConversionRatePctStr(preset.conversionRatePct)
    setConversionLiftPctStr(preset.conversionLiftPct)
    setRenewalRatePctStr(preset.renewalRatePct)
    setRenewalLiftPctStr(preset.renewalLiftPct)
    setClassesPerQuarterStr(preset.classesPerQuarter)
    setSystemCostPerStudentStr(preset.systemCostPerStudent)
    setMinBillableStudentsStr(preset.minBillableStudents)
  }

  const studentCount = Math.max(toNumber(studentCountStr), 0)
  const pricePerClass = Math.max(toNumber(pricePerClassStr), 0)

  const leadRate = Math.max(toNumber(leadRatePctStr), 0) / 100
  const conversionRate = clamp(toNumber(conversionRatePctStr) / 100, 0, 1)
  const conversionLift = Math.max(toNumber(conversionLiftPctStr), 0) / 100
  const renewalRate = clamp(toNumber(renewalRatePctStr) / 100, 0, 1)
  const renewalLift = Math.max(toNumber(renewalLiftPctStr), 0) / 100

  const classesPerQuarter = Math.max(toNumber(classesPerQuarterStr), 0)
  const systemCostPerStudent = Math.max(toNumber(systemCostPerStudentStr), 0)
  const minBillableStudents = Math.max(toNumber(minBillableStudentsStr), 0)

  const teacherStudentRatio = Math.max(toNumber(teacherStudentRatioStr), 1)
  const extraCapacityPerTeacher = Math.max(toNumber(extraCapacityPerTeacherStr), 0)
  const teacherSalary = Math.max(toNumber(teacherSalaryStr), 0)
  const essaysPerStudent = Math.max(toNumber(essaysPerStudentStr), 0)

  // 固定人工成本参数
  const jiangsuEmployerRate = 0.375
  const fixedEssayMinutes = 20
  const fixedMonthlyHours = 176

  const calculated = useMemo(() => {
    const safeStudents = studentCount
    const safePrice = pricePerClass

    // 客单价
    const quarterlyRevenue = classesPerQuarter * safePrice
    const annualRevenuePerStudent = quarterlyRevenue * 3

    // 招生增收（商机漏斗模型）
    const monthlyLeads = safeStudents * leadRate
    const conversionAfterRate = Math.min(conversionRate * (1 + conversionLift), 1)
    const monthlyNewStudents = monthlyLeads * conversionRate
    const monthlyNewAfter = monthlyLeads * conversionAfterRate
    const monthlyExtraStudents = Math.max(monthlyNewAfter - monthlyNewStudents, 0)
    const annualEnrollGain = Math.round(monthlyExtraStudents * 12 * annualRevenuePerStudent)

    // 续费增收（cohort 增量模型）
    const renewalAfterRate = Math.min(renewalRate + renewalLift, 1)
    const renewedBefore = safeStudents * renewalRate
    const renewedAfter = safeStudents * renewalAfterRate
    const extraRenewed = Math.max(renewedAfter - renewedBefore, 0)
    const annualRenewalGain = Math.round(extraRenewed * quarterlyRevenue)

    // 师资扩张容量（不计入 ROI）
    const teacherCount = Math.round(safeStudents / teacherStudentRatio)
    const extraCapacity = Math.round(teacherCount * extraCapacityPerTeacher)

    // 系统成本
    const billableStudents = Math.max(safeStudents, minBillableStudents)
    const systemAnnualCost = Math.round(billableStudents * systemCostPerStudent * 12)

    // 综合 ROI
    const totalAnnualGain = annualEnrollGain + annualRenewalGain
    const roiMultiple = systemAnnualCost > 0
      ? Math.round((totalAnnualGain / systemAnnualCost) * 10) / 10
      : 0

    // 人工批改成本（参考，不计入 ROI）
    const employerCost = teacherSalary * (1 + jiangsuEmployerRate)
    const hourlyCost = employerCost / fixedMonthlyHours
    const singleEssayCost = hourlyCost * (fixedEssayMinutes / 60)
    const monthlyEssayCount = safeStudents * essaysPerStudent
    const monthlyManualCost = singleEssayCost * monthlyEssayCount
    const annualManualCost = monthlyManualCost * 12

    return {
      monthlyLeads,
      conversionAfterRate,
      monthlyExtraStudents,
      annualEnrollGain,
      renewalAfterRate,
      extraRenewed,
      annualRenewalGain,
      teacherCount,
      extraCapacity,
      billableStudents,
      systemAnnualCost,
      totalAnnualGain,
      roiMultiple,
      quarterlyRevenue,
      annualRevenuePerStudent,
      monthlyManualCost,
      annualManualCost,
      employerCost,
      hourlyCost,
      singleEssayCost,
      monthlyEssayCount,
    }
  }, [
    studentCount,
    pricePerClass,
    classesPerQuarter,
    leadRate,
    conversionRate,
    conversionLift,
    renewalRate,
    renewalLift,
    teacherStudentRatio,
    extraCapacityPerTeacher,
    minBillableStudents,
    systemCostPerStudent,
    teacherSalary,
    essaysPerStudent,
  ])

  const fmt = (n: number) => Math.round(n).toLocaleString("zh-CN")
  const fmtNum = (n: number, digits = 1) =>
    n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: digits })
  const fmtPct = (n: number, digits = 1) => `${(n * 100).toFixed(digits).replace(/\.0+$/, "")}%`

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
            {"切换场景、微调参数，查看可解释的一年回报"}
          </p>
        </div>

        <div
          className={`rounded-2xl border border-primary/20 bg-card p-5 transition-all duration-700 sm:p-8 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* 三档场景 */}
          <div className="mb-8">
            <p className="text-sm font-medium text-foreground">测算场景</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {(Object.entries(scenarioPresets) as [ScenarioKey, ScenarioPreset][]).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => applyScenario(key)}
                  aria-pressed={scenario === key}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                    scenario === key
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground">{preset.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{preset.description}</p>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">点击场景会重置关键假设，之后可继续手动微调。</p>
          </div>

          {/* 两个核心输入 */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <p className="text-sm font-medium text-foreground">在读学生数（人）</p>
              <Input
                type="text"
                inputMode="numeric"
                value={studentCountStr}
                onChange={(e) => setStudentCountStr(sanitizeInteger(e.target.value))}
                className="h-12 text-lg"
              />
            </label>
            <label className="space-y-2">
              <p className="text-sm font-medium text-foreground">单课时价格（元）</p>
              <Input
                type="text"
                inputMode="numeric"
                value={pricePerClassStr}
                onChange={(e) => setPricePerClassStr(sanitizeInteger(e.target.value))}
                className="h-12 text-lg"
              />
              <p className="text-xs text-muted-foreground">
                单季度 {fmt(calculated.quarterlyRevenue)} 元/生，约 {fmt(calculated.annualRevenuePerStudent)} 元/生/年
              </p>
            </label>
          </div>

          {/* 关键可编辑假设 */}
          <div className="mb-8 rounded-xl border border-border bg-secondary/40 p-4 sm:p-5">
            <p className="mb-3 text-sm font-medium text-foreground">关键假设（可编辑）</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="space-y-1">
                <p className="text-xs text-muted-foreground">月商机系数（%）</p>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={leadRatePctStr}
                  onChange={(e) => setLeadRatePctStr(sanitizeDecimal(e.target.value))}
                  className="h-9 text-sm"
                />
              </label>
              <label className="space-y-1">
                <p className="text-xs text-muted-foreground">当前招生转化率（%）</p>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={conversionRatePctStr}
                  onChange={(e) => setConversionRatePctStr(sanitizeDecimal(e.target.value))}
                  className="h-9 text-sm"
                />
              </label>
              <label className="space-y-1">
                <p className="text-xs text-muted-foreground">转化率相对提升（%）</p>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={conversionLiftPctStr}
                  onChange={(e) => setConversionLiftPctStr(sanitizeDecimal(e.target.value))}
                  className="h-9 text-sm"
                />
              </label>
              <label className="space-y-1">
                <p className="text-xs text-muted-foreground">当前续费率（%）</p>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={renewalRatePctStr}
                  onChange={(e) => setRenewalRatePctStr(sanitizeDecimal(e.target.value))}
                  className="h-9 text-sm"
                />
              </label>
              <label className="space-y-1">
                <p className="text-xs text-muted-foreground">续费率提升（百分点）</p>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={renewalLiftPctStr}
                  onChange={(e) => setRenewalLiftPctStr(sanitizeDecimal(e.target.value))}
                  className="h-9 text-sm"
                />
              </label>
              <label className="space-y-1">
                <p className="text-xs text-muted-foreground">单季度课次（节）</p>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={classesPerQuarterStr}
                  onChange={(e) => setClassesPerQuarterStr(sanitizeInteger(e.target.value))}
                  className="h-9 text-sm"
                />
              </label>
              <label className="space-y-1">
                <p className="text-xs text-muted-foreground">系统单价（元/生/月）</p>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={systemCostPerStudentStr}
                  onChange={(e) => setSystemCostPerStudentStr(sanitizeDecimal(e.target.value))}
                  className="h-9 text-sm"
                />
              </label>
              <label className="space-y-1">
                <p className="text-xs text-muted-foreground">最低计费学生数（人）</p>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={minBillableStudentsStr}
                  onChange={(e) => setMinBillableStudentsStr(sanitizeInteger(e.target.value))}
                  className="h-9 text-sm"
                />
              </label>
            </div>
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
                月商机约 {fmtNum(calculated.monthlyLeads, 1)}，转化率 {fmtPct(conversionRate, 0)} → {fmtPct(calculated.conversionAfterRate, 1)}
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
                续费率 {fmtPct(renewalRate, 0)} → {fmtPct(calculated.renewalAfterRate, 0)}，每季度多留约 {fmtNum(calculated.extraRenewed, 0)} 人
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
                现有 {fmt(calculated.teacherCount)} 位老师，在不扩编前提下可多承接约 {fmt(calculated.extraCapacity)} 名学生
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
              投资回报约 <span className="font-bold text-emerald-600">{calculated.roiMultiple}x</span>
              ，系统年费按 {fmt(calculated.billableStudents)} 人 × ¥{fmt(systemCostPerStudent)} /生/月测算
            </p>
          </div>

          {/* 公式来源说明 */}
          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-5 text-xs text-muted-foreground">
            <p className="mb-2 font-semibold text-foreground">公式来源说明</p>
            <p>· 招生增收模型：销售漏斗公式（商机量 × 转化率 × 客单价），商机系数和转化提升均可编辑。</p>
            <p className="mt-1">· 续费增收模型：续费 cohort 公式（在读生 × 续费提升百分点 × 单季度客单价）。</p>
            <p className="mt-1">· ROI 模型： (招生增收 + 续费增收) ÷ 系统年费，系统年费 = 计费学生数 × 单价 × 12。</p>
            <button
              type="button"
              className="mt-3 underline underline-offset-4 transition-colors hover:text-foreground"
              onClick={() => setShowDetail((prev) => !prev)}
            >
              {showDetail ? "收起完整公式与代入值" : "查看完整公式与代入值"}
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              showDetail ? "mt-4 max-h-[900px] opacity-100" : "mt-0 max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-xl border border-border bg-secondary/50 p-5 text-xs text-muted-foreground">
              <p className="mb-3 font-semibold text-foreground">完整公式与当前代入值</p>
              <p>
                · 月商机数 = 在读学生数 × 商机系数 = {fmt(studentCount)} × {fmtNum(leadRate * 100, 2)}% = {fmtNum(calculated.monthlyLeads, 1)}
              </p>
              <p className="mt-1">
                · 招生增收 = 月增量新生 × 12 × 年度客单价 = {fmtNum(calculated.monthlyExtraStudents, 1)} × 12 × ¥{fmt(calculated.annualRevenuePerStudent)}
              </p>
              <p className="mt-1">
                · 续费增收 = 在读学生数 × 续费提升百分点 × 单季度客单价 = {fmt(studentCount)} × {fmtNum((calculated.renewalAfterRate - renewalRate) * 100, 2)}% × ¥{fmt(calculated.quarterlyRevenue)}
              </p>
              <p className="mt-1">
                · 系统年费 = max(在读学生数, 最低计费学生数) × 单价 × 12 = {fmt(calculated.billableStudents)} × ¥{fmt(systemCostPerStudent)} × 12
              </p>
              <p className="mt-1">
                · ROI 倍数 = (¥{fmt(calculated.annualEnrollGain)} + ¥{fmt(calculated.annualRenewalGain)}) ÷ ¥{fmt(calculated.systemAnnualCost)} = {calculated.roiMultiple}x
              </p>

              <div className="my-3 border-t border-border" />

              <p className="mb-2 font-semibold text-foreground">进阶参数（产能与人工成本）</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className="space-y-1">
                  <p>师生配比（人/老师）</p>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={teacherStudentRatioStr}
                    onChange={(e) => setTeacherStudentRatioStr(sanitizeInteger(e.target.value))}
                    className="h-8 text-xs"
                  />
                </label>
                <label className="space-y-1">
                  <p>每位老师新增容量（人）</p>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={extraCapacityPerTeacherStr}
                    onChange={(e) => setExtraCapacityPerTeacherStr(sanitizeInteger(e.target.value))}
                    className="h-8 text-xs"
                  />
                </label>
                <label className="space-y-1">
                  <p>老师月薪（元）</p>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={teacherSalaryStr}
                    onChange={(e) => setTeacherSalaryStr(sanitizeInteger(e.target.value))}
                    className="h-8 text-xs"
                  />
                </label>
                <label className="space-y-1">
                  <p>人均月作文数</p>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={essaysPerStudentStr}
                    onChange={(e) => setEssaysPerStudentStr(sanitizeInteger(e.target.value))}
                    className="h-8 text-xs"
                  />
                </label>
              </div>
              <p className="mt-3">
                · 人工批改月成本（参考）= ¥{fmt(calculated.monthlyManualCost)}，年成本约 ¥{fmt(calculated.annualManualCost)}（当前未计入 ROI 倍数）
              </p>
              <p className="mt-1">
                · 成本明细：老师全口径成本 ¥{fmt(calculated.employerCost)}/月，时薪约 ¥{fmtNum(calculated.hourlyCost, 1)}，单篇批改约 ¥{fmtNum(calculated.singleEssayCost, 1)}，月批改量 {fmt(calculated.monthlyEssayCount)} 篇
              </p>
              <p className="mt-2 italic">* 测算用于投资决策预估，建议结合你机构真实历史数据做二次校准。</p>
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
          {"* 测算结果用于决策参考，可预约演示获取基于历史经营数据的精准测算。"}
        </p>
      </div>
    </section>
  )
}
