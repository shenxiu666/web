/* ============================================================
   doyoudo 克隆 — 首页逻辑
   ============================================================ */

/* 初始化首页 */
function initHome() {
  // 仅首页
  if (window.location.pathname.includes('tutorials') || window.location.pathname.includes('tutorial-detail') || window.location.pathname.includes('learning-path')) return;

  // 热门课程（前 8 个）
  var grid = document.querySelector('.cards');
  if (grid) {
    var popular = [...coursesData].sort(function(a, b) { return b.views - a.views; }).slice(0, 8);
    grid.innerHTML = popular.map(function(c) { return smartCardHTML(c); }).join('');
  }

  // 学习路径预览（前 4 条）
  var pathGrid = document.getElementById('pathPreviewGrid');
  if (pathGrid) {
    pathGrid.innerHTML = learningPathsData.slice(0, 4).map(function(p) {
      return '<div class="path-card-item" onclick="location.href=\'learning-path.html\'">' +
        '<div class="path-card-icon ' + p.color + '">' + p.icon + '</div>' +
        '<div style="flex:1;">' +
          '<h3 style="font-size:16px;font-weight:600;color:#2a301b;margin-bottom:6px;">' + p.title + '</h3>' +
          '<p style="font-size:13px;color:#707070;line-height:1.5;margin-bottom:10px;">' + p.desc + '</p>' +
          '<div class="path-stages">' +
            p.stages.map(function(s, i) {
              return (i > 0 ? '<span class="path-stage-arrow">→</span>' : '') + '<span class="path-stage-tag">' + s.name + '</span>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }
}
