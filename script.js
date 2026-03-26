AOS.init({ duration: 800, once: true });

const form = document.getElementById('projectForm');
const modal = document.getElementById('successModal');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show the modal
    modal.style.display = 'flex';

    // TRIGGER FLOWERS/CONFETTI EFFECT
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // Confetti shooting from the sides
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    form.reset();
});

function closeModal() {
    modal.style.display = 'none';
}
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Collect Data from your form fields
    const name = form.querySelector('input[placeholder="Your Name"]').value;
    const bizName = form.querySelector('input[placeholder="Business Name"]').value;
    const phone = form.querySelector('input[placeholder="WhatsApp Number"]').value;
    const budget = document.getElementById('budget').value;

    // 2. Create the WhatsApp Message
    const myNumber = "917064504701"; // <--- CHANGE THIS to your actual number (with 91)
    const message = `Hi Adeeb, I want to start a project!%0A%0A` +
                    `*Name:* ${name}%0A` +
                    `*Business:* ${bizName}%0A` +
                    `*WhatsApp:* ${phone}%0A` +
                    `*Budget:* ${budget}%0A%0A` +
                    `I have read the terms and I am ready to start.`;

    const whatsappUrl = `https://wa.me/${myNumber}?text=${message}`;

    // 3. Show Success Modal & Flowers
    modal.style.display = 'flex';
    triggerConfetti(); // This calls your existing flowers function

    // 4. THE MAGIC: Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 2500);

    form.reset();
});