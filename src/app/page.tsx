'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Phone, FileText, Bot, Sparkles, User, Loader2, Menu } from "lucide-react";

// Responsive Image Column (Academy Background)
const ImageColumn = ({ images, speed, direction = 1, mobileHidden = false }: { images: string[], speed: number, direction?: number, mobileHidden?: boolean }) => {
  return (
    <div className={`video-column ${mobileHidden ? 'mobile-hidden' : ''}`} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <motion.div 
        animate={{ y: direction > 0 ? [0, -1800] : [-1800, 0] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem", willChange: "transform" }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div key={i} className="video-item" style={{ 
            position: "relative", borderRadius: "20px", overflow: "hidden",
            boxShadow: "0 15px 30px rgba(0,0,0,0.05)", backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.05)", opacity: 0.8, transform: "translateZ(0)"
          }}>
            <img src={src} alt="class background" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
    } catch (error) { alert("오류가 발생했습니다."); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#fdfdfd", color: "#111", overflowX: "hidden" }}>
      
      {/* 1. Background */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", gap: "1rem", zIndex: 0, pointerEvents: "none", opacity: 0.12 }}>
        <ImageColumn images={images} speed={50} direction={1} />
        <ImageColumn images={images} speed={80} direction={-1} mobileHidden />
      </div>

      {/* 2. Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ fontSize: "1.3rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.15em" }}>
            NADOO <span style={{ color: "#2563eb" }}>ACADEMY</span>
          </div>
          <div className="desktop-only" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            <a style={{ fontWeight: "700" }}>COURSES</a>
            <a style={{ fontWeight: "700" }}>ABOUT</a>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ background: "#2563eb", color: "#fff", padding: "0.7rem 1.8rem" }}>FREE TRIAL</button>
          </div>
          <button className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: "none", border: "none", color: "#2563eb" }}>
            <Menu size={28} />
          </button>
        </nav>

        {/* Hero */}
        <main className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ 
              fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 8vw, 6.5rem)", 
              fontWeight: "900", lineHeight: 1.1, marginBottom: "3rem", wordBreak: "keep-all" 
            }}>
              나도 할 수 있는 <br /> <span style={{ color: "#2563eb" }}>AI 실전 코스</span>
            </h1>
            <p style={{ 
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#555", maxWidth: "750px", 
              margin: "0 auto 4rem", lineHeight: "1.7", wordBreak: "keep-all", padding: "0 1.5rem" 
            }}>
              어려운 이론은 빼고, 당장 실무에 써먹는 기술만 담았습니다. <br /> 초보자부터 50대 이상 시니어까지 모두 환영합니다.
            </p>
          </motion.div>

          {/* Courses */}
          <section style={{ marginTop: "8rem" }}>
            <div className="feature-grid">
              {[
                { title: "비즈니스 자동화", desc: "하루 업무를 1시간으로 단축하는 마법." },
                { title: "50대 맞춤 AI", desc: "눈높이에 맞춘 차근차근 친절한 수업." },
                { title: "3D 홈페이지 제작", desc: "AI로 나만의 홈페이지를 직접 제작." }
              ].map((feature, i) => (
                <div key={i} className="video-card" style={{ padding: "3rem 2rem", textAlign: "left", background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                  <div style={{ color: "#2563eb", fontWeight: "900", fontSize: "1rem", marginBottom: "0.8rem" }}>COURSE 0{i+1}</div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: "900", marginBottom: "1rem", wordBreak: "keep-all" }}>{feature.title}</h3>
                  <p style={{ color: "#666", fontSize: "1.1rem", lineHeight: "1.6", wordBreak: "keep-all" }}>{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Slogan & Copyright Requested by User */}
            <div style={{ marginTop: "10rem", marginBottom: "10rem", textAlign: "center" }}>
              <div style={{ 
                fontFamily: "var(--font-handwriting)", fontSize: "clamp(2.5rem, 7vw, 6rem)", 
                color: "#2563eb", marginBottom: "2rem", wordBreak: "keep-all", padding: "0 1.5rem", lineHeight: "1.3"
              }}>
                "배움의 즐거움, <br className="mobile-only" /> AI로 시작하세요."
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: "700", letterSpacing: "0.2em", color: "#999", marginBottom: "4rem" }}>
                © 2026 NADOO AI ACADEMY. <br className="mobile-only" /> ALL RIGHTS RESERVED.
              </div>
              <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ background: "#000", color: "#fff", padding: "1.5rem 4rem" }}>지금 상담 신청하기</button>
            </div>
          </section>

          {/* Chatbot */}
          <section style={{ marginTop: "5rem", marginBottom: "8rem" }}>
            <div style={{ background: "#fff", padding: "4rem 1.5rem", borderRadius: "32px", boxShadow: "0 15px 40px rgba(0,0,0,0.04)", border: "1px solid #eee", textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
                <div style={{ padding: "0.8rem", background: "#2563eb", borderRadius: "14px" }}><Bot size={32} color="#fff" /></div>
                <div><h3 style={{ fontSize: "1.6rem", fontWeight: "950" }}>교육 상담 챗봇</h3><p style={{ color: "#2563eb", fontWeight: "800", fontSize: "0.9rem" }}>1:1 맞춤 커리큘럼 설계</p></div>
              </div>
              {!isChatActive && !isSuccess ? (
                <button onClick={() => setIsChatActive(true)} className="btn-primary" style={{ width: "100%", background: "#2563eb", color: "#fff", padding: "1.2rem" }}>상담 시작하기</button>
              ) : isSuccess ? (
                <div style={{ background: "rgba(37, 99, 235, 0.05)", padding: "2rem", borderRadius: "20px", textAlign: "center", border: "1px solid #2563eb" }}><h4>신청 완료! ✨</h4></div>
              ) : (
                <form onSubmit={handleChatSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <input name="name" type="text" placeholder="성함" required className="mobile-input-fix-light" />
                  <input name="phone" type="tel" placeholder="연락처" required className="mobile-input-fix-light" />
                  <textarea name="message" placeholder="궁금하신 내용을 적어주세요." rows={3} required className="mobile-input-fix-light" style={{ resize: "none" }} />
                  <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ background: "#000" }}>{isSubmitting ? "보내는 중..." : "상담 전송"}</button>
                </form>
              )}
            </div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: "6rem", borderTop: "1px solid #eee", paddingTop: "6rem", textAlign: "left" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "950", marginBottom: "3rem", fontFamily: "var(--font-serif)" }}>NADOO_AI</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div><span style={{ fontWeight: "900", color: "#2563eb" }}>LOCATION</span><p style={{ color: "#666", marginTop: "0.5rem" }}>광주광역시 서구 상무중앙로 7, 5층 (치평동, 상무타워)</p></div>
              <div><span style={{ fontWeight: "900", color: "#2563eb" }}>CONTACT</span><p style={{ color: "#666", marginTop: "0.5rem" }}>010-4892-3376 | nadoo_ai@naver.com</p></div>
              <p style={{ color: "#aaa", fontSize: "0.9rem" }}>상호: 나두에이아이 | 대표자: 오민주 | 사업자번호: 434-40-01488</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
