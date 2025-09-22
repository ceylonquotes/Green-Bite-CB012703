'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initFaqAccordion();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  const confirmation = document.getElementById('confirmation');
  if (!form || !confirmation) {
    return;
  }

  const storageKey = 'greenbite-feedbacks';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    const errors = [];
    if (!name) {
      errors.push('Please tell us your name.');
    }
    if (!email || !isValidEmail(email)) {
      errors.push('We need a valid email address to get back to you.');
    }
    if (!message) {
      errors.push('Let us know how we can help by sharing a message.');
    }

    if (errors.length) {
      confirmation.textContent = errors.join(' ');
      confirmation.dataset.state = 'error';
      return;
    }

    const entry = {
      name,
      email,
      message,
      date: new Date().toISOString()
    };

    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    stored.push(entry);
    localStorage.setItem(storageKey, JSON.stringify(stored));

    confirmation.textContent = `Thanks, ${name}! Your feedback is on its way to our team.`;
    confirmation.dataset.state = 'success';
    form.reset();
    const firstField = form.querySelector('input');
    if (firstField) {
      firstField.focus();
    }
  });
}

function isValidEmail(value) {
  return /^[\w.!#$%&'*+/=?`{|}~-]+@[\w-]+(\.[\w-]+)+$/.test(value);
}

function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) {
    return;
  }

  questions.forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const answer = button.nextElementSibling;
      button.setAttribute('aria-expanded', String(!expanded));
      if (answer) {
        answer.hidden = expanded;
      }
    });
  });
}
