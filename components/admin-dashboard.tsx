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

const orders = [
  {
    id: 'ĐH001',
    khachHang: 'Nguyễn Văn A',
    sanPham: 'Combo Giải tích 1',
    tong: 450000,
    donVi: 'VNĐ',
    trangThai: 'Chờ xác nhận',
  },
  {
    id: 'ĐH002',
    khachHang: 'Trần Thị B',
    sanPham: 'Áo Blouse Lab',
    tong: 250,
    donVi: 'HUST-coin',
    trangThai: 'Đang giao',
  },
  {
    id: 'ĐH003',
    khachHang: 'Phạm Minh C',
    sanPham: 'Giáo trình VLSI',
    tong: 650000,
    donVi: 'VNĐ',
    trangThai: 'Hoàn thành',
  },
  {
    id: 'ĐH004',
    khachHang: 'Lê Quốc D',
    sanPham: 'Bộ kit Thí nghiệm',
    tong: 500,
    donVi: 'HUST-coin',
    trangThai: 'Chờ xác nhận',
  },
  {
    id: 'ĐH005',
    khachHang: 'Vũ Hương E',
    sanPham: 'Sách Đại số tuyến tính',
    tong: 380000,
    donVi: 'VNĐ',
    trangThai: 'Hoàn thành',
  },
]

const approvalItems = [
  {
    id: 1,
    tenVatPham: 'Combo Giải tích 1',
    nguoiGuiDi: 'Nguyễn Văn A',
    thoiGianGui: '2 giờ trước',
    hinhAnh: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    tenVatPham: 'Áo Blouse Lab',
    nguoiGuiDi: 'Trần Thị B',
    thoiGianGui: '4 giờ trước',
    hinhAnh: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    tenVatPham: 'Giáo trình VLSI',
    nguoiGuiDi: 'Phạm Minh C',
    thoiGianGui: '1 ngày trước',
    hinhAnh: 'https://via.placeholder.com/100',
  },
]

const users = [
  {
    id: 1,
    mssv: '202301001',
    hoTen: 'Nguyễn Văn A',
    vienNganh: 'Kỹ thuật Hóa học',
    soDuCoin: 5000,
  },
  {
    id: 2,
    mssv: '202302045',
    hoTen: 'Trần Thị B',
    vienNganh: 'CNTT',
    soDuCoin: 12500,
  },
  {
    id: 3,
    mssv: '202303089',
    hoTen: 'Phạm Minh C',
    vienNganh: 'Điều khiển tự động',
    soDuCoin: 8750,
  },
  {
    id: 4,
    mssv: '202304123',
    hoTen: 'Lê Quốc D',
    vienNganh: 'CNTT',
    soDuCoin: 15200,
  },
  {
    id: 5,
    mssv: '202305167',
    hoTen: 'Vũ Hương E',
    vienNganh: 'Xây dựng',
    soDuCoin: 6800,
  },
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

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: BarChart3 },
    { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag },
    { id: 'approvals', label: 'Ký duyệt', icon: CheckCircle },
    { id: 'users', label: 'Sinh viên', icon: Users },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ]

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
            <h1 className="text-lg font-bold text-[#cc0000]">HUST Admin</h1>
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
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} className="text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#cc0000] rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Quản trị viên</p>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://via.placeholder.com/40" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                            formatter={(value) =>
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
                            <TableRow key={order.id}>
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
                            <TableRow key={order.id}>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {approvalItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <img
                              src={item.hinhAnh}
                              alt={item.tenVatPham}
                              className="w-full h-32 bg-gray-100 rounded-lg object-cover"
                            />

                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {item.tenVatPham}
                              </h3>
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
                              >
                                Duyệt
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                                size="sm"
                              >
                                Từ chối
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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
                          defaultValue="HUST Eco-Share"
                          className="max-w-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mô tả
                        </label>
                        <Input
                          defaultValue="Nền tảng trao đổi nội bộ Bách Khoa"
                          className="max-w-md"
                        />
                      </div>

                      <div className="pt-4">
                        <Button className="bg-[#cc0000] hover:bg-[#990000]">
                          Lưu cài đặt
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
