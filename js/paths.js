/* ============================================================
   doyoudo 克隆 — 学习路径页逻辑
   ============================================================ */

/* 初始化学习路径页 */
function initPaths() {
  if (!window.location.pathname.includes('learning-path')) return;
  var grid = document.getElementById('pathGridFull');
  if (!grid) return;

  var currentFilter = 'all';

  function renderPaths(filter) {
    var items = filter === 'all' ? learningPathsData : learningPathsData.filter(function(p) { return p.software === filter; });
    grid.innerHTML = items.map(function(p) {
      return '<div class="path-card-item" onclick="location.href=\'tutorials.html?software=' + p.software + '\'">' +
        '<div class="path-card-icon ' + p.color + '">' + p.icon + '</div>' +
        '<div style="flex:1;">' +
          '<h3 style="font-size:16px;font-weight:600;color:#2a301b;margin-bottom:6px;">' + p.title + '</h3>' +
          '<p style="font-size:13px;color:#707070;line-height:1.5;margin-bottom:10px;">' + p.desc + '</p>' +
          '<div class="path-stages">' +
            p.stages.map(function(s, i) {
              return (i > 0 ? '<span class="path-stage-arrow">→</span>' : '') + '<span class="path-stage-tag" title="' + s.desc + '">' + s.name + '</span>';
            }).join('') +
          '</div>' +
          '<div style="display:flex;gap:16px;margin-top:10px;font-size:12px;color:#acacac;">' +
            '<span>📚 ' + p.totalLessons + ' 课时</span>' +
            '<span>⏱ ' + p.totalDuration + '</span>' +
            '<span>📦 ' + p.courseCount + ' 门课程</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    if (items.length === 0) {
      grid.innerHTML = '<div class="notFound" style="width:100%;">该软件的学习路径正在建设中，敬请期待！</div>';
    }
  }

  renderPaths('all');

  document.querySelectorAll('.filter-btn[data-path-filter]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn[data-path-filter]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.dataset.pathFilter;
      renderPaths(currentFilter);
    });
  });
}
