(() => {
  const recipient = 'MTVkondoran@gmail.com';
  const form = document.getElementById('contactMessageForm');
  if (!form) return;

  const status = document.getElementById('contactFormStatus');
  const fallback = document.getElementById('contactFormFallback');
  const fallbackBody = document.getElementById('contactFallbackBody');

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const senderEmail = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const body = [
      `Nama: ${name}`,
      `Email: ${senderEmail}`,
      '',
      message
    ].join('\n');

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.textContent = 'Membuka draf email. Pesan belum dikirim sampai Anda menekan tombol Kirim di aplikasi email.';
    }
    if (fallbackBody) {
      fallbackBody.value = body;
    }
    if (fallback) {
      fallback.classList.add('hidden');
    }

    window.location.href = mailtoUrl;

    window.setTimeout(() => {
      if (fallback) {
        fallback.classList.remove('hidden');
      }
      if (status) {
        status.textContent = 'Jika aplikasi email tidak terbuka, gunakan aplikasi email yang terpasang atau salin alamat tujuan dan isi pesan di bawah ini. Pesan belum dikirim oleh website.';
      }
    }, 1500);
  });
})();
