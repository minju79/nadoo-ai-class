'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, FileText } from "lucide-react";

// High-quality Infinite Scrolling Column
const MediaColumn = ({ images, speed, direction = 1 }: { images: string[], speed: number, direction?: number }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      <motion.div 
        animate={{ 
          y: direction > 0 ? [0, -1800] : [-1800, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: speed, 
          ease: "linear" 
        }}
        style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div key={i} style={{ 
            position: "relative", 
            width: "380px", 
            height: "540px", 
            borderRadius: "24px", 
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
            backgroundColor: "white"
          }}>
            <Image src={src} alt="Class Poster" fill style={{ objectFit: "cover" }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const classImages = [
    "/work/class1.jpg",
    "/work/class2.jpg",
    "/work/class3.jpg",
    "/work/class4.jpg",
    "/work/class5.jpg",
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#ffffff", color: "#1a1a1a", overflow: "hidden" }}>
      
      {/* 1. Class Artwork Wall Background */}
      <div style={{ 
        position: "fixed", 
        top: "-15%", 
        left: "-10%", 
        width: "120%", 
        height: "130%", 
        display: "flex", 
        justifyContent: "center", 
        gap: "4.5rem", 
        zIndex: 0,
        pointerEvents: "none",
        transform: "rotate(-10deg) scale(1.1)",
        opacity: 0.35
      }}>
        <MediaColumn images={classImages} speed={50} direction={1} />
        <MediaColumn images={classImages} speed={70} direction={-1} />
        <MediaColumn images={classImages} speed={40} direction={1} />
        <MediaColumn images={classImages} speed={60} direction={-1} />
      </div>

      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.85) 100%)",
        zIndex: 1 
      }} />

      {/* 2. Academy Content Layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{ 
          padding: "3rem 4rem", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", fontFamily: "var(--font-serif)" }}>
            NADOO <span style={{ color: "#6366f1" }}>ACADEMY</span>
          </div>
          <div style={{ display: "flex", gap: "3.5rem", fontSize: "0.95rem", fontWeight: "600", letterSpacing: "0.1em" }}>
            <a>커리큘럼</a>
            <a>수강후기</a>
            <a>무료체험</a>
            <button className="btn-primary" style={{ padding: "0.8rem 2.5rem" }}>신청하기</button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="container" style={{ paddingTop: "10rem", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ 
              fontFamily: "var(--font-handwriting)", 
              fontSize: "2.8rem", 
              color: "#6366f1", 
              marginBottom: "1.5rem", 
              display: "block",
              transform: "rotate(-3deg)"
            }}>
              질문하고 바로 실습하는 AI 모임
            </span>
            
            <h1 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "7rem", 
              fontWeight: "400", 
              lineHeight: 1.1, 
              marginBottom: "3.5rem" 
            }}>
              광주 실전 맞춤형 <br />
              <span style={{ fontStyle: "italic", fontWeight: "600" }}>소규모 AI 클래스</span>
            </h1>
            
            <p style={{ 
              fontSize: "1.4rem", 
              color: "#333", 
              maxWidth: "800px", 
              margin: "2rem auto 5.5rem", 
              lineHeight: "1.8" 
            }}>
              어려운 이론은 빼고, 당장 내 업무에 써먹는 기술만 배웁니다. <br />
              50대도, 공인중개사도, 자영업자도 누구나 AI 전문가가 될 수 있습니다.
            </p>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem" }}>
              <button className="btn-primary">무료 체험 신청</button>
              <button style={{ 
                background: "transparent", 
                border: "2px solid #1a1a1a", 
                padding: "1.2rem 3rem", 
                borderRadius: "999px", 
                fontWeight: "700",
                fontSize: "1.1rem" 
              }}>
                상세 커리큘럼 보기
              </button>
            </div>
          </motion.div>

          {/* Featured Courses Section */}
          <section style={{ marginTop: "18rem", paddingBottom: "12rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", marginBottom: "5rem" }}>나도 할 수 있는 AI 실전 코스</h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "2.5rem" 
            }}>
              {[
                { title: "비즈니스 자동화", desc: "ChatGPT와 업무 툴을 연동하여 하루 업무를 1시간으로 단축합니다." },
                { title: "50대 맞춤 AI", desc: "로그인부터 이미지 제작까지, 눈높이에 맞춰 차근차근 배웁니다." },
                { title: "3D 홈페이지 제작", desc: "AI를 활용해 24시간 일하는 나만의 3D 웹사이트를 직접 만듭니다." }
              ].map((course, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  style={{ 
                    background: "white", 
                    padding: "4rem 3rem", 
                    borderRadius: "32px", 
                    textAlign: "left",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
                    border: "1px solid rgba(0,0,0,0.02)"
                  }}
                >
                  <div style={{ fontFamily: "var(--font-handwriting)", fontSize: "1.8rem", color: "#6366f1", marginBottom: "1rem" }}>Course {i+1}</div>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: "800", marginBottom: "1.5rem" }}>{course.title}</h3>
                  <p style={{ color: "#666", fontSize: "1.1rem", lineHeight: "1.7" }}>{course.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Business Info Footer */}
          <footer style={{ marginTop: "10rem", paddingBottom: "10rem", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "8rem" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "left" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "3rem", fontFamily: "var(--font-serif)", color: "#1a1a1a" }}>
                NADOO_AI
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4rem", color: "#666", fontSize: "1.1rem", lineHeight: "2" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <MapPin size={18} color="#6366f1" />
                    <span style={{ color: "#1a1a1a", fontWeight: "700" }}>LOCATION</span>
                  </div>
                  광주광역시 서구 상무중앙로 7, 5층 (치평동, 상무타워)
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <Phone size={18} color="#6366f1" />
                    <span style={{ color: "#1a1a1a", fontWeight: "700" }}>CONTACT</span>
                  </div>
                  대표번호: 010-4892-3376<br />
                  이메일: nadoo_ai@naver.com
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <FileText size={18} color="#6366f1" />
                    <span style={{ color: "#1a1a1a", fontWeight: "700" }}>BUSINESS INFO</span>
                  </div>
                  상호: 나두에이아이 | 대표자: 오민주<br />
                  사업자등록번호: 434-40-01488
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "var(--font-handwriting)", fontSize: "2.5rem", color: "#6366f1", marginBottom: "1rem" }}>
                      "배움의 즐거움, AI로 시작하세요."
                    </p>
                    <div style={{ fontSize: "0.9rem", letterSpacing: "0.5em", color: "#ccc" }}>
                      © 2026 NADOO AI ACADEMY. ALL RIGHTS RESERVED.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
