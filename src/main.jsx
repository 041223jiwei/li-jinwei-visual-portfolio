import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const media = (name) => `./media/${name}`;

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

const archive = [
  ["果味角色实验", "fruit-peach.webp", "CHARACTER"],
  ["缤纷水果蛋糕店", "fruit-strawberry.webp", "GAME IP"],
  ["赛博都市镜头", "ldrobots-01.webp", "SCI-FI"],
  ["蓝色智能生命", "ldrobots-03.webp", "CONCEPT"],
  ["远星殖民地", "ldrobots-04.webp", "WORLD"],
  ["雨夜机械对决", "transformers-04.webp", "SEQUENCE"],
  ["城市战争", "transformers-03.webp", "SEQUENCE"],
  ["荒漠变形镜头", "transformers-02.webp", "SEQUENCE"],
  ["哥特庄园叙事", "wuthering-01.webp", "CINEMA"],
  ["呼啸山庄", "wuthering-03.webp", "CINEMA"],
  ["小钱包装与导视", "xiaoqian-03.webp", "WAYFINDING"],
  ["小钱空间应用", "xiaoqian-05.webp", "PACKAGING"],
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
        context.arc(x, y, point.radius + Math.sin(time * 0.002 + point.seed), 0, Math.PI * 2);
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
        <video controls autoPlay playsInline src={media(item.src)} />
      ) : (
        <img src={media(item.src)} alt={item.alt} />
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

function App() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  const filteredArchive = useMemo(() => {
    if (filter === "ALL") return archive;
    return archive.filter(([, , type]) => type === filter);
  }, [filter]);

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

  const filters = ["ALL", "CHARACTER", "SCI-FI", "CONCEPT", "SEQUENCE", "CINEMA", "PACKAGING"];

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
            ARCHIVE
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

        <section id="archive" className="archive-section reveal">
          <div className="section-label section-label--light">
            <span>A—Z</span>
            <span>VISUAL ARCHIVE / 视觉档案</span>
          </div>
          <div className="archive-head">
            <h2>MORE WORLDS<br />IN PROGRESS.</h2>
            <p>
              这里保留角色、电影序列、包装与世界观练习。点击任意图像可进入全屏观看。
            </p>
          </div>
          <div className="archive-filters" role="group" aria-label="筛选视觉档案">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "is-active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="archive-grid">
            {filteredArchive.map(([title, image, type], index) => (
              <button
                type="button"
                className="archive-item"
                key={`${title}-${image}`}
                onClick={() => setModal({ src: image, alt: title, kind: "image" })}
              >
                <img src={media(image)} alt={title} />
                <span className="archive-item__meta">
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <b>{title}</b>
                  <em>{type}</em>
                </span>
              </button>
            ))}
          </div>
        </section>

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
