const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 5,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        shape: Math.random() > 0.5 ? 'circle' : Math.random() > 0.5 ? 'rectangle' : 'triangle',
    };
}

function drawShape(particle) {
    ctx.beginPath();

    if (particle.shape === 'circle') {
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    } else if (particle.shape === 'rectangle') {
        ctx.rect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
    } else if (particle.shape === 'triangle') {
        ctx.moveTo(particle.x, particle.y - particle.size / 2);
        ctx.lineTo(particle.x + particle.size / 2, particle.y + particle.size / 2);
        ctx.lineTo(particle.x - particle.size / 2, particle.y + particle.size / 2);
        ctx.closePath();
    }

    ctx.stroke();
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    while (particles.length < 70) {
        particles.push(createParticle());
    }

    particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce back when reaching the screen edges
        if (particle.x + particle.size > canvas.width || particle.x - particle.size < 0) {
            particle.speedX = -particle.speedX;
        }

        if (particle.y + particle.size > canvas.height || particle.y - particle.size < 0) {
            particle.speedY = -particle.speedY;
        }

        ctx.strokeStyle = `rgba(173, 216, 230, 1)`;
        drawShape(particle);
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();
function startSlideshow() {
  // Get the slideshow container and images
  const slideshow = document.querySelector('.slideshow');
  if (slideshow) {
      const images = slideshow.querySelectorAll('img');
      // Set the initial index and show the first image and caption
      let index = 0;
      images[index].classList.add('active');
      const captions = document.querySelectorAll('.caption');
      captions[index].classList.add('active');

      // Set an interval to cycle through the images and captions
      setInterval(() => {
          images[index].classList.remove('active');
          captions[index].classList.remove('active');
          index = (index + 1) % images.length;
          images[index].classList.add('active');
          captions[index].classList.add('active');
      }, 3000);

      // Add event listeners to the captions to show the corresponding image
      captions.forEach((caption, i) => {
          caption.addEventListener('click', () => {
              images[index].classList.remove('active');
              captions[index].classList.remove('active');
              index = i;
              images[index].classList.add('active');
              captions[index].classList.add('active');
          });
      });
  }
}

// Call startSlideshow when the DOM is loaded
document.addEventListener('DOMContentLoaded', startSlideshow);