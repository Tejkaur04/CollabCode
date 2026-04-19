import React, { useEffect, useState } from "react";
import { createIcons, icons } from "lucide";
import FeatureCarousel from "../components/FeatureCarousel.jsx";
import { useNavigate } from "react-router-dom";

// =======================
// Feature Rows
// =======================
const features1 = [
  { icon: "🤖", title: "Smart Automations", desc: "Boost efficiency with AI workflows." },
  { icon: "📊", title: "Analytics", desc: "Track performance instantly." },
  { icon: "⚡", title: "Blazing Fast", desc: "Optimized for speed and reliability." },
  { icon: "🔒", title: "Secure", desc: "Enterprise-grade security features." },
];

const features2 = [
  { icon: "🧠", title: "AI Insights", desc: "Understand your code like never before." },
  { icon: "📝", title: "Auto Documentation", desc: "Generate clean docs instantly." },
  { icon: "🧪", title: "Test Generator", desc: "Create strong test cases automatically." },
  { icon: "🌐", title: "Collaboration", desc: "Real-time team coding." },
];

const aiFeatures = [
  "Automatic problem identification",
  "Numerical scoring system",
  "Edge case test generation",
  "Big O complexity analysis",
];

// ===========================================================
//                       MAIN COMPONENT
// ===========================================================
export default function LandingPage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // lucide icons load
  useEffect(() => {
    createIcons({ icons });
  }, []);

  // Google Button Render
  useEffect(() => {
    if (!modalOpen) return;

    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: "filled_blue",
      size: "large",
      width: "90%",


    });
  }, [modalOpen]);

  // Google login handler
  const handleCredentialResponse = async (response) => {
    try {
      setLoadingGoogle(true);

      const googleToken = response.credential;

      const result = await fetch("https://collabcode-ctmq.onrender.com/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await result.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/entrypage", { state: { user: data.user } });
    } catch (err) {
      console.error("Google login failed:", err);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <>
      <style>{css}</style>

      {/* Animated BG */}
      <div className="bg-animation"><div className="grid-bg"></div></div>

      {/* Header */}
      <header>
        <div className="logo">CollabCode</div>
        <button className="cta-button" onClick={() => setModalOpen(true)}>
          Try Now
        </button>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🚀 AI-Powered Collaborative Coding</div>

          <h1>
            Code Together, <br />
            <span className="gradient-text">Learn Smarter</span>
          </h1>

          <p>
            Real-time collaborative coding platform with intelligent AI analysis.
            Write, test, and improve code together with instant insights.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => setModalOpen(true)}>
              Start Coding Now
            </button>
            <button
              className="secondary-btn"
              onClick={() =>
                document.querySelector(".features")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="section-header">
          <h2>
            Powerful Features for{" "}
            <span className="gradient-text">Modern Developers</span>
          </h2>
          <p>Everything you need to collaborate, code, and learn effectively.</p>
        </div>

        {/* Auto Scrolling Feature Rows */}
        <section className="scroll-features">
          <FeatureCarousel items={features1} reverse={false} />
          <FeatureCarousel items={features2} reverse={true} />
        </section>
      </section>

      {/* AI HIGHLIGHT */}
      <section className="ai-highlight">
        <div className="ai-card">
          <div className="ai-content">
            <h2>Intelligent AI Analysis</h2>

            <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>
              Our AI understands code deeply and provides structured insights.
            </p>

            <ul>
              {aiFeatures.map((x, i) => (
                <li key={i}>
                  <div className="check-icon">
                    <i data-lucide="check" stroke="white" width="16" height="16"></i>
                  </div>
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            <button className="primary-btn" onClick={() => setModalOpen(true)}>
              Experience AI Analysis
            </button>
          </div>

          <AIVisualBlock />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h2 className="footer-logo">CollabCode</h2>
            <p className="footer-tagline">AI-powered collaborative coding.</p>
          </div>

          <div className="footer-actions">
            <button className="footer-btn secondary" onClick={() => setModalOpen(true)}>
              <i data-lucide="sparkles"></i> Use Now
            </button>

            <button
              className="footer-btn secondary"
              onClick={() =>
                document.querySelector(".features")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <i data-lucide="compass"></i> Explore Features
            </button>
          </div>

          <div className="footer-social">
            <a href="https://github.com/Tejkaur04/CollabCode" className="social-icon">
              <i data-lucide="github"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <Modal
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        loadingGoogle={loadingGoogle}
      />
    </>
  );
}

// ===========================================================
// Helper Components
// ===========================================================

function AIVisualBlock() {
  return (
    <div className="ai-visual">
      <div className="code-block">
        <div className="code-line">
          <span className="code-comment">// AI Analysis Results</span>
        </div>
        <div className="code-line">Problem: Binary Search</div>
        <div className="code-line">Quality Score: 92/100</div>
        <div className="code-line" />
        <div className="code-line">
          <span className="code-comment">// Complexity</span>
        </div>
        <div className="code-line">Time: O(log n)</div>
        <div className="code-line">Space: O(1)</div>
        <div className="code-line" />
        <div className="code-line">
          <span className="code-comment">// Suggestions</span>
        </div>
        <div className="code-line">1. Add input validation</div>
        <div className="code-line">2. Use descriptive names</div>
        <div className="code-line">3. Optimize edge cases</div>
      </div>
    </div>
  );
}

function Modal({ modalOpen, closeModal, loadingGoogle }) {
  return (
    <div className={`modal ${modalOpen ? "active" : ""}`} id="authModal">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>

        <h2>Get Started with CollabCode</h2>

        <div id="google-btn" className="google-btn"></div>

        {loadingGoogle && (
          <div className="mt-4 shimmer-loader">
            <div className="shimmer"></div>
          </div>
        )}

        <div className="divider">to</div>

        <div className="room-options">
          <button className="room-btn">
            <i data-lucide="plus-circle"></i>
            <br /> Create Room
          </button>

          <button className="room-btn">
            <i data-lucide="log-in"></i>
            <br /> Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

// ===========================================================
// CSS (unchanged)
// ===========================================================
const css=`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #0a0a0a;
  color: #fff;
  overflow-x: hidden;
}

/* ===================== Animated Background ===================== */

.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(99, 102, 241, 0.1) 0%,
    transparent 50%
  );
}

.grid-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(99, 102, 241, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* ===================== Header ===================== */

header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background: rgba(10, 10, 10, 0.8);
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-button {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

/* ===================== Hero Section ===================== */

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-top: 6rem;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  animation: fadeInUp 0.6s ease;
}

.hero h1 {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease 0.2s both;
}

.gradient-text {
  background: linear-gradient(
    135deg,
    #6366f1 0%,
    #a855f7 50%,
    #ec4899 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 700px;
  margin: 0 auto 3rem;
  animation: fadeInUp 0.6s ease 0.4s both;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease 0.6s both;
}

.primary-btn,
.secondary-btn {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.primary-btn {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.secondary-btn {
  background: transparent;
  border: 2px solid rgba(99, 102, 241, 0.5);
  color: white;
}

.secondary-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: #6366f1;
}

/* ===================== Features Section ===================== */

.features {
  position: relative;
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.2rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.2);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2) 0%,
    rgba(168, 85, 247, 0.2) 100%
  );
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.feature-card p {
  color: #94a3b8;
  line-height: 1.6;
}

/* ===================== AI Highlight Section ===================== */

.ai-highlight {
  position: relative;
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.ai-card {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(168, 85, 247, 0.1) 100%
  );
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 30px;
  padding: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.ai-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.ai-content ul {
  list-style: none;
  margin: 2rem 0;
}

.ai-content li {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #94a3b8;
}

.ai-content li:last-child {
  border-bottom: none;
}

.check-icon {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-visual {
  background: rgba(15, 15, 15, 0.5);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.code-block {
  background: #0a0a0a;
  border-radius: 10px;
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #94a3b8;
}

.code-line {
  margin: 0.5rem 0;
}

.code-comment {
  color: #6366f1;
}

/* ===================== Modal ===================== */

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.modal.active {
  display: flex;
}

.modal-content {
  background: #1a1a1a;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1.5rem;
}

.modal-content h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.google-btn {
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.divider {
  text-align: center;
  margin: 2rem 0;
  color: #94a3b8;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: rgba(99, 102, 241, 0.2);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.room-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.room-btn {
  padding: 1.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.room-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
}

/* ===================== Footer ===================== */

.site-footer {
  width: 100%;
  padding: 22px 0;
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(99, 102, 241, 0.15);
  margin-top: 80px;
}

.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-logo {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-tagline {
  font-size: 14px;
  color: #9ca3af;
  margin-top: 2px;
}

.footer-actions {
  display: flex;
  gap: 14px;
}

.footer-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.footer-btn.primary {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
}

.footer-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.35);
}

.footer-btn.secondary {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: white;
}

.footer-btn.secondary:hover {
  background: rgba(99, 102, 241, 0.2);
}

.footer-social .social-icon {
  color: #9ca3af;
  transition: color 0.2s ease;
}

.footer-social .social-icon:hover {
  color: #ffffff;
}

.footer-social .social-icon i {
  width: 20px;
  height: 20px;
}

/* ===================== Responsive ===================== */

@media (max-width: 768px) {
  .ai-card {
    grid-template-columns: 1fr;
    padding: 2rem;
  }

  .room-options {
    grid-template-columns: 1fr;
  }

  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}

/* ===================== Shimmer Loader ===================== */

.shimmer-loader {
  width: 100%;
  height: 45px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
}

.shimmer {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0)
  );
  animation: shimmerMove 1.2s infinite;
}

@keyframes shimmerMove {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`;
