// Tabs
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.page + '-page').classList.add('active');
  });
});

// Shortcuts
const shortcuts = document.querySelectorAll('.shortcut');
shortcuts.forEach(sc => {
  sc.addEventListener('click', () => {
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(sc.dataset.page + '-page').classList.add('active');

    tabs.forEach(t => t.classList.remove('active'));
    const searchTab = document.querySelector(`.tab[data-page="${sc.dataset.page}"]`);
    if(searchTab) searchTab.classList.add('active');
  });
});

// Load last theme (from localStorage)
const savedTheme = localStorage.getItem('prty-theme');
if(savedTheme) document.body.className = savedTheme;

// Scramjet search (placeholder function)
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if(!query) return;

  searchResults.innerHTML = `<p>Searching for "${query}"...</p>`;

  try {
    const response = await fetch(`https://scramjet-proxy.example.com/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    searchResults.innerHTML = data.results.map(r => `<p><a href="${r.url}" target="_blank">${r.title}</a></p>`).join('');
  } catch(err) {
    searchResults.innerHTML = `<p>Error fetching results.</p>`;
  }
});
