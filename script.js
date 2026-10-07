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
  updateChartTheme();
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
  'Scholar of Sustainability & Climate Change',
  'Geospatial (GIS) & Remote Sensing Modeler',
  'Life Cycle Assessment (LCA) Specialist',
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

// Interactive LCA Data Modeling Chart
let lcaChart = null;

const lcaDataSets = {
  gwp: {
    label: 'Global Warming Potential (kg CO₂ eq per 1,000 uses)',
    data: [15.8, 45.2, 28.4, 78.5],
    backgroundColor: ['#10b981', '#14b8a6', '#0284c7', '#f59e0b'],
    takeaway: 'While conventional plastic (LDPE) has the lowest manufacturing emissions per single bag, organic cotton requires dozens of reuses to offset its heavy cultivation footprint.'
  },
  water: {
    label: 'Water Consumption (Cubic Meters per 1,000 uses)',
    data: [0.08, 1.25, 3.40, 24.60],
    backgroundColor: ['#10b981', '#14b8a6', '#0284c7', '#f59e0b'],
    takeaway: 'Cotton bag cultivation exhibits extreme agricultural water stress (24.6 m³ per 1,000 uses) compared to virtually negligible water intensity for standard polymer bags.'
  },
  eco: {
    label: 'Terrestrial Ecotoxicity (kg 1,4-DCB eq)',
    data: [0.22, 0.85, 1.45, 6.70],
    backgroundColor: ['#10b981', '#14b8a6', '#0284c7', '#f59e0b'],
    takeaway: 'Agricultural chemical runoff from intensive cotton farming drives substantial terrestrial ecotoxicity, underscoring the critical necessity of multi-criteria life-cycle thinking.'
  }
};

function initLcaChart() {
  const ctx = document.getElementById('lcaChart');
  if (!ctx) return;

  const isDark = htmlElement.classList.contains('dark');
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)';

  lcaChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Single-Use LDPE Plastic', 'Kraft Paper Bag', 'Biodegradable Jute Bag', 'Organic Cotton Tote'],
      datasets: [{
        label: lcaDataSets.gwp.label,
        data: lcaDataSets.gwp.data,
        backgroundColor: lcaDataSets.gwp.backgroundColor,
        borderRadius: 12,
        borderWidth: 0,
        barPercentage: 0.55
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor,
            font: { family: '"Plus Jakarta Sans"', size: 12, weight: '600' }
          }
        },
        tooltip: {
          padding: 12,
          cornerRadius: 10,
          titleFont: { family: '"Plus Jakarta Sans"', weight: '700' },
          bodyFont: { family: '"Plus Jakarta Sans"' }
        }
      },
      scales: {
        x: {
          ticks: { color: textColor, font: { family: '"Plus Jakarta Sans"', size: 11 } },
          grid: { display: false }
        },
        y: {
          ticks: { color: textColor, font: { family: '"JetBrains Mono"', size: 11 } },
          grid: { color: gridColor }
        }
      }
    }
  });

  // Setup metric switcher buttons
  const metricButtons = document.querySelectorAll('#metric-buttons button');
  const takeawayElem = document.getElementById('lca-takeaway');

  metricButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      metricButtons.forEach((b) => {
        b.classList.remove('bg-emerald-600', 'text-white', 'shadow-xs');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      btn.classList.add('bg-emerald-600', 'text-white', 'shadow-xs');
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

      const metric = btn.getAttribute('data-metric');
      const selected = lcaDataSets[metric];

      lcaChart.data.datasets[0].label = selected.label;
      lcaChart.data.datasets[0].data = selected.data;
      lcaChart.update();

      if (takeawayElem) {
        takeawayElem.textContent = selected.takeaway;
      }
    });
  });
}

function updateChartTheme() {
  if (!lcaChart) return;
  const isDark = htmlElement.classList.contains('dark');
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)';

  lcaChart.options.plugins.legend.labels.color = textColor;
  lcaChart.options.scales.x.ticks.color = textColor;
  lcaChart.options.scales.y.ticks.color = textColor;
  lcaChart.options.scales.y.grid.color = gridColor;
  lcaChart.update();
}

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

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
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
  initLcaChart();
  document.getElementById('year').textContent = new Date().getFullYear();
});
