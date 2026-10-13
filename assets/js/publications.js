(() => {
  const newsletters = [
    {
      slug: 'maret',
      month: 'Maret 2026',
      editionLabel: 'Edisi 001 · Maret 2026',
      title: 'Langkah Sederhana, Dampak Luar Biasa',
      image: 'assets/images/newsletter-maret-2026.png',
      imageAlt: 'Sampul Newsletter MPM edisi 001, Maret 2026',
      summary: 'Dari langkah sederhana, harapan untuk menjaga alam dan masa depan pangan terus tumbuh.',
      author: 'penamasmotivator.org',
      date: '2026-03',
      dateLabel: 'Maret 2026',
      tags: ['Lingkungan', 'Pertanian', 'Perubahan Iklim', 'Kompos', 'Pemuda'],
      pdf: 'assets/publications/Newsletter Maret.pdf',
      downloadName: 'newsletter-mpm-edisi-001-maret-2026.pdf',
      articles: []
    },
    {
      slug: 'april',
      month: 'April 2026',
      editionLabel: 'Edisi 002 · April 2026',
      title: 'Dari Toraja, Cerita tentang Harapan yang Terus Tumbuh',
      image: 'assets/images/newsletter-april-2026.png',
      imageAlt: 'Sampul Newsletter MPM edisi 002, April 2026',
      summary: 'Cerita dari Toraja tentang langkah sederhana yang dilakukan bersama untuk menjaga alam dan beradaptasi dengan perubahan iklim.',
      author: 'penamasmotivator.org',
      date: '2026-04',
      dateLabel: 'April 2026',
      tags: ['Perubahan Iklim', 'RYCAM', 'Pertanian Berkelanjutan', 'Petani Peneliti'],
      pdf: 'assets/publications/Newsletter April.pdf',
      downloadName: 'newsletter-mpm-edisi-002-april-2026.pdf',
      articles: []
    },
    {
      slug: 'mei',
      month: 'Mei 2026',
      editionLabel: 'Edisi 003 · Mei 2026',
      title: 'Bertani dengan Inovasi, Bergerak dengan Kolaborasi',
      image: 'assets/images/newsletter-mei-2026.png',
      imageAlt: 'Sampul Newsletter MPM edisi 003, Mei 2026',
      summary: 'Mendorong pembelajaran, inovasi, dan kolaborasi masyarakat dalam mengelola potensi lokal melalui praktik pertanian ramah lingkungan dan berkelanjutan.',
      author: 'penamasmotivator.org',
      date: '2026-05',
      dateLabel: 'Mei 2026',
      tags: ['Pertanian Berkelanjutan', 'Inovasi', 'Kolaborasi', 'Pemberdayaan Masyarakat'],
      pdf: 'assets/publications/Newsletter Mei.pdf',
      downloadName: 'newsletter-mpm-edisi-003-mei-2026.pdf',
      articles: []
    },
    {
      slug: 'juni',
      month: 'Juni 2026',
      editionLabel: 'Edisi 004 · Juni 2026',
      title: 'Belajar, Bergerak, Berkolaborasi',
      image: 'assets/images/newsletter-juni-2026.png',
      imageAlt: 'Sampul Newsletter MPM edisi 004, Juni 2026',
      summary: 'Berbagai kegiatan dan kolaborasi mendorong aksi nyata menghadapi perubahan iklim dan mewujudkan masyarakat tangguh iklim.',
      author: 'penamasmotivator.org',
      date: '2026-06',
      dateLabel: 'Juni 2026',
      tags: ['Ketahanan Iklim', 'Keadilan Iklim', 'ProKlim', 'Pertanian'],
      pdf: 'assets/publications/Newsletter Juni.pdf',
      downloadName: 'newsletter-mpm-edisi-004-juni-2026.pdf',
      articles: []
    },
    {
      slug: 'juli',
      month: 'Juli 2026',
      editionLabel: 'Edisi 005 · Juli 2026',
      title: 'Langkah Kecil, Dampak Besar',
      image: 'assets/images/newsletter-juli-2026.png',
      imageAlt: 'Sampul Newsletter MPM edisi 005, Juli 2026',
      summary: 'Dari lahan kami belajar, dari masyarakat kami bergerak, bersama kita membangun masa depan yang berkelanjutan.',
      author: 'penamasmotivator.org',
      date: '2026-07',
      dateLabel: 'Juli 2026',
      tags: ['Youth Camp RYCAM', 'Generasi Muda', 'Perubahan Iklim', 'Deklarasi Bali', 'Keanekaragaman Hayati'],
      pdf: 'assets/publications/Newsletter Juli.pdf',
      downloadName: 'newsletter-mpm-edisi-005-juli-2026.pdf',
      articles: []
    },
    {
      slug: 'agustus',
      month: 'Agustus 2026',
      editionLabel: 'Edisi 006 · Agustus 2026',
      title: 'Dari Lahan untuk Perubahan',
      image: 'assets/images/newsletter-agustus-2026.png',
      imageAlt: 'Sampul Newsletter MPM edisi 006, Agustus 2026',
      summary: 'Inovasi, aksi iklim, dan pembelajaran bersama petani peneliti untuk membangun pertanian berkelanjutan dan desa tangguh terhadap perubahan iklim.',
      author: 'penamasmotivator.org',
      date: '2026-08',
      dateLabel: 'Agustus 2026',
      tags: ['Petani Peneliti', 'Pertanian Berkelanjutan', 'Aksi Iklim', 'Generasi Muda', 'Inovasi'],
      pdf: 'assets/publications/Newsletter Agustus.pdf',
      downloadName: 'newsletter-mpm-edisi-006-agustus-2026.pdf',
      articles: []
    },
    {
      slug: 'september',
      month: 'September 2026',
      editionLabel: 'Edisi 007 · September 2026',
      title: 'Dari Aksi Lokal Menuju Ketangguhan Iklim',
      theme: 'Belajar, berinovasi, dan berkolaborasi untuk masyarakat yang tangguh dan berkelanjutan',
      image: 'assets/images/newsletter-september-2026.png',
      imageAlt: 'Sampul Newsletter MPM edisi 007, September 2026',
      summary: 'Belajar, berinovasi, berkolaborasi, dan mengembangkan potensi masyarakat untuk membangun pertanian, lingkungan, dan komunitas yang lebih tangguh dan berkelanjutan.',
      author: 'penamasmotivator.org',
      date: '2026-09',
      dateLabel: 'September 2026',
      tags: ['Pertanian', 'Perubahan Iklim', 'RYCAM', 'Petani Muda', 'Kompos'],
      pdf: 'assets/publications/newsletter-mpm-edisi-007.pdf',
      downloadName: 'newsletter-mpm-edisi-007.pdf',
      articles: []
    }
  ];

  const scriptUrl = new URL(document.currentScript.src);
  const projectRoot = new URL('../../', scriptUrl);
  const newestFirst = [...newsletters].reverse();

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function createNewsletterCard(issue, isFeatured = false) {
    if (issue.unavailable) {
      const card = makeElement('article', 'blog-card publication-card flex flex-col h-full bg-white');
      if (isFeatured) card.classList.add('blog-featured-card');
      const cover = makeElement('div', 'img-wrapper publication-cover');
      const image = document.createElement('img');
      image.src = new URL(issue.image, projectRoot).href;
      image.alt = issue.imageAlt;
      cover.append(image);

      const content = makeElement('div', 'p-6 flex flex-col flex-grow');
      content.append(
        makeElement('span', 'text-sm text-primary font-semibold mb-2', `Newsletter · ${issue.editionLabel}`),
        makeElement('h2', 'text-xl font-bold text-gray-900 mb-3 line-clamp-2', issue.title),
        makeElement('p', 'text-gray-600 mb-4 flex-grow', issue.summary),
        makeElement('span', 'text-gray-500 font-semibold mt-auto', 'Belum tersedia')
      );
      card.append(cover, content);
      return card;
    }

    const link = makeElement('a', 'blog-card publication-card flex flex-col h-full bg-white');
    if (isFeatured) link.classList.add('blog-featured-card');
    link.href = new URL(`pages/newsletter.html?edisi=${issue.slug}`, projectRoot).href;
    link.setAttribute('aria-label', `Buka Newsletter ${issue.month}: ${issue.title}`);

    const cover = makeElement('div', 'img-wrapper publication-cover');
    const image = document.createElement('img');
    image.src = new URL(issue.image, projectRoot).href;
    image.alt = issue.imageAlt;
    cover.append(image);

    const content = makeElement('div', 'p-6 flex flex-col flex-grow');
    const month = makeElement('span', 'text-sm text-primary font-semibold mb-2', `Newsletter · ${issue.editionLabel || `Edisi ${issue.month}`}`);
    const title = makeElement('h2', 'text-xl font-bold text-gray-900 mb-3 line-clamp-2', issue.title);
    const summary = makeElement('p', 'text-gray-600 mb-4 flex-grow line-clamp-3', issue.summary);
    const open = makeElement('span', 'text-primary font-semibold mt-auto', 'Baca newsletter →');
    content.append(month, title, summary, open);
    link.append(cover, content);
    return link;
  }

  document.querySelectorAll('[data-newsletter-list]').forEach(container => {
    newestFirst.forEach((issue, index) => container.append(createNewsletterCard(issue, index === 0)));
  });

  document.querySelectorAll('[data-newsletter-preview]').forEach(container => {
    newestFirst.forEach(issue => container.append(createNewsletterCard(issue)));
  });

  document.querySelectorAll('[data-publication-search-results]').forEach(container => {
    const query = new URLSearchParams(window.location.search).get('q')?.trim() || '';
    const queryTerms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const matches = newestFirst.filter(issue => {
      const searchableText = [
        issue.month,
        issue.editionLabel,
        issue.title,
        issue.summary,
        ...issue.tags
      ].join(' ').toLocaleLowerCase();
      return queryTerms.every(term => searchableText.includes(term));
    });
    const queryLabel = document.querySelector('[data-search-query]');
    if (queryLabel) queryLabel.textContent = query || 'Masukkan kata kunci pencarian';

    if (!query) {
      container.append(makeElement('p', 'col-span-full text-gray-600', 'Masukkan kata kunci untuk mencari publikasi.'));
    } else if (matches.length) {
      matches.forEach(issue => container.append(createNewsletterCard(issue)));
    } else {
      container.append(makeElement('p', 'col-span-full text-gray-600', 'Tidak ada publikasi yang cocok.'));
    }
  });

  const issueSlug = new URLSearchParams(window.location.search).get('edisi');
  const issue = newsletters.find(item => item.slug === issueSlug);
  const articleRoot = document.querySelector('[data-newsletter-article]');
  document.querySelectorAll('[data-newsletter-related]').forEach(container => {
    newestFirst
      .filter(item => item.slug !== issueSlug && !item.unavailable)
      .slice()
      .slice(0, 3)
      .forEach(item => container.append(createNewsletterCard(item)));
  });

  if (articleRoot) {
    if (!issue) {
      document.title = 'Newsletter tidak ditemukan - Yayasan MPM';
      articleRoot.replaceChildren(
        makeElement('h1', 'text-3xl font-bold text-gray-900 mb-4', 'Newsletter tidak ditemukan'),
        makeElement('p', 'text-gray-600', 'Pilih edisi newsletter dari halaman publikasi.')
      );
      return;
    }

    document.title = `${issue.unavailable ? `Newsletter ${issue.month}` : `Newsletter ${issue.month}: ${issue.title}`} - Yayasan MPM`;
    document.querySelectorAll('[data-newsletter-title]').forEach(element => {
      element.textContent = issue.unavailable ? `Newsletter ${issue.month}` : `Newsletter ${issue.month}: ${issue.title}`;
    });
    document.querySelectorAll('[data-newsletter-month]').forEach(element => {
      element.textContent = issue.editionLabel || `Edisi ${issue.month}`;
    });
    document.querySelectorAll('[data-newsletter-summary]').forEach(element => {
      element.textContent = issue.summary;
    });
    const cover = document.querySelector('[data-newsletter-cover]');
    if (cover) {
      cover.src = new URL(issue.image, projectRoot).href;
      cover.alt = issue.imageAlt;
    }

    if (issue.author && issue.date && issue.tags) {
      const engagement = document.querySelector('[data-newsletter-engagement]');
      if (engagement) {
        engagement.hidden = false;
        engagement.dataset.blogEngagement = `newsletter-${issue.slug}-2026`;
        engagement.dataset.author = issue.author;
        engagement.dataset.date = issue.date;
        engagement.dataset.dateLabel = issue.dateLabel;
        engagement.dataset.tags = issue.tags.join('|');
      }
    }

    if (issue.pdf) {
      const draftNotice = document.querySelector('[data-newsletter-draft-notice]');
      if (draftNotice) draftNotice.hidden = true;

      const pdfUrl = new URL(issue.pdf, projectRoot).href;
      const downloadPrompt = makeElement(
        'p',
        'text-gray-700 mb-4',
        `Ingin membaca newsletter lengkap ${issue.editionLabel}? Unduh PDF-nya melalui tombol berikut.`
      );
      const download = makeElement('a', 'btn btn-outline mb-6', `Unduh Newsletter ${issue.month} (PDF)`);
      download.href = pdfUrl;
      download.download = issue.downloadName;
      articleRoot.replaceChildren(downloadPrompt, download);
    } else if (issue.unavailable) {
      const notice = document.querySelector('[data-newsletter-draft-notice]');
      if (notice) {
        notice.hidden = false;
        notice.textContent = issue.summary;
      }
      articleRoot.replaceChildren();
    } else {
      issue.articles.forEach(article => {
        articleRoot.append(makeElement('h2', 'text-2xl font-bold text-gray-900 mt-10 mb-4', article.heading));
        article.paragraphs.forEach(paragraph => {
          articleRoot.append(makeElement('p', '', paragraph));
        });
      });
    }
  }
})();
