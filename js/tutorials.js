/* ============================================================
   doyoudo 克隆 — 教程列表页逻辑
   ============================================================ */

// ---------- 筛选状态 ----------
var filterState = { software:'all', difficulty:'all', type:'all', sort:'newest', search:'', page:1, perPage:12 };

/* 初始化筛选器 */
function initFilters() {
  var bar = document.querySelector('.search-filters');
  if (!bar) return;

  // URL params
  var params = new URLSearchParams(window.location.search);
  if (params.get('software')) filterState.software = params.get('software');
  if (params.get('search')) {
    filterState.search = params.get('search');
    var input = document.querySelector('.search-box input');
    if (input) input.value = filterState.search;
  }

  // 激活初始芯片
  document.querySelectorAll('.filter-btn[data-fgroup]').forEach(function(btn) {
    var g = btn.dataset.fgroup;
    var v = btn.dataset.fvalue;
    if (g === 'software' && v === filterState.software) btn.classList.add('active');
    if (g === 'difficulty' && v === filterState.difficulty) btn.classList.add('active');
    if (g === 'type' && v === filterState.type) btn.classList.add('active');
    if (!btn.classList.contains('active') && v === 'all') btn.classList.add('active');

    btn.addEventListener('click', function() {
      var siblings = btn.parentElement.querySelectorAll('.filter-btn');
      siblings.forEach(function(s) { s.classList.remove('active'); });
      btn.classList.add('active');
      if (g === 'software') filterState.software = v;
      if (g === 'difficulty') filterState.difficulty = v;
      if (g === 'type') filterState.type = v;
      filterState.page = 1;
      updateResults();
    });
  });

  // 排序
  var sortSel = document.getElementById('sortSelect');
  if (sortSel) {
    sortSel.addEventListener('change', function() {
      filterState.sort = this.value;
      filterState.page = 1;
      updateResults();
    });
  }

  updateResults();
}

/* 更新结果列表 */
function updateResults() {
  var grid = document.querySelector('.cards');
  if (!grid) return;

  var filtered = getCoursesBySoft(filterState.software);
  filtered = getCoursesByDiff(filtered, filterState.difficulty);
  filtered = getCoursesByType(filtered, filterState.type);
  // 搜索过滤
  if (filterState.search) {
    var q = filterState.search.toLowerCase();
    filtered = filtered.filter(function(c) {
      return c.title.toLowerCase().indexOf(q) >= 0 ||
             (c.author && c.author.toLowerCase().indexOf(q) >= 0) ||
             (c.software && c.software.toLowerCase().indexOf(q) >= 0);
    });
  }
  filtered = sortCourses(filtered, filterState.sort);

  var total = filtered.length;
  var totalPages = Math.ceil(total / filterState.perPage);
  var start = (filterState.page - 1) * filterState.perPage;
  var pageItems = filtered.slice(start, start + filterState.perPage);

  // 计数
  var countEl = document.getElementById('resultsCount');
  if (countEl) countEl.textContent = '共找到 ' + total + ' 个课程';

  // 渲染
  if (pageItems.length === 0) {
    grid.innerHTML = '<div class="notFound">没有找到相关课程，试试调整筛选条件吧</div>';
  } else {
    grid.innerHTML = pageItems.map(function(c) { return smartCardHTML(c); }).join('');
  }

  // 分页
  var pagEl = document.getElementById('pagination');
  if (pagEl && totalPages > 1) {
    var html = '';
    html += '<button class="filter-btn" data-pg="' + (filterState.page - 1) + '" ' + (filterState.page === 1 ? 'disabled style="opacity:0.4"' : '') + '>‹</button>';
    for (var i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= filterState.page - 1 && i <= filterState.page + 1)) {
        html += '<button class="filter-btn' + (i === filterState.page ? ' active' : '') + '" data-pg="' + i + '">' + i + '</button>';
      } else if (i === filterState.page - 2 || i === filterState.page + 2) {
        html += '<span style="padding:7px 8px;color:#acacac;">...</span>';
      }
    }
    html += '<button class="filter-btn" data-pg="' + (filterState.page + 1) + '" ' + (filterState.page === totalPages ? 'disabled style="opacity:0.4"' : '') + '>›</button>';
    pagEl.innerHTML = html;

    pagEl.querySelectorAll('[data-pg]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var pg = parseInt(this.dataset.pg);
        if (pg >= 1 && pg <= totalPages) {
          filterState.page = pg;
          updateResults();
          document.querySelector('.search-filters').scrollIntoView({ behavior:'smooth', block:'start' });
        }
      });
    });
  } else if (pagEl) {
    pagEl.innerHTML = '';
  }
}
