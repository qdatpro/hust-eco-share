"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, BookOpen, FlaskConical, Cpu, Calculator, X, Target, Info, CheckCircle2, AlertCircle } from "lucide-react"

const combos = [
  {
    id: 1,
    title: "Combo Hóa Đại Cương CH3400",
    icon: FlaskConical,
    tags: ["Giáo trình", "Áo Blouse", "Đề cương"],
    originalPrice: 250000,
    discountPrice: 180000,
    color: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    details: {
      items: [
        "Giáo trình Hóa Đại Cương (Bản cứng)",
        "Áo Blouse thực hành đi lab (Size L)",
        "Tập đề cương tự luận + trắc nghiệm cuối kỳ"
      ],
      condition: "Sách mới 90% chỉ highlight vài chỗ quan trọng. Áo blouse giặt tẩy trắng tinh không ố vàng.",
      targetAudience: "Sinh viên năm 1, năm 2 Kỹ thuật Hóa học hoặc Sinh học chuẩn bị đi Lab.",
      notes: "Tặng kèm file PDF báo cáo thực hành full số liệu đẹp (Điểm A)!"
    }
  },
  {
    id: 2,
    title: "Combo Giải Tích 1 MI1140",
    icon: Calculator,
    tags: ["Sách BT", "Vở ghi", "Đề thi mẫu"],
    originalPrice: 200000,
    discountPrice: 150000,
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
    details: {
      items: [
        "Sách bài tập Giải tích 1 (Viện Toán ứng dụng)",
        "Vở ghi chép trên lớp của Pháp sư K67",
        "Bộ đề thi giữa kỳ + cuối kỳ 3 năm gần nhất (Có đáp án)"
      ],
      condition: "Sách bài tập đã làm khoảng 30% bằng bút chì (có thể tẩy). Vở ghi chép chữ siêu đẹp, trình bày rõ ràng.",
      targetAudience: "Tân sinh viên K68, K69 cần tài liệu cày cuốc qua môn hoặc lấy điểm A/B+.",
      notes: "Phần tích phân và chuỗi số có note rất kỹ các lỗi sai hay gặp lúc đi thi."
    }
  },
  {
    id: 3,
    title: "Combo Vật Lý 1 PH1110",
    icon: BookOpen,
    tags: ["Giáo trình", "Note A+", "Flashcard"],
    originalPrice: 180000,
    discountPrice: 130000,
    color: "bg-orange-500/10 text-orange-700 border-orange-200",
    details: {
      items: [
        "Giáo trình Vật Lý Đại Cương Tập 1",
        "Tập Flashcard nhớ nhanh công thức Cơ - Nhiệt",
        "Tóm tắt lý thuyết 2 mặt giấy A4"
      ],
      condition: "Giáo trình gáy hơi sờn do mang lên thư viện nhiều. Flashcard còn bọc nilon nguyên vẹn.",
      targetAudience: "Sinh viên khối kỹ thuật Cơ khí, Điện, Điện tử đang hoang mang với môn Vật Lý.",
      notes: "Chỉ cần học thuộc tập Flashcard là đảm bảo đủ điểm qua môn (C/C+)!"
    }
  },
  {
    id: 4,
    title: "Combo KTLT IT3040",
    icon: Cpu,
    tags: ["Slide", "Code mẫu", "Đề cương"],
    originalPrice: 220000,
    discountPrice: 160000,
    color: "bg-purple-500/10 text-purple-700 border-purple-200",
    details: {
      items: [
        "Tài liệu in Slide bài giảng Kỹ thuật lập trình",
        "USB 8GB chứa Source code mẫu C/C++",
        "Ngân hàng câu hỏi trắc nghiệm lý thuyết"
      ],
      condition: "Tài liệu in trắng đen bản rõ nét. USB format sạch sẽ không virus, cắm là chạy.",
      targetAudience: "Sinh viên IT hoặc ngoại đạo (Cơ điện tử, Tự động hóa) cần cày thuật toán C/C++.",
      notes: "" 
    }
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ"
}

type ComboType = typeof combos[0];

export function ComboSection() {
  const [selectedCombo, setSelectedCombo] = useState<ComboType | null>(null)

  return (
    <section id="combo-section" className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl flex items-center justify-center gap-2">
            🎒 Combo Giải Cứu Theo Mã Học Phần
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tiết kiệm đến 30% khi mua theo combo. Click vào từng gói để xem "vũ khí" bên trong!
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {combos.map((combo) => {
            const Icon = combo.icon
            return (
              <Card
                key={combo.id}
                onClick={() => setSelectedCombo(combo)} 
                className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-border/50 hover:border-primary/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-3 py-1 rounded-bl-lg font-bold text-sm shadow-sm z-10">
                  Sale 30%
                </div>

                <CardHeader className="pb-3 pt-8">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                    {combo.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {combo.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className={combo.color}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex items-end justify-between border-t border-border/50 pt-4 bg-secondary/5">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground line-through mb-0.5">
                      {formatPrice(combo.originalPrice)}
                    </span>
                    <span className="text-xl font-black text-primary">
                      {formatPrice(combo.discountPrice)}
                    </span>
                  </div>
                  <Button size="sm" className="gap-2 rounded-full px-4 group-hover:shadow-md transition-all">
                    Xem chi tiết
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      {selectedCombo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-card shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="bg-primary/5 p-6 border-b border-border relative">
              <button 
                onClick={() => setSelectedCombo(null)}
                className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-black/10 transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
              
              <div className="flex gap-4 items-start pr-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                  <selectedCombo.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground leading-tight mb-1">{selectedCombo.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-primary">{formatPrice(selectedCombo.discountPrice)}</span>
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(selectedCombo.originalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-wide text-foreground">
                  <ShoppingCart className="h-4 w-4 text-primary" /> Gói Combo bao gồm:
                </h4>
                <ul className="space-y-2">
                  {selectedCombo.details.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground bg-secondary/30 p-2.5 rounded-lg border border-border/50">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold flex items-center gap-2 mb-2 text-sm uppercase tracking-wide text-foreground">
                  <Info className="h-4 w-4 text-primary" /> Tình trạng món đồ
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed bg-background p-3 rounded-lg border border-border/50">
                  {selectedCombo.details.condition}
                </p>
              </div>

              <div>
                <h4 className="font-bold flex items-center gap-2 mb-2 text-sm uppercase tracking-wide text-foreground">
                  <Target className="h-4 w-4 text-primary" /> Đối tượng phù hợp
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed bg-background p-3 rounded-lg border border-border/50">
                  {selectedCombo.details.targetAudience}
                </p>
              </div>

              {selectedCombo.details.notes && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-amber-700 mb-0.5">Ghi chú đặc biệt</h5>
                    <p className="text-sm text-amber-600/90 leading-relaxed">
                      {selectedCombo.details.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-secondary/10 flex gap-3">
              <Button variant="outline" className="w-1/3" onClick={() => setSelectedCombo(null)}>
                Đóng
              </Button>
              <Button 
                className="w-2/3 gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('hust-add-to-cart', {
                    detail: {
                      id: `combo-${selectedCombo.id}-${Date.now()}`,
                      title: selectedCombo.title,
                      priceVND: selectedCombo.discountPrice,
                      priceCoin: 0,
                    }
                  }));
                  setSelectedCombo(null);
                }}
              >
                <ShoppingCart className="h-4 w-4" /> Thêm vào giỏ hàng
              </Button>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}