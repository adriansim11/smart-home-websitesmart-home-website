const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector(".contact-form");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const sceneTabs = document.querySelectorAll(".scene-tab");
const sceneTitle = document.querySelector("#scene-title");
const sceneCopy = document.querySelector("#scene-copy");
const sceneKicker = document.querySelector(".scene-kicker");
const sceneStatus = document.querySelector(".scene-status");

const scenes = {
  arrival: {
    kicker: "Arrival Mode",
    title: "门锁识别你回家，客厅已经准备好",
    copy: "玄关灯自动亮起，窗帘打开到合适角度，空调调到舒适温度，安防状态切换为在家模式。",
    status: ["灯光 68%", "空调 24°C", "安防 在家"],
  },
  movie: {
    kicker: "Cinema Mode",
    title: "一键进入私人影院氛围",
    copy: "主灯缓慢降低，窗帘关闭，投影与音响启动，门铃和普通提醒自动转为低打扰模式。",
    status: ["灯光 18%", "窗帘 关闭", "影音 已启动"],
  },
  sleep: {
    kicker: "Sleep Mode",
    title: "入睡后，家自动进入安静守护",
    copy: "卧室保持微弱夜灯，公共区域关闭，空调转入睡眠曲线，夜间起身会自动点亮地脚灯。",
    status: ["夜灯 开启", "空调 睡眠", "走廊 感应"],
  },
  away: {
    kicker: "Away Mode",
    title: "离家不需要反复检查",
    copy: "门窗状态自动检查，灯光和空调关闭，摄像头与门磁进入布防，异常情况即时推送。",
    status: ["门窗 已检查", "能源 节省", "安防 布防"],
  },
};

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

sceneTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const scene = scenes[tab.dataset.scene];

    sceneTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");

    sceneKicker.textContent = scene.kicker;
    sceneTitle.textContent = scene.title;
    sceneCopy.textContent = scene.copy;
    sceneStatus.innerHTML = scene.status.map((item) => `<span class="status-pill">${item}</span>`).join("");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.count);
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        counter.textContent = Math.floor(progress * target);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(counter);
    });
  },
  { threshold: 0.8 }
);

counters.forEach((counter) => countObserver.observe(counter));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("预约已记录。后期可以接入 WhatsApp、邮件或真实后台。");
  contactForm.reset();
});
