'use client'

import React, { useState } from 'react'
import {
  Menu,
  X,
  Bell,
  Search,
  BarChart3,
  ShoppingBag,
  CheckCircle,
  Users,
  Settings,
  ChevronRight,
  Eye,
  Trash2,
  LogOut,
  User,
  LogIn,
  BookOpen,
  FlaskConical,
  Cpu,
  Sparkles,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'

// Mock Data
const revenueData = [
  { ngay: 'T2', doanhthu: 12500000 },
  { ngay: 'T3', doanhthu: 15200000 },
  { ngay: 'T4', doanhthu: 18900000 },
  { ngay: 'T5', doanhthu: 16700000 },
  { ngay: 'T6', doanhthu: 22100000 },
  { ngay: 'T7', doanhthu: 24500000 },
  { ngay: 'CN', doanhthu: 19800000 },
]

const initialOrders = [
  {
    id: 'ĐH001',
    khachHang: 'Lê Hoàng Minh',
    sanPham: 'Giáo trình Giải tích 1 (MI1110)',
    tong: 45000,
    donVi: 'VNĐ',
    trangThai: 'Chờ xác nhận',
    diaDiem: 'Thư viện Tạ Quang Bửu',
  },
  {
    id: 'ĐH002',
    khachHang: 'Phạm Thu Trang',
    sanPham: 'Áo Blouse Lab chất lượng',
    tong: 15,
    donVi: 'HUST-coin',
    trangThai: 'Đang giao',
    diaDiem: 'Sảnh Tòa C1',
  },
  {
    id: 'ĐH003',
    khachHang: 'Bùi Việt Hoàng',
    sanPham: 'Tài liệu Hóa lý (CH3400)',
    tong: 80000,
    donVi: 'VNĐ',
    trangThai: 'Hoàn thành',
    diaDiem: 'Thư viện Tạ Quang Bửu',
  },
  {
    id: 'ĐH004',
    khachHang: 'Đinh Hải Yến',
    sanPham: 'Bộ kit Mạch điện tử (EE2001)',
    tong: 30,
    donVi: 'HUST-coin',
    trangThai: 'Chờ xác nhận',
    diaDiem: 'Khu ký túc xá K',
  },
  {
    id: 'ĐH005',
    khachHang: 'Ngô Thị Kim Anh',
    sanPham: 'Sách Đại số tuyến tính (MI2010)',
    tong: 65000,
    donVi: 'VNĐ',
    trangThai: 'Hoàn thành',
    diaDiem: 'Sảnh Tòa C1',
  },
  {
    id: 'ĐH006',
    khachHang: 'Trần Minh Quân',
    sanPham: 'Laptop ASUS cũ (nhập khẩu)',
    tong: 3500000,
    donVi: 'VNĐ',
    trangThai: 'Chờ xác nhận',
    diaDiem: 'Thư viện Tạ Quang Bửu',
  },
]

const initialApprovalItems = [
  {
    id: 1,
    tenVatPham: 'Tài liệu Xác suất thống kê (MI2020)',
    maHocPhan: 'MI2020',
    nguoiGuiDi: 'Nguyễn Thanh Sơn',
    thoiGianGui: '2 giờ trước',
    tinhTrang: 'Sách còn mới 90%, chưa sử dụng',
    icon: BookOpen,
    iconColor: 'text-red-700',
  },
  {
    id: 2,
    tenVatPham: 'Áo Blouse Lab chất lượng tốt',
    maHocPhan: 'LAB-2024',
    nguoiGuiDi: 'Vũ Thị Hoa',
    thoiGianGui: '4 giờ trước',
    tinhTrang: 'Như mới, chưa mặc lần nào',
    icon: null,
    iconColor: 'text-red-700',
  },
  {
    id: 3,
    tenVatPham: 'Board mạch điện tử FPGA (EE3001)',
    maHocPhan: 'EE3001',
    nguoiGuiDi: 'Hoàng Minh Tuấn',
    thoiGianGui: '1 ngày trước',
    tinhTrang: 'Hoạt động bình thường, test xong',
    icon: Cpu,
    iconColor: 'text-red-700',
  },
]

const users = [
  {
    id: 1,
    mssv: '202301001',
    hoTen: 'Lê Hoàng Minh',
    vienNganh: 'Kỹ thuật Hóa học',
    soDuCoin: 5000,
  },
  {
    id: 2,
    mssv: '202302045',
    hoTen: 'Phạm Thu Trang',
    vienNganh: 'CNTT',
    soDuCoin: 12500,
  },
  {
    id: 3,
    mssv: '202303089',
    hoTen: 'Bùi Việt Hoàng',
    vienNganh: 'Điều khiển tự động',
    soDuCoin: 8750,
  },
  {
    id: 4,
    mssv: '202304123',
    hoTen: 'Đinh Hải Yến',
    vienNganh: 'CNTT',
    soDuCoin: 15200,
  },
  {
    id: 5,
    mssv: '202305167',
    hoTen: 'Ngô Thị Kim Anh',
    vienNganh: 'Xây dựng',
    soDuCoin: 6800,
  },
]

const notifications = [
  { id: 1, text: 'Đơn hàng mới: ĐH006 từ Trần Minh Quân vừa được đặt', time: '10 phút trước' },
  { id: 2, text: 'Sinh viên Lê Hoàng Minh vừa yêu cầu ký gửi Giáo trình Giải tích 1 (MI1110)', time: '30 phút trước' },
  { id: 3, text: 'Đơn hàng ĐH005 đã được giao thành công tới Ngô Thị Kim Anh', time: '2 giờ trước' },
  { id: 4, text: 'Hệ thống: Có 3 sản phẩm đang chờ duyệt', time: '3 giờ trước' },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Chờ xác nhận':
      return <Badge variant="outline">Chờ xác nhận</Badge>
    case 'Đang giao':
      return <Badge variant="secondary">Đang giao</Badge>
    case 'Hoàn thành':
      return <Badge variant="default" className="bg-green-600">Hoàn thành</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

// ProductCard Component for Approvals Tab
interface ProductCardProps {
  item: typeof initialApprovalItems[0]
  onSelect: (item: typeof initialApprovalItems[0]) => void
}

function ProductCard({ item, onSelect }: ProductCardProps) {
  const IconComponent = item.icon
  
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelect(item)}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Custom Product Image Container */}
          <div className="relative w-full aspect-square bg-blue-50 rounded-2xl flex items-center justify-center overflow-hidden">
            {/* Top-right Sparkle */}
            <div className="absolute top-4 right-4">
              <Sparkles size={24} className="text-yellow-400" />
            </div>
            
            {/* Center Icon */}
            {IconComponent ? (
              <IconComponent size={64} className={item.iconColor} strokeWidth={1.5} />
            ) : (
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-400">Áo</p>
              </div>
            )}
            
            {/* Bottom-left Sparkle */}
            <div className="absolute bottom-4 left-4">
              <Sparkles size={20} className="text-yellow-400" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-red-700 transition-colors">
              {item.tenVatPham}
            </h3>
            <p className="text-xs text-gray-500 mt-1 font-mono">
              Mã: {item.maHocPhan}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {item.tinhTrang}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Người gửi: {item.nguoiGuiDi}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {item.thoiGianGui}
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(item)
              }}
            >
              Xem chi tiết
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<typeof initialOrders[0] | null>(null)
  const [selectedApproval, setSelectedApproval] = useState<typeof initialApprovalItems[0] | null>(null)
  const [approvalItems, setApprovalItems] = useState(initialApprovalItems)
  const [orders] = useState(initialOrders)
  const [systemSettings, setSystemSettings] = useState({
    appName: 'HUST Eco-Share',
    appDesc: 'Nền tảng trao đổi nội bộ Bách Khoa',
    maintenanceMode: false,
  })
  const [transactionSettings, setTransactionSettings] = useState({
    exchangeRate: '1000',
    platformFee: '5',
  })
  const [paymentSettings, setPaymentSettings] = useState({
    momo: true,
    zalopay: true,
    transfer: true,
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailOnNewOrder: true,
  })
  const { toast } = useToast()

  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: BarChart3 },
    { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag },
    { id: 'approvals', label: 'Ký duyệt', icon: CheckCircle },
    { id: 'users', label: 'Sinh viên', icon: Users },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ]

  const handleApprove = (itemId: number) => {
    setApprovalItems(approvalItems.filter(item => item.id !== itemId))
    toast({
      title: 'Thành công',
      description: 'Đã duyệt sản phẩm',
    })
    setSelectedApproval(null)
  }

  const handleReject = (itemId: number) => {
    setApprovalItems(approvalItems.filter(item => item.id !== itemId))
    toast({
      title: 'Thành công',
      description: 'Đã từ chối sản phẩm',
      variant: 'destructive',
    })
    setSelectedApproval(null)
  }

  const handleSaveSettings = () => {
    toast({
      title: 'Thành công',
      description: 'Đã lưu các thay đổi cài đặt',
    })
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-lg font-bold text-[#cc0000]">HUST Eco-Share</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {sidebarOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#cc0000] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          {sidebarOpen && (
            <p className="text-xs text-gray-500 text-center">
              v1.0 Admin Panel
            </p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative w-64">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <Bell size={20} className="text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#cc0000] rounded-full"></span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">Thông báo</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                      <p className="text-sm text-gray-900">{notif.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Trần Anh Tuấn</p>
                <p className="text-xs text-gray-500">Quản trị viên</p>
              </div>
              
              {/* Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" />
                      <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <User size={16} />
                    <span>Hồ sơ cá nhân</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Settings size={16} />
                    <span>Cài đặt tài khoản</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {/* Tab 1: Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Tổng quan
                </h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        Tổng doanh thu
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#cc0000]">
                        15.500.000 VNĐ
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        +12% từ tuần trước
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        Đơn hàng mới
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        +42
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Tuần này
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        HUST-coin lưu hành
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">
                        12.500 xu
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Trong hệ thống
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        Sinh viên đăng ký
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        3.420
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Tổng cộng
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Doanh thu 7 ngày gần đây</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ngay" />
                        <YAxis />
                        <Tooltip
                          formatter={(value: any) =>
                            `${(value / 1000000).toFixed(1)}M VNĐ`
                          }
                        />
                        <Legend />
                        <Bar
                          dataKey="doanhthu"
                          fill="#cc0000"
                          name="Doanh thu"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Giao dịch gần đây</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã đơn</TableHead>
                          <TableHead>Khách hàng</TableHead>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead>Tổng tiền</TableHead>
                          <TableHead>Trạng thái</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.slice(0, 5).map((order) => (
                          <TableRow 
                            key={order.id}
                            onClick={() => setSelectedOrder(order)}
                            className="cursor-pointer hover:bg-gray-50"
                          >
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>{order.khachHang}</TableCell>
                            <TableCell>{order.sanPham}</TableCell>
                            <TableCell>
                              {order.tong.toLocaleString('vi-VN')}{' '}
                              {order.donVi}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.trangThai)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tab 2: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Đơn hàng
                </h1>

                <Card>
                  <CardHeader>
                    <CardTitle>Danh sách đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã đơn</TableHead>
                          <TableHead>Khách hàng</TableHead>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead>Tổng tiền</TableHead>
                          <TableHead>Trạng thái</TableHead>
                          <TableHead>Hành động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow 
                            key={order.id}
                            onClick={() => setSelectedOrder(order)}
                            className="cursor-pointer hover:bg-gray-50"
                          >
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>{order.khachHang}</TableCell>
                            <TableCell>{order.sanPham}</TableCell>
                            <TableCell>
                              {order.tong.toLocaleString('vi-VN')}{' '}
                              {order.donVi}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.trangThai)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#cc0000] hover:text-[#990000]"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedOrder(order)
                                }}
                              >
                                <Eye size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tab 3: Approvals */}
            {activeTab === 'approvals' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Ký duyệt
                </h1>

                {approvalItems.length === 0 ? (
                  <Card>
                    <CardContent className="pt-12 pb-12 text-center">
                      <p className="text-gray-500">Không có sản phẩm cần duyệt</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {approvalItems.map((item) => (
                      <ProductCard 
                        key={item.id} 
                        item={item}
                        onSelect={setSelectedApproval}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Users */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Sinh viên
                </h1>

                <Card>
                  <CardHeader>
                    <CardTitle>Danh sách sinh viên</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>MSSV</TableHead>
                          <TableHead>Họ tên</TableHead>
                          <TableHead>Viện/Ngành</TableHead>
                          <TableHead>Số dư HUST-coin</TableHead>
                          <TableHead>Hành động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              {user.mssv}
                            </TableCell>
                            <TableCell>{user.hoTen}</TableCell>
                            <TableCell>{user.vienNganh}</TableCell>
                            <TableCell>
                              <span className="text-purple-600 font-medium">
                                {user.soDuCoin} xu
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-700 hover:bg-gray-100"
                                >
                                  <Eye size={16} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-700 hover:bg-gray-100"
                                >
                                  <ChevronRight size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tab 5: Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Cài đặt
                </h1>

                {/* System Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cài đặt hệ thống</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên ứng dụng
                      </label>
                      <Input
                        value={systemSettings.appName}
                        onChange={(e) => setSystemSettings({...systemSettings, appName: e.target.value})}
                        className="max-w-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả
                      </label>
                      <Input
                        value={systemSettings.appDesc}
                        onChange={(e) => setSystemSettings({...systemSettings, appDesc: e.target.value})}
                        className="max-w-md"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Chế độ bảo trì
                      </label>
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cài đặt giao dịch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tỷ giá quy đổi HUST-coin
                      </label>
                      <Input
                        value={transactionSettings.exchangeRate}
                        onChange={(e) => setTransactionSettings({...transactionSettings, exchangeRate: e.target.value})}
                        type="number"
                        className="max-w-md"
                      />
                      <p className="text-xs text-gray-500 mt-1">1 HUST-coin = {transactionSettings.exchangeRate} VNĐ</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phí giao dịch nền tảng (%)
                      </label>
                      <Input
                        value={transactionSettings.platformFee}
                        onChange={(e) => setTransactionSettings({...transactionSettings, platformFee: e.target.value})}
                        type="number"
                        className="max-w-md"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Gateway Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cổng thanh toán</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Ví MoMo
                      </label>
                      <Switch
                        checked={paymentSettings.momo}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, momo: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        ZaloPay
                      </label>
                      <Switch
                        checked={paymentSettings.zalopay}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, zalopay: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Chuyển khoản
                      </label>
                      <Switch
                        checked={paymentSettings.transfer}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, transfer: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Thông báo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Gửi email khi có đơn hàng mới
                      </label>
                      <Switch
                        checked={notificationSettings.emailOnNewOrder}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailOnNewOrder: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  className="bg-[#cc0000] hover:bg-[#990000] text-white"
                  onClick={handleSaveSettings}
                >
                  Lưu thay đổi
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chi tiết đơn hàng</DialogTitle>
              <DialogDescription>
                Thông tin chi tiết của đơn hàng {selectedOrder.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Mã đơn</p>
                  <p className="text-gray-900 font-semibold">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Trạng thái</p>
                  <p>{getStatusBadge(selectedOrder.trangThai)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Khách hàng</p>
                <p className="text-gray-900">{selectedOrder.khachHang}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sản phẩm</p>
                <p className="text-gray-900">{selectedOrder.sanPham}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Địa điểm giao hàng</p>
                <p className="text-gray-900">{selectedOrder.diaDiem}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng tiền</p>
                <p className="text-lg font-bold text-[#cc0000]">
                  {selectedOrder.tong.toLocaleString('vi-VN')} {selectedOrder.donVi}
                </p>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                className="bg-[#cc0000] hover:bg-[#990000] text-white"
                onClick={() => {
                  toast({
                    title: 'Thành công',
                    description: 'Đã xác nhận đơn hàng',
                  })
                  setSelectedOrder(null)
                }}
              >
                Xác nhận đơn hàng
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedOrder(null)}
              >
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Approval Details Dialog */}
      {selectedApproval && (
        <Dialog open={!!selectedApproval} onOpenChange={() => setSelectedApproval(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chi tiết sản phẩm</DialogTitle>
              <DialogDescription>
                Thông tin chi tiết sản phẩm cần duyệt
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Custom Product Image Container */}
              <div className="relative w-full aspect-square bg-blue-50 rounded-2xl flex items-center justify-center overflow-hidden">
                {/* Top-right Sparkle */}
                <div className="absolute top-6 right-6">
                  <Sparkles size={32} className="text-yellow-400" />
                </div>
                
                {/* Center Icon */}
                {selectedApproval.icon ? (
                  <selectedApproval.icon size={80} className={selectedApproval.iconColor} strokeWidth={1.5} />
                ) : (
                  <div className="text-center">
                    <p className="text-4xl font-semibold text-gray-300">Áo</p>
                  </div>
                )}
                
                {/* Bottom-left Sparkle */}
                <div className="absolute bottom-6 left-6">
                  <Sparkles size={28} className="text-yellow-400" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Tên sản phẩm</p>
                <p className="text-gray-900 font-semibold">{selectedApproval.tenVatPham}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Mã học phần</p>
                <p className="text-gray-900 font-mono font-medium">{selectedApproval.maHocPhan}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Người gửi</p>
                <p className="text-gray-900">{selectedApproval.nguoiGuiDi}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Thời gian gửi</p>
                <p className="text-gray-900">{selectedApproval.thoiGianGui}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Tình trạng</p>
                <p className="text-gray-900">{selectedApproval.tinhTrang}</p>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleApprove(selectedApproval.id)}
              >
                Duyệt
              </Button>
              <Button
                className="text-red-600 border-red-600 hover:bg-red-50"
                variant="outline"
                onClick={() => handleReject(selectedApproval.id)}
              >
                Từ chối
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
