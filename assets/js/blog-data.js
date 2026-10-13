(() => {
  const posts = [
    {
      slug: 'perkuat-ketangguhan-desa-mpm-latih-tim-siaga-bencana-mamuju',
      title: 'Perkuat Ketangguhan Desa, MPM Latih 45 Anggota Tim Siaga Bencana di Mamuju',
      author: 'penamasmotivator.org',
      tags: ['Pengurangan Risiko Bencana', 'Kesiapsiagaan', 'Mamuju', 'Pelatihan'],
      date: '2026-10-05',
      dateLabel: '05 Okt 2026',
      category: 'Pengurangan Risiko Bencana',
      image: 'https://penamasmotivator.org/wp-content/uploads/2026/10/MPM8913-1024x769.jpg.webp',
      imageAlt: 'Peserta pelatihan kesiapsiagaan bencana di Mamuju Tengah',
      excerpt: 'MPM melatih 45 anggota Tim Siaga Bencana dari tiga desa untuk memperkuat kesiapsiagaan dan ketangguhan masyarakat.'
    },
    {
      slug: 'rapat-koordinasi-dlh-ympm-proklim-2026',
      title: 'Rapat Koordinasi DLH Tana Toraja dan YMPM Bahas Penetapan Desa Dampingan untuk Program Kampung Iklim (PROKLIM) 2026',
      author: 'penamasmotivator.org',
      tags: ['PROKLIM', 'Perubahan Iklim', 'Lingkungan Hidup', 'Tana Toraja'],
      date: '2026-05-19',
      dateLabel: '19 Mei 2026',
      category: 'Lingkungan Hidup',
      image: 'https://penamasmotivator.org/wp-content/uploads/2026/05/MPM04050-1024x683.jpg.webp',
      imageAlt: 'Rapat koordinasi DLH Tana Toraja dan YMPM membahas Program Kampung Iklim 2026',
      excerpt: 'DLH Tana Toraja dan YMPM berkoordinasi menyiapkan desa dampingan untuk berpartisipasi dalam PROKLIM 2026.'
    },
    {
      slug: 'pelatihan-kompos-kakondongan-mahasiswa-uki-toraja',
      title: 'Pelatihan Kompos di Kakondongan Dorong Keterlibatan Mahasiswa Fak. Pertanian UKI Toraja dalam Pertanian Hijau',
      author: 'penamasmotivator.org',
      tags: ['Pertanian', 'Kompos', 'RYCAM', 'UKI Toraja', 'Pertanian Ramah Iklim'],
      date: '2026-05-15',
      dateLabel: '15 Mei 2026',
      category: 'Pertanian',
      image: 'https://penamasmotivator.org/wp-content/uploads/2026/05/MPM3980-1024x769.jpg.webp',
      imageAlt: 'Mahasiswa UKI Toraja mengikuti pelatihan pembuatan kompos di Kakondongan',
      excerpt: 'Pelatihan bersama tim RYCAM mengenalkan mahasiswa UKI Toraja pada pembuatan kompos dan praktik pertanian ramah iklim.'
    },
    {
      slug: 'penyerahan-550-bibit-pohon-camp-paskah-ppgt-nonongan-salu',
      title: 'Penyerahan 550 Bibit Pohon Warnai Pembukaan Camp Paskah PPGT Klasis Nonongan Salu',
      author: 'penamasmotivator.org',
      tags: ['Lingkungan Hidup', 'Pemuda', 'Penanaman Pohon', 'Perubahan Iklim'],
      date: '2026-05-02',
      dateLabel: '02 Mei 2026',
      category: 'Lingkungan Hidup',
      image: 'https://penamasmotivator.org/wp-content/uploads/2026/05/IMG_5623-1024x674.jpg.webp',
      imageAlt: 'Bibit pohon untuk aksi penghijauan di Camp Paskah PPGT Klasis Nonongan Salu',
      excerpt: 'Penyerahan 550 bibit pohon pada pembukaan Camp Paskah mengajak generasi muda gereja turut merawat lingkungan dan menghadapi perubahan iklim.'
    },
    {
      slug: 'menanam-pengetahuan-harapan-strategi-perubahan-iklim-lembang-ullin',
      title: 'Menanam Pengetahuan, Harapan, & Strategi Menghadapi Perubahan Iklim di Lembang Ullin Tana Toraja',
      author: 'penamasmotivator.org',
      tags: ['Pertanian', 'Petani Peneliti', 'Sekolah Lapang Iklim', 'Perubahan Iklim'],
      date: '2026-04-24',
      dateLabel: '24 Apr 2026',
      category: 'Pertanian',
      image: 'https://penamasmotivator.org/wp-content/uploads/2026/04/IMG_20260423_0956511-768x1024.jpg.webp',
      imageAlt: 'Petani peneliti mengikuti Sekolah Lapang Iklim Padi di Lembang Ullin',
      excerpt: 'Petani di Lembang Ullin belajar memahami perubahan iklim dan menguji varietas padi sebagai upaya membangun pertanian yang lebih tangguh.'
    },
    {
      slug: 'belajar-bersama-petani-peneliti',
      title: 'Belajar bukan selalu di kelas, mahasiswa dan petani peneliti bertemu, berbagi ilmu, dan menanam masa depan bersama',
      author: 'penamasmotivator.org',
      tags: ['Pertanian', 'Petani Peneliti', 'Pembelajaran', 'Kolaborasi'],
      date: '2026-04-24',
      dateLabel: '24 Apr 2026',
      category: 'Pertanian',
      image: 'https://penamasmotivator.org/wp-content/uploads/2026/04/IMG_20260423_1121341-scaled-e1777008724756-1024x676.jpg.webp',
      imageAlt: 'Lahan pertanian sebagai ruang belajar bersama',
      excerpt: 'Di lahan pertanian, mahasiswa dan petani peneliti dapat bertemu, bertukar pengetahuan, dan merawat gagasan untuk masa depan.'
    },
    {
      slug: 'green-ambassador',
      title: 'Green Ambassador: A Youth Movement on Climate Change Mitigation',
      author: 'penamasmotivator.org',
      tags: ['Lingkungan Hidup', 'Pemuda', 'Perubahan Iklim', 'Penanaman Pohon'],
      date: '2025-08-05',
      dateLabel: 'August 5, 2025',
      category: 'LHP',
      image: 'https://penamasmotivator.org/wp-content/uploads/2025/08/MPM2541-1024x683.jpg.webp',
      imageAlt: 'Green Ambassador',
      excerpt: 'Momentum Yayasan MPM Rangkul Anak Muda Melalui Aksi Tanam Pohon dan Talkshow Lintas Denominasi.'
    },
    {
      slug: 'siaga-bencana',
      title: 'Bukan Superhero Tapi Tetap Siaga Bencana',
      author: 'penamasmotivator.org',
      tags: ['Kesiapsiagaan Bencana', 'Mitigasi', 'Pelatihan', 'Toraja'],
      date: '2026-02-27',
      dateLabel: '27 Feb 2026',
      category: 'Kegiatan',
      image: 'https://penamasmotivator.org/wp-content/uploads/2025/08/MPM3721-768x512.jpg.webp',
      imageAlt: 'Kesiapsiagaan bencana',
      excerpt: 'Meningkatkan kapasitas masyarakat dalam melaksanakan kegiatan adaptasi dan kesiapsiagaan bencana.'
    },
  ];

  const projectRoot = new URL('../../', document.currentScript.src);
  const articleIcon = '<svg class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';

  function createPostCard(post, isHomepage, isFeatured = false) {
    const href = new URL(`pages/blog/${post.slug}.html`, projectRoot).href;
    const article = document.createElement('article');
    article.className = 'blog-card flex flex-col h-full bg-white';
    if (isFeatured) article.classList.add('blog-featured-card');

    const imageLink = document.createElement('a');
    imageLink.href = href;
    imageLink.className = 'img-wrapper block flex-shrink-0';

    const image = document.createElement('img');
    image.src = post.image;
    image.alt = post.imageAlt;
    image.loading = 'lazy';
    imageLink.append(image);

    const content = document.createElement('div');
    content.className = 'p-6 flex flex-col flex-grow';

    const metadata = document.createElement('div');
    metadata.className = 'text-sm text-gray-500 mb-3 flex flex-wrap gap-x-4 gap-y-1';
    const date = document.createElement('span');
    date.textContent = isHomepage ? `◷ ${post.dateLabel}` : post.dateLabel;
    const category = document.createElement('span');
    category.className = 'text-primary font-medium';
    category.textContent = post.category;
    metadata.append(date, category);

    const heading = document.createElement('h3');
    heading.className = 'text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors line-clamp-2';
    const titleLink = document.createElement('a');
    titleLink.href = href;
    titleLink.textContent = post.title;
    heading.append(titleLink);

    const excerpt = document.createElement('p');
    excerpt.className = 'text-gray-600 mb-4 flex-grow line-clamp-3';
    excerpt.textContent = post.excerpt;

    const readMore = document.createElement('a');
    readMore.href = href;
    readMore.className = 'text-primary font-semibold hover:text-dark mt-auto inline-flex items-center';
    readMore.append(document.createTextNode('Baca artikel'));
    readMore.insertAdjacentHTML('beforeend', articleIcon);

    content.append(metadata, heading, excerpt, readMore);
    article.append(imageLink, content);
    return article;
  }

  document.querySelectorAll('[data-blog-list]').forEach(container => {
    const isHomepage = container.dataset.blogList === 'latest';
    const authorFilter = new URLSearchParams(window.location.search).get('author');
    const tagFilter = new URLSearchParams(window.location.search).get('tag');
    const filteredPosts = posts.filter(post => {
      const authorMatches = !authorFilter || post.author.toLocaleLowerCase() === authorFilter.toLocaleLowerCase();
      const tagMatches = !tagFilter || post.tags.some(tag => tag.toLocaleLowerCase() === tagFilter.toLocaleLowerCase());
      return authorMatches && tagMatches;
    });
    const visiblePosts = [...posts]
      .filter(post => filteredPosts.includes(post))
      .sort((first, second) => second.date.localeCompare(first.date))
      .slice(0, isHomepage ? 6 : posts.length);

    visiblePosts.forEach((post, index) => {
      container.append(createPostCard(post, isHomepage, !isHomepage && index === 0));
    });

    if (!isHomepage) {
      const title = document.querySelector('[data-blog-list-title]');
      const description = document.querySelector('[data-blog-list-description]');
      if (authorFilter && title) title.textContent = `Artikel oleh ${authorFilter}`;
      if (tagFilter && title) title.textContent = `Artikel dengan tag: ${tagFilter}`;
      if ((authorFilter || tagFilter) && description) description.textContent = `${visiblePosts.length} artikel ditemukan.`;
      if (visiblePosts.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'col-span-full text-center text-gray-600';
        emptyMessage.textContent = 'Belum ada artikel yang sesuai.';
        container.append(emptyMessage);
      }
    }
  });

  document.querySelectorAll('[data-blog-image]').forEach(imageElement => {
    const post = posts.find(item => item.slug === imageElement.dataset.blogImage);
    if (post) {
      imageElement.src = post.image;
      imageElement.alt = post.imageAlt;
    }
  });

  document.querySelectorAll('[data-blog-recent]').forEach(container => {
    const currentSlug = container.dataset.blogRecent;
    posts
      .filter(post => post.slug !== currentSlug)
      .sort((first, second) => second.date.localeCompare(first.date))
      .slice(0, 3)
      .forEach(post => container.append(createPostCard(post, true)));
  });

  document.querySelectorAll('[data-blog-search-results]').forEach(container => {
    const query = new URLSearchParams(window.location.search).get('q')?.trim() || '';
    const queryTerms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const matches = posts.filter(post => {
      const searchableText = [
        post.title,
        post.excerpt,
        post.category,
        ...post.tags
      ].join(' ').toLocaleLowerCase();
      return queryTerms.every(term => searchableText.includes(term));
    });
    const queryLabel = document.querySelector('[data-search-query]');
    if (queryLabel) queryLabel.textContent = query || 'Masukkan kata kunci pencarian';

    if (!query) {
      container.append(makeElement('p', 'col-span-full text-gray-600', 'Masukkan kata kunci untuk mencari artikel blog.'));
    } else if (matches.length) {
      matches
        .sort((first, second) => second.date.localeCompare(first.date))
        .forEach(post => container.append(createPostCard(post, false)));
    } else {
      container.append(makeElement('p', 'col-span-full text-gray-600', 'Tidak ada artikel blog yang cocok.'));
    }
  });

  function makeElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function makeBlogListingUrl(key, value) {
    const url = new URL('pages/blog.html', projectRoot);
    url.searchParams.set(key, value);
    return url.href;
  }

  function readVoterId() {
    const storageKey = 'mpm_blog_voter_id';
    let voterId = localStorage.getItem(storageKey);
    if (!voterId) {
      voterId = crypto.randomUUID();
      localStorage.setItem(storageKey, voterId);
    }
    return voterId;
  }

  function renderEngagement(root, post) {
    const metadata = makeElement('div', 'blog-article-metadata');
    const authorRow = makeElement('p', 'mb-1');
    authorRow.append(document.createTextNode('Ditulis oleh '));
    const authorLink = makeElement('a', 'blog-author-link', post.author);
    authorLink.href = makeBlogListingUrl('author', post.author);
    authorRow.append(authorLink);
    const date = makeElement('time', 'text-gray-500', post.dateLabel);
    date.dateTime = post.date;
    metadata.append(authorRow, date);

    const tagsSection = makeElement('div', 'blog-tags');
    tagsSection.append(makeElement('h3', 'text-sm font-semibold text-gray-700 mb-2', 'Tag artikel'));
    const tagList = makeElement('div', 'flex flex-wrap gap-2');
    post.tags.forEach(tag => {
      const tagLink = makeElement('a', 'blog-tag', `# ${tag}`);
      tagLink.href = makeBlogListingUrl('tag', tag);
      tagList.append(tagLink);
    });
    tagsSection.append(tagList);

    const ratingSection = makeElement('section', 'blog-rating text-center');
    ratingSection.setAttribute('aria-labelledby', `rating-title-${post.slug}`);
    const ratingTitle = makeElement('h3', 'text-lg font-semibold text-gray-900 mb-2', 'Beri Rating Artikel');
    ratingTitle.id = `rating-title-${post.slug}`;
    const summary = makeElement('p', 'text-sm text-gray-600 mb-3', 'Memuat rating…');
    summary.dataset.ratingSummary = '';
    const stars = makeElement('div', 'blog-rating-stars');
    stars.setAttribute('role', 'group');
    stars.setAttribute('aria-label', 'Pilih rating dari 1 sampai 5');
    for (let score = 1; score <= 5; score += 1) {
      const button = makeElement('button', 'blog-rating-star', '★');
      button.type = 'button';
      button.dataset.ratingScore = String(score);
      button.setAttribute('aria-label', `Beri rating ${score} dari 5`);
      stars.append(button);
    }
    const ratingStatus = makeElement('p', 'text-sm text-gray-600 mt-2');
    ratingStatus.dataset.ratingStatus = '';
    const distribution = makeElement('div', 'blog-rating-distribution');
    distribution.dataset.ratingDistribution = '';
    ratingSection.append(ratingTitle, summary, stars, ratingStatus, distribution);

    const commentsSection = makeElement('section', 'blog-comments');
    commentsSection.setAttribute('aria-labelledby', `comments-title-${post.slug}`);
    const commentsHeading = makeElement('h3', 'text-lg font-semibold text-gray-900 mb-4');
    commentsHeading.id = `comments-title-${post.slug}`;
    commentsHeading.dataset.commentsCount = '';
    commentsHeading.textContent = 'Komentar';

    const form = makeElement('form', 'blog-comment-form');
    form.dataset.commentForm = '';
    const nameInput = makeElement('input', 'blog-comment-name');
    nameInput.type = 'text';
    nameInput.name = 'author';
    nameInput.placeholder = 'Nama Anda';
    nameInput.maxLength = 80;
    nameInput.required = true;
    nameInput.autocomplete = 'name';
    const commentInput = makeElement('textarea', 'blog-comment-input');
    commentInput.name = 'body';
    commentInput.placeholder = 'Tulis komentar…';
    commentInput.maxLength = 2000;
    commentInput.rows = 4;
    commentInput.required = true;
    const submit = makeElement('button', 'btn btn-primary blog-comment-submit', 'Kirim komentar');
    submit.type = 'submit';
    const formStatus = makeElement('p', 'text-sm text-gray-600');
    formStatus.dataset.commentStatus = '';
    form.append(nameInput, commentInput, submit, formStatus);
    const commentList = makeElement('ol', 'blog-comment-list');
    commentList.dataset.commentList = '';
    commentsSection.append(commentsHeading, form, commentList);

    const error = makeElement('p', 'blog-engagement-error');
    error.dataset.engagementError = '';
    error.setAttribute('role', 'status');
    root.append(metadata, tagsSection, ratingSection, commentsSection, error);

    async function loadEngagement() {
      try {
        const response = await fetch(`/api/blogs/${encodeURIComponent(post.slug)}/engagement`, {
          headers: { 'X-Voter-Id': readVoterId() }
        });
        if (!response.ok) throw new Error(`Gagal memuat data interaksi (HTTP ${response.status}).`);
        const data = await response.json();
        updateRating(data.rating, data.myRating);
        updateComments(data.comments);
      } catch (error) {
        if (post.slug === 'newsletter-september-2026' && error.message.includes('(HTTP 404)')) {
          ratingSection.hidden = true;
          commentsSection.hidden = true;
          console.warn('Newsletter rating and comments are unavailable until the engagement API is deployed.');
          return;
        }
        root.querySelector('[data-engagement-error]').textContent = `${error.message} Pastikan server lokal berjalan.`;
      }
    }

    function updateRating(rating, myRating) {
      const average = Number(rating.average || 0);
      summary.textContent = rating.count
        ? `Rata-rata ${average.toFixed(1)} dari 5 · ${rating.count} suara`
        : 'Belum ada rating. Jadilah yang pertama memberi rating.';
      stars.querySelectorAll('[data-rating-score]').forEach(button => {
        const score = Number(button.dataset.ratingScore);
        button.classList.toggle('is-selected', score <= Math.round(average));
        button.classList.toggle('is-mine', score === myRating);
        button.setAttribute('aria-pressed', String(score === myRating));
      });
      ratingStatus.textContent = myRating ? `Rating Anda: ${myRating} dari 5 (dapat diubah).` : '';
      distribution.replaceChildren();
      for (let score = 5; score >= 1; score -= 1) {
        const row = makeElement('div', 'blog-rating-row');
        const label = makeElement('span', '', `${score} ★`);
        const track = makeElement('span', 'blog-rating-track');
        const bar = makeElement('span', 'blog-rating-bar');
        const count = rating.distribution?.[score] || 0;
        bar.style.width = `${rating.count ? count / rating.count * 100 : 0}%`;
        track.append(bar);
        row.append(label, track, makeElement('span', 'text-xs text-gray-500', String(count)));
        distribution.append(row);
      }
    }

    function updateComments(comments) {
      commentsHeading.textContent = `Komentar (${comments.length})`;
      commentList.replaceChildren();
      comments.forEach(comment => {
        const item = makeElement('li', 'blog-comment');
        const details = makeElement('div', 'blog-comment-meta');
        details.append(
          makeElement('strong', 'text-gray-900', comment.author),
          makeElement('time', 'text-sm text-gray-500', new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short'
          }).format(new Date(comment.createdAt)))
        );
        item.append(details, makeElement('p', 'text-gray-700 whitespace-pre-wrap', comment.body));
        commentList.append(item);
      });
    }

    function previewRating(score) {
      stars.querySelectorAll('[data-rating-score]').forEach(button => {
        button.classList.toggle('is-preview', Number(button.dataset.ratingScore) <= score);
      });
    }

    stars.addEventListener('pointerover', event => {
      const button = event.target.closest('[data-rating-score]');
      if (button) previewRating(Number(button.dataset.ratingScore));
    });
    stars.addEventListener('pointerleave', () => previewRating(0));
    stars.addEventListener('focusin', event => {
      const button = event.target.closest('[data-rating-score]');
      if (button) previewRating(Number(button.dataset.ratingScore));
    });
    stars.addEventListener('focusout', event => {
      if (!stars.contains(event.relatedTarget)) previewRating(0);
    });

    stars.addEventListener('click', async event => {
      const button = event.target.closest('[data-rating-score]');
      if (!button) return;
      ratingStatus.textContent = 'Menyimpan rating…';
      try {
        const response = await fetch(`/api/blogs/${encodeURIComponent(post.slug)}/ratings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Voter-Id': readVoterId()
          },
          body: JSON.stringify({ score: Number(button.dataset.ratingScore) })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Rating gagal disimpan.');
        updateRating(result.rating, result.myRating);
      } catch (error) {
        ratingStatus.textContent = error.message;
      }
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      submit.disabled = true;
      formStatus.textContent = 'Mengirim komentar…';
      try {
        const response = await fetch(`/api/blogs/${encodeURIComponent(post.slug)}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            author: nameInput.value.trim(),
            body: commentInput.value.trim()
          })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Komentar gagal dikirim.');
        commentInput.value = '';
        formStatus.textContent = 'Komentar berhasil dikirim.';
        updateComments(result.comments);
      } catch (error) {
        formStatus.textContent = error.message;
      } finally {
        submit.disabled = false;
      }
    });

    loadEngagement();
  }

  document.querySelectorAll('[data-blog-engagement]').forEach(root => {
    const post = posts.find(item => item.slug === root.dataset.blogEngagement) || (
      root.dataset.author && root.dataset.date && root.dataset.tags
        ? {
            slug: root.dataset.blogEngagement,
            author: root.dataset.author,
            date: root.dataset.date,
            dateLabel: root.dataset.dateLabel,
            tags: root.dataset.tags.split('|').filter(Boolean)
          }
        : null
    );
    if (!post) {
      root.textContent = 'Data artikel tidak ditemukan.';
      return;
    }
    renderEngagement(root, post);
  });
})();
