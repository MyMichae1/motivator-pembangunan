const rooms = [
  {
    id: "kamar-keluarga",
    name: "Kamar Tipe 1 – Kamar Keluarga",
    description: "Pilihan kamar yang nyaman untuk keluarga atau rombongan kecil, dengan kapasitas 4–5 orang.",
    images: [
      "../assets/images/kamar/kamar1.png",
      "../assets/images/kamar/kamar2.png"
    ],
    facilities: [
      "WC duduk", "Lemari", "Kasur untuk 4–5 orang", "Meja", "Kursi",
      "Layanan ganti handuk", "Cermin", "Wi-Fi", "Dapur"
    ],
    capacity: 5,
    price: null
  },
  {
    id: "kamar-standar",
    name: "Kamar Tipe 2 – Kamar Standar",
    description: "Kamar praktis dan nyaman untuk kunjungan singkat atau menginap berdua, dengan kapasitas 2 orang.",
    images: [
      "../assets/images/kamar/kamar 3.png",
      "../assets/images/kamar/kamar 4.png"
    ],
    facilities: [
      "WC duduk", "Lemari", "Kasur untuk 2 orang", "Meja", "Kursi",
      "Layanan ganti handuk", "Cermin", "Wi-Fi", "Dapur"
    ],
    capacity: 2,
    price: null
  }
];

const TRAINING_ADMIN_WHATSAPP = "6281343604500";

const trainingPackages = [
  {
    name: "Dasar Pertanian Organik",
    description: "Mengenal prinsip dan praktik awal pertanian organik.",
    image: "https://rycam.id/wp-content/uploads/2025/12/MPM2285-scaled.jpg",
    price: "Hubungi admin untuk harga",
    duration: "Durasi menyesuaikan program",
    instructor: "Pemateri dari MPM",
    materials: ["Prinsip pertanian organik", "Kesehatan tanah", "Pengolahan lahan", "Pengenalan pupuk organik"]
  },
  {
    name: "Pembuatan Pupuk Organik",
    description: "Belajar mengolah bahan organik menjadi pupuk untuk tanaman.",
    image: "https://rycam.id/wp-content/uploads/2025/07/Foto-6_SMK-Negeri-8-Konawe-Selatan_Perawatan-tanaman-1200x900.jpg",
    price: "Hubungi admin untuk harga",
    duration: "Durasi menyesuaikan program",
    instructor: "Pemateri dari MPM",
    materials: ["Pengenalan bahan organik", "Pembuatan kompos", "Pengolahan pupuk", "Cara penggunaan pada tanaman"]
  },
  {
    name: "Budidaya Tanaman Berkelanjutan",
    description: "Mempelajari tahapan budidaya tanaman yang berkelanjutan.",
    image: "https://rycam.id/wp-content/uploads/2025/12/WhatsApp-Image-2025-10-29-at-12.30.24_0526b716-1200x900.jpg",
    price: "Hubungi admin untuk harga",
    duration: "Durasi menyesuaikan program",
    instructor: "Pemateri dari MPM",
    materials: ["Pemilihan benih", "Persemaian", "Perawatan tanaman", "Pengendalian hama terpadu", "Pemeliharaan lahan"]
  },
  {
    name: "Praktik Pertanian dan Pascapanen",
    description: "Praktik lapangan dari pemeliharaan hingga penanganan panen.",
    image: "https://rycam.id/wp-content/uploads/2025/07/B1-scaled.jpg",
    price: "Hubungi admin untuk harga",
    duration: "Durasi menyesuaikan program",
    instructor: "Pemateri dari MPM",
    materials: ["Praktik lapangan", "Pemeliharaan tanaman", "Waktu panen", "Penanganan hasil panen", "Evaluasi hasil budidaya"]
  }
];

// State for sliders
const sliderState = {};

