// ---- Sidebar toggle (mobile) ----
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebarToggle');
  const closeBtn = document.getElementById('sidebarClose');
  const overlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }
  if (toggle) toggle.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // ---- Collapsible nav groups; auto-open the group containing current page ----
  document.querySelectorAll('.nav-group-title').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentElement.classList.toggle('open');
    });
  });
  const current = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-group').forEach(function (group) {
    const links = group.querySelectorAll('a');
    links.forEach(function (a) {
      const href = a.getAttribute('href').replace(/\/$/, '');
      if (href && current.endsWith(href) && href !== '') {
        group.classList.add('open');
        a.classList.add('active');
      }
    });
  });
});

// ---- Generic helpers used across tool pages ----
function bgCopyText(text) {
  navigator.clipboard.writeText(text).then(function () {
    alert('Copy ho gaya!');
  });
}

function bgDownloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function bgDownloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  bgDownloadDataUrl(url, filename);
  setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
}
