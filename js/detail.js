/* ============================================================
   doyoudo 克隆 — 课程详情页逻辑
   ============================================================ */

/* 初始化详情页 */
function initDetail() {
  var container = document.querySelector('.detail-content');
  if (!container) return;

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id')) || 1;
  var course = getCourse(id);

  if (!course) {
    container.innerHTML = '<div class="notFound" style="margin:60px auto;max-width:600px;">课程未找到或已下架<br><br><a href="tutorials.html" style="color:#80aa15;">浏览其他课程 →</a></div>';
    return;
  }

  document.title = course.title + ' - doyoudo';

  // 面包屑
  var bc = document.querySelector('.breadcrumb .current');
  if (bc) bc.textContent = course.title;

  // 填充信息
  setEl('detailTitle', course.title);
  setEl('detailSoftware', (softwareList.find(function(s){return s.id===course.software})||{name:course.software}).name);
  setEl('detailDifficulty', diffLabels[course.difficulty] || '');
  setEl('detailType', course.isFree ? '免费' : '¥' + course.price);
  setEl('detailAuthor', course.author);
  setEl('detailDuration', course.duration);
  setEl('detailLessons', course.lessons + ' 课时');
  setEl('detailViews', fmtViews(course.views) + '次观看');
  setEl('detailRating', course.rating + ' 评分');
  setEl('detailDesc', course.desc);
  setEl('sidebarSoftware', (softwareList.find(function(s){return s.id===course.software})||{name:course.software}).name);
  setEl('sidebarDifficulty', diffLabels[course.difficulty] || '');
  setEl('sidebarLessons', course.lessons + ' 课时');
  setEl('sidebarDuration', course.duration);
  setEl('sidebarViews', fmtViews(course.views) + '次');
  setEl('sidebarPrice', course.isFree ? '免费' : '¥' + course.price);
  setEl('sidebarAuthorName', course.author);

  if (course.isFree) {
    var priceEl = document.getElementById('sidebarPrice');
    if (priceEl) priceEl.style.color = '#80aa15';
  }

  // 章节列表
  var chList = document.getElementById('chapterList');
  if (chList && course.chapters) {
    chList.innerHTML = course.chapters.map(function(ch, i) {
      return '<div class="chapter-item' + (i === 0 ? ' current' : '') + '">' +
        '<div class="chapter-num">' + String(i+1).padStart(2,'0') + '</div>' +
        '<div class="chapter-info">' + ch.title + '</div>' +
        '<div class="chapter-duration">' + ch.dur + '</div>' +
      '</div>';
    }).join('');

    chList.querySelectorAll('.chapter-item').forEach(function(item) {
      item.addEventListener('click', function() {
        chList.querySelectorAll('.chapter-item').forEach(function(i) { i.classList.remove('current'); });
        this.classList.add('current');
      });
    });
  }

  // 相关推荐
  var relGrid = document.getElementById('relatedGrid');
  if (relGrid) {
    var related = (course.relatedIds || []).map(function(rid) { return getCourse(rid); }).filter(Boolean);
    relGrid.innerHTML = related.map(function(c) { return smartCardHTML(c); }).join('');
  }

  // Tab 切换
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tabId = this.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
      this.classList.add('active');
      var panel = document.getElementById('tab-' + tabId);
      if (panel) panel.classList.add('active');
    });
  });
}
