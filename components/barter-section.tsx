"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, CircuitBoard, Glasses, Ruler, Layers, FileText, Shirt, PenTool, Calculator, Wrench, Beaker, Cpu, FileCode, ShoppingCart } from "lucide-react"
import { HUSTCoinIcon } from "@/components/hust-coin-icon"

const barterItems = [
  {
    id: 1,
    title: "File PDF Giáo trình Hóa Đại Cương",
    description: "Bản đẹp, full note highlight các chương khó",
    icon: FileText,
    priceVND: 45000,
    priceCoin: 45,
    category: "Tài liệu",
    isDigital: true,
  },
  {
    id: 2,
    title: "Tài liệu Đề cương MI1110 (Bản mềm)",
    description: "File tổng hợp các dạng bài thi 3 năm gần đây",
    icon: FileText,
    priceVND: 25000,
    priceCoin: 25,
    category: "Tài liệu",
    isDigital: true, 
  },
  {
    id: 3,
    title: "Bộ đề gia sư Hóa 11 (File Word)",
    description: "Đầy đủ ma trận đề, trắc nghiệm và tự luận phân loại cao",
    icon: FileText,
    priceVND: 50000,
    priceCoin: 50,
    category: "Tài liệu",
    isDigital: true, 
  },
  {
    id: 4,
    title: "Slide bài giảng Kỹ thuật Lập trình",
    description: "Bộ slide kèm code C/C++ mẫu của thầy cô",
    icon: FileCode,
    priceVND: 30000,
    priceCoin: 30,
    category: "Tài liệu",
    isDigital: true, 
  },
  {
    id: 5,
    title: "Mindmap Vật lý 1 (Bản chất lượng cao)",
    description: "Sơ đồ tư duy full công thức, dễ nhớ để mang đi thi",
    icon: FileText,
    priceVND: 15000,
    priceCoin: 15,
    category: "Tài liệu",
    isDigital: true, 
  },
  {
    id: 6,
    title: "Báo cáo Thực hành Quá trình Thiết bị",
    description: "File Word mẫu báo cáo điểm A, số liệu chuẩn",
    icon: FileText,
    priceVND: 60000,
    priceCoin: 60,
    category: "Tài liệu",
    isDigital: true, 
  },
  {
    id: 7,
    title: "Kính bảo hộ đi Lab",
    description: "Dùng 1 kỳ, mắt kính sáng không trầy xước",
    icon: Glasses,
    priceVND: 35000,
    category: "Dụng cụ",
    isDigital: false,
  },
  {
    id: 8,
    title: "Thước kẻ T kỹ thuật 60cm",
    description: "Hàng xịn cho sinh viên vẽ kỹ thuật",
    icon: Ruler,
    priceVND: 45000,
    category: "Dụng cụ",
    isDigital: false,
  },
  {
    id: 9,
    title: "Áo blouse trắng thực hành Hóa",
    description: "Size L, vải kaki dày dặn, giặt ủi sạch sẽ",
    icon: Shirt,
    priceVND: 70000,
    category: "Dụng cụ",
    isDigital: false,
  },
  {
    id: 10,
    title: "Máy tính Casio fx-580VN X",
    description: "Hơi tróc sơn phím nhưng bấm vẫn nảy, bao test",
    icon: Calculator,
    priceVND: 350000,
    category: "Dụng cụ",
    isDigital: false,
  },
  {
    id: 11,
    title: "Bộ Compa kỹ thuật Staedtler",
    description: "Còn nguyên hộp nhựa, xoay cực êm",
    icon: PenTool,
    priceVND: 120000,
    category: "Dụng cụ",
    isDigital: false,
  },
  {
    id: 12,
    title: "Mỏ hàn xung 220V/100W",
    description: "Nóng nhanh, phù hợp hàn mạch điện tử",
    icon: Wrench,
    priceVND: 90000,
    category: "Dụng cụ",
    isDigital: false,
  },
  {
    id: 13,
    title: "Cảm biến siêu âm HC-SR04",
    description: "Còn mới 95%, đã test hoạt động tốt",
    icon: CircuitBoard,
    priceVND: 20000,
    category: "Vật liệu",
    isDigital: false, 
  },
  {
    id: 14,
    title: "Phôi mạch đồng FR4 (10x15cm)",
    description: "Chưa bóc nilon, bề mặt sáng bóng",
    icon: Layers,
    priceVND: 15000,
    category: "Vật liệu",
    isDigital: false,
  },
  {
    id: 15,
    title: "Cốc đong thủy tinh 250ml",
    description: "Chịu nhiệt tốt, chia vạch rõ ràng",
    icon: Beaker,
    priceVND: 40000,
    category: "Vật liệu",
    isDigital: false,
  },
  {
    id: 16,
    title: "Động cơ DC giảm tốc 5V",
    description: "Bánh răng nhựa bọc nhôm, chạy êm",
    icon: Cpu,
    priceVND: 25000,
    category: "Vật liệu",
    isDigital: false,
  },
  {
    id: 17,
    title: "Cuộn thiếc hàn 0.8mm",
    description: "Loại có nhựa thông, xài lướt còn khoảng 80%",
    icon: Layers,
    priceVND: 30000,
    category: "Vật liệu",
    isDigital: false,
  },
  {
    id: 18,
    title: "Tệp giấy quỳ tím đo pH",
    description: "Nguyên tệp 80 dải, kèm bảng màu đo chuẩn",
    icon: Beaker,
    priceVND: 10000,
    category: "Vật liệu",
    isDigital: false,
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ"
}

export function BarterSection() {
  const [filter, setFilter] = useState("Tất cả")

  const filteredItems = filter === "Tất cả" 
    ? barterItems 
    : barterItems.filter(item => item.category === filter)

  const categories = ["Tất cả", "Tài liệu", "Dụng cụ", "Vật liệu"]

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            🔄 Góc Trao Đổi Linh Hoạt
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-6 transition-all duration-300 ${
                  filter === cat 
                    ? "bg-primary text-white shadow-md scale-105" 
                    : "hover:bg-primary/10 border-primary/20 text-muted-foreground"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const Icon = item.icon
            return (
              <Card
               key={item.id}
                className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-in fade-in zoom-in-95 duration-500"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-none">
                      {item.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pb-3">
                  <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-foreground">
                      💰 {formatPrice(item.priceVND)}
                    </span>
                    {item.isDigital && item.priceCoin && (
                      <div className="flex items-center gap-1 opacity-80">
                        <HUSTCoinIcon className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold text-accent-foreground">
                          {item.priceCoin} xu
                        </span>
                      </div>
                    )}
                  </div>

                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="gap-1.5 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.dispatchEvent(new CustomEvent('hust-add-to-cart', {
                        detail: {
                          id: `item-${item.id}-${Date.now()}`,
                          title: item.title,
                          priceVND: item.priceVND,
                          priceCoin: item.isDigital ? item.priceCoin : 0,
                        }
                      }));
                      const target = e.currentTarget;
                      const originalHTML = target.innerHTML;
                      target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><polyline points="20 6 9 17 4 12"></polyline></svg> Đã thêm';
                      target.classList.add('bg-primary', 'text-white');
                      setTimeout(() => {
                        target.innerHTML = originalHTML;
                        target.classList.remove('bg-primary', 'text-white');
                      }, 1000);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Thêm vào giỏ
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-secondary/10 rounded-2xl border-2 border-dashed">
            <p className="text-muted-foreground italic">Chưa có món đồ nào trong danh mục này!</p>
          </div>
        )}
      </div>
    </section>
  )
}