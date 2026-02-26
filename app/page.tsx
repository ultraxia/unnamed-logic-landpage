import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PainPoints } from "@/components/pain-points"
import { SolutionFlow } from "@/components/solution-flow"
import { CustomerVoice } from "@/components/customer-voice"
import { ValuePropositions } from "@/components/value-propositions"
import { DataAssetSection } from "@/components/data-asset-section"
import { FounderSection } from "@/components/founder-section"
import { FaqSection } from "@/components/faq-section"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* 1. Hero - 直接商业利益 + AI 批改报告动效 */}
      <HeroSection />

      {/* 2. 痛点区 - 规模增长下的结构性问题 */}
      <PainPoints />

      {/* 3. 解决方案流程 - 四步闭环替代旧流程 */}
      <SolutionFlow />

      {/* 4. 用户之声 - 并发效率与成本改善 */}
      <CustomerVoice />

      {/* 5. 核心能力 - 技术转化为商业结果 */}
      <ValuePropositions />

      {/* 6. 数据资产 - 企业后台风格 mockup */}
      <DataAssetSection />

      {/* 7. 架构师背书 - 降调信任区 */}
      <FounderSection />

      {/* 8. FAQ */}
      <FaqSection />

      {/* 9. 强稀缺 CTA */}
      <FinalCta />

      <Footer />
    </main>
  )
}
