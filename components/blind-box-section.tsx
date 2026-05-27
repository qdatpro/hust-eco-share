"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Sparkles, FlaskConical, Cpu, Cog } from "lucide-react"

const blindBoxes = [
  {
    id: 1,
    title: "Hộp mù Viện Hóa học",
    icon: FlaskConical,
    description: "Chỉ 50k - Cam kết nhận 1 dụng cụ học tập + 1 Flashcard ôn thi ngẫu nhiên + Lời chúc 4.0",
    price: 50000,
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-500/10",
    items: ["Áo blouse", "Kính bảo hộ", "Giáo trình cũ", "Flashcard"],
  },
  {
    id: 2,
    title: "Hộp mù IT",
    icon: Cpu,
    description: "Chỉ 50k - Cam kết nhận 1 dụng cụ học tập + 1 Flashcard ôn thi ngẫu nhiên + Lời chúc 4.0",
    price: 50000,
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-500/10",
    items: ["Linh kiện điện tử", "Sách CNTT", "Sticker code", "Flashcard"],
  },
  {
    id: 3,
    title: "Hộp mù Cơ khí",
    icon: Cog,
    description: "Chỉ 50k - Cam kết nhận 1 dụng cụ học tập + 1 Flashcard ôn thi ngẫu nhiên + Lời chúc 4.0",
    price: 50000,
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-500/10",
    items: ["Thước kỹ thuật", "Compa", "Giáo trình", "Flashcard"],
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ"
}

export function BlindBoxSection() {
  return (
    <section className="bg-gradient-to-b from-primary/5 via-accent/5 to-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Gift className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">Limited Edition</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            🎲 Gacha Nhân Phẩm Mùa Thi
          </h2>
          <p className="text-muted-foreground">
            Thử vận may - Nhận quà xịn với giá hời!
          </p>
        </div>

        {/* Blind Box Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {blindBoxes.map((box) => {
            const Icon = box.icon
            return (
              <Card
                key={box.id}
                className="group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Glowing Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${box.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                <CardHeader className="relative pb-4">
                  {/* Mystery Box Visual */}
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
                    <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl ${box.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-10 w-10 text-primary" />
                      {/* Sparkle Effects */}
                      <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-accent animate-pulse" />
                      <Sparkles className="absolute -bottom-1 -left-1 h-4 w-4 text-accent animate-pulse delay-150" />
                    </div>
                  </div>

                  <h3 className="text-center text-lg font-bold text-foreground">
                    {box.title}
                  </h3>
                </CardHeader>

                <CardContent className="pb-4">
                  <p className="mb-4 text-center text-sm text-muted-foreground">
                    {box.description}
                  </p>

                  {/* Possible Items */}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {box.items.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="text-xs"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 border-t pt-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(box.price)}
                    </span>
                  </div>
                  <Button className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg transition-all group-hover:shadow-xl">
                    <Gift className="h-4 w-4" />
                    Mở hộp ngay
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            ✨ Mỗi hộp đều có cơ hội nhận được <span className="font-semibold text-accent-foreground">item hiếm</span> trị giá gấp 3 lần!
          </p>
        </div>
      </div>
    </section>
  )
}
