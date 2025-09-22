'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initQuoteRotation();
  initDailyTip();
  initImageLoading();
});

function initImageLoading() {
  // Add loading class to hero image
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.addEventListener('load', () => {
      heroImage.classList.add('loaded');
    });
    
    // If image is already loaded (cached)
    if (heroImage.complete) {
      heroImage.classList.add('loaded');
    }
  }

  // Add loading functionality to all images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.classList.contains('loaded')) {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
        img.style.opacity = '1';
      });
      
      img.addEventListener('error', () => {
        img.classList.add('error');
        // Set a fallback if image fails to load
        if (img.src.includes('yoga bg pic 1.jpg')) {
          img.style.display = 'none';
        }
      });
      
      // If image is already loaded (cached)
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
        img.style.opacity = '1';
      }
    }
  });
}

function initQuoteRotation() {
  const quoteElement = document.getElementById('quote');
  if (!quoteElement) return;

  const quotes = [
    'Your health is your wealth.',
    'Small steps every day lead to big results.',
    'Nourish your body, mind, and soul.',
    'Move more, stress less.',
    'Healthy living fuels a happy life.',
    'Consistency beats intensity every time.'
  ];

  let index = 0;

  const rotate = () => {
    index = (index + 1) % quotes.length;
    quoteElement.classList.add('is-fading');
    setTimeout(() => {
      quoteElement.textContent = quotes[index];
      quoteElement.classList.remove('is-fading');
    }, 200);
  };

  setInterval(rotate, 4000);
}

function initDailyTip() {
  const tipElement = document.getElementById('health-tip');
  if (!tipElement) return;

  const tips = [
    'Drink plenty of water to stay hydrated.',
    'Get at least 30 minutes of movement today.',
    'Fill half your plate with colourful vegetables.',
    'Prioritise sleep to support recovery and focus.',
    'Take mindful breaks to reset your energy.',
    'Choose whole foods over ultra-processed snacks.'
  ];

  const today = new Date();
  const tipIndex = today.getDate() % tips.length;
  tipElement.textContent = tips[tipIndex];
}