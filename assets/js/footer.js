(() => {
  const scriptUrl = new URL(document.currentScript.src);
  const siteRoot = new URL('../../', scriptUrl);
  const footerUrl = new URL('../../components/footer.html', scriptUrl);
  const slot = document.getElementById('site-footer');

  if (!slot) {
    console.error('Footer component slot #site-footer is missing.');
    return;
  }

  fetch(footerUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Unable to load shared footer: ${response.status} ${response.statusText}`);
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

      slot.replaceWith(template.content);
    })
    .catch(error => {
      console.error(error);
    });
})();
