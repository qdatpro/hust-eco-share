import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ComboSection } from "@/components/combo-section"
import { PremiumSection } from "@/components/premium-section"
import { BarterSection } from "@/components/barter-section"
import { BlindBoxSection } from "@/components/blind-box-section"
import { Footer } from "@/components/footer"

export default function HUSTEcoSharePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ComboSection />
        <PremiumSection />
        <BarterSection />
        <BlindBoxSection />
      </main>
      <Footer />
    </div>
  )
}
