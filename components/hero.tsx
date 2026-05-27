"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Package, X, CheckCircle2, ImagePlus, MapPin, ZoomIn, ZoomOut, Compass } from "lucide-react"

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [showMap, setShowMap] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")

  const locations = [
    { id: 'parabol', name: 'Cổng Parabol (Cổng 1)', x: '5%', y: '50%' },
    { id: 'tqb', name: 'Thư viện Tạ Quang Bửu', x: '55%', y: '50%' },
    { id: 'ktx', name: 'Cổng KTX (Trần Đại Nghĩa)', x: '88%', y: '85%' },
    { id: 'd4', name: 'Sảnh tòa nhà D4', x: '25%', y: '65%' },
    { id: 'ho-tien', name: 'Ghế đá Hồ Tiền', x: '45%', y: '30%' }
  ]

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
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" onClick={() => setShowMap(false)} className="-ml-2">
                        ← Trở lại Form
                      </Button>
                      <h3 className="font-bold text-sm">📍 Bản đồ HUST</h3>
                    </div>
                    
                    <div className="relative aspect-square w-full rounded-xl bg-[#f1f5f9] border border-border overflow-hidden">
                      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                        <rect x="0" y="0" width="30" height="400" fill="#cbd5e1" />
                        <rect x="0" y="0" width="400" height="30" fill="#cbd5e1" />
                        <rect x="370" y="0" width="30" height="400" fill="#cbd5e1" />
                        <rect x="0" y="370" width="400" height="30" fill="#cbd5e1" />
                        <circle cx="180" cy="120" r="30" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="2" />
                        <path d="M 200 170 h 40 v 60 h -40 z M 180 190 h 80 v 20 h -80 z" fill="#94a3b8" />
                        <path d="M 30 160 Q 70 200 30 240" fill="none" stroke="#ef4444" strokeWidth="8" />
                        <rect x="80" y="150" width="40" height="150" fill="#cbd5e1" rx="4" />
                        <rect x="300" y="300" width="70" height="70" fill="#fde047" opacity="0.6" />
                      </svg>
                      
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => {
                            setSelectedLocation(loc.name);
                            setShowMap(false);
                          }}
                          style={{ left: loc.x, top: loc.y }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-20"
                        >
                          <div className={`flex items-center justify-center h-7 w-7 rounded-full shadow-md ${selectedLocation === loc.name ? 'bg-primary text-white scale-125' : 'bg-white text-primary border border-primary hover:bg-primary/5'}`}>
                            <MapPin className="h-4 w-4" />
                          </div>
                          <span className="absolute top-8 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 shadow-lg pointer-events-none">
                            {loc.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
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