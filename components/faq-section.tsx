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
    answer: "从小型单校区到多校区连锁均适用。按学生规模灵活计费，随时扩容，不需要重新迁移。",
  },
  {
    question: "财务数据安全吗？",
    answer: "支持私有化部署。数据存在你自己的服务器上，不经过任何第三方。",
  },
  {
    question: "老师和咨询师上手难吗？",
    answer: "当天可独立操作。系统以「今日待办」为核心，角色专属工作台，开箱即用，无需额外培训。",
  },
  {
    question: "AI 批改质量如何保证？",
    answer: "AI 执行的是你机构自己的批改标准，不是通用模板。标准由你定，质量由你控，支持随时调整。",
  },
  {
    question: "能替代微信群通知和 Excel 对账吗？",
    answer: "可以。收款、退费、课销全部线上化。报表一键导出，格式与现有表格对齐，迁移成本极低。",
  },
  {
    question: "为什么限制试用名额？",
    answer: "每个机构需要单独建模和专人支持。批量交付意味着没有人真正负责你的上线质量，这不是我们想做的事。",
  },
]

export function FaqSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section id="faq" ref={sectionRef} className="overflow-x-hidden px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="section-label mb-2 text-xs font-semibold uppercase tracking-widest">FAQ</p>
          <h2 className="section-title text-balance text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
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
