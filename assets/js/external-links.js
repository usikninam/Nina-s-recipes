// Open all recipe links in a new tab (runs once when the page finishes loading)
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.recipe-content a').forEach(function (link) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  });
  