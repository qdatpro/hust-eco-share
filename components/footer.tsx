import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">H</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">HUST Eco-Share</span>
              <p className="text-xs text-muted-foreground">
                Trạm Pass Bách Khoa
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Về chúng tôi
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Chính sách kiểm định
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Hướng dẫn ký gửi
            </a>
          </nav>
        </div>

        <Separator className="my-6" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-2 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 HUST Eco-Share. Dự án Đổi mới sáng tạo.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ by HUST Students
          </p>
        </div>
      </div>
    </footer>
  )
}
