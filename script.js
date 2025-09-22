'use strict';

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupNewsletter();
  setupScrollAnimations();
  registerServiceWorker();
});

function setupNavigation() {
  const navs = document.querySelectorAll('nav');
  if (!navs.length) return;

  navs.forEach((nav) => {
    const toggleButton = nav.querySelector('.hamburger');
    const linkList = nav.querySelector('.nav-links');

    if (!toggleButton || !linkList) return;

    toggleButton.addEventListener('click', () => {
      const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
      const nextState = !expanded;
      toggleButton.setAttribute('aria-expanded', String(nextState));
      linkList.classList.toggle('active', nextState);
      document.body.classList.toggle('menu-open', nextState);
    });

    linkList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggleButton.setAttribute('aria-expanded', 'false');
        linkList.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('nav .hamburger').forEach((button) => {
      const container = button.closest('nav');
      const menu = container ? container.querySelector('.nav-links') : null;
      button.setAttribute('aria-expanded', 'false');
      if (menu) {
        menu.classList.remove('active');
      }
    });
    document.body.classList.remove('menu-open');
  });
}

function setupNewsletter() {
  const storageKey = 'greenbite-newsletter';
  const forms = document.querySelectorAll('#newsletter, .newsletter-form');
  if (!forms.length) return;

  forms.forEach((form) => {
    const emailField = form.querySelector('input[type="email"]');
    if (!emailField) return;

    let feedback = form.querySelector('.newsletter-feedback');
    if (!feedback) {
      feedback = document.createElement('p');
      feedback.className = 'newsletter-feedback';
      feedback.setAttribute('aria-live', 'polite');
      form.appendChild(feedback);
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = emailField.value.trim();

      if (!email) {
        feedback.textContent = 'Please enter your email address.';
        feedback.dataset.state = 'error';
        emailField.focus();
        return;
      }

      if (!emailField.checkValidity()) {
        feedback.textContent = 'That email does not look valid. Try again?';
        feedback.dataset.state = 'error';
        emailField.focus();
        return;
      }

      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!saved.includes(email)) {
        saved.push(email);
        localStorage.setItem(storageKey, JSON.stringify(saved));
      }

      feedback.textContent = 'Thanks for subscribing! We will be in touch soon.';
      feedback.dataset.state = 'success';
      form.reset();
    });
  });
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((element) => observer.observe(element));
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .catch((error) => console.error('Service worker registration failed:', error));
  });
}