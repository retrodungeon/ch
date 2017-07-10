/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitDateAndTitle = exports.insertPost = exports.hideMainBanner = undefined;

var _hideMainBanner = __webpack_require__(3);

var _insertPost = __webpack_require__(4);

var _splitDateAndTitle = __webpack_require__(5);

exports.hideMainBanner = _hideMainBanner.hideMainBanner;
exports.insertPost = _insertPost.insertPost;
exports.splitDateAndTitle = _splitDateAndTitle.splitDateAndTitle;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDate = convertDate;
function convertDate(dateString) {
  var date = new Date(dateString),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
  return d + '/' + +(m + 1) + '/' + y;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideMainBanner = hideMainBanner;
function hideMainBanner() {
  var $mainImg = $('.js-mainImageContainer'),
      mainImgSrc = $mainImg.attr('src');

  var ls = window.localStorage;

  if (typeof ls.getItem('mainImgSrc') === 'string' && ls.getItem('mainImgSrc') === mainImgSrc) {
    $mainImg.hide();
  } else {
    $mainImg.addClass('js-isVisible');
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertPost = insertPost;

var _convertDate = __webpack_require__(2);

function insertPost(postData, options) {
  //start the inserting of the html
  var postExcerpt = $(postData.html).text().slice(0, 200);

  var tagText = options ? options.includeTags ? '<span class="type"> \n    ' + postData.tags[0].name + '\n    </span>' : '' : '';

  var classList = 'block post ';
  classList += options ? options.addClass ? options.addClass : '' : '';
  var date = options ? options.includeDate ? '<p>' + (0, _convertDate.convertDate)(postData.published_at) + '</p>' : '' : '';

  var imageContainer = postData.image ? '<div class="rela post__image">\n      <img src="' + postData.image + '" /> \n      ' + tagText + '\n    </div>' : '';

  var postContent = postData.html ? '<span class="text">' + postExcerpt + '...</span>' : '';

  return '\n    <article class="' + classList + '">\n      <a href="' + postData.url + '">\n      ' + imageContainer + '\n      <h2 class="post-title">\n        ' + postData.title + '\n        ' + date + '\n      </h2>\n      ' + postContent + '\n      </a>\n    </article>';
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitDateAndTitle = splitDateAndTitle;
var $ = window.$;
/**
 * Find promo container
 * and split its text for date and text container
 */
function splitDateAndTitle() {
  var titleContainer = $('.js-titleContainer'),
      $date = $('.js-dateContainer'),
      titleText = titleContainer.text(),
      firstDateIndex = titleText.search(/\d{2}[.]\d{2} [–,-] \d{2}[.]\d{2}/g),
      title = titleText.slice(0, firstDateIndex),
      date = titleText.slice(firstDateIndex, titleText.length);

  titleContainer.text(title);
  $date.text(date);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helpers = __webpack_require__(0);

$(document).ready(function () {
  (0, _helpers.splitDateAndTitle)();
  (0, _helpers.hideMainBanner)();
  //This is set to 2 since the posts already loaded should be page 1
  var nextPage = 2,

  //Set this to match the pagination used in your blog
  limit = 10,
      filter = "image:-null";

  // if homepage
  var path = window.location.pathname,
      pathParts = path.split("/"),
      page = pathParts[1],
      id = pathParts[2];

  if (path.length <= 1) {
    limit = 12;
  } else if (page == 'tag') {
    filter += "+tag:" + id;
  } else if (page == 'author') {
    filter += "+author:" + id;
  }

  //on button click
  $('#load-posts').click(function () {
    $.ajax({
      url: ghost.url.api("posts", {
        order: "published_at desc",
        include: "tags",
        limit: limit,
        page: nextPage,
        filter: filter
      }),
      type: 'get'
    }).done(function (data) {
      $.each(data.posts, function (i, post) {
        var postHtml = (0, _helpers.insertPost)(post);
        $('.mateblock').append(postHtml);
      });
      nextPage += 1;
    }).done(function (data) {
      if (nextPage == data.meta.pagination.total || data.posts.length <= 0) {
        $('#load-posts').hide();
      }
    }).fail(function (err) {
      console.log(err);
    });
  });
});

$('.menu-button').on('click', function () {
  var nav = $('div.menu'),
      link_pad = $('div.menu a').height();
  $(this).toggleClass('active');
  $('body').toggleClass('pmt');
  var menu_oheight = nav.outerHeight(),
      menu_iheight = $('div.menu a:last-child').position();
  console.log(menu_iheight, link_pad);
});

$('.js-toggleBanner').on('click', function () {
  var imageContainer = $('.js-mainImageContainer'),
      src = imageContainer.attr('src');

  imageContainer.toggleClass('js-isVisible is-visible');

  if (imageContainer.hasClass('js-isVisible')) {
    imageContainer.show();
    window.localStorage.setItem('mainImgSrc', '');
  } else {
    imageContainer.hide();
    window.localStorage.setItem('mainImgSrc', src);
  }
});

$('.js-searchStart').on('click', function () {
  $('.js-searchOverlay').show();
  $('body').addClass('pmt');
  $('.js-searchInput').focus();
});

$('.js-searchClose').on('click', function () {
  $('.js-searchOverlay').hide();
  $('body').removeClass('pmt');
  $('.js-loadingSpin').hide();
  $('.js-searchResults').empty();
  $('.js-searchInput').val('');
});

$('#search').on('submit', function (e) {
  var value = $('.js-searchInput').get(0).value;
  $('.js-searchResults').empty();
  e.preventDefault();

  $('.js-loadingSpin').show();

  $.ajax({
    url: ghost.url.api("posts", {
      limit: "all",
      order: "published_at desc",
      fields: "title,url,published_at"
    }),
    type: 'get'
  }).done(function (data) {
    $('.js-loadingSpin').hide();
    var found = data.posts.filter(function (post) {
      return post.title.toLowerCase().indexOf(value) !== -1;
    });

    $('.js-searchResults').empty();
    if (found.length) {
      found.forEach(function (item) {
        $('.js-searchResults').append((0, _helpers.insertPost)(item, {
          includeTags: false,
          includeDate: true,
          addClass: 'block--search'
        }));
      });
    } else {
      $('.js-searchResults').append('ничего');
    }
  });
});

$('.js-searchInput').on('focusin', function () {
  $('#search').addClass('js-isActive');
}).on('focusout', function () {
  $('#search').removeClass('js-isActive');
});

$('img').parent('p').addClass('picture');
$('.cite').parent('p').addClass('paragraph--has-cite');

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map