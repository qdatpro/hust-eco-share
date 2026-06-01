"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ComboSection } from "@/components/combo-section";
import { PremiumSection } from "@/components/premium-section";
import { BarterSection } from "@/components/barter-section";
import { BlindBoxSection } from "@/components/blind-box-section";
import { Footer } from "@/components/footer";

export default function HUSTEcoSharePage() {
  // Giữ lại State quản lý trường người dùng đang học
  const [userUniversity, setUserUniversity] = useState("HUST");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        
        {/* Banner Hero chứa background màu gradient */}
        <Hero />
        
        {/* --- KHU VỰC CHỌN TRƯỜNG (ĐÃ ĐỒNG BỘ MÀU NỀN) --- */}
        {/* Tớ đổi thành bg-transparent, bỏ border-b và chỉnh lại khoảng cách py-2 cho nó sát lại che khoảng trống */}
        <section className="py-2 bg-transparent relative z-10 -mt-6 md:-mt-10">
          <div className="container mx-auto px-4 max-w-sm text-center">
            <label className="block text-xs font-semibold mb-1.5 text-slate-500 dark:text-slate-400 tracking-wide">
              🎓 Trường bạn đang học:
            </label>
            <div className="relative">
              <select 
                value={userUniversity}
                onChange={(e) => setUserUniversity(e.target.value)}
                className="w-full appearance-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 py-2 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium cursor-pointer shadow-sm text-center text-sm"
              >
                <option value="HUST">Đại học Bách Khoa Hà Nội (HUST)</option>
                <option value="NEU">Đại học Kinh tế Quốc dân (NEU)</option>
                <option value="HUCE">Đại học Xây dựng Hà Nội (HUCE)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <ComboSection />
        <PremiumSection />
        <BarterSection />
        <BlindBoxSection />
      </main>
      <Footer />
    </div>
  );
}