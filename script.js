// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  htmlElement.classList.add('dark');
} else {
  htmlElement.classList.remove('dark');
}

themeToggleBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
  const isDark = htmlElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Typewriter Effect for Hero Headline
const typewriterElement = document.getElementById('typewriter');
const roles = [
  'Climate Finance & ESG Analyst',
  'Student of Sustainability & Climate Change',
  'Geospatial (GIS) & Remote Sensing Modeler',
  'Corporate Sustainability & Carbon Markets',
  'Quantitative Environmental Modeler'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80;
const deletingSpeed = 40;
const delayBetweenWords = 2000;

function typeWriter() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentRole.length) {
    currentSpeed = delayBetweenWords;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    currentSpeed = 350;
  }

  setTimeout(typeWriter, currentSpeed);
}

// Project Filtering Logic
const filterButtons = document.querySelectorAll('.project-filter-btn');
const projectCards = document.querySelectorAll('#projects-grid > div');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        card.classList.add('animate-fade-in');
      } else {
        card.style.display = 'none';
        card.classList.remove('animate-fade-in');
      }
    });
  });
});


// Lightbox Modal Functions
function openLightbox(src, caption) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const captionElem = document.getElementById('lightbox-caption');

  img.src = src;
  captionElem.textContent = caption || '';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('lightbox-modal').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox-modal') {
    closeLightbox();
  }
});

// In-Page View-Only Document Viewer (Toolbar & Download Options Hidden)
function openDocViewer(pdfUrl, title) {
  const modal = document.getElementById('doc-modal');
  const iframe = document.getElementById('doc-iframe');
  const titleElem = document.getElementById('doc-title');
  const reqBtn = document.getElementById('req-full-btn');

  // #toolbar=0&navpanes=0 hides the browser's PDF download and printing toolbar
  iframe.src = pdfUrl + '#toolbar=0&navpanes=0&scrollbar=1';
  titleElem.textContent = title || 'Document Preview';

  if (reqBtn) {
    if (pdfUrl.includes('Resume')) {
      reqBtn.style.display = 'none';
    } else {
      reqBtn.style.display = 'inline-flex';
      reqBtn.href = `mailto:chhatria.chhabila25_ccs@apu.edu.in?subject=Request%20for%20Full%20Study:%20${encodeURIComponent(title)}&body=Hi%20Chhabila,%0A%0AI%20am%20interested%20in%20reviewing%20the%20complete%20research%20report%20for:%20${encodeURIComponent(title)}.%0A%0ARegards,`;
    }
  }

  modal.classList.add('opacity-100', 'pointer-events-auto');
  modal.classList.remove('opacity-0', 'pointer-events-none');
  document.body.style.overflow = 'hidden';
}

function closeDocViewer() {
  const modal = document.getElementById('doc-modal');
  const iframe = document.getElementById('doc-iframe');
  iframe.src = '';
  modal.classList.remove('opacity-100', 'pointer-events-auto');
  modal.classList.add('opacity-0', 'pointer-events-none');
  document.body.style.overflow = '';
}

const docModalElem = document.getElementById('doc-modal');
if (docModalElem) {
  docModalElem.addEventListener('click', (e) => {
    if (e.target.id === 'doc-modal') {
      closeDocViewer();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeDocViewer();
  }
});

// Copy to Clipboard with Toast Notification
function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-text');
    toastText.textContent = message || 'Copied to clipboard!';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  });
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const topic = document.getElementById('topic').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showFormStatus('Please complete all required fields.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    <span>Sending inquiry...</span>
  `;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <i data-lucide="send" class="w-4 h-4"></i>
      <span>Send Message</span>
    `;
    lucide.createIcons();

    showFormStatus(
      `Thank you, ${name}! Your inquiry regarding "${topic}" has been transmitted. I will respond to ${email} promptly.`,
      'success'
    );

    contactForm.reset();
  }, 1200);
});

function showFormStatus(msg, type) {
  formStatus.classList.remove('hidden', 'bg-emerald-100', 'text-emerald-800', 'dark:bg-emerald-950/70', 'dark:text-emerald-300', 'bg-rose-100', 'text-rose-800', 'dark:bg-rose-950/70', 'dark:text-rose-300');

  if (type === 'success') {
    formStatus.classList.add('bg-emerald-100', 'text-emerald-800', 'dark:bg-emerald-950/70', 'dark:text-emerald-300', 'border', 'border-emerald-200', 'dark:border-emerald-800');
  } else {
    formStatus.classList.add('bg-rose-100', 'text-rose-800', 'dark:bg-rose-950/70', 'dark:text-rose-300', 'border', 'border-rose-200', 'dark:border-rose-800');
  }

  formStatus.textContent = msg;

  setTimeout(() => {
    formStatus.classList.add('hidden');
  }, 6000);
}

// Window load init
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
  document.getElementById('year').textContent = new Date().getFullYear();
});
