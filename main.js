import { portfolioData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  renderGalleries();
  renderWorkshops();
  renderBiography();
  renderPosters();
  handleNavigation();
});

function renderGalleries() {
  const container = document.getElementById('galleries-container');
  
  portfolioData.galleries.forEach(gallery => {
    const section = document.createElement('section');
    section.id = gallery.id;
    section.className = 'container';
    
    section.innerHTML = `
      <h2 class="section-title">${gallery.title}</h2>
      <p style="text-align: center; color: var(--text-secondary); margin-bottom: 4rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        ${gallery.description}
      </p>
      <div class="grid">
        ${gallery.items.map(item => `
          <div class="artwork-card">
            <div class="artwork-img-wrapper">
              <img src="${item.src}" alt="${item.title}" loading="lazy">
            </div>
            <div class="artwork-info">
              <h3 class="artwork-title">${item.title}</h3>
              <p class="artwork-meta">${item.meta}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    container.appendChild(section);
  });
}

function renderWorkshops() {
  document.getElementById('workshops-title').innerText = portfolioData.workshops.title;
  document.getElementById('workshops-desc').innerText = portfolioData.workshops.description;
  
  const grid = document.getElementById('workshops-grid');
  portfolioData.workshops.items.forEach(workshop => {
    const div = document.createElement('div');
    div.className = 'workshop-card';
    div.innerHTML = `
      <h3>${workshop.title}</h3>
      <p>${workshop.text}</p>
    `;
    grid.appendChild(div);
  });
}

function renderBiography() {
  document.getElementById('artist-photo').src = portfolioData.biography.photo;
  document.getElementById('bio-text').innerText = portfolioData.biography.text;
  
  const eduList = document.getElementById('education-list');
  portfolioData.biography.education.forEach(item => {
    const li = document.createElement('li');
    li.style.marginBottom = '0.5rem';
    li.innerHTML = `<span class="text-gold" style="margin-right: 0.5rem;">•</span> ${item}`;
    eduList.appendChild(li);
  });

  const expoList = document.getElementById('exhibitions-list');
  portfolioData.biography.exhibitions.forEach(item => {
    const li = document.createElement('li');
    li.style.marginBottom = '0.5rem';
    li.innerHTML = `<span class="text-gold" style="margin-right: 0.5rem;">•</span> ${item}`;
    expoList.appendChild(li);
  });

  const otherList = document.getElementById('other-list');
  portfolioData.biography.other.forEach(item => {
    const li = document.createElement('li');
    li.style.marginBottom = '0.5rem';
    li.innerHTML = `<span class="text-gold" style="margin-right: 0.5rem;">•</span> ${item}`;
    otherList.appendChild(li);
  });
}

function renderPosters() {
  const grid = document.getElementById('posters-grid');
  portfolioData.exhibitions.forEach(poster => {
    const div = document.createElement('div');
    div.className = 'artwork-card';
    div.innerHTML = `
      <div class="artwork-img-wrapper">
        <img src="${poster.src}" alt="${poster.title}" loading="lazy">
      </div>
      <div class="artwork-info">
        <h3 class="artwork-title" style="font-size: 1.1rem;">${poster.title}</h3>
      </div>
    `;
    grid.appendChild(div);
  });
}

function handleNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
        // Actualitzem el títol de la pestanya
        const sectionName = link.innerText;
        document.title = `Eva Is Romero | ${sectionName}`;
      }
    });
  });
}
