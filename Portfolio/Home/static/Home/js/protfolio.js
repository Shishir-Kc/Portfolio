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
      { text: "Watching for file changes with StatReloader...", type: "info", delay: 400 },
      { text: "Performing system checks...", type: "info", delay: 700 },
      { text: "System check identified no issues (0 silenced).", type: "success", delay: 900 },
      { text: "Starting development server at http://127.0.0.1:8000/", type: "success", delay: 1100 },
      { text: "Press CTRL+C to quit", type: "info", delay: 1400 },
      { text: "Loading Shishir Khatri's Portfolio...", type: "warning", delay: 1000 },
      { text: "████████████████████████████████ 100%", type: "success", delay: 2000 },
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
    // this.initContactForm()
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

  // initContactForm() {
  //   const contactForm = document.querySelector(".contact-form")
  //   if (contactForm) {
  //     contactForm.addEventListener("submit", (e) => {
        

  //       const submitBtn = contactForm.querySelector(".submit-btn")
  //       const originalText = submitBtn.innerHTML

  //       // Show loading state
  //       submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  //       submitBtn.disabled = true

  //       // Simulate form submission
  //       setTimeout(() => {
  //         submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
  //         submitBtn.style.background = "var(--success-color)"

  //         // Reset form
  //         contactForm.reset()

  //         // Reset button after 3 seconds
  //         setTimeout(() => {
  //           submitBtn.innerHTML = originalText
  //           submitBtn.style.background = "var(--text-accent)"
  //           submitBtn.disabled = false
  //         }, 3000)
  //       }, 2000)
  //     })
  //   }
  // }
}

// Particle background effect
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
  // Start terminal simulation
  new TerminalSimulator()

  // Initialize particle background (only after portfolio is shown)
  setTimeout(() => {
    new ParticleBackground()
  }, 6000)

  // Add some interactive effects
  initInteractiveEffects()
})

function initInteractiveEffects() {
  // Add hover effects to project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click effects to skill items
  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.style.transform = "scale(0.95)"
      setTimeout(() => {
        item.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Add typing effect to form inputs
  const formInputs = document.querySelectorAll(".form-input")
  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.boxShadow = "0 0 0 2px rgba(88, 166, 255, 0.3)"
    })

    input.addEventListener("blur", () => {
      input.style.boxShadow = "none"
    })
  })
}

// Add some easter eggs
document.addEventListener("keydown", (e) => {
  // Konami code easter egg
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
  if (!window.konamiIndex) window.konamiIndex = 0

  if (e.keyCode === konamiCode[window.konamiIndex]) {
    window.konamiIndex++
    if (window.konamiIndex === konamiCode.length) {
      // Easter egg activated!
      document.body.style.animation = "rainbow 2s infinite"
      setTimeout(() => {
        document.body.style.animation = ""
        window.konamiIndex = 0
      }, 5000)
    }
  } else {
    window.konamiIndex = 0
  }
})

// Add rainbow animation for easter egg
const style = document.createElement("style")
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`
document.head.appendChild(style)
