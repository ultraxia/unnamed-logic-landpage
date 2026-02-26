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
    question: "AI 批改能达到名师水平吗？",
    answer:
      "我们不使用通用模型。系统根据您的教研标准进行 Schema 建模，是在“执行”您的批改逻辑，而非“模拟”人类判断。输出质量由您的教研标准决定。",
  },
  {
    question: "系统能支撑大规模统考吗？",
    answer:
      "核心架构基于工业级高并发异步调度集群构建，已在真实场景中支撑 500+ 班级同时提交。系统可用性 99.9%，统考高峰期零延迟。",
  },
  {
    question: "如何帮助提升续费率？",
    answer:
      "系统自动沉淀每位学生的学情画像和进步趋势。续费面谈时，您只需展示一张数据报告，家长即可清晰看到孩子的结构性提升，无需话术说服。",
  },
  {
    question: "接入流程复杂吗？",
    answer:
      "我们提供一对一的教研建模服务。从 Schema 定制到系统部署，全程有专人对接。大多数机构在一周内即可完成接入并投入使用。",
  },
  {
    question: "数据安全如何保障？",
    answer:
      "所有学生数据严格加密存储，符合国家数据安全法规要求。数据所有权归属机构，我们绝不用于任何第三方用途。",
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
