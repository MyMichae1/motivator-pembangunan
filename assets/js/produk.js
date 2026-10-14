
const products = [
  {
    id: "kaos-mpm-hijau",
    name: "Kaos MPM Edisi Hijau",
    description: "Kaos berbahan katun berkualitas dengan logo Motivator Pembangunan Masyarakat. Nyaman dipakai untuk kegiatan lapangan maupun sehari-hari.",
    price: 150000,
    images: [
      "../assets/images/Produk/baju mpm 1.jpeg",
      "../assets/images/Produk/baju mpm 2.png",
      "../assets/images/Produk/baju mpm 3.png"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Hijau", "Putih", "Hitam"]
  },
  {
    id: "barra-rarang",
    name: "Barra’ Rarang - Beras Merah",
    description: "Beras merah lokal Toraja dari varietas Pare Pekko. Kemasan 500 gram.",
    images: [
      "../assets/images/Produk/Barra%E2%80%99%20Rarang%20Red%20Rice%20Pouch%201.webp",
      "../assets/images/Produk/Barra%E2%80%99%20Rarang%20Red%20Rice%20Pouch%202.png",
      "../assets/images/Produk/Barra%E2%80%99%20Rarang%20Red%20Rice%20Pouch%203.png",
      "../assets/images/Produk/Barra%E2%80%99%20Rarang%20Red%20Rice%20Pouch%204.png"
    ],
    price: 20000
  },
  {
    id: "barra-lotong",
    name: "Barra’ Lotong - Beras Hitam",
    description: "Beras hitam lokal Toraja dari varietas Pare Ambo. Kemasan 500 gram.",
    images: [
      "../assets/images/Produk/Kraft%20Pouch%20of%20Black%20Rice%201.webp",
      "../assets/images/Produk/Kraft%20Pouch%20of%20Black%20Rice%202.png",
      "../assets/images/Produk/Kraft%20Pouch%20of%20Black%20Rice%203.png",
      "../assets/images/Produk/Kraft%20Pouch%20of%20Black%20Rice%204.png"
    ],
    price: 20000
  },
  {
    id: "kawa-mamming",
    name: "Kawa Mamming - Kopi Robusta Toraja",
    description: "Kopi robusta Toraja yang dibudidayakan tanpa perlakuan kimia sintetis.",
    images: [
      "../assets/images/Produk/Kawa%20Mamming%20Toraja%20Coffee%20Pouch%201.webp",
      "../assets/images/Produk/Kawa%20Mamming%20Toraja%20Coffee%20Pouch%202.png",
      "../assets/images/Produk/Kawa%20Mamming%20Toraja%20Coffee%20Pouch%203.png",
      "../assets/images/Produk/Kawa%20Mamming%20Toraja%20Coffee%20Pouch%204.png"
    ],
    price: 20000
  },
  {
    id: "sambalado-katokkon-tuna",
    name: "Sambalado - Sambal Katokkon Tuna",
    description: "Sambal lada Katokkon khas Toraja dengan varian ikan tuna. Kemasan 200 gram.",
    images: [
      "../assets/images/Produk/Sambalado%20Toraja%20Chili%20Jar%201.webp",
      "../assets/images/Produk/Sambalado%20Toraja%20Chili%20Jar%202.png",
      "../assets/images/Produk/Sambalado%20Toraja%20Chili%20Jar%203.png",
      "../assets/images/Produk/Sambalado%20Toraja%20Chili%20Jar%204.png"
    ],
    price: 20000
  }
];

const WHATSAPP_PRODUCT_DESTINATION = "https://chat.whatsapp.com/B7sZzPJiwf2LN4E1LUAtyH";
let cart = JSON.parse(localStorage.getItem('mpm_cart')) || [];

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

function renderProductGallery(product) {
  const imageCount = product.images.length;
  return `
    <div class="product-gallery" data-product-gallery="${product.id}" data-image-index="0" tabindex="0" role="region" aria-roledescription="carousel" aria-label="Galeri foto ${product.name}. Geser untuk melihat foto lain.">
      <img src="${product.images[0]}" alt="${product.name}, foto 1 dari ${imageCount}" class="product-gallery__image" loading="lazy" draggable="false">
      ${imageCount > 1 ? `
        <button type="button" class="product-gallery__control product-gallery__control--previous" data-gallery-step="-1" aria-label="Foto sebelumnya: ${product.name}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6"/></svg>
        </button>
        <button type="button" class="product-gallery__control product-gallery__control--next" data-gallery-step="1" aria-label="Foto berikutnya: ${product.name}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/></svg>
        </button>
      ` : ''}
      <span class="product-gallery__count" aria-live="polite">1 / ${imageCount}</span>
    </div>
  `;
}

function showProductGalleryImage(gallery, step) {
  const product = products.find(item => item.id === gallery.dataset.productGallery);
  if (!product) return;

  const currentIndex = Number(gallery.dataset.imageIndex);
  const nextIndex = (currentIndex + step + product.images.length) % product.images.length;
  const image = gallery.querySelector('.product-gallery__image');
  const counter = gallery.querySelector('.product-gallery__count');
  if (!image || !counter) return;

  gallery.dataset.imageIndex = String(nextIndex);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const direction = step > 0 ? 1 : -1;
  image.classList.remove('is-changing', 'is-changing-reverse');
  if (!reducedMotion) {
    image.classList.add(direction > 0 ? 'is-changing' : 'is-changing-reverse');
    image.addEventListener('load', () => image.classList.remove('is-changing', 'is-changing-reverse'), { once: true });
  }
  image.src = product.images[nextIndex];
  image.alt = `${product.name}, foto ${nextIndex + 1} dari ${product.images.length}`;
  counter.textContent = `${nextIndex + 1} / ${product.images.length}`;
}

function initializeProductGallery(gallery) {
  const image = gallery.querySelector('.product-gallery__image');
  const product = products.find(item => item.id === gallery.dataset.productGallery);
  if (!image || !product || product.images.length < 2) return;

  let pointerStartX = 0;
  let pointerStartY = 0;
  let isDragging = false;

  gallery.addEventListener('pointerdown', event => {
    if (event.target instanceof Element && event.target.closest('.product-gallery__control')) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    isDragging = true;
    gallery.setPointerCapture?.(event.pointerId);
  });

  gallery.addEventListener('pointerup', event => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;
    const swipeThreshold = Math.min(80, Math.max(36, gallery.clientWidth * 0.12));
    if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    showProductGalleryImage(gallery, deltaX < 0 ? 1 : -1);
  });

  gallery.addEventListener('pointercancel', () => { isDragging = false; });
  gallery.addEventListener('dragstart', event => event.preventDefault());
  gallery.querySelectorAll('.product-gallery__control').forEach(control => {
    control.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      showProductGalleryImage(gallery, Number(control.dataset.galleryStep));
    });
  });
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showProductGalleryImage(gallery, event.key === 'ArrowRight' ? 1 : -1);
    }
  });

  // Preload each gallery's remaining images after the first frame is interactive.
  const preloadImages = () => product.images.slice(1).forEach(src => {
    const preload = new Image();
    preload.src = src;
  });
  if ('requestIdleCallback' in window) requestIdleCallback(preloadImages, { timeout: 1200 });
  else setTimeout(preloadImages, 250);
}

