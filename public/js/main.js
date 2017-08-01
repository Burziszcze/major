//
// SITE MAIN SCRIPTS
//

$(document).ready(function() {
  // preloader
  // dropdown button
  $(".dropdown-button").dropdown();
  // button collapse
  $('.button-collapse').sideNav({
    edge: 'left',
  });
  // carousel
  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
  // parallax
  $('.parallax').parallax();
  //form characters left counter
  $('input#input_text, textarea#textarea1').characterCounter();
  //scrollTop hide on document load
  $('.scrollTop').hide();
  //scrollTop
  $('.scrollTop').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
});

// scroll top button
$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    $('.scrollTop').fadeIn();
  } else {
    $('.scrollTop').fadeOut();
  }
});
