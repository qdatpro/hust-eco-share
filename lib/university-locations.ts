export type University = 'HUST' | 'NEU' | 'HUCE'

export interface Location {
  id: string
  name: string
  x: string
  y: string
}

export const universityLocations: Record<University, Location[]> = {
  HUST: [
    { id: 'parabol', name: 'Cổng Parabol (Cổng 1)', x: '5%', y: '50%' },
    { id: 'tqb', name: 'Thư viện Tạ Quang Bửu', x: '55%', y: '50%' },
    { id: 'ktx', name: 'Cổng KTX (Trần Đại Nghĩa)', x: '88%', y: '85%' },
    { id: 'd4', name: 'Sảnh tòa nhà D4', x: '25%', y: '65%' },
    { id: 'ho-tien', name: 'Ghế đá Hồ Tiền', x: '45%', y: '30%' }
  ],
  NEU: [
    { id: 'ktx-neu', name: 'Ký túc xá NEU', x: '15%', y: '60%' },
    { id: 'cong-tran-dai-nghia', name: 'Cổng Trần Đại Nghĩa', x: '70%', y: '45%' },
    { id: 'toa-nha-a2', name: 'Tòa nhà A2', x: '50%', y: '75%' }
  ],
  HUCE: [
    { id: 'ktx-huce', name: 'Ký túc xá HUCE', x: '20%', y: '55%' },
    { id: 'cong-giai-phong', name: 'Cổng Giải Phóng', x: '75%', y: '35%' },
    { id: 'giang-duong-h1', name: 'Giảng đường H1', x: '55%', y: '70%' }
  ]
}

export const universityNames: Record<University, string> = {
  HUST: 'HUST (Bách Khoa)',
  NEU: 'NEU (Kinh tế)',
  HUCE: 'HUCE (Xây dựng)'
}
