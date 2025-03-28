document.addEventListener("DOMContentLoaded", () => {
  // Variables
  let activeSection = "bio"
  let isLoading = true
  let isMobile = window.innerWidth < 768
  let isMobileMenuOpen = false

  // DOM Elements
  const loader = document.getElementById("loader")
  const progressBar = document.getElementById("progress-bar")
  const progressText = document.getElementById("progress-text")
  const loadingText = document.getElementById("loading-text")
  const contentContainer = document.getElementById("content-container")
  const desktopNav = document.getElementById("desktop-nav")
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const navButtons = document.querySelectorAll(".nav-btn")
  const mobileNavButtons = document.querySelectorAll(".mobile-nav-btn")
  const sections = document.querySelectorAll(".section-content")
  const cursorDot = document.getElementById("cursor-dot")
  const cursorGlow = document.getElementById("cursor-glow")

  // Check if touch device
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  // Loader animation
  let progress = 0
  let dots = ""

  // Dummy updateScene function (replace with your actual implementation)
  function updateScene(sectionId) {
    console.log(`Updating 3D scene for section: ${sectionId}`)
    // Add your 3D scene update logic here
  }

  const progressInterval = setInterval(() => {
    progress += 1
    progressBar.style.width = `${progress}%`
    progressText.textContent = `${progress}%`

    if (progress >= 100) {
      clearInterval(progressInterval)
      clearInterval(textInterval)

      // Hide loader and show content
      setTimeout(() => {
        loader.classList.add("fade-out")
        setTimeout(() => {
          loader.style.display = "none"
          isLoading = false

          // Show navigation and first section
          desktopNav.style.opacity = "1"
          desktopNav.style.transform = "translateY(0)"

          if (isMobile) {
            mobileMenuBtn.style.opacity = "1"
          }

          // Show bio section by default
          const bioSection = document.getElementById("bio")
          bioSection.classList.remove("hidden")
          bioSection.style.opacity = "1"
          bioSection.style.transform = "translateY(0)"

          // Initialize custom cursor if not a touch device
          if (!isTouchDevice) {
            initCustomCursor()
          }
        }, 500)
      }, 500)
    }
  }, 30)

  const textInterval = setInterval(() => {
    dots = dots.length >= 3 ? "" : dots + "."
    loadingText.textContent = `Loading${dots}`
  }, 500)

  // Navigation
  function setActiveSection(sectionId) {
    // Update active section
    activeSection = sectionId

    // Update navigation buttons
    navButtons.forEach((btn) => {
      if (btn.dataset.section === sectionId) {
        btn.classList.add("bg-primary", "text-white", "shadow-[0_0_15px_rgba(139,92,246,0.5)]")
        btn.classList.remove("text-white", "hover:bg-white/10", "hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]")
      } else {
        btn.classList.remove("bg-primary", "text-white", "shadow-[0_0_15px_rgba(139,92,246,0.5)]")
        btn.classList.add("text-white", "hover:bg-white/10", "hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]")
      }
    })

    // Update mobile navigation buttons
    mobileNavButtons.forEach((btn) => {
      if (btn.dataset.section === sectionId) {
        btn.classList.add("bg-primary", "text-white", "shadow-[0_0_15px_rgba(139,92,246,0.5)]")
        btn.classList.remove("text-white", "hover:bg-white/10")
      } else {
        btn.classList.remove("bg-primary", "text-white", "shadow-[0_0_15px_rgba(139,92,246,0.5)]")
        btn.classList.add("text-white", "hover:bg-white/10")
      }
    })

    // Hide all sections and show the active one
    sections.forEach((section) => {
      if (section.id === sectionId) {
        section.classList.remove("hidden")
        setTimeout(() => {
          section.style.opacity = "1"
          section.style.transform = "translateY(0)"
        }, 50)
      } else {
        section.style.opacity = "0"
        section.style.transform = "translateY(10px)"
        setTimeout(() => {
          section.classList.add("hidden")
        }, 500)
      }
    })

    // Update 3D scene
    updateScene(sectionId)

    // Close mobile menu if open
    if (isMobileMenuOpen) {
      toggleMobileMenu()
    }
  }

  // Add event listeners to navigation buttons
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveSection(btn.dataset.section)
    })
  })

  // Add event listeners to mobile navigation buttons
  mobileNavButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveSection(btn.dataset.section)
    })
  })

  // Mobile menu toggle
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen

    if (isMobileMenuOpen) {
      mobileMenu.style.display = "flex"
      setTimeout(() => {
        mobileMenu.style.opacity = "1"
      }, 50)

      // Change button icon to X
      mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `
    } else {
      mobileMenu.style.opacity = "0"
      setTimeout(() => {
        mobileMenu.style.display = "none"
      }, 500)

      // Change button icon to menu
      mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `
    }
  }

  mobileMenuBtn.addEventListener("click", toggleMobileMenu)

  // Window resize event
  window.addEventListener("resize", () => {
    isMobile = window.innerWidth < 768
  })

  // Custom cursor
  function initCustomCursor() {
    if (isTouchDevice) return

    cursorDot.classList.remove("hidden")
    cursorGlow.classList.remove("hidden")

    document.body.style.cursor = "none"

    document.addEventListener("mousemove", (e) => {
      cursorDot.style.left = `${e.clientX}px`
      cursorDot.style.top = `${e.clientY}px`

      cursorGlow.style.left = `${e.clientX}px`
      cursorGlow.style.top = `${e.clientY}px`
    })

    document.addEventListener("mousedown", () => {
      cursorDot.style.transform = "scale(1.5)"
      cursorDot.style.opacity = "0.8"
    })

    document.addEventListener("mouseup", () => {
      cursorDot.style.transform = "scale(1)"
      cursorDot.style.opacity = "0.5"
    })

    // Add hover effect to buttons and links
    const interactiveElements = document.querySelectorAll("button, a")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "scale(1.5)"
        cursorDot.style.backgroundColor = "rgba(145, 94, 255, 0.8)"
      })

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "scale(1)"
        cursorDot.style.backgroundColor = "rgba(145, 94, 255, 0.5)"
      })
    })
  }
})

