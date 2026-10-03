/**
 * MazoteSoft - Main Interactive Scripts
 * Handles mobile navigation, smooth scrolling, portfolio filtering,
 * animated metrics, and contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const currentLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (currentLink) currentLink.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  // 4. Portfolio Filter Controls
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 5. Animated Metrics Counter
  const statsSection = document.querySelector('.stats-section');
  let counted = false;

  function countUp(el, target, suffix = '') {
    const duration = 1800; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const isDecimal = target % 1 !== 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out cubic
      const currentVal = target * (1 - Math.pow(1 - progress, 3));

      if (isDecimal) {
        el.textContent = currentVal.toFixed(1) + suffix;
      } else {
        el.textContent = Math.round(currentVal) + suffix;
      }

      if (frame === totalFrames) {
        clearInterval(timer);
        el.textContent = target + suffix;
      }
    }, frameRate);
  }

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          const statNumbers = document.querySelectorAll('.stat-number');
          
          statNumbers.forEach(stat => {
            const targetVal = parseFloat(stat.getAttribute('data-target'));
            if (targetVal === 100) countUp(stat, 100, '%');
            else if (targetVal === 60) countUp(stat, 60, ' FPS');
            else if (targetVal === 99.9) countUp(stat, 99.9, '%');
            else if (targetVal === 24) countUp(stat, 24, '/7');
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // 6. Interactive Contact Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }

  function validateField(input, condition) {
    const parent = input.closest('.form-group');
    if (!condition) {
      parent.classList.add('error');
      return false;
    } else {
      parent.classList.remove('error');
      return true;
    }
  }

  if (contactForm) {
    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(field => {
      if (field) {
        field.addEventListener('input', () => {
          field.closest('.form-group').classList.remove('error');
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length > 1);
      const isEmailValid = validateField(emailInput, validateEmail(emailInput.value.trim()));
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length > 4);

      if (isNameValid && isEmailValid && isMessageValid) {
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
          formSuccess.classList.add('visible');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          // Prepare mailto link as fallback to open email client with the details
          const subject = encodeURIComponent(`Project Inquiry: ${nameInput.value.trim()} - MazoteSoft`);
          const body = encodeURIComponent(
            `Name: ${nameInput.value.trim()}\n` +
            `Email: ${emailInput.value.trim()}\n` +
            `Project: ${document.getElementById('projectType').value}\n` +
            `Timeline: ${document.getElementById('budget').value}\n\n` +
            `Message:\n${messageInput.value.trim()}`
          );
          
          // Reset form fields
          contactForm.reset();

          // Smooth scroll to success message
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          setTimeout(() => {
            window.location.href = `mailto:mazotesoft@gmail.com?subject=${subject}&body=${body}`;
          }, 1200);

        }, 600);
      }
    });
  }

  // 7. Interactive Demo Card Flip inside Hero Mockup
  const demoCards = document.querySelectorAll('.demo-card');
  if (demoCards.length >= 2) {
    let frontIndex = 0;
    setInterval(() => {
      if (frontIndex === 0) {
        demoCards[0].style.top = '45px';
        demoCards[0].style.transform = 'scale(0.94)';
        demoCards[0].style.opacity = '0.7';
        demoCards[0].style.zIndex = '1';

        demoCards[1].style.top = '0';
        demoCards[1].style.transform = 'scale(1)';
        demoCards[1].style.opacity = '1';
        demoCards[1].style.zIndex = '2';
        frontIndex = 1;
      } else {
        demoCards[1].style.top = '45px';
        demoCards[1].style.transform = 'scale(0.94)';
        demoCards[1].style.opacity = '0.7';
        demoCards[1].style.zIndex = '1';

        demoCards[0].style.top = '0';
        demoCards[0].style.transform = 'scale(1)';
        demoCards[0].style.opacity = '1';
        demoCards[0].style.zIndex = '2';
        frontIndex = 0;
      }
    }, 3800);
  }
});
