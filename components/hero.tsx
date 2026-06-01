"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Package, X, CheckCircle2, ImagePlus, MapPin } from "lucide-react"
import { UniversitySelector } from "@/components/university-selector"
import { DeliveryMap } from "@/components/delivery-map"
import { University } from "@/lib/university-locations"

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [showMap, setShowMap] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState<University>("HUST")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsModalOpen(false)
        setIsSuccess(false)
        setSelectedLocation("")
        setSelectedUniversity("HUST")
      }, 3000)
    }, 1500)
  }

  // HÀM XỬ LÝ TRƯỢT XUỐNG PHẦN COMBO
  const scrollToCombo = () => {
    const comboSection = document.getElementById('combo-section');
    if (comboSection) {
      comboSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/20 px-4 py-2">
          <Sparkles className="h-4 w-4 text-accent-foreground" />
          <span className="text-sm font-medium text-accent-foreground">Mùa thi đang đến - Giải cứu ngay!</span>
        </div>

        <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Giải cứu mùa thi - <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Pass đồ nhận xu</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Nền tảng trao đổi giáo trình, linh kiện và bí kíp sinh tồn nội bộ Bách Khoa.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg transition-all hover:scale-105">
            <Package className="h-5 w-5" /> Ký gửi đồ ngay
          </Button>
          
          {/* NÚT "SĂN COMBO" ĐƯỢC GẮN LỆNH TRƯỢT Ở ĐÂY */}
          <Button 
            size="lg" 
            variant="outline" 
            onClick={scrollToCombo} 
            className="gap-2 border-primary text-primary hover:bg-primary/10 transition-all hover:scale-105"
          >
            <Sparkles className="h-5 w-5" /> Săn combo qua môn
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl border border-border text-left overflow-hidden">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 z-10 p-1 hover:bg-secondary rounded-full transition-colors">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            {!isSuccess ? (
              <>
                {!showMap ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold border-b pb-2">📦 Đăng ký Ký gửi</h3>
                    
                    {/* University Selector */}
                    <UniversitySelector
                      selected={selectedUniversity}
                      onChange={(uni) => {
                        setSelectedUniversity(uni)
                        setSelectedLocation("")
                      }}
                    />
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Tên món đồ</label>
                      <Input required placeholder="VD: Sách Giải tích 1, Arduino..." />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Điểm hẹn giao dịch</label>
                      <div className="flex gap-2">
                        <Input 
                          readOnly 
                          value={selectedLocation || "Chưa chọn điểm"} 
                          className="bg-secondary/30 cursor-default font-medium text-primary text-xs"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowMap(true)}
                          className="gap-2 shrink-0 border-primary text-primary hover:bg-primary/5"
                        >
                          <MapPin className="h-4 w-4" /> Bản đồ
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Ảnh món đồ (Minh chứng)</label>
                      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-secondary/10 py-4 hover:border-primary/50 transition-colors cursor-pointer group">
                        <ImagePlus className="mb-1 h-6 w-6 text-muted-foreground group-hover:text-primary" />
                        <span className="text-xs text-muted-foreground">Click để tải ảnh lên</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Giá mong muốn (VNĐ)</label>
                      <Input required type="number" placeholder="VD: 50000" />
                    </div>

                    <Button type="submit" className="w-full mt-2" disabled={isSubmitting || !selectedLocation}>
                      {isSubmitting ? "Đang đẩy dữ liệu..." : "Xác nhận ký gửi"}
                    </Button>
                  </form>
                ) : (
                  <DeliveryMap
                    university={selectedUniversity}
                    selectedLocation={selectedLocation}
                    onLocationSelect={(locationName) => {
                      setSelectedLocation(locationName)
                      setShowMap(false)
                    }}
                    onBackToForm={() => setShowMap(false)}
                  />
                )}
              </>
            ) : (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold">Thành công!</h3>
                <p className="text-sm text-muted-foreground mt-2 px-4 italic">
                  Đã chốt kèo tại <span className="font-bold text-primary not-italic">{selectedLocation}</span>. <br/>
                  Cậu nhớ check tin nhắn từ Admin nhé!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
