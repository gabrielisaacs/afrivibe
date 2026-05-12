(() => {
  const initBackToTop = () => {
    if (document.querySelector(".back-to-top")) {
      return;
    }

    const body = document.body;
    if (!body) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Back to top");
    button.setAttribute("aria-hidden", "true");
    button.setAttribute("tabindex", "-1");

    const icon = document.createElement("img");
    icon.className = "back-to-top__icon";
    icon.src = "Assets/chevron%20right.svg";
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");

    button.appendChild(icon);
    body.appendChild(button);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const visibilityOffset = 320;
    let isTicking = false;

    const updateBackToTop = () => {
      const shouldShow = window.scrollY >= visibilityOffset;
      button.classList.toggle("back-to-top--visible", shouldShow);
      button.setAttribute("aria-hidden", shouldShow ? "false" : "true");
      button.setAttribute("tabindex", shouldShow ? "0" : "-1");
    };

    button.addEventListener("click", () => {
      const behavior = prefersReducedMotion.matches ? "auto" : "smooth";
      window.scrollTo({ top: 0, behavior });
    });

    window.addEventListener(
      "scroll",
      () => {
        if (isTicking) return;
        isTicking = true;
        window.requestAnimationFrame(() => {
          updateBackToTop();
          isTicking = false;
        });
      },
      { passive: true }
    );

    updateBackToTop();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBackToTop);
  } else {
    initBackToTop();
  }
})();
