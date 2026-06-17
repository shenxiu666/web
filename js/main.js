/* ============================================================
   doyoudo 克隆 — 交互逻辑 (匹配真实网站)
   ============================================================ */

// ---------- 课程数据 (基于真实 doyoudo 课程结构) ----------
const coursesData = [
  { id:1, title:'最容易听懂的PS入门教程 - 从零基础到完全掌握', software:'ps', difficulty:'beginner', author:'李涛', duration:'8小时', lessons:48, views:125000, isFree:true, price:0, rating:4.9, cover:'courses/course-01.jpg', desc:'本课程专为零基础学员设计，从Photoshop界面认识开始，逐步掌握图层、选区、蒙版、调色、滤镜等核心功能。', chapters:[{title:'认识Photoshop界面与基本操作',dur:'18:30'},{title:'图层的概念与基本操作',dur:'22:15'},{title:'选区工具的灵活运用',dur:'25:40'},{title:'蒙版入门 - 非破坏性编辑',dur:'20:10'},{title:'色彩调整与校色技巧',dur:'28:50'},{title:'文字工具与排版设计',dur:'16:20'},{title:'滤镜特效实战',dur:'24:00'},{title:'综合案例：海报设计全流程',dur:'35:15'}], relatedIds:[2,3,9,16] },
  { id:2, title:'PS高级合成技巧 - 商业级图像处理实战', software:'ps', difficulty:'advanced', author:'李涛', duration:'12小时', lessons:36, views:68000, isFree:false, price:299, rating:4.8, cover:'courses/course-02.jpg', desc:'面向有一定基础的设计师，深入学习高级合成、光影重塑、商业修图等专业技巧。', chapters:[{title:'高级选区与通道抠图',dur:'28:00'},{title:'光影理论与重塑',dur:'32:15'},{title:'商业人像精修流程',dur:'45:00'},{title:'多图合成与透视匹配',dur:'38:20'},{title:'电商海报合成实战',dur:'42:10'}], relatedIds:[1,3,16] },
  { id:3, title:'After Effects 动效设计 - 从入门到精通', software:'ae', difficulty:'intermediate', author:'王小兔', duration:'15小时', lessons:60, views:98000, isFree:false, price:399, rating:4.9, cover:'courses/course-03.jpg', desc:'系统学习AE动效设计，涵盖关键帧动画、表达式、粒子系统、3D图层、MG动画等核心内容。', chapters:[{title:'AE界面与工作流程',dur:'20:00'},{title:'关键帧动画基础',dur:'28:30'},{title:'形状图层与矢量动画',dur:'32:00'},{title:'文字动画与排版动效',dur:'25:40'},{title:'表达式入门',dur:'35:00'},{title:'粒子特效实战',dur:'40:20'},{title:'3D图层与摄像机',dur:'38:10'},{title:'综合MG动画项目',dur:'50:00'}], relatedIds:[4,7,15] },
  { id:4, title:'AE表达式完全指南 - 让动画更智能', software:'ae', difficulty:'advanced', author:'王小兔', duration:'6小时', lessons:24, views:35000, isFree:false, price:249, rating:4.7, cover:'', desc:'深入AE表达式世界，学会用代码驱动动画，大幅提升工作效率。', chapters:[{title:'表达式语法基础',dur:'22:00'},{title:'wiggle与随机动画',dur:'18:30'},{title:'loop循环表达式',dur:'16:00'},{title:'time与index的高级用法',dur:'20:40'},{title:'表达式控制与绑定',dur:'25:00'}], relatedIds:[3,7] },
  { id:5, title:'Premiere剪辑入门 - 30天成为剪辑达人', software:'pr', difficulty:'beginner', author:'张两万', duration:'10小时', lessons:30, views:156000, isFree:true, price:0, rating:4.8, cover:'courses/course-04.jpg', desc:'30天系统学习PR剪辑，每天一个小案例，涵盖素材管理、剪辑节奏、转场、调色、字幕、导出全流程。', chapters:[{title:'PR界面与项目设置',dur:'15:00'},{title:'素材导入与管理',dur:'18:20'},{title:'基础剪辑工具与技巧',dur:'22:00'},{title:'转场特效大全',dur:'20:30'},{title:'音频处理与混音',dur:'25:00'},{title:'调色基础 - Lumetri颜色',dur:'28:10'},{title:'字幕与标题制作',dur:'16:40'},{title:'导出设置与多平台适配',dur:'14:00'}], relatedIds:[6,13] },
  { id:6, title:'PR高级剪辑工作流 - 专业级视频制作', software:'pr', difficulty:'advanced', author:'张两万', duration:'14小时', lessons:42, views:52000, isFree:false, price:349, rating:4.6, cover:'', desc:'面向专业剪辑师的高级课程，涵盖多机位剪辑、代理工作流、协作剪辑、调色台使用等专业技巧。', chapters:[{title:'多机位同步剪辑',dur:'32:00'},{title:'代理剪辑工作流',dur:'25:00'},{title:'高级调色 - Lumetri深入',dur:'40:00'},{title:'动态链接 - PR与AE协作',dur:'28:30'},{title:'VR视频剪辑',dur:'35:00'}], relatedIds:[5,13] },
  { id:7, title:'C4D三维设计入门 - 创造你的第一个3D作品', software:'c4d', difficulty:'beginner', author:'郭八两', duration:'9小时', lessons:36, views:89000, isFree:true, price:0, rating:4.9, cover:'', desc:'零基础学习Cinema 4D，从建模到渲染，每个知识点都配有趣味小练习。', chapters:[{title:'C4D界面与导航',dur:'16:00'},{title:'参数化建模基础',dur:'22:30'},{title:'样条线与生成器',dur:'24:00'},{title:'变形器与效果器',dur:'28:10'},{title:'灯光与材质基础',dur:'20:00'},{title:'渲染设置与输出',dur:'18:40'}], relatedIds:[8,3] },
  { id:8, title:'C4D动态图形 - Redshift渲染实战', software:'c4d', difficulty:'advanced', author:'郭八两', duration:'16小时', lessons:48, views:41000, isFree:false, price:499, rating:4.8, cover:'', desc:'C4D动态图形设计与Redshift GPU渲染器专业课程，专注商业级3D动画制作。', chapters:[{title:'MoGraph核心概念',dur:'30:00'},{title:'效果器深度应用',dur:'35:20'},{title:'Redshift材质系统',dur:'42:00'},{title:'灯光与HDRI照明',dur:'28:30'},{title:'商业渲染案例全流程',dur:'55:00'}], relatedIds:[7,3] },
  { id:9, title:'Illustrator矢量插画 - 画出你的创意世界', software:'ai', difficulty:'beginner', author:'孙小美', duration:'7小时', lessons:28, views:72000, isFree:true, price:0, rating:4.7, cover:'', desc:'从零开始学AI，掌握钢笔工具、形状生成器、渐变网格等核心功能，画出专业矢量插画。', chapters:[{title:'AI界面与文档设置',dur:'14:00'},{title:'钢笔工具完全掌握',dur:'28:00'},{title:'形状生成器与路径查找器',dur:'20:00'},{title:'色彩与渐变',dur:'18:30'},{title:'文字排版与字体设计',dur:'22:00'},{title:'插画创作全流程',dur:'35:00'}], relatedIds:[1,10] },
  { id:10, title:'AI品牌VI设计 - 从Logo到视觉系统', software:'ai', difficulty:'intermediate', author:'孙小美', duration:'11小时', lessons:32, views:45000, isFree:false, price:329, rating:4.8, cover:'', desc:'系统学习品牌VI设计全流程，涵盖Logo设计、色彩系统、字体规范、应用延展等内容。', chapters:[{title:'品牌设计方法论',dur:'20:00'},{title:'Logo设计实战',dur:'35:00'},{title:'色彩体系构建',dur:'25:00'},{title:'字体与排版规范',dur:'22:30'},{title:'VI手册制作',dur:'40:00'}], relatedIds:[9,1] },
  { id:11, title:'Audition音频后期 - 让声音更动听', software:'au', difficulty:'beginner', author:'赵小声', duration:'5小时', lessons:20, views:31000, isFree:true, price:0, rating:4.5, cover:'', desc:'零基础学Audition，涵盖录音、降噪、混音、音效设计等音频后期处理核心技能。', chapters:[{title:'AU界面与音频基础',dur:'16:00'},{title:'录音技巧与设备选择',dur:'22:00'},{title:'降噪与修复工具',dur:'20:00'},{title:'多轨混音实战',dur:'28:00'},{title:'音效设计与输出',dur:'18:00'}], relatedIds:[5,3] },
  { id:12, title:'FL Studio电子音乐制作 - 从节拍到完整编曲', software:'fl', difficulty:'intermediate', author:'赵小声', duration:'13小时', lessons:40, views:56000, isFree:false, price:369, rating:4.7, cover:'', desc:'学习FL Studio电子音乐制作，涵盖鼓组编排、合成器、混音、母带处理等完整流程。', chapters:[{title:'FL Studio工作流程',dur:'18:00'},{title:'鼓组编排与节奏设计',dur:'25:00'},{title:'合成器与音色设计',dur:'32:00'},{title:'和弦进行与旋律创作',dur:'28:30'},{title:'混音与母带处理',dur:'35:00'}], relatedIds:[11] },
  { id:13, title:'Final Cut Pro 剪辑完全指南', software:'fcp', difficulty:'beginner', author:'张两万', duration:'8小时', lessons:32, views:48000, isFree:true, price:0, rating:4.6, cover:'', desc:'专为Mac用户打造的FCP剪辑课程，涵盖磁性时间线、角色管理、颜色分级等独家功能。', chapters:[{title:'FCP界面与媒体管理',dur:'15:00'},{title:'磁性时间线深入',dur:'22:00'},{title:'转场与效果',dur:'18:30'},{title:'颜色分级工具',dur:'24:00'},{title:'多平台导出优化',dur:'12:00'}], relatedIds:[5,6] },
  { id:14, title:'Lightroom摄影后期 - 让每张照片都出彩', software:'lr', difficulty:'beginner', author:'陈大光', duration:'6小时', lessons:24, views:64000, isFree:true, price:0, rating:4.8, cover:'', desc:'从零学Lightroom，掌握曝光调整、色彩分级、局部修饰、批量处理等摄影后期核心技能。', chapters:[{title:'LR图库管理与导入',dur:'16:00'},{title:'基本调整与曝光修正',dur:'22:00'},{title:'色彩分级与色调风格',dur:'25:00'},{title:'局部调整工具',dur:'18:00'},{title:'批量导出与预设',dur:'14:00'}], relatedIds:[1,9] },
  { id:15, title:'AE + C4D联合创作 - 动态设计工作流', software:'ae', difficulty:'advanced', author:'王小兔', duration:'18小时', lessons:52, views:38000, isFree:false, price:599, rating:4.9, cover:'', desc:'AE与C4D联合创作课程，学习Cineware桥接、3D元素合成、动态追踪等高级技巧。', chapters:[{title:'AE与C4D桥接基础',dur:'22:00'},{title:'Cineware工作流优化',dur:'28:00'},{title:'3D摄像机追踪',dur:'35:00'},{title:'动态元素合成实战',dur:'42:00'},{title:'综合商业项目全流程',dur:'60:00'}], relatedIds:[3,8] },
  { id:16, title:'PS电商设计实战 - 详情页与主图制作', software:'ps', difficulty:'intermediate', author:'李涛', duration:'9小时', lessons:30, views:83000, isFree:false, price:259, rating:4.7, cover:'', desc:'专注电商视觉设计，涵盖详情页布局、主图设计、banner制作、直通车图等电商核心视觉。', chapters:[{title:'电商设计规范与尺寸',dur:'16:00'},{title:'主图设计策略',dur:'24:00'},{title:'详情页布局与视觉引导',dur:'32:00'},{title:'促销Banner设计',dur:'28:00'},{title:'移动端适配技巧',dur:'20:00'}], relatedIds:[1,2] },
];

