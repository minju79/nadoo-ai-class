'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Phone, FileText, Bot, Sparkles, User, Loader2, Menu, BookOpen, CheckCircle2 } from "lucide-react";

// Responsive Infinite Scrolling Image Column (using backgrounds)
const ImageColumn = ({ images, speed, direction = 1, mobileHidden = false }: { images: string[], speed: number, direction?: number, mobileHidden?: boolean }) => {
  return (
    <div className={`video-column ${mobileHidden ? 'mobile-hidden' : ''}`} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <motion.div 
        animate={{ 
          y: direction > 0 ? [0, -1800] : [-1800, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: speed, 
          ease: "linear" 
        }}
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "2rem",
          willChange: "transform"
        }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div key={i} className="video-item" style={{ 
            position: "relative", 
            borderRadius: "24px", 
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.05)",
            opacity: 0.8,
            transform: "translateZ(0)"
          }}>
            <img 
              src={src} 
              alt="class background"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
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

  // Formspree Endpoint (Using the same for now, user can change per project)
  const FORMSPREE_URL = "https://formspree.io/f/xzdoearv";

  const images = [
    "/work/class1.jpg",
    "/work/class2.jpg",
    "/work/class3.jpg",
    "/work/class4.jpg",
    "/work/class5.jpg",
  ];

  const handleChatSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsChatActive(false);
        }, 5000);
      } else {
        alert("죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      alert("서버 연결에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#f8f9fa", color: "#111", overflowX: "hidden" }}>
      
      {/* 1. Background Layer */}
      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        display: "flex", 
        justifyContent: "center", 
        gap: "2rem", 
        zIndex: 0,
        pointerEvents: "none",
        padding: "0 1rem",
        opacity: 0.15
      }}>
        <ImageColumn images={images} speed={50} direction={1} />
        <ImageColumn images={images} speed={80} direction={-1} mobileHidden />
        <ImageColumn images={images} speed={40} direction={1} mobileHidden />
      </div>

      {/* 2. Content Layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{ 
          padding: "2rem 1.5rem", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.2em", color: "#000" }}>
            NADOO <span style={{ color: "#2563eb" }}>ACADEMY</span>
          </div>
          
          <div className="desktop-only" style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
            <a style={{ fontWeight: "700", cursor: "pointer" }}>COURSES</a>
            <a style={{ fontWeight: "700", cursor: "pointer" }}>ABOUT</a>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ background: "#2563eb", color: "#fff", padding: "0.8rem 2.2rem" }}>FREE TRIAL</button>
          </div>

          <button className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: "none", border: "none", color: "#2563eb" }}>
            <Menu size={32} />
          </button>
        </nav>

        {/* Hero Section */}
        <main className="container" style={{ paddingTop: "6rem", paddingBottom: "10rem", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "clamp(3rem, 8vw, 6.5rem)", 
              fontWeight: "900", 
              lineHeight: 1.1, 
              marginBottom: "3.5rem",
              color: "#000"
            }}>
              나도 할 수 있는 <br />
              <span style={{ color: "#2563eb" }}>AI 실전 코스</span>
            </h1>
            
            <p style={{ 
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)", 
              color: "#555", 
              maxWidth: "800px", 
              margin: "0 auto 5rem", 
              lineHeight: "1.8",
              fontWeight: "500",
              wordBreak: "keep-all"
            }}>
              어려운 이론은 빼고, 당장 실무에 써먹는 기술만 담았습니다. <br />
              초보자부터 전문가까지, 나두 AI 아카데미에서 시작하세요.
            </p>
          </motion.div>

          {/* Course Cards */}
          <section style={{ marginTop: "10rem" }}>
            <div className="feature-grid">
              {[
                { title: "비즈니스 자동화", desc: "ChatGPT와 업무 툴을 연동하여 하루 업무를 1시간으로 단축합니다." },
                { title: "50대 맞춤 AI", desc: "로그인부터 이미지 제작까지, 눈높이에 맞춰 차근차근 배웁니다." },
                { title: "3D 홈페이지 제작", desc: "AI를 활용해 24시간 일하는 나만의 3D 웹사이트를 직접 만듭니다." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  className="video-card"
                  whileHover={{ y: -10 }}
                  style={{ padding: "4rem 2.5rem", textAlign: "left", background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
                >
                  <div style={{ color: "#2563eb", fontWeight: "900", fontSize: "1.2rem", marginBottom: "1rem" }}>
                    COURSE 0{i+1}
                  </div>
                  <h3 style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "1.5rem", color: "#000" }}>{feature.title}</h3>
                  <p style={{ color: "#666", fontSize: "1.1rem", lineHeight: "1.7", wordBreak: "keep-all" }}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Prominent Slogan & Copyright Requested by User */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ marginTop: "12rem", marginBottom: "12rem", textAlign: "center" }}
            >
              <div style={{ 
                fontFamily: "var(--font-handwriting)", 
                fontSize: "clamp(3.5rem, 8vw, 6rem)", 
                color: "#2563eb", 
                marginBottom: "2rem",
                textShadow: "0 5px 15px rgba(37, 99, 235, 0.2)"
              }}>
                "배움의 즐거움, AI로 시작하세요."
              </div>
              <div style={{ 
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)", 
                fontWeight: "900", 
                letterSpacing: "0.4em", 
                color: "#999",
                marginBottom: "5rem"
              }}>
                © 2026 NADOO AI ACADEMY. ALL RIGHTS RESERVED.
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary" 
                style={{ 
                  background: "#000", 
                  color: "#fff", 
                  padding: "2rem 6rem", 
                  fontSize: "1.4rem",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                지금 무료 체험 수업 신청하기
              </button>
            </motion.div>
          </section>

          {/* AI Consultation Bot Section */}
          <section className="container" style={{ marginTop: "5rem", marginBottom: "10rem", textAlign: "center" }}>
            <div style={{ 
              background: "#fff", 
              padding: "6rem 2rem", 
              borderRadius: "48px", 
              boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
              border: "1px solid #eee"
            }}>
              <div style={{ maxWidth: "850px", margin: "0 auto", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
                  <div style={{ padding: "1rem", background: "#2563eb", borderRadius: "18px" }}>
                    <Bot size={40} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "2rem", fontWeight: "950", color: "#000" }}>교육 상담 챗봇</h3>
                    <p style={{ color: "#2563eb", fontWeight: "800", fontSize: "1rem" }}>나도 AI 아카데미 1:1 맞춤 상담</p>
                  </div>
                </div>

                {!isChatActive && !isSuccess ? (
                  <button 
                    onClick={() => setIsChatActive(true)}
                    className="btn-primary" 
                    style={{ 
                      width: "100%", 
                      padding: "1.5rem", 
                      background: "#2563eb",
                      color: "#fff",
                      fontSize: "1.2rem", 
                      display: "flex", 
                      justifyContent: "center",
                      alignItems: "center", 
                      gap: "1rem"
                    }}
                  >
                    <Sparkles size={20} /> 수업 커리큘럼 상담하기
                  </button>
                ) : isSuccess ? (
                  <div style={{ background: "rgba(37, 99, 235, 0.05)", padding: "2.5rem", borderRadius: "24px", textAlign: "center", border: "1px solid #2563eb" }}>
                    <h4 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#2563eb", marginBottom: "0.5rem" }}>신청 완료!</h4>
                    <p>전문 상담사가 곧 연락드릴게요! ✨</p>
                  </div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleChatSubmit}
                    style={{ 
                      background: "#f8f9fa", 
                      padding: "2rem", 
                      borderRadius: "24px", 
                      display: "flex", 
                      flexDirection: "column", 
                      gap: "1.2rem",
                      border: "1px solid #eee"
                    }}
                  >
                    <div className="input-group">
                      <input name="name" type="text" placeholder="성함" required style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "15px", padding: "1.2rem", fontSize: "1.1rem" }} />
                      <input name="phone" type="tel" placeholder="연락처" required style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "15px", padding: "1.2rem", fontSize: "1.1rem" }} />
                    </div>
                    <textarea name="message" placeholder="배우고 싶으신 내용을 자유롭게 적어주세요." rows={3} required style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "15px", padding: "1.2rem", fontSize: "1.1rem", resize: "none" }} />
                    <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ background: "#000", color: "#fff", padding: "1.3rem", fontSize: "1.2rem", fontWeight: "900", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                      {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> 전송 중...</> : <><Send size={20} /> 상담 신청 완료</>}
                    </button>
                  </motion.form>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: "10rem", paddingBottom: "6rem", borderTop: "1px solid #eee", paddingTop: "8rem" }}>
            <div className="footer-content">
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "3rem", fontWeight: "950", marginBottom: "4rem", fontFamily: "var(--font-serif)", letterSpacing: "0.1em", color: "#000" }}>
                  NADOO_AI
                </div>
                
                <div className="footer-info">
                  <div className="info-block">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <MapPin size={20} color="#2563eb" />
                      <span style={{ fontWeight: "900", fontSize: "1.1rem", letterSpacing: "0.15em", color: "#000" }}>LOCATION</span>
                    </div>
                    <p style={{ color: "#666", fontSize: "1.1rem", lineHeight: "1.7" }}>
                      광주광역시 서구 상무중앙로 7, 5층 (치평동, 상무타워)
                    </p>
                  </div>
                  <div className="info-block">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <Phone size={20} color="#2563eb" />
                      <span style={{ fontWeight: "900", fontSize: "1.1rem", letterSpacing: "0.15em", color: "#000" }}>CONTACT</span>
                    </div>
                    <p style={{ color: "#666", fontSize: "1.1rem", lineHeight: "1.7" }}>
                      대표번호: 010-4892-3376<br />이메일: nadoo_ai@naver.com
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: "3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <FileText size={20} color="#2563eb" />
                    <span style={{ fontWeight: "900", fontSize: "1.1rem", letterSpacing: "0.15em", color: "#000" }}>BUSINESS INFO</span>
                  </div>
                  <p style={{ color: "#666", fontSize: "1.1rem", lineHeight: "1.7" }}>
                    상호: 나두에이아이 | 대표자: 오민주 | 사업자번호: 434-40-01488
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", textAlign: "right" }}>
                <div style={{ fontSize: "1rem", letterSpacing: "0.2em", color: "#ccc", fontWeight: "700" }}>
                  NADOO AI ECOSYSTEM
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: "fixed", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%", 
              background: "rgba(255,255,255,0.98)", 
              zIndex: 100, 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              backdropFilter: "blur(20px)"
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              style={{ 
                background: "#fff", 
                width: "95%", 
                maxWidth: "600px", 
                borderRadius: "40px", 
                padding: "4rem 2rem", 
                border: "1px solid #2563eb",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 30px 100px rgba(37, 99, 235, 0.1)"
              }}
            >
              <button onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: "2rem", right: "2rem", background: "none", border: "none", color: "#000" }}><X size={32} /></button>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span style={{ fontFamily: "var(--font-handwriting)", fontSize: "2.5rem", color: "#2563eb" }}>무료 수업 신청</span>
                <h2 style={{ fontSize: "2.5rem", fontWeight: "950", marginTop: "0.5rem", color: "#000" }}>Learning with AI</h2>
              </div>
              <form action={FORMSPREE_URL} method="POST" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <input type="text" name="name" placeholder="성함" required style={{ background: "#f8f9fa", border: "1px solid #eee", borderRadius: "20px", padding: "1.5rem", fontSize: "1.2rem" }} />
                <input type="tel" name="phone" placeholder="연락처" required style={{ background: "#f8f9fa", border: "1px solid #eee", borderRadius: "20px", padding: "1.5rem", fontSize: "1.2rem" }} />
                <textarea name="message" placeholder="상담 받고 싶은 내용" rows={3} style={{ background: "#f8f9fa", border: "1px solid #eee", borderRadius: "20px", padding: "1.5rem", fontSize: "1.2rem", resize: "none" }} />
                <button type="submit" className="btn-primary" style={{ background: "#2563eb", color: "#fff", padding: "1.5rem", fontSize: "1.3rem", fontWeight: "900" }}>지금 신청하기</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
