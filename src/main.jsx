import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const planetData = [
  { id: "about", label: "ABOUT", title: "关于我", className: "planet--about" },
  { id: "gallery", label: "GALLERY", title: "记忆碎片", className: "planet--gallery" },
  { id: "skills", label: "SKILLS", title: "技能星座", className: "planet--skills" },
  { id: "resume", label: "RESUME", title: "简历轨道", className: "planet--resume" },
  { id: "contact", label: "CONTACT", title: "与我联络", className: "planet--contact" },
];

const skillPoints = [
  { name: "视觉设计", detail: "Visual design", x: "14%", y: "42%", tone: "violet" },
  { name: "数据分析", detail: "Data analysis", x: "37%", y: "23%", tone: "cyan" },
  { name: "Python", detail: "Python / tools", x: "61%", y: "37%", tone: "blue" },
  { name: "表达与沟通", detail: "Communication", x: "82%", y: "24%", tone: "violet" },
  { name: "内容策划", detail: "Content planning", x: "45%", y: "72%", tone: "cyan" },
  { name: "团队协作", detail: "Teamwork", x: "75%", y: "72%", tone: "blue" },
];

function SpaceCanvas() {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0.5, y: 0.45 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars = Array.from({ length: reduced ? 80 : 150 }, (_, index) => ({
      x: ((index * 73) % 997) / 997,
      y: ((index * 151 + 41) % 991) / 991,
      depth: 0.25 + ((index * 29) % 100) / 100,
      size: 0.35 + (index % 4) * 0.35,
      phase: index * 0.83,
    }));
    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event) => {
      pointerRef.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-progress", scrollRef.current.toString());
    };

    const render = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const { x: pointerX, y: pointerY } = pointerRef.current;
      const scroll = scrollRef.current;
      const gradient = context.createRadialGradient(
        width * (0.5 + (pointerX - 0.5) * 0.08),
        height * (0.42 + (pointerY - 0.5) * 0.08),
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8,
      );
      gradient.addColorStop(0, "rgba(74, 61, 177, 0.13)");
      gradient.addColorStop(0.42, "rgba(17, 62, 142, 0.06)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        const driftX = (pointerX - 0.5) * star.depth * 22;
        const driftY = (pointerY - 0.5) * star.depth * 16;
        const x = star.x * width + driftX;
        const y = ((star.y + scroll * star.depth * 0.34) % 1) * height + driftY;
        const pulse = reduced ? 0.72 : 0.55 + Math.sin(time * 0.0015 + star.phase) * 0.25;
        context.beginPath();
        context.arc(x, y, star.size * star.depth, 0, Math.PI * 2);
        context.fillStyle = `rgba(200, 221, 255, ${Math.max(0.12, pulse * star.depth)})`;
        context.fill();
      });

      if (!reduced) frame = requestAnimationFrame(render);
    };

    resize();
    updateScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return <canvas className="space-canvas" ref={canvasRef} aria-hidden="true" />;
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function OrbitPlanet({ planet, active, onSelect }) {
  return (
    <button
      type="button"
      className={`orbit-planet ${planet.className} ${active ? "is-active" : ""}`}
      onClick={() => onSelect(planet.id)}
      aria-label={`前往${planet.title}`}
      aria-pressed={active}
    >
      <span className="planet-core" aria-hidden="true" />
      <span className="planet-copy">
        <strong>{planet.label}</strong>
        <small>{planet.title}</small>
      </span>
    </button>
  );
}

