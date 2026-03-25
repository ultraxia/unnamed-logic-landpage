"use client"

import { useRef } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const faqs = [
  {
    question: "系统适合多大规模的机构？",
    answer:
      "100 到 2000 名学生规模的机构均适用。系统按学生规模灵活计费，小机构起步成本低，规模增长后系统能力同步跟上，无需迁移。",
  },
  {
    question: "财务数据安全吗？",
    answer:
      "支持私有化部署，学员数据和财务数据完全存储在机构自己的服务器上，不经过任何第三方公有云。对数据安全有高要求的机构可选择此方案。",
  },
  {
    question: "老师和咨询师需要培训多久才能上手？",
    answer:
      "我们提供一对一上线指导，系统设计以「今日待办」为核心，角色专属工作台开箱即用。大多数老师和咨询师当天即可独立操作，无需系统培训。",
  },
  {
    question: "AI 批改质量如何保证？",
    answer:
      "AI 根据您机构的教研标准进行建模，是在执行您自己的批改逻辑，而非使用通用模板。输出质量由您的标准决定，支持持续调整优化。",
  },
  {
    question: "能替代现有的微信群通知和 Excel 对账流程吗？",
    answer:
      "可以。报名收款、退费审批、课销记录全部线上化，取代微信截图和 Excel 表格。财务报表支持一键导出，格式与现有表格对齐，迁移成本极低。",
  },
  {
    question: "为什么限制试用机构数量？",
    answer:
      "我们不做批量交付。每个合作机构都需要针对自身教研标准做 AI 建模，并配专人完成上线和培训。名额有限是为了保证每家机构都能得到应有的支持质量，而不是买了系统没人管。",
  },
]

export function FaqSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="faq" ref={sectionRef} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {"常见问题"}
          </h2>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
