$('.menu-button').on('click', function () {
  var nav = $('div.menu'),
    //      menu_oheight = mainmenu.outerHeight(),
    //      menu_iheight = mainmenu.height(),
    link_pad = $('div.menu a').height();
  $(this).toggleClass('active');
  $('body').toggleClass('pmt');
  var menu_oheight = $('div.menu').outerHeight(),
    menu_iheight = $('div.menu a:last-child').position();
  console.log(menu_iheight, link_pad);
});

$(document).ready(function () {
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
        var postHtml = insertPost(post);
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

function insertPost(postData, options) {
  //start the inserting of the html
  var postExcerpt = $(postData.html).text().slice(0, 200);

  var tagText = options ? options.includeTags ? '<span class="type">' +
    postData.tags[0].name +
    '</span>' : '' : '';
  var classList = 'block post ';
  classList += options ? options.addClass ? options.addClass : '' : '';
  var date = options ? options.includeDate ? '(' + convertDate(postData.published_at) + ')' : '' : '';

  var imageContainer = postData.image ? '<div class="rela post__image">' +
    '<img src=\"' + postData.image + '\" />' +
    tagText +
    '</div>' : '';

  var postContent = postData.html ? '<span class="text">' + $(postData.html).text().slice(0, 200) + '... ' +
    '</span>' : '';

  var postInfo = '' +
    '<article class="'+ classList +'">' +
    '<a href=\"' + postData.url + '\">' +
    imageContainer +
    '<h2 class="zagalov">' +
    postData.title + date +
    '</h2>' +
    postContent +
    '</a>';
  return postInfo;
}

function convertDate(date) {
  var date = new Date(date), y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
  return d + '/' + +(m+1) + '/' + y;
}

/* Remove fixed header for now
 $navigation = $('#navigation');
 $body = $('body');

 $(window).scroll(function() {
 var defaultOffset = 400,
 currentOffset = $(this).scrollTop();

 if (currentOffset > defaultOffset) {
 $navigation.addClass('fixed');
 $body.addClass('fixed-header');
 } else {
 $navigation.removeClass('fixed');
 $body.removeClass('fixed-header');
 }
 });*/

/**
 * Find promo container
 * and split its text for date and text container
 */
(function splitDateAndTitle() {
  var $title = $('.js-titleContainer'),
    $date = $('.js-dateContainer'),
    titleText = $title.text(),
    firstDateIndex = titleText.search(/\d{2}[.]\d{2} [–,-] \d{2}[.]\d{2}/g);
  title = titleText.slice(0, firstDateIndex);
  date = titleText.slice(firstDateIndex, titleText.length);

  $title.text(title);
  $date.text(date);
}())

function fuckTheBanner() {
  var $mainImg = $('.js-mainImageContainer'),
    mainImgSrc = $mainImg.attr('src');

  var ls = window.localStorage;

  if (typeof ls.getItem('mainImgSrc') == 'string' && (ls.getItem('mainImgSrc') == mainImgSrc)) {
    $mainImg.hide();
  } else {
    $mainImg.addClass('js-isVisible');
  }
}

fuckTheBanner();

$('.js-toggleBanner').on('click', function () {
  var $image = $('.js-mainImageContainer'),
    $src = $image.attr('src');
  $image.toggleClass('js-isVisible is-visible');

  if ($image.hasClass('js-isVisible')) {
    $image.show();
    window.localStorage.setItem('mainImgSrc', '');
  } else {
    $image.hide();
    window.localStorage.setItem('mainImgSrc', $src);
  }
});

$('.js-searchStart').on('click', function () {
  $('.js-searchOverlay').show();
  $('body').addClass('pmt');
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
    })
    .done(function (data) {
      $('.js-loadingSpin').hide();
      var found = data.posts.filter(function (post) {
        return post.title.toLowerCase().indexOf(value) !== -1;
      });

      $('.js-searchResults').empty();
      if (found.length) {
        found.forEach(function (item) {
          $('.js-searchResults').append(insertPost(item, {
            includeTags: false,
            includeDate: true,
            addClass: 'block--search'
          }));
        });
      } else {
        $('.js-searchResults').append('ничего');
      }
    })
});

$('.js-searchInput')
  .on('focusin', function () {
    $('#search').addClass('js-isActive');
  })
  .on('focusout', function () {
    $('#search').removeClass('js-isActive');
  });

