async function init() {
    const node = document.querySelector("#type-text");
    const words = ['Precise Services.', 'Innovative Solutions.', 'Measured Revenue.', 'Expert Skilled.'];
    let currentIndex = 0;
    while (true) {
      await node.type(words[currentIndex]);
      await sleep(3000);
      await node.delete(words[currentIndex]);
      currentIndex = (currentIndex + 1) % words.length;
    }
  }
  const sleep = time => new Promise(resolve => setTimeout(resolve, time));
  class TypeAsync extends HTMLSpanElement {
    get typeInterval() {
      const randomMs = 100 * Math.random();
      return randomMs < 50 ? 10 : randomMs;
    }
    async type(text) {
      for (let character of text) {
        this.innerText += character;
        await sleep(this.typeInterval);
      }
    }
    async delete(text) {
      for (let i = 0; i < text.length; i++) {
        this.innerText = this.innerText.slice(0, this.innerText.length - 1);
        await sleep(this.typeInterval);
      }
    }
  }
  customElements.define('type-async', TypeAsync, {
    extends: 'span'
  });
  init();

const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const logo = document.getElementById('logo');
const header = document.querySelector('header');

let lastScrollPosition = 0;


menuButton.addEventListener('click', function () {
  // Toggle menu visibility
  if (mobileMenu.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

function openMenu() {
  mobileMenu.style.display = 'block'; // Ensure the menu is displayed
  setTimeout(() => {
    mobileMenu.classList.add('active');
  }, 10); // Small delay for smooth animation
  logo.style.display = 'none'; // Hide logo when menu is open
  document.addEventListener('click', outsideClickListener); // Add outside click listener
}

function closeMenu() {
  mobileMenu.classList.add('closing');
  mobileMenu.classList.remove('active');
  setTimeout(() => {
    mobileMenu.classList.remove('closing');
    mobileMenu.style.display = 'none'; // Hide the menu completely after animation
  }, 300); // Matches the animation duration
  logo.style.display = 'block'; // Show logo again
  document.removeEventListener('click', outsideClickListener); // Remove outside click listener
}

function outsideClickListener(event) {
  const isClickInside = mobileMenu.contains(event.target) || menuButton.contains(event.target);

  if (!isClickInside) {
    closeMenu(); // Close the menu when clicking outside
  }
}

window.addEventListener('scroll', function () {
    let currentScrollPosition = window.pageYOffset;
  
    // Add background when scrolling down, remove when back to top
    if (currentScrollPosition > 50) { // Change 50 to whatever scroll distance you prefer
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  
    // Show/hide header on scroll direction
    if (currentScrollPosition > lastScrollPosition) {
      // Scrolling down, hide the header
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up, show the header
      header.style.transform = 'translateY(0)';
    }
  
    lastScrollPosition = currentScrollPosition;
  });

// card carousel
const carousel = document.getElementById('carousel');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');
  let scrollAmount = 0;

  nextButton.addEventListener('click', () => {
    if (scrollAmount < carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount += 320; // Scroll the width of one card (including margin)
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
    }
  });

  prevButton.addEventListener('click', () => {
    if (scrollAmount > 0) {
      scrollAmount -= 320;
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
    }
  });

  let autoScroll;

function startAutoScroll() {
  autoScroll = setInterval(() => {
    if (scrollAmount < carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount += 320; // Scroll the width of one card
    } else {
      scrollAmount = 0; // Reset to the beginning
    }
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
  }, 3000); // Autoplay interval every 3 seconds
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

// Start autoplay on page load
startAutoScroll();

// Allow manual scrolling with buttons
nextButton.addEventListener('click', () => {
  stopAutoScroll(); // Stop autoplay when manually interacting
  if (scrollAmount < carousel.scrollWidth - carousel.clientWidth) {
    scrollAmount += 320;
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
  }
  startAutoScroll(); // Restart autoplay after interaction
});

prevButton.addEventListener('click', () => {
  stopAutoScroll();
  if (scrollAmount > 0) {
    scrollAmount -= 320;
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
  }
  startAutoScroll();
});
