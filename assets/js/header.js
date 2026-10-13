(() => {
  const scriptUrl = new URL(document.currentScript.src);
  const siteRoot = new URL('../../', scriptUrl);
  const headerUrl = new URL('../../components/header.html', scriptUrl);
  const slot = document.getElementById('site-header');

  if (!slot) {
    console.error('Header component slot #site-header is missing.');
    return;
  }

  fetch(headerUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Unable to load shared header: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(markup => {
      const template = document.createElement('template');
      template.innerHTML = markup;

      template.content.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !/^(?:[a-z]+:|#|\/)/i.test(href)) {
          link.href = new URL(href, siteRoot).href;
        }
      });

      template.content.querySelectorAll('[data-site-logo]').forEach(image => {
        image.src = new URL('assets/images/logo mpm.webp', siteRoot).href;
      });

      template.content.querySelectorAll('form[data-site-search]').forEach(form => {
        form.action = new URL('pages/search.html', siteRoot).href;
      });

      slot.replaceWith(template.content);
      initializeLanguageSelector();
      document.dispatchEvent(new Event('site-header:loaded'));
    })
    .catch(error => {
      console.error(error);
      slot.dataset.loadError = 'true';
      document.dispatchEvent(new Event('site-header:loaded'));
    });

  function initializeLanguageSelector() {
    const translateElement = document.getElementById('google_translate_element');
    const status = document.getElementById('translateStatus');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!translateElement || !status) return;

    const isLocalPreview = window.location.protocol === 'file:';
    const isTranslationAvailable = !isLocalPreview && window.isSecureContext !== false;
    let pendingLanguage = null;
    let translateScriptRequested = false;
    let selectObserver;
    let selectTimeout;
    const languageNames = {
      id: 'Indonesia',
      en: 'English',
      de: 'Deutsch'
    };

    const setTranslationDisabledState = message => {
      document.querySelectorAll('[data-translate-language]').forEach(button => {
        button.disabled = true;
        button.setAttribute('aria-disabled', 'true');
      });
      status.textContent = message;
    };

    const updateActiveLanguage = language => {
      const selectedOption = document.querySelector(`[data-translate-language="${language}"]`);
      if (!selectedOption || !languageNames[language]) return;

      const flag = selectedOption.querySelector('.language-flag');
      document.querySelectorAll('[data-active-language-flag]').forEach(activeFlag => {
        if (flag) activeFlag.innerHTML = flag.innerHTML;
      });
      document.querySelectorAll('[data-active-language-name]').forEach(name => {
        name.textContent = languageNames[language];
      });
      document.querySelectorAll('[data-translate-language]').forEach(option => {
        option.setAttribute('aria-pressed', String(option.dataset.translateLanguage === language));
      });
    };

    const applyLanguage = language => {
      const languageSelect = document.querySelector('select.goog-te-combo');
      const selectValue = language;
      if (!languageSelect || !Array.from(languageSelect.options).some(option => option.value === selectValue)) {
        return false;
      }

      languageSelect.value = selectValue;
      if (languageSelect.value !== selectValue) return false;

      languageSelect.dispatchEvent(new Event('change', { bubbles: true }));
      status.textContent = {
        en: 'Translating page into English.',
        de: 'Seite wird ins Deutsche übersetzt.'
      }[language];
      return true;
    };

    const watchForLanguageSelect = () => {
      if (selectObserver) selectObserver.disconnect();
      selectObserver = new MutationObserver(() => {
        if (pendingLanguage && applyLanguage(pendingLanguage)) {
          pendingLanguage = null;
          selectObserver.disconnect();
          clearTimeout(selectTimeout);
          selectTimeout = null;
        }
      });
      selectObserver.observe(document.body, { childList: true, subtree: true });
    };

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'id',
          includedLanguages: 'en,de',
          autoDisplay: false
        }, 'google_translate_element');
        if (pendingLanguage && applyLanguage(pendingLanguage)) {
          pendingLanguage = null;
          if (selectObserver) selectObserver.disconnect();
          clearTimeout(selectTimeout);
          selectTimeout = null;
        }
      } catch (error) {
        console.error('Unable to initialize page translation.', error);
        status.textContent = 'Terjemahan tidak dapat dimulai. Silakan coba lagi.';
      }
    };

    const requestTranslation = language => {
      if (!isTranslationAvailable) {
        setTranslationDisabledState('Terjemahan hanya tersedia saat situs dijalankan dalam server yang aman.');
        return;
      }

      if (language === 'id') {
        try {
          localStorage.setItem('mpm_language', language);
        } catch (error) {
          console.error('Unable to save language preference.', error);
        }
        window.location.reload();
        return;
      }
      if (language !== 'en' && language !== 'de') return;
      pendingLanguage = language;
      status.textContent = {
        en: 'Loading English translation.',
        de: 'Deutsche Übersetzung wird geladen.'
      }[language];

      try {
        localStorage.setItem('mpm_language', language);
      } catch (error) {
        console.error('Unable to save language preference.', error);
      }

      if (applyLanguage(language)) {
        pendingLanguage = null;
        clearTimeout(selectTimeout);
        selectTimeout = null;
        return;
      }

      watchForLanguageSelect();
      clearTimeout(selectTimeout);
      selectTimeout = setTimeout(() => {
        if (pendingLanguage !== language) return;
        pendingLanguage = null;
        translateScriptRequested = false;
        if (selectObserver) selectObserver.disconnect();
        status.textContent = 'Terjemahan tidak merespons. Periksa koneksi internet atau coba lagi.';
        console.error('Google Translate did not provide a language selector.');
      }, 10000);

      if (translateScriptRequested) return;
      translateScriptRequested = true;

      const script = document.createElement('script');
      script.src = 'https://translate.googleapis.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.onerror = () => {
        translateScriptRequested = false;
        pendingLanguage = null;
        if (selectObserver) selectObserver.disconnect();
        status.textContent = 'Layanan terjemahan tidak tersedia. Periksa koneksi internet dan coba lagi.';
        console.error('Unable to load Google Translate.');
      };
      document.head.appendChild(script);
    };

    document.querySelectorAll('[data-translate-language]').forEach(button => {
      button.addEventListener('click', () => {
        if (button.disabled) return;
        const language = button.dataset.translateLanguage;
        updateActiveLanguage(language);
        requestTranslation(language);
        button.closest('details')?.removeAttribute('open');
        if (mobileMenu) mobileMenu.classList.add('hidden');
      });
    });

    if (!isTranslationAvailable) {
      setTranslationDisabledState('Terjemahan dinonaktifkan saat situs dibuka dari file lokal.');
      updateActiveLanguage('id');
      return;
    }

    updateActiveLanguage('id');
    try {
      const savedLanguage = localStorage.getItem('mpm_language');
      if (savedLanguage === 'en' || savedLanguage === 'de') {
        updateActiveLanguage(savedLanguage);
        requestTranslation(savedLanguage);
      }
    } catch (error) {
      console.error('Unable to read saved language preference.', error);
    }
  }
})();
