"use client"

import { Search, User, ShoppingCart, LogOut, X, Info, Coins, AlertTriangle, Trash2, CheckCircle2, History, Settings, HelpCircle, LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HUSTCoinIcon } from "@/components/hust-coin-icon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Đổi thành false để xem trạng thái chưa đăng nhập
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  // Lắng nghe tín hiệu thêm đồ vào giỏ
  useEffect(() => {
    const handleAddToCart = (e: Event) => {
      const customEvent = e as CustomEvent;
      setCartItems((prev) => [...prev, customEvent.detail]);
    };
    window.addEventListener('hust-add-to-cart', handleAddToCart);
    return () => window.removeEventListener('hust-add-to-cart', handleAddToCart);
  }, []);

  const removeFromCart = (idToRemove: string) => {
    setCartItems(cartItems.filter(item => item.id !== idToRemove))
  }

  const totalVND = cartItems.reduce((sum, item) => sum + (item.priceVND || 0), 0)
  const totalCoin = cartItems.reduce((sum, item) => sum + (item.priceCoin || 0), 0)

  return (
    /* HEADER: Cố định z-index cao nhất để không bị che */
    <header className="sticky top-0 z-[100] w-full border-b bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground italic">H</span>
          </div>
          <span className="hidden font-bold text-foreground sm:inline-block">HUST Eco-Share</span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Tìm mã học phần..." className="pl-10 bg-secondary/40 border-none" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* NÚT HUST-COIN: Hiện chữ đầy đủ, Icon đứng im */}
          <Button
            variant="outline"
            onClick={() => setIsCoinModalOpen(true)}
            className="hidden lg:flex items-center gap-2 border-accent/40 bg-accent/5 hover:bg-accent/10 transition-colors"
          >
            <HUSTCoinIcon className="w-5 h-5" />
            <span className="font-semibold text-accent-foreground text-sm">500 HUST-coin</span>
          </Button>

          {/* Icon Giỏ hàng */}
          <Button
            variant="ghost"
            size="icon"
            className={`relative ${isCartModalOpen ? "text-primary bg-primary/5" : ""}`}
            onClick={() => setIsCartModalOpen(!isCartModalOpen)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
                {cartItems.length}
              </Badge>
            )}
          </Button>

          {/* MENU CÁ NHÂN - ĐÃ ĐƯỢC CẬP NHẬT THEO YÊU CẦU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-secondary/50">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              {isLoggedIn ? (
                <>
                  <DropdownMenuLabel className="flex flex-col mb-1">
                    <span className="text-sm font-bold text-foreground">Nguyễn Đạt</span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase">Sinh viên Viện Hóa học</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer">
                    <User className="h-4 w-4 text-muted-foreground" /> Tài khoản
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer">
                    <History className="h-4 w-4 text-muted-foreground" /> Lịch sử giao dịch
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer">
                    <Settings className="h-4 w-4 text-muted-foreground" /> Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" /> Trợ giúp
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" /> Đăng xuất
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem className="flex items-center gap-2 py-3 cursor-pointer font-bold text-primary">
                  <LogIn className="h-4 w-4" /> Đăng nhập / Đăng ký
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>

      {/* --- SIDEBAR GIỎ HÀNG (GIỮ NGUYÊN CODE CỦA CẬU) --- */}
      {isCartModalOpen && (
        <>
          {/* Lớp nền trong suốt để bấm ra ngoài là đóng */}
          <div className="fixed inset-0 z-[30]" onClick={() => setIsCartModalOpen(false)} />
          
          {/* Sidebar: Bắt đầu từ 64px (dưới header), z-index thấp hơn Header */}
          <div className="fixed top-16 right-0 z-[40] h-[calc(100vh-64px)] w-full max-w-[360px] bg-card shadow-[-5px_5px_15px_rgba(0,0,0,0.05)] flex flex-col animate-in slide-in-from-right duration-200 border-l border-border">
            
            <div className="flex items-center justify-between p-4 border-b shrink-0 bg-secondary/5">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-tight">Giỏ hàng ({cartItems.length})</h3>
              <button onClick={() => setIsCartModalOpen(false)} className="p-1 hover:bg-secondary rounded-md"><X className="h-4 w-4" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50">
                  <ShoppingCart className="h-12 w-12 mb-2 opacity-20" />
                  <p className="text-xs">Chưa có gì trong giỏ hết Đạt ơi!</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-background p-3 rounded-xl border border-border/60 shadow-sm transition-all hover:border-primary/30">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate" title={item.title}>
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        {item.priceVND > 0 && <span className="text-xs font-bold text-primary">{new Intl.NumberFormat("vi-VN").format(item.priceVND)}đ</span>}
                        {item.priceCoin > 0 && (
                          <span className="flex items-center gap-1 text-xs font-bold text-accent-foreground">
                            <HUSTCoinIcon className="w-3.5 h-3.5"/> {item.priceCoin}
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg shrink-0 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t bg-card shrink-0 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tổng tiền mặt:</span>
                    <span className="font-bold">{new Intl.NumberFormat("vi-VN").format(totalVND)}đ</span>
                  </div>
                  {totalCoin > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tổng HUST-coin:</span>
                      <span className="font-bold text-accent-foreground flex items-center gap-1"><HUSTCoinIcon className="w-4 h-4"/>{totalCoin}</span>
                    </div>
                  )}
                </div>
                <Button className="w-full h-11 font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md transition-transform active:scale-95">
                  Thanh toán ngay
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* MODAL HUST-COIN (GIỮ NGUYÊN CODE CỦA CẬU) */}
      {isCoinModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl border border-border animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <div className="flex items-center gap-2 text-accent-foreground">
                <Coins className="h-6 w-6" />
                <h3 className="text-xl font-bold">Ví HUST-coin</h3>
              </div>
              <button onClick={() => setIsCoinModalOpen(false)} className="rounded-full p-1 hover:bg-secondary"><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-accent/10 rounded-xl p-5 text-center border border-accent/20 shadow-inner">
                <p className="text-xs text-muted-foreground mb-1 font-bold uppercase tracking-widest">Số dư khả dụng</p>
                <div className="flex items-center justify-center gap-2">
                  <HUSTCoinIcon className="w-8 h-8" />
                  <span className="text-4xl font-black text-accent-foreground tracking-tighter">500</span>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <h4 className="font-bold flex items-center gap-2 text-xs text-amber-600 uppercase tracking-wider">
                  <AlertTriangle className="h-4 w-4" /> Lưu ý quan trọng
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Coin này chỉ dùng để đổi các <b>Tài liệu dạng file PDF/Word/Slide/Code</b>. 
                </p>
                <div className="h-px bg-amber-500/20 w-full" />
                <p className="text-[11px] font-bold text-amber-700/80 italic">
                  ⚠️ Không đổi được: Sách giấy, Áo blouse hay Linh kiện vật lý.
                </p>
              </div>
              <Button onClick={() => setIsCoinModalOpen(false)} className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg">Đã hiểu</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}