// ---------- 学习路径数据 ----------
const learningPathsData = [
  { id:'ps', software:'ps', icon:'Ps', title:'Photoshop 学习路径', desc:'从零基础到商业级图像处理高手，系统掌握Photoshop全部核心技能。', color:'sw-ps', stages:[{name:'入门基础',desc:'界面认识、基本工具、图层概念'},{name:'核心技能',desc:'选区、蒙版、调色、滤镜'},{name:'进阶实战',desc:'合成、修图、海报设计'},{name:'商业精通',desc:'品牌VI、电商设计、创意合成'}], totalLessons:162, totalDuration:'36小时', courseCount:3 },
  { id:'ae', software:'ae', icon:'Ae', title:'After Effects 学习路径', desc:'从关键帧动画到MG动效大师，全面掌握AE动态设计能力。', color:'sw-ae', stages:[{name:'入门基础',desc:'界面、图层、关键帧动画'},{name:'核心技能',desc:'形状动画、文字动效、表达式'},{name:'进阶实战',desc:'粒子系统、3D图层、摄像机'},{name:'商业精通',desc:'MG动画、广告包装、特效合成'}], totalLessons:136, totalDuration:'34小时', courseCount:3 },
  { id:'pr', software:'pr', icon:'Pr', title:'Premiere 学习路径', desc:'从基础剪辑到专业级视频制作，系统培养剪辑思维与技术能力。', color:'sw-pr', stages:[{name:'入门基础',desc:'界面、素材管理、基础剪辑'},{name:'核心技能',desc:'转场、音频、调色、字幕'},{name:'进阶实战',desc:'多机位、代理、动态链接'},{name:'商业精通',desc:'纪录片、广告、短视频全流程'}], totalLessons:104, totalDuration:'32小时', courseCount:2 },
  { id:'c4d', software:'c4d', icon:'4D', title:'Cinema 4D 学习路径', desc:'从三维建模到动态图形渲染，成为3D设计领域的专业人才。', color:'sw-c4d', stages:[{name:'入门基础',desc:'界面导航、参数化建模、样条线'},{name:'核心技能',desc:'变形器、材质、灯光、渲染'},{name:'进阶实战',desc:'MoGraph、动态图形、角色动画'},{name:'商业精通',desc:'Redshift渲染、产品动画、舞台视觉'}], totalLessons:120, totalDuration:'34小时', courseCount:2 },
  { id:'ai', software:'ai', icon:'Ai', title:'Illustrator 学习路径', desc:'从矢量绘图到品牌VI设计，全面掌握矢量设计核心能力。', color:'sw-ai', stages:[{name:'入门基础',desc:'界面、钢笔工具、形状工具'},{name:'核心技能',desc:'色彩、渐变、文字排版'},{name:'进阶实战',desc:'插画创作、图标设计、图案'},{name:'商业精通',desc:'品牌VI、包装设计、信息图表'}], totalLessons:92, totalDuration:'25小时', courseCount:2 },
  { id:'au', software:'au', icon:'Au', title:'Audition 学习路径', desc:'从音频录制到专业混音，掌握声音后期处理全流程。', color:'sw-au', stages:[{name:'入门基础',desc:'音频基础、界面、录音'},{name:'核心技能',desc:'降噪、均衡、压缩、混响'},{name:'进阶实战',desc:'多轨混音、音效设计'},{name:'商业精通',desc:'广播级混音、影视音频后期'}], totalLessons:56, totalDuration:'14小时', courseCount:1 },
  { id:'fl', software:'fl', icon:'FL', title:'FL Studio 学习路径', desc:'从节拍制作到完整编曲，开启电子音乐创作之旅。', color:'sw-fl', stages:[{name:'入门基础',desc:'界面、钢琴卷帘、节拍制作'},{name:'核心技能',desc:'合成器、采样、混音器'},{name:'进阶实战',desc:'编曲结构、音色设计'},{name:'商业精通',desc:'母带处理、发行准备'}], totalLessons:68, totalDuration:'18小时', courseCount:1 },
  { id:'fcp', software:'fcp', icon:'Fc', title:'Final Cut Pro 学习路径', desc:'Mac平台专业剪辑，从磁性时间线到多平台输出。', color:'sw-fcp', stages:[{name:'入门基础',desc:'界面、媒体管理、磁性时间线'},{name:'核心技能',desc:'转场、字幕、颜色分级'},{name:'进阶实战',desc:'多机位、角色、复合片段'},{name:'商业精通',desc:'影视级剪辑工作流'}], totalLessons:32, totalDuration:'8小时', courseCount:1 },
];

