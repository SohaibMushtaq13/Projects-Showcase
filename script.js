document.addEventListener("DOMContentLoaded", () => {
      gsap.registerPlugin(ScrollTrigger);

      const projectGrid = document.getElementById("projectGrid");
      const addProjectBtn = document.getElementById("addProjectBtn");
      const addProjectModal = document.getElementById("addProjectModal");
      const addProjectClose = document.getElementById("addProjectClose");
      const addProjectForm = document.getElementById("addProjectForm");

      // --------------------------
      // ✅ Project Data (Dynamic)
      // --------------------------
      const projects = [
        {
          title: "Student Timetable Generator",
          img: "./Assets/image.png",
          desc: "Interactive Student Timetable A responsive weekly scheduling app built with React and Tailwind CSS.",
          live: "https://sohaibmushtaq13.github.io/Interactive-timetable/",
          github: "https://github.com/SohaibMushtaq13/Interactive-timetable",
          category: "web"
        },
        {
          title: "Family-Budget-Tracker",
          img: "./Assets/Screenshot 2025-08-25 170004.png",
          desc: "Family Budget Tracker is a simple and intuitive web app for managing household finances.",
          live: "https://sohaibmushtaq13.github.io/Family-Budget-Tracker/",
          github: "https://github.com/SohaibMushtaq13/Family-Budget-Tracker",
          category: "web"
        },
        {
          title: "Prompt Vault",
          img: "./Assets/Prompt Vault.png",
          desc: "Prompt Vault is a curated collection of high-quality AI prompts for text, image, and creative workflows.",
          live: "https://sohaibmushtaq13.github.io/Prompt-Vault/",
          github: "https://github.com/SohaibMushtaq13/Prompt-Vault",
          category: "web"
        },
        {
          title: "Deadline Unifier",
          img: "./Assets/Deadline Unifier.png",
          desc: "Deadline Unifier centralizes all your due dates into a single, easy-to-use dashboard.",
          live: "https://sohaibmushtaq13.github.io/Deadline-Unifier/",
          github: "https://github.com/SohaibMushtaq13/Deadline-Unifier",
          category: "web"
        }
      ];

      // --------------------------
      // ✅ Render Projects
      // --------------------------
      function renderProjects() {
        projectGrid.innerHTML = "";
        projects.forEach((project) => {
          const article = document.createElement("article");
          article.className = "project-card";
          article.dataset.category = project.category;
          article.dataset.modalTitle = project.title;
          article.dataset.modalImg = project.img;
          article.dataset.modalDesc = project.desc;
          article.dataset.modalLive = project.live;
          article.dataset.modalGithub = project.github;

          article.innerHTML = `
            <div class="project-card__image-container">
              <img src="${project.img}" alt="${project.title}" class="project-card__image" />
              <div class="project-card__overlay">
                <div class="project-card__view-btn">View Project</div>
              </div>
            </div>
            <div class="project-card__content">
              <h3 class="project-card__title">${project.title}</h3>
              <p class="project-card__description">${project.desc}</p>
            </div>
          `;

          projectGrid.appendChild(article);
        });

        attachModalEvents();
        ScrollTrigger.refresh();
      }

      renderProjects();

      // --------------------------
      // ✅ GSAP Animation
      // --------------------------
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".project-grid",
          start: "top 80%",
        },
        y: 50,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // --------------------------
      // ✅ Modal for Viewing Project
      // --------------------------
      const modal = document.getElementById("projectModal");
      const modalCloseBtn = document.querySelector("#projectModal .modal__close");

      const modalImage = document.getElementById("modalImage");
      const modalTitle = document.getElementById("modalTitle");
      const modalDescription = document.getElementById("modalDescription");
      const modalLiveLink = document.getElementById("modalLiveLink");
      const modalGithubLink = document.getElementById("modalGithubLink");

      function attachModalEvents() {
        const projectCards = document.querySelectorAll(".project-card");
        projectCards.forEach((card) => {
          card.addEventListener("click", () => {
            modalImage.src = card.dataset.modalImg;
            modalTitle.textContent = card.dataset.modalTitle;
            modalDescription.textContent = card.dataset.modalDesc;

            modalLiveLink.href = card.dataset.modalLive || "#";
            modalGithubLink.href = card.dataset.modalGithub || "#";

            modal.style.display = "block";
            document.body.classList.add("modal-open");
          });
        });
      }

      const closeModal = () => {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
      };

      modalCloseBtn.addEventListener("click", closeModal);
      window.addEventListener("click", (event) => {
        if (event.target == modal) closeModal();
      });
      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal();
      });

      // --------------------------
      // ✅ Admin Mode
      // --------------------------
      const isAdmin = window.location.search.includes("admin=true");
      if (isAdmin) {
        addProjectBtn.style.display = "block";
      }

      addProjectBtn.addEventListener("click", () => {
        addProjectModal.style.display = "block";
      });

      addProjectClose.addEventListener("click", () => {
        addProjectModal.style.display = "none";
      });

      addProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("projectTitle").value;
        const desc = document.getElementById("projectDesc").value;
        const img = document.getElementById("projectImg").value;
        const live = document.getElementById("projectLive").value;
        const github = document.getElementById("projectGithub").value;

        projects.push({
          title,
          img,
          desc,
          live,
          github,
          category: "web"
        });

        renderProjects();
        addProjectModal.style.display = "none";
        addProjectForm.reset();
      });
    });