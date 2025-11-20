const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;
const introLoader = document.getElementById("intro-loader");
const introTextEl = document.getElementById("intro-text");

if (introLoader && introTextEl) {
  const introMessage = "Sagi Nevet";
  let introIndex = 0;
  let timeoutId = null;

  const removeLoader = () => {
    introLoader.classList.add("hide");
    setTimeout(() => {
      if (introLoader.parentNode) {
        introLoader.remove();
      }
    }, 500);
  };

  const typeNext = () => {
    if (introIndex < introMessage.length) {
      introTextEl.textContent += introMessage[introIndex];
      introIndex += 1;
      timeoutId = setTimeout(typeNext, 140);
    } else {
      removeLoader();
    }
  };

  setTimeout(typeNext, 400);
  
  setTimeout(() => {
    if (introLoader && introLoader.parentNode) {
      removeLoader();
    }
  }, 5000);
} else if (introLoader) {
  introLoader.remove();
}

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("show");
});

navAnchors.forEach((anchor) =>
  anchor.addEventListener("click", () => {
    navLinks?.classList.remove("show");
  })
);

const prefersLight = window.matchMedia("(prefers-color-scheme: light)");
const mobileQuery = window.matchMedia("(max-width: 1024px)");
const mobileRegex = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i;
let userThemeOverride = null;

const applyTheme = (isLight) => {
  body.classList.toggle("light", isLight);
};

const isMobileDevice = () => mobileQuery.matches || mobileRegex.test(navigator.userAgent || "");

const setInitialTheme = () => {
  if (userThemeOverride !== null) {
    applyTheme(userThemeOverride === "light");
    return;
  }

  if (isMobileDevice()) {
    applyTheme(false);
  } else {
    applyTheme(prefersLight.matches);
  }
};

setInitialTheme();

prefersLight.addEventListener("change", (event) => {
  if (userThemeOverride === null && !isMobileDevice()) {
    applyTheme(event.matches);
  }
});

mobileQuery.addEventListener("change", () => {
  if (userThemeOverride === null) {
    setInitialTheme();
  }
});

window.addEventListener("resize", () => {
  if (userThemeOverride === null) {
    setInitialTheme();
  }
});

window.addEventListener("orientationchange", () => {
  if (userThemeOverride === null) {
    setInitialTheme();
  }
});

themeToggle?.addEventListener("click", () => {
  const nextIsLight = !body.classList.contains("light");
  applyTheme(nextIsLight);
  userThemeOverride = nextIsLight ? "light" : "dark";
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealEls = document.querySelectorAll(".reveal");

if (!reduceMotion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "50px" }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

const checkVisibleOnLoad = () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      const revealParent = target.closest(".reveal") || target;
      if (revealParent && revealParent.classList.contains("reveal")) {
        revealParent.classList.add("visible");
      }
      setTimeout(() => {
        const allInSection = revealParent.querySelectorAll(".reveal");
        allInSection.forEach((el) => el.classList.add("visible"));
      }, 100);
    }
  }
};

window.addEventListener("load", checkVisibleOnLoad);
checkVisibleOnLoad();

const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
  const toggleBackToTop = () => {
    if (window.scrollY > 200) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  };

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", toggleBackToTop);
  document.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();
}

document.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const scrolled = window.scrollY;
  header.style.backgroundPositionY = `${scrolled * 0.1}px`;
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "") return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = 80;
      
      const revealParent = target.closest(".reveal") || target;
      const sectionParent = target.closest("section") || target.closest(".panel");
      
      if (revealParent && revealParent.classList.contains("reveal")) {
        revealParent.classList.add("visible");
        revealParent.style.opacity = "1";
        revealParent.style.visibility = "visible";
      }
      
      if (sectionParent) {
        sectionParent.style.opacity = "1";
        sectionParent.style.visibility = "visible";
        sectionParent.style.display = "";
        const allReveals = sectionParent.querySelectorAll(".reveal");
        allReveals.forEach((el) => {
          el.classList.add("visible");
          el.style.opacity = "1";
          el.style.visibility = "visible";
        });
      }
      
      const allInSection = (revealParent || target).querySelectorAll(".reveal");
      allInSection.forEach((el) => {
        el.classList.add("visible");
        el.style.opacity = "1";
        el.style.visibility = "visible";
      });
      
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      
      setTimeout(() => {
        if (sectionParent) {
          sectionParent.style.opacity = "1";
          sectionParent.style.visibility = "visible";
          const allRevealsAfter = sectionParent.querySelectorAll(".reveal");
          allRevealsAfter.forEach((el) => {
            el.classList.add("visible");
            el.style.opacity = "1";
            el.style.visibility = "visible";
          });
        }
      }, 300);
    }
  });
});

