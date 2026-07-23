import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { workLibrary } from "./workLibrary";

const media = (name) => `./media/${name}`;
const asset = (name) => (name.startsWith("./library/") ? name : media(name));

const skills = [
  "AIGC 概念视觉",
  "品牌视觉 / VIS",
  "摄影与后期",
  "三维资产制作",
  "交互与网页设计",
  "文化 IP 文创",
];

const toolGroups = [
  ["PHOTOSHOP", "ILLUSTRATOR", "LIGHTROOM", "PREMIERE"],
  ["MAYA", "ZBRUSH", "3D ASSET"],
  ["CODEX", "REACT", "VITE", "FRAMER MOTION"],
  ["MIDJOURNEY", "CHATGPT", "AIGC WORKFLOW"],
];

const projects = [
  {
    id: "fansai",
    no: "01",
    type: "DIGITAL IDENTITY",
    title: "FansAI Living Portal",
    subtitle: "让智能成为故事生长的入口",
    year: "2026",
    theme: "signal",
    summary:
      "以“计算生物学 × AI 门户”为概念原点，将字标、品牌符号、色彩与四阶段动态叙事整合成可交互的品牌体验网站。",
    role: "品牌概念 / 视觉识别 / 动效系统 / 前端实现",
    tags: ["BRAND SYSTEM", "MOTION", "REACT"],
    hero: "fansai-hero.webp",
    gallery: [
      "fansai-motion-lab.webp",
      "fansai-motion-01.webp",
      "fansai-motion-02.webp",
      "fansai-motion-03.webp",
      "fansai-motion-04.webp",
    ],
    video: "fansai-signal-reveal.mp4",
    live: "https://041223jiwei.github.io/fansai-living-portal/",
    code: "https://github.com/041223jiwei/fansai-living-portal",
  },
  {
    id: "invitation",
    no: "02",
    type: "INTERACTION DESIGN",
    title: "A Date With My Little Star",
    subtitle: "从一张邀约，到共同完成一次约会",
    year: "2026",
    theme: "nocturne",
    summary:
      "围绕私人邀约、约会选择与共同计划设计完整体验。以星轨、票券、樱花粉和深夜墨色构建更具情绪价值的互动叙事。",
    role: "交互策略 / UI 设计 / React / Codex 辅助实现",
    tags: ["UX STORY", "WEB", "PROTOTYPE"],
    hero: "invitation-home.webp",
    gallery: ["invitation-system.webp", "invitation-prototype.webp"],
    live: "https://041223jiwei.github.io/invitation-experience-studio/",
    code: "https://github.com/041223jiwei/invitation-experience-studio",
  },
  {
    id: "onlystar",
    no: "03",
    type: "AIGC CONCEPT WORLD",
    title: "Only Star",
    subtitle: "在流星抵达之前，点亮一条温柔的路",
    year: "2026",
    theme: "blue",
    summary:
      "治愈系游戏世界观与关键场景概念设计。围绕夜空、风、灯火与迁徙路径建立统一的色彩脚本，并延展为动态镜头。",
    role: "世界观设定 / 场景概念 / 色彩脚本 / 动态生成",
    tags: ["CONCEPT ART", "AIGC", "MOTION"],
    hero: "onlystar-14.webp",
    gallery: [
      "onlystar-03.webp",
      "onlystar-06.webp",
      "onlystar-11.webp",
      "onlystar-15.webp",
    ],
    video: "onlystar-motion.mp4",
  },
  {
    id: "taotao",
    no: "04",
    type: "BRAND IDENTITY",
    title: "桃桃猴糖水铺",
    subtitle: "一口桃甜，满心欢喜",
    year: "2026",
    theme: "peach",
    summary:
      "以桃子与猴子形成高识别度角色符号，通过漫画爆炸框、粗描边字形和高饱和色彩，完成门店空间、包装与导视的统一表达。",
    role: "品牌定位 / IP 形象 / 包装与空间视觉",
    tags: ["VIS", "IP", "PACKAGING"],
    hero: "taotao-06.webp",
    gallery: [
      "taotao-01.webp",
      "taotao-02.webp",
      "taotao-03.webp",
      "taotao-04.webp",
      "taotao-05.webp",
      "taotao-07.webp",
    ],
  },
  {
    id: "guardian",
    no: "05",
    type: "CULTURAL IP",
    title: "雪山萌卫队",
    subtitle: "云境守护计划",
    year: "2026",
    theme: "ice",
    summary:
      "从雪域生态保护出发建立角色家族，完成形象规范、衍生周边、礼盒与快闪补给站，让文化议题转化为亲和的消费触点。",
    role: "文化研究 / 角色设计 / 文创延展 / 展陈视觉",
    tags: ["CULTURE", "CHARACTER", "MERCH"],
    hero: "guardian-01.webp",
    gallery: [
      "guardian-00.webp",
      "guardian-02.webp",
      "guardian-03.webp",
      "guardian-04.webp",
      "guardian-05.webp",
    ],
  },
  {
    id: "thrones",
    no: "06",
    type: "AIGC ART DIRECTION",
    title: "冰与火世界概念重构",
    subtitle: "从文本拆解到材质、氛围与镜头",
    year: "2026",
    theme: "ember",
    summary:
      "以史诗奇幻文本为起点，通过内容拆解、材质分析和关键帧生成建立寒冷、尺度与权力感并存的视觉世界。",
    role: "文本分析 / 材质研究 / 概念原画 / 动态镜头",
    tags: ["WORLD BUILDING", "AIGC", "ART DIRECTION"],
    hero: "thrones-04.webp",
    gallery: [
      "thrones-analysis.webp",
      "thrones-material.webp",
      "thrones-02.webp",
      "thrones-08.webp",
      "thrones-10.webp",
    ],
    video: "thrones-motion.mp4",
  },
  {
    id: "assets",
    no: "07",
    type: "3D ASSET",
    title: "三维资产制作",
    subtitle: "建模、雕刻、拓扑、材质与渲染",
    year: "2025—26",
    theme: "metal",
    summary:
      "围绕可落地的游戏资产流程，完成中模、ZBrush 雕刻、低模拓扑、UV、烘焙、Substance 材质与 Arnold 渲染。",
    role: "Maya / ZBrush / Substance Painter / Arnold",
    tags: ["MAYA", "ZBRUSH", "PBR"],
    hero: "hammer-02.webp",
    gallery: ["hammer-01.webp", "hammer-03.webp"],
  },
  {
    id: "photo",
    no: "08",
    type: "PHOTOGRAPHY / POSTER",
    title: "形与色的旅行",
    subtitle: "摄影记忆与编辑重构",
    year: "2024—26",
    theme: "paper",
    summary:
      "以旅行与城市观察为图像档案，通过色彩、颗粒、拼贴与文字层级将摄影转译为系列海报，建立从拍摄到编辑设计的完整链路。",
    role: "摄影 / 调色 / 海报设计 / 编辑排版",
    tags: ["PHOTO", "EDITORIAL", "POSTER"],
    hero: "poster-04.webp",
    gallery: [
      "poster-01.webp",
      "poster-02.webp",
      "poster-03.webp",
      "photo-01.webp",
      "photo-02.webp",
      "photo-03.webp",
      "photo-04.webp",
      "photo-05.webp",
      "photo-06.webp",
    ],
  },
];

function SignalCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    let frame = 0;
    let width = 0;
    let height = 0;
    let pointer = { x: 0.72, y: 0.42 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = Array.from({ length: reduced ? 18 : 42 }, (_, index) => ({
      seed: index * 1.913,
      radius: 0.8 + (index % 5) * 0.25,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event) => {
      pointer = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
    };

    const render = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const originX = width * (0.62 + (pointer.x - 0.5) * 0.08);
      const originY = height * (0.46 + (pointer.y - 0.5) * 0.08);

      points.forEach((point, index) => {
        const t = index / (points.length - 1);
        const wave = Math.sin(t * 10 + time * 0.0007 + point.seed) * height * 0.06;
        const x = originX + (t - 0.5) * width * 0.82;
        const y = originY + wave + Math.sin(point.seed * 4) * height * 0.18 * t;
        const alpha = 0.12 + (1 - Math.abs(t - 0.5) * 2) * 0.55;

        if (index > 0) {
          const previousT = (index - 1) / (points.length - 1);
          const previousX = originX + (previousT - 0.5) * width * 0.82;
          const previousY =
            originY +
            Math.sin(previousT * 10 + time * 0.0007 + points[index - 1].seed) *
              height *
              0.06 +
            Math.sin(points[index - 1].seed * 4) * height * 0.18 * previousT;
          context.beginPath();
          context.moveTo(previousX, previousY);
          context.lineTo(x, y);
          context.strokeStyle = `rgba(204, 255, 54, ${alpha * 0.44})`;
          context.lineWidth = 0.8;
          context.stroke();
        }

        context.beginPath();
        const animatedRadius = Math.max(
          0.35,
          point.radius + Math.sin(time * 0.002 + point.seed),
        );
        context.arc(x, y, animatedRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(204, 255, 54, ${alpha})`;
        context.fill();
      });

      if (!reduced) frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas className="signal-canvas" ref={ref} aria-hidden="true" />;
}

function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const started = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 250 : 1100;
    let frame;
    const tick = (now) => {
      const value = Math.min(100, Math.round(((now - started) / duration) * 100));
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
      else window.setTimeout(onDone, reduced ? 0 : 260);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <div className={`loader ${progress === 100 ? "loader--leave" : ""}`}>
      <div className="loader__meta">
        <span>PORTFOLIO SYSTEM</span>
        <span>CHANGSHA · CN</span>
      </div>
      <div className="loader__count">{String(progress).padStart(3, "0")}</div>
      <div className="loader__line">
        <i style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function TiltFrame({ children, className = "" }) {
  const ref = useRef(null);

  const move = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame = ref.current;
    const rect = frame.getBoundingClientRect();
    frame.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - 0.5) * -4}deg`);
    frame.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`);
  };

  const reset = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`tilt-frame ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}

function MediaModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;
    const close = (event) => event.key === "Escape" && onClose();
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", close);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="media-modal" role="dialog" aria-modal="true" aria-label="作品全屏预览">
      <button className="media-modal__close" type="button" onClick={onClose}>
        CLOSE ×
      </button>
      {item.kind === "video" ? (
        <video controls autoPlay playsInline src={asset(item.src)} />
      ) : (
        <img src={asset(item.src)} alt={item.alt} />
      )}
    </div>
  );
}

function ProjectSection({ project, onOpen }) {
  return (
    <article id={project.id} className={`project project--${project.theme} reveal`}>
      <div className="project__head">
        <div className="project__number">{project.no}</div>
        <div>
          <p className="eyebrow">{project.type}</p>
          <h2>{project.title}</h2>
          <p className="project__subtitle">{project.subtitle}</p>
        </div>
        <div className="project__year">{project.year}</div>
      </div>

      <button
        type="button"
        className="project__hero media-button"
        onClick={() => onOpen({ src: project.hero, alt: project.title, kind: "image" })}
        aria-label={`全屏查看 ${project.title}`}
      >
        <img loading="lazy" src={media(project.hero)} alt={project.title} />
        <span className="media-button__hint">OPEN FULLSCREEN ↗</span>
      </button>

      {project.live && (
        <div className="project__web-access" aria-label={`${project.title} 网页入口`}>
          <div>
            <span>LIVE WEB EXPERIENCE / 完整项目网页</span>
            <p>{project.live.replace(/^https?:\/\//, "")}</p>
          </div>
          <div className="project__web-actions">
            <a className="project__web-live" href={project.live} target="_blank" rel="noreferrer">
              OPEN LIVE SITE <Arrow />
            </a>
            {project.code && (
              <a href={project.code} target="_blank" rel="noreferrer">
                VIEW SOURCE <Arrow />
              </a>
            )}
          </div>
        </div>
      )}

      <div className="project__story">
        <p className="project__lead">{project.summary}</p>
        <div className="project__facts">
          <div>
            <span>ROLE / TOOLS</span>
            <p>{project.role}</p>
          </div>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {(project.live || project.code) && (
            <div className="project__links">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer">
                  LIVE SITE <Arrow />
                </a>
              )}
              {project.code && (
                <a href={project.code} target="_blank" rel="noreferrer">
                  SOURCE CODE <Arrow />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {project.video && (
        <button
          type="button"
          className="project__video media-button"
          onClick={() =>
            onOpen({ src: project.video, alt: `${project.title} motion`, kind: "video" })
          }
          aria-label={`播放 ${project.title} 动态视频`}
        >
          <video
            src={media(project.video)}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
          />
          <span className="media-button__hint">PLAY MOTION / 01</span>
        </button>
      )}

      <div className={`project__gallery gallery--${Math.min(project.gallery.length, 5)}`}>
        {project.gallery.map((image, index) => (
          <TiltFrame key={image} className="project__tile">
            <button
              type="button"
              className="media-button"
              onClick={() =>
                onOpen({
                  src: image,
                  alt: `${project.title} 作品图 ${index + 1}`,
                  kind: "image",
                })
              }
            >
              <img loading="lazy" src={media(image)} alt={`${project.title} 作品图 ${index + 1}`} />
              <span className="tile-index">{String(index + 1).padStart(2, "0")}</span>
            </button>
          </TiltFrame>
        ))}
      </div>
    </article>
  );
}

const libraryFilters = [
  ["ALL", "全部"],
  ["AIGC", "AIGC"],
  ["BRAND", "品牌"],
  ["3D", "三维"],
  ["PHOTOGRAPHY", "摄影"],
  ["POSTER", "海报"],
  ["MOTION", "动态"],
];

function WorkLibrary({ onOpen }) {
  const [active, setActive] = useState("ALL");

  const counts = useMemo(
    () =>
      workLibrary.reduce(
        (result, item) => {
          result.ALL += 1;
          result[item.category] = (result[item.category] || 0) + 1;
          return result;
        },
        { ALL: 0 },
      ),
    [],
  );

  const grouped = useMemo(() => {
    const selected =
      active === "ALL" ? workLibrary : workLibrary.filter((item) => item.category === active);

    return Array.from(
      selected.reduce((groups, item) => {
        const key = `${item.parentCategory}__${item.series}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(item);
        return groups;
      }, new Map()),
    );
  }, [active]);

  return (
    <section id="archive" className="archive-section">
      <div className="section-label section-label--light">
        <span>001—249</span>
        <span>COMPLETE WORK LIBRARY / 全部作品分类库</span>
      </div>
      <div className="archive-head">
        <h2>
          THE FULL
          <br />
          VISUAL INDEX.
        </h2>
        <div>
          <p>
            239 张作品图像与 10 段动态影像，按媒介和系列完整归档。所有作品保持原始比例，
            仅在全屏查看时进行细节放大。
          </p>
          <strong>{String(workLibrary.length).padStart(3, "0")} WORKS / 作品总数</strong>
        </div>
      </div>
      <div className="archive-filters" role="group" aria-label="筛选全部作品">
        {libraryFilters.map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={active === value ? "is-active" : ""}
            onClick={() => setActive(value)}
            aria-pressed={active === value}
          >
            {label} <span>{String(counts[value] || 0).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div className="library-groups">
        {grouped.map(([key, items], groupIndex) => (
          <section className="library-series" key={key}>
            <header className="library-series__head">
              <span>{String(groupIndex + 1).padStart(2, "0")}</span>
              <h3>{items[0].series}</h3>
              <p>
                {items[0].parentCategory} / {String(items.length).padStart(2, "0")} WORKS
              </p>
            </header>
            <div className="library-grid">
              {items.map((item, index) => (
                <article className="library-item" key={`${item.id}-${item.src}`}>
                  {item.kind === "video" ? (
                    <div className="library-item__visual library-item__visual--video">
                      <video
                        controls
                        muted
                        playsInline
                        preload="metadata"
                        src={item.src}
                        aria-label={item.title}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onOpen({ src: item.src, alt: item.title, kind: item.kind })
                        }
                      >
                        FULLSCREEN ↗
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="library-item__visual"
                      onClick={() =>
                        onOpen({ src: item.src, alt: item.title, kind: item.kind })
                      }
                      aria-label={`全屏查看 ${item.title}`}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={item.src}
                        alt={item.title}
                        width={item.width}
                        height={item.height}
                      />
                      <span>DETAIL VIEW ↗</span>
                    </button>
                  )}
                  <div className="library-item__meta">
                    <i>{String(index + 1).padStart(2, "0")}</i>
                    <b>{item.title}</b>
                    <em>{item.category}</em>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((element) => reveal.observe(element));

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      progressRef.current?.style.setProperty("--progress", value);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      reveal.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className="page-progress" ref={progressRef} />
      <header className="site-header">
        <a className="site-mark" href="#top" aria-label="返回首页">
          LJW<span>®</span>
        </a>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="主导航">
          <a href="#work" onClick={() => setMenuOpen(false)}>
            WORK
          </a>
          <a href="#profile" onClick={() => setMenuOpen(false)}>
            PROFILE
          </a>
          <a href="#archive" onClick={() => setMenuOpen(false)}>
            LIBRARY
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            CONTACT
          </a>
        </nav>
        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </header>

      <main>
        <section id="top" className="hero">
          <SignalCanvas />
          <div className="hero__meta">
            <span>VISUAL COMMUNICATION</span>
            <span>CHANGSHA · CHINA</span>
            <span>PORTFOLIO / 2026</span>
          </div>
          <h1 className="hero__title" aria-label="李金维 Li Jinwei">
            <span className="hero__line hero__line--top">LI</span>
            <span className="hero__line hero__line--bottom">JINWEI</span>
          </h1>
          <div className="hero__works" aria-hidden="true">
            <div className="hero-card hero-card--one">
              <img src={media("onlystar-14.webp")} alt="" />
              <span>03 / AIGC WORLD</span>
            </div>
            <div className="hero-card hero-card--two">
              <img src={media("taotao-06.webp")} alt="" />
              <span>04 / BRAND IDENTITY</span>
            </div>
            <div className="hero-card hero-card--three">
              <img src={media("fansai-hero.webp")} alt="" />
              <span>01 / DIGITAL EXPERIENCE</span>
            </div>
          </div>
          <div className="hero__footer">
            <p>
              在品牌、图像、三维与交互之间，
              <br />
              让视觉成为可以进入的故事。
            </p>
            <a href="#work">SCROLL TO EXPLORE ↓</a>
          </div>
        </section>

        <section className="ticker" aria-label="专业领域">
          <div>
            BRAND IDENTITY <i>✦</i> AIGC CONCEPT <i>✦</i> DIGITAL EXPERIENCE <i>✦</i>{" "}
            3D ASSET <i>✦</i> PHOTOGRAPHY <i>✦</i> BRAND IDENTITY <i>✦</i> AIGC
            CONCEPT <i>✦</i>
          </div>
        </section>

        <section id="profile" className="profile-section reveal">
          <div className="section-label">
            <span>00</span>
            <span>PROFILE / 方法与能力</span>
          </div>
          <div className="profile-grid">
            <div className="profile-copy">
              <p className="eyebrow">ABOUT THE PRACTICE</p>
              <h2>
                FORM
                <br />
                IMAGE
                <br />
                <em>MOTION.</em>
              </h2>
            </div>
            <div className="profile-photo">
              <img src={media("profile.webp")} alt="李金维证件照" />
            </div>
            <div className="profile-text">
              <p className="profile-intro">
                我是李金维，长沙理工大学视觉传达设计专业本科生。关注品牌视觉、AIGC
                概念设计、摄影与三维资产，也将 Codex 与前端技术纳入设计表达。
              </p>
              <p>
                我习惯从内容结构与视觉母题出发，建立可延展的设计系统，再将它落实到平面、空间、动态与数字体验中。
              </p>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <div key={skill}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <b>{skill}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="tool-matrix">
            {toolGroups.map((group, index) => (
              <div key={group.join("-")}>
                <span>0{index + 1}</span>
                <p>{group.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="work-intro reveal">
          <div className="section-label">
            <span>01—08</span>
            <span>SELECTED WORKS / 精选项目</span>
          </div>
          <h2>
            EIGHT STORIES,
            <br />
            ONE VISUAL PRACTICE.
          </h2>
          <p>
            每个项目以不同媒介展开，但共享同一条线索：从信息与情绪中提炼视觉规则，再将规则延展成完整体验。
          </p>
        </section>

        {projects.map((project) => (
          <ProjectSection key={project.id} project={project} onOpen={setModal} />
        ))}

        <WorkLibrary onOpen={setModal} />

        <section id="contact" className="contact-section">
          <SignalCanvas />
          <div className="contact-top">
            <span>AVAILABLE FOR VISUAL DESIGN & DIGITAL EXPERIENCE</span>
            <span>2026—2027</span>
          </div>
          <p className="contact-kicker">LET’S MAKE THE NEXT</p>
          <h2>STORY<br />VISIBLE.</h2>
          <div className="contact-links">
            <a href="mailto:19192007602@163.com">
              19192007602@163.com <Arrow />
            </a>
            <a href="tel:+8619192007602">
              +86 191 9200 7602 <Arrow />
            </a>
            <a href="./Li-Jinwei-Portfolio-2026.pdf" download>
              DOWNLOAD PORTFOLIO <Arrow />
            </a>
            <a href="./Li-Jinwei-Resume.pdf" download>
              DOWNLOAD RESUME <Arrow />
            </a>
          </div>
          <footer>
            <span>李金维 / LI JINWEI</span>
            <span>VISUAL COMMUNICATION · CHANGSHA</span>
            <a href="#top">BACK TO TOP ↑</a>
          </footer>
        </section>
      </main>
      <MediaModal item={modal} onClose={() => setModal(null)} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
