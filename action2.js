
document.addEventListener('DOMContentLoaded', () => {
    const numberElement = document.getElementById('animated-number');
    observer.observe(numberElement);
  });
  
  console.log("Script dimulai"); // Ini untuk mengecek apakah script berjalan
  
  // Fungsi animasi angka
  function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.innerText = Math.floor(progress * (end - start) + start).toLocaleString();
      console.log("Progress: ", progress); // Tambahkan log untuk memantau progress
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // Menggunakan IntersectionObserver untuk mendeteksi saat komponen masuk ke viewport
  const numberElement = document.getElementById('animated-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("Element is in the viewport"); // Log untuk cek apakah elemen masuk ke viewport
        // Mulai animasi ketika komponen terlihat
        animateNumber(numberElement, 0, 50, 4000); // 2000ms durasi
        observer.unobserve(numberElement); // Hentikan pengamatan setelah animasi
      }
    });
  }, {
    threshold: 0.1 // Jalankan ketika 50% komponen terlihat
  });
  
  // Memulai pengamatan
  observer.observe(numberElement);
  

  document.querySelectorAll("details").forEach((accordion) => {
    accordion.addEventListener("toggle", (event) => {
      if (event.target.open) {
        event.target.querySelector(".content").style.height = event.target.querySelector(".content").scrollHeight + "px";
      } else {
        event.target.querySelector(".content").style.height = "0";
      }
    });
  });