/**
 * Yayasan MPM - Donation Form Processing & Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  const donasiForm = document.getElementById('donasiForm');
  
  if (donasiForm) {
    const nominalButtons = document.querySelectorAll('.nominal-btn');
    const nominalInput = document.getElementById('nominalCustom');
    const fileInput = document.getElementById('buktiTransfer');
    const fileError = document.getElementById('fileError');
    
    // Quick select nominal
    nominalButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        nominalButtons.forEach(b => {
          b.classList.remove('bg-[#1B6B2F]', 'text-white');
          b.classList.add('bg-white', 'text-[#1B6B2F]');
        });
        
        // Add active class to clicked
        btn.classList.remove('bg-white', 'text-[#1B6B2F]');
        btn.classList.add('bg-[#1B6B2F]', 'text-white');
        
        // Set input value to data attribute
        if(btn.dataset.value === "custom") {
          nominalInput.value = "";
          nominalInput.focus();
        } else {
          nominalInput.value = btn.dataset.value;
        }
      });
    });

    // Custom nominal typing resets buttons
    nominalInput.addEventListener('input', () => {
      nominalButtons.forEach(b => {
        b.classList.remove('bg-[#1B6B2F]', 'text-white');
        b.classList.add('bg-white', 'text-[#1B6B2F]');
      });
      // Optionally format currency here
    });

    // Form Validation on Submit
    donasiForm.addEventListener('submit', (e) => {
      let isValid = true;
      e.preventDefault();

      // Clear previous styles/errors
      fileError.textContent = '';
      
      // 1. File Size Validation (Max 5MB)
      if (fileInput.files.length > 0) {
        const fileSize = fileInput.files[0].size;
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (fileSize > maxSize) {
          fileError.textContent = 'Ukuran file maksimal 5MB.';
          isValid = false;
        }
      } else {
        fileError.textContent = 'Bukti transfer wajib diunggah.';
        isValid = false;
      }

      // 2. Email valid (HTML5 'email' type covers basic, but we rely on required and basic check)
      const emailInput = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('border-red-500');
      } else {
        emailInput.classList.remove('border-red-500');
      }

      // 3. Nominal Input check
      if(!nominalInput.value || parseInt(nominalInput.value) < 10000) {
         isValid = false;
         nominalInput.classList.add('border-red-500');
         alert('Nominal donasi minimal Rp 10.000');
      } else {
         nominalInput.classList.remove('border-red-500');
      }

      if (isValid) {
        // Simulating form submission
        const submitBtn = donasiForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Memproses...';
        submitBtn.disabled = true;

        setTimeout(() => {
          alert('Terima kasih! Bukti donasi Anda telah kami terima dan akan segera diverifikasi.');
          donasiForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          // Reset nominal buttons
          nominalButtons.forEach(b => {
            b.classList.remove('bg-[#1B6B2F]', 'text-white');
            b.classList.add('bg-white', 'text-[#1B6B2F]');
          });
        }, 1500);
      }
    });
  }
});
