"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Package, X, CheckCircle2, ImagePlus, MapPin } from "lucide-react"

// --- DỮ LIỆU CÁC TRẠM KÝ GỬI CHIA THEO TRƯỜNG ---
const locationData = {
  HUST: [
    { id: "hust-1", name: "Trạm Cổng Parabol", desc: "📍 Số 1 Đại Cồ Việt. Hoạt động 8h-18h." },
    { id: "hust-2", name: "Tủ Locker TQB", desc: "📍 Tầng 1 Thư viện Tạ Quang Bửu (24/7)." },
    { id: "hust-3", name: "Trạm Trần Đại Nghĩa", desc: "📍 Gần ngã tư Đại La. Chuyên sách giáo trình." }
  ],
  NEU: [
    { id: "neu-1", name: "Trạm KTX NEU", desc: "📍 Cổng chính KTX Kinh tế Quốc dân." },
    { id: "neu-2", name: "Tủ Locker A2", desc: "📍 Tầng 1 tòa A2. Gửi đồ nhỏ gọn." }
  ],
  HUCE: [
    { id: "huce-1", name: "Trạm Cổng Xây Dựng", desc: "📍 Số 55 Đường Giải Phóng. Rộng rãi." },
    { id: "huce-2", name: "Trạm KTX HUCE", desc: "📍 Khu KTX. Nhận dụng cụ vẽ, mô hình." }
  ]
};

type UniKey = keyof typeof locationData;

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [userUniversity, setUserUniversity] = useState<UniKey>("HUST")
  const [consignmentLocation, setConsignmentLocation] = useState(locationData["HUST"][0].id)

  useEffect(() => {
    setConsignmentLocation(locationData[userUniversity][0].id);
  }, [userUniversity]);

  const selectedLocInfo = locationData[userUniversity].find(loc => loc.id === consignmentLocation) || locationData[userUniversity][0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsModalOpen(false)
        setIsSuccess(false)
        setUserUniversity("HUST")
      }, 3000)
    }, 1500)
  }

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
          Nền tảng trao đổi giáo trình, linh kiện và bí kíp sinh tồn nội bộ sinh viên.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg transition-all hover:scale-105">
            <Package className="h-5 w-5" /> Ký gửi đồ ngay
          </Button>
          
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
          {/* Đã thêm max-h-[95vh] và overflow-y-auto để chống tràn màn hình */}
          <div className="relative w-full max-w-md rounded-2xl bg-card p-5 shadow-2xl border border-border text-left max-h-[95vh] overflow-y-auto custom-scrollbar">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 z-10 p-1 hover:bg-secondary rounded-full transition-colors">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="text-lg font-bold border-b pb-2">📦 Đăng ký Ký gửi</h3>
                
                {/* 1. Tên món đồ */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tên món đồ</label>
                  <Input required placeholder="VD: Sách Giải tích 1..." className="h-9" />
                </div>

                {/* 2. CHỌN ĐIỂM HẸN (ÉP GỌN LẠI 2 CỘT) */}
                <div className="space-y-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <label className="text-sm font-semibold flex items-center gap-1.5">
                    📍 Chọn điểm Ký gửi
                  </label>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      value={userUniversity}
                      onChange={(e) => setUserUniversity(e.target.value as UniKey)}
                      className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                    >
                      <option value="HUST">Khu vực HUST</option>
                      <option value="NEU">Khu vực NEU</option>
                      <option value="HUCE">Khu vực HUCE</option>
                    </select>

                    <select 
                      value={consignmentLocation}
                      onChange={(e) => setConsignmentLocation(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer font-medium truncate"
                    >
                      {locationData[userUniversity].map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-tight pt-1">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                    <span>{selectedLocInfo.desc}</span>
                  </div>
                </div>

                {/* 3. Ảnh món đồ (Bóp mỏng lại) */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Ảnh minh chứng</label>
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-secondary/10 py-3 hover:border-primary/50 transition-colors cursor-pointer group">
                    <ImagePlus className="mb-1 h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <span className="text-[11px] text-muted-foreground">Click để tải ảnh</span>
                  </div>
                </div>

                {/* 4. Giá mong muốn */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Giá mong muốn (VNĐ)</label>
                  <Input required type="number" placeholder="VD: 50000" className="h-9" />
                </div>

                <Button type="submit" className="w-full h-10 mt-2" disabled={isSubmitting}>
                  {isSubmitting ? "Đang đẩy dữ liệu..." : "Xác nhận ký gửi"}
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-emerald-500 mb-3" />
                <h3 className="text-xl font-bold">Thành công!</h3>
                <p className="text-sm text-muted-foreground mt-2 px-2 italic">
                  Đã chốt kèo tại <span className="font-bold text-primary not-italic">{selectedLocInfo.name}</span>. <br/>
                  Admin sẽ liên hệ cậu sớm nhé!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}