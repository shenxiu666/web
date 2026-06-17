/* ============================================================
   doyoudo 克隆 — 课程卡片组件
   ============================================================ */

// ---------- 软件颜色映射 ----------
var gradColors = {
  ps: 'linear-gradient(135deg, #001E36, #31A8FF)',
  ae: 'linear-gradient(135deg, #2A0034, #9A5BFF)',
  pr: 'linear-gradient(135deg, #2B0549, #EA77FF)',
  c4d: 'linear-gradient(135deg, #00254D, #0088FF)',
  ai: 'linear-gradient(135deg, #330E00, #FF9A00)',
  au: 'linear-gradient(135deg, #00331A, #00C97D)',
  fl: 'linear-gradient(135deg, #331400, #FF6B00)',
  lr: 'linear-gradient(135deg, #1A1A2E, #607D8B)',
  fcp: 'linear-gradient(135deg, #1A0033, #6666FF)',
};

/* 课程卡片 HTML - 有封面 */
function cardHTML(c) {
  var coverUrl = getCoverUrl(c);
  var coverStyle = coverUrl ? 'background-image:url(' + coverUrl + ');background-size:cover;background-position:center;' : '';
  var diffCls = diffClasses[c.difficulty] || '';
  return '<div class="card" onclick="location.href=\'tutorial-detail.html?id=' + c.id + '\'">' +
    '<div class="cover" style="' + coverStyle + '"></div>' +
    '<div class="cardInfo">' +
      '<div class="cardTitle">' + c.title + '</div>' +
      '<div class="tags">' +
        '<span class="software">' + (softwareList.find(function(s){return s.id===c.software})||{name:c.software}).name + '</span>' +
        '<span class="level ' + diffCls + '">' + (diffLabels[c.difficulty]||'') + '</span>' +
      '</div>' +
    '</div>' +
  '</div>';
}

/* 无封面时的占位卡片 */
function cardHTMLNoCover(c) {
  var diffCls = diffClasses[c.difficulty] || '';
  var grad = gradColors[c.software] || 'linear-gradient(135deg, #333, #666)';
  return '<div class="card" onclick="location.href=\'tutorial-detail.html?id=' + c.id + '\'">' +
    '<div class="cover" style="background:' + grad + ';display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);font-size:32px;font-weight:700;">' + (softwareList.find(function(s){return s.id===c.software})||{name:c.software.toUpperCase()}).name + '</div>' +
    '<div class="cardInfo">' +
      '<div class="cardTitle">' + c.title + '</div>' +
      '<div class="tags">' +
        '<span class="software">' + (softwareList.find(function(s){return s.id===c.software})||{name:c.software}).name + '</span>' +
        '<span class="level ' + diffCls + '">' + (diffLabels[c.difficulty]||'') + '</span>' +
      '</div>' +
    '</div>' +
  '</div>';
}

/* 智能选择卡片渲染方式 */
function smartCardHTML(c) {
  if (c.cover) return cardHTML(c);
  return cardHTMLNoCover(c);
}
