'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Loader2, Menu, X } from "lucide-react";

// Diagonal Floating Image Column (Academy - Mirrorly Inspired)
const ImageColumn = ({ images, speed, direction = 1, delay = 0 }: { images: string[], speed: number, direction?: number, delay?: number }) => {
  return (
    <div className="video-column" style={{ 
      display: "flex", flexDirection: "column", gap: "2.5rem", flex: "0 0 320px", transform: "translateZ(0)"
    }}>
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: direction > 0 ? [0, -2000] : [-2000, 0] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear", delay: delay }}
        style={{ display: "flex", flexDirection: "column", gap: "2.5rem", willChange: "transform" }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div key={i} style={{ 
            position: "relative", borderRadius: "30px", overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.08)", backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.03)", opacity: 0.8, height: "450px"
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
    <div style={{ position: "relative", minHeight: "100vh", background: "#fdfdfd", color: "#111", overflow: "hidden" }}>
      
      {/* 1. DIAGONAL BACKGROUND (Mirrorly Style) */}
      <div style={{ 
        position: "fixed", top: "-20%", left: "-20%", width: "140%", height: "140%", zIndex: 0,
        transform: "rotate(-10deg)", display: "flex", justifyContent: "center", gap: "3rem", pointerEvents: "none", opacity: 0.15
      }}>
        <ImageColumn images={images} speed={60} direction={1} delay={0} />
        <ImageColumn images={images} speed={90} direction={-1} delay={1} />
        <ImageColumn images={images} speed={50} direction={1} delay={0.5} />
        <ImageColumn images={images} speed={100} direction={-1} delay={2} />
      </div>

      {/* 2. Content Layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <nav style={{ padding: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ fontSize: "1.8rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.2em", color: "#000" }}>
            NADOO <span style={{ color: "#2563eb" }}>ACADEMY</span>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "0.8rem 2.5rem", background: "#2563eb", color: "#fff" }}>JOIN</button>
        </nav>

        <main className="container" style={{ paddingTop: "8rem", paddingBottom: "10rem", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <h1 style={{ 
              fontFamily: "var(--font-serif)", fontSize: "clamp(3.5rem, 10vw, 8rem)", 
              fontWeight: "900", lineHeight: 1, marginBottom: "5rem", color: "#000", wordBreak: "keep-all"
            }}>
              나도 할 수 있는 <br /> <span style={{ color: "#2563eb" }}>AI 실전 코스</span>
            </h1>
          </motion.div>

          {/* Slogan & Copyright (High-end Diagonal) */}
          <section style={{ marginTop: "15rem", marginBottom: "15rem" }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} style={{ textAlign: "center" }}>
              <div style={{ 
                fontFamily: "var(--font-handwriting)", fontSize: "clamp(4rem, 10vw, 8rem)", 
                color: "#2563eb", marginBottom: "3rem", transform: "rotate(-4deg)", fontStyle: "italic", wordBreak: "keep-all",
                lineHeight: "1.2"
              }}>
                "배움의 즐거움, <br /> AI로 시작하세요."
              </div>
              <div style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: "900", letterSpacing: "0.5em", color: "#999", marginBottom: "6rem" }}>
                © 2026 NADOO AI ACADEMY. ALL RIGHTS RESERVED.
              </div>
              <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ background: "#000", color: "#fff", padding: "2rem 8rem", fontSize: "1.5rem" }}>지금 상담 신청하기</button>
            </motion.div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: "15rem", borderTop: "1px solid #eee", paddingTop: "10rem", textAlign: "left" }}>
            <div style={{ fontSize: "4rem", fontWeight: "950", marginBottom: "5rem", fontFamily: "var(--font-serif)", color: "#000" }}>NADOO_AI</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
              <div><span style={{ fontWeight: "900", color: "#2563eb", fontSize: "1.2rem" }}>LOCATION</span><p style={{ color: "#777", marginTop: "1.5rem", fontSize: "1.2rem" }}>광주광역시 서구 상무중앙로 7, 5층 (치평동, 상무타워)</p></div>
              <div><span style={{ fontWeight: "900", color: "#2563eb", fontSize: "1.2rem" }}>CONTACT</span><p style={{ color: "#777", marginTop: "1.5rem", fontSize: "1.2rem" }}>010-4892-3376 | nadoo_ai@naver.com</p></div>
            </div>
            <p style={{ color: "#aaa", marginTop: "5rem", fontSize: "1rem" }}>상호: 나두에이아이 | 대표자: 오민주 | 사업자번호: 434-40-01488<br />© 2026 NADOO AI ACADEMY. ALL RIGHTS RESERVED.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
