import React, { useState } from 'react';

function Main() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setFeedback(`Thank you, ${name}! Your message has been received.`);
    e.target.reset();
  };

  return (
    <main>
      <section id="home">
        <h2>Home</h2>
        <p>This is the home section. Scroll down to explore more!</p>
      </section>

      <section id="about">
        <h2>About</h2>
        <p>This is the about section. Learn more about this page here.</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>Feel free to reach out via the form below:</p>
        <form id="contactForm" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>
        <p id="formFeedback">{feedback}</p>
      </section>
    </main>
  );
}

export default Main;
