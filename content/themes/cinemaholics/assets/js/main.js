import {hideMainBanner, insertPost, splitDateAndTitle} from './helpers';

$(document).ready(() => {
  splitDateAndTitle();
  hideMainBanner();
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

$('.menu-button').on('click', function() {
  let nav = $('div.menu'),
    link_pad = $('div.menu a').height();
  $(this).toggleClass('active');
  $('body').toggleClass('pmt');
  let menu_oheight = nav.outerHeight(),
    menu_iheight = $('div.menu a:last-child').position();
  console.log(menu_iheight, link_pad);
});

$('.js-toggleBanner').on('click', function () {
  let imageContainer = $('.js-mainImageContainer'),
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

$('img').parent('p').addClass('picture');
$('.cite').parent('p').addClass('paragraph--has-cite');