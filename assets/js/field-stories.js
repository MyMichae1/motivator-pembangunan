const fieldStorySections = {
  'field-activities': [
    {
      title: 'Sekolah Lapangan Iklim di Toraja',
      location: 'Toraja',
      videoId: 'LTm_y2JH564'
    },
    {
      title: 'Dukungan Aksi Adaptasi & Mitigasi Perubahan Iklim oleh Anggota DPRD Toraja Utara',
      location: 'Toraja Utara',
      videoId: 'DDyOFrA_Vao'
    },
    {
      title: 'Dari Pelajar Jadi Pengajar',
      location: 'Toraja',
      videoId: 'W3iEZwz2H18'
    },
    {
      title: 'Petani Serasa Mahasiswa',
      location: 'Toraja',
      videoId: '_7EYsJZgLUo'
    },
    {
      title: 'Saatnya Bertindak, Saatnya Peduli',
      location: 'Toraja',
      videoId: 'CZj96AxjtXk'
    },
    {
      title: 'Hasil Biopriming Benih Katokkon',
      location: 'Toraja',
      videoId: '1fNuZYNs1sE'
    }
  ]
};

const createStoryIcon = (path, className) => {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('aria-hidden', 'true');
  if (className) icon.setAttribute('class', className);
  const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  shape.setAttribute('d', path);
  icon.append(shape);
  return icon;
};

const createVideoDialog = () => {
  const dialog = document.createElement('dialog');
  dialog.className = 'field-story-video';
  dialog.setAttribute('aria-labelledby', 'field-story-video-title');

  const panel = document.createElement('div');
  panel.className = 'field-story-video__panel';

  const header = document.createElement('div');
  header.className = 'field-story-video__header';

  const title = document.createElement('h2');
  title.className = 'field-story-video__title';
  title.id = 'field-story-video-title';
  header.append(title);

  const closeButton = document.createElement('button');
  closeButton.className = 'field-story-video__close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Tutup video');
  closeButton.textContent = '\u00d7';
  closeButton.addEventListener('click', () => dialog.close());
  header.append(closeButton);

  const player = document.createElement('div');
  player.className = 'field-story-video__player';
  panel.append(header, player);
  dialog.append(panel);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    player.replaceChildren();
  });

  document.body.append(dialog);
  return { dialog, player, title };
};

const videoDialog = createVideoDialog();

const playStoryVideo = (story) => {
  videoDialog.title.textContent = story.title;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(story.videoId)}?autoplay=1&rel=0`;
  iframe.title = story.title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  videoDialog.player.replaceChildren(iframe);
  videoDialog.dialog.showModal();
};

document.querySelectorAll('[data-field-stories]').forEach((section) => {
  const stories = fieldStorySections[section.dataset.fieldStories];
  const grid = section.querySelector('[data-story-grid]');
  const previousButton = section.querySelector('[data-story-prev]');
  const nextButton = section.querySelector('[data-story-next]');
  if (!stories || !grid || stories.length < 3) return;

  let firstStoryIndex = 0;

  const createStoryCard = (story, isFeatured) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'field-story-card';
    card.setAttribute('aria-label', `Putar video: ${story.title}`);

    const image = document.createElement('img');
    image.src = `https://img.youtube.com/vi/${story.videoId}/hqdefault.jpg`;
    image.alt = '';
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      image.style.display = 'none';
    }, { once: true });
    card.append(image);

    const playIcon = createStoryIcon('M8 5v14l11-7z');
    const playButton = document.createElement('span');
    playButton.className = 'field-story-card__play';
    playButton.append(playIcon);
    card.append(playButton);

    const caption = document.createElement('span');
    caption.className = 'field-story-card__caption';

    const title = document.createElement('span');
    title.className = 'field-story-card__title';
    title.textContent = story.title;
    caption.append(title);

    if (story.location || story.date) {
      const metadata = document.createElement('span');
      metadata.className = 'field-story-card__meta';
      if (story.location) {
        const location = document.createElement('span');
        location.className = 'field-story-card__location';
        location.append(createStoryIcon('M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'));
        const locationText = document.createElement('span');
        locationText.textContent = story.location;
        location.append(locationText);
        metadata.append(location);
      }

      if (story.location && story.date) {
        const separator = document.createElement('span');
        separator.className = 'field-story-card__separator';
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = '\u2022';
        metadata.append(separator);
      }

      if (story.date) {
        const date = document.createElement('span');
        date.textContent = story.date;
        metadata.append(date);
      }
      caption.append(metadata);
    }
    card.append(caption);
    card.addEventListener('click', () => {
      playStoryVideo(story);
    });
    if (isFeatured) card.dataset.featured = 'true';
    return card;
  };

  const renderStories = () => {
    grid.replaceChildren();
    for (let offset = 0; offset < 3; offset += 1) {
      const story = stories[(firstStoryIndex + offset) % stories.length];
      grid.append(createStoryCard(story, offset === 0));
    }
  };

  previousButton?.addEventListener('click', () => {
    firstStoryIndex = (firstStoryIndex - 1 + stories.length) % stories.length;
    renderStories();
  });
  nextButton?.addEventListener('click', () => {
    firstStoryIndex = (firstStoryIndex + 1) % stories.length;
    renderStories();
  });

  renderStories();
});
