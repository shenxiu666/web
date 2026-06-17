/* ============================================================
   doyoudo 克隆 — 通用 UI 逻辑（导航、搜索、Footer）
   ============================================================ */

// ---------- 导航高亮 ----------
function initNav() {
  // 高亮当前页
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(function(a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('router-link-active');
    }
  });
}

// ---------- Footer 年份 ----------
function initFooter() {
  var el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

// ---------- 搜索交互 ----------
function initSearch() {
  var input = document.querySelector('.search-box input');
  var cancelBtn = document.querySelector('.search-box .cancelSearch');
  if (input && cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      input.value = '';
      input.focus();
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var query = input.value.trim();
        if (query) {
          window.location.href = 'tutorials.html?search=' + encodeURIComponent(query);
        } else {
          // 如果搜索框为空，刷新当前页显示全部课程
          window.location.href = 'tutorials.html';
        }
      }
    });
  }
}
