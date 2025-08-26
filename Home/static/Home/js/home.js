// Particle System Class - Define this FIRST
class ParticleSystem {
  constructor(canvas) {
    if (!canvas) {
      console.warn("Canvas element not found for ParticleSystem")
      return
    }

    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.particles = []
    this.particleCount = 100

    this.resize()
    this.createParticles()
    this.animate()

    window.addEventListener("resize", () => this.resize())
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle, index) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1

      // Draw particle
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`
      this.ctx.fill()

      // Draw connections
      this.particles.slice(index + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          this.ctx.beginPath()
          this.ctx.moveTo(particle.x, particle.y)
          this.ctx.lineTo(otherParticle.x, otherParticle.y)
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`
          this.ctx.lineWidth = 1
          this.ctx.stroke()
        }
      })
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Terminal simulation
class TerminalSimulator {
  constructor() {
    this.commandText = document.getElementById("command-text")
    this.terminalOutput = document.getElementById("terminal-output")
    this.cursor = document.getElementById("cursor")
    this.terminalContainer = document.getElementById("terminal-container")
    this.portfolioContainer = document.getElementById("portfolio-container")

    this.command = "python manage.py runportfolio"
    this.currentIndex = 0
    this.isTyping = false

    this.logs = [
      { text: "Watching for file changes with StatReloader...", type: "info", delay: 500 },
      { text: "Performing system checks...", type: "info", delay: 800 },
      { text: "System check identified no issues (0 silenced).", type: "success", delay: 1000 },
      { text: "Starting development server at http://127.0.0.1:8000/", type: "success", delay: 1200 },
      { text: "Press CTRL+C to quit", type: "info", delay: 1500 },
      { text: "Loading Shishir Khatri's Portfolio...", type: "warning", delay: 2000 },
      { text: "████████████████████████████████ 100%", type: "success", delay: 3000 },
    ]

    this.init()
  }

  init() {
    setTimeout(() => {
      this.typeCommand()
    }, 1000)
  }

  typeCommand() {
    this.isTyping = true
    this.cursor.style.display = "inline"

    const typeInterval = setInterval(() => {
      if (this.currentIndex < this.command.length) {
        this.commandText.textContent += this.command[this.currentIndex]
        this.currentIndex++
      } else {
        clearInterval(typeInterval)
        this.cursor.style.display = "none"
        this.executeCommand()
      }
    }, 100)
  }

  executeCommand() {
    // Add new line after command
    const commandLine = document.createElement("div")
    commandLine.className = "terminal-line"
    commandLine.innerHTML = `<span class="prompt">shishir@dev:~/portfolio$</span> <span class="command">${this.command}</span>`
    this.terminalOutput.appendChild(commandLine)

    // Show logs with delays
    this.showLogs()
  }

  showLogs() {
    let totalDelay = 0

    this.logs.forEach((log, index) => {
      totalDelay += log.delay

      setTimeout(() => {
        const logLine = document.createElement("div")
        logLine.className = `log-line log-${log.type}`
        logLine.textContent = log.text
        logLine.style.animationDelay = "0s"
        this.terminalOutput.appendChild(logLine)

        // If this is the last log, transition to portfolio
        if (index === this.logs.length - 1) {
          setTimeout(() => {
            this.transitionToPortfolio()
          }, 1500)
        }
      }, totalDelay)
    })
  }

  transitionToPortfolio() {
    // Fade out terminal
    this.terminalContainer.classList.add("fade-out")

    setTimeout(() => {
      this.terminalContainer.style.display = "none"
      this.portfolioContainer.classList.remove("hidden")
      this.portfolioContainer.classList.add("visible")

      // Initialize portfolio animations
      this.initPortfolioAnimations()
    }, 500)
  }

  initPortfolioAnimations() {
    // Typing animation for name
    this.initTypingAnimation()

    // Animate sections on scroll
    this.initScrollAnimations()

    // Initialize smooth scrolling for navigation
    this.initSmoothScrolling()

    // Initialize contact form
    this.initContactForm()
  }