const softwareList = [
  { id:'all', name:'全部', icon:'' },
  { id:'ps', name:'PS', icon:'' },
  { id:'ae', name:'AE', icon:'' },
  { id:'pr', name:'PR', icon:'' },
  { id:'c4d', name:'C4D', icon:'' },
  { id:'ai', name:'AI', icon:'' },
  { id:'au', name:'AU', icon:'' },
  { id:'fl', name:'FL', icon:'' },
  { id:'lr', name:'LR', icon:'' },
  { id:'fcp', name:'FCP', icon:'' },
];

const diffLabels = { beginner:'初级', intermediate:'中级', advanced:'高级' };
const diffClasses = { beginner:'beginner', intermediate:'intermediate', advanced:'advanced' };

// ---------- 工具函数 ----------
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

function getCoverUrl(course) {
  if (course.cover && course.cover.startsWith('courses/')) {
    return 'assets/images/' + course.cover;
  }
  // fallback: colored placeholder per software
  return '';
}

/* 课程卡片 HTML */
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

function smartCardHTML(c) {
  if (c.cover) return cardHTML(c);
  return cardHTMLNoCover(c);
}

// ---------- 教程列表页：筛选 ----------
var filterState = { software:'all', difficulty:'all', type:'all', sort:'newest', page:1, perPage:12 };

