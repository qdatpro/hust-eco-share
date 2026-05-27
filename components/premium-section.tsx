"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Star, ShoppingCart } from "lucide-react"

const premiumItems = [
  {
    id: 1,
    title: "Vở ghi chép Vật lý 1 (K67 A+)",
    description: "Note chi tiết, highlight công thức quan trọng",
    badge: "Verified A+",
    badgeColor: "bg-accent text-accent-foreground",
    price: 85000,
    seller: {
      name: "Hoàng Anh",
      avatar: "HA",
    },
    hasNotes: true,
  },
  {
    id: 2,
    title: "Giáo trình Triết học Mác-Lênin",
    description: "Highlight sẵn câu hỏi thi, note bên lề",
    badge: "Có note của Pháp sư",
    badgeColor: "bg-primary text-primary-foreground",
    price: 65000,
    seller: {
      name: "Minh Tuấn",
      avatar: "MT",
    },
    hasNotes: true,
  },
  {
    id: 3,
    title: "Sách Giải tích 2 + Bài tập",
    description: "Full lời giải chi tiết, đánh dấu dạng hay thi",
    badge: "Verified A+",
    badgeColor: "bg-accent text-accent-foreground",
    price: 120000,
    seller: {
      name: "Thu Hà",
      avatar: "TH",
    },
    hasNotes: true,
  },
  {
    id: 4,
    title: "Slide + Note CTDLGT",
    description: "Tổng hợp slide bài giảng + note cá nhân K66",
    badge: "Top Seller",
    badgeColor: "bg-emerald-500 text-white",
    price: 50000,
    seller: {
      name: "Đức Anh",
      avatar: "DA",
    },
    hasNotes: false,
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ"
}

export function PremiumSection() {
  return (
    <section className="bg-gradient-to-b from-accent/5 to-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Bảo Vật Học Thuật - Chuyển Giao Bí Kíp
            </h2>
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <p className="text-muted-foreground">
            Tài liệu đã được kiểm chứng chất lượng từ các sinh viên đạt điểm cao
          </p>
        </div>

        {/* Premium Items Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {premiumItems.map((item) => (
            <Card
              key={item.id}
              className="group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-border/50 hover:border-primary/30"
            >
              {/* Premium Badge */}
              <div className="absolute right-3 top-3 z-10">
                <Badge className={`gap-1 ${item.badgeColor} shadow-sm`}>
                  {item.badge === "Verified A+" && <Star className="h-3 w-3" />}
                  {item.badge === "Có note của Pháp sư" && <Sparkles className="h-3 w-3" />}
                  {item.badge}
                </Badge>
              </div>

              <CardHeader className="pb-2 pt-10">
                <h3 className="font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </CardHeader>

              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4 bg-secondary/5">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border border-primary/20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">
                      {item.seller.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium text-muted-foreground">
                    bởi {item.seller.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">
                    {formatPrice(item.price)}
                  </span>
                  
                  {/* --- NÚT THÊM VÀO GIỎ HÀNG ĐÃ ĐƯỢC NÂNG CẤP --- */}
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8 text-primary border-primary/30 hover:bg-primary hover:text-white transition-all overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation(); // Không cho nổi event ra ngoài thẻ Card
                      
                      // Bắn tín hiệu chui lên Giỏ hàng ở Header
                      window.dispatchEvent(new CustomEvent('hust-add-to-cart', {
                        detail: {
                          id: `premium-${item.id}-${Date.now()}`,
                          title: item.title,
                          priceVND: item.price,
                          priceCoin: 0, // Đồ Premium bán bằng tiền mặt
                        }
                      }));

                      // Bùa chú đổi nút thành dấu Tick xanh trong 1 giây
                      const target = e.currentTarget;
                      const originalHTML = target.innerHTML;
                      target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                      target.classList.add('bg-emerald-500', 'text-white', 'border-emerald-500');
                      
                      setTimeout(() => {
                        target.innerHTML = originalHTML;
                        target.classList.remove('bg-emerald-500', 'text-white', 'border-emerald-500');
                      }, 1000);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}