function renderProducts() {
  const container = document.getElementById('product-container');
  if (!container) return;
  
  container.innerHTML = products.map(p => {
    if (p.contactOnly) {
      const message = encodeURIComponent(`Halo Admin MPM, saya tertarik dengan ${p.name}. Mohon informasi varian, ukuran, harga, dan ketersediaannya.`);
      return `
        <div class="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden flex flex-col">
          ${renderProductGallery(p)}
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-900 mb-2">${p.name}</h3>
            <p class="text-gray-600 text-sm mb-4">${p.description}</p>
            ${p.composition ? `
              <div class="mb-6 rounded-xl border border-primary/10 bg-light p-4">
                <h4 class="mb-2 text-sm font-bold text-primary">Komposisi</h4>
                <ul class="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-gray-700 sm:text-sm">
                  ${p.composition.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            <a href="https://wa.me/6281343604500?text=${message}" target="_blank" rel="noopener noreferrer" class="btn btn-outline w-full justify-center flex items-center gap-2 mt-auto">
              Tanya harga dan pesan via WhatsApp
            </a>
          </div>
        </div>
      `;
    }

    return `
      <div class="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden flex flex-col">
        ${renderProductGallery(p)}
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="text-xl font-bold text-gray-900 mb-2">${p.name}</h3>
          <p class="text-gray-600 text-sm mb-4 flex-grow">${p.description}</p>
          <div class="text-primary font-bold text-xl mb-4">${formatRupiah(p.price)}</div>
          
          <div class="space-y-3 mb-6">
            ${p.sizes?.length ? `
              <div>
                <label class="block text-sm text-gray-700 mb-1">Ukuran</label>
                <select id="size-${p.id}" class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary">
                  ${p.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
            ` : ''}
            ${p.colors?.length ? `
              <div>
                <label class="block text-sm text-gray-700 mb-1">Warna</label>
                <select id="color-${p.id}" class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary">
                  ${p.colors.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
            ` : ''}
            <div>
              <label class="block text-sm text-gray-700 mb-1">Jumlah</label>
              <div class="flex items-center border border-gray-300 rounded w-max">
                <button onclick="updateQtyInput('${p.id}', -1)" class="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                <input type="number" id="qty-${p.id}" value="1" min="1" class="w-12 text-center py-1 outline-none appearance-none m-0" style="-moz-appearance: textfield;">
                <button onclick="updateQtyInput('${p.id}', 1)" class="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
              </div>
            </div>
          </div>
          
          <button onclick="addToCart('${p.id}')" class="btn btn-outline w-full justify-center flex items-center gap-2">
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.updateQtyInput = function(id, change) {
  const input = document.getElementById(`qty-${id}`);
  let val = parseInt(input.value) || 1;
  val += change;
  if (val < 1) val = 1;
  input.value = val;
};

window.addToCart = function(id) {
  const p = products.find(x => x.id === id);
  if(!p) return;
  const size = document.getElementById(`size-${id}`)?.value || '';
  const color = document.getElementById(`color-${id}`)?.value || '';
  const qty = Math.max(1, parseInt(document.getElementById(`qty-${id}`)?.value, 10) || 1);
  
  const existing = cart.find(x => x.id === id && x.size === size && x.color === color);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, size, color, qty });
  }
  
  saveCart();
  updateCartBadge();
  openCart();
};

function saveCart() {
  localStorage.setItem('mpm_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(b => {
    if (count > 0) {
      b.textContent = count;
      b.classList.remove('hidden');
    } else {
      b.classList.add('hidden');
    }
  });
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!container || !totalEl) return;
  
  if (cart.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center mt-10">Keranjang masih kosong.</p>';
    totalEl.textContent = 'Rp 0';
    return;
  }
  
  let total = 0;
  container.innerHTML = cart.map((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `
      <div class="flex gap-4 border-b border-gray-100 pb-4">
        <div class="flex-grow">
          <h4 class="font-bold text-gray-900">${item.name}</h4>
          ${item.size || item.color ? `<p class="text-sm text-gray-500">${[item.size && `Ukuran: ${item.size}`, item.color && `Warna: ${item.color}`].filter(Boolean).join(' | ')}</p>` : ''}
          <div class="flex items-center gap-4 mt-2">
             <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                <button onclick="updateCartQty(${index}, -1)" class="px-2 bg-gray-50 hover:bg-gray-200 text-gray-600">-</button>
                <span class="px-3 text-sm">${item.qty}</span>
                <button onclick="updateCartQty(${index}, 1)" class="px-2 bg-gray-50 hover:bg-gray-200 text-gray-600">+</button>
             </div>
             <div class="font-semibold text-primary">${formatRupiah(subtotal)}</div>
          </div>
        </div>
        <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-600 self-start p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    `;
  }).join('');
  
  totalEl.textContent = formatRupiah(total);
}

