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

/* ---- Calls ---- */

loadMarkdown('MarkdownFiles/HomePage.md', 'HomePage');
loadMarkdown('MarkdownFiles/AboutMe.md', 'AboutMe');
loadMarkdown('MarkdownFiles/Projects.md', 'Projects');
loadMarkdown('MarkdownFiles/Portfolio.md', 'Portfolio');
loadMarkdown('MarkdownFiles/Mixtapes.md', 'Mixtapes');
loadMarkdown('MarkdownFiles/ProjectNotes/WebsiteMakingNotes.md', 'WebsiteNotes');

loadHTML('header.html', 'header');

