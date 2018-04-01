$(document).ready(function(){
  var scrollY = 15;

  $(window).scroll(function() {
    if ($(window).scrollTop() > scrollY) {
      $('header').addClass('scrolled');
      $('.main').addClass('smooth');
    } else {
      $('header').removeClass('scrolled');
      $('.main').removeClass('smooth');
    }
  });

  $('#nav-input').change( function() {
    if ($(this).is(':checked')) {
      console.log( $( this ).val());
      $('body').css('overflow-y','hidden');
      $(window).on('touchmove.noScroll', function(e) {
        e.preventDefault();
      });
    } else {
      $('body').css('overflow-y','auto');
      $(window).off('.noScroll');
    }
  });
});