window.updateCartQty = function(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartBadge();
  renderCartItems();
};

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartBadge();
  renderCartItems();
};

function openCart() {
  const modal = document.getElementById('cartModal');
  const content = document.getElementById('cartContent');
  if(!modal || !content) return;
  
  renderCartItems();
  modal.classList.remove('hidden');
  // Trigger reflow
  void modal.offsetWidth;
  modal.classList.remove('opacity-0');
  content.classList.remove('translate-x-full');
}

function closeCart() {
  const modal = document.getElementById('cartModal');
  const content = document.getElementById('cartContent');
  if(!modal || !content) return;
  
  modal.classList.add('opacity-0');
  content.classList.add('translate-x-full');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}

const initializeProducts = () => {
  renderProducts();
  updateCartBadge();

  const productContainer = document.getElementById('product-container');
  productContainer?.querySelectorAll('[data-product-gallery]').forEach(initializeProductGallery);
  
  const closeBtn = document.getElementById('closeCartBtn');
  if(closeBtn) closeBtn.addEventListener('click', closeCart);
  
  const modal = document.getElementById('cartModal');
  if(modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCart();
    });
  }
  
  if (window.location.hash === '#cart') {
    setTimeout(openCart, 300);
  }
  
  const checkoutBtn = document.getElementById('checkoutBtn');
  if(checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return alert('Keranjang belanja kosong.');
      
      let text = "Halo Admin MPM,%0A%0ASaya ingin memesan produk:%0A%0A";
      let total = 0;
      cart.forEach((item, i) => {
        const sub = item.price * item.qty;
        total += sub;
        text += `${i+1}. ${item.name}%0A`;
        if (item.size) text += `   Ukuran: ${item.size}%0A`;
        if (item.color) text += `   Warna: ${item.color}%0A`;
        text += `   Jumlah: ${item.qty}%0A`;
        text += `   Harga: ${formatRupiah(item.price)}%0A`;
        text += `   Subtotal: ${formatRupiah(sub)}%0A%0A`;
      });
      text += `*Total Pembayaran: ${formatRupiah(total)}*%0A%0AMohon informasi proses pembayaran dan pengiriman.%0A%0ATerima kasih.`;
      
      // Navigate to WhatsApp Group/Destination
      // Since it's an invite link, we ideally want wa.me, but the prompt said:
      // "Karena nomor admin tidak diberikan... format chat.whatsapp.com adalah link undangan... gunakan link tersebut sebagai fallback."
      // Let's redirect to the invite link as requested. 
      // Note: passing text to an invite link doesn't prefill messages for groups. But we can't change the destination to a fake number.
      // We will copy to clipboard or just redirect, as instructed.
      alert('Pesan pemesanan telah di-copy ke clipboard. Lanjutkan bergabung ke grup WhatsApp untuk mem-paste pesan Anda kepada Admin.');
      navigator.clipboard.writeText(decodeURIComponent(text)).then(() => {
        window.open(WHATSAPP_PRODUCT_DESTINATION, '_blank');
      }).catch(err => {
        window.open(WHATSAPP_PRODUCT_DESTINATION, '_blank');
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const headerSlot = document.getElementById('site-header');
  if (headerSlot && headerSlot.dataset.loadError !== 'true') {
    document.addEventListener('site-header:loaded', initializeProducts, { once: true });
    return;
  }

  initializeProducts();
});