  initTypingAnimation() {
    const typingElement = document.querySelector(".typing-text")
    if (typingElement) {
      const text = typingElement.getAttribute("data-text")
      typingElement.textContent = ""

      let i = 0
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          typingElement.textContent += text.charAt(i)
          i++
        } else {
          clearInterval(typeInterval)
          // Remove cursor after typing is complete
          setTimeout(() => {
            typingElement.style.borderRight = "none"
          }, 1000)
        }
      }, 150)
    }
  }

  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(".section, .project-card, .skill-category, .timeline-item")
    elementsToAnimate.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })
  }

  initSmoothScrolling() {
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }

  initContactForm() {
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const submitBtn = contactForm.querySelector(".submit-btn")
        const originalText = submitBtn.innerHTML

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        submitBtn.disabled = true

        // Simulate form submission
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
          submitBtn.style.background = "var(--success-color)"

          // Reset form
          contactForm.reset()

          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.innerHTML = originalText
            submitBtn.style.background = "var(--text-accent)"
            submitBtn.disabled = false
          }, 3000)
        }, 2000)
      })
    }
  }
}

// Particle Background effect
class ParticleBackground {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.particles = []
    this.particleCount = 50

    this.init()
  }

  init() {
    this.canvas.style.position = "fixed"
    this.canvas.style.top = "0"
    this.canvas.style.left = "0"
    this.canvas.style.width = "100%"
    this.canvas.style.height = "100%"
    this.canvas.style.pointerEvents = "none"
    this.canvas.style.zIndex = "-1"
    this.canvas.style.opacity = "0.1"

    document.body.appendChild(this.canvas)

    this.resize()
    this.createParticles()
    this.animate()

    window.addEventListener("resize", () => this.resize())
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width
      if (particle.x > this.canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = this.canvas.height
      if (particle.y > this.canvas.height) particle.y = 0

      // Draw particle
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fillStyle = "#58a6ff"
      this.ctx.fill()
    })

    // Draw connections
    this.particles.forEach((particle, i) => {
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          this.ctx.beginPath()
          this.ctx.moveTo(particle.x, particle.y)
          this.ctx.lineTo(otherParticle.x, otherParticle.y)
          this.ctx.strokeStyle = `rgba(88, 166, 255, ${1 - distance / 100})`
          this.ctx.lineWidth = 0.5
          this.ctx.stroke()
        }
      })
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Loading Screen
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("hidden")
    }, 3000)
  }

  // Initialize particle system
  const canvas = document.getElementById("particle-canvas")
  if (canvas) {
    new ParticleSystem(canvas)
  }

  // Start terminal simulation
  new TerminalSimulator()

  // Initialize particle background (only after portfolio is shown)
  setTimeout(() => {
    new ParticleBackground()
  }, 6000)

  // Navigation
  const navbar = document.getElementById("navbar")
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  // Navbar scroll effect
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) {
        navMenu.classList.remove("active")
      }
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Active navigation link
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", () => {
      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }

  // Rotating text animation
  const textItems = document.querySelectorAll(".text-item")
  if (textItems.length > 0) {
    let currentIndex = 0

    function rotateText() {
      textItems[currentIndex].classList.remove("active")
      currentIndex = (currentIndex + 1) % textItems.length
      textItems[currentIndex].classList.add("active")
    }

    setInterval(rotateText, 3000)
  }

  // Counter animation
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current)
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Animate counters when hero section is visible
        if (entry.target.classList.contains("hero")) {
          setTimeout(animateCounters, 1000)
        }
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".fade-in, section").forEach((el) => {
    observer.observe(el)
  })

  // Project card hover effects
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Button click effects
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Parallax effect for floating shapes
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const shapes = document.querySelectorAll(".shape")

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1
      shape.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Typing effect for code window
  function typeCode() {
    const codeLines = document.querySelectorAll(".code-line")

    codeLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.opacity = "0"
        line.style.transform = "translateX(-20px)"
        line.style.transition = "all 0.5s ease"

        setTimeout(() => {
          line.style.opacity = "1"
          line.style.transform = "translateX(0)"
        }, 100)
      }, index * 200)
    })
  }

  // Initialize typing effect when about section is visible
  const aboutSection = document.querySelector(".about-section")
  if (aboutSection) {
    let typingTriggered = false

    const typingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !typingTriggered) {
          setTimeout(typeCode, 500)
          typingTriggered = true
        }
      })
    })

    typingObserver.observe(aboutSection)
  }

  // Easter egg - Konami code
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
  let konamiIndex = 0

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++
      if (konamiIndex === konamiCode.length) {
        // Easter egg activated!
        document.body.style.animation = "rainbow 3s infinite"
        setTimeout(() => {
          document.body.style.animation = ""
          konamiIndex = 0
        }, 10000)
      }
    } else {
      konamiIndex = 0
    }
  })

  console.log("🚀 Landing page loaded successfully!")
  console.log("💫 Created by Shishir Khatri")
  console.log("🇳🇵 Made with ❤️ in Nepal")
})

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`
document.head.appendChild(style)

// Performance optimization - throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