function renderTrainingPackages() {
  const track = document.getElementById('training-package-track');
  if (!track) return;

  track.innerHTML = trainingPackages.map(trainingPackage => {
    const message = `Halo Admin MPM, saya ingin bertanya tentang Paket ${trainingPackage.name}.`;
    const whatsappUrl = `https://wa.me/${TRAINING_ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;

    return `
      <article class="training-package-card">
        <div class="training-package-image">
          <img src="${trainingPackage.image}" alt="Kegiatan ${trainingPackage.name}" loading="lazy">
          <div class="training-package-image-fallback" hidden>Foto kegiatan belum dapat dimuat</div>
        </div>
        <div class="training-package-content">
          <h3>${trainingPackage.name}</h3>
          <p class="training-package-description">${trainingPackage.description}</p>
          <dl class="training-package-details">
            <div><dt>Harga</dt><dd>${trainingPackage.price}</dd></div>
            <div><dt>Durasi</dt><dd>${trainingPackage.duration}</dd></div>
            <div><dt>Pemateri</dt><dd>${trainingPackage.instructor}</dd></div>
          </dl>
          <div class="training-package-materials">
            <h4>Materi yang dipelajari</h4>
            <ul>${trainingPackage.materials.map(material => `<li>${material}</li>`).join('')}</ul>
          </div>
          <a class="training-package-cta" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Hubungi Admin via WhatsApp</a>
        </div>
      </article>
    `;
  }).join('');

  track.querySelectorAll('.training-package-image img').forEach(image => {
    image.addEventListener('error', () => {
      image.hidden = true;
      image.nextElementSibling.hidden = false;
    }, { once: true });
  });
}

function initTrainingCarousel() {
  const track = document.getElementById('training-package-track');
  const carousel = document.getElementById('training-package-carousel');
  const previousButton = document.getElementById('training-packages-prev');
  const nextButton = document.getElementById('training-packages-next');
  if (!track || !carousel || !previousButton || !nextButton) return;

  const updateControls = () => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    previousButton.disabled = carousel.scrollLeft <= 1;
    nextButton.disabled = carousel.scrollLeft >= maxScroll - 1;
  };
  const scrollByCard = direction => {
    const card = track.querySelector('.training-package-card');
    if (!card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    carousel.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };

  previousButton.addEventListener('click', () => scrollByCard(-1));
  nextButton.addEventListener('click', () => scrollByCard(1));
  carousel.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  updateControls();
}

function renderRooms() {
  const container = document.getElementById('room-container');
  if (!container) return;
  
  container.innerHTML = rooms.map(r => {
    sliderState[r.id] = 0;
    
    return `
    <article class="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row gap-6 min-w-0">
      <div class="w-full md:w-1/2 relative group min-w-0">
        <!-- Slider Images -->
        <div class="relative w-full h-64 md:h-full overflow-hidden bg-gray-100" id="slider-${r.id}">
          ${r.images.map((img, i) => `
            <img src="${img}" alt="${r.name} — foto ${i + 1}" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}" data-index="${i}">
          `).join('')}
        </div>
        
        <!-- Arrows -->
        ${r.images.length > 1 ? `
          <button onclick="changeSlide('${r.id}', -1)" aria-label="Gambar sebelumnya" class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center z-20 transition-colors opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onclick="changeSlide('${r.id}', 1)" aria-label="Gambar selanjutnya" class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center z-20 transition-colors opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          
          <!-- Dots -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            ${r.images.map((_, i) => `
              <button onclick="goToSlide('${r.id}', ${i})" aria-label="Ke gambar ${i+1}" id="dot-${r.id}-${i}" class="w-2.5 h-2.5 rounded-full transition-colors ${i === 0 ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}"></button>
            `).join('')}
          </div>
        ` : ''}
      </div>
      
      <div class="w-full md:w-1/2 min-w-0 p-6 md:p-8 flex flex-col justify-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-3">${r.name}</h2>
        <p class="text-gray-600 mb-6">${r.description}</p>
        
        <h4 class="font-bold text-gray-900 mb-2">Fasilitas:</h4>
        <ul class="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${r.facilities.map(f => `
            <li class="flex items-center text-gray-600 text-sm">
              <svg class="w-4 h-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              ${f}
            </li>
          `).join('')}
        </ul>
        
        <div class="mt-auto">
          <button onclick="openBooking('${r.id}')" class="btn btn-primary inline-flex items-center gap-2">
            Pesan Kamar
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </article>
    `;
  }).join('');
  
  // Attach swipe events
  rooms.forEach(r => {
    if (r.images.length > 1) {
      setupSwipe(r.id);
    }
  });
}

window.changeSlide = function(id, dir) {
  const r = rooms.find(x => x.id === id);
  let idx = sliderState[id] + dir;
  if (idx < 0) idx = r.images.length - 1;
  if (idx >= r.images.length) idx = 0;
  goToSlide(id, idx);
};

