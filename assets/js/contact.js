(() => {
  const form = document.getElementById('contactMessageForm');
  if (!form) return;

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
    const mailtoUrl = new URL('mailto:mtvkondoran@gmail.com');
    mailtoUrl.searchParams.set('subject', subject);
    mailtoUrl.searchParams.set('body', body);

    window.location.href = mailtoUrl.href;
  });
})();
