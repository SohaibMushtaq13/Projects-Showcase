document.addEventListener("DOMContentLoaded", () => {
  // --- 1. GSAP SCROLL-BASED ANIMATIONS ---
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".project-grid",
      start: "top 80%",
    },
    y: 50,
    autoAlpha: 0,
    duration: 6,
    stagger: 0.2,
    ease: "power3.out",
  });

  // --- 2. FILTER BUTTON FUNCTIONALITY ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const categories = card.dataset.category.split(" ");

        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });

      ScrollTrigger.refresh();
    });
  });

  // --- 3. MODAL FUNCTIONALITY ---
  const modal = document.getElementById("projectModal");
  const modalCloseBtn = document.querySelector(".modal__close");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalLiveLink = document.getElementById("modalLiveLink");
  const modalGithubLink = document.getElementById("modalGithubLink");

  // Open modal when clicking on a project card
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      modalImage.src = card.dataset.modalImg;
      modalTitle.textContent = card.dataset.modalTitle;
      modalDescription.textContent = card.dataset.modalDesc;

      const liveLink = card.dataset.modalLive;
      if (liveLink) {
        modalLiveLink.href = liveLink;
        modalLiveLink.style.display = "inline-flex";
      } else {
        modalLiveLink.style.display = "none";
      }

      const githubLink = card.dataset.modalGithub;
      if (githubLink) {
        modalGithubLink.href = githubLink;
        modalGithubLink.style.display = "inline-flex";
      } else {
        modalGithubLink.style.display = "none";
      }

      modal.style.display = "block";
      document.body.classList.add("modal-open");
    });
  });

  // Close modal function
  const closeModal = () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  };

  modalCloseBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
