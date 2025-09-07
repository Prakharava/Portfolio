// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  initializePortfolio()
})

// Initialize all portfolio functionality
function initializePortfolio() {
  setupNavbarEffects()
  setupSmoothScrolling()
  setupContactForm()
  setupScrollAnimations()
  setupTypingEffect()
  setupActiveNavigation()
  setupProjectInteractions()
  setupScrollIndicator()
}

// Navbar scroll effects
function setupNavbarEffects() {
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Contact form handling for Netlify
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    // Handle form submission
    contactForm.addEventListener('submit', function() {
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
      submitBtn.disabled = true;
    });
  }
}

// Scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded")
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".skill-category, .project-card, .certificate-card")
  animatedElements.forEach((item) => {
    item.classList.add("loading")
    observer.observe(item)
  })
}

// Typing effect for hero section
function setupTypingEffect() {
  window.addEventListener("load", () => {
    const heroTitle = document.querySelector(".hero h1")
    if (heroTitle) {
      const originalText = heroTitle.textContent
      typeWriter(heroTitle, originalText, 100)
    }
  })
}

function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Active navigation highlighting
function setupActiveNavigation() {
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  })
}

// Project card interactions
function setupProjectInteractions() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Scroll progress indicator
function setupScrollIndicator() {
  // Create scroll indicator element
  const scrollIndicator = document.createElement("div")
  scrollIndicator.className = "scroll-indicator"
  document.body.appendChild(scrollIndicator)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.offsetHeight - window.innerHeight
    const scrollPercent = scrollTop / docHeight

    scrollIndicator.style.transform = `scaleX(${scrollPercent})`
  })
}

// Utility function to show notifications
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} position-fixed`
  notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `
  notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Lazy loading for images
function setupLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Theme toggle functionality (optional)
function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
      const isDark = document.body.classList.contains("dark-theme")
      localStorage.setItem("theme", isDark ? "dark" : "light")
    })

    // Load saved theme
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme")
    }
  }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`
document.head.appendChild(style)

// Error handling
window.addEventListener("error", (e) => {
  console.error("Portfolio Error:", e.error)
})

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
👨‍💻 Built with HTML, CSS, Bootstrap & JavaScript
📧 Contact: [Your Email]
🔗 GitHub: [Your GitHub]
`)
