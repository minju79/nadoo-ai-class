'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Phone, FileText, Bot, Sparkles, Loader2, Menu } from "lucide-react";

// Responsive Image Column (Academy Background)
const ImageColumn = ({ images, speed, direction = 1, desktopOnly = false }: { images: string[], speed: number, direction?: number, desktopOnly?: boolean }) => {
  return (
    <div className={`video-column ${desktopOnly ? 'desktop-only' : ''}`} style={{ 
      display: "flex", flexDirection: "column", gap: "1.5rem", flex: 1, minWidth: "200px", maxWidth: "350px" 
    }}>
      <motion.div 
        animate={{ y: direction > 0 ? [0, -1800] : [-1800, 0] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem", transform: "translateZ(0)", willChange: "transform" }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div key={i} className="video-item" style={{ 
            position: "relative", borderRadius: "20px", overflow: "hidden",
            boxShadow: "0 15px 30px rgba(0,0,0,0.05)", backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.05)", opacity: 0.15, transform: "translateZ(0)"
          }}>
            <img src={src} alt="class" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const FORMSPREE_URL = "https://formspree.io/f/xzdoearv";
  const images = ["/work/class1.jpg", "/work/class2.jpg", "/work/class3.jpg", "/work/class4.jpg", "/work/class5.jpg"];

  const handleChatSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => { setIsSuccess(false); setIsChatActive(false); }, 5000);
      }
    } finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#fdfdfd", color: "#111", overflowX: "hidden" }}>
      
      {/* 1. Background (4 columns restored) */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", gap: "1.5rem", zIndex: 0, pointerEvents: "none" }}>
        <ImageColumn images={images} speed={50} direction={1} />
        <ImageColumn images={images} speed={80} direction={-1} />
        <ImageColumn images={images} speed={40} direction={1} desktopOnly />
        <ImageColumn images={images} speed={70} direction={-1} desktopOnly />
      </div>

      {/* 2. Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <nav style={{ padding: "2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.2em", color: "#000" }}>
            NADOO <span style={{ color: "#2563eb" }}>ACADEMY</span>
          </div>
          <div className="desktop-only" style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
            <a style={{ fontWeight: "700" }}>COURSES</a>
            <a style={{ fontWeight: "700" }}>ABOUT</a>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ background: "#2563eb", color: "#fff", padding: "0.8rem 2.2rem" }}>FREE TRIAL</button>
          </div>
          <button className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: "none", border: "none", color: "#2563eb" }}>
            <Menu size={32} />
          </button>
        </nav>

        <main className="container" style={{ paddingTop: "6rem", paddingBottom: "10rem", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ 
              fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 8vw, 6.5rem)", 
              fontWeight: "900", lineHeight: 1.1, marginBottom: "3.5rem", color: "#000", wordBreak: "keep-all"
            }}>
              나도 할 수 있는 <br /> <span style={{ color: "#2563eb" }}>AI 실전 코스</span>
            </h1>
          </motion.div>

          {/* Slogan & Copyright (Crooked Style) */}
          <section style={{ marginTop: "8rem" }}>
            <div className="feature-grid">
              {[
                { title: "비즈니스 자동화", desc: "하루 업무를 1시간으로 단축하는 마법." },
                { title: "50대 맞춤 AI", desc: "눈높이에 맞춘 차근차근 친절한 수업." },
                { title: "3D 홈페이지 제작", desc: "AI로 나만의 홈페이지를 직접 제작." }
              ].map((feature, i) => (
                <div key={i} className="video-card" style={{ padding: "4rem 2.5rem", textAlign: "left", background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                  <div style={{ color: "#2563eb", fontWeight: "900", fontSize: "1.2rem", marginBottom: "1rem" }}>COURSE 0{i+1}</div>
                  <h3 style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "1.5rem", color: "#000", wordBreak: "keep-all" }}>{feature.title}</h3>
                  <p style={{ color: "#666", fontSize: "1.1rem", lineHeight: "1.7", wordBreak: "keep-all" }}>{feature.desc}</p>
                </div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} style={{ marginTop: "12rem", marginBottom: "12rem" }}>
              <div style={{ 
                fontFamily: "var(--font-handwriting)", fontSize: "clamp(3.5rem, 8vw, 6.5rem)", 
                color: "#2563eb", marginBottom: "2rem", textShadow: "0 5px 15px rgba(37, 99, 235, 0.1)",
                transform: "rotate(-3deg) translateX(-10px)", fontStyle: "italic", wordBreak: "keep-all"
              }}>
                "배움의 즐거움, <br className="mobile-only" /> AI로 시작하세요."
              </div>
              <div style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: "900", letterSpacing: "0.4em", color: "#999", marginBottom: "5rem" }}>
                © 2026 NADOO AI ACADEMY. ALL RIGHTS RESERVED.
              </div>
              <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ background: "#000", color: "#fff", padding: "2rem 6rem", fontSize: "1.4rem" }}>지금 상담 신청하기</button>
            </motion.div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: "10rem", borderTop: "1px solid #eee", paddingTop: "8rem", textAlign: "left" }}>
            <div style={{ fontSize: "3rem", fontWeight: "950", marginBottom: "4rem", fontFamily: "var(--font-serif)", color: "#000" }}>NADOO_AI</div>
            <div className="footer-info">
              <div><span style={{ fontWeight: "900", color: "#2563eb" }}>LOCATION</span><p style={{ color: "#666", marginTop: "1rem" }}>광주광역시 서구 상무중앙로 7, 5층 (치평동, 상무타워)</p></div>
              <div><span style={{ fontWeight: "900", color: "#2563eb" }}>CONTACT</span><p style={{ color: "#666", marginTop: "1rem" }}>010-4892-3376 | nadoo_ai@naver.com</p></div>
              <p style={{ color: "#ccc", marginTop: "3rem" }}>상호: 나두에이아이 | 대표자: 오민주 | 사업자번호: 434-40-01488<br />© 2026 NADOO AI ACADEMY. ALL RIGHTS RESERVED.</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
