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
const roomPreview = document.querySelector(".room-preview");
const controlCards = document.querySelectorAll(".control-card");
const detailDialog = document.querySelector("#detail-dialog");
const consultDialog = document.querySelector("#consult-dialog");
const detailTitle = document.querySelector("#detail-title");
const detailCopy = document.querySelector("#detail-copy");
const detailKicker = document.querySelector("#detail-kicker");
const detailPoints = document.querySelector("#detail-points");
const detailButtons = document.querySelectorAll("[data-detail]");
const consultButtons = document.querySelectorAll(".open-consult");
const closeButtons = document.querySelectorAll(".dialog-close");

document.documentElement.classList.add("js-enabled");

const scenes = {
  arrival: {
    kicker: "回家模式",
    title: "门锁识别你回家，客厅已经准备好",
    copy: "玄关灯自动亮起，窗帘打开到合适角度，空调调到舒适温度，安防状态切换为在家模式。",
    status: ["灯光 68%", "空调 24°C", "安防 在家"],
  },
  movie: {
    kicker: "观影模式",
    title: "一键进入私人影院氛围",
    copy: "主灯缓慢降低，窗帘关闭，投影与音响启动，门铃和普通提醒自动转为低打扰模式。",
    status: ["灯光 18%", "窗帘 关闭", "影音 已启动"],
  },
  sleep: {
    kicker: "睡眠模式",
    title: "入睡后，家自动进入安静守护",
    copy: "卧室保持微弱夜灯，公共区域关闭，空调转入睡眠曲线，夜间起身会自动点亮地脚灯。",
    status: ["夜灯 开启", "空调 睡眠", "走廊 感应"],
  },
  away: {
    kicker: "离家模式",
    title: "离家不需要反复检查",
    copy: "门窗状态自动检查，灯光和空调关闭，摄像头与门磁进入布防，异常情况即时推送。",
    status: ["门窗 已检查", "能源 节省", "安防 布防"],
  },
};

const details = {
  lighting: {
    kicker: "智能灯光系统",
    title: "智能灯光系统",
    copy: "根据自然光、时间和生活场景自动调整亮度与色温。观影时降低主灯，阅读时加强局部光，夜间起身只点亮地脚灯。",
    points: ["自动调光", "色温场景", "节能联动"],
  },
  curtain: {
    kicker: "智能窗帘系统",
    title: "智能窗帘与采光",
    copy: "系统会根据日照、温度和隐私需求调整窗帘角度。早晨柔和打开，离家自动关闭，降低室内热量进入。",
    points: ["日照判断", "隐私保护", "温度联动"],
  },
  security: {
    kicker: "全屋安防系统",
    title: "全屋安防守护",
    copy: "门锁、门磁、人体感应与摄像头联动。离家后自动布防，异常开门、移动或门窗未关都会即时提醒。",
    points: ["离家布防", "异常提醒", "门窗检测"],
  },
};

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a, button")) {
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

controlCards.forEach((card) => {
  card.addEventListener("click", () => {
    controlCards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");

    roomPreview.classList.remove("is-lights", "is-climate", "is-security");
    roomPreview.classList.add(`is-${card.dataset.mode}`);
  });
});

detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const detail = details[button.dataset.detail];

    detailKicker.textContent = detail.kicker;
    detailTitle.textContent = detail.title;
    detailCopy.textContent = detail.copy;
    detailPoints.innerHTML = detail.points.map((point) => `<span>${point}</span>`).join("");
    detailDialog.showModal();
  });
});

consultButtons.forEach((button) => {
  button.addEventListener("click", () => {
    consultDialog.showModal();
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

document.querySelectorAll("dialog a").forEach((link) => {
  link.addEventListener("click", () => {
    link.closest("dialog").close();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    detailDialog.close();
    consultDialog.close();
  }
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