window.goToSlide = function(id, idx) {
  const r = rooms.find(x => x.id === id);
  const container = document.getElementById(`slider-${id}`);
  if(!container) return;
  
  const imgs = container.querySelectorAll('img');
  imgs.forEach(img => {
    img.classList.remove('opacity-100', 'z-10');
    img.classList.add('opacity-0', 'z-0');
  });
  
  const target = container.querySelector(`img[data-index="${idx}"]`);
  if (target) {
    target.classList.remove('opacity-0', 'z-0');
    target.classList.add('opacity-100', 'z-10');
  }
  
  // Update dots
  r.images.forEach((_, i) => {
    const dot = document.getElementById(`dot-${id}-${i}`);
    if (dot) {
      if (i === idx) {
        dot.classList.replace('bg-white/50', 'bg-white');
        dot.classList.replace('hover:bg-white/80', 'bg-white');
      } else {
        dot.classList.replace('bg-white', 'bg-white/50');
        dot.classList.add('hover:bg-white/80');
      }
    }
  });
  
  sliderState[id] = idx;
};

function setupSwipe(id) {
  const container = document.getElementById(`slider-${id}`);
  if (!container) return;
  
  let touchstartX = 0;
  let touchendX = 0;
  
  container.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  container.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    const threshold = 50;
    if (touchendX < touchstartX - threshold) {
      changeSlide(id, 1);
    }
    if (touchendX > touchstartX + threshold) {
      changeSlide(id, -1);
    }
  }
}

window.openBooking = function(id) {
  const r = rooms.find(x => x.id === id);
  if (!r) return;
  
  const modal = document.getElementById('bookingModal');
  const content = document.getElementById('bookingContent');
  
  document.getElementById('bookingRoomName').value = r.name;
  document.getElementById('bookingRoomNameDisplay').textContent = "Kamar: " + r.name;
  
  // Reset Form
  document.getElementById('bookingForm').reset();
  document.getElementById('dateError').classList.add('hidden');
  
  modal.classList.remove('hidden');
  void modal.offsetWidth;
  modal.classList.remove('opacity-0');
  content.classList.remove('scale-95');
};

function closeBooking() {
  const modal = document.getElementById('bookingModal');
  const content = document.getElementById('bookingContent');
  if(!modal || !content) return;
  
  modal.classList.add('opacity-0');
  content.classList.add('scale-95');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
  renderTrainingPackages();
  initTrainingCarousel();
  renderRooms();
  
  const closeBtn = document.getElementById('closeBookingBtn');
  if(closeBtn) closeBtn.addEventListener('click', closeBooking);
  
  const modal = document.getElementById('bookingModal');
  if(modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeBooking();
    });
  }
  
  const submitBtn = document.getElementById('submitBookingBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const form = document.getElementById('bookingForm');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      
      const checkin = document.getElementById('bookingCheckin').value;
      const checkout = document.getElementById('bookingCheckout').value;
      const dateError = document.getElementById('dateError');
      
      if (new Date(checkout) <= new Date(checkin)) {
        dateError.classList.remove('hidden');
        return;
      } else {
        dateError.classList.add('hidden');
      }
      
      const roomName = document.getElementById('bookingRoomName').value;
      const name = document.getElementById('bookingName').value;
      const wa = document.getElementById('bookingWa').value;
      const guests = document.getElementById('bookingGuests').value;
      const notes = document.getElementById('bookingNotes').value.trim();
      const message = [
        'Halo Admin MPM, saya ingin melakukan pemesanan kamar.', '',
        `Nama: ${name}`, `Nomor WhatsApp: ${wa}`, `Kamar: ${roomName}`,
        `Check-in: ${checkin}`, `Check-out: ${checkout}`, `Jumlah tamu: ${guests}`,
        ...(notes ? [`Catatan: ${notes}`] : []), '',
        'Mohon informasi ketersediaan kamar dan proses selanjutnya. Terima kasih.'
      ].join('\n');
      window.open(`https://wa.me/${TRAINING_ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      
      closeBooking();
    });
  }
  
  // Set min date to today for date inputs
  const today = new Date().toISOString().split('T')[0];
  const ci = document.getElementById('bookingCheckin');
  const co = document.getElementById('bookingCheckout');
  if (ci) ci.min = today;
  if (co) co.min = today;
});
