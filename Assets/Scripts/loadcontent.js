function loadMarkdown(filePath, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return; // <- stop if the element doesn't exist

  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      return response.text();
    })
    .then(md => {
      el.innerHTML = marked.parse(md);
    })
    .catch(error => console.error('Error loading markdown:', error));
}

function loadHTML(filePath, elementId) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => console.error('Error loading HTML:', error));
}

/* ---- Calls for Main pages ---- */
loadMarkdown('/MarkdownFiles/HomePage.md', 'HomePage');
loadMarkdown('/MarkdownFiles/AboutMe.md', 'AboutMe');

/* ---- Calls for Projects page ---- */
loadMarkdown('/MarkdownFiles/Projects/ProjectsIndex.md', 'Projects');
loadMarkdown('/MarkdownFiles/Projects/WebsiteMakingNotes.md', 'WebsiteNotes');
loadMarkdown('/MarkdownFiles/Projects/LinuxNotes.md', 'LinuxNotes')

/* ---- Calls for Portfolio page ---- */
loadMarkdown('/MarkdownFiles/Portfolio/PortfolioIndex.md', 'Portfolio');

/* ---- Calls for Mixtapes page ---- */
loadMarkdown('/MarkdownFiles/Mixtapes/MixtapesIndex.md', 'Mixtapes');

/* ---- Calls for other files ---- */
loadHTML('/Assets/header.html', 'header');
