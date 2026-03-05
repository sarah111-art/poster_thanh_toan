import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  Star,
  Zap,
  CreditCard,
  Wallet,
  QrCode,
  ArrowDown,
} from "lucide-react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const posterRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".poster-content > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.to(".glow-effect", {
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-2 md:p-4 font-sans selection:bg-gold-500 selection:text-rich-black">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="glow-effect absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold-500/10 blur-[120px] rounded-full opacity-30" />
        <div className="glow-effect absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold-700/10 blur-[120px] rounded-full opacity-30" />
      </div>

      {/* Poster Container */}
      <div
        ref={posterRef}
        className="relative w-full max-w-[900px] bg-charcoal/60 backdrop-blur-3xl border border-gold-500/30 rounded-[40px] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.6)] poster-content"
      >
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img
            src="https://picsum.photos/seed/nails/1200/1600"
            alt="Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rich-black via-transparent to-rich-black" />
        </div>

        {/* Top Accent Bar */}
        <div className="h-1 w-full bg-gradient-gold relative z-10" />

        <div className="p-3 md:p-5 space-y-3 md:space-y-5 relative z-10">
          {/* Header */}
          <div className="text-center space-y-0.5">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[7px] font-bold uppercase tracking-[0.3em]">
              <Sparkles size={8} /> HuyNailsBoss Academy
            </div>
            <h1 className="text-lg md:text-xl font-serif leading-tight">
              Khóa học setup và vận hành tiệm nails <br />
              <span className="text-gradient-gold italic">
                bởi chuyên gia HuyNailsBoss
              </span>
            </h1>
          </div>

          {/* Pricing & Urgency */}
          <div className="grid md:grid-cols-2 gap-4 items-center bg-white/5 rounded-[24px] p-3 md:p-4 border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="space-y-1 text-center md:text-left relative z-10">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-white/30 text-base line-through font-serif">
                  Giá gốc: $999
                </span>
                <span className="px-1.5 py-0.5 bg-red-500 text-[8px] font-bold rounded uppercase tracking-tighter">
                  Giảm 50%
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-serif text-gradient-gold font-black tracking-tighter">
                Ưu đãi: $499
              </div>
              <div className="inline-flex items-center gap-2 text-red-400 font-bold text-[9px] uppercase tracking-widest animate-pulse">
                <Zap size={10} /> Chỉ dành cho 5 học viên nhanh tay nhất!
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4 relative z-10">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-[9px] uppercase tracking-[0.4em] mb-0.5 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                <Clock size={12} className="animate-spin-slow" /> Bảng giờ ưu
                đãi
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-rich-black/90 border-2 border-gold-500 rounded-2xl flex items-center justify-center text-3xl font-mono shadow-[0_0_40px_rgba(212,175,55,0.3)] relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent opacity-50" />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={formatTime(timeLeft).split(":")[0]}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] text-gold-400 font-bold"
                      >
                        {formatTime(timeLeft).split(":")[0]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-[10px] text-gold-400 font-black uppercase mt-1 tracking-[0.3em]">
                    Phút
                  </span>
                </div>
                <div className="text-3xl font-serif text-gold-500 self-center mb-4 animate-pulse font-bold">
                  :
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-rich-black/90 border-2 border-gold-500 rounded-2xl flex items-center justify-center text-3xl font-mono shadow-[0_0_40px_rgba(212,175,55,0.3)] relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent opacity-50" />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={formatTime(timeLeft).split(":")[1]}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] text-gold-400 font-bold"
                      >
                        {formatTime(timeLeft).split(":")[1]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-[10px] text-gold-400 font-black uppercase mt-1 tracking-[0.3em]">
                    Giây
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="space-y-2">
            <div className="text-center space-y-0.5">
              <h2 className="text-base font-serif text-gold-300 uppercase tracking-[0.3em]">
                Thông Tin Thanh Toán
              </h2>
              <div className="w-10 h-0.5 bg-gradient-gold mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bank Transfer */}
              <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 space-y-6 hover:border-gold-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-20 bg-gold-500/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
                <div className="flex items-center gap-3 text-gold-400 relative z-10">
                  <CreditCard size={24} />
                  <span className="text-sm font-bold uppercase tracking-[0.2em]">
                    HSBC Vietnam
                  </span>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">
                      1.1 Số tài khoản / Account No.
                    </p>
                    <p className="text-2xl font-mono text-gradient-gold tracking-tighter font-bold">
                      090-772526-001
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">
                      1.2 Loại tiền tệ / Currency
                    </p>
                    <p className="text-lg font-bold text-white/90">VND</p>
                  </div>
                </div>
              </div>

              {/* Paypal */}
              <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 space-y-6 hover:border-gold-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
                <div className="flex items-center gap-3 text-gold-400 relative z-10">
                  <Wallet size={24} />
                  <span className="text-sm font-bold uppercase tracking-[0.2em]">
                    PayPal
                  </span>
                </div>
                <div className="flex items-center gap-8 relative z-10">
                  <div className="space-y-2 flex-1">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">
                      Paypal Email:
                    </p>
                    <p className="text-base font-mono text-gold-200 break-all font-bold">
                      Hngo7@hotmail.com
                    </p>
                    <p className="text-base font-mono text-gold-200 break-all font-bold">
                      Phụ thu thêm phí thuế $25 = $524
                    </p>
                  </div>
                </div>
              </div>

              {/* Zelle */}
              <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 space-y-6 hover:border-gold-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
                <div className="flex items-center gap-3 text-gold-400 relative z-10">
                  <QrCode size={24} />
                  <span className="text-sm font-bold uppercase tracking-[0.2em]">
                    Zelle
                  </span>
                </div>
                <div className="flex items-center gap-6 relative z-10">
                  <div className="space-y-2 flex-1">
                    <p className="text-lg font-bold text-white/90 uppercase tracking-tight">
                      ERIC NGO
                    </p>
                    <p className="text-sm font-mono text-gold-200 font-bold">
                      (***) ***-6788
                    </p>
                    <p className="text-[10px] text-white/40 uppercase mt-2 tracking-tighter">
                      Quét mã để thanh toán
                    </p>
                  </div>
                  <div className="shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="https://res.cloudinary.com/dwlwf7amq/image/upload/v1772614963/image_1_sc02yu.png"
                      alt="Zelle QR"
                      className="w-40 h-40 rounded-2xl border-4 border-white shadow-2xl object-contain bg-white aspect-square"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Venmo */}
              <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 space-y-6 hover:border-gold-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
                <div className="flex items-center gap-3 text-gold-400 relative z-10">
                  <QrCode size={24} />
                  <span className="text-sm font-bold uppercase tracking-[0.2em]">
                    Venmo
                  </span>
                </div>
                <div className="flex items-center gap-6 relative z-10">
                  <div className="space-y-2 flex-1">
                    <p className="text-lg font-bold text-white/90 uppercase tracking-tight">
                      ERIC NGO
                    </p>
                    <p className="text-sm font-mono text-gold-200 font-bold">
                      @Hngo7
                    </p>
                    <p className="text-[10px] text-white/40 uppercase mt-2 tracking-tighter">
                      Quét mã để thanh toán
                    </p>
                  </div>
                  <div className="shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="https://res.cloudinary.com/dwlwf7amq/image/upload/v1772614963/image_kzhfjj.png"
                      alt="Venmo QR"
                      className="w-40 h-40 rounded-2xl border-4 border-white shadow-2xl object-contain bg-white aspect-square"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-white/5 text-center space-y-4">
            <div className="flex items-center justify-center gap-6 text-white/40 text-[9px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-1">
                <ShieldCheck size={10} className="text-gold-500" /> Bảo mật 100%
              </div>
              <div className="flex items-center gap-1">
                <Star size={10} className="text-gold-500" /> Chuyên gia 10 năm
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-white/20 text-[9px] uppercase tracking-widest">
                Vui lòng chụp màn hình giao dịch và gửi cho chúng tôi sau khi
                hoàn tất.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="w-6 h-6 bg-gradient-gold rounded-full flex items-center justify-center">
                  <span className="text-rich-black font-bold text-[10px]">
                    H
                  </span>
                </div>
                <span className="font-serif text-base tracking-wider text-gradient-gold font-bold italic">
                  HuyNailsBoss Academy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div className="h-0.5 w-full bg-gradient-gold/30" />
      </div>

      {/* Floating Action Button (Mobile Only) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <div className="w-14 h-14 bg-gradient-gold rounded-full flex items-center justify-center text-rich-black shadow-2xl animate-bounce">
          <ArrowDown size={24} />
        </div>
      </div>
    </div>
  );
}