function initFilters() {
  var bar = document.querySelector('.search-filters');
  if (!bar) return;

  // URL params
  var params = new URLSearchParams(window.location.search);
  if (params.get('software')) filterState.software = params.get('software');

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

function updateResults() {
  var grid = document.querySelector('.cards');
  if (!grid) return;

  var filtered = getCoursesBySoft(filterState.software);
  filtered = getCoursesByDiff(filtered, filterState.difficulty);
  filtered = getCoursesByType(filtered, filterState.type);
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

// ---------- 导航 ----------
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
        }
      }
    });
  }
}

// ---------- 教程详情页 ----------
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

function setEl(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ---------- 学习路径页 ----------
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

// ---------- 首页渲染 ----------
function initHome() {
  // 仅首页
  if (window.location.pathname.includes('tutorials') || window.location.pathname.includes('tutorial-detail') || window.location.pathname.includes('learning-path')) return;

  // 热门课程（前8个）
  var grid = document.querySelector('.cards');
  if (grid) {
    var popular = [...coursesData].sort(function(a, b) { return b.views - a.views; }).slice(0, 8);
    grid.innerHTML = popular.map(function(c) { return smartCardHTML(c); }).join('');
  }

  // 学习路径预览（前4条）
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

// ---------- 启动 ----------
document.addEventListener('DOMContentLoaded', function() {
  initNav();
  initFooter();
  initSearch();
  initFilters();
  initDetail();
  initPaths();
  initHome();
});
