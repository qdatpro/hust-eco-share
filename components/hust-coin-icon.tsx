export function HUSTCoinIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Viền ngoài cùng răng cưa pixel (Dark Gold) */}
      <path 
        d="M 35 5 h 30 v 10 h 15 v 15 h 10 v 40 h -10 v 15 h -15 v 10 h -30 v -10 h -15 v -15 h -10 v -40 h 10 v -15 h 15 z" 
        fill="#B8860B" 
      />
      
      {/* Nền đồng xu (Gold) */}
      <path 
        d="M 35 10 h 30 v 10 h 10 v 10 h 10 v 40 h -10 v 10 h -10 v 10 h -30 v -10 h -10 v -10 h -10 v -40 h 10 v -10 h 10 z" 
        fill="#FFD700" 
      />
      
      {/* Đổ bóng khối 3D bên trong kiểu pixel (Deep Gold) */}
      <path 
        d="M 35 15 h 30 v 10 h 10 v 10 h 10 v 30 h -10 v 10 h -10 v 10 h -30 v -10 h -10 v -10 h -10 v -30 h 10 v -10 h 10 z" 
        fill="#FFC125" 
      />

      {/* --- HỌA TIẾT BO MẠCH (CIRCUIT BOARD) --- */}
      {/* Các đường dây đồng (Traces) */}
      <path 
        d="M 20 45 h 12 v -15 h 10  M 80 55 h -12 v 15 h -10  M 45 80 v -12 h -10  M 55 20 v 12 h 10" 
        stroke="#B8860B" 
        strokeWidth="4" 
        fill="none" 
      />
      
      {/* Các điểm hàn / Via (Pads) */}
      <g fill="#B8860B">
        <rect x="40" y="28" width="6" height="6" />
        <rect x="54" y="66" width="6" height="6" />
        <rect x="33" y="66" width="6" height="6" />
        <rect x="61" y="28" width="6" height="6" />
        <rect x="25" y="60" width="4" height="4" />
        <rect x="71" y="36" width="4" height="4" />
      </g>

      {/* --- CHỮ H PHONG CÁCH PIXEL (Bách Khoa Deep Red) --- */}
      <g fill="#C62828">
        <rect x="36" y="36" width="8" height="28" />
        <rect x="56" y="36" width="8" height="28" />
        <rect x="44" y="46" width="12" height="8" />
      </g>

      {/* Điểm nhấn lấp lánh (Pixel Highlight) */}
      <g fill="#FFFFFF" opacity="0.7">
        <rect x="25" y="20" width="5" height="5" />
        <rect x="20" y="25" width="5" height="5" />
        <rect x="30" y="15" width="5" height="5" />
        
        {/* Vệt bóng đổ sáng nhẹ trên chữ H */}
        <rect x="36" y="36" width="4" height="4" opacity="0.5" />
        <rect x="56" y="36" width="4" height="4" opacity="0.5" />
        <rect x="44" y="46" width="4" height="4" opacity="0.5" />
      </g>

      {/* Đổ bóng tối góc dưới tạo cảm giác nổi khối */}
      <g fill="#996515" opacity="0.5">
        <rect x="65" y="75" width="10" height="10" />
        <rect x="75" y="65" width="10" height="10" />
        <rect x="55" y="85" width="10" height="5" />
      </g>
    </svg>
  )
}