function OrbitMap({ activeSection, onSelect }) {
  return (
    <div className="orbit-map" aria-label="星图导航">
      <div className="orbit-line orbit-line--one" aria-hidden="true" />
      <div className="orbit-line orbit-line--two" aria-hidden="true" />
      <div className="orbit-line orbit-line--three" aria-hidden="true" />
      <div className="orbit-star" aria-hidden="true">
        <span className="orbit-star__halo" />
        <span className="orbit-star__name">徐宇星</span>
        <span className="orbit-star__en">XU YUXING</span>
      </div>
      {planetData.map((planet) => (
        <OrbitPlanet
          key={planet.id}
          planet={planet}
          active={activeSection === planet.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function SectionMarker({ index, title, caption }) {
  return (
    <div className="section-marker">
      <span>{index}</span>
      <div>
        <strong>{title}</strong>
        <small>{caption}</small>
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  const visiblePlanets = useMemo(() => planetData.filter((planet) => planet.id !== "contact"), []);

  useEffect(() => {
    const sections = ["about", "gallery", "skills", "resume", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: [0.18, 0.35, 0.6], rootMargin: "-12% 0px -26% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = (id) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <div className="space-site">
      <SpaceCanvas />
      <div className="space-vignette" aria-hidden="true" />
      <div className="scroll-line" aria-hidden="true"><span /></div>

      <header className="space-header">
        <a className="space-brand" href="#top" aria-label="回到首页">
          <span className="brand-orb" />
          <span>XU YUXING</span>
        </a>
        <nav className={menuOpen ? "space-nav is-open" : "space-nav"} aria-label="主导航">
          {visiblePlanets.map((planet) => (
            <a
              key={planet.id}
              href={`#${planet.id}`}
              onClick={(event) => {
                event.preventDefault();
                navigate(planet.id);
              }}
            >
              {planet.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              navigate("contact");
            }}
          >
            CONTACT
          </a>
        </nav>
        <button
          type="button"
          className="space-menu"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "关闭导航" : "打开导航"}
        >
          <span /><span />
        </button>
      </header>

      <main>
        <section id="top" className="hero-space">
          <div className="hero-space__coordinates">34° 46′ N / 113° 38′ E</div>
          <div className="hero-space__copy">
            <h1>徐宇星</h1>
            <p>探索我的数字宇宙</p>
            <div className="hero-space__actions">
              <button type="button" className="glow-button" onClick={() => navigate("about")}>开始探索 <span>↗</span></button>
              <a className="text-link" href="./space/xu-yuxing-resume.pdf" download>下载简历 <span>↓</span></a>
            </div>
          </div>
          <OrbitMap activeSection={activeSection} onSelect={navigate} />
          <div className="hero-space__hint"><span className="mouse-icon" /><span>SCROLL TO FLY THROUGH<br />MY UNIVERSE</span></div>
        </section>

        <section id="about" className="space-section about-space">
          <div className="space-section__inner split-layout">
            <SectionMarker index="01" title="ABOUT / 关于我" caption="THE MAIN STAR" />
            <div className="about-copy">
              <p className="section-kicker">A SMALL STAR WITH A LARGE CURIOSITY</p>
              <h2>我是徐宇星，<br /><em>一颗正在成长的主星。</em></h2>
              <p className="section-body">我喜欢把世界拆成一束束可被理解的光：观察、学习、表达，再把新的发现连接到下一次行动里。在这里，你可以看到我的照片、技能、经历，以及那些还在形成中的想法。</p>
              <div className="about-facts"><div><span>ORIGIN</span><strong>中国 · 2026</strong></div><div><span>STATUS</span><strong>OPEN TO NEW ORBITS</strong></div></div>
            </div>
            <div className="portrait-orbit">
              <div className="portrait-orbit__ring ring-one" /><div className="portrait-orbit__ring ring-two" />
              <div className="portrait-orbit__image"><img src="./space/xu-yuxing-portrait.png" alt="徐宇星证件照" /></div>
              <span className="portrait-orbit__label">HUMAN / 01</span>
            </div>
          </div>
        </section>

        <section id="gallery" className="space-section gallery-space">
          <div className="space-section__inner">
            <SectionMarker index="02" title="GALLERY / 记忆碎片" caption="THREE MOMENTS IN ORBIT" />
            <div className="gallery-heading"><h2>把生活保存成<br /><em>三块漂浮的星尘。</em></h2><p>每一张照片都是一个坐标，记录我经过的人、事与现场。</p></div>
            <div className="memory-field">
              <div className="memory-orbit memory-orbit--one" aria-hidden="true" /><div className="memory-orbit memory-orbit--two" aria-hidden="true" />
              <figure className="memory-card memory-card--one"><div className="memory-card__frame"><img src="./space/memory-01.jpg" alt="徐宇星第一次来到湖南大学参加新生开学典礼" /></div><figcaption><span>MEMORY / 01</span><strong>第一次来到湖南大学</strong></figcaption></figure>
              <figure className="memory-card memory-card--two"><div className="memory-card__frame"><img src="./space/memory-02.jpg" alt="徐宇星参与活动的照片" /></div><figcaption><span>MEMORY / 02</span><strong>与同伴一起发光</strong></figcaption></figure>
              <figure className="memory-card memory-card--three"><div className="memory-card__frame"><img src="./space/memory-03.jpg" alt="徐宇星在活动现场的照片" /></div><figcaption><span>MEMORY / 03</span><strong>一段共同完成的旅程</strong></figcaption></figure>
            </div>
          </div>
        </section>

        <section id="skills" className="space-section skills-space">
          <div className="space-section__inner">
            <SectionMarker index="03" title="SKILLS / 技能星座" caption="A CONSTELLATION OF PRACTICE" />
            <div className="skills-heading"><h2>把好奇心<br /><em>连接成能力。</em></h2><p>技能不是静止的标签，而是会彼此连线、持续生长的星座。</p></div>
            <div className="constellation" aria-label="技能星座图">
              <svg className="constellation-lines" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true"><path d="M140 235 L370 130 L610 208 L820 135 M370 130 L450 405 L750 405 L820 135 M610 208 L450 405" /></svg>
              {skillPoints.map((point) => <div className={`skill-point skill-point--${point.tone}`} style={{ left: point.x, top: point.y }} key={point.name}><span className="skill-point__dot" /><span className="skill-point__text"><strong>{point.name}</strong><small>{point.detail}</small></span></div>)}
              <div className="constellation-center"><span>KEEP<br />CURIOUS</span></div>
            </div>
          </div>
        </section>

        <section id="resume" className="space-section resume-space">
          <div className="space-section__inner resume-layout">
            <SectionMarker index="04" title="RESUME / 简历轨道" caption="THE PATH SO FAR" />
            <div className="resume-copy"><p className="section-kicker">A DOCUMENT IN MOTION</p><h2>想知道我<br /><em>走过哪些轨道？</em></h2><p className="section-body">打开简历，查看我的教育背景、经历与正在探索的方向。</p><a className="glow-button glow-button--inline" href="./space/xu-yuxing-resume.pdf" download>下载 PDF 简历 <span>↓</span></a></div>
            <a className="resume-card" href="./space/xu-yuxing-resume.pdf" download aria-label="下载徐宇星 PDF 简历"><div className="resume-card__top"><span>CURRICULUM VITAE</span><span>2026</span></div><div className="resume-card__title">XU<br />YUXING</div><div className="resume-card__orbit" aria-hidden="true"><span /></div><div className="resume-card__bottom"><span>PDF / 01</span><strong>DOWNLOAD ↘</strong></div></a>
          </div>
        </section>

        <section id="contact" className="space-section contact-space">
          <div className="contact-space__constellation" aria-hidden="true" />
          <div className="space-section__inner"><SectionMarker index="05" title="CONTACT / 与我联络" caption="LET'S MAKE A NEW ORBIT" /><div className="contact-main"><p className="section-kicker">THE NEXT COORDINATE IS WAITING</p><h2>一起把<br /><em>下一颗星点亮。</em></h2><a className="contact-mail" href="mailto:hello@xuyuxing.space">hello@xuyuxing.space <span>↗</span></a></div><footer className="space-footer"><span>XU YUXING / 徐宇星</span><span>PERSONAL STAR MAP · 2026</span><a href="#top">BACK TO TOP ↑</a></footer></div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
