/* ============================================================
   doyoudo 克隆 — 通用工具函数
   ============================================================ */

// ---------- 数据访问工具 ----------
function getCourse(id) { return coursesData.find(c => c.id === id); }
function getCoursesBySoft(sw) { return sw === 'all' ? [...coursesData] : coursesData.filter(c => c.software === sw); }
function getCoursesByDiff(arr, d) { return d === 'all' ? arr : arr.filter(c => c.difficulty === d); }
function getCoursesByType(arr, t) { if (t === 'all') return arr; return t === 'free' ? arr.filter(c => c.isFree) : arr.filter(c => !c.isFree); }
function sortCourses(arr, sort) {
  const a = [...arr];
  if (sort === 'popular') return a.sort((x,y) => y.views - x.views);
  if (sort === 'recommended') return a.sort((x,y) => y.rating - x.rating);
  return a; // newest (default order)
}
function fmtViews(n) { return n >= 10000 ? (n/10000).toFixed(1) + '万' : n.toString(); }

// ---------- 搜索课程 ----------
function searchCourses(query) {
  if (!query) return [...coursesData];
  var q = query.toLowerCase();
  return coursesData.filter(function(c) {
    return c.title.toLowerCase().indexOf(q) >= 0 ||
           (c.author && c.author.toLowerCase().indexOf(q) >= 0) ||
           (c.software && c.software.toLowerCase().indexOf(q) >= 0);
  });
}

// ---------- 封面 URL 获取 ----------
function getCoverUrl(course) {
  if (course.cover && course.cover.startsWith('courses/')) {
    return 'assets/images/' + course.cover;
  }
  // fallback: colored placeholder per software
  return '';
}

// ---------- 设置元素文本 ----------
function setEl(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}
