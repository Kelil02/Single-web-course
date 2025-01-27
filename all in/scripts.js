document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const feedbackMessage = `Thank you, ${name}! Your message has been received.`;

  document.getElementById('formFeedback').innerText = feedbackMessage;

  this.reset();
});

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    // Scrolling down
    header.classList.add('hidden');
  } else {
    // Scrolling up
    header.